from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import get_settings
from app.core.database import engine, Base
from app.api.v1.auth import router as auth_router
from app.api.v1.dashboard import router as dashboard_router
from app.api.v1.crud_factory import create_crud_router

# Import all models to register with SQLAlchemy
from app.models import *  # noqa

# Import schemas
from app.schemas.schemas import (
    ContactRead, ContactCreate, ContactUpdate,
    LeadRead, LeadCreate, LeadUpdate,
    DealRead, DealCreate, DealUpdate,
    UserRead, UserCreate, UserUpdate,
)
from app.schemas.erp_schemas import (
    InvoiceRead, InvoiceCreate, InvoiceUpdate,
    ProductRead, ProductCreate, ProductUpdate,
    EmployeeRead, EmployeeCreate, EmployeeUpdate,
    ProjectRead, ProjectCreate, ProjectUpdate,
    ActivityRead, ActivityCreate, ActivityUpdate,
    CampaignRead, CampaignCreate, CampaignUpdate,
    ExpenseRead, ExpenseCreate, ExpenseUpdate,
    SupplierRead, SupplierCreate, SupplierUpdate,
    WarehouseRead, WarehouseCreate, WarehouseUpdate,
    TicketRead, TicketCreate, TicketUpdate,
    AttendanceRead, AttendanceCreate, AttendanceUpdate,
    LeaveRead, LeaveCreate, LeaveUpdate,
    QuotationRead, QuotationCreate, QuotationUpdate,
    PurchaseOrderRead, PurchaseOrderCreate, PurchaseOrderUpdate,
    ManufacturingOrderRead, ManufacturingOrderCreate, ManufacturingOrderUpdate,
    DocumentRead, DocumentCreate, DocumentUpdate,
    GatepassRead, GatepassCreate, GatepassUpdate,
)

# Import models for router creation
from app.models.contact import Contact
from app.models.lead import Lead
from app.models.deal import Deal
from app.models.user import User as UserModel
from app.models.invoice import Invoice
from app.models.product import Product
from app.models.employee import Employee as EmployeeModel
from app.models.project import Project
from app.models.activity import Activity
from app.models.campaign import Campaign
from app.models.expense import Expense
from app.models.supplier import Supplier
from app.models.warehouse import Warehouse
from app.models.ticket import Ticket
from app.models.attendance import Attendance
from app.models.leave import Leave
from app.models.quotation import Quotation
from app.models.purchase_order import PurchaseOrder
from app.models.manufacturing import ManufacturingOrder
from app.models.document import Document
from app.models.gatepass import Gatepass

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(
    title=f"{settings.APP_NAME} API",
    version=settings.APP_VERSION,
    description="Complete CRM & ERP System API",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Auth routes
app.include_router(auth_router, prefix="/api/v1")
app.include_router(dashboard_router, prefix="/api/v1")

# CRUD routes for all entities
crud_routers = [
    (Contact, ContactRead, ContactCreate, ContactUpdate, "/contacts", ["Contacts"]),
    (Lead, LeadRead, LeadCreate, LeadUpdate, "/leads", ["Leads"]),
    (Deal, DealRead, DealCreate, DealUpdate, "/deals", ["Deals"]),
    (UserModel, UserRead, UserCreate, UserUpdate, "/users", ["Users"]),
    (Invoice, InvoiceRead, InvoiceCreate, InvoiceUpdate, "/invoices", ["Invoices"]),
    (Product, ProductRead, ProductCreate, ProductUpdate, "/products", ["Products"]),
    (EmployeeModel, EmployeeRead, EmployeeCreate, EmployeeUpdate, "/employees", ["Employees"]),
    (Project, ProjectRead, ProjectCreate, ProjectUpdate, "/projects", ["Projects"]),
    (Activity, ActivityRead, ActivityCreate, ActivityUpdate, "/activities", ["Activities"]),
    (Campaign, CampaignRead, CampaignCreate, CampaignUpdate, "/campaigns", ["Campaigns"]),
    (Expense, ExpenseRead, ExpenseCreate, ExpenseUpdate, "/expenses", ["Expenses"]),
    (Supplier, SupplierRead, SupplierCreate, SupplierUpdate, "/suppliers", ["Suppliers"]),
    (Warehouse, WarehouseRead, WarehouseCreate, WarehouseUpdate, "/warehouses", ["Warehouses"]),
    (Ticket, TicketRead, TicketCreate, TicketUpdate, "/tickets", ["Tickets"]),
    (Attendance, AttendanceRead, AttendanceCreate, AttendanceUpdate, "/attendance", ["Attendance"]),
    (Leave, LeaveRead, LeaveCreate, LeaveUpdate, "/leaves", ["Leaves"]),
    (Quotation, QuotationRead, QuotationCreate, QuotationUpdate, "/quotations", ["Quotations"]),
    (PurchaseOrder, PurchaseOrderRead, PurchaseOrderCreate, PurchaseOrderUpdate, "/purchase-orders", ["Purchase Orders"]),
    (ManufacturingOrder, ManufacturingOrderRead, ManufacturingOrderCreate, ManufacturingOrderUpdate, "/manufacturing", ["Manufacturing"]),
    (Document, DocumentRead, DocumentCreate, DocumentUpdate, "/documents", ["Documents"]),
    (Gatepass, GatepassRead, GatepassCreate, GatepassUpdate, "/gatepass", ["Gatepass"]),
]

for model, read_s, create_s, update_s, prefix, tags in crud_routers:
    router = create_crud_router(model, read_s, create_s, update_s, prefix, tags)
    app.include_router(router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"app": settings.APP_NAME, "version": settings.APP_VERSION, "status": "running"}


@app.get("/api/v1/health")
async def health():
    return {"status": "healthy"}
