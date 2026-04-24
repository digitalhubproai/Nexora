"use client";
import CrudPage from "@/components/shared/crud-page";
import { Activity } from "lucide-react";
export default function ActivitiesPage() {
  return <CrudPage title="Activities" endpoint="/activities"
    icon={<Activity size={24} className="text-cyan-400" />}
    columns={[
      { key: "title", label: "Title" },
      { key: "type", label: "Type", format: "badge", badgeMap: { call: "badge-info", email: "badge-purple", meeting: "badge-warning", task: "badge-success", note: "badge-neutral" } },
      { key: "status", label: "Status", format: "badge", badgeMap: { pending: "badge-warning", in_progress: "badge-info", completed: "badge-success", cancelled: "badge-danger" } },
      { key: "priority", label: "Priority", format: "badge", badgeMap: { low: "badge-neutral", medium: "badge-warning", high: "badge-danger" } },
      { key: "due_date", label: "Due Date", format: "date" },
      { key: "created_at", label: "Created", format: "date" },
    ]}
    formFields={[
      { key: "title", label: "Title", type: "text", required: true },
      { key: "type", label: "Type", type: "select", required: true, options: [
        { value: "call", label: "Call" }, { value: "email", label: "Email" }, { value: "meeting", label: "Meeting" },
        { value: "task", label: "Task" }, { value: "note", label: "Note" },
      ]},
      { key: "description", label: "Description", type: "textarea" },
      { key: "status", label: "Status", type: "select", options: [
        { value: "pending", label: "Pending" }, { value: "in_progress", label: "In Progress" },
        { value: "completed", label: "Completed" },
      ]},
      { key: "priority", label: "Priority", type: "select", options: [
        { value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "high", label: "High" },
      ]},
      { key: "due_date", label: "Due Date", type: "date" },
    ]}
  />;
}
