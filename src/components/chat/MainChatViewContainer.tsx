import { useAuth, useChatData, useSocket } from "hooks";
import ChatMessage from "./ChatMessage";
import { useEffect, useRef, useState } from "react";
import { Chip } from "@mui/material";
import { Replay } from "@mui/icons-material";
import ICONS from "assets/icons";

const MainChatViewContainer = () => {
  const [changing, setChanging] = useState(false);
  const {
    currentChatMessage,
    currentChatProfileDetails,
    totalChatCount,
    revalidateCurrentChat,
    handleReadMessage,
    revalidateChatProfileDetails,
    selectedChatId,
    isChatLoading,
    chatPageNo,
    setChatPageNo,
  } = useChatData();
  const { user } = useAuth();
  const { socketRef } = useSocket();

  useEffect(() => {
    if (!socketRef || !selectedChatId) return;
    socketRef.on(`MESSAGE_RECEIVED_${selectedChatId}`, async () => {
      //when receive to refetch data we will refetch
      await Promise.all([
        revalidateCurrentChat(selectedChatId),
        selectedChatId && (await revalidateChatProfileDetails(selectedChatId)),
        //after message received send a message read
        selectedChatId && handleReadMessage(selectedChatId),
      ]);

      divRef.current?.scrollTo({
        top: -divRef?.current?.clientHeight,
        behavior: "smooth",
      });

      //emit an re fetch event
      socketRef.emit("REFETCH_DATA", {
        groupId: selectedChatId,
        userId: user?.id,
      });
      setChanging((prev) => !prev);
    });

    socketRef.on(`REVALIDATE_${selectedChatId}`, async () => {
      //when receive to refetch data we will refetch
      await Promise.all([
        revalidateCurrentChat(selectedChatId),
        selectedChatId && (await revalidateChatProfileDetails(selectedChatId)),
      ]);
    });
  }, [socketRef, selectedChatId, user?.id]);

  const handleFetchNext = () => {
    setChatPageNo(chatPageNo + 1);
  };

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (() => {
      if (isChatLoading || chatPageNo !== 1) return;
      divRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    })();
  }, [changing, selectedChatId, isChatLoading, chatPageNo]);

  return (
    <div className="px-4 pb-4  !flex !flex-col-reverse">
      {currentChatMessage?.map((item, index) => (
        <>
          {index === 0 ? (
            <div
              ref={divRef}
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
              </>
            </div>
          ) : (
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
              </>
            </div>
          )}
        </>
      ))}
      {totalChatCount === currentChatMessage?.length ? (
        <h3 className="w-full flex items-centre pt-2 justify-center text-center">
          No more messages
        </h3>
      ) : (
        <div className="w-full flex items-centre pt-2 justify-center">
          <Chip
            avatar={
              isChatLoading ? (
                <ICONS.Reload className="animate-spin  " />
              ) : (
                <Replay />
              )
            }
            label="Load more.."
            variant="outlined"
            className="hover:!cursor-pointer"
            onClick={handleFetchNext}
          />
        </div>
      )}
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
