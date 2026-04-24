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
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 flex flex-col transition-all duration-500 ease-in-out border-r border-slate-200 bg-white shadow-sm",
          sidebarCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-[70px]" : "translate-x-0 w-[260px]"
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between lg:justify-start gap-3 px-6 h-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md">
              <Zap size={18} className="text-white fill-white" />
            </div>
            {!sidebarCollapsed && (
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Nexora
              </span>
            )}
          </div>
          
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-50 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 no-scrollbar">
          {navGroups.map((group, groupIdx) => (
            <div key={group.label} className={cn(groupIdx !== 0 && "mt-8")}>
              {!sidebarCollapsed && (
                <p className="px-4 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {group.label}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        if (typeof window !== 'undefined' && window.innerWidth < 1024) toggleSidebar();
                      }}
                      className={cn(
                        "group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all",
                        isActive 
                          ? "bg-indigo-50 text-indigo-600 font-bold" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />
                      {!sidebarCollapsed && (
                        <span className="text-sm tracking-tight">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
           <div className="flex items-center gap-3 p-2 rounded-xl group cursor-pointer hover:bg-white hover:shadow-sm transition-all">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
                {user?.first_name?.[0]}
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{user?.first_name} {user?.last_name}</p>
                  <p className="text-[10px] font-medium text-slate-400 truncate uppercase tracking-widest">{user?.role}</p>
                </div>
              )}
              <button onClick={(e) => { e.preventDefault(); toggleSidebar(); }} className="hidden lg:block p-1 rounded-md text-slate-300 hover:text-slate-600 transition-all">
                {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              </button>
           </div>
        </div>
      </aside>
    </>
  );
}
