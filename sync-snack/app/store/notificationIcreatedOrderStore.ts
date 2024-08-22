import { create } from 'zustand';

interface NotificationIcreatedOrderStore {
  hasNewNotificationIcreatedOrderStore: boolean;
  setHasNewNotificationIcreatedOrderStore: (value: boolean) => void;
}

const useNotificationIcreatedOrderStore = create<NotificationIcreatedOrderStore>((set) => ({
  hasNewNotificationIcreatedOrderStore: false,
  setHasNewNotificationIcreatedOrderStore: (value) => set({ hasNewNotificationIcreatedOrderStore: value }),
}));

export default useNotificationIcreatedOrderStore;