"use client";
import CrudPage from "@/components/shared/crud-page";
import { Package } from "lucide-react";
export default function ProductsPage() {
  return <CrudPage title="Products" endpoint="/products"
    icon={<Package size={24} className="text-cyan-400" />}
    columns={[
      { key: "name", label: "Product" }, { key: "sku", label: "SKU" },
      { key: "price", label: "Price", format: "currency" }, { key: "cost", label: "Cost", format: "currency" },
      { key: "stock_quantity", label: "Stock" },
      { key: "status", label: "Status", format: "badge", badgeMap: { active: "badge-success", inactive: "badge-neutral" } },
    ]}
    formFields={[
      { key: "name", label: "Product Name", type: "text", required: true },
      { key: "sku", label: "SKU", type: "text", required: true, placeholder: "PRD-001" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "price", label: "Price ($)", type: "number", required: true },
      { key: "cost", label: "Cost ($)", type: "number" },
      { key: "stock_quantity", label: "Stock Quantity", type: "number" },
      { key: "low_stock_threshold", label: "Low Stock Alert", type: "number" },
      { key: "unit", label: "Unit", type: "text", placeholder: "pcs" },
      { key: "status", label: "Status", type: "select", options: [
        { value: "active", label: "Active" }, { value: "inactive", label: "Inactive" },
      ]},
    ]}
  />;
}
