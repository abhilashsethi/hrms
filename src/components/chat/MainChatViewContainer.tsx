import { useAuth, useChatData, useIsVisible, useSocket } from "hooks";
import ChatMessage from "./ChatMessage";
import { useEffect, useRef, useState } from "react";

const MainChatViewContainer = () => {
  const [isChanging, setIsChanging] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const {
    currentChatMessage,
    currentChatProfileDetails,
    handleNextChatPage,
    revalidateCurrentChat,
  } = useChatData();

  const { user } = useAuth();

  const mainElem = useRef<HTMLDivElement>(null);

  const [isVisible, lastMessageRef] = useIsVisible();
  const { socketRef } = useSocket();

  useEffect(() => {
    if (!isVisible) return;
    setPageNo((prev) => prev + 1);
    handleNextChatPage(pageNo + 1);
  }, [isVisible]);

  useEffect(() => {
    if (!socketRef || !currentChatProfileDetails?.id) return;
    socketRef.on(`MESSAGE_RECEIVED_${currentChatProfileDetails?.id}`, () => {
      setIsChanging((prev) => !prev);
      revalidateCurrentChat(currentChatProfileDetails?.id);
    });
  }, [socketRef, currentChatProfileDetails]);

  useEffect(() => {
    mainElem?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [isChanging]);

  return (
    <div className="px-4 pb-4 flex flex-col-reverse ">
      {currentChatMessage?.map((item, index) => (
        <div
          key={item?.id}
          ref={
            index === Math.ceil(currentChatMessage.length / 2)
              ? lastMessageRef
              : index === currentChatMessage?.length - 1
              ? mainElem
              : undefined
          }
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
  );
};

export default MainChatViewContainer;

const EventTemplate = ({ data }: any) => {
  return (
    <div className="flex justify-center items-center">
      <span className="text-xs tracking-wide px-4 py-1 bg-slate-200 rounded-full">
        {data?.text}
      </span>
    </div>
  );
};
