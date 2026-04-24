"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useUIStore } from "@/store/use-ui-store";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, UserPlus, Handshake, GitBranch,
  Receipt, Package, Warehouse as WarehouseIcon, Truck,
  Factory, BadgeDollarSign, UserCog, Settings,
  LifeBuoy, ChevronLeft, ChevronRight, Zap, X
} from "lucide-react";

const navGroups = [
  {
    label: "Core CRM",
    items: [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
      { href: "/contacts", label: "Contacts", icon: Users },
      { href: "/leads", label: "Leads", icon: UserPlus },
      { href: "/deals", label: "Deals", icon: Handshake },
      { href: "/pipeline", label: "Pipeline", icon: GitBranch },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/inventory", label: "Inventory", icon: WarehouseIcon },
      { href: "/products", label: "Products", icon: Package },
      { href: "/supply-chain", label: "Logistics", icon: Truck },
      { href: "/gatepass", label: "Gatepass", icon: Factory },
      { href: "/manufacturing", label: "Production", icon: Factory },
    ],
  },
  {
    label: "Finance & HR",
    items: [
      { href: "/invoices", label: "Invoices", icon: Receipt },
      { href: "/accounting", label: "Ledger", icon: BadgeDollarSign },
      { href: "/employees", label: "Team", icon: UserCog },
      { href: "/payroll", label: "Payroll", icon: BadgeDollarSign },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/settings", label: "Settings", icon: Settings },
      { href: "/helpdesk", label: "Support", icon: LifeBuoy },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("nexora_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 flex flex-col transition-all duration-500 ease-in-out border-r border-white/20 bg-white/40 backdrop-blur-3xl shadow-[4px_0_24px_rgba(0,0,0,0.02)]",
          sidebarCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-[80px]" : "translate-x-0 w-[280px]"
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between lg:justify-start gap-4 px-8 h-24">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-200/50"
            >
              <Zap size={20} className="text-white fill-white" />
            </motion.div>
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-semibold tracking-[-0.03em] text-slate-900 leading-none">
                  Nexora
                </span>
                <span className="text-[9px] font-medium text-indigo-500/60 uppercase tracking-[0.3em] mt-1.5">
                  Enterprise OS
                </span>
              </div>
            )}
          </div>
          
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:bg-white/60 hover:text-indigo-600 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-8 px-4 no-scrollbar">
          {navGroups.map((group, groupIdx) => (
            <div key={group.label} className={cn(groupIdx !== 0 && "mt-10")}>
              {!sidebarCollapsed && (
                <p className="px-5 mb-4 text-[9px] font-semibold text-slate-400 uppercase tracking-[0.25em] opacity-60">
                  {group.label}
                </p>
              )}
              <div className="space-y-1.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        if (window.innerWidth < 1024) toggleSidebar();
                      }}
                      className={cn(
                        "group relative flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-500",
                        isActive 
                          ? "bg-white/80 text-indigo-600 shadow-sm border border-white/50" 
                          : "text-slate-500 hover:bg-white/40 hover:text-slate-900"
                      )}
                    >
                      <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} className={cn(
                        "shrink-0 transition-transform duration-500",
                        isActive && "scale-110"
                      )} />
                      {!sidebarCollapsed && (
                        <span className="text-[13px] font-medium tracking-tight">
                          {item.label}
                        </span>
                      )}
                      {isActive && !sidebarCollapsed && (
                         <motion.div 
                           layoutId="sidebar-active-pill"
                           className="absolute left-1 w-1 h-6 bg-indigo-500 rounded-full"
                         />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-6 border-t border-white/20 bg-white/20 backdrop-blur-sm">
           <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 border border-white/60 shadow-sm group cursor-pointer hover:bg-white/60 transition-all duration-500">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-[11px] font-semibold text-indigo-600 border border-indigo-100 shadow-inner shrink-0">
                {user?.first_name?.[0]}
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-slate-900 truncate tracking-tight">{user?.first_name} {user?.last_name}</p>
                  <p className="text-[10px] font-medium text-slate-400 truncate uppercase tracking-widest mt-0.5 opacity-80">{user?.role}</p>
                </div>
              )}
              <button onClick={(e) => { e.preventDefault(); toggleSidebar(); }} className="hidden lg:block p-1.5 rounded-lg text-slate-300 hover:text-indigo-600 hover:bg-white/80 transition-all">
                {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              </button>
           </div>
        </div>
      </aside>
    </>
  );
}
