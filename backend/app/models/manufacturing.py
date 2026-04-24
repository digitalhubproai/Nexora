import uuid
from datetime import datetime, timezone, date
from sqlalchemy import String, DateTime, Text, Float, Integer, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base


class ManufacturingOrder(Base):
    __tablename__ = "manufacturing_orders"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    number: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    product_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("products.id"), nullable=True)
    quantity: Mapped[int] = mapped_column(Integer, default=1)
    status: Mapped[str] = mapped_column(String(50), default="draft")  # draft, in_progress, completed, cancelled
    priority: Mapped[str] = mapped_column(String(50), default="medium")
    start_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    end_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    estimated_cost: Mapped[float] = mapped_column(Float, default=0.0)
    actual_cost: Mapped[float] = mapped_column(Float, default=0.0)
    warehouse_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("warehouses.id"), nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_by: Mapped[str | None] = mapped_column(String(36), ForeignKey("users.id"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class BOMItem(Base):
    __tablename__ = "bom_items"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    manufacturing_order_id: Mapped[str] = mapped_column(String(36), ForeignKey("manufacturing_orders.id", ondelete="CASCADE"), nullable=False)
    product_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("products.id"), nullable=True)
    material_name: Mapped[str] = mapped_column(String(255), nullable=False)
    quantity_required: Mapped[int] = mapped_column(Integer, default=1)
    quantity_used: Mapped[int] = mapped_column(Integer, default=0)
    unit_cost: Mapped[float] = mapped_column(Float, default=0.0)
