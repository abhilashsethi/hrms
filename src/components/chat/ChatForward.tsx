import { Checkbox, Dialog } from "@mui/material";
import { PhotoViewerSmall } from "components/core";
import { useChange, useChatData, useFetch } from "hooks";
import React from "react";
import Swal from "sweetalert2";
import { IGroupChatData } from "types";
import { useState } from "react";

const ChatForward = ({ open, handleClose, chatData, activeProfile }: any) => {
  const [loading, setLoading] = useState(false);
  const { data } = useFetch<{ group: IGroupChatData[] }>(`chat/message-group`);
  const [selectedGroup, setSelectedGroup] = useState<string[]>([]);

  const {
    handleSendNewMessage,
    reValidateGroupChat,
    revalidateCurrentChat,
    reValidatePrivateChat,
  } = useChatData();

  const { change } = useChange();

  const handleSendMessageToNewGroup = async () => {
    try {
      setLoading(true);
      await Promise.all(
        selectedGroup?.map((item) => {
          return new Promise(async (resolve, reject) => {
            try {
              const res = await change(`chat/message/${item}`, {
                body: {
                  link: chatData?.link,
                  category: chatData?.category,
                  message: chatData?.text,
                },
              });
              if (res?.status !== 200) {
                Swal.fire(`Error`, "Something went wrong!", "error");
                return resolve(true);
              }
              resolve(true);
            } catch (error) {
              resolve(true);
            }
          });
        })
      );

      reValidateGroupChat?.();
      revalidateCurrentChat();
      reValidatePrivateChat();
      handleClose();
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          title: "Error",
          text: error?.message,
          timer: 2000,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Oops something went wrong!",
          timer: 2000,
          icon: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClickCheckBox = (id: string) => {
    setSelectedGroup((prev) =>
      prev?.includes(id) ? prev?.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <h3 className="font-medium tracking-wide text-theme p-4 text-center border-b">
        Forward
      </h3>

      <div className="flex flex-col gap-4 p-4">
        {data?.group
          ?.filter(
            (item) => item?.id !== activeProfile?.id || item?.isGroupBlocked
          )
          .map((item) => (
            <div
              className="w-full flex items-center"
              onClick={() => handleClickCheckBox(item?.id)}
            >
              <Checkbox checked={selectedGroup?.includes(String(item?.id))} />
              <div className="flex gap-4 items-center">
                <PhotoViewerSmall
                  name={item?.title}
                  photo={item?.photo || ""}
                  size="2.8rem"
                />
                <div className="flex flex-col">
                  <h3 className="font-medium tracking-wide">{item?.title}</h3>
                  <small>{item?.isPrivateGroup ? "Private" : "Group"}</small>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="p-4" onClick={() => handleSendMessageToNewGroup()}>
        <button
          className="w-full bg-theme text-white p-4 rounded-md shadow-lg "
          disabled={loading}
        >
          Send
        </button>
      </div>
    </Dialog>
  );
};

export default ChatForward;
