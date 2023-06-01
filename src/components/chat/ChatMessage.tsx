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

interface textProps {
  data?: any;
  activeProfile?: any;
}
const ChatMessage = ({ data, activeProfile }: textProps) => {
  const [isReactions, setIsReactions] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [isSeen, setIsSeen] = useState(false);
  const [language, changeLanguage] = useState("jsx");
  const [languageDemo, changeDemo] = useState(sample["jsx"]);
  const [lineNumbers, toggleLineNumbers] = useState(true);
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
      <div className="w-[50%] flex gap-1">
        <div className="w-[10%] h-10 flex justify-center items-start">
          <div className="h-8 w-8 bg-slate-200 rounded-full overflow-hidden shadow-md">
            {data?.sendBy === "sender" ? (
              <PhotoViewerSmall
                size="2rem"
                photo={data?.author ? data?.author?.photo : data?.photo}
                name={
                  activeProfile?.type === "group"
                    ? data?.author?.name
                    : activeProfile?.name
                }
              />
            ) : (
              <PhotoViewerSmall
                size="2rem"
                photo={user?.photo}
                name={user?.name}
              />
            )}
          </div>
        </div>
        <div className="w-[85%] relative group">
          <div className="flex gap-1 items-center text-slate-600">
            <span className="text-xs">
              {data?.author ? data?.author?.name : "You"}
            </span>
            ,<span className="text-xs">{moment(new Date()).format("ll")}</span>
          </div>
          <div className="w-full bg-blue-100 py-2 px-4 tracking-wide rounded-md text-sm">
            {/* {item?.type === "text" ? (
                        <TextMessage
                          data={item}
                          activeProfile={activeProfile}
                        />
                      ) : item?.type === "image" ? (
                        <ImageMessage
                          data={item}
                          activeProfile={activeProfile}
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
            <div>
              {data?.type === "text" ? (
                <p className="tracking-wide">{data?.text}</p>
              ) : data?.type === "image" ? (
                <img
                  className="h-40 w-full rounded-md object-cover"
                  src={data?.link}
                  alt=""
                />
              ) : data?.type === "code" ? (
                <div>
                  <CopyBlock
                    language={language}
                    text={languageDemo}
                    showLineNumbers={lineNumbers}
                    theme={dracula}
                    wrapLines={true}
                    codeBlock
                  />
                </div>
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
                <div className=" bg-white border-[1px] absolute right-[-20%] rounded-md top-[30px] p-2">
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

const EventTemplate = ({ data }: any) => {
  return (
    <div className="flex justify-center items-center">
      <span className="text-xs tracking-wide px-4 py-1 bg-slate-200 rounded-full">
        {data?.text}
      </span>
    </div>
  );
};

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
