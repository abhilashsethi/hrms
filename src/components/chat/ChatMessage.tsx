import {
  Delete,
  DoneAll,
  FileDownloadOutlined,
  MoreHoriz,
  Reply,
} from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { CHATDOC } from "assets/home";
import { PhotoViewerSmall } from "components/core";
import { ChatReply } from "components/dialogues";
import { ChatReactions, ChatSeen } from "components/drawer";
import { useAuth } from "hooks";
import moment from "moment";
import { useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import { sample } from "utils";
import ImageMessage from "./ImageMessage";
import { IChatMessages } from "types";

interface textProps {
  data?: any;
  activeProfile?: any;
}
const ChatMessage = ({ data, activeProfile }: textProps) => {
  const [isReactions, setIsReactions] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [isSeen, setIsSeen] = useState(false);
  const [isOptions, setIsOptions] = useState<boolean>(false);
  const { user } = useAuth();
  const buttons = [
    {
      id: 1,
      title: "Reply",
      icon: <Reply fontSize="small" />,
      onClick: () => setIsReply(true),
    },
    { id: 2, title: "Delete", icon: <Delete fontSize="small" /> },
  ];

  //   const MessageSender = (ActiveChat: any, individualMsg: any) => {
  //     switch (ActiveChat) {
  //       case ActiveChat?.type === "group" && individualMsg?.sendBy === "sender":
  //         return individualMsg?.author?.name;
  //       case ActiveChat?.type === "group" && individualMsg?.sendBy === "you":
  //         return user?.name;
  //       case ActiveChat?.type === "person" && individualMsg?.sendBy === "sender":
  //         return individualMsg?.name;
  //       case ActiveChat?.type === "person" && individualMsg?.sendBy === "you":
  //         return user?.name;
  //     }
  //   };

  return (
    <>
      <ChatReactions open={isReactions} onClose={() => setIsReactions(false)} />
      <ChatSeen open={isSeen} onClose={() => setIsSeen(false)} />
      <ChatReply open={isReply} handleClose={() => setIsReply(false)} />
      <div className="max-w-[70%] min-w-[30%] flex gap-1">
        <div className="w-[15%] h-10 flex justify-center items-start">
          <div className="h-8 w-8 rounded-full overflow-hidden">
            {data?.sender?.id === user?.id ? null : (
              <PhotoViewerSmall
                size="2rem"
                photo={data?.sender?.photo}
                name={data?.sender?.name}
              />
            )}
          </div>
        </div>
        <div className="w-[85%] relative group">
          <div
            className={`flex gap-1 items-center text-slate-600 ${
              data?.sender?.id === user?.id ? `justify-end` : ``
            }`}
          >
            <span className="text-xs">
              {data?.sender?.id === user?.id ? "" : data?.sender?.name + ","}
            </span>

            <span className="text-xs">
              {moment(data?.createdAt).format("MMM DD, hh : mm A")}
            </span>
          </div>
          <div className="w-full bg-blue-100 py-2 px-4 tracking-wide rounded-md text-sm">
            <div>
              {data?.category === "text" ? (
                <p className="tracking-wide">{data?.text}</p>
              ) : data?.category === "image" ? (
                <ImageMessage data={data} />
              ) : data?.category === "code" ? (
                <CodeFormat data={data} />
              ) : data?.type === "doc" ? (
                <DocFormat />
              ) : (
                ""
              )}
            </div>
            {data?.sendBy === "you" && (
              <div className="flex justify-end">
                <IconButton onClick={() => setIsSeen(true)} size="small">
                  <DoneAll className="text-emerald-600" fontSize="small" />
                </IconButton>
              </div>
            )}
          </div>
          <div className="rounded-md hidden shadow-md absolute top-[-8px] right-0 group-hover:flex border-[1px] bg-white">
            <div className="relative">
              <div className="flex gap-2 items-center py-1 px-2">
                <span className="cursor-pointer hover:scale-125 transition ease-in-out duration-200">
                  👍
                </span>
                <span className="cursor-pointer hover:scale-125 transition ease-in-out duration-200">
                  ❤️
                </span>
                <span className="cursor-pointer hover:scale-125 transition ease-in-out duration-200">
                  😂
                </span>
                <span className="cursor-pointer hover:scale-125 transition ease-in-out duration-200">
                  😮
                </span>
                <IconButton
                  onClick={() => setIsOptions((prev) => !prev)}
                  size="small"
                >
                  <MoreHoriz fontSize="small" />
                </IconButton>
              </div>
              {isOptions && (
                <div
                  className={`bg-white border-[1px] absolute rounded-md top-[30px] p-2 ${
                    data?.sendBy === "you" ? "right-0" : "right-[-20%]"
                  }`}
                >
                  {buttons?.map((item) => (
                    <div
                      onClick={item?.onClick}
                      key={item?.id}
                      className="flex gap-2 items-center hover:bg-slate-200 px-2 py-1 cursor-pointer text-sm tracking-wide"
                    >
                      {item?.icon} {item?.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {data?.reaction?.text && (
            <div
              onClick={() => setIsReactions(true)}
              className="absolute cursor-pointer bottom-[-22px] left-[5px] shadow-md bg-white border-[1px] rounded-full py-0.5 px-2"
            >
              👍❤️
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
const DocFormat = () => {
  return (
    <div className="flex gap-2 items-center">
      <img className="h-12 object-contain" src={CHATDOC.src} alt="" />
      <div className="flex w-4/5 justify-between items-center">
        <h1>AllData.csv</h1>
        <Tooltip title="Download">
          <IconButton size="small">
            <FileDownloadOutlined />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

interface CodeMsgProps {
  data?: IChatMessages;
}

const CodeFormat = ({ data }: CodeMsgProps) => {
  const [language, changeLanguage] = useState("jsx");
  const [languageDemo, changeDemo] = useState(sample["jsx"]);
  const [lineNumbers, toggleLineNumbers] = useState(true);
  return (
    <div>
      <CopyBlock
        language={language}
        text={data?.text}
        showLineNumbers={lineNumbers}
        theme={dracula}
        wrapLines={true}
        codeBlock
      />
    </div>
  );
};
