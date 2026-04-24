"use client";
import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const prev = () => setDate(new Date(year, month - 1, 1));
  const next = () => setDate(new Date(year, month + 1, 1));

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-3"><CalendarDays size={24} className="text-cyan-400" /><h2 className="text-xl font-bold text-white/90">Calendar</h2></div>
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={prev} className="p-2 rounded-lg hover:bg-white/[0.06] text-white/50"><ChevronLeft size={20} /></button>
          <h3 className="text-lg font-semibold text-white/80">{MONTHS[month]} {year}</h3>
          <button onClick={next} className="p-2 rounded-lg hover:bg-white/[0.06] text-white/50"><ChevronRight size={20} /></button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {DAYS.map(d => <div key={d} className="text-center text-xs font-semibold text-white/35 py-2">{d}</div>)}
          {cells.map((day, i) => {
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            return (
              <div key={i} className={`aspect-square flex items-center justify-center rounded-lg text-sm cursor-pointer transition-colors ${
                !day ? "" : isToday ? "bg-cyan-500/20 text-cyan-400 font-bold" : "text-white/60 hover:bg-white/[0.05]"
              }`}>{day || ""}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
