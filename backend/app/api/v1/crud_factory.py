"""Generic CRUD router factory for all entities."""
import math
from typing import Type, TypeVar, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc, asc
from pydantic import BaseModel
from app.core.database import Base, get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.employee import Employee

ModelType = TypeVar("ModelType", bound=Base)


def create_crud_router(
    model: Type[ModelType],
    read_schema: Type[BaseModel],
    create_schema: Type[BaseModel],
    update_schema: Type[BaseModel],
    prefix: str,
    tags: list[str],
):
    """Create a generic CRUD router for any SQLAlchemy model."""
    router = APIRouter(prefix=prefix, tags=tags)

    @router.get("/", response_model=dict)
    async def list_items(
        page: int = Query(1, ge=1),
        page_size: int = Query(25, ge=1, le=100),
        search: Optional[str] = Query(None),
        sort_by: Optional[str] = Query(None),
        sort_order: str = Query("desc"),
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user),
    ):
        query = select(model)

        # Handle Employee details join if fields exist in schema
        if "employee_number" in read_schema.model_fields:
            query = query.outerjoin(Employee, model.employee_id == Employee.id).add_columns(
                Employee.employee_id.label("employee_number"),
                (Employee.first_name + " " + Employee.last_name).label("employee_name")
            )

        # Search across string columns
        if search:
            from sqlalchemy import or_, String
            string_cols = [
                c for c in model.__table__.columns
                if isinstance(c.type, String) and c.name not in ("id", "password_hash")
            ]
            if string_cols:
                conditions = [c.ilike(f"%{search}%") for c in string_cols]
                query = query.where(or_(*conditions))

        # Count total
        count_q = select(func.count()).select_from(query.subquery())
        total = (await db.execute(count_q)).scalar() or 0

        # Sort
        if sort_by and hasattr(model, sort_by):
            col = getattr(model, sort_by)
            query = query.order_by(desc(col) if sort_order == "desc" else asc(col))
        elif hasattr(model, "created_at"):
            query = query.order_by(desc(model.created_at))

        # Paginate
        query = query.offset((page - 1) * page_size).limit(page_size)
        result = await db.execute(query)
        
        items_data = []
        if "employee_number" in read_schema.model_fields:
            # Result contains (model_obj, employee_number, employee_name)
            for row in result.all():
                obj = row[0]
                d = read_schema.model_validate(obj).model_dump()
                d["employee_number"] = row[1]
                d["employee_name"] = row[2]
                items_data.append(d)
        else:
            items = result.scalars().all()
            items_data = [read_schema.model_validate(item) for item in items]

        return {
            "items": items_data,
            "total": total,
            "page": page,
            "page_size": page_size,
            "total_pages": math.ceil(total / page_size) if total > 0 else 1,
        }

    @router.get("/{item_id}", response_model=read_schema)
    async def get_item(
        item_id: str,
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user),
    ):
        result = await db.execute(select(model).where(model.id == item_id))
        item = result.scalar_one_or_none()
        if not item:
            raise HTTPException(status_code=404, detail="Item not found")
        return read_schema.model_validate(item)

    @router.post("/", response_model=read_schema, status_code=201)
    async def create_item(
        data: create_schema,
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user),
    ):
        item_data = data.model_dump(exclude_unset=True)
        
        # Resolve Employee ID from NEX... code if provided in employee_id field
        if "employee_id" in item_data and item_data["employee_id"] and item_data["employee_id"].startswith("NEX"):
            emp_res = await db.execute(select(Employee.id).where(Employee.employee_id == item_data["employee_id"]))
            emp_uuid = emp_res.scalar_one_or_none()
            if emp_uuid:
                item_data["employee_id"] = emp_uuid

        # Auto-assign owner if model has owner_id
        if hasattr(model, "owner_id") and "owner_id" not in item_data:
            item_data["owner_id"] = current_user.id
        if hasattr(model, "created_by") and "created_by" not in item_data:
            item_data["created_by"] = current_user.id

        item = model(**item_data)
        db.add(item)
        await db.flush()
        await db.refresh(item)
        return read_schema.model_validate(item)

    @router.put("/{item_id}", response_model=read_schema)
    async def update_item(
        item_id: str,
        data: update_schema,
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user),
    ):
        result = await db.execute(select(model).where(model.id == item_id))
        item = result.scalar_one_or_none()
        if not item:
            raise HTTPException(status_code=404, detail="Item not found")

        update_data = data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(item, key, value)

        await db.flush()
        await db.refresh(item)
        return read_schema.model_validate(item)

    @router.delete("/{item_id}", status_code=204)
    async def delete_item(
        item_id: str,
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user),
    ):
        result = await db.execute(select(model).where(model.id == item_id))
        item = result.scalar_one_or_none()
        if not item:
            raise HTTPException(status_code=404, detail="Item not found")
        await db.delete(item)
        return None

    return router
