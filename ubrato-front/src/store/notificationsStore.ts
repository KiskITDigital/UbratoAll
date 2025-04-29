import { getNotifications, setNotificationRead } from '@/api';
import { notificationsT } from '@/types/app';
import { create } from 'zustand';

interface notificationsStore {
  notifications: notificationsT;
  expandedIds: number[];
  fetchNotifications: (token: string) => Promise<void>;
  setNotificationRead: (id: number) => void;
  toggleNotificationExpansion: (id: number) => void;
}

export const useNotificationsStore = create<notificationsStore>()((set) => ({
  notifications: {
    total: 0,
    notifications: [],
  },
  expandedIds: [],
  fetchNotifications: async (token) => {
    const res = await getNotifications(token);
    set({ notifications: res });
  },
  setNotificationRead(id) {
    let newTotal = this.notifications.total;
    const newNotificationsList = this.notifications.notifications.map((e) => {
      if (e.id === id && !e.read) {
        e.read = true;
        newTotal -= 1;
        const token = localStorage.getItem('token');
        if (token) {
          setNotificationRead(token, e.id);
        }
      }
      return e;
    });
    set({
      notifications: { total: newTotal, notifications: newNotificationsList },
    });
  },

  toggleNotificationExpansion: (id) => {
    if (isExpanded(id)) {
      set((state) => ({ expandedIds: state.expandedIds.filter((e) => e !== id) }));
    } else {
      set((state) => ({ expandedIds: [...state.expandedIds, id] }));
    }
  },
}));


const isExpanded = (id: number) => {
  return useNotificationsStore.getState().expandedIds.includes(id);
};