from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


# --- Auth ---
class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    role: str = "employee"

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: "UserRead"

class RefreshRequest(BaseModel):
    refresh_token: str


# --- User ---
class UserRead(BaseModel):
    id: str
    employee_id: Optional[str] = None
    email: str
    first_name: str
    last_name: str
    role: str
    avatar: Optional[str] = None
    phone: Optional[str] = None
    department: Optional[str] = None
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}

class UserCreate(BaseModel):
    employee_id: Optional[str] = None
    email: str
    password: str
    first_name: str
    last_name: str
    role: str = "employee"
    phone: Optional[str] = None
    department: Optional[str] = None

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    role: Optional[str] = None
    phone: Optional[str] = None
    department: Optional[str] = None
    is_active: Optional[bool] = None


# --- Contact ---
class ContactRead(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    position: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    tags: Optional[str] = None
    status: str
    source: Optional[str] = None
    notes: Optional[str] = None
    owner_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}

class ContactCreate(BaseModel):
    first_name: str
    last_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    position: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    tags: Optional[str] = None
    status: str = "active"
    source: Optional[str] = None
    notes: Optional[str] = None

class ContactUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    position: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    tags: Optional[str] = None
    status: Optional[str] = None
    source: Optional[str] = None
    notes: Optional[str] = None


# --- Lead ---
class LeadRead(BaseModel):
    id: str
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    position: Optional[str] = None
    source: str
    score: int
    status: str
    notes: Optional[str] = None
    assigned_to: Optional[str] = None
    converted: bool
    created_at: datetime

    model_config = {"from_attributes": True}

class LeadCreate(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    position: Optional[str] = None
    source: str = "website"
    score: int = 0
    status: str = "new"
    notes: Optional[str] = None

class LeadUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    source: Optional[str] = None
    score: Optional[int] = None
    status: Optional[str] = None
    notes: Optional[str] = None
    assigned_to: Optional[str] = None


# --- Deal ---
class DealRead(BaseModel):
    id: str
    title: str
    value: float
    stage: str
    probability: int
    expected_close: Optional[str] = None
    status: str
    contact_id: Optional[str] = None
    owner_id: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}

class DealCreate(BaseModel):
    title: str
    value: float = 0.0
    stage: str = "qualification"
    probability: int = 10
    expected_close: Optional[str] = None
    contact_id: Optional[str] = None
    notes: Optional[str] = None

class DealUpdate(BaseModel):
    title: Optional[str] = None
    value: Optional[float] = None
    stage: Optional[str] = None
    probability: Optional[int] = None
    expected_close: Optional[str] = None
    status: Optional[str] = None
    contact_id: Optional[str] = None
    notes: Optional[str] = None
    loss_reason: Optional[str] = None


# --- Generic paginated response ---
class PaginatedResponse(BaseModel):
    items: list
    total: int
    page: int
    page_size: int
    total_pages: int
