"use client";
import CrudPage from "@/components/shared/crud-page";
import { BadgeDollarSign } from "lucide-react";
export default function PayrollPage() {
  return <CrudPage title="Employees Payroll" endpoint="/employees" icon={<BadgeDollarSign size={24} className="text-emerald-400" />}
    columns={[
      { key: "employee_id", label: "Emp ID" }, { key: "first_name", label: "First Name" }, { key: "last_name", label: "Last Name" },
      { key: "department", label: "Department" }, { key: "position", label: "Position" },
      { key: "salary", label: "Salary", format: "currency" },
      { key: "status", label: "Status", format: "badge", badgeMap: { active: "badge-success", on_leave: "badge-warning", terminated: "badge-danger" } },
    ]}
    formFields={[
      { key: "employee_id", label: "Employee ID", type: "text", required: true },
      { key: "first_name", label: "First Name", type: "text", required: true },
      { key: "last_name", label: "Last Name", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "department", label: "Department", type: "text", required: true },
      { key: "position", label: "Position", type: "text", required: true },
      { key: "salary", label: "Salary ($)", type: "number", required: true },
      { key: "hire_date", label: "Hire Date", type: "date", required: true },
    ]} />;
}
