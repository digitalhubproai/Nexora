"use client";
import { Mail, Inbox, Send, FileText, Trash2, Star } from "lucide-react";
const emails = [
  { id: 1, from: "Sarah Johnson", subject: "Q4 Sales Report Review", preview: "Hi, I've attached the Q4 sales report for your review...", time: "2h ago", unread: true, starred: true },
  { id: 2, from: "Mike Chen", subject: "New partnership opportunity", preview: "I wanted to discuss a potential partnership with...", time: "4h ago", unread: true, starred: false },
  { id: 3, from: "Lisa Park", subject: "Invoice #INV-234 Payment", preview: "Please find the payment confirmation for invoice...", time: "1d ago", unread: false, starred: false },
  { id: 4, from: "David Kim", subject: "Meeting rescheduled", preview: "The client meeting has been moved to Thursday at...", time: "1d ago", unread: false, starred: true },
  { id: 5, from: "Emma Wilson", subject: "Product launch update", preview: "Quick update on the product launch timeline...", time: "2d ago", unread: false, starred: false },
];
export default function EmailPage() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-3"><Mail size={24} className="text-cyan-400" /><h2 className="text-xl font-bold text-white/90">Email</h2></div>
      <div className="grid grid-cols-12 gap-4">
        {/* Folders */}
        <div className="col-span-3">
          <div className="glass-card p-3 space-y-1">
            <button className="btn-primary w-full text-sm mb-3"><Plus size={14} /> Compose</button>
            {[{ icon: Inbox, label: "Inbox", count: 12 }, { icon: Send, label: "Sent", count: 0 }, { icon: FileText, label: "Drafts", count: 3 }, { icon: Star, label: "Starred", count: 2 }, { icon: Trash2, label: "Trash", count: 0 }].map((f, i) => (
              <button key={i} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${i === 0 ? "bg-cyan-500/10 text-cyan-400" : "text-white/50 hover:bg-white/[0.04] hover:text-white/80"} transition-colors`}>
                <f.icon size={16} /><span className="flex-1 text-left">{f.label}</span>{f.count > 0 && <span className="text-xs bg-white/[0.06] px-2 py-0.5 rounded-full">{f.count}</span>}
              </button>
            ))}
          </div>
        </div>
        {/* Email List */}
        <div className="col-span-9">
          <div className="glass-card divide-y divide-white/[0.04]">
            {emails.map(email => (
              <div key={email.id} className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-white/[0.03] transition-colors ${email.unread ? "bg-white/[0.02]" : ""}`}>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center text-xs font-bold text-cyan-400">{email.from[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><p className={`text-sm ${email.unread ? "font-semibold text-white/90" : "text-white/70"}`}>{email.from}</p>{email.starred && <Star size={12} className="text-amber-400 fill-amber-400" />}</div>
                  <p className={`text-sm ${email.unread ? "font-medium text-white/75" : "text-white/50"}`}>{email.subject}</p>
                  <p className="text-xs text-white/30 truncate">{email.preview}</p>
                </div>
                <span className="text-xs text-white/30">{email.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function Plus({ size, className }: { size: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
}
