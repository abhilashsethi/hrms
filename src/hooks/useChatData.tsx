import {
  ClientToServerEvents,
  IGroupChatData,
  ServerToClientEvents,
} from "types";
import { create } from "zustand";
import { BASE_URL, getAccessToken } from "./useAPI";

type ChatState = {
  isChatLoading?: boolean;
  selectedChatId?: string;
  allPrivateChat: IGroupChatData[];
  allGroupChat: IGroupChatData[];
  currentChatMessage: any[];
  setSelectedChatId: (chatId: string) => void;
  reValidatePrivateChat: () => Promise<void>;
  reValidateGroupChat: () => Promise<void>;
  revalidateCurrentChat: (chatId?: string) => Promise<void>;
};
const useChatData = create<ChatState>((set, get) => ({
  allGroupChat: [],
  allPrivateChat: [],
  currentChatMessage: [],
  setSelectedChatId: async (chatId?: string) => {
    if (chatId) {
      set({
        selectedChatId: chatId,
      });

      await get().revalidateCurrentChat(chatId);
      return;
    } else if (chatId === get().selectedChatId) {
      set({
        selectedChatId: "",
        currentChatMessage: [],
      });
    } else {
      set({
        selectedChatId: "",
        currentChatMessage: [],
      });
    }
  },
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
      set({
        currentChatMessage: data?.data?.message,
      });
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
        allGroupChat: data?.data?.group,
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
        allPrivateChat: data?.data?.group,
      });
    } catch (error) {
      set({
        allPrivateChat: [],
      });
    }
  },
}));

export default useChatData;
