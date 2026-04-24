"use client";
import CrudPage from "@/components/shared/crud-page";
import { FileText } from "lucide-react";
export default function ExpensesPage() {
  return <CrudPage title="Expenses" endpoint="/expenses" icon={<FileText size={24} className="text-rose-400" />}
    columns={[
      { key: "title", label: "Title" }, { key: "amount", label: "Amount", format: "currency" }, { key: "category", label: "Category" },
      { key: "status", label: "Status", format: "badge", badgeMap: { pending: "badge-warning", approved: "badge-success", rejected: "badge-danger", reimbursed: "badge-info" } },
      { key: "expense_date", label: "Date", format: "date" },
    ]}
    formFields={[
      { key: "title", label: "Title", type: "text", required: true }, { key: "amount", label: "Amount ($)", type: "number", required: true },
      { key: "category", label: "Category", type: "select", options: [{ value: "travel", label: "Travel" }, { value: "meals", label: "Meals" }, { value: "office", label: "Office" }, { value: "software", label: "Software" }, { value: "general", label: "General" }] },
      { key: "expense_date", label: "Date", type: "date", required: true }, { key: "description", label: "Description", type: "textarea" },
    ]} />;
}
