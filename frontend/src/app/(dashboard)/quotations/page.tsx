"use client";
import CrudPage from "@/components/shared/crud-page";
import { FileText } from "lucide-react";
export default function QuotationsPage() {
  return <CrudPage title="Quotations" endpoint="/quotations" icon={<FileText size={24} className="text-violet-400" />}
    columns={[
      { key: "number", label: "Quote #" }, { key: "total", label: "Total", format: "currency" },
      { key: "status", label: "Status", format: "badge", badgeMap: { draft: "badge-neutral", sent: "badge-info", accepted: "badge-success", rejected: "badge-danger", expired: "badge-warning" } },
      { key: "valid_until", label: "Valid Until", format: "date" }, { key: "created_at", label: "Created", format: "date" },
    ]}
    formFields={[
      { key: "number", label: "Quote Number", type: "text", required: true, placeholder: "QT-001" },
      { key: "subtotal", label: "Subtotal", type: "number" }, { key: "tax_rate", label: "Tax %", type: "number" },
      { key: "total", label: "Total", type: "number", required: true },
      { key: "status", label: "Status", type: "select", options: [{ value: "draft", label: "Draft" }, { value: "sent", label: "Sent" }, { value: "accepted", label: "Accepted" }, { value: "rejected", label: "Rejected" }] },
      { key: "valid_until", label: "Valid Until", type: "date" }, { key: "notes", label: "Notes", type: "textarea" },
    ]} />;
}
