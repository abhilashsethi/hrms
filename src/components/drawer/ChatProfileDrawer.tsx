import {
  Block,
  Close,
  Delete,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowRight,
  Logout,
} from "@mui/icons-material";
import {
  Button,
  Container,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { ChatMedia } from "components/chat";
import { PhotoUpdateView, PhotoViewerSmall } from "components/core";
import { AddParticipants, ChatDescription } from "components/dialogues";
import { BASE_URL, useAuth, useChange } from "hooks";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { IChatGroup } from "types";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  profileData?: Partial<IChatGroup>;
};
const ChatProfileDrawer = ({ open, onClose, profileData }: Props) => {
  const [isAdd, setIsAdd] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const [isMedia, setIsMedia] = useState(false);
  const { user } = useAuth();
  const { change } = useChange();

  const handleGroupAction = async (configId: number) => {
    try {
      switch (configId) {
        case 2:
          const res = await change(
            `chat/member/${
              profileData?.chatMembers?.find(
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
          }
          break;
        case 1:
          const blockUser = await change(
            `chat/block/${
              profileData?.chatMembers?.find(
                (item) => item?.user?.id === user?.id
              )?.id
            }`,
            {
              method: "PATCH",
              body: {
                isBlocked: true,
              },
            }
          );

          if (blockUser?.status !== 201) {
            Swal.fire(
              "Error",
              blockUser?.results?.msg || "Something went wrong!",
              "error"
            );
          }

        case 4 || 3:
          const clearChat = await change(
            `message-clear/:chatId/${
              profileData?.chatMembers?.find(
                (item) => item?.user?.id === user?.id
              )?.id
            }`,
            {
              method: "POST",
              BASE_URL,
            }
          );

          if (clearChat?.status !== 201) {
            Swal.fire(
              "Error",
              clearChat?.results?.msg || "Something went wrong!",
              "error"
            );
          }
          break;
        default:
          break;
      }
    } catch (error) {}
  };

  return (
    <>
      <ChatDescription
        open={isDescription}
        handleClose={() => setIsDescription(false)}
      />
      <AddParticipants
        profileData={profileData}
        open={isAdd}
        handleClose={() => setIsAdd(false)}
      />
      <Drawer
        anchor="right"
        open={open}
        onClose={() => onClose && onClose()}
        className="!h-full"
        PaperProps={{
          style: {
            height: "100%",
          },
        }}
      >
        <Container
          style={{
            width: "30vw",
          }}
        >
          <section className="relative w-full overflow-hidden overflow-y-auto">
            <section className="py-4 h-full w-full">
              <div className="flex gap-2 items-center">
                <span className="cursor-pointer" onClick={() => onClose()}>
                  <Close fontSize="small" className="!text-red-600" />
                </span>
                <h1>Profile Info</h1>
              </div>
              {/* ------------------Image section----------------- */}
              <div className="flex flex-col items-center gap-3 my-8">
                <PhotoUpdateView
                  photo={profileData?.photo}
                  chatId={profileData?.id}
                  editable={
                    !profileData?.isPrivateGroup &&
                    profileData?.chatMembers?.find(
                      (item) => item?.user?.id === user?.id
                    )?.isAdmin
                  }
                />
                <div className="flex flex-col gap-1 items-center">
                  <h1 className="font-semibold">{profileData?.title}</h1>
                  {!profileData?.isPrivateGroup ? (
                    <h1 className="flex">
                      Group
                      <span className="ml-2">
                        {
                          profileData?.chatMembers?.filter(
                            (item) => !item?.isPastMember
                          )?.length
                        }
                        Participants
                      </span>
                    </h1>
                  ) : (
                    <h1 className="">
                      {
                        profileData?.chatMembers?.find(
                          (item) => item?.user?.id !== user?.id
                        )?.user?.email
                      }
                    </h1>
                  )}
                </div>
              </div>
              {/* ------------------About Section-------------------- */}
              {!profileData?.isPrivateGroup &&
                profileData?.chatMembers?.find(
                  (item) => item?.user?.id === user?.id
                )?.isAdmin && (
                  <div className="my-4">
                    <div className="flex justify-between items-center">
                      <SectionTitle title="Group Description" />
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => setIsDescription(true)}
                          size="small"
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <p className="mt-2 pl-4 text-gray-600">
                      {profileData?.description}
                    </p>
                  </div>
                )}
              {!profileData?.isPrivateGroup ? (
                <div>
                  <div className="flex items-center justify-between pr-4">
                    <SectionTitle title="Participants" />
                    <Button
                      onClick={() => setIsAdd(true)}
                      variant="contained"
                      className="!bg-theme"
                      size="small"
                    >
                      Add Participants
                    </Button>
                  </div>
                  <div className="px-4 py-3 flex flex-col gap-1">
                    {profileData?.chatMembers
                      ?.filter((item) => !item?.isPastMember)
                      .map((item) => (
                        <div
                          key={item?.user?.id}
                          className="py-4 w-full rounded-md flex gap-1 items-center px-2 hover:bg-slate-100"
                        >
                          <div className="w-1/5">
                            <PhotoViewerSmall
                              size="2.7rem"
                              name={item?.user?.name}
                              photo={item?.user?.photo}
                            />
                          </div>
                          <div className="w-4/5 relative flex justify-between">
                            <MoreMenu />
                            <div className="w-3/5">
                              <h1 className="text-sm font-semibold">
                                {item?.user?.id === user?.id
                                  ? "You"
                                  : item?.user?.name}
                              </h1>
                              <h1 className="text-sm text-gray-600">
                                {item?.user?.role?.name}
                              </h1>
                            </div>
                            {item?.isAdmin && (
                              <div className="w-2/5">
                                <button className="text-xs text-green-500 bg-green-200 px-2 py-1 rounded-md">
                                  Group Admin
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div>
                  <SectionTitle title="Role" />
                  <h1 className="px-4 mt-2">
                    {
                      profileData?.chatMembers?.find(
                        (item) => item?.user?.id !== user?.id
                      )?.user?.role?.name
                    }
                  </h1>
                </div>
              )}
              <div
                onClick={() => setIsMedia((prev) => !prev)}
                className="w-full rounded-md cursor-pointer bg-slate-100 border-[1px] shadow-md tracking-wide mt-4 flex justify-between items-center px-4 py-2"
              >
                <h1>Media, links and Docs</h1>
                <IconButton size="small">
                  <KeyboardArrowRight
                    className={`!cursor-pointer !transition-all !ease-in-out !duration-200 }`}
                  />
                </IconButton>
              </div>
              <div className="mt-4">
                {configs
                  ?.filter(
                    (item) => item?.privateOnly === profileData?.isPrivateGroup
                  )
                  ?.map((item) => (
                    <div
                      key={item?.id}
                      className="py-3 px-2 cursor-pointer hover:bg-slate-200"
                      onClick={() => handleGroupAction(item?.id)}
                    >
                      <h1 className="flex gap-4 items-center text-red-600 font-medium">
                        {item?.icon}
                        {item?.title}
                      </h1>
                    </div>
                  ))}
              </div>
            </section>
            {/* --------------------Media and links section------------------------- */}
            <ChatMedia
              isMedia={isMedia}
              setIsMedia={setIsMedia}
              groupId={profileData?.id}
            />
          </section>
        </Container>
      </Drawer>
    </>
  );
};

export default ChatProfileDrawer;

interface TitleProps {
  title?: string;
}

const SectionTitle = ({ title }: TitleProps) => {
  return (
    <h1 className="font-semibold flex items-center gap-2">
      <div className="h-2.5 w-2.5 bg-theme rounded-sm"></div> {title}
    </h1>
  );
};

const configs = [
  {
    id: 1,
    title: "Block User",
    icon: <Block fontSize="small" />,
    privateOnly: true,
  },
  {
    id: 2,
    title: "Leave Group",
    icon: <Logout fontSize="small" />,
    privateOnly: false,
  },
  {
    id: 3,
    title: "Clear Chat",
    icon: <Delete fontSize="small" />,
    privateOnly: false,
  },
  {
    id: 4,
    title: "Clear Chat",
    icon: <Delete fontSize="small" />,
    privateOnly: true,
  },
];

const MoreMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="absolute right-0 top-1/2">
      <IconButton onClick={handleClick} size="small">
        <KeyboardArrowDown />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Create Admin</MenuItem>
        <MenuItem onClick={handleClose}>Remove Member</MenuItem>
      </Menu>
    </div>
  );
};
