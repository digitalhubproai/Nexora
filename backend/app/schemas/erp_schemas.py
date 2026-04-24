"""Additional Pydantic schemas for all ERP entities."""
from pydantic import BaseModel
from datetime import datetime, date, time
from typing import Optional


# --- Invoice ---
class InvoiceItemSchema(BaseModel):
    description: str
    quantity: int = 1
    unit_price: float = 0.0
    total: float = 0.0
    product_id: Optional[str] = None

class InvoiceRead(BaseModel):
    id: str; number: str; contact_id: Optional[str] = None
    subtotal: float; tax_rate: float; tax_amount: float; discount: float; total: float
    status: str; issue_date: date; due_date: Optional[date] = None
    paid_date: Optional[date] = None; payment_method: Optional[str] = None
    notes: Optional[str] = None; owner_id: Optional[str] = None; created_at: datetime
    model_config = {"from_attributes": True}

class InvoiceCreate(BaseModel):
    number: str; contact_id: Optional[str] = None
    subtotal: float = 0; tax_rate: float = 0; tax_amount: float = 0; discount: float = 0; total: float = 0
    status: str = "draft"; issue_date: Optional[date] = None; due_date: Optional[date] = None
    notes: Optional[str] = None

class InvoiceUpdate(BaseModel):
    contact_id: Optional[str] = None; subtotal: Optional[float] = None; tax_rate: Optional[float] = None
    tax_amount: Optional[float] = None; discount: Optional[float] = None; total: Optional[float] = None
    status: Optional[str] = None; due_date: Optional[date] = None; paid_date: Optional[date] = None
    payment_method: Optional[str] = None; notes: Optional[str] = None


# --- Product ---
class ProductRead(BaseModel):
    id: str; name: str; sku: str; description: Optional[str] = None
    category_id: Optional[str] = None; price: float; cost: float
    stock_quantity: int; low_stock_threshold: int; unit: str; status: str
    warehouse_id: Optional[str] = None; created_at: datetime
    model_config = {"from_attributes": True}

class ProductCreate(BaseModel):
    name: str; sku: str; description: Optional[str] = None; category_id: Optional[str] = None
    price: float = 0; cost: float = 0; stock_quantity: int = 0; low_stock_threshold: int = 10
    unit: str = "pcs"; status: str = "active"; warehouse_id: Optional[str] = None

class ProductUpdate(BaseModel):
    name: Optional[str] = None; sku: Optional[str] = None; description: Optional[str] = None
    category_id: Optional[str] = None; price: Optional[float] = None; cost: Optional[float] = None
    stock_quantity: Optional[int] = None; low_stock_threshold: Optional[int] = None
    unit: Optional[str] = None; status: Optional[str] = None


# --- Employee ---
class EmployeeRead(BaseModel):
    id: str; employee_id: str; first_name: str; last_name: str; email: str
    phone: Optional[str] = None; department: str; position: str; salary: float
    hire_date: date; status: str; leave_balance: int; created_at: datetime
    model_config = {"from_attributes": True}

class EmployeeCreate(BaseModel):
    employee_id: str; first_name: str; last_name: str; email: str
    phone: Optional[str] = None; department: str; position: str; salary: float = 0
    hire_date: date; status: str = "active"

class EmployeeUpdate(BaseModel):
    first_name: Optional[str] = None; last_name: Optional[str] = None
    phone: Optional[str] = None; department: Optional[str] = None; position: Optional[str] = None
    salary: Optional[float] = None; status: Optional[str] = None; leave_balance: Optional[int] = None


# --- Project ---
class ProjectRead(BaseModel):
    id: str; name: str; description: Optional[str] = None; status: str; priority: str
    progress: int; budget: float; spent: float; start_date: Optional[date] = None
    end_date: Optional[date] = None; manager_id: Optional[str] = None; created_at: datetime
    model_config = {"from_attributes": True}

class ProjectCreate(BaseModel):
    name: str; description: Optional[str] = None; status: str = "planning"
    priority: str = "medium"; budget: float = 0; start_date: Optional[date] = None
    end_date: Optional[date] = None

class ProjectUpdate(BaseModel):
    name: Optional[str] = None; description: Optional[str] = None; status: Optional[str] = None
    priority: Optional[str] = None; progress: Optional[int] = None; budget: Optional[float] = None
    spent: Optional[float] = None; start_date: Optional[date] = None; end_date: Optional[date] = None


# --- Activity ---
class ActivityRead(BaseModel):
    id: str; type: str; title: str; description: Optional[str] = None
    status: str; priority: str; due_date: Optional[date] = None
    contact_id: Optional[str] = None; deal_id: Optional[str] = None
    owner_id: Optional[str] = None; created_at: datetime
    model_config = {"from_attributes": True}

class ActivityCreate(BaseModel):
    type: str; title: str; description: Optional[str] = None
    status: str = "pending"; priority: str = "medium"; due_date: Optional[date] = None
    contact_id: Optional[str] = None; deal_id: Optional[str] = None

class ActivityUpdate(BaseModel):
    type: Optional[str] = None; title: Optional[str] = None; description: Optional[str] = None
    status: Optional[str] = None; priority: Optional[str] = None; due_date: Optional[date] = None


# --- Campaign ---
class CampaignRead(BaseModel):
    id: str; name: str; type: str; status: str; budget: float; spent: float
    revenue: float; leads_generated: int; start_date: Optional[date] = None
    end_date: Optional[date] = None; description: Optional[str] = None; created_at: datetime
    model_config = {"from_attributes": True}

class CampaignCreate(BaseModel):
    name: str; type: str = "email"; status: str = "draft"; budget: float = 0
    start_date: Optional[date] = None; end_date: Optional[date] = None; description: Optional[str] = None

class CampaignUpdate(BaseModel):
    name: Optional[str] = None; type: Optional[str] = None; status: Optional[str] = None
    budget: Optional[float] = None; spent: Optional[float] = None; revenue: Optional[float] = None
    leads_generated: Optional[int] = None; description: Optional[str] = None


# --- Expense ---
class ExpenseRead(BaseModel):
    id: str; title: str; amount: float; category: str; status: str
    expense_date: date; description: Optional[str] = None; employee_id: Optional[str] = None
    created_at: datetime
    model_config = {"from_attributes": True}

class ExpenseCreate(BaseModel):
    title: str; amount: float; category: str = "general"; expense_date: date
    description: Optional[str] = None; employee_id: Optional[str] = None

class ExpenseUpdate(BaseModel):
    title: Optional[str] = None; amount: Optional[float] = None; category: Optional[str] = None
    status: Optional[str] = None; description: Optional[str] = None


# --- Supplier ---
class SupplierRead(BaseModel):
    id: str; name: str; contact_person: Optional[str] = None; email: Optional[str] = None
    phone: Optional[str] = None; city: Optional[str] = None; country: Optional[str] = None
    rating: float; status: str; payment_terms: Optional[str] = None; created_at: datetime
    model_config = {"from_attributes": True}

class SupplierCreate(BaseModel):
    name: str; contact_person: Optional[str] = None; email: Optional[str] = None
    phone: Optional[str] = None; city: Optional[str] = None; country: Optional[str] = None
    payment_terms: Optional[str] = None

class SupplierUpdate(BaseModel):
    name: Optional[str] = None; contact_person: Optional[str] = None; email: Optional[str] = None
    phone: Optional[str] = None; rating: Optional[float] = None; status: Optional[str] = None


# --- Warehouse ---
class WarehouseRead(BaseModel):
    id: str; name: str; code: str; address: Optional[str] = None
    city: Optional[str] = None; country: Optional[str] = None; capacity: int; status: str; created_at: datetime
    model_config = {"from_attributes": True}

class WarehouseCreate(BaseModel):
    name: str; code: str; address: Optional[str] = None; city: Optional[str] = None
    country: Optional[str] = None; capacity: int = 10000

class WarehouseUpdate(BaseModel):
    name: Optional[str] = None; address: Optional[str] = None; city: Optional[str] = None
    capacity: Optional[int] = None; status: Optional[str] = None


# --- Ticket ---
class TicketRead(BaseModel):
    id: str; number: str; subject: str; description: Optional[str] = None
    status: str; priority: str; category: Optional[str] = None
    contact_id: Optional[str] = None; assigned_to: Optional[str] = None; created_at: datetime
    model_config = {"from_attributes": True}

class TicketCreate(BaseModel):
    number: str; subject: str; description: Optional[str] = None; priority: str = "medium"
    category: Optional[str] = None; contact_id: Optional[str] = None

class TicketUpdate(BaseModel):
    subject: Optional[str] = None; description: Optional[str] = None; status: Optional[str] = None
    priority: Optional[str] = None; assigned_to: Optional[str] = None


# --- Attendance ---
class AttendanceRead(BaseModel):
    id: str; employee_id: str; date: date; check_in: Optional[time] = None
    check_out: Optional[time] = None; status: str; hours_worked: Optional[float] = None; created_at: datetime
    employee_number: Optional[str] = None
    employee_name: Optional[str] = None
    model_config = {"from_attributes": True}

class AttendanceCreate(BaseModel):
    employee_id: str; date: date; check_in: Optional[time] = None
    check_out: Optional[time] = None; status: str = "present"

class AttendanceUpdate(BaseModel):
    check_in: Optional[time] = None; check_out: Optional[time] = None
    status: Optional[str] = None; hours_worked: Optional[float] = None


# --- Leave ---
class LeaveRead(BaseModel):
    id: str; employee_id: str; type: str; start_date: date; end_date: date
    days: int; status: str; reason: Optional[str] = None; created_at: datetime
    employee_number: Optional[str] = None
    employee_name: Optional[str] = None
    model_config = {"from_attributes": True}

class LeaveCreate(BaseModel):
    employee_id: str; type: str; start_date: date; end_date: date
    days: int = 1; reason: Optional[str] = None

class LeaveUpdate(BaseModel):
    status: Optional[str] = None; reason: Optional[str] = None


# --- Quotation ---
class QuotationRead(BaseModel):
    id: str; number: str; contact_id: Optional[str] = None; subtotal: float
    tax_rate: float; tax_amount: float; discount: float; total: float
    status: str; valid_until: Optional[date] = None; notes: Optional[str] = None; created_at: datetime
    model_config = {"from_attributes": True}

class QuotationCreate(BaseModel):
    number: str; contact_id: Optional[str] = None; subtotal: float = 0
    tax_rate: float = 0; tax_amount: float = 0; discount: float = 0; total: float = 0
    status: str = "draft"; valid_until: Optional[date] = None; notes: Optional[str] = None

class QuotationUpdate(BaseModel):
    contact_id: Optional[str] = None; subtotal: Optional[float] = None
    tax_amount: Optional[float] = None; discount: Optional[float] = None; total: Optional[float] = None
    status: Optional[str] = None; notes: Optional[str] = None


# --- PurchaseOrder ---
class PurchaseOrderRead(BaseModel):
    id: str; number: str; supplier_id: Optional[str] = None; status: str
    subtotal: float; tax_amount: float; total: float; order_date: Optional[date] = None
    expected_date: Optional[date] = None; warehouse_id: Optional[str] = None; created_at: datetime
    model_config = {"from_attributes": True}

class PurchaseOrderCreate(BaseModel):
    number: str; supplier_id: Optional[str] = None; subtotal: float = 0
    tax_amount: float = 0; total: float = 0; order_date: Optional[date] = None
    expected_date: Optional[date] = None; warehouse_id: Optional[str] = None

class PurchaseOrderUpdate(BaseModel):
    supplier_id: Optional[str] = None; status: Optional[str] = None; subtotal: Optional[float] = None
    total: Optional[float] = None; expected_date: Optional[date] = None


# --- ManufacturingOrder ---
class ManufacturingOrderRead(BaseModel):
    id: str; number: str; product_id: Optional[str] = None; quantity: int; status: str
    priority: str; start_date: Optional[date] = None; end_date: Optional[date] = None
    estimated_cost: float; actual_cost: float; created_at: datetime
    model_config = {"from_attributes": True}

class ManufacturingOrderCreate(BaseModel):
    number: str; product_id: Optional[str] = None; quantity: int = 1
    priority: str = "medium"; start_date: Optional[date] = None; end_date: Optional[date] = None
    estimated_cost: float = 0

class ManufacturingOrderUpdate(BaseModel):
    quantity: Optional[int] = None; status: Optional[str] = None; priority: Optional[str] = None
    actual_cost: Optional[float] = None; end_date: Optional[date] = None


# --- Document ---
class DocumentRead(BaseModel):
    id: str; name: str; type: str; file_url: Optional[str] = None; file_size: int
    category: Optional[str] = None; description: Optional[str] = None; created_at: datetime
    model_config = {"from_attributes": True}

class DocumentCreate(BaseModel):
    name: str; type: str = "general"; file_url: Optional[str] = None; file_size: int = 0
    category: Optional[str] = None; description: Optional[str] = None

class DocumentUpdate(BaseModel):
    name: Optional[str] = None; type: Optional[str] = None; category: Optional[str] = None
# --- Gatepass ---
class GatepassRead(BaseModel):
    id: str; pass_no: str; type: str; carrier_name: str; vehicle_no: Optional[str] = None
    purpose: Optional[str] = None; department: Optional[str] = None; status: str; created_at: datetime
    model_config = {"from_attributes": True}

class GatepassCreate(BaseModel):
    pass_no: str; type: str = "in"; carrier_name: str; vehicle_no: Optional[str] = None
    purpose: Optional[str] = None; department: Optional[str] = None; status: str = "active"

class GatepassUpdate(BaseModel):
    type: Optional[str] = None; carrier_name: Optional[str] = None; vehicle_no: Optional[str] = None
    purpose: Optional[str] = None; department: Optional[str] = None; status: Optional[str] = None
