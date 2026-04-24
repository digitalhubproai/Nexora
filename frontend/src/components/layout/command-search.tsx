"use client";
import { useState, useEffect } from "react";
import { Search, Users, Handshake, Package, FolderKanban } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const QUICK_LINKS = [
  { label: "Contacts", icon: Users, href: "/contacts" },
  { label: "Deals", icon: Handshake, href: "/deals" },
  { label: "Products", icon: Package, href: "/products" },
  { label: "Projects", icon: FolderKanban, href: "/projects" },
];

export function CommandSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigate = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/20 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] overflow-hidden"
          >
            <div className="flex items-center gap-5 px-8 py-7 border-b border-black/5">
              <Search size={22} className="text-indigo-600" />
              <input 
                autoFocus
                type="text" 
                placeholder="Find anything... (Pages, Records, Tasks)" 
                className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 text-lg font-medium tracking-tight"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/5 text-[9px] font-bold text-slate-400 border border-black/5">
                ESC
              </div>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto no-scrollbar">
              {!query && (
                <div className="space-y-6">
                  <div>
                    <div className="px-5 mb-4 text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] opacity-60">Global Shortcuts</div>
                    <div className="grid grid-cols-2 gap-3">
                      {QUICK_LINKS.map((link) => (
                        <button 
                          key={link.href}
                          onClick={() => navigate(link.href)}
                          className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white transition-all duration-300 text-slate-600 hover:text-indigo-600 shadow-sm border border-transparent hover:border-white group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-100 transition-all duration-500">
                            <link.icon size={18} />
                          </div>
                          <span className="font-semibold text-sm tracking-tight">{link.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {query && (
                <div className="space-y-1">
                  <div className="px-5 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] opacity-60">Search Results</div>
                  {[1, 2, 3].map(i => (
                    <button 
                      key={i}
                      className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white transition-all duration-300 text-slate-600 hover:text-indigo-600 border border-transparent hover:border-white shadow-sm group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                        <FolderKanban size={18} className="text-slate-400 group-hover:text-indigo-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-slate-900 tracking-tight">Matching Record {i}</p>
                        <p className="text-[11px] font-medium text-slate-400 mt-0.5">Found in {query.toLowerCase()} category</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="px-8 py-5 bg-black/5 border-t border-black/5 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] opacity-60">
              <div className="flex gap-6">
                <span className="flex items-center gap-2"><div className="px-1.5 py-1 rounded bg-white border border-black/5 text-[8px]">↑↓</div> Navigate</span>
                <span className="flex items-center gap-2"><div className="px-1.5 py-1 rounded bg-white border border-black/5 text-[8px]">↵</div> Select</span>
              </div>
              <span>Nexora Core v1.5</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
