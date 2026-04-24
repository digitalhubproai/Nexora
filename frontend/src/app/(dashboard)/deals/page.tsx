"use client";
import CrudPage from "@/components/shared/crud-page";
import { Handshake } from "lucide-react";
export default function DealsPage() {
  return <CrudPage title="Deals" endpoint="/deals"
    icon={<Handshake size={24} className="text-emerald-400" />}
    columns={[
      { key: "title", label: "Title" }, { key: "value", label: "Value", format: "currency" },
      { key: "stage", label: "Stage", format: "badge", badgeMap: { qualification: "badge-info", proposal: "badge-purple", negotiation: "badge-warning", closed_won: "badge-success", closed_lost: "badge-danger" } },
      { key: "probability", label: "Probability %" },
      { key: "status", label: "Status", format: "badge", badgeMap: { open: "badge-info", won: "badge-success", lost: "badge-danger" } },
      { key: "expected_close", label: "Close Date", format: "date" },
      { key: "created_at", label: "Created", format: "date" },
    ]}
    formFields={[
      { key: "title", label: "Deal Title", type: "text", required: true, placeholder: "New deal" },
      { key: "value", label: "Value ($)", type: "number", required: true },
      { key: "stage", label: "Stage", type: "select", options: [
        { value: "qualification", label: "Qualification" }, { value: "proposal", label: "Proposal" },
        { value: "negotiation", label: "Negotiation" }, { value: "closed_won", label: "Closed Won" },
        { value: "closed_lost", label: "Closed Lost" },
      ]},
      { key: "probability", label: "Probability %", type: "number" },
      { key: "expected_close", label: "Expected Close", type: "date" },
      { key: "notes", label: "Notes", type: "textarea" },
    ]}
  />;
}
