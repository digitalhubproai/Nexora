"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Play, Square, CheckCircle2, MapPin, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AttendanceWidget() {
  const [status, setStatus] = useState<"out" | "in" | "done">("out");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAction = () => {
    if (status === "out") setStatus("in");
    else if (status === "in") setStatus("done");
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
         <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Fingerprint size={20} />
         </div>
         <div className="text-right">
            <h4 className="text-xl font-bold text-slate-900 tracking-tight">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {time.toLocaleDateString([], { month: 'short', day: 'numeric' })}
            </p>
         </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
           <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-50">
              <MapPin size={14} />
           </div>
           <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">HQ • Floor 4</p>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {status === "done" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-6 bg-emerald-50 rounded-2xl border border-emerald-100"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-600 mb-2 shadow-sm border border-emerald-50">
                <CheckCircle2 size={20} />
              </div>
              <p className="text-[11px] font-bold text-emerald-900 uppercase tracking-widest">Completed</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <Button 
                onClick={handleAction}
                className={cn(
                  "w-full h-12 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm",
                  status === "out" 
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                    : "bg-rose-600 hover:bg-rose-700 text-white"
                )}
              >
                {status === "out" ? <Play size={16} /> : <Square size={16} />}
                <span className="text-xs font-bold uppercase tracking-wider">
                  {status === "out" ? "Clock In" : "Finish"}
                </span>
              </Button>
              <p className="text-[9px] font-bold text-slate-300 text-center uppercase tracking-widest">
                {status === "out" ? "Start your day" : "Working for 4h 12m"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
