import { Block, Delete, Logout, MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { PhotoViewerSmall } from "components/core";
import { ChatProfileDrawer } from "components/drawer";
import { BASE_URL, useAuth, useChange, useChatData, useSocket } from "hooks";
import { MouseEvent, useState } from "react";
import { formatChatTime } from "utils";
import { useEffect } from "react";
import Swal from "sweetalert2";

const ChatHead = ({ isNew }: { isNew?: boolean }) => {
  const [typingUser, setTypingUser] = useState("");
  const [isDrawer, setIsDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { socketRef } = useSocket();
  const { change } = useChange();

  const {
    currentChatProfileDetails,
    selectedChatId,
    revalidateChatProfileDetails,
    revalidateCurrentChat,
  } = useChatData();
  const { user } = useAuth();
  const configs = [
    {
      id: 1,
      title: `${
        currentChatProfileDetails?.isGroupBlocked ? "Unblock" : "Block User"
      }`,
      icon: <Block fontSize="small" />,
      privateOnly: true,
    },
    {
      id: 2,
      title: "Leave Group",
      icon: <Logout fontSize="small" />,
      privateOnly: false,
      groupOnly: true,
    },
    {
      id: 3,
      title: "Clear Chat",
      icon: <Delete fontSize="small" />,
      privateOnly: false,
      groupOnly: false,
    },
  ];

  useEffect(() => {
    (() => {
      if (!socketRef || !user?.id || !selectedChatId) return;
      currentChatProfileDetails?.isPrivateGroup &&
        socketRef.on(
          `USER_DISCONNECT_${
            currentChatProfileDetails?.chatMembers?.find(
              (item) => item?.user?.id !== user?.id
            )?.user?.id
          }`,
          (data) => {
            selectedChatId && revalidateChatProfileDetails(selectedChatId);
          }
        );
      currentChatProfileDetails?.isPrivateGroup &&
        socketRef.on(
          `USER_CONNECTED_${
            currentChatProfileDetails?.chatMembers?.find(
              (item) => item?.user?.id !== user?.id
            )?.user?.id
          }`,
          (data) => {
            selectedChatId && revalidateChatProfileDetails(selectedChatId);
          }
        );
      socketRef.on(`USER_IS_TYPING_${selectedChatId}`, (data) => {
        setTypingUser(
          currentChatProfileDetails?.chatMembers?.find(
            (item) => item?.user?.id === data?.userId
          )?.user?.name as any
        );
      });
      socketRef.on(`USER_STOP_TYPING_${selectedChatId}`, (data) => {
        setTypingUser(
          (currentChatProfileDetails?.chatMembers?.find(
            (item) => item?.user?.id === data?.userId
          )?.user?.name as any) === typingUser
            ? ""
            : typingUser
        );
      });
    })();
  }, [
    socketRef,
    selectedChatId,
    user?.id,
    currentChatProfileDetails?.isPrivateGroup,
    currentChatProfileDetails?.chatMembers?.length,
  ]);

  const handleGroupAction = async (configId: number) => {
    try {
      switch (configId) {
        case 2:
          if (
            !currentChatProfileDetails?.chatMembers?.find(
              (item) => item?.user?.id === user?.id
            )?.isPastMember
          ) {
            const res = await change(
              `chat/member/${
                currentChatProfileDetails?.chatMembers?.find(
                  (item) => item?.user?.id === user?.id
                )?.id
              }`,
              {
                method: "DELETE",
                BASE_URL,
              }
            );

            if (res?.status !== 201) {
              Swal.fire(
                "Error",
                res?.results?.msg || "Something went wrong!",
                "error"
              );
              return;
            }
            revalidateCurrentChat(selectedChatId);
            selectedChatId && revalidateChatProfileDetails(selectedChatId);
            break;
          }
          Swal.fire("Info", "You leave this group already", "info");
          break;
        case 1:
          const blockUser = await change(`chat/blocked/${selectedChatId}`, {
            method: "PATCH",
            body: {
              isBlocked: !currentChatProfileDetails?.isGroupBlocked,
            },
          });
          revalidateCurrentChat(selectedChatId);

          if (blockUser?.status !== 200) {
            Swal.fire(
              "Error",
              blockUser?.results?.msg || "Something went wrong!",
              "error"
            );
            return;
          }
          Swal.fire("Success", "Status Changed Successfully!", "success");
          selectedChatId && revalidateChatProfileDetails(selectedChatId);
          revalidateCurrentChat(selectedChatId);
          break;
        case 3:
          const clear = await change(`chat/message-clear/${selectedChatId}`, {
            method: "POST",
            BASE_URL,
          });

          if (clear?.status !== 200) {
            Swal.fire(
              "Error",
              clear?.results?.msg || "Something went wrong!",
              "error"
            );
            return;
          }
          selectedChatId && revalidateChatProfileDetails(selectedChatId);
          revalidateCurrentChat(selectedChatId);
          break;
        default:
          break;
      }
    } catch (error) {}
  };
  return (
    <>
      <ChatProfileDrawer
        profileData={currentChatProfileDetails}
        open={isDrawer}
        onClose={() => setIsDrawer(false)}
      />
      <div className="py-2 px-4 w-full border-b-2 flex justify-between items-center sticky top-0 z-[999] bg-white ">
        <div className="flex gap-3 items-center">
          <div className="cursor-pointer" onClick={() => setIsDrawer(true)}>
            <PhotoViewerSmall
              photo={currentChatProfileDetails?.photo}
              name={currentChatProfileDetails?.title}
              size="3.5rem"
            />
          </div>
          <div>
            <h1 className="font-semibold">
              {currentChatProfileDetails?.title}
            </h1>
            <h1 className="text-sm font-light">
              {currentChatProfileDetails?.isGroupBlocked ? null : currentChatProfileDetails?.isPrivateGroup ? (
                <span
                  className={`${
                    currentChatProfileDetails?.chatMembers?.find((item) =>
                      item?.isClient
                        ? item?.client?.id !== user?.id
                        : item?.user?.id !== user?.id
                    )?.isClient
                      ? currentChatProfileDetails?.chatMembers?.find((item) =>
                          item?.isClient
                            ? item?.client?.id !== user?.id
                            : item?.user?.id !== user?.id
                        )?.client?.isOnline
                      : currentChatProfileDetails?.chatMembers?.find((item) =>
                          item?.isClient
                            ? item?.client?.id !== user?.id
                            : item?.user?.id !== user?.id
                        )?.user?.isOnline
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {typingUser?.length
                    ? "Typing..."
                    : currentChatProfileDetails?.chatMembers?.find((item) =>
                        item?.isClient
                          ? item?.client?.id !== user?.id
                          : item?.user?.id !== user?.id
                      )?.isClient
                    ? currentChatProfileDetails?.chatMembers?.find((item) =>
                        item?.isClient
                          ? item?.client?.id !== user?.id
                          : item?.user?.id !== user?.id
                      )?.client?.isOnline
                    : currentChatProfileDetails?.chatMembers?.find((item) =>
                        item?.isClient
                          ? item?.client?.id !== user?.id
                          : item?.user?.id !== user?.id
                      )?.user?.isOnline
                    ? "Active Now"
                    : `Last seen at ${
                        (currentChatProfileDetails?.chatMembers?.find((item) =>
                          item?.isClient
                            ? item?.client?.id !== user?.id
                            : item?.user?.id !== user?.id
                        )?.isClient
                          ? formatChatTime(
                              currentChatProfileDetails?.chatMembers?.find(
                                (item) =>
                                  item?.isClient
                                    ? item?.client?.id !== user?.id
                                    : item?.user?.id !== user?.id
                              )?.client?.lastActiveTime
                            )
                          : formatChatTime(
                              currentChatProfileDetails?.chatMembers?.find(
                                (item) =>
                                  item?.user
                                    ? item?.user?.id !== user?.id
                                    : item?.client?.id !== user?.id
                              )?.user?.lastActiveTime
                            )) || "unknown"
                      }`}
                </span>
              ) : (
                <span className="">
                  {typingUser?.length
                    ? `${typingUser} is typing`
                    : currentChatProfileDetails?.chatMembers
                        ?.filter((item) => !item?.isPastMember)
                        ?.slice(0, 5)
                        ?.map((item) => item?.user?.name)
                        .join(", ") +
                      (currentChatProfileDetails?.chatMembers?.filter(
                        (item) => !item?.isPastMember
                      )?.length &&
                      currentChatProfileDetails?.chatMembers?.filter(
                        (item) => !item?.isPastMember
                      )?.length > 5
                        ? " and others."
                        : "")}{" "}
                </span>
              )}
            </h1>
          </div>
        </div>
        <div>
          <Tooltip title="Menu">
            <IconButton onClick={handleClick} size="small">
              <MoreVert />
            </IconButton>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                setIsDrawer(true);
                handleClose();
              }}
            >
              Details
            </MenuItem>

            {configs
              ?.filter((item) =>
                currentChatProfileDetails?.isPrivateGroup
                  ? item?.privateOnly || !item?.groupOnly
                  : !item?.privateOnly || item?.groupOnly
              )
              ?.map((item) => (
                <MenuItem onClick={() => handleGroupAction(item?.id)}>
                  {item?.title}
                </MenuItem>
              ))}
          </Menu>
        </div>
      </div>
    </>
  );
};

export default ChatHead;
