import {
  AttachFile,
  Code,
  ImageOutlined,
  InsertLink,
  Send,
} from "@mui/icons-material";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import {
  ChatSendCode,
  ChatSendFiles,
  ChatSendImage,
} from "components/dialogues";
import { useAuth, useChange, useChatData, useSocket } from "hooks";
import { useEffect, useRef, useState } from "react";
import ChatHead from "./ChatHead";

import DefaultChatView from "./DefaultChatView";
import ChatSendLink from "components/dialogues/ChatSendLink";
import MainChatViewContainer from "./MainChatViewContainer";

interface Props {
  id?: number;
  photo?: string;
  name?: string;
  message?: string;
}

const ChatRightSection = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setIsMessage] = useState<string | null>(null);
  const textRef = useRef<HTMLInputElement | null>(null);
  const { change } = useChange();
  const { socketRef } = useSocket();
  const { user } = useAuth();

  const {
    currentChatProfileDetails,
    handleSendNewMessage,
    revalidateCurrentChat,
    reValidateGroupChat,
    reValidatePrivateChat,
  } = useChatData();

  const handleSend = async () => {
    if (isMessage) {
      try {
        if (!isMessage?.trim()) return;
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
          //send message to other users
          socketRef?.emit("SENT_MESSAGE", {
            groupId: currentChatProfileDetails?.id,
            userId: user?.id,
          });
          revalidateCurrentChat(currentChatProfileDetails?.id);
          currentChatProfileDetails?.isPrivateGroup
            ? reValidatePrivateChat()
            : reValidateGroupChat();
          setIsLoading(false);
          setIsMessage(null);
          return;
        }
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      !isLoading && handleSend();
    }
  };

  const handleTyping = (e: any) => {
    setIsTyping(true);
    setIsMessage(e.target.value);
    socketRef?.emit("USER_TYPING", {
      groupId: currentChatProfileDetails?.id,
      userId: user?.id,
    });
  };

  const handleTypingEnd = () => {
    socketRef?.emit("USER_TYPING_STOP", {
      groupId: currentChatProfileDetails?.id,
      userId: user?.id,
    });
  };
  useEffect(() => {
    if (!isTyping) return;

    const typingTimeout = setTimeout(handleTypingEnd, 5000);
    return () => {
      clearTimeout(typingTimeout);
    };
  }, [isTyping]);

  const handleTypingBlur = () => {
    setIsTyping(false);
    handleTypingEnd();
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
      <div className="md:w-[68%] w-full h-full">
        {!currentChatProfileDetails?.id ? (
          <DefaultChatView />
        ) : (
          <div className="w-full h-full relative">
            <ChatHead key={currentChatProfileDetails?.id} />
            <div className="h-[calc(100%-153px)] overflow-y-auto">
              <MainChatViewContainer key={currentChatProfileDetails?.id} />
            </div>
            {currentChatProfileDetails?.isGroupBlocked ? (
              currentChatProfileDetails?.blockedBy?.includes(
                String(user?.id)
              ) ? (
                <div className="md:h-20 h-24 w-full border-2 md:flex items-center py-2 px-8 justify-center">
                  <h3 className="font-medium tracking text-center">
                    You have to unblock the user to be able to send message.
                  </h3>
                </div>
              ) : (
                <div className="md:h-20 h-24 w-full border-2 md:flex items-center py-2 px-8 justify-center">
                  <h3 className="font-medium tracking text-center">
                    You have been blocked by the user messaging unavailable.
                  </h3>
                </div>
              )
            ) : (
              <div className="md:h-20 h-24 w-full border-2 md:flex items-center py-2 px-8 justify-between">
                <div className="h-10 px-3 rounded-full md:w-[70%] w-full border-2 flex justify-between items-center">
                  <div className="flex gap-2 items-center w-full">
                    {/* <SentimentSatisfiedAlt className="!cursor-pointer" /> */}
                    <input
                      onKeyDown={handleKeyDown}
                      onChange={handleTyping}
                      ref={textRef}
                      value={isMessage ? isMessage : ""}
                      className="bg-white text-sm w-4/5"
                      placeholder="Type a message"
                      type="text"
                      onBlur={handleTypingBlur}
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
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatRightSection;
