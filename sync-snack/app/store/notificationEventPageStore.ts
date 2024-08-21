import { create } from 'zustand';

interface NotificationEventPageStore {
    hasNewEventPageNotification: boolean;
    setHasNewEventPageNotification: (value: boolean) => void;
}

const useNotificationEventPageStore = create<NotificationEventPageStore>((set) => ({
    hasNewEventPageNotification: false,
    setHasNewEventPageNotification: (value) => set({ hasNewEventPageNotification: value }),
  }));

  export default useNotificationEventPageStore;