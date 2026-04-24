import asyncio
from sqlalchemy import text
from app.core.database import engine

async def add_column():
    async with engine.begin() as conn:
        try:
            await conn.execute(text('ALTER TABLE users ADD COLUMN employee_id VARCHAR(20) UNIQUE'))
            print("Column 'employee_id' added successfully.")
        except Exception as e:
            print(f"Error or column already exists: {e}")

if __name__ == "__main__":
    asyncio.run(add_column())
