import {
  AttachFile,
  Code,
  ImageOutlined,
  InsertLink,
  Send,
  SentimentSatisfiedAlt,
} from "@mui/icons-material";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import {
  ChatSendCode,
  ChatSendFiles,
  ChatSendImage,
} from "components/dialogues";
import { useAuth, useChange, useChatData } from "hooks";
import { useRef, useState } from "react";
import ChatHead from "./ChatHead";
import ChatMessage from "./ChatMessage";
import DefaultChatView from "./DefaultChatView";
import { MessageCategory } from "types";
import ChatSendLink from "components/dialogues/ChatSendLink";

interface Props {
  id?: number;
  photo?: string;
  name?: string;
  message?: string;
}

const ChatRightSection = () => {
  const [isUpload, setIsUpload] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setIsMessage] = useState<string | null>(null);
  const textRef = useRef<HTMLInputElement | null>(null);
  const { change } = useChange();
  const handleClick = () => {
    if (textRef.current) {
      const inputValue = textRef.current.value;
      textRef.current.focus();
    }
  };
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    currentChatMessage,
    currentChatProfileDetails,
    handleSendNewMessage,
    revalidateCurrentChat,
  } = useChatData();

  const handleSend = async () => {
    if (isMessage) {
      try {
        setIsLoading(true);

        if (currentChatProfileDetails?.isNewChat) {
          handleSendNewMessage({
            messageTo: currentChatProfileDetails?.id,
            message: isMessage,
            category: "text",
          });
          setIsLoading(false);
          setIsMessage(null);
          return;
        } else {
          await change(`chat/message/${currentChatProfileDetails?.id}`, {
            body: {
              message: isMessage,
              category: "text",
            },
          });
          setIsLoading(false);
          setIsMessage(null);
          revalidateCurrentChat(currentChatProfileDetails?.id);
          return;
        }
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <ChatSendFiles
        open={isUpload}
        handleClose={() => setIsUpload(false)}
        sendId={currentChatProfileDetails?.id}
      />
      <ChatSendImage
        open={isImage}
        handleClose={() => setIsImage(false)}
        sendId={currentChatProfileDetails?.id}
      />
      <ChatSendCode
        open={isCode}
        handleClose={() => setIsCode(false)}
        sendId={currentChatProfileDetails?.id}
      />
      <ChatSendLink
        open={isLink}
        handleClose={() => setIsLink(false)}
        sendId={currentChatProfileDetails?.id}
      />
      <div className="w-[68%] h-full">
        {!currentChatProfileDetails?.id ? (
          <DefaultChatView />
        ) : (
          <div className="w-full h-full">
            <ChatHead />
            <div className="h-[72%] overflow-y-auto">
              <div className="px-4 pb-4">
                {currentChatMessage?.map((item) => (
                  <div
                    key={item?.id}
                    className={`mt-4 flex w-full ${
                      item?.category === "event"
                        ? `justify-center`
                        : item?.sender?.id === user?.id
                        ? `justify-end`
                        : "justify-start"
                    }`}
                  >
                    <>
                      {item?.category === "event" ? (
                        <EventTemplate data={item} />
                      ) : (
                        <ChatMessage
                          data={item}
                          activeProfile={currentChatProfileDetails}
                        />
                      )}

                      {/* {item?.type === "text" ? (
                        <TextMessage
                          data={item}
                          activeProfile={currentChatProfileDetails}
                        />
                      ) : item?.type === "image" ? (
                        <ImageMessage
                          data={item}
                          activeProfile={currentChatProfileDetails}
                        />
                      ) : item?.type === "event" ? (
                        <EventTemplate data={item} />
                      ) : item?.type === "code" ? (
                        <CodeMessage data={item} />
                      ) : item?.type === "code" ? (
                        <DocMessage data={item} />
                      ) : (
                        "No format specified"
                      )} */}
                    </>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-20 w-full border-2 flex items-center px-8 justify-between">
              <div className="h-10 px-3 rounded-full w-[70%] border-2 flex justify-between items-center">
                <div className="flex gap-2 items-center w-full">
                  {/* <SentimentSatisfiedAlt className="!cursor-pointer" /> */}
                  <input
                    onChange={(e) => setIsMessage(e.target.value)}
                    ref={textRef}
                    value={isMessage ? isMessage : ""}
                    className="bg-white text-sm w-4/5"
                    placeholder="Type a message"
                    type="text"
                  />
                </div>
                <Tooltip title="Send">
                  <IconButton
                    onClick={() => handleSend()}
                    disabled={isLoading}
                    size="small"
                  >
                    {isLoading ? <CircularProgress size={20} /> : <Send />}
                  </IconButton>
                </Tooltip>
              </div>
              <Tooltip title="Image">
                <IconButton onClick={() => setIsImage(true)} size="small">
                  <ImageOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip title="Attach">
                <IconButton onClick={() => setIsUpload(true)} size="small">
                  <AttachFile className="!rotate-45" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Code">
                <IconButton onClick={() => setIsCode(true)} size="small">
                  <Code />
                </IconButton>
              </Tooltip>
              <Tooltip title="Insert link">
                <IconButton onClick={() => setIsLink(true)} size="small">
                  <InsertLink />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatRightSection;

const chats = [
  {
    id: 1,
    text: "Hey when you woke up?",
    sendBy: "sender",
    type: "text",
    reaction: { text: "👍" },
    author: {
      id: 2,
      name: "Srinu Reddy",
      message: "Okay",
      type: "person",
      photo:
        "https://media.npr.org/assets/img/2022/11/08/ap22312071681283-0d9c328f69a7c7f15320e8750d6ea447532dff66-s1100-c50.jpg",
    },
  },
  { id: 2, text: "Yeah Early morning. 7:30 AM.", sendBy: "you", type: "text" },
  {
    id: 9,
    text: "Abhilash changed this group's icon",
    type: "event",
  },
  {
    id: 8,
    text: "If any case i will be available, i will let you know in the office only.",
    link: "https://w0.peakpx.com/wallpaper/1008/1001/HD-wallpaper-tiger-black-look-thumbnail.jpg",
    sendBy: "you",
    type: "image",
  },
  {
    id: 13,
    text: "By the way when we will meet for this discussion?",
    sendBy: "sender",
    type: "doc",
  },
  {
    id: 12,
    text: "By the way when we will meet for this discussion?",
    sendBy: "you",
    type: "code",
  },
  {
    id: 3,
    text: "Have you gone through this new document shared by our sales team?",
    sendBy: "you",
    type: "text",
  },
  {
    id: 4,
    text: "Yeah, i had. I found some points confusing. let's meet and discuss about those topics today.",
    sendBy: "sender",
    type: "text",
    author: {
      id: 2,
      name: "Srinu Reddy",
      message: "Okay",
      type: "person",
      photo:
        "https://media.npr.org/assets/img/2022/11/08/ap22312071681283-0d9c328f69a7c7f15320e8750d6ea447532dff66-s1100-c50.jpg",
    },
  },
  {
    id: 5,
    text: "By the way when we will meet for this discussion?",
    sendBy: "you",
    type: "text",
  },
  {
    id: 6,
    text: "I am not sure whether i can be available for today or not. Because today i have many works and a hectic busy schedules. So we may discuss later.",
    sendBy: "sender",
    type: "text",
    author: {
      id: 2,
      name: "Srinu Reddy",
      message: "Okay",
      type: "person",
      photo:
        "https://media.npr.org/assets/img/2022/11/08/ap22312071681283-0d9c328f69a7c7f15320e8750d6ea447532dff66-s1100-c50.jpg",
    },
  },
  {
    id: 7,
    text: "If any case i will be available, i will let you know in the office only.",
    sendBy: "sender",
    type: "text",
    author: {
      id: 2,
      name: "Srinu Reddy",
      message: "Okay",
      type: "person",
      photo:
        "https://media.npr.org/assets/img/2022/11/08/ap22312071681283-0d9c328f69a7c7f15320e8750d6ea447532dff66-s1100-c50.jpg",
    },
  },
];

const EventTemplate = ({ data }: any) => {
  return (
    <div className="flex justify-center items-center">
      <span className="text-xs tracking-wide px-4 py-1 bg-slate-200 rounded-full">
        {data?.text}
      </span>
    </div>
  );
};
