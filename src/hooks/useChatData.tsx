import { IChatGroup, IChatMessages, IGroupChatData, User } from "types";
import { create } from "zustand";
import { BASE_URL, getAccessToken } from "./useAPI";

type ChatState = {
  isChatLoading?: boolean;
  selectedChatId?: string;
  allPrivateChat: IGroupChatData[];
  allGroupChat: IGroupChatData[];
  currentChatMessage: IChatMessages[];
  setCurrentChatMessage: (data: IChatMessages) => void;
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
  chatPageNo: number;
  totalChatCount: number;
  setChatPageNo: (num: number) => void;
};
const useChatData = create<ChatState>((set, get) => ({
  allGroupChat: [],
  allPrivateChat: [],
  currentChatMessage: [],
  chatPageNo: 1,
  totalChatCount: 0,
  setChatPageNo: async (num: number) => {
    set({
      chatPageNo: num,
    });
    await get().handleNextChatPage(num);
  },
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
  setCurrentChatMessage: async (newChat) => {
    set({
      currentChatMessage: [...get().currentChatMessage, newChat],
    });
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
      set({
        isChatLoading: true,
      });
      const token = getAccessToken();
      const response = await fetch(
        BASE_URL + `/chat/message-group/${chatId}?page=1&limit=20`,
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
        isChatLoading: false,
        totalChatCount: data?.data?.pagination?.total,
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
      set({
        isChatLoading: true,
      });
      const token = getAccessToken();
      const response = await fetch(
        BASE_URL +
          `/chat/message-group/${get().selectedChatId}?limit=20&page=${pageNo}`,
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
        isChatLoading: false,
        totalChatCount: data?.data?.pagination?.total,
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
