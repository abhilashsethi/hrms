import {
  Chat,
  ChatOutlined,
  DriveFileRenameOutline,
  Group,
  GroupOutlined,
  KeyboardArrowDown,
  Notifications,
  NotificationsOutlined,
  Search,
  SentimentSatisfiedAlt,
  Videocam,
  VideocamOutlined,
} from "@mui/icons-material";
import { PhotoViewerSmall } from "components/core";
import moment from "moment";

const ChatSection = () => {
  return (
    <section>
      <div className="h-[35rem] w-full rounded-md bg-white mt-4 shadow-md flex">
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
        <div className="w-[70%] h-full">
          <div className="py-2 px-4 w-full border-b-2">
            <div className="flex gap-3 items-center">
              <PhotoViewerSmall name="Srinu Reddy" size="3.5rem" />
              <div>
                <h1 className="font-semibold">Srinu Reddy</h1>
                <h1 className="text-sm font-light">
                  <span className=""></span> Active Now
                </h1>
              </div>
            </div>
          </div>
          <div className="h-[25.5rem] overflow-y-auto">
            <div className="px-4">
              {chats?.map((item) => (
                <div
                  className={`mt-4 flex ${
                    item?.sendBy === "sender" ? `justify-start` : `justify-end`
                  }`}
                >
                  <div className="max-w-[50%] bg-blue-100 py-2 px-4 tracking-wide rounded-md text-sm">
                    <div className="flex justify-end">
                      <span className="text-xs">
                        {moment(new Date()).format("ll")}
                      </span>
                    </div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Asperiores animi ratione omnis aliquid magnam ipsa dolore,
                    laborum illo nostrum! Veniam incidunt animi amet nostrum
                    dignissimos.
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-20 w-full border-2 flex items-center px-8">
            <div className="h-10 px-3 rounded-full w-3/5 border-2 flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <SentimentSatisfiedAlt className="!cursor-pointer" />
                <input
                  className="bg-white text-sm"
                  placeholder="Type a message"
                  type="text"
                />
              </div>
              <DriveFileRenameOutline className="!cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;

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

const chats = [
  { id: 1, text: "Hey! Where are you ri8 now?", sendBy: "sender" },
  { id: 2, text: "Hey! Where are you ri8 now?", sendBy: "sender" },
  { id: 3, text: "Hey! Where are you ri8 now?", sendBy: "you" },
  { id: 4, text: "Hey! Where are you ri8 now?", sendBy: "you" },
  { id: 5, text: "Hey! Where are you ri8 now?", sendBy: "you" },
  { id: 6, text: "Hey! Where are you ri8 now?", sendBy: "sender" },
  { id: 7, text: "Hey! Where are you ri8 now?", sendBy: "sender" },
];
