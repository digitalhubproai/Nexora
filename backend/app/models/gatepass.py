import uuid
from datetime import datetime, timezone
from sqlalchemy import String, DateTime, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class Gatepass(Base):
    __tablename__ = "gatepasses"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    pass_no: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    type: Mapped[str] = mapped_column(String(20), default="in")  # in, out
    carrier_name: Mapped[str] = mapped_column(String(150), nullable=False)
    vehicle_no: Mapped[str | None] = mapped_column(String(50), nullable=True)
    purpose: Mapped[str | None] = mapped_column(Text, nullable=True)
    department: Mapped[str | None] = mapped_column(String(100), nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="active") # active, pending, won
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
