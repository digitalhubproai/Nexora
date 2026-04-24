"use client";
import CrudPage from "@/components/shared/crud-page";
import { Warehouse } from "lucide-react";
export default function WarehousesPage() {
  return <CrudPage title="Warehouses" endpoint="/warehouses" icon={<Warehouse size={24} className="text-cyan-400" />}
    columns={[
      { key: "name", label: "Name" }, { key: "code", label: "Code" }, { key: "city", label: "City" },
      { key: "country", label: "Country" }, { key: "capacity", label: "Capacity" },
      { key: "status", label: "Status", format: "badge", badgeMap: { active: "badge-success", inactive: "badge-neutral" } },
    ]}
    formFields={[
      { key: "name", label: "Warehouse Name", type: "text", required: true }, { key: "code", label: "Code", type: "text", required: true, placeholder: "WH-01" },
      { key: "address", label: "Address", type: "textarea" }, { key: "city", label: "City", type: "text" }, { key: "country", label: "Country", type: "text" },
      { key: "capacity", label: "Capacity", type: "number" },
    ]} />;
}
