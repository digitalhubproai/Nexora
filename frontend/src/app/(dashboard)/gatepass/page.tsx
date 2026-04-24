"use client";
import CrudPage from "@/components/shared/crud-page";
import { Shield, Truck, User, Clock } from "lucide-react";

const columns = [
  { key: "pass_no", label: "Pass ID" },
  { key: "type", label: "Type", format: "badge" as const },
  { key: "carrier_name", label: "Carrier / Person" },
  { key: "vehicle_no", label: "Vehicle No" },
  { key: "purpose", label: "Purpose" },
  { key: "status", label: "Status", format: "badge" as const },
  { key: "created_at", label: "Timestamp", format: "date" as const },
];

const mockData = [
  { id: 1, pass_no: "GP-2024-001", type: "in", carrier_name: "DHL Express", vehicle_no: "K-2938", purpose: "Stock Delivery", status: "active", created_at: new Date().toISOString() },
  { id: 2, pass_no: "GP-2024-002", type: "out", carrier_name: "Ali Raza", vehicle_no: "N/A", purpose: "Visitor Exit", status: "won", created_at: new Date().toISOString() },
  { id: 3, pass_no: "GP-2024-003", type: "in", carrier_name: "Swift Logistics", vehicle_no: "T-4492", purpose: "Raw Material", status: "pending", created_at: new Date().toISOString() },
];

const formFields = [
  { 
    key: "type", 
    label: "Entry Type", 
    type: "select" as const, 
    required: true,
    options: [
      { value: "in", label: "Entry (In)" },
      { value: "out", label: "Exit (Out)" },
    ]
  },
  { key: "carrier_name", label: "Carrier / Person Name", type: "text" as const, required: true, placeholder: "e.g. DHL or Name" },
  { key: "vehicle_no", label: "Vehicle Number", type: "text" as const, placeholder: "e.g. K-2938 (Optional)" },
  { 
    key: "department", 
    label: "Destination Department", 
    type: "select" as const, 
    required: true,
    options: [
      { value: "Finance", label: "Finance" },
      { value: "Human Resources", label: "Human Resources" },
      { value: "Logistics", label: "Logistics" },
      { value: "Production", label: "Production" },
    ]
  },
  { key: "purpose", label: "Purpose of Visit", type: "textarea" as const, required: true },
];

export default function GatepassPage() {
  return (
    <CrudPage 
      title="Gatepass"
      endpoint="/gatepass"
      columns={columns}
      formFields={formFields}
      icon={<Shield size={24} />}
    />
  );
}
