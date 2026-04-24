"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { GitBranch, Plus, GripVertical } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const STAGES = [
  { key: "qualification", label: "Qualification", color: "border-blue-500/30" },
  { key: "proposal", label: "Proposal", color: "border-violet-500/30" },
  { key: "negotiation", label: "Negotiation", color: "border-amber-500/30" },
  { key: "closed_won", label: "Closed Won", color: "border-emerald-500/30" },
  { key: "closed_lost", label: "Closed Lost", color: "border-rose-500/30" },
];

interface Deal { id: string; title: string; value: number; stage: string; probability: number; }

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.get<{ items: Deal[] }>("/deals?page_size=100");
        setDeals(data.items);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    load();
  }, []);

  const moveToStage = async (dealId: string, newStage: string) => {
    try {
      await api.put(`/deals/${dealId}`, { stage: newStage });
      setDeals(deals.map(d => d.id === dealId ? { ...d, stage: newStage } : d));
    } catch (err) { console.error(err); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-10 animate-fade-in pb-24 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 luxe-shadow flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
            <GitBranch size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Sales Pipeline</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{deals.length} deals in active stages</p>
          </div>
        </div>
        <Button variant="premium" className="gap-3">
          <Plus size={20} strokeWidth={3} />
          <span>New Deal</span>
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-8 overflow-x-auto pb-10 custom-scrollbar">
        {STAGES.map((stage, i) => {
          const stageDeals = deals.filter(d => d.stage === stage.key);
          const stageTotal = stageDeals.reduce((s, d) => s + d.value, 0);
          const colors = ["indigo", "emerald", "amber", "rose", "sky"];
          const activeColor = colors[i % colors.length];

          return (
            <div key={stage.key} className="flex-shrink-0 w-[320px] space-y-6"
              onDragOver={(e: React.DragEvent) => e.preventDefault()}
              onDrop={(e: React.DragEvent) => { const id = e.dataTransfer.getData("dealId"); if (id) moveToStage(id, stage.key); }}>
              
              <div className="flex items-center justify-between px-4">
                <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{stage.label}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stageDeals.length} • {formatCurrency(stageTotal)}</p>
                </div>
                <div className={`w-2 h-2 rounded-full bg-${activeColor}-500 shadow-[0_0_10px_rgba(0,0,0,0.1)]`} />
              </div>

              <div className="space-y-4 p-2 min-h-[500px] rounded-[2rem] bg-slate-50/50 border border-slate-100/50">
                {stageDeals.map(deal => (
                  <motion.div 
                    layoutId={deal.id}
                    key={deal.id} 
                    className="bg-white p-6 rounded-2xl luxe-shadow border border-slate-50 cursor-grab active:cursor-grabbing hover:scale-[1.02] transition-transform duration-300" 
                    draggable
                    onDragStart={(e: any) => e.dataTransfer.setData("dealId", deal.id)}
                  >
                    <div className="flex items-start gap-3">
                      <GripVertical size={16} className="text-slate-200 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">{deal.title}</p>
                        <p className="text-xl font-black text-indigo-600 mt-2">{formatCurrency(deal.value)}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{deal.probability}%</span>
                          <div className="w-16 h-1.5 bg-slate-50 rounded-full overflow-hidden">
                             <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${deal.probability}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {stageDeals.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-40 text-slate-300 border-2 border-dashed border-slate-100 rounded-[2rem]">
                    <Plus size={24} className="mb-2 opacity-50" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Drop here</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
