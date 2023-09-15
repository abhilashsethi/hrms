import { create } from "zustand";
import { BASE_URL, getAccessToken } from "./useAPI";

type ChatState = {
  getUnreadMailCount: number;
  revalidateMailCount: (userId?: string) => void;
};
const useMailData = create<ChatState>((set, get) => ({
  getUnreadMailCount: 0,
  revalidateMailCount: async (userId?: string) => {
    try {
      const token = getAccessToken();
      const response = await fetch(
        BASE_URL + `/emails/inbox?isRead=false&isReceiverDelete=false`,
        {
          method: "GET",
          headers: {
            "x-access-token": token,
          },
        }
      );
      const data = await response.json();
      set({
        getUnreadMailCount: data?.data?.inboxData?.length,
      });
    } catch (error) {
      set({
        getUnreadMailCount: 0,
      });
    }
  },
}));

export default useMailData;
