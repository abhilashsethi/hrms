import { ClientToServerEvents, ServerToClientEvents } from "types";
import { create } from "zustand";
import { BASE_URL, getAccessToken } from "./useAPI";

type ChatState = {
  isChatLoading?: boolean;
  allPrivateChat: any[];
  allGroupChat: any[];
  currentChatMessage: any[];
  reValidatePrivateChat: () => void;
  reValidateGroupChat: () => void;
  revalidateCurrentChat: (chatId: string) => void;
};
const useChatData = create<ChatState>((set, get) => ({
  allGroupChat: [],
  allPrivateChat: [],
  currentChatMessage: [],
  revalidateCurrentChat: async (chatId) => {
    try {
      const token = getAccessToken();
      const response = await fetch(BASE_URL + `/chat/message-group/${chatId}`, {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });
      const data = await response.json();
      console.log({ data });
    } catch (error) {
      set({
        currentChatMessage: [],
      });
    }
  },
  reValidateGroupChat: async () => {
    try {
      const token = getAccessToken();
      const response = await fetch(
        BASE_URL + `/chat/message-group?privateChat=false`,
        {
          method: "GET",
          headers: {
            "x-access-token": token,
          },
        }
      );
      const data = await response.json();
      set({
        isChatLoading: false,
        allPrivateChat: data?.group,
      });
    } catch (error) {
      set({
        allGroupChat: [],
      });
    }
  },
  reValidatePrivateChat: async () => {
    try {
      const token = getAccessToken();
      const response = await fetch(
        BASE_URL + `/chat/message-group?privateChat=true`,
        {
          method: "GET",
          headers: {
            "x-access-token": token,
          },
        }
      );
      const data = await response.json();
      set({
        isChatLoading: false,
        allPrivateChat: data?.group,
      });
    } catch (error) {
      set({
        allPrivateChat: [],
      });
    }
  },
}));

export default useChatData;
