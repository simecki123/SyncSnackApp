import { create } from 'zustand';

interface NotificationEventPageOrdersStore {
    hasNewOrderForYOurEventNotification: boolean;
    setNewOrderForYourEventNotification: (value: boolean) => void;
}

const useNotificationEventPageOrdersStore = create<NotificationEventPageOrdersStore>((set) => ({
    hasNewOrderForYOurEventNotification: false,
    setNewOrderForYourEventNotification: (value) => set({ hasNewOrderForYOurEventNotification: value }),
  }));

export default useNotificationEventPageOrdersStore