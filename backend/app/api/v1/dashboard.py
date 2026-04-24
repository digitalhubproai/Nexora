from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.contact import Contact
from app.models.lead import Lead
from app.models.deal import Deal
from app.models.invoice import Invoice
from app.models.employee import Employee
from app.models.product import Product
from app.models.ticket import Ticket
from app.models.project import Project

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/kpis")
async def get_kpis(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    total_revenue = (await db.execute(
        select(func.coalesce(func.sum(Invoice.total), 0)).where(Invoice.status == "paid")
    )).scalar() or 0

    total_contacts = (await db.execute(select(func.count(Contact.id)))).scalar() or 0
    active_leads = (await db.execute(
        select(func.count(Lead.id)).where(Lead.converted == False)
    )).scalar() or 0
    active_deals = (await db.execute(
        select(func.count(Deal.id)).where(Deal.status == "open")
    )).scalar() or 0
    deal_value = (await db.execute(
        select(func.coalesce(func.sum(Deal.value), 0)).where(Deal.status == "open")
    )).scalar() or 0
    pending_invoices = (await db.execute(
        select(func.count(Invoice.id)).where(Invoice.status.in_(["sent", "draft"]))
    )).scalar() or 0
    pending_amount = (await db.execute(
        select(func.coalesce(func.sum(Invoice.total), 0)).where(Invoice.status.in_(["sent", "draft"]))
    )).scalar() or 0
    total_employees = (await db.execute(
        select(func.count(Employee.id)).where(Employee.status == "active")
    )).scalar() or 0
    total_products = (await db.execute(select(func.count(Product.id)))).scalar() or 0
    open_tickets = (await db.execute(
        select(func.count(Ticket.id)).where(Ticket.status.in_(["open", "in_progress"]))
    )).scalar() or 0
    active_projects = (await db.execute(
        select(func.count(Project.id)).where(Project.status.in_(["planning", "active"]))
    )).scalar() or 0

    return {
        "total_revenue": total_revenue,
        "total_contacts": total_contacts,
        "active_leads": active_leads,
        "active_deals": active_deals,
        "deal_pipeline_value": deal_value,
        "pending_invoices": pending_invoices,
        "pending_amount": pending_amount,
        "total_employees": total_employees,
        "total_products": total_products,
        "open_tickets": open_tickets,
        "active_projects": active_projects,
    }


@router.get("/pipeline-summary")
async def pipeline_summary(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    stages = ["qualification", "proposal", "negotiation", "closed_won", "closed_lost"]
    result = {}
    for stage in stages:
        count = (await db.execute(
            select(func.count(Deal.id)).where(Deal.stage == stage)
        )).scalar() or 0
        value = (await db.execute(
            select(func.coalesce(func.sum(Deal.value), 0)).where(Deal.stage == stage)
        )).scalar() or 0
        result[stage] = {"count": count, "value": value}
    return result


@router.get("/recent-activities")
async def recent_activities(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    from app.models.activity import Activity
    from app.schemas.erp_schemas import ActivityRead as AR  # noqa
    result = await db.execute(
        select(Activity).order_by(Activity.created_at.desc()).limit(10)
    )
    items = result.scalars().all()
    return [{"id": a.id, "type": a.type, "title": a.title, "status": a.status,
             "created_at": str(a.created_at)} for a in items]
