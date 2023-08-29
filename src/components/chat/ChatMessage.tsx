import {
  Delete,
  DoneAll,
  FileDownloadOutlined,
  InsertLink,
  MoreHoriz,
  Reply,
} from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { CHATDOC } from "assets/home";
import { PhotoViewerSmall } from "components/core";
import { ChatReply } from "components/dialogues";
import { ChatReactions, ChatSeen } from "components/drawer";
import { useAuth, useChange, useChatData, useSocket } from "hooks";
import moment from "moment";
import { useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import { downloadFile, sample } from "utils";
import ImageMessage from "./ImageMessage";
import { IChatMessages } from "types";
import Swal from "sweetalert2";
import Link from "next/link";

interface textProps {
  data?: any;
  activeProfile?: any;
}
const ChatMessage = ({ data, activeProfile }: textProps) => {
  const [isReactions, setIsReactions] = useState(false);
  const [isSeen, setIsSeen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <ChatReactions
        open={isReactions}
        onClose={() => setIsReactions(false)}
        chatData={data}
      />
      <ChatSeen
        chatData={data}
        open={isSeen}
        onClose={() => setIsSeen(false)}
      />

      <div className=" max-w-[95%] md:max-w-[70%] min-w-[30%] flex gap-1">
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
          {data?.replyTo ? (
            <div className="w-full rounded-t-md bg-green-200">
              <h1 className="p-2 flex items-center gap-2 text-sm tracking-wide">
                <Reply /> Replied
              </h1>
              <div className="px-2 pb-2">
                {data?.replyTo?.category === "text" ? (
                  <p className="text-sm">
                    {data?.replyTo?.text
                      ? data?.replyTo?.text?.slice(0, 20)
                      : null}
                    {data?.replyTo?.text?.length > 20 ? "..." : ""}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
          <div className="w-full bg-blue-100 py-2 px-4 tracking-wide rounded-md text-sm">
            <div>
              {data?.category === "text" ? (
                <p className="tracking-wide whitespace-pre-line break-words ">
                  {data?.text}
                </p>
              ) : data?.category === "image" ? (
                <ImageMessage data={data} />
              ) : data?.category === "code" ? (
                <CodeFormat data={data} />
              ) : data?.category === "file" ? (
                <DocFormat data={data} />
              ) : data?.category === "link" ? (
                <LinkFormat data={data} />
              ) : (
                ""
              )}
            </div>
            {data?.sender?.id === user?.id && (
              <div className="flex justify-end">
                <IconButton onClick={() => setIsSeen(true)} size="small">
                  <DoneAll className="text-emerald-600" fontSize="small" />
                </IconButton>
              </div>
            )}
          </div>
          <ReactEmoji data={data} activeProfile={activeProfile} />
          {data?.reactedUsers?.length ? (
            <div
              onClick={() => setIsReactions(true)}
              className="absolute cursor-pointer bottom-[-22px] left-[5px] shadow-md bg-white border-[1px] rounded-full py-0.5 px-2"
            >
              {data?.reactedUsers?.map((curElm: any) => (
                <span key={curElm?.id}>{curElm?.reaction}</span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
const DocFormat = ({ data }: { data?: IChatMessages }) => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <img className="h-12 object-contain" src={CHATDOC.src} alt="" />
        <div className="flex w-4/5 justify-between items-center">
          <h1>{data?.link?.split("/")?.at(-1)}</h1>
          <Tooltip title="Download">
            <IconButton
              onClick={() =>
                downloadFile(
                  data?.link as any,
                  data?.link?.split("/")?.at(-1) as any
                )
              }
              size="small"
            >
              <FileDownloadOutlined />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <p className="tracking-wide whitespace-pre-line break-words ">
        {data?.text}
      </p>
    </>
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

interface EmojiProps {
  data?: any;
  activeProfile?: any;
}

const ReactEmoji = ({ data, activeProfile }: EmojiProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const { change } = useChange();
  const [isOptions, setIsOptions] = useState<boolean>(false);
  const { user } = useAuth();
  const emojis = [
    { id: 1, text: "👍" },
    { id: 2, text: "❤️" },
    { id: 3, text: "😂" },
    { id: 4, text: "😮" },
  ];

  const { socketRef } = useSocket();
  const {
    revalidateCurrentChat,
    currentChatProfileDetails,
    reValidateGroupChat,
    reValidatePrivateChat,
  } = useChatData();

  const handleReact = async (message: string | null) => {
    if (message) {
      try {
        setIsLoading(true);
        const res = await change(`chat/message-react/${data?.id}`, {
          body: {
            reaction: message,
          },
        });
        if (res?.status !== 200) {
          Swal.fire(`Error`, "Something went wrong!", "error");
          return;
        }

        setIsLoading(false);
        socketRef?.emit("REFETCH_DATA", {
          groupId: activeProfile?.id,
          userId: user?.id,
        });

        revalidateCurrentChat(activeProfile?.id);

        return;
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this member!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await change(`chat/message/${data?.id}`, {
            method: "PATCH",
            body: {
              isDeleted: true,
            },
          });
          if (res?.status !== 200) {
            Swal.fire(`Error`, "Something went wrong!", "error");
            return;
          }
          Swal.fire(`Success`, "Message deleted successfully!", "success");
          revalidateCurrentChat(activeProfile?.id);
          currentChatProfileDetails?.isPrivateGroup
            ? reValidatePrivateChat()
            : reValidateGroupChat();
          return;
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <>
      <ChatReply
        chatData={data}
        open={isReply}
        activeProfile={activeProfile}
        handleClose={() => setIsReply(false)}
      />
      <div className="rounded-md hidden shadow-md absolute top-[-8px] right-0 group-hover:flex border-[1px] bg-white">
        <div className="relative">
          <div className="flex gap-2 items-center py-1 px-2">
            {emojis?.map((item) => (
              <span
                onClick={() => {
                  handleReact(item?.text);
                }}
                className="cursor-pointer hover:scale-125 transition ease-in-out duration-200"
              >
                {item?.text}
              </span>
            ))}
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
                data?.sender?.id === user?.id ? "right-0" : "right-[-20%]"
              }`}
            >
              <div
                onClick={() => setIsReply(true)}
                className="flex gap-2 items-center hover:bg-slate-200 px-2 py-1 cursor-pointer text-sm tracking-wide"
              >
                <Reply fontSize="small" /> <span>Reply</span>
              </div>
              {data?.sender?.id === user?.id &&
                !moment(moment(data?.createdAt).add(1, "hour")).isBefore() && (
                  <div
                    onClick={() => handleDelete()}
                    className="flex gap-2 items-center hover:bg-slate-200 px-2 py-1 cursor-pointer text-sm tracking-wide"
                  >
                    <Delete fontSize="small" /> <span>Delete</span>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const LinkFormat = ({ data }: any) => {
  return (
    <div className="flex gap-2 items-start">
      <InsertLink />
      <Link target="_blank" href={data?.text}>
        <h1 className="cursor-pointer">{data?.text}</h1>
      </Link>
    </div>
  );
};
