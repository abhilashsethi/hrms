import {
  Chat,
  ChatOutlined,
  Code,
  Description,
  Group,
  GroupOutlined,
  Image,
  Mic,
  MoreVert,
  Search,
  Sms,
  SmsOutlined,
} from "@mui/icons-material";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { PhotoViewerSmall } from "components/core";
import { ChatGroupCreate } from "components/drawer";
import { useAuth, useChatData, useFetch, useSocket } from "hooks";
import moment from "moment";
import { MouseEvent, useEffect, useState } from "react";
import { IGroupChatData, User } from "types";
interface Props {
  setChatLeftBar: (value: boolean) => void;
}
const ChatLeftbar = ({ setChatLeftBar }: Props) => {
  const [currentMenu, setCurrentMenu] = useState("Chats");
  const ActiveSection = (currentMenu: string) => {
    switch (currentMenu) {
      case "Chats":
        return <Chats setChatLeftBar={setChatLeftBar} />;
      case "Groups":
        return <GroupChats setChatLeftBar={setChatLeftBar} />;
      case "New Chat":
        return <Contacts setChatLeftBar={setChatLeftBar} />;
      case "Other":
        return <Chats setChatLeftBar={setChatLeftBar} />;
    }
  };
  return (
    <div className="lg:w-[32%] w-full h-full border-r-2 md:px-4 px-2 rounded-md">
      <div
        className={`h-20 w-full flex justify-between items-center md:px-8 px-2`}
      >
        {quickLinks?.map((item) => (
          <div
            onClick={() => setCurrentMenu(item?.title)}
            key={item?.id}
            className={`flex group flex-col items-center gap-2 cursor-pointer`}
          >
            <span
              className={`${
                item?.title === currentMenu ? `flex` : `hidden`
              } group-hover:!flex`}
            >
              {item?.icon}
            </span>
            <span
              className={`${
                item?.title === currentMenu ? `hidden` : `flex`
              } group-hover:!hidden`}
            >
              {item?.optional}
            </span>
            <span
              className={`text-xs transition-all ease-in-out duration-200 ${
                item?.title === currentMenu ? `text-theme ` : ``
              } group-hover:!text-theme`}
            >
              {item?.title}
            </span>
          </div>
        ))}
      </div>
      <div className="h-[calc(100%-80px)]  ">{ActiveSection(currentMenu)}</div>
    </div>
  );
};

export default ChatLeftbar;

const quickLinks = [
  {
    id: 1,
    icon: <Chat fontSize="small" className="!text-theme" />,
    optional: <ChatOutlined fontSize="small" />,
    title: "Chats",
    active: true,
  },
  {
    id: 4,
    icon: <Group fontSize="small" className="!text-theme" />,
    optional: <GroupOutlined fontSize="small" className="" />,
    title: "Groups",
  },
  {
    id: 2,
    icon: <Sms fontSize="small" className="!text-theme" />,
    optional: <SmsOutlined fontSize="small" className="" />,
    title: "New Chat",
  },
  // {
  //   id: 3,
  //   icon: <PermContactCalendar fontSize="small" className="!text-theme" />,
  //   optional: <PermContactCalendarOutlined fontSize="small" className="" />,
  //   title: "Contacts",
  // },
];

const Chats = ({ setChatLeftBar }: Props) => {
  const [afterSearchable, setAfterSearchable] = useState<IGroupChatData[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const {
    allPrivateChat,
    setSelectedChatId,
    selectedChatId,
    handleReadMessage,
    revalidateChatCount,
    reValidateGroupChat,
    reValidatePrivateChat,
    revalidateChatProfileDetails,
  } = useChatData();

  const { socketRef } = useSocket();

  //searching and filtering done locally
  useEffect(() => {
    (() => {
      if (!allPrivateChat?.length) return;

      let searchData = allPrivateChat?.filter((item) =>
        searchTitle?.length
          ? item?.title?.toLowerCase()?.includes(searchTitle?.toLowerCase())
          : true
      );

      setAfterSearchable(searchData);
    })();
  }, [searchTitle, allPrivateChat]);

  useEffect(() => {
    if (!socketRef) return;
    allPrivateChat?.map((item) => {
      return socketRef?.on(`MESSAGE_RECEIVED_${item?.id}`, async () => {
        await reValidatePrivateChat();
      });
    });
  }, [socketRef, allPrivateChat?.length]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="border-2 flex gap-1 items-center px-2 rounded-md py-1">
        <Search fontSize="small" />
        <input
          className="md:w-[85%] w-full bg-white px-2 py-1 rounded-md text-sm"
          type="text"
          placeholder="Search chats"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e?.target?.value)}
        />
      </div>
      <div className="mt-2 flex flex-col gap-1">
        {afterSearchable?.map((item) => (
          <PrivateChatCard
            item={item}
            key={item?.id}
            revalidateChatCount={revalidateChatCount}
            handleReadMessage={handleReadMessage}
            reValidatePrivateChat={reValidatePrivateChat}
            revalidateChatProfileDetails={revalidateChatProfileDetails}
            selectedChatId={selectedChatId}
            setSelectedChatId={setSelectedChatId}
            setChatLeftBar={setChatLeftBar}
          />
        ))}
      </div>
    </div>
  );
};

const PrivateChatCard = ({
  item,
  revalidateChatProfileDetails,
  selectedChatId,
  handleReadMessage,
  setSelectedChatId,
  reValidatePrivateChat,
  revalidateChatCount,
  setChatLeftBar,
}: {
  setSelectedChatId: (arg: any) => void;
  revalidateChatProfileDetails: (arg: any) => void;
  selectedChatId?: string;
  handleReadMessage?: (arg: any) => Promise<void>;
  revalidateChatCount: () => void;
  reValidatePrivateChat: () => void;
  item: IGroupChatData;
  setChatLeftBar: (arg: boolean) => void;
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const { socketRef } = useSocket();

  const { user } = useAuth();

  useEffect(() => {
    (() => {
      if (!socketRef || !item?.id) return;

      socketRef.on(`USER_IS_TYPING_${item?.id}`, (data) => {
        data?.userId !== user?.id && setIsTyping(true);
      });
      socketRef.on(`USER_STOP_TYPING_${item?.id}`, (data) => {
        data?.userId !== user?.id && setIsTyping(false);
      });
    })();
  }, [socketRef, item?.id]);

  return (
    <div
      onClick={() => {
        setSelectedChatId(item?.id);
        revalidateChatProfileDetails(item?.id);
        setChatLeftBar(true);
        handleReadMessage?.(item?.id).then(() => {
          revalidateChatCount();
          reValidatePrivateChat();
        });
      }}
      className={`h-16 w-full px-2 flex gap-2 items-center hover:bg-blue-100 cursor-pointer rounded-md ${
        selectedChatId === item?.id ? `bg-blue-100` : ``
      }`}
    >
      <span className="md:block hidden">
        <Badge
          color="secondary"
          overlap="circular"
          badgeContent={item?.lastMessage?.totalUnreadMessageCount || undefined}
        >
          <PhotoViewerSmall
            name={item?.title}
            photo={item?.photo}
            size="3rem"
          />
        </Badge>
      </span>
      {/* Mobile View start */}
      <span className="md:hidden block">
        <Badge
          color="secondary"
          overlap="circular"
          badgeContent={item?.lastMessage?.totalUnreadMessageCount || undefined}
        >
          <PhotoViewerSmall
            name={item?.title}
            photo={item?.photo}
            size="2.2rem"
          />
        </Badge>
      </span>
      {/* Mobile View end */}
      <div className="md:w-[80%] w-full sm:flex justify-between ">
        <div>
          <h1 className="text-sm font-semibold">{item?.title}</h1>

          <span
            className={`text-sm font-light ${
              item?.lastMessage?.isRead ? "font-light" : "font-bold"
            } `}
          >
            {isTyping ? (
              "Typing..."
            ) : item?.lastMessage?.message?.length > 15 ? (
              item?.lastMessage?.message.slice(0, 15) + " ..."
            ) : item?.lastMessage?.category === "file" ? (
              <>
                <span className="text-sm hidden md:block">
                  {item?.lastMessage?.link?.split("/").at(-1)}
                </span>
                <span className="text-sm md:hidden block">
                  {item?.lastMessage?.link?.split("/").at(-1)?.slice(0, 10) +
                    " ..."}
                </span>
              </>
            ) : item?.lastMessage?.category === "link" ? (
              "Link"
            ) : item?.lastMessage?.category === "text" ? (
              item?.lastMessage?.message
            ) : item?.lastMessage?.category === "audio" ? (
              <>
                <span className="text-sm ">
                  <Mic className="h-4 w-4" /> {item?.lastMessage?.category}
                </span>
              </>
            ) : item?.lastMessage?.category === "image" ? (
              <>
                <span className="text-sm ">
                  <Image className="h-4 w-4" /> {item?.lastMessage?.category}
                </span>
              </>
            ) : item?.lastMessage?.category === "code" ? (
              <>
                <span className="text-sm ">
                  <Code className="h-4 w-4" /> {item?.lastMessage?.category}
                </span>
              </>
            ) : (
              `${item?.lastMessage?.sender} sent a/an ${item?.lastMessage?.category}`
            )}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs hidden md:block">
            {moment(item?.lastMessage?.createdAt).format("ll")}
          </span>
          {/* Mobile View Start */}
          <span className="text-xs md:hidden block">
            {moment(item?.lastMessage?.createdAt).format("l")}
          </span>
          {/* Mobile View End */}
        </div>
      </div>
    </div>
  );
};

const GroupChats = ({ setChatLeftBar }: any) => {
  const [isCreate, setIsCreate] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [afterSearchable, setAfterSearchable] = useState<IGroupChatData[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const {
    allGroupChat,
    setSelectedChatId,
    selectedChatId,
    handleReadMessage,
    revalidateChatProfileDetails,
    reValidateGroupChat,
    revalidateChatCount,
  } = useChatData();

  const { socketRef } = useSocket();

  //searching and filtering done locally
  useEffect(() => {
    (() => {
      if (!allGroupChat?.length) return;

      let searchData = allGroupChat?.filter((item) =>
        searchTitle?.length
          ? item?.title?.toLowerCase()?.includes(searchTitle?.toLowerCase())
          : true
      );

      setAfterSearchable(searchData);
    })();
  }, [searchTitle, allGroupChat]);

  useEffect(() => {
    if (!socketRef) return;
    allGroupChat?.map((item) => {
      return socketRef?.on(`MESSAGE_RECEIVED_${item?.id}`, async () => {
        await reValidateGroupChat();
      });
    });
  }, [socketRef, allGroupChat?.length]);

  return (
    <div className="h-[calc(100%)] overflow-y-auto">
      <ChatGroupCreate open={isCreate} onClose={() => setIsCreate(false)} />
      <div className="flex justify-between items-center">
        <div className="border-2 w-[87%] flex gap-1 items-center px-2 rounded-md py-1">
          <Search fontSize="small" />
          <input
            className="w-[85%] bg-white px-2 py-1 rounded-md text-sm"
            type="text"
            placeholder="Search chats"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e?.target?.value)}
          />
        </div>
        <div className="lg:w-[10%]">
          <IconButton onClick={handleClick} size="small">
            <MoreVert />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                setIsCreate(true);
                handleClose();
              }}
            >
              Create Group
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>Settings</MenuItem> */}
          </Menu>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-1">
        {afterSearchable?.map((item) => (
          <GroupChatCard
            item={item}
            revalidateChatProfileDetails={revalidateChatProfileDetails}
            selectedChatId={selectedChatId}
            handleReadMessage={handleReadMessage}
            reValidateGroupChat={reValidateGroupChat}
            setSelectedChatId={setSelectedChatId}
            revalidateChatCount={revalidateChatCount}
            setChatLeftBar={setChatLeftBar}
          />
        ))}
      </div>
    </div>
  );
};

const GroupChatCard = ({
  item,
  revalidateChatProfileDetails,
  selectedChatId,
  setSelectedChatId,
  handleReadMessage,
  revalidateChatCount,
  reValidateGroupChat,
  setChatLeftBar,
}: {
  setSelectedChatId: (arg: any) => void;
  revalidateChatProfileDetails: (arg: any) => void;
  selectedChatId?: string;
  reValidateGroupChat: () => void;
  handleReadMessage?: (arg: any) => Promise<void>;
  revalidateChatCount: () => void;
  item: IGroupChatData;
  setChatLeftBar: (arg: boolean) => void;
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const { socketRef } = useSocket();

  useEffect(() => {
    (() => {
      if (!socketRef || !item?.id) return;

      socketRef.on(`USER_IS_TYPING_${item?.id}`, (data) => {
        setIsTyping(true);
      });
      socketRef.on(`USER_STOP_TYPING_${item?.id}`, (data) => {
        setIsTyping(false);
      });
      socketRef?.on(`MESSAGE_RECEIVED_${item?.id}`, async () => {
        await reValidateGroupChat();
      });
    })();
  }, [socketRef, item?.id]);

  return (
    <div
      onClick={() => {
        setSelectedChatId(item?.id);
        setChatLeftBar(true);
        revalidateChatProfileDetails(item?.id);
        handleReadMessage?.(item?.id).then(() => {
          revalidateChatCount();
          reValidateGroupChat();
        });
      }}
      key={item?.id}
      className={`h-16 w-full transition-all ease-in-out duration-300 px-2 flex gap-2 items-center hover:bg-blue-100 cursor-pointer rounded-md ${
        selectedChatId === item?.id ? `bg-blue-100` : ``
      }`}
    >
      <span className="md:block hidden">
        <Badge
          color="secondary"
          overlap="circular"
          badgeContent={item?.lastMessage?.totalUnreadMessageCount || undefined}
        >
          <PhotoViewerSmall
            name={item?.title}
            photo={item?.photo}
            size="3rem"
          />
        </Badge>
      </span>
      {/* Mobile View start */}
      <span className="md:hidden block">
        <Badge
          color="secondary"
          overlap="circular"
          badgeContent={item?.lastMessage?.totalUnreadMessageCount || undefined}
        >
          <PhotoViewerSmall
            name={item?.title}
            photo={item?.photo}
            size="2.3rem"
          />
        </Badge>
      </span>
      {/* Mobile View end */}

      <div className="md:w-[80%] w-full flex justify-between ">
        <div>
          <h3 className="text-sm font-semibold  hidden md:block break-all pl-2">
            {item?.title}
          </h3>
          <h1 className="text-sm font-semibold block md:hidden break-all pl-2">
            {item?.title.length > 10
              ? `${item?.title.slice(0, 10)} ...`
              : item?.title}
          </h1>
          <span
            className={`text-sm font-light ${
              item?.lastMessage?.isRead ? "font-light" : "font-bold"
            } `}
          >
            {isTyping ? (
              "Typing..."
            ) : item?.lastMessage?.message?.length > 15 ? (
              <span>{item?.lastMessage?.message.slice(0, 15) + " ..."}</span>
            ) : item?.lastMessage?.category === "file" ? (
              <>
                <span className="text-sm hidden md:block">
                  {item?.lastMessage?.sender} sent a{" "}
                  <Description className="h-4 w-4" />{" "}
                  {item?.lastMessage?.category}
                </span>
                <span className="text-xs md:hidden block">
                  {item?.lastMessage?.sender?.length > 8
                    ? item?.lastMessage?.sender?.slice(0, 8) + " ..."
                    : item?.lastMessage?.sender}{" "}
                  : <Description className="h-4 w-4" />{" "}
                  {item?.lastMessage?.category}
                </span>
              </>
            ) : item?.lastMessage?.category === "link" ? (
              "Link"
            ) : item?.lastMessage?.category === "text" ? (
              item?.lastMessage?.message
            ) : item?.lastMessage?.category === "audio" ? (
              <>
                <span className="text-sm ">
                  <Mic className="h-4 w-4" /> {item?.lastMessage?.category}
                </span>
              </>
            ) : item?.lastMessage?.category === "image" ? (
              <>
                <span className="text-sm">
                  <Image className="h-4 w-4" /> {item?.lastMessage?.category}
                </span>
              </>
            ) : item?.lastMessage?.category === "code" ? (
              <>
                <Code className="h-4 w-4" />{" "}
                {item?.lastMessage?.category.toLowerCase()}
              </>
            ) : (
              ""
            )}
          </span>
        </div>

        <span className="text-xs">
          {moment(item?.lastMessage?.createdAt).format("ll")}
        </span>
      </div>
    </div>
  );
};

type FetchData = {
  users: User[];
};

const Contacts = ({ setChatLeftBar }: any) => {
  const [searchText, setSearchText] = useState("");
  const { data: employeesData } = useFetch<FetchData>(
    `chat/user/not-connected?limit=20&page=1` +
      (searchText ? `&searchTitle=${searchText}` : "")
  );

  const {
    selectedChatId,
    setSelectedChatProfileDetails,
    revalidateChatProfileDetails,
    setSelectedChatId,
    revalidateCurrentChat,
  } = useChatData();

  const handleClickNewUser = (user: User) => {
    setChatLeftBar(true);
    try {
      setSelectedChatProfileDetails?.({
        chatMembers: [user],
        isPrivateGroup: true,
        photo: user?.photo,
        title: user?.name,
        totalMembers: 2,
        isNewChat: user?.alreadyConnected?.groupId ? false : true,
        id: user?.alreadyConnected?.groupId || user?.id,
        role: user?.role?.name,
        alreadyConnected: user?.alreadyConnected,
        blockedBy: user?.alreadyConnected?.blockedBy || [],
      });

      user?.alreadyConnected?.groupId &&
        setSelectedChatId(user?.alreadyConnected?.groupId);
      user?.alreadyConnected?.groupId &&
        revalidateChatProfileDetails(user?.alreadyConnected?.groupId);
      user?.alreadyConnected?.groupId &&
        revalidateCurrentChat(user?.alreadyConnected?.groupId);
    } catch (error) {}
  };

  return (
    <div className="h-[calc(100%)] overflow-y-auto">
      <div className="border-2 flex gap-1 items-center px-2 rounded-md py-1">
        <Search fontSize="small" />
        <input
          className="w-[85%] bg-white px-2 py-1 rounded-md text-sm"
          type="text"
          placeholder="Search People"
          onChange={(e) => setSearchText(e?.target?.value)}
        />
      </div>
      <div className="mt-2 flex flex-col gap-1 ">
        {employeesData?.users?.map((item) => (
          <div
            key={item?.id}
            className={` ${
              selectedChatId === (item?.id || item?.alreadyConnected?.groupId)
                ? "bg-slate-100"
                : ""
            } h-16 w-full hover:bg-slate-100 transition-all ease-in-out duration-200 cursor-pointer flex gap-2 items-center px-2 py-2`}
            onClick={() => handleClickNewUser(item)}
          >
            <PhotoViewerSmall
              name={item?.name}
              photo={item?.photo}
              size="2.9rem"
            />
            <div>
              <h1 className="text-sm font-semibold">{item?.name}</h1>
              <h1 className="text-sm text-gray-600">{item?.role?.name}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
