"use client";
import { useState, useEffect } from "react";
import { 
  BadgeDollarSign, Users, Package, TrendingUp, RefreshCw, Plus, 
  Activity, ShieldCheck, Clock, ArrowUpRight, ArrowDownRight, Globe, Zap
} from "lucide-react";
import { api } from "@/lib/api";
import { formatCurrency, cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { DepartmentWidgets } from "@/components/dashboard/department-widgets";
import { AttendanceWidget } from "@/components/dashboard/attendance-widget";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
} as const;

function KPICard({ title, value, icon: Icon, trend, color }: any) {
  const isPositive = trend?.includes("+");
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ 
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className="bg-white/50 backdrop-blur-3xl p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-200/60 shadow-[0_8px_32px_rgba(0,0,0,0.02)] hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-200/50 hover:bg-white/80 transition-all duration-500 flex flex-col justify-between h-[160px] md:h-[180px] group"
    >
      <div className="flex justify-between items-start">
        <div className={cn(
          "w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
          color === "indigo" ? "bg-indigo-600 text-white shadow-indigo-200" :
          color === "emerald" ? "bg-emerald-600 text-white shadow-emerald-200" :
          color === "rose" ? "bg-rose-600 text-white shadow-rose-200" : "bg-amber-600 text-white shadow-amber-200"
        )}>
          <Icon size={20} />
        </div>
        <div className={cn(
          "flex items-center gap-1.5 text-[8px] md:text-[9px] font-bold uppercase tracking-wider px-2 md:px-3 py-1 md:py-1.5 rounded-full border transition-all",
          isPositive ? "text-emerald-600 bg-emerald-50/50 border-emerald-100" : "text-rose-600 bg-rose-50/50 border-rose-100"
        )}>
          {isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {trend}
        </div>
      </div>
      
      <div>
        <p className="text-[9px] md:text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] mb-1 md:mb-2 opacity-60">{title}</p>
        <h3 className={cn(
          "font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-500 leading-none",
          (typeof value === 'number' && value > 100000) ? "text-[18px] md:text-[22px]" : "text-xl md:text-2xl"
        )}>
          {typeof value === 'number' 
            ? (title.toLowerCase().includes('revenue') || title.toLowerCase().includes('pipeline') || title.toLowerCase().includes('value') 
                ? formatCurrency(value) 
                : value.toLocaleString())
            : value}
        </h3>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [kpis, setKpis] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("nexora_user");
    if (savedUser) setUser(JSON.parse(savedUser));

    async function loadData() {
      try {
        const data = await api.get("/dashboard/kpis");
        setKpis(data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    loadData();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-[9px] font-semibold text-slate-300 uppercase tracking-[0.4em]">Calibrating Systems</p>
    </div>
  );

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 md:space-y-12 pb-24 max-w-[1500px] mx-auto px-2 md:px-4"
    >
      {/* Header Greeting */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
             <span className="text-[9px] md:text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em]">System Online</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight md:leading-none">
            Good morning, <span className="text-indigo-600">{user?.first_name}</span>
          </h1>
          <p className="text-base md:text-lg font-medium text-slate-400 max-w-xl">
            Operational status is <span className="text-slate-900 font-semibold">optimized</span>. Your departmental workspace is ready.
          </p>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
           <Button variant="outline" className="flex-1 md:flex-none h-12 md:h-14 rounded-2xl px-4 md:px-6 gap-2 md:gap-3 text-[10px] md:text-[11px] font-bold uppercase tracking-widest border-white/40 bg-white/40 backdrop-blur-md hover:bg-white/60">
              <RefreshCw size={18} className="text-slate-400" />
              <span>Sync Hub</span>
           </Button>
           <Button className="flex-1 md:flex-none h-12 md:h-14 rounded-2xl px-6 md:px-8 gap-2 md:gap-3 text-[10px] md:text-[11px] font-bold uppercase tracking-widest bg-slate-900 text-white hover:bg-black shadow-xl shadow-slate-200">
              <Plus size={18} />
              <span>New Entry</span>
           </Button>
        </div>
      </motion.div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        <KPICard title="Revenue" value={kpis.total_revenue || 0} icon={BadgeDollarSign} trend="+12.5%" color="indigo" />
        <KPICard title="Pipeline" value={kpis.deal_pipeline_value || 0} icon={TrendingUp} trend="+8.2%" color="emerald" />
        <KPICard title="Customers" value={kpis.total_contacts || 0} icon={Users} trend="+4.1%" color="amber" />
        <KPICard title="Alerts" value={kpis.total_products || 0} icon={Package} trend="-2.4%" color="rose" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
        {/* Left: Charts & Widgets */}
        <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6 md:space-y-10">
           {/* Charts Row */}
           <div className="bg-white/50 backdrop-blur-3xl p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200/60 shadow-[0_8px_32px_rgba(0,0,0,0.02)] overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-12 gap-4">
                 <div>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 tracking-tight">Revenue Insights</h3>
                    <p className="text-[9px] md:text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1.5 opacity-60">Fiscal trajectory analysis</p>
                 </div>
                 <div className="flex p-1 bg-white/20 rounded-xl border border-white/40 backdrop-blur-md self-start sm:self-auto">
                    {['W', 'M', 'Y'].map(t => (
                       <button key={t} className={cn(
                          "px-4 md:px-6 py-1.5 md:py-2 rounded-lg text-[10px] font-bold transition-all duration-500",
                          t === 'M' ? "bg-white text-indigo-600 shadow-sm border border-white/60" : "text-slate-400 hover:text-slate-600"
                       )}>{t}</button>
                    ))}
                 </div>
              </div>
              <div className="h-[300px] md:h-[400px]">
                 <RevenueChart />
              </div>
           </div>

           {/* Secondary Widgets Row */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div className="bg-white/50 backdrop-blur-3xl p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-700">
                 <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-6 md:mb-8 tracking-tight">Team Hub</h3>
                 <DepartmentWidgets />
              </div>
              <div className="bg-white/50 backdrop-blur-3xl p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-700">
                 <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-6 md:mb-8 tracking-tight">Attendance</h3>
                 <AttendanceWidget />
              </div>
           </div>
        </motion.div>

        {/* Right: Activity */}
        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6 md:space-y-10">
           <div className="bg-white/50 backdrop-blur-3xl p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-700">
              <div className="flex items-center justify-between mb-8 md:mb-10">
                 <h3 className="text-base md:text-lg font-semibold text-slate-900 tracking-tight">Global Feed</h3>
                 <Globe size={20} className="text-indigo-600" />
              </div>
              <div className="space-y-3 md:space-y-4">
                 {[1,2,3,4,5].map(i => (
                    <div key={i} className="flex gap-4 md:gap-5 group cursor-pointer items-start p-3 md:p-4 rounded-2xl hover:bg-white/60 transition-all duration-500 relative border border-transparent hover:border-white/40">
                       <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
                       <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white border border-white/60 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-100 transition-all duration-500">
                          <ShieldCheck size={18} className="text-slate-400 transition-colors" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-[13px] font-semibold text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">Record Synced</p>
                          <p className="text-[10px] md:text-[11px] font-medium text-slate-400 mt-2 truncate leading-relaxed">Identity vault updated by Root Admin.</p>
                          <div className="flex items-center gap-2 mt-2 md:mt-3 text-[8px] md:text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                             <Clock size={10} /> <span>12:45 PM</span>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
              <Button variant="outline" className="w-full mt-8 md:mt-10 rounded-2xl h-12 md:h-14 text-[9px] md:text-[10px] font-bold uppercase tracking-widest border-white/60 bg-white/20 hover:bg-white/60">Full Audit Log</Button>
           </div>

           <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/30 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-indigo-200/40 transition-all duration-700" />
              <div className="relative z-10">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white mb-6 md:mb-8 shadow-xl shadow-indigo-100 group-hover:rotate-12 transition-transform duration-500">
                    <Zap size={20} className="fill-white" />
                 </div>
                 <h3 className="text-base md:text-lg font-semibold text-slate-900 tracking-tight">Priority Support</h3>
                 <p className="text-xs md:text-sm font-medium text-slate-400 mt-2 md:mt-3 leading-relaxed">
                    Access dedicated enterprise technical assistance available 24/7.
                 </p>
                 <Button className="w-full mt-8 md:mt-10 bg-slate-900 hover:bg-black text-white h-12 md:h-14 rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-slate-200 transition-all duration-500">
                    Contact Support
                 </Button>
              </div>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
