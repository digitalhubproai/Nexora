"use client";
import CrudPage from "@/components/shared/crud-page";
import { Shield } from "lucide-react";
export default function UsersPage() {
  return <CrudPage title="Users" endpoint="/users" icon={<Shield size={24} className="text-violet-400" />}
    columns={[
      { key: "first_name", label: "First Name" }, { key: "last_name", label: "Last Name" }, { key: "email", label: "Email" },
      { key: "role", label: "Role", format: "badge", badgeMap: { admin: "badge-danger", manager: "badge-purple", sales_rep: "badge-info", accountant: "badge-warning", hr_manager: "badge-success", supply_chain_mgr: "badge-info", support_agent: "badge-neutral", employee: "badge-neutral" } },
      { key: "department", label: "Department" },
      { key: "is_active", label: "Active", format: "badge", badgeMap: { true: "badge-success", false: "badge-danger" } },
      { key: "created_at", label: "Created", format: "date" },
    ]}
    formFields={[
      { key: "first_name", label: "First Name", type: "text", required: true },
      { key: "last_name", label: "Last Name", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "password", label: "Password", type: "text", required: true },
      { key: "role", label: "Role", type: "select", required: true, options: [
        { value: "admin", label: "Admin" }, { value: "manager", label: "Manager" }, { value: "sales_rep", label: "Sales Rep" },
        { value: "accountant", label: "Accountant" }, { value: "hr_manager", label: "HR Manager" },
        { value: "supply_chain_mgr", label: "Supply Chain Mgr" }, { value: "support_agent", label: "Support Agent" },
        { value: "employee", label: "Employee" },
      ]},
      { key: "department", label: "Department", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
    ]} />;
}
