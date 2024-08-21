// store/notificationStore.ts
import { create } from 'zustand';

interface NotificationStore {
  hasNewEventNotification: boolean;
  setHasNewEventNotification: (value: boolean) => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
  hasNewEventNotification: false,
  setHasNewEventNotification: (value) => set({ hasNewEventNotification: value }),
}));

export default useNotificationStore;
