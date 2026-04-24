"use client";
import { useEffect } from "react";
import { useNotificationStore, Toast } from "@/store/use-notification-store";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from "lucide-react";

const MotionDiv = motion.div as any;

export function Toaster() {
  const { toasts, removeToast } = useNotificationStore();

  return (
    <div className="fixed top-20 right-6 z-[9999] flex flex-col gap-3 pointer-events-none min-w-[300px]">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 5000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const styles = {
    success: {
      icon: <CheckCircle className="text-white" size={18} />,
      bg: "bg-emerald-600 border-emerald-700 shadow-emerald-200",
    },
    error: {
      icon: <AlertCircle className="text-white" size={18} />,
      bg: "bg-rose-600 border-rose-700 shadow-rose-200",
    },
    warning: {
      icon: <AlertTriangle className="text-white" size={18} />,
      bg: "bg-amber-600 border-amber-700 shadow-amber-200",
    },
    info: {
      icon: <Info className="text-white" size={18} />,
      bg: "bg-indigo-600 border-indigo-700 shadow-indigo-200",
    },
  };

  const currentStyle = styles[toast.type] || styles.info;

  return (
    <MotionDiv
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`pointer-events-auto flex items-start gap-4 p-5 rounded-2xl border shadow-2xl ${currentStyle.bg} min-w-[320px] max-w-[420px]`}
    >
      <div className="shrink-0 mt-0.5">{currentStyle.icon}</div>
      <div className="flex-1 text-[13px] font-bold text-white leading-snug tracking-tight">
        {toast.message}
      </div>
      <button 
        onClick={() => onRemove(toast.id)}
        className="text-white/40 hover:text-white transition-colors mt-0.5"
      >
        <X size={16} strokeWidth={2.5} />
      </button>
    </MotionDiv>
  );
}
