import uuid
from datetime import datetime, timezone, date
from sqlalchemy import String, DateTime, Text, Float, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base


class Campaign(Base):
    __tablename__ = "campaigns"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    type: Mapped[str] = mapped_column(String(50), default="email")  # email, social, ads, event
    status: Mapped[str] = mapped_column(String(50), default="draft")
    budget: Mapped[float] = mapped_column(Float, default=0.0)
    spent: Mapped[float] = mapped_column(Float, default=0.0)
    revenue: Mapped[float] = mapped_column(Float, default=0.0)
    leads_generated: Mapped[int] = mapped_column(default=0)
    start_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    end_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    owner_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("users.id"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
