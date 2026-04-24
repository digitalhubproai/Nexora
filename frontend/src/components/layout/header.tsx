"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Bell, Search, LogOut, User, CheckCircle2, AlertCircle, Info, Clock, Command } from "lucide-react";
import { getStoredUser, clearTokens } from "@/lib/api";
import { getInitials } from "@/lib/utils";
import { useNotificationStore } from "@/store/use-notification-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<Record<string, string> | null>(null);
  const { notifications, unreadCount, markAllAsRead } = useNotificationStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const segments = pathname.split("/").filter(Boolean);
  const currentPath = segments[segments.length - 1] || "Dashboard";
  const displayTitle = currentPath.charAt(0).toUpperCase() + currentPath.slice(1).replace(/-/g, " ");
  const userName = user ? `${user.first_name} ${user.last_name}` : "User";

  return (
    <header className={cn(
      "h-20 flex items-center justify-between px-10 sticky top-0 z-30 transition-all duration-700",
      isScrolled ? "bg-white/40 backdrop-blur-3xl border-b border-white/20 shadow-[0_2px_24px_rgba(0,0,0,0.02)]" : "bg-transparent"
    )}>
      
      {/* Left - Breadcrumbs */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-[9px] font-semibold text-slate-400 uppercase tracking-[0.25em] mb-1.5 opacity-60">
          <span>Home</span>
          <span>/</span>
          <span className="text-indigo-500">{displayTitle}</span>
        </div>
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight leading-none">{displayTitle}</h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-white/60 hover:text-indigo-600 transition-all duration-500 border border-transparent hover:border-white/40 shadow-sm">
           <Search size={18} />
        </button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-white/60 hover:text-indigo-600 transition-all duration-500 border border-transparent hover:border-white/40 shadow-sm">
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-indigo-600 border-2 border-white" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0 rounded-3xl shadow-2xl border-white/20 overflow-hidden bg-white/70 backdrop-blur-3xl">
             <div className="px-6 py-5 border-b border-black/5 flex items-center justify-between bg-white/20">
                <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                <button onClick={markAllAsRead} className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest">Clear All</button>
             </div>
             <div className="max-h-[350px] overflow-y-auto no-scrollbar p-2">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-xs font-medium text-slate-400">No new notifications</p>
                  </div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className={cn(
                      "px-4 py-4 rounded-2xl mb-1 last:mb-0 hover:bg-white/40 transition-colors border border-transparent hover:border-white/60",
                      !n.read && "bg-white/20 border-white/40 shadow-sm"
                    )}>
                      <div className="flex gap-4">
                         <div className={cn(
                           "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                           n.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                         )}>
                           {n.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                         </div>
                         <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-semibold text-slate-900 leading-snug">{n.title}</p>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{n.message}</p>
                            <p className="text-[9px] font-medium text-slate-300 mt-2 flex items-center gap-1 uppercase tracking-widest">
                              <Clock size={10} /> {n.time}
                            </p>
                         </div>
                      </div>
                    </div>
                  )))}
             </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-px h-6 bg-black/5 mx-1" />

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/60 transition-all duration-500 shadow-sm">
               <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-indigo-200">
                 {getInitials(userName)}
               </div>
               <div className="hidden sm:flex flex-col items-start">
                  <p className="text-[12px] font-semibold text-slate-900 leading-none">{user?.first_name || "User"}</p>
                  <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest mt-1 opacity-60">{user?.role || "Staff"}</p>
               </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 rounded-3xl shadow-2xl border-white/20 bg-white/70 backdrop-blur-3xl">
            <div className="px-4 py-3 bg-white/20 rounded-2xl mb-2 border border-white/40">
               <p className="text-sm font-semibold text-slate-900">{userName}</p>
               <p className="text-[10px] font-medium text-slate-400 truncate mt-1">{user?.email}</p>
            </div>
            <div className="space-y-1">
               <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium text-slate-600 hover:bg-white/60 hover:text-indigo-600 cursor-pointer transition-all border border-transparent hover:border-white/60">
                  <User size={16} />
                  <span>Account Settings</span>
               </DropdownMenuItem>
               <DropdownMenuItem 
                 onClick={() => { clearTokens(); window.location.href = "/login"; }}
                 className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50/50 cursor-pointer transition-all"
               >
                  <LogOut size={16} />
                  <span>Secure Signout</span>
               </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
