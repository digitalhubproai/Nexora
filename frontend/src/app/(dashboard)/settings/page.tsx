"use client";
import { Settings, Building2, DollarSign, Bell, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function SettingsPage() {
  return (
    <div className="space-y-10 animate-fade-in pb-24">
      {/* Header */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 luxe-shadow flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 shadow-inner">
            <Settings size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Platform Settings</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Configure your enterprise workspace</p>
          </div>
        </div>
        <Button variant="premium" className="px-10">Save All Changes</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Company Profile */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 luxe-shadow">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Building2 size={24} />
            </div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Company Profile</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Company Name</label>
              <input className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-bold text-slate-900 focus:bg-white focus:border-indigo-200 transition-all outline-none" defaultValue="Nexora Corp" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Industry</label>
              <input className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-bold text-slate-900 focus:bg-white focus:border-indigo-200 transition-all outline-none" defaultValue="Technology" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Address</label>
              <textarea className="w-full min-h-[120px] bg-slate-50 border border-slate-100 rounded-2xl p-6 text-sm font-bold text-slate-900 focus:bg-white focus:border-indigo-200 transition-all outline-none resize-none" defaultValue="123 Business Ave, Suite 100" />
            </div>
          </div>
        </div>

        {/* Finance Settings */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 luxe-shadow">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <DollarSign size={24} />
            </div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Finance & Tax</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Currency</label>
              <select className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-bold text-slate-900 focus:bg-white focus:border-indigo-200 transition-all outline-none appearance-none">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>PKR (₨)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tax Rate (%)</label>
              <input className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-bold text-slate-900 focus:bg-white focus:border-indigo-200 transition-all outline-none" type="number" defaultValue="10" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Invoice Prefix</label>
              <input className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm font-bold text-slate-900 focus:bg-white focus:border-indigo-200 transition-all outline-none" defaultValue="INV-" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 luxe-shadow">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Bell size={24} />
            </div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Notifications</h3>
          </div>
          <div className="space-y-4">
            {["Email notifications", "Low stock alerts", "Invoice reminders", "New lead alerts"].map((item, i) => (
              <label key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100">
                <span className="text-sm font-bold text-slate-600">{item}</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600 rounded-lg" />
              </label>
            ))}
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 luxe-shadow">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <Database size={24} />
            </div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Data Control</h3>
          </div>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-between h-14 px-8">
               <span>Export All Business Data</span>
               <Database size={18} className="opacity-40" />
            </Button>
            <Button variant="outline" className="w-full justify-between h-14 px-8">
               <span>Import Records (CSV/JSON)</span>
               <Building2 size={18} className="opacity-40" />
            </Button>
            <Button variant="destructive" className="w-full h-14">Reset Enterprise Environment</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
