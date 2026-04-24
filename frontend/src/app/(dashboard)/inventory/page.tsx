"use client";
import CrudPage from "@/components/shared/crud-page";
import { Warehouse } from "lucide-react";
export default function InventoryPage() {
  return <CrudPage title="Inventory" endpoint="/products" icon={<Warehouse size={24} className="text-amber-400" />}
    columns={[
      { key: "name", label: "Product" }, { key: "sku", label: "SKU" }, { key: "stock_quantity", label: "Stock" },
      { key: "low_stock_threshold", label: "Alert Level" }, { key: "unit", label: "Unit" },
      { key: "price", label: "Price", format: "currency" },
      { key: "status", label: "Status", format: "badge", badgeMap: { active: "badge-success", inactive: "badge-neutral" } },
    ]}
    formFields={[
      { key: "name", label: "Product Name", type: "text", required: true }, { key: "sku", label: "SKU", type: "text", required: true },
      { key: "stock_quantity", label: "Stock Quantity", type: "number" }, { key: "low_stock_threshold", label: "Low Stock Alert", type: "number" },
      { key: "price", label: "Price", type: "number" }, { key: "unit", label: "Unit", type: "text" },
    ]} />;
}
