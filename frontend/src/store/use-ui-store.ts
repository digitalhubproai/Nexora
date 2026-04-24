import { create } from "zustand";

interface UIStore {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  activeModal: string | null;
  modalData: Record<string, unknown> | null;
  openModal: (name: string, data?: Record<string, unknown>) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  activeModal: null,
  modalData: null,
  openModal: (name, data) => set({ activeModal: name, modalData: data || null }),
  closeModal: () => set({ activeModal: null, modalData: null }),
}));
