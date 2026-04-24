"use client";
import CrudPage from "@/components/shared/crud-page";
import { LifeBuoy } from "lucide-react";
export default function HelpdeskPage() {
  return <CrudPage title="Support Tickets" endpoint="/tickets" icon={<LifeBuoy size={24} className="text-rose-400" />}
    columns={[
      { key: "number", label: "Ticket #" }, { key: "subject", label: "Subject" }, { key: "category", label: "Category" },
      { key: "priority", label: "Priority", format: "badge", badgeMap: { low: "badge-neutral", medium: "badge-warning", high: "badge-danger", urgent: "badge-danger" } },
      { key: "status", label: "Status", format: "badge", badgeMap: { open: "badge-info", in_progress: "badge-warning", resolved: "badge-success", closed: "badge-neutral" } },
      { key: "created_at", label: "Created", format: "date" },
    ]}
    formFields={[
      { key: "number", label: "Ticket Number", type: "text", required: true, placeholder: "TKT-001" },
      { key: "subject", label: "Subject", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "priority", label: "Priority", type: "select", options: [{ value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "high", label: "High" }, { value: "urgent", label: "Urgent" }] },
      { key: "category", label: "Category", type: "select", options: [{ value: "bug", label: "Bug" }, { value: "feature", label: "Feature Request" }, { value: "support", label: "Support" }, { value: "billing", label: "Billing" }] },
    ]} />;
}
