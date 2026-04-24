"use client";
import { BadgeDollarSign, TrendingUp, TrendingDown, DollarSign, CreditCard, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export default function AccountingPage() {
  return (
    <div className="space-y-12 animate-fade-in pb-32 max-w-[1600px] mx-auto px-4">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-white p-12 rounded-[4rem] border border-slate-100 luxe-shadow-hover transition-all duration-500">
        <div className="flex items-center gap-8">
           <div className="w-20 h-20 rounded-[2rem] bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
              <BadgeDollarSign size={32} strokeWidth={2.5} />
           </div>
           <div>
              <div className="flex items-center gap-3 mb-2">
                 <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">FINANCE</span>
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Accounting Hub</h1>
              <p className="text-sm font-medium text-slate-400 mt-2">Real-time ledger monitoring and financial status tracking.</p>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" className="h-16 px-10 rounded-3xl gap-3 text-xs font-black uppercase tracking-widest border-slate-200">
              <TrendingUp size={20} />
              <span>Statement</span>
           </Button>
           <Button variant="premium" className="h-16 px-10 rounded-3xl gap-3 text-xs font-black uppercase tracking-widest shadow-2xl shadow-indigo-100">
              <Plus size={20} />
              <span>New Entry</span>
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {[
          { label: "Total Assets", value: "$4.2M", icon: DollarSign, color: "indigo" },
          { label: "Liabilities", value: "$1.2M", icon: CreditCard, color: "rose" },
          { label: "Revenue (MTD)", value: "$245k", icon: TrendingUp, color: "emerald" },
          { label: "Expenses (MTD)", value: "$85k", icon: TrendingDown, color: "amber" },
        ].map((item, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -8 }}
            className="bg-white p-10 rounded-[3.5rem] border border-slate-100 luxe-shadow-hover group"
          >
            <div className="flex items-center justify-between mb-10">
               <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner", 
                 item.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
                 item.color === 'rose' ? "bg-rose-50 text-rose-600" :
                 item.color === 'emerald' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
               )}>
                 <item.icon size={28} strokeWidth={2.5} />
               </div>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{item.label}</p>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-50/50 rounded-[4rem] border border-slate-100 p-20 text-center flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-10 shadow-sm border border-slate-100">
          <BadgeDollarSign size={48} className="text-slate-200" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Ledger Calibration</h3>
        <p className="text-sm font-medium text-slate-500 mt-4 max-w-md leading-relaxed">Detailed financial records and journal entries will be visualized here as they are processed by the core accounting engine.</p>
        <Button variant="outline" className="mt-12 px-12 h-16 rounded-3xl text-[10px] font-black uppercase tracking-widest border-slate-200">Initialize Ledger</Button>
      </div>
    </div>
  );
}
