"use client";
import CrudPage from "@/components/shared/crud-page";
import { CalendarOff } from "lucide-react";
export default function LeavesPage() {
  return <CrudPage title="Leave Requests" endpoint="/leaves" icon={<CalendarOff size={24} className="text-amber-400" />}
    columns={[
      { key: "employee_number", label: "Emp ID" },
      { key: "employee_name", label: "Employee" },
      { key: "type", label: "Type", format: "badge", badgeMap: { annual: "badge-info", sick: "badge-danger", casual: "badge-warning", maternity: "badge-purple", unpaid: "badge-neutral" } },
      { key: "start_date", label: "Start", format: "date" }, { key: "end_date", label: "End", format: "date" }, { key: "days", label: "Days" },
      { key: "status", label: "Status", format: "badge", badgeMap: { pending: "badge-warning", approved: "badge-success", rejected: "badge-danger" } },
    ]}
    formFields={[
      { key: "employee_id", label: "Employee ID (e.g. NEX0000001)", type: "text", required: true },
      { key: "type", label: "Leave Type", type: "select", required: true, options: [{ value: "annual", label: "Annual" }, { value: "sick", label: "Sick" }, { value: "casual", label: "Casual" }, { value: "maternity", label: "Maternity" }, { value: "unpaid", label: "Unpaid" }] },
      { key: "start_date", label: "Start Date", type: "date", required: true }, { key: "end_date", label: "End Date", type: "date", required: true },
      { key: "days", label: "Days", type: "number", required: true }, { key: "reason", label: "Reason", type: "textarea" },
    ]} />;
}
