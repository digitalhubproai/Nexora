"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Bell, Search, LogOut, User, CheckCircle2, AlertCircle, Info, Clock, Command, Menu } from "lucide-react";
import { getStoredUser, clearTokens } from "@/lib/api";
import { getInitials } from "@/lib/utils";
import { useNotificationStore } from "@/store/use-notification-store";
import { useUIStore } from "@/store/use-ui-store";
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
  const { toggleSidebar } = useUIStore();
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
      "h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 transition-all border-b border-slate-200 bg-white",
      isScrolled ? "shadow-sm" : "shadow-none"
    )}>
      
      {/* Left - Menu & Title */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-50 transition-all"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">{displayTitle}</h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search */}
        <button className="hidden sm:flex p-2 rounded-lg text-slate-400 hover:bg-slate-50 transition-all">
           <Search size={18} />
        </button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-lg text-slate-400 hover:bg-slate-50 transition-all">
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-600 border-2 border-white" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0 rounded-xl shadow-xl border-slate-200 overflow-hidden bg-white">
             <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Notifications</h3>
                <button onClick={markAllAsRead} className="text-[10px] font-bold text-indigo-600 hover:underline">Clear All</button>
             </div>
             <div className="max-h-[350px] overflow-y-auto no-scrollbar">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-xs font-medium text-slate-400">No new notifications</p>
                  </div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className={cn(
                      "px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors",
                      !n.read && "bg-indigo-50/30"
                    )}>
                      <div className="flex gap-3">
                         <div className="shrink-0 mt-0.5">
                           {n.type === 'success' ? <CheckCircle2 size={14} className="text-emerald-500" /> : <AlertCircle size={14} className="text-rose-500" />}
                         </div>
                         <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 leading-snug">{n.title}</p>
                            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                         </div>
                      </div>
                    </div>
                  )))}
             </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block" />

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-50 transition-all">
               <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                 {getInitials(userName)}
               </div>
               <div className="hidden md:flex flex-col items-start">
                  <p className="text-xs font-bold text-slate-900 leading-none">{user?.first_name || "User"}</p>
                  <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-widest">{user?.role || "Staff"}</p>
               </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl shadow-xl border-slate-200 bg-white">
            <div className="px-3 py-2 bg-slate-50 rounded-lg mb-1">
               <p className="text-xs font-bold text-slate-900">{userName}</p>
               <p className="text-[10px] text-slate-500 truncate mt-0.5">{user?.email}</p>
            </div>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 cursor-pointer">
               <User size={14} />
               <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => { clearTokens(); window.location.href = "/login"; }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 cursor-pointer"
            >
               <LogOut size={14} />
               <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
