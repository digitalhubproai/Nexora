"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "@/lib/api";
import { Zap, Mail, Lock, ArrowRight, Loader2, User, ShieldCheck, Globe, Activity, CheckCircle2 } from "lucide-react";
import { useNotificationStore } from "@/store/use-notification-store";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { showToast } = useNotificationStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        const res = await register(email, password, firstName, lastName, "admin");
        showToast(`Welcome! Employee ID: ${res.user.employee_id}`, "success");
        setTimeout(() => router.push("/dashboard"), 2000);
      } else {
        await login(email, password);
        showToast("Welcome back to Nexora", "success");
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Authentication failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      {/* Left: Branding Section (Awesome Minimalist) */}
      <div className="hidden lg:flex w-[60%] bg-[#FDFDFF] relative items-center justify-center p-24 overflow-hidden border-r border-slate-100">
        {/* Animated Background Accents */}
        <div className="absolute inset-0">
           <motion.div 
             animate={{ 
               scale: [1, 1.2, 1],
               rotate: [0, 90, 0],
               opacity: [0.3, 0.5, 0.3]
             }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-indigo-50 rounded-full blur-[120px]" 
           />
           <motion.div 
             animate={{ 
               scale: [1, 1.3, 1],
               rotate: [0, -90, 0],
               opacity: [0.2, 0.4, 0.2]
             }}
             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
             className="absolute bottom-[-20%] left-[-10%] w-[80%] h-[80%] bg-emerald-50 rounded-full blur-[120px]" 
           />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 max-w-2xl"
        >
          <div className="flex items-center gap-4 mb-12">
             <div className="w-16 h-16 rounded-[2rem] bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-200">
                <Zap size={32} className="text-white fill-white" />
             </div>
             <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-slate-900">Nexora</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-1">Enterprise OS</span>
             </div>
          </div>

          <h2 className="text-7xl font-bold text-slate-900 tracking-tighter leading-[1.1] mb-10">
            The future of<br />
            <span className="text-indigo-600">Enterprise</span><br />
            Management.
          </h2>

          <p className="text-xl font-medium text-slate-500 leading-relaxed mb-16 max-w-lg">
            A unified command center designed for the next generation of logistics, finance, and human resources.
          </p>

          <div className="grid grid-cols-2 gap-10">
             {[
               { title: "Smart Logic", desc: "Automated departmental workflows" },
               { title: "Real-time AI", desc: "Live business intelligence feeds" }
             ].map((f, i) => (
               <div key={i} className="space-y-3">
                  <div className="flex items-center gap-3">
                     <CheckCircle2 size={20} className="text-emerald-500" />
                     <h4 className="text-base font-bold text-slate-900">{f.title}</h4>
                  </div>
                  <p className="text-sm font-medium text-slate-400 leading-relaxed">{f.desc}</p>
               </div>
             ))}
          </div>
        </motion.div>
      </div>

      {/* Right: Form Section */}
      <div className="w-full lg:w-[40%] flex flex-col items-center justify-center p-8 lg:p-16 z-10 bg-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[400px]"
        >
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
              {isRegister ? "Join Nexora" : "Access Console"}
            </h3>
            <p className="text-sm font-medium text-slate-500 mt-2">
              {isRegister ? "Create your departmental identity." : "Please enter your identity credentials."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {isRegister && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-2 gap-4 overflow-hidden"
                >
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</Label>
                    <Input className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-50/50 transition-all" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} required={isRegister} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Last Name</Label>
                    <Input className="h-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-50/50 transition-all" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} required={isRegister} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email or ID</Label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input className="h-14 pl-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-50/50 transition-all" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</Label>
                {!isRegister && <button type="button" className="text-[10px] font-bold text-indigo-600">Recovery</button>}
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input type="password" className="h-14 pl-12 rounded-xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-50/50 transition-all" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>

            <Button type="submit" className="w-full h-16 mt-6 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold tracking-tight shadow-xl shadow-slate-200 transition-all" disabled={loading}>
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <span>{isRegister ? "Confirm Identity" : "Launch Console"}</span>
                  <ArrowRight size={20} />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-50 text-center">
            <p className="text-sm font-medium text-slate-500">
              {isRegister ? "Part of the team?" : "Need a workspace?"}{" "}
              <button 
                className="text-indigo-600 font-bold hover:underline" 
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? "Access now" : "Request access"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
