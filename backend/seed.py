import asyncio
import uuid
import random
from datetime import datetime, timedelta, date
from sqlalchemy import select, func
from app.core.database import AsyncSessionLocal, engine, Base
from app.core.security import hash_password
from app.models.user import User
from app.models.contact import Contact
from app.models.lead import Lead
from app.models.deal import Deal
from app.models.product import Product, Category
from app.models.invoice import Invoice
from app.models.employee import Employee
from app.models.project import Project
from app.models.activity import Activity
from app.models.warehouse import Warehouse

async def seed_data():
    async with AsyncSessionLocal() as db:
        print("Seeding Nexora ERP data...")

        # 1. Admin User
        result = await db.execute(select(User).where(User.email == "admin@nexora.com"))
        existing_admin = result.scalar_one_or_none()
        
        if not existing_admin:
            admin_id = str(uuid.uuid4())
            admin = User(
                id=admin_id,
                email="admin@nexora.com",
                password_hash=hash_password("Admin@123"),
                first_name="Nexora",
                last_name="Executive",
                role="admin",
                department="Executive",
                is_active=True
            )
            db.add(admin)
            await db.flush()
        else:
            admin_id = existing_admin.id
            print(f"Admin already exists with ID: {admin_id}")

        # 2. Categories & Products
        categories = ["Electronics", "Furniture", "Software", "Hardware", "Services"]
        cat_objs = []
        for c in categories:
            cat = Category(id=str(uuid.uuid4()), name=c)
            db.add(cat)
            cat_objs.append(cat)
        
        await db.flush()

        warehouses = [
            Warehouse(id=str(uuid.uuid4()), name="Main Hub", code="WH-01", city="New York", capacity=50000),
            Warehouse(id=str(uuid.uuid4()), name="East Logistics", code="WH-02", city="New Jersey", capacity=20000)
        ]
        for w in warehouses: db.add(w)
        await db.flush()

        products = []
        for i in range(15):
            p = Product(
                id=str(uuid.uuid4()),
                name=f"Enterprise {random.choice(['Server', 'Workstation', 'License', 'Support Pack'])} v{i}",
                sku=f"SKU-{1000+i}",
                price=random.uniform(500, 5000),
                cost=random.uniform(200, 3000),
                stock_quantity=random.randint(10, 500),
                category_id=random.choice(cat_objs).id,
                warehouse_id=random.choice(warehouses).id
            )
            db.add(p)
            products.append(p)

        # 3. Contacts & Leads
        for i in range(20):
            contact = Contact(
                id=str(uuid.uuid4()),
                first_name=random.choice(["James", "Mary", "Robert", "Patricia", "John", "Jennifer"]),
                last_name=random.choice(["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia"]),
                email=f"client{i}@example.com",
                company=random.choice(["Global Corp", "Tech Solutions", "Innovate Inc", "Blue Star", "Nexus Systems"]),
                status="active",
                owner_id=admin_id
            )
            db.add(contact)
            
            lead = Lead(
                id=str(uuid.uuid4()),
                name=f"Lead {i+1} Opportunity",
                email=f"lead{i}@example.com",
                company=f"Company {i}",
                status=random.choice(["new", "contacted", "qualified"]),
                score=random.randint(20, 95),
                assigned_to=admin_id
            )
            db.add(lead)

        # 4. Deals & Invoices
        stages = ["qualification", "proposal", "negotiation", "closed_won", "closed_lost"]
        for i in range(12):
            deal = Deal(
                id=str(uuid.uuid4()),
                title=f"Strategic Partnership {i}",
                value=random.uniform(5000, 50000),
                stage=random.choice(stages),
                status="open" if i < 10 else "won",
                owner_id=admin_id
            )
            db.add(deal)

            invoice = Invoice(
                id=str(uuid.uuid4()),
                number=f"INV-2026-{100+i}",
                total=random.uniform(1000, 15000),
                status=random.choice(["paid", "sent", "draft"]),
                issue_date=date.today() - timedelta(days=random.randint(1, 60)),
                owner_id=admin_id
            )
            db.add(invoice)

        # 5. Employees & Projects
        depts = ["Sales", "Engineering", "HR", "Finance", "Operations"]
        for i in range(8):
            emp = Employee(
                id=str(uuid.uuid4()),
                employee_id=f"EMP-00{i+1}",
                first_name=f"Staff_{i}",
                last_name="Member",
                email=f"staff{i}@nexora.com",
                department=random.choice(depts),
                position="Specialist",
                salary=random.uniform(3000, 8000),
                hire_date=date.today() - timedelta(days=random.randint(100, 1000)),
                status="active"
            )
            db.add(emp)

            proj = Project(
                id=str(uuid.uuid4()),
                name=f"Project Alpha-{i}",
                status="active",
                priority=random.choice(["medium", "high"]),
                progress=random.randint(10, 90),
                budget=random.uniform(10000, 100000),
                manager_id=admin_id
            )
            db.add(proj)

        # 6. Activities
        types = ["call", "email", "meeting", "task"]
        for i in range(15):
            act = Activity(
                id=str(uuid.uuid4()),
                type=random.choice(types),
                title=f"Follow up {i}",
                status="pending",
                priority="medium",
                due_date=date.today() + timedelta(days=random.randint(1, 10)),
                owner_id=admin_id
            )
            db.add(act)

        await db.commit()
        print("Seeding complete!")

if __name__ == "__main__":
    asyncio.run(seed_data())
