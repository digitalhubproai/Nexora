"use client";
import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { formatCurrency, formatDate, debounce, cn } from "@/lib/utils";
import { useNotificationStore } from "@/store/use-notification-store";
import { Plus, Search, ChevronLeft, ChevronRight, Pencil, Trash2, Eye, X, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Column {
  key: string;
  label: string;
  format?: "currency" | "date" | "badge" | "text";
  badgeMap?: Record<string, string>;
}

interface CrudPageProps {
  title: string;
  endpoint: string;
  columns: Column[];
  formFields: FormField[];
  icon?: React.ReactNode;
}

interface FormField {
  key: string;
  label: string;
  type: "text" | "email" | "number" | "date" | "select" | "textarea";
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-xl bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-10 py-8 border-b border-slate-50">
          <h3 className="text-lg font-black tracking-tight text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-3 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all">
            <X size={20} />
          </button>
        </div>
        <div className="p-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function CrudPage({ title, endpoint, columns, formFields, icon }: CrudPageProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Record<string, unknown> | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [showDetail, setShowDetail] = useState<Record<string, unknown> | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const { showToast } = useNotificationStore();

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${endpoint}?page=${page}&page_size=${pageSize}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (sortBy) url += `&sort_by=${sortBy}&sort_order=${sortOrder}`;
      const data = await api.get<{ items: Record<string, unknown>[]; total: number; total_pages: number }>(url);
      setItems(data.items);
      setTotal(data.total);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, page, pageSize, search, sortBy, sortOrder]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const debouncedSearch = useCallback(debounce((val: string) => {
    setSearch(val as string);
    setPage(1);
  }, 300), []);

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const openCreateForm = () => {
    setEditItem(null);
    setFormData({});
    setShowForm(true);
  };

  const openEditForm = (item: Record<string, unknown>) => {
    setEditItem(item);
    const data: Record<string, unknown> = {};
    formFields.forEach(f => { data[f.key] = item[f.key] ?? ""; });
    setFormData(data);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem) {
        await api.put(`${endpoint}/${editItem.id}`, formData);
      } else {
        await api.post(endpoint, formData);
      }
      showToast(`${title.slice(0, -1)} saved successfully`, "success");
      setShowForm(false);
      fetchItems();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await api.delete(`${endpoint}/${id}`);
      showToast(`${title.slice(0, -1)} deleted`, "success");
      fetchItems();
    } catch (err) {
      showToast("Delete failed", "error");
    }
  };

  const handlePrint = (item: Record<string, unknown>) => {
    setShowDetail(item);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const renderCell = (item: Record<string, unknown>, col: Column) => {
    const val = item[col.key];
    if (val === null || val === undefined) return <span className="text-slate-300">—</span>;
    switch (col.format) {
      case "currency": return <span className="font-bold text-slate-900">{formatCurrency(val as number)}</span>;
      case "date": return <span className="text-slate-500">{formatDate(val as string)}</span>;
      case "badge": {
        const cls = col.badgeMap?.[val as string] || "bg-slate-100 text-slate-600";
        return <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", cls)}>{String(val).replace(/_/g, " ")}</span>;
      }
      default: return <span className="font-medium text-slate-700">{String(val)}</span>;
    }
  };

  const exportCSV = () => {
    const header = columns.map(c => c.label).join(",");
    const rows = items.map(item => columns.map(c => {
      const v = item[c.key];
      return typeof v === "string" ? `"${v}"` : v ?? "";
    }).join(","));
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${title.toLowerCase().replace(/ /g, "_")}.csv`; a.click();
  };

  return (
    <div className="space-y-10 animate-fade-in pb-24 max-w-[1500px] mx-auto px-4">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 bg-white/40 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-8">
           <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100">
              {icon}
           </div>
           <div>
              <div className="flex items-center gap-3 mb-2 opacity-60">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">RECORDS</span>
                 <span className="w-1 h-1 rounded-full bg-slate-300" />
              </div>
              <h1 className="text-3xl font-semibold text-slate-900 tracking-tight leading-none">{title} Hub</h1>
              <p className="text-sm font-medium text-slate-400 mt-2.5 leading-relaxed max-w-md">Monitor and manage your enterprise {title.toLowerCase()} repository with real-time sync.</p>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search repository..." 
                className="w-72 h-14 bg-white/40 border border-white/60 rounded-2xl pl-12 pr-6 text-sm font-semibold text-slate-900 outline-none focus:bg-white focus:ring-4 focus:ring-indigo-50/30 transition-all backdrop-blur-md"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
           <Button className="h-14 px-8 rounded-2xl gap-3 text-[11px] font-bold uppercase tracking-widest bg-slate-900 text-white hover:bg-black shadow-xl shadow-slate-200 transition-all" onClick={openCreateForm}>
              <Plus size={18} />
              <span>Add Record</span>
           </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.02)] overflow-hidden transition-all duration-700">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/5 bg-white/20">
                {columns.map((col: any) => (
                  <th key={col.key} className="py-8 px-10 text-left text-[9px] font-bold text-slate-400 uppercase tracking-[0.25em] opacity-60">
                    {col.label}
                  </th>
                ))}
                <th className="py-8 px-10 text-right text-[9px] font-bold text-slate-400 uppercase tracking-[0.25em] opacity-60">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {columns.map((_, j) => (
                      <td key={j} className="py-6 px-10"><div className="h-4 bg-slate-50 rounded animate-pulse" /></td>
                    ))}
                    <td />
                  </tr>
                ))
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-24">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
                        <Eye size={24} className="text-slate-300" />
                      </div>
                      <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">No results found</p>
                      <button onClick={openCreateForm} className="mt-6 px-8 py-3 rounded-2xl bg-white border border-slate-100 text-slate-600 font-bold text-xs uppercase tracking-widest hover:border-indigo-100 hover:text-indigo-600 transition-all shadow-sm">
                        Add first {title.toLowerCase().slice(0, -1)}
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id as string} className="group hover:bg-slate-50/50 transition-all">
                    {columns.map((col) => (
                      <td key={col.key} className="py-6 px-10">
                        {renderCell(item, col)}
                      </td>
                    ))}
                    <td className="py-6 px-10">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setShowDetail(item)}
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm" title="View">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => openEditForm(item)}
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-100 transition-all shadow-sm" title="Edit">
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => handleDelete(item.id as string)}
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-100 text-slate-400 hover:text-rose-600 hover:border-rose-100 transition-all shadow-sm">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-10 py-6 bg-slate-50/30 border-t border-slate-50">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Page {page} of {totalPages} • {total} total
            </p>
            <div className="flex items-center gap-3">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                className="h-10 px-6 rounded-xl bg-white border border-slate-100 text-xs font-bold text-slate-600 hover:border-indigo-100 hover:text-indigo-600 disabled:opacity-30 transition-all shadow-sm">
                Previous
              </button>
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                className="h-10 px-6 rounded-xl bg-white border border-slate-100 text-xs font-bold text-slate-600 hover:border-indigo-100 hover:text-indigo-600 disabled:opacity-30 transition-all shadow-sm">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}
        title={editItem ? `Edit ${title.slice(0, -1)}` : `New ${title.slice(0, -1)}`}>
        <form onSubmit={handleSave} className="space-y-6">
          {formFields.map((field) => (
            <div key={field.key} className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{field.label}</label>
              {field.type === "select" ? (
                <select className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm focus:border-indigo-200 outline-none transition-all"
                  value={(formData[field.key] as string) || ""}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  required={field.required}>
                  <option value="">Select...</option>
                  {field.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : field.type === "textarea" ? (
                <textarea className="w-full min-h-[100px] p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm focus:border-indigo-200 outline-none transition-all resize-none"
                  value={(formData[field.key] as string) || ""}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  required={field.required} placeholder={field.placeholder} />
              ) : (
                <input type={field.type} className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm focus:border-indigo-200 outline-none transition-all"
                  value={(formData[field.key] as string) || ""}
                  onChange={(e) => setFormData({ ...formData, [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value })}
                  required={field.required} placeholder={field.placeholder} />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-3 pt-6">
            <button type="button" onClick={() => setShowForm(false)} className="h-12 px-8 rounded-2xl bg-slate-50 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-all">Cancel</button>
            <button type="submit" disabled={saving} className="h-12 px-8 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50">
              {saving ? "Saving..." : editItem ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Detail Modal */}
      <Modal isOpen={!!showDetail} onClose={() => setShowDetail(null)} title="Details">
        <div className="print-header hidden">
           <h1 className="text-2xl font-bold text-black">{title}</h1>
           <p className="text-sm text-gray-500">Nexora CRM</p>
           <hr className="my-4 border-gray-200" />
        </div>
        {showDetail && (
          <div className="space-y-4">
            {Object.entries(showDetail).filter(([k]) => k !== "password_hash" && k !== "id").map(([key, val]) => (
              <div key={key} className="flex flex-col gap-1 pb-4 border-b border-slate-50 last:border-0">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{key.replace(/_/g, " ")}</span>
                <span className="text-sm font-bold text-slate-900">{val === null ? "—" : String(val)}</span>
              </div>
            ))}
            <div className="pt-6">
              <button onClick={() => window.print()} className="w-full h-12 rounded-2xl bg-slate-50 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                <Printer size={18} />
                Print Details
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
