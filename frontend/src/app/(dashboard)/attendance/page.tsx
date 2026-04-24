"use client";
import CrudPage from "@/components/shared/crud-page";
import { Clock } from "lucide-react";
export default function AttendancePage() {
  return <CrudPage title="Attendance" endpoint="/attendance" icon={<Clock size={24} className="text-cyan-400" />}
    columns={[
      { key: "employee_number", label: "Emp ID" },
      { key: "employee_name", label: "Employee" },
      { key: "date", label: "Date", format: "date" },
      { key: "check_in", label: "Check In" },
      { key: "check_out", label: "Check Out" },
      { key: "status", label: "Status", format: "badge", badgeMap: { present: "badge-success", absent: "badge-danger", late: "badge-warning", half_day: "badge-info", on_leave: "badge-neutral" } },
      { key: "hours_worked", label: "Hours" },
    ]}
    formFields={[
      { key: "employee_id", label: "Employee ID (e.g. NEX0000001)", type: "text", required: true },
      { key: "date", label: "Date", type: "date", required: true },
      { key: "status", label: "Status", type: "select", options: [{ value: "present", label: "Present" }, { value: "absent", label: "Absent" }, { value: "late", label: "Late" }, { value: "half_day", label: "Half Day" }, { value: "on_leave", label: "On Leave" }] },
      { key: "hours_worked", label: "Hours Worked", type: "number" }, { key: "notes", label: "Notes", type: "textarea" },
    ]} />;
}
