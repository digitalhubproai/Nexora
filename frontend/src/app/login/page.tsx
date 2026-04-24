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
        showToast("Account created successfully", "success");
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        await login(email, password);
        showToast("Welcome back", "success");
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Authentication failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm"
      >
        <div className="flex flex-col items-center mb-10 text-center">
           <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg mb-4">
              <Zap size={24} className="text-white fill-white" />
           </div>
           <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
             {isRegister ? "Create an account" : "Sign in to Nexora"}
           </h1>
           <p className="text-sm text-slate-500 mt-2">
             {isRegister ? "Enter your details to get started" : "Welcome back! Please enter your details"}
           </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700">First Name</Label>
                <Input 
                  className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white" 
                  placeholder="First name" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  required={isRegister} 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700">Last Name</Label>
                <Input 
                  className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white" 
                  placeholder="Last name" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  required={isRegister} 
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-700">Email Address</Label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                className="h-12 pl-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white" 
                placeholder="email@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <Label className="text-xs font-bold text-slate-700">Password</Label>
              {!isRegister && <button type="button" className="text-xs text-indigo-600 hover:underline">Forgot password?</button>}
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                type="password" 
                className="h-12 pl-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-sm transition-all" 
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin mx-auto" />
            ) : (
              <span>{isRegister ? "Create account" : "Sign in"}</span>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button 
              className="text-indigo-600 font-bold hover:underline" 
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
