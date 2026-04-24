import uuid
from datetime import datetime, timezone
from sqlalchemy import String, DateTime, Text, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base


class Account(Base):
    __tablename__ = "accounts"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    code: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    type: Mapped[str] = mapped_column(String(50), nullable=False)  # asset, liability, equity, revenue, expense
    parent_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("accounts.id"), nullable=True)
    balance: Mapped[float] = mapped_column(Float, default=0.0)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    number: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    account_id: Mapped[str] = mapped_column(String(36), ForeignKey("accounts.id"), nullable=False)
    debit: Mapped[float] = mapped_column(Float, default=0.0)
    credit: Mapped[float] = mapped_column(Float, default=0.0)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    reference: Mapped[str | None] = mapped_column(String(255), nullable=True)
    created_by: Mapped[str | None] = mapped_column(String(36), ForeignKey("users.id"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
