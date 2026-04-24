"use client";
import CrudPage from "@/components/shared/crud-page";
import { UserCog } from "lucide-react";
export default function EmployeesPage() {
  return <CrudPage title="Employees" endpoint="/employees"
    icon={<UserCog size={24} className="text-emerald-400" />}
    columns={[
      { key: "employee_id", label: "Emp ID" }, { key: "first_name", label: "First Name" }, { key: "last_name", label: "Last Name" },
      { key: "email", label: "Email" }, { key: "department", label: "Department" }, { key: "position", label: "Position" },
      { key: "salary", label: "Salary", format: "currency" },
      { key: "status", label: "Status", format: "badge", badgeMap: { active: "badge-success", on_leave: "badge-warning", terminated: "badge-danger" } },
      { key: "hire_date", label: "Hired", format: "date" },
    ]}
    formFields={[
      { key: "employee_id", label: "Employee ID", type: "text", required: true, placeholder: "EMP-001" },
      { key: "first_name", label: "First Name", type: "text", required: true },
      { key: "last_name", label: "Last Name", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "phone", label: "Phone", type: "text" },
      { key: "department", label: "Department", type: "select", required: true, options: [
        { value: "Engineering", label: "Engineering" }, { value: "Sales", label: "Sales" },
        { value: "Marketing", label: "Marketing" }, { value: "Finance", label: "Finance" },
        { value: "HR", label: "Human Resources" }, { value: "Operations", label: "Operations" },
        { value: "Support", label: "Support" },
      ]},
      { key: "position", label: "Position", type: "text", required: true },
      { key: "salary", label: "Salary ($)", type: "number", required: true },
      { key: "hire_date", label: "Hire Date", type: "date", required: true },
      { key: "status", label: "Status", type: "select", options: [
        { value: "active", label: "Active" }, { value: "on_leave", label: "On Leave" }, { value: "terminated", label: "Terminated" },
      ]},
    ]}
  />;
}
