"use client";
import CrudPage from "@/components/shared/crud-page";
import { FolderKanban } from "lucide-react";
export default function ProjectsPage() {
  return <CrudPage title="Projects" endpoint="/projects"
    icon={<FolderKanban size={24} className="text-violet-400" />}
    columns={[
      { key: "name", label: "Project" }, { key: "status", label: "Status", format: "badge", badgeMap: { planning: "badge-neutral", active: "badge-info", completed: "badge-success", on_hold: "badge-warning", cancelled: "badge-danger" } },
      { key: "priority", label: "Priority", format: "badge", badgeMap: { low: "badge-neutral", medium: "badge-warning", high: "badge-danger", critical: "badge-danger" } },
      { key: "progress", label: "Progress %" }, { key: "budget", label: "Budget", format: "currency" },
      { key: "start_date", label: "Start", format: "date" }, { key: "end_date", label: "End", format: "date" },
    ]}
    formFields={[
      { key: "name", label: "Project Name", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "status", label: "Status", type: "select", options: [
        { value: "planning", label: "Planning" }, { value: "active", label: "Active" },
        { value: "completed", label: "Completed" }, { value: "on_hold", label: "On Hold" },
      ]},
      { key: "priority", label: "Priority", type: "select", options: [
        { value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "high", label: "High" }, { value: "critical", label: "Critical" },
      ]},
      { key: "budget", label: "Budget ($)", type: "number" },
      { key: "start_date", label: "Start Date", type: "date" },
      { key: "end_date", label: "End Date", type: "date" },
    ]}
  />;
}
