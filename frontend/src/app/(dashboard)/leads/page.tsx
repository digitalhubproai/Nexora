"use client";
import CrudPage from "@/components/shared/crud-page";
import { UserPlus } from "lucide-react";
export default function LeadsPage() {
  return <CrudPage title="Leads" endpoint="/leads"
    icon={<UserPlus size={24} className="text-violet-400" />}
    columns={[
      { key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "company", label: "Company" },
      { key: "source", label: "Source", format: "badge", badgeMap: { website: "badge-info", referral: "badge-purple", social: "badge-success", cold_call: "badge-warning", email: "badge-neutral" } },
      { key: "score", label: "Score" },
      { key: "status", label: "Status", format: "badge", badgeMap: { new: "badge-info", contacted: "badge-warning", qualified: "badge-success", lost: "badge-danger" } },
      { key: "created_at", label: "Created", format: "date" },
    ]}
    formFields={[
      { key: "name", label: "Name", type: "text", required: true, placeholder: "Lead name" },
      { key: "email", label: "Email", type: "email", placeholder: "lead@example.com" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "company", label: "Company", type: "text" },
      { key: "source", label: "Source", type: "select", options: [
        { value: "website", label: "Website" }, { value: "referral", label: "Referral" },
        { value: "social", label: "Social" }, { value: "cold_call", label: "Cold Call" }, { value: "email", label: "Email" },
      ]},
      { key: "score", label: "Score (0-100)", type: "number" },
      { key: "status", label: "Status", type: "select", options: [
        { value: "new", label: "New" }, { value: "contacted", label: "Contacted" },
        { value: "qualified", label: "Qualified" }, { value: "lost", label: "Lost" },
      ]},
      { key: "notes", label: "Notes", type: "textarea" },
    ]}
  />;
}
