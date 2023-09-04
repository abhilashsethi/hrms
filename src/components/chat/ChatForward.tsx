import { Checkbox, Dialog, TextField } from "@mui/material";
import { PhotoViewerSmall } from "components/core";
import { useChange, useChatData, useFetch } from "hooks";
import React from "react";
import Swal from "sweetalert2";
import { IChatGroup, IChatUsers, IGroupChatData } from "types";
import { useState } from "react";

const ChatForward = ({ open, handleClose, chatData, activeProfile }: any) => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const { data } = useFetch<{ group: IGroupChatData[] }>(
    `chat/message-group?privateChat=false`
  );
  const { data: allUsers } = useFetch<{ users: IChatUsers[] }>(
    `chat/user/not-connected?limit=20&page=1` +
      (searchText ? `&searchTitle=${searchText}` : "")
  );
  console.log({ allUsers });
  const [selectedGroup, setSelectedGroup] = useState<string[]>([]);

  const {
    handleSendNewMessage,
    reValidateGroupChat,
    revalidateCurrentChat,
    reValidatePrivateChat,
    currentChatProfileDetails,
  } = useChatData();

  const { change } = useChange();

  const handleSendMessageToNewGroup = async () => {
    try {
      if (!selectedGroup?.length) return;
      setLoading(true);
      await Promise.all(
        selectedGroup?.map((item) => {
          if (item?.includes("newuser=true")) {
            return new Promise(async (resolve, reject) => {
              try {
                handleSendNewMessage({
                  messageTo: item?.split("newuser=true")?.[0],
                  link: chatData?.link,
                  category: chatData?.category,
                  message: chatData?.text,
                });
                resolve(true);
              } catch (error) {
                resolve(true);
              }
            });
          } else {
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
          }
        })
      );

      reValidateGroupChat?.();
      revalidateCurrentChat(currentChatProfileDetails?.id);
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
      <div className="p-4">
        <TextField
          fullWidth
          className="w-full"
          value={searchText}
          onChange={(e) => setSearchText(e?.target?.value)}
          placeholder="Search user or group"
        />
      </div>
      <div className="flex flex-col gap-4 p-4">
        <h3 className="font-medium text-theme tracking-wide">
          USERS AND GROUPS
        </h3>

        {allUsers?.users
          ?.filter(
            (item) => item?.alreadyConnected?.groupId !== activeProfile?.id
          )
          .map((item) => (
            <div
              className="w-full flex items-center"
              onClick={() =>
                handleClickCheckBox(
                  item?.alreadyConnected?.groupId || item?.id + "newuser=true"
                )
              }
              key={item?.id}
            >
              <Checkbox
                checked={
                  selectedGroup?.includes(String(item?.id)) ||
                  selectedGroup?.includes(
                    String(item?.alreadyConnected?.groupId)
                  ) ||
                  selectedGroup?.includes(String(item?.id + "newuser=true"))
                }
              />
              <div className="flex gap-4 items-center">
                <PhotoViewerSmall
                  name={item?.name}
                  photo={item?.photo || ""}
                  size="2.8rem"
                />
                <div className="flex flex-col">
                  <h3 className="font-medium tracking-wide">{item?.name}</h3>
                  <small>{item?.role?.name}</small>
                </div>
              </div>
            </div>
          ))}
        {data?.group
          ?.filter(
            (item) =>
              item?.id !== activeProfile?.id &&
              new RegExp(searchText, "i")?.test(item?.title)
          )
          .map((item) => (
            <div
              className="w-full flex items-center"
              onClick={() => handleClickCheckBox(item?.id)}
              key={item?.id}
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
