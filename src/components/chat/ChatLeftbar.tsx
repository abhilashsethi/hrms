import {
  Chat,
  ChatOutlined,
  Group,
  GroupOutlined,
  KeyboardArrowDown,
  Notifications,
  NotificationsOutlined,
  Search,
  Videocam,
  VideocamOutlined,
} from "@mui/icons-material";
import { PhotoViewerSmall } from "components/core";
import moment from "moment";

const ChatLeftbar = () => {
  return (
    <div className="w-[30%] h-full border-r-2 px-4 rounded-md">
      <div className={`h-20 w-full flex justify-between items-center `}>
        {quickLinks?.map((item) => (
          <div
            key={item?.id}
            className={`flex group flex-col items-center gap-2 cursor-pointer`}
          >
            <span
              className={`${
                item?.active ? `flex` : `hidden`
              } group-hover:!flex`}
            >
              {item?.icon}
            </span>
            <span
              className={`${
                item?.active ? `hidden` : `flex`
              } group-hover:!hidden`}
            >
              {item?.optional}
            </span>
            <span
              className={`text-xs ${
                item?.active ? `text-theme font-semibold` : ``
              } group-hover:!text-theme`}
            >
              {item?.title}
            </span>
          </div>
        ))}
      </div>
      <div className="border-2 flex gap-1 items-center px-2 rounded-md py-1">
        <Search fontSize="small" />
        <input
          className="w-[85%] bg-white px-2 py-1 rounded-md text-sm"
          type="text"
          placeholder="Search chats"
        />
      </div>
      <div className="mt-2">
        <span className="text-sm">
          Recent Chats <KeyboardArrowDown fontSize="small" />
        </span>
      </div>
      <div className="mt-2 flex flex-col gap-1">
        {profiles?.map((item) => (
          <div
            key={item?.id}
            className={`h-16 w-full px-2 flex gap-2 items-center rounded-md ${
              item?.name === "Srinu Reddy" ? `bg-blue-100` : ``
            }`}
          >
            <PhotoViewerSmall
              name={item?.name}
              photo={item?.photo}
              size="3rem"
            />
            <div className="w-[80%] flex justify-between ">
              <div>
                <h1 className="text-sm font-semibold">{item?.name}</h1>
                <span className="text-sm font-light">{item?.message}</span>
              </div>
              <span className="text-xs">
                {moment(new Date().toISOString()).format("ll")}
              </span>
            </div>
          </div>
        ))}
      </div>
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
    id: 2,
    icon: <Videocam fontSize="small" className="!text-theme" />,
    optional: <VideocamOutlined fontSize="small" className="" />,
    title: "Video",
  },
  {
    id: 3,
    icon: <Notifications fontSize="small" className="!text-theme" />,
    optional: <NotificationsOutlined fontSize="small" className="" />,
    title: "Notifications",
  },
  {
    id: 4,
    icon: <Group fontSize="small" className="!text-theme" />,
    optional: <GroupOutlined fontSize="small" className="" />,
    title: "Groups",
  },
];

const profiles = [
  {
    id: 1,
    photo:
      "https://www.bollywoodhungama.com/wp-content/uploads/2023/01/Hrithik-Roshan-opens-up-about-620.jpg",
    name: "Hirthik Roshan",
    message: "Talk to you...",
  },
  {
    id: 2,
    name: "Srinu Reddy",
    message: "Okay",
  },
  {
    id: 3,
    photo:
      "https://media.npr.org/assets/img/2022/11/08/ap22312071681283-0d9c328f69a7c7f15320e8750d6ea447532dff66-s1100-c50.jpg",
    name: "Abhilash",
    message: "Done 👍",
  },
];
