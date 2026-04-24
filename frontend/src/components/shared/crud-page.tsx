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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-xl bg-white border border-slate-100 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 md:px-10 py-6 md:py-8 border-b border-slate-50 shrink-0">
          <h3 className="text-base md:text-lg font-black tracking-tight text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-2 md:p-3 rounded-xl md:rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
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
    <div className="space-y-6 md:space-y-8 animate-fade-in pb-24 max-w-[1500px] mx-auto px-2 md:px-4">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4 md:gap-6">
           <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shrink-0">
              {icon}
           </div>
           <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
              <p className="text-xs md:text-sm font-medium text-slate-500 mt-1 hidden sm:block">Manage your {title.toLowerCase()} records and details.</p>
           </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
           <div className="relative group flex-1 sm:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full sm:w-64 h-11 bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 text-sm font-medium text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-50 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
           <Button className="h-11 px-6 rounded-xl gap-2 text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-all" onClick={openCreateForm}>
              <Plus size={16} />
              <span>Add {title.slice(0, -1)}</span>
           </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[800px] lg:min-w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {columns.map((col: any) => (
                  <th key={col.key} className="py-4 px-6 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {col.label}
                  </th>
                ))}
                <th className="py-4 px-6 text-right text-[10px] font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {columns.map((_, j) => (
                      <td key={j} className="py-4 px-6"><div className="h-4 bg-slate-50 rounded animate-pulse" /></td>
                    ))}
                    <td />
                  </tr>
                ))
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-12">
                    <div className="flex flex-col items-center">
                      <p className="text-slate-400 font-medium text-sm">No records found</p>
                      <button onClick={openCreateForm} className="mt-4 text-indigo-600 font-bold text-xs hover:underline">
                        Create your first record
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id as string} className="group hover:bg-slate-50/50 transition-all">
                    {columns.map((col) => (
                      <td key={col.key} className="py-4 px-6">
                        {renderCell(item, col)}
                      </td>
                    ))}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => setShowDetail(item)}
                          className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all" title="View">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => openEditForm(item)}
                          className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all" title="Edit">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(item.id as string)}
                          className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all" title="Delete">
                          <Trash2 size={16} />
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
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-slate-50/50 border-t border-slate-100 gap-4">
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
              Page {page} of {totalPages} • {total} total
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                className="h-9 px-4 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all">
                Previous
              </button>
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                className="h-9 px-4 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all">
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
