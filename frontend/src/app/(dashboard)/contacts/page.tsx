"use client";
import CrudPage from "@/components/shared/crud-page";
import { Users } from "lucide-react";

const columns = [
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "company", label: "Company" },
  { key: "status", label: "Status", format: "badge" as const, badgeMap: { active: "badge-success", inactive: "badge-neutral" } },
  { key: "created_at", label: "Created", format: "date" as const },
];

const formFields = [
  { key: "first_name", label: "First Name", type: "text" as const, required: true, placeholder: "John" },
  { key: "last_name", label: "Last Name", type: "text" as const, required: true, placeholder: "Doe" },
  { key: "email", label: "Email", type: "email" as const, placeholder: "john@example.com" },
  { key: "phone", label: "Phone", type: "text" as const, placeholder: "+1 234 567 890" },
  { key: "company", label: "Company", type: "text" as const, placeholder: "Acme Inc" },
  { key: "position", label: "Position", type: "text" as const, placeholder: "CEO" },
  { key: "status", label: "Status", type: "select" as const, options: [
    { value: "active", label: "Active" }, { value: "inactive", label: "Inactive" },
  ]},
  { key: "source", label: "Source", type: "select" as const, options: [
    { value: "website", label: "Website" }, { value: "referral", label: "Referral" },
    { value: "social", label: "Social Media" }, { value: "cold_call", label: "Cold Call" },
    { value: "email", label: "Email Campaign" },
  ]},
  { key: "notes", label: "Notes", type: "textarea" as const },
];

export default function ContactsPage() {
  return <CrudPage title="Contacts" endpoint="/contacts" columns={columns} formFields={formFields}
    icon={<Users size={24} className="text-cyan-400" />} />;
}
