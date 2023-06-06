import {
  Chat,
  ChatOutlined,
  Group,
  GroupOutlined,
  MoreVert,
  Search,
  Sms,
  SmsOutlined,
} from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { PhotoViewerSmall } from "components/core";
import { ChatGroupCreate } from "components/drawer";
import { useChatData, useFetch, useSocket } from "hooks";
import moment from "moment";
import { MouseEvent, useEffect, useState } from "react";
import { IGroupChatData, User } from "types";

const ChatLeftbar = () => {
  const [currentMenu, setCurrentMenu] = useState("Chats");
  const ActiveSection = (currentMenu: string) => {
    switch (currentMenu) {
      case "Chats":
        return <Chats />;
      case "Groups":
        return <GroupChats />;
      case "New Chat":
        return <Contacts />;
      case "Other":
        return <Chats />;
    }
  };
  return (
    <div className="w-[32%] h-full border-r-2 px-4 rounded-md">
      <div className={`h-20 w-full flex justify-between items-center px-8`}>
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
      <div>{ActiveSection(currentMenu)}</div>
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

const Chats = () => {
  const [afterSearchable, setAfterSearchable] = useState<IGroupChatData[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const {
    allPrivateChat,
    setSelectedChatId,
    selectedChatId,
    revalidateChatProfileDetails,
    reValidatePrivateChat,
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
  }, [searchTitle, allPrivateChat?.length]);

  useEffect(() => {
    if (!socketRef) return;
    allPrivateChat?.map((item) => {
      return socketRef?.on(`MESSAGE_RECEIVED_${item?.id}`, async () => {
        await reValidatePrivateChat();
      });
    });
  }, [socketRef, allPrivateChat?.length]);

  return (
    <div className="h-[65vh] overflow-y-auto">
      <div className="border-2 flex gap-1 items-center px-2 rounded-md py-1">
        <Search fontSize="small" />
        <input
          className="w-[85%] bg-white px-2 py-1 rounded-md text-sm"
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
            revalidateChatProfileDetails={revalidateChatProfileDetails}
            selectedChatId={selectedChatId}
            setSelectedChatId={setSelectedChatId}
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
  setSelectedChatId,
}: {
  setSelectedChatId: (arg: any) => void;
  revalidateChatProfileDetails: (arg: any) => void;
  selectedChatId?: string;
  item: any;
}) => {
  const [isTyping, setIsTyping] = useState(false);

  const { socketRef } = useSocket();
  const { currentChatProfileDetails } = useChatData();

  useEffect(() => {
    (() => {
      if (!socketRef) return;

      socketRef.on(
        `USER_IS_TYPING_${currentChatProfileDetails?.id}`,
        (data) => {
          setIsTyping(true);
        }
      );
      socketRef.on(
        `USER_IS_TYPING_${currentChatProfileDetails?.id}`,
        (data) => {
          setIsTyping(false);
        }
      );
    })();
  }, [socketRef]);

  return (
    <div
      onClick={() => {
        setSelectedChatId(item?.id);
        revalidateChatProfileDetails(item?.id);
      }}
      className={`h-16 w-full px-2 flex gap-2 items-center hover:bg-blue-100 cursor-pointer rounded-md ${
        selectedChatId === item?.id ? `bg-blue-100` : ``
      }`}
    >
      <PhotoViewerSmall name={item?.title} photo={item?.photo} size="3rem" />
      <div className="w-[80%] flex justify-between ">
        <div>
          <h1 className="text-sm font-semibold">{item?.title}</h1>
          <span className="text-sm font-light">
            {isTyping
              ? "Typing..."
              : item?.lastMessage?.message?.length > 15
              ? item?.lastMessage?.message.slice(0, 15) + " ..."
              : item?.lastMessage?.message}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs">
            {moment(item?.lastMessage?.createdAt).format("ll")}
          </span>
        </div>
      </div>
    </div>
  );
};

const GroupChats = () => {
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
    revalidateChatProfileDetails,
    reValidateGroupChat,
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
  }, [searchTitle, allGroupChat?.length]);

  useEffect(() => {
    if (!socketRef) return;
    allGroupChat?.map((item) => {
      return socketRef?.on(`MESSAGE_RECEIVED_${item?.id}`, async () => {
        await reValidateGroupChat();
      });
    });
  }, [socketRef, allGroupChat?.length]);

  return (
    <div className="h-[65vh] overflow-y-auto">
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
        <div className="w-[10%]">
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
          <div
            onClick={() => {
              setSelectedChatId(item?.id);
              revalidateChatProfileDetails(item?.id);
            }}
            key={item?.id}
            className={`h-16 w-full transition-all ease-in-out duration-300 px-2 flex gap-2 items-center hover:bg-blue-100 cursor-pointer rounded-md ${
              selectedChatId === item?.id ? `bg-blue-100` : ``
            }`}
          >
            <PhotoViewerSmall
              name={item?.title}
              photo={item?.photo || ""}
              size="3rem"
            />
            <div className="w-[80%] flex justify-between ">
              <div>
                <h1 className="text-sm font-semibold">{item?.title}</h1>
                <span className="text-sm font-light">
                  {item?.lastMessage?.message?.length > 15
                    ? item?.lastMessage?.message.slice(0, 15) + " ..."
                    : item?.lastMessage?.message}
                </span>
              </div>

              <span className="text-xs">
                {moment(item?.lastMessage?.createdAt).format("ll")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

type FetchData = {
  users: User[];
};

const Contacts = () => {
  const [searchText, setSearchText] = useState("");
  const { data: employeesData } = useFetch<FetchData>(
    `chat/user/not-connected?limit=20&page=1` +
      (searchText ? `&searchTitle=${searchText}` : "")
  );

  const { selectedChatId, setSelectedChatProfileDetails } = useChatData();

  const handleClickNewUser = (user: User) => {
    try {
      setSelectedChatProfileDetails?.({
        chatMembers: [user],
        isPrivateGroup: true,
        photo: user?.photo,
        title: user?.name,
        totalMembers: 2,
        isNewChat: true,
        id: user?.id,
      });
    } catch (error) {}
  };

  return (
    <div className="h-[65vh] overflow-y-auto">
      <div className="border-2 flex gap-1 items-center px-2 rounded-md py-1">
        <Search fontSize="small" />
        <input
          className="w-[85%] bg-white px-2 py-1 rounded-md text-sm"
          type="text"
          placeholder="Search People"
          onChange={(e) => setSearchText(e?.target?.value)}
        />
      </div>
      <div className="mt-2 flex flex-col gap-1 overflow-y-auto h-[75%]">
        {employeesData?.users?.map((item) => (
          <div
            key={item?.id}
            className={` ${
              selectedChatId === item?.id ? "bg-slate-100" : ""
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
