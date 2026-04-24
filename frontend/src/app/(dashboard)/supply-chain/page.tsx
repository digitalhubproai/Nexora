"use client";
import CrudPage from "@/components/shared/crud-page";
import { Truck } from "lucide-react";
export default function SupplyChainPage() {
  return <CrudPage title="Suppliers" endpoint="/suppliers" icon={<Truck size={24} className="text-emerald-400" />}
    columns={[
      { key: "name", label: "Supplier" }, { key: "contact_person", label: "Contact" }, { key: "email", label: "Email" },
      { key: "phone", label: "Phone" }, { key: "city", label: "City" }, { key: "rating", label: "Rating" },
      { key: "status", label: "Status", format: "badge", badgeMap: { active: "badge-success", inactive: "badge-neutral" } },
    ]}
    formFields={[
      { key: "name", label: "Supplier Name", type: "text", required: true }, { key: "contact_person", label: "Contact Person", type: "text" },
      { key: "email", label: "Email", type: "email" }, { key: "phone", label: "Phone", type: "text" },
      { key: "city", label: "City", type: "text" }, { key: "country", label: "Country", type: "text" },
      { key: "payment_terms", label: "Payment Terms", type: "text" },
    ]} />;
}
