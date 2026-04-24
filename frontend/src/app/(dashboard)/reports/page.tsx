"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { BarChart3, DollarSign, Users, UserPlus, Receipt, Package, UserCog, Download, Printer } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ReportsPage() {
  const [kpis, setKpis] = useState<Record<string, number>>({});
  useEffect(() => { api.get<Record<string, number>>("/dashboard/kpis").then(setKpis).catch(console.error); }, []);

  const reports = [
    { title: "Revenue Summary", value: formatCurrency(kpis.total_revenue || 0), icon: DollarSign, color: "indigo" },
    { title: "Total Contacts", value: String(kpis.total_contacts || 0), icon: Users, color: "sky" },
    { title: "Active Leads", value: String(kpis.active_leads || 0), icon: UserPlus, color: "emerald" },
    { title: "Pipeline Value", value: formatCurrency(kpis.deal_pipeline_value || 0), icon: BarChart3, color: "amber" },
    { title: "Pending Invoices", value: String(kpis.pending_invoices || 0), icon: Receipt, color: "rose" },
    { title: "Total Products", value: String(kpis.total_products || 0), icon: Package, color: "sky" },
    { title: "Active Employees", value: String(kpis.total_employees || 0), icon: UserCog, color: "indigo" },
    { title: "Open Tickets", value: String(kpis.open_tickets || 0), icon: BarChart3, color: "rose" },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-24">
      {/* Header */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 luxe-shadow flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 shadow-inner">
            <BarChart3 size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Reports & Analytics</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Business intelligence dashboard</p>
          </div>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="gap-2">
              <Download size={18} />
              <span>Export PDF</span>
           </Button>
           <Button variant="premium" className="gap-2">
              <Printer size={18} />
              <span>Print All</span>
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {reports.map((r, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 luxe-shadow group"
          >
            <div className="flex items-center justify-between mb-8">
               <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", 
                 r.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
                 r.color === 'sky' ? "bg-sky-50 text-sky-600" :
                 r.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                 r.color === 'rose' ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"
               )}>
                 <r.icon size={28} strokeWidth={2.5} />
               </div>
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">{r.value}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">{r.title}</p>
            
            <div className="mt-8 h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "70%" }}
                 transition={{ duration: 1.5, delay: i * 0.1 }}
                 className={cn("h-full rounded-full", 
                    r.color === 'indigo' ? "bg-indigo-500" :
                    r.color === 'sky' ? "bg-sky-500" :
                    r.color === 'emerald' ? "bg-emerald-500" :
                    r.color === 'rose' ? "bg-rose-500" : "bg-amber-500"
                 )}
               />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
