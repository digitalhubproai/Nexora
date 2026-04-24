import asyncio
from app.core.database import AsyncSessionLocal as SessionLocal
from app.models.user import User
from app.core.security import hash_password

async def create_heads():
    async with SessionLocal() as db:
        heads = [
            ('finance@nexora.com', 'Finance', 'manager'),
            ('hr@nexora.com', 'Human Resources', 'manager'),
            ('supply@nexora.com', 'Supply Chain', 'manager'),
            ('sales@nexora.com', 'Sales', 'manager'),
            ('it@nexora.com', 'Information Technology', 'manager')
        ]
        
        for email, dept, role in heads:
            # Check if exists
            from sqlalchemy import select
            res = await db.execute(select(User).where(User.email == email))
            if res.scalar_one_or_none():
                print(f"Skipping {email}, already exists")
                continue
                
            prefix = dept[:3].upper()
            user = User(
                email=email,
                password_hash=hash_password('password123'),
                first_name=dept,
                last_name='Head',
                department=dept,
                role=role,
                employee_id=f'NEX{prefix}001',
                is_active=True
            )
            db.add(user)
            print(f"Created {dept} head: {email}")
        
        await db.commit()

if __name__ == "__main__":
    asyncio.run(create_heads())
