import { create } from 'zustand';

interface NotificationGroupDataChanged {
    hasNewNotificationGroupDataChanged: boolean;
    setHasNewNotificationGroupDataChanged: (value: boolean) => void;
}

const useNotificationGroupDataChanged = create<NotificationGroupDataChanged>((set) => ({
    hasNewNotificationGroupDataChanged: false,
    setHasNewNotificationGroupDataChanged: (value) => set({ hasNewNotificationGroupDataChanged: value }),
  }));

  export default useNotificationGroupDataChanged;