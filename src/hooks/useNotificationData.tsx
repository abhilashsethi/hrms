import { create } from "zustand";
import { BASE_URL, getAccessToken } from "./useAPI";

type ChatState = {
  getUnreadNotificationCount: number;
  revalidateNotificationCount: (userId?: string) => void;
};
const useNotificationData = create<ChatState>((set, get) => ({
  getUnreadNotificationCount: 0,
  revalidateNotificationCount: async (userId?: string) => {
    try {
      const token = getAccessToken();
      const response = await fetch(BASE_URL + `/notifications/count`, {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });
      const data = await response.json();
      set({
        getUnreadNotificationCount: data?.data,
      });
    } catch (error) {
      set({
        getUnreadNotificationCount: 0,
      });
    }
  },
}));

export default useNotificationData;
