"use client";
import CrudPage from "@/components/shared/crud-page";
import { Factory } from "lucide-react";
export default function ManufacturingPage() {
  return <CrudPage title="Manufacturing Orders" endpoint="/manufacturing" icon={<Factory size={24} className="text-violet-400" />}
    columns={[
      { key: "number", label: "MO #" }, { key: "quantity", label: "Qty" },
      { key: "status", label: "Status", format: "badge", badgeMap: { draft: "badge-neutral", in_progress: "badge-info", completed: "badge-success", cancelled: "badge-danger" } },
      { key: "priority", label: "Priority", format: "badge", badgeMap: { low: "badge-neutral", medium: "badge-warning", high: "badge-danger" } },
      { key: "estimated_cost", label: "Est. Cost", format: "currency" },
      { key: "start_date", label: "Start", format: "date" }, { key: "end_date", label: "End", format: "date" },
    ]}
    formFields={[
      { key: "number", label: "MO Number", type: "text", required: true, placeholder: "MO-001" },
      { key: "quantity", label: "Quantity", type: "number", required: true },
      { key: "priority", label: "Priority", type: "select", options: [{ value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "high", label: "High" }] },
      { key: "estimated_cost", label: "Estimated Cost", type: "number" },
      { key: "start_date", label: "Start Date", type: "date" }, { key: "end_date", label: "End Date", type: "date" },
      { key: "notes", label: "Notes", type: "textarea" },
    ]} />;
}
