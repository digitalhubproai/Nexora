import uuid
from datetime import datetime, timezone, date
from sqlalchemy import String, DateTime, Text, Float, Date, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base


class Invoice(Base):
    __tablename__ = "invoices"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    number: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    contact_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("contacts.id"), nullable=True)
    subtotal: Mapped[float] = mapped_column(Float, default=0.0)
    tax_rate: Mapped[float] = mapped_column(Float, default=0.0)
    tax_amount: Mapped[float] = mapped_column(Float, default=0.0)
    discount: Mapped[float] = mapped_column(Float, default=0.0)
    total: Mapped[float] = mapped_column(Float, default=0.0)
    status: Mapped[str] = mapped_column(String(50), default="draft")
    issue_date: Mapped[date] = mapped_column(Date, default=date.today)
    due_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    paid_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    payment_method: Mapped[str | None] = mapped_column(String(100), nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    owner_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("users.id"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class InvoiceItem(Base):
    __tablename__ = "invoice_items"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    invoice_id: Mapped[str] = mapped_column(String(36), ForeignKey("invoices.id", ondelete="CASCADE"), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, default=1)
    unit_price: Mapped[float] = mapped_column(Float, default=0.0)
    total: Mapped[float] = mapped_column(Float, default=0.0)
    product_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("products.id"), nullable=True)
