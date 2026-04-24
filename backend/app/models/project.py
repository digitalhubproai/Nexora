import uuid
from datetime import datetime, timezone, date
from sqlalchemy import String, DateTime, Text, Float, Integer, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="planning")
    priority: Mapped[str] = mapped_column(String(50), default="medium")
    progress: Mapped[int] = mapped_column(Integer, default=0)
    budget: Mapped[float] = mapped_column(Float, default=0.0)
    spent: Mapped[float] = mapped_column(Float, default=0.0)
    start_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    end_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    manager_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("users.id"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="todo")
    priority: Mapped[str] = mapped_column(String(50), default="medium")
    due_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    project_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("projects.id", ondelete="CASCADE"), nullable=True)
    assignee_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("users.id"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
