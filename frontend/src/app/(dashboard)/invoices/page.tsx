"use client";
import CrudPage from "@/components/shared/crud-page";
import { Receipt } from "lucide-react";
export default function InvoicesPage() {
  return <CrudPage title="Invoices" endpoint="/invoices"
    icon={<Receipt size={24} className="text-amber-400" />}
    columns={[
      { key: "number", label: "Invoice #" }, { key: "total", label: "Amount", format: "currency" },
      { key: "status", label: "Status", format: "badge", badgeMap: { draft: "badge-neutral", sent: "badge-info", paid: "badge-success", overdue: "badge-danger" } },
      { key: "issue_date", label: "Issued", format: "date" }, { key: "due_date", label: "Due", format: "date" },
    ]}
    formFields={[
      { key: "number", label: "Invoice Number", type: "text", required: true, placeholder: "INV-001" },
      { key: "subtotal", label: "Subtotal", type: "number", required: true },
      { key: "tax_rate", label: "Tax Rate %", type: "number" },
      { key: "tax_amount", label: "Tax Amount", type: "number" },
      { key: "discount", label: "Discount", type: "number" },
      { key: "total", label: "Total", type: "number", required: true },
      { key: "status", label: "Status", type: "select", options: [
        { value: "draft", label: "Draft" }, { value: "sent", label: "Sent" },
        { value: "paid", label: "Paid" }, { value: "overdue", label: "Overdue" },
      ]},
      { key: "issue_date", label: "Issue Date", type: "date" },
      { key: "due_date", label: "Due Date", type: "date" },
      { key: "notes", label: "Notes", type: "textarea" },
    ]}
  />;
}
