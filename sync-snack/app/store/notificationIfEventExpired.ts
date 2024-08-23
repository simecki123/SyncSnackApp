import { create } from 'zustand';

interface NotificationIfEventExpiredStore {
  hasNewNotificationIfEventExpiredStore: string;
  setHasNewNotificationIfEventExpiredStore: (value: string) => void;
}

const useNotificationIfEventExpiredStore = create<NotificationIfEventExpiredStore>((set) => ({
  hasNewNotificationIfEventExpiredStore: '',
  setHasNewNotificationIfEventExpiredStore: (value) => set({ hasNewNotificationIfEventExpiredStore: value }),
}));

export default useNotificationIfEventExpiredStore;