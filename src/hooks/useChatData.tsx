import { IChatGroup, IChatMessages, IGroupChatData, User } from "types";
import { create } from "zustand";
import { BASE_URL, getAccessToken } from "./useAPI";

type ChatState = {
  isChatLoading?: boolean;
  selectedChatId?: string;
  allPrivateChat: IGroupChatData[];
  allGroupChat: IGroupChatData[];
  currentChatMessage: IChatMessages[];
  currentChatProfileDetails?: Partial<IChatGroup>;
  setSelectedChatProfileDetails?: (arg: any) => void;
  revalidateChatProfileDetails: (chatId: string) => Promise<void>;
  setSelectedChatId: (chatId: string) => void;
  reValidatePrivateChat: () => Promise<void>;
  reValidateGroupChat: () => Promise<void>;
  revalidateCurrentChat: (chatId?: string) => Promise<void>;
  handleSendNewMessage: (body: object) => Promise<void>;
  handleNextChatPage: (page: number) => Promise<void>;
  handleReadMessage: (chatId: string) => Promise<void>;
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
      await get().handleReadMessage(chatId);
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
  setSelectedChatProfileDetails: async (arg: any) => {
    set({
      currentChatProfileDetails: arg,
      selectedChatId: arg?.id,
      currentChatMessage: [],
    });
  },
  revalidateChatProfileDetails: async (chatId) => {
    try {
      const token = getAccessToken();
      const response = await fetch(BASE_URL + `/chat/${chatId}`, {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });
      const data = await response.json();

      set({
        currentChatProfileDetails: data?.data,
      });
    } catch (error) {
      set({
        currentChatProfileDetails: {},
      });
    }
  },
  revalidateCurrentChat: async (chatId) => {
    try {
      const token = getAccessToken();
      const response = await fetch(
        BASE_URL + `/chat/message-group/${chatId}?page=1&limit=5`,
        {
          method: "GET",
          headers: {
            "x-access-token": token,
          },
        }
      );
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
  handleSendNewMessage: async (body: object) => {
    try {
      const token = getAccessToken();
      const response = await fetch(BASE_URL + `/chat/message/new`, {
        method: "POST",
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (response.status === 200) {
        set({
          currentChatProfileDetails: {
            ...get().currentChatProfileDetails,
            id: data?.data?.id,
            isNewChat: false,
          },
          selectedChatId: data?.data?.id,
        });
        await get().reValidatePrivateChat();
        await get().revalidateCurrentChat(data?.data?.id);
        await get().revalidateChatProfileDetails(data?.data?.id);
      }
    } catch (error) {}
  },
  handleNextChatPage: async (pageNo: number) => {
    try {
      const token = getAccessToken();
      const response = await fetch(
        BASE_URL +
          `/chat/message-group/${get().selectedChatId}?limit=5&page=${pageNo}`,
        {
          method: "GET",
          headers: {
            "x-access-token": token,
          },
        }
      );
      const data = await response.json();

      set({
        currentChatMessage: [
          ...get().currentChatMessage,
          ...data?.data?.message,
        ],
      });
    } catch (error) {}
  },
  handleReadMessage: async (chatId) => {
    try {
      const token = getAccessToken();
      await fetch(BASE_URL + `/chat/message-ack`, {
        method: "POST",
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isRead: true,
          chatId: chatId,
        }),
      });
    } catch (error) {}
  },
}));

export default useChatData;
