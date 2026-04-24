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
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Welcome back, <span className="text-indigo-600">{user?.first_name}</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Here's what's happening with your projects today.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-11 rounded-xl px-4 gap-2 text-xs font-semibold border-slate-200 bg-white hover:bg-slate-50">
              <RefreshCw size={16} className="text-slate-400" />
              <span>Refresh</span>
           </Button>
           <Button className="h-11 rounded-xl px-6 gap-2 text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100">
              <Plus size={16} />
              <span>Add New</span>
           </Button>
        </div>
      </motion.div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KPICard title="Total Revenue" value={kpis.total_revenue || 0} icon={BadgeDollarSign} trend="+12%" color="indigo" />
        <KPICard title="Active Deals" value={kpis.deal_pipeline_value || 0} icon={TrendingUp} trend="+8%" color="emerald" />
        <KPICard title="Contacts" value={kpis.total_contacts || 0} icon={Users} trend="+4%" color="amber" />
        <KPICard title="Products" value={kpis.total_products || 0} icon={Package} trend="-2%" color="rose" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Left: Charts & Widgets */}
        <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6 md:space-y-8">
           {/* Charts Row */}
           <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                 <div>
                    <h3 className="text-lg font-bold text-slate-900">Revenue Overview</h3>
                 </div>
                 <div className="flex p-1 bg-slate-100 rounded-lg">
                    {['W', 'M', 'Y'].map(t => (
                       <button key={t} className={cn(
                          "px-4 py-1.5 rounded-md text-[10px] font-bold transition-all",
                          t === 'M' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                       )}>{t}</button>
                    ))}
                 </div>
              </div>
              <div className="h-[300px] md:h-[350px]">
                 <RevenueChart />
              </div>
           </div>

           {/* Secondary Widgets Row */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
                 <h3 className="text-base font-bold text-slate-900 mb-6">Team Status</h3>
                 <DepartmentWidgets />
              </div>
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
                 <h3 className="text-base font-bold text-slate-900 mb-6">Attendance</h3>
                 <AttendanceWidget />
              </div>
           </div>
        </motion.div>

        {/* Right: Activity */}
        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6 md:space-y-8">
           <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-base font-bold text-slate-900">Recent Activity</h3>
                 <Globe size={18} className="text-slate-400" />
              </div>
              <div className="space-y-1">
                 {[1,2,3,4,5].map(i => (
                    <div key={i} className="flex gap-4 items-start p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent">
                       <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          <ShieldCheck size={16} className="text-slate-500" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 leading-none">Record Updated</p>
                          <p className="text-xs text-slate-500 mt-1.5 truncate">System update completed.</p>
                       </div>
                    </div>
                 ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 text-xs font-bold text-indigo-600 hover:bg-indigo-50">View All Activity</Button>
           </div>

           <div className="bg-indigo-600 p-6 md:p-8 rounded-2xl shadow-lg shadow-indigo-100 relative overflow-hidden group">
              <div className="relative z-10 text-white">
                 <h3 className="text-base font-bold">Need Help?</h3>
                 <p className="text-sm text-indigo-100 mt-2 leading-relaxed opacity-90">
                    Contact our support team for any assistance.
                 </p>
                 <Button className="w-full mt-6 bg-white text-indigo-600 hover:bg-indigo-50 h-11 rounded-xl text-xs font-bold">
                    Get Support
                 </Button>
              </div>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
