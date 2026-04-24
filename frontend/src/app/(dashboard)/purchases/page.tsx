"use client";
import CrudPage from "@/components/shared/crud-page";
import { ShoppingCart } from "lucide-react";
export default function PurchasesPage() {
  return <CrudPage title="Purchase Orders" endpoint="/purchase-orders" icon={<ShoppingCart size={24} className="text-amber-400" />}
    columns={[
      { key: "number", label: "PO #" }, { key: "total", label: "Total", format: "currency" },
      { key: "status", label: "Status", format: "badge", badgeMap: { draft: "badge-neutral", ordered: "badge-info", shipped: "badge-warning", received: "badge-success", cancelled: "badge-danger" } },
      { key: "order_date", label: "Order Date", format: "date" }, { key: "expected_date", label: "Expected", format: "date" },
    ]}
    formFields={[
      { key: "number", label: "PO Number", type: "text", required: true, placeholder: "PO-001" },
      { key: "subtotal", label: "Subtotal", type: "number" }, { key: "tax_amount", label: "Tax", type: "number" },
      { key: "total", label: "Total", type: "number", required: true },
      { key: "order_date", label: "Order Date", type: "date" }, { key: "expected_date", label: "Expected Delivery", type: "date" },
    ]} />;
}
