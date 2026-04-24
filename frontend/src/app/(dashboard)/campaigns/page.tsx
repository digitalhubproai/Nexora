"use client";
import CrudPage from "@/components/shared/crud-page";
import { Megaphone } from "lucide-react";
export default function CampaignsPage() {
  return <CrudPage title="Campaigns" endpoint="/campaigns" icon={<Megaphone size={24} className="text-rose-400" />}
    columns={[
      { key: "name", label: "Campaign" }, { key: "type", label: "Type", format: "badge", badgeMap: { email: "badge-info", social: "badge-purple", ads: "badge-warning", event: "badge-success" } },
      { key: "status", label: "Status", format: "badge", badgeMap: { draft: "badge-neutral", active: "badge-success", paused: "badge-warning", completed: "badge-info" } },
      { key: "budget", label: "Budget", format: "currency" }, { key: "spent", label: "Spent", format: "currency" },
      { key: "revenue", label: "Revenue", format: "currency" }, { key: "leads_generated", label: "Leads" },
      { key: "start_date", label: "Start", format: "date" },
    ]}
    formFields={[
      { key: "name", label: "Campaign Name", type: "text", required: true },
      { key: "type", label: "Type", type: "select", options: [{ value: "email", label: "Email" }, { value: "social", label: "Social" }, { value: "ads", label: "Ads" }, { value: "event", label: "Event" }] },
      { key: "budget", label: "Budget ($)", type: "number" },
      { key: "start_date", label: "Start Date", type: "date" }, { key: "end_date", label: "End Date", type: "date" },
      { key: "description", label: "Description", type: "textarea" },
    ]} />;
}
