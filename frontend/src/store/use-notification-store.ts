import { create } from 'zustand';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Omit<Notification, 'id' | 'read' | 'time'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  toasts: Toast[];
  showToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [
    { id: '1', title: 'New Deal', message: 'A new high-value deal was created by System.', type: 'success', time: '2 mins ago', read: false },
    { id: '2', title: 'Inventory Alert', message: 'Server Rack X1 is low on stock.', type: 'warning', time: '1 hour ago', read: false },
    { id: '3', title: 'Payment Received', message: 'Invoice #INV-2026-102 was paid.', type: 'info', time: '3 hours ago', read: true },
  ],
  unreadCount: 2,
  addNotification: (n) => set((state) => {
    const newN = { ...n, id: Math.random().toString(36).substr(2, 9), read: false, time: 'Just now' };
    return { 
      notifications: [newN, ...state.notifications],
      unreadCount: state.unreadCount + 1
    };
  }),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    unreadCount: Math.max(0, state.unreadCount - 1)
  })),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0
  })),
  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
  toasts: [],
  showToast: (message, type) => set((state) => {
    const id = Math.random().toString(36).substr(2, 9);
    return { toasts: [...state.toasts, { id, message, type }] };
  }),
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter(t => t.id !== id)
  }))
}));
