from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token, decode_token
from app.models.user import User
from app.schemas.schemas import LoginRequest, RegisterRequest, TokenResponse, RefreshRequest, UserRead
from app.api.deps import get_current_user
from sqlalchemy import func, or_

router = APIRouter(prefix="/auth", tags=["Authentication"])


async def generate_employee_id(db: AsyncSession, company_name: str = "Nexora"):
    prefix = company_name[:3].upper()
    # Find the last employee_id with this prefix
    result = await db.execute(
        select(User.employee_id)
        .where(User.employee_id.like(f"{prefix}%"))
        .order_by(User.employee_id.desc())
        .limit(1)
    )
    last_id = result.scalar_one_or_none()
    
    if not last_id:
        return f"{prefix}0000001"
    
    # Extract the number part
    try:
        num_part = last_id[3:]
        next_num = int(num_part) + 1
        return f"{prefix}{next_num:07d}"
    except (ValueError, TypeError):
        return f"{prefix}0000001"


@router.post("/register", response_model=TokenResponse)
async def register(data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    # Check if email exists
    result = await db.execute(select(User).where(User.email == data.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    # Generate Employee ID
    emp_id = await generate_employee_id(db)

    user = User(
        email=data.email,
        employee_id=emp_id,
        password_hash=hash_password(data.password),
        first_name=data.first_name,
        last_name=data.last_name,
        role=data.role,
    )
    db.add(user)
    await db.flush()
    await db.refresh(user)

    access_token = create_access_token({"sub": user.id, "role": user.role})
    refresh_token = create_refresh_token({"sub": user.id})

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=UserRead.model_validate(user),
    )


@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    # Support login by email OR employee_id
    result = await db.execute(
        select(User).where(
            or_(User.email == data.email, User.employee_id == data.email)
        )
    )
    user = result.scalar_one_or_none()

    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid identifier or password")

    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account is deactivated")

    user.last_login = datetime.now(timezone.utc)
    access_token = create_access_token({"sub": user.id, "role": user.role})
    refresh_token = create_refresh_token({"sub": user.id})

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=UserRead.model_validate(user),
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(data: RefreshRequest, db: AsyncSession = Depends(get_db)):
    payload = decode_token(data.refresh_token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    result = await db.execute(select(User).where(User.id == payload["sub"]))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    access_token = create_access_token({"sub": user.id, "role": user.role})
    new_refresh = create_refresh_token({"sub": user.id})

    return TokenResponse(
        access_token=access_token,
        refresh_token=new_refresh,
        user=UserRead.model_validate(user),
    )


@router.get("/me", response_model=UserRead)
async def get_me(current_user: User = Depends(get_current_user)):
    return UserRead.model_validate(current_user)
