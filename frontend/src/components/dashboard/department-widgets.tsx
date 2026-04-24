"use client";
import { motion } from "framer-motion";
import { TrendingUp, Users, Wallet, ArrowUpRight } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function FinanceSummary() {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="group">
          <div className="flex justify-between items-end mb-2.5">
            <div>
              <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-[0.2em] opacity-60">Cash on Hand</p>
              <h4 className="text-lg font-semibold text-slate-900 mt-1 tracking-tight">{formatCurrency(450000)}</h4>
            </div>
            <div className="flex items-center gap-1 text-emerald-500 font-bold text-[9px] mb-1">
               <TrendingUp size={12} /> <span>+12%</span>
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-black/5 overflow-hidden border border-white/40">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.4)]" 
            />
          </div>
        </div>

        <div className="group">
          <div className="flex justify-between items-end mb-2.5">
            <div>
              <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-[0.2em] opacity-60">Tax Liability (Q2)</p>
              <h4 className="text-lg font-semibold text-slate-900 mt-1 tracking-tight">{formatCurrency(12400)}</h4>
            </div>
            <div className="flex items-center gap-1 text-rose-500 font-bold text-[9px] mb-1">
               <ArrowUpRight size={12} /> <span>High</span>
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-black/5 overflow-hidden border border-white/40">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "30%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-rose-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.4)]" 
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3.5 rounded-2xl bg-white/40 border border-white/60 shadow-sm">
           <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-[0.2em] mb-1.5 opacity-60">Burn Rate</p>
           <p className="text-[13px] font-semibold text-slate-900 tracking-tight">$45k/mo</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-white/40 border border-white/60 shadow-sm">
           <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-[0.2em] mb-1.5 opacity-60">Runway</p>
           <p className="text-[13px] font-semibold text-slate-900 tracking-tight">14 Mo</p>
        </div>
      </div>
    </div>
  );
}

export function HRTeamWidget() {
  const team = [
    { name: "Sarah Connor", status: "Present", role: "Dev", img: "S" },
    { name: "John Doe", status: "Leave", role: "Design", img: "J" },
    { name: "Mike Ross", status: "Remote", role: "Legal", img: "M" },
  ];
  return (
    <div className="space-y-2">
      {team.map((m, i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
          <div className="flex items-center gap-3">
             <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600 shadow-sm">
               {m.img}
             </div>
             <div>
               <p className="text-[13px] font-bold text-slate-900">{m.name}</p>
               <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">{m.role}</p>
             </div>
          </div>
          <span className={cn("text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border", 
            m.status === "Present" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
            m.status === "Remote" ? "bg-sky-50 text-sky-600 border-sky-100" : "bg-amber-50 text-amber-600 border-amber-100"
          )}>
            {m.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export function DepartmentWidgets() {
  const [role, setRole] = useState<string>("admin");
  const [dept, setDept] = useState<string>("Finance");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("nexora_user") || "{}");
    setRole(user.role || "staff");
    setDept(user.department || "General");
  }, []);

  if (dept === "Finance" || role === "admin") return <FinanceSummary />;
  if (dept === "Human Resources") return <HRTeamWidget />;
  
  return (
    <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100">
       <p className="text-[11px] font-medium text-indigo-700 leading-relaxed">Workspace calibration for {dept} in progress.</p>
    </div>
  );
}
