"use client";
import CrudPage from "@/components/shared/crud-page";
import { FileArchive } from "lucide-react";
export default function DocumentsPage() {
  return <CrudPage title="Documents" endpoint="/documents" icon={<FileArchive size={24} className="text-cyan-400" />}
    columns={[
      { key: "name", label: "Name" },
      { key: "type", label: "Type", format: "badge", badgeMap: { contract: "badge-info", agreement: "badge-purple", policy: "badge-warning", general: "badge-neutral" } },
      { key: "category", label: "Category" }, { key: "file_size", label: "Size" }, { key: "created_at", label: "Uploaded", format: "date" },
    ]}
    formFields={[
      { key: "name", label: "Document Name", type: "text", required: true },
      { key: "type", label: "Type", type: "select", options: [{ value: "contract", label: "Contract" }, { value: "agreement", label: "Agreement" }, { value: "policy", label: "Policy" }, { value: "general", label: "General" }] },
      { key: "category", label: "Category", type: "text" }, { key: "description", label: "Description", type: "textarea" },
    ]} />;
}
