import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { PhotoViewerSmall } from "components/core";
import { ChatProfileDrawer } from "components/drawer";
import { useAuth, useChatData, useSocket } from "hooks";
import { MouseEvent, useState } from "react";
import { formatChatTime } from "utils";
import { useEffect } from "react";

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

  const { currentChatProfileDetails, revalidateChatProfileDetails } =
    useChatData();
  const { user } = useAuth();

  useEffect(() => {
    (() => {
      if (!socketRef || !currentChatProfileDetails?.id) return;
      currentChatProfileDetails?.isPrivateGroup &&
        socketRef.on(
          `USER_DISCONNECT_${
            currentChatProfileDetails?.chatMembers?.find(
              (item) => item?.user?.id !== user?.id
            )?.user?.id
          }`,
          (data) => {
            currentChatProfileDetails?.id &&
              revalidateChatProfileDetails(currentChatProfileDetails?.id);
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
            currentChatProfileDetails?.id &&
              revalidateChatProfileDetails(currentChatProfileDetails?.id);
          }
        );
      socketRef.on(
        `USER_IS_TYPING_${currentChatProfileDetails?.id}`,
        (data) => {
          setTypingUser(
            currentChatProfileDetails?.chatMembers?.find(
              (item) => item?.user?.id === data?.userId
            )?.user?.name as any
          );
        }
      );
      socketRef.on(
        `USER_STOP_TYPING_${currentChatProfileDetails?.id}`,
        (data) => {
          setTypingUser(
            (currentChatProfileDetails?.chatMembers?.find(
              (item) => item?.user?.id === data?.userId
            )?.user?.name as any) === typingUser
              ? ""
              : typingUser
          );
        }
      );
    })();
  }, [socketRef, currentChatProfileDetails, user?.id]);

  return (
    <>
      <ChatProfileDrawer
        profileData={currentChatProfileDetails}
        open={isDrawer}
        onClose={() => setIsDrawer(false)}
      />
      <div className="py-2 px-4 w-full border-b-2 flex justify-between items-center">
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
              {currentChatProfileDetails?.isPrivateGroup ? (
                <span
                  className={`${
                    currentChatProfileDetails?.chatMembers?.find(
                      (item) => item?.user?.id !== user?.id
                    )?.user?.isOnline
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {typingUser?.length
                    ? "Typing..."
                    : currentChatProfileDetails?.chatMembers?.find(
                        (item) => item?.user?.id !== user?.id
                      )?.user?.isOnline
                    ? "Active Now"
                    : `Last seen at ${
                        (currentChatProfileDetails?.chatMembers?.find(
                          (item) => item?.user?.id !== user?.id
                        )?.user?.lastActiveTime &&
                          formatChatTime(
                            currentChatProfileDetails?.chatMembers?.find(
                              (item) => item?.user?.id !== user?.id
                            )?.user?.lastActiveTime
                          )) ||
                        "unknown"
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
                        .join(", ")}{" "}
                  and others.
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
            <MenuItem onClick={handleClose}>Clear Messages</MenuItem>
            <MenuItem onClick={handleClose}>Delete Chat</MenuItem>
            <MenuItem onClick={handleClose}>Block</MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default ChatHead;
