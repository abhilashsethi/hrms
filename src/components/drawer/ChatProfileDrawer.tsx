import { makeStyles } from "@material-ui/core";
import {
  Block,
  Cancel,
  Close,
  Delete,
  Done,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowRight,
  Logout,
} from "@mui/icons-material";
import {
  Button,
  Chip,
  Container,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { DEFAULTPROFILE, GROUP } from "assets/home";
import { ChatMedia } from "components/chat";
import { PhotoUpdateView, PhotoViewerSmall } from "components/core";
import { AddParticipants, ChatDescription } from "components/dialogues";
import { BASE_URL, useAuth, useChange, useChatData } from "hooks";
import { ChangeEvent, MouseEvent, useState } from "react";
import Swal from "sweetalert2";
import { IChatGroup } from "types";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  profileData?: Partial<IChatGroup>;
};
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "50vw",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "80vw",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "30vw",
    },
  },
}));
const ChatProfileDrawer = ({ open, onClose, profileData }: Props) => {
  const [isAdd, setIsAdd] = useState(false);
  const [changeTitle, setChangeTitle] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const [isMedia, setIsMedia] = useState(false);
  const { user } = useAuth();
  const classes = useStyles();
  const { change } = useChange();
  const {
    revalidateCurrentChat,
    revalidateChatProfileDetails,
    reValidateGroupChat,
    selectedChatId,
    currentChatProfileDetails,
    reValidatePrivateChat,
  } = useChatData();
  const [titleText, setTitleText] = useState(currentChatProfileDetails?.title);

  const configs = [
    {
      id: 1,
      title: `${
        profileData?.blockedBy?.includes(String(user?.id))
          ? "Unblock"
          : "Block User"
      }`,
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
  const handleGroupAction = async (configId: number) => {
    try {
      switch (configId) {
        case 2:
          if (
            !profileData?.chatMembers?.find(
              (item) => item?.user?.id === user?.id
            )?.isPastMember
          ) {
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
            selectedChatId && revalidateChatProfileDetails(selectedChatId);
            revalidateCurrentChat(selectedChatId);
            reValidateGroupChat();
            reValidatePrivateChat();
            break;
          }
          Swal.fire("Info", "You leave this group already", "info");
          break;
        case 1:
          const blockUser = await change(`chat/blocked/${selectedChatId}`, {
            method: "PATCH",
            body: {
              isBlocked: !profileData?.blockedBy?.includes(String(user?.id)),
            },
          });
          revalidateCurrentChat(selectedChatId);

          if (blockUser?.status !== 200) {
            Swal.fire(
              "Error",
              blockUser?.results?.msg || "Something went wrong!",
              "error"
            );
          }
          selectedChatId && revalidateChatProfileDetails(selectedChatId);
          revalidateCurrentChat(selectedChatId);
          reValidateGroupChat();
          reValidatePrivateChat();
          onClose();
          break;

        case 4:
          const clearChat = await change(
            `chat/message-clear/${selectedChatId}`,
            {
              method: "POST",
              BASE_URL,
            }
          );

          if (clearChat?.status !== 200) {
            Swal.fire(
              "Error",
              clearChat?.results?.msg || "Something went wrong!",
              "error"
            );
          }
          selectedChatId && revalidateChatProfileDetails(selectedChatId);
          revalidateCurrentChat(selectedChatId);
          reValidateGroupChat();
          reValidatePrivateChat();

          onClose();
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
          }
          selectedChatId && revalidateChatProfileDetails(selectedChatId);
          revalidateCurrentChat(selectedChatId);
          reValidateGroupChat();
          reValidatePrivateChat();
          onClose();
          break;
        default:
          break;
      }
    } catch (error) {}
  };

  const removeChatDescription = async () => {
    try {
      await change(`chat/${currentChatProfileDetails?.id}`, {
        method: "PATCH",
        body: {
          description: "      ",
        },
      });
      currentChatProfileDetails?.id &&
        revalidateChatProfileDetails(currentChatProfileDetails?.id);
      Swal.fire(`Success`, `Description removed!`, `success`);
      revalidateCurrentChat(selectedChatId);
      reValidateGroupChat();
      reValidatePrivateChat();
    } catch (error) {}
  };
  const changeChatTitle = async () => {
    try {
      if (!titleText) return;
      await change(`chat/${currentChatProfileDetails?.id}`, {
        method: "PATCH",
        body: {
          title: titleText,
        },
      });
      currentChatProfileDetails?.id &&
        revalidateChatProfileDetails(currentChatProfileDetails?.id);
      Swal.fire(`Success`, `Title Changed!`, `success`);
      revalidateCurrentChat(selectedChatId);
      reValidateGroupChat();
      reValidatePrivateChat();
      setChangeTitle(false);
    } catch (error) {}
  };

  const removeChatImage = async () => {
    try {
      if (!currentChatProfileDetails?.photo) return;
      await change(`chat/${currentChatProfileDetails?.id}`, {
        method: "PATCH",
        body: {
          imageRemove: true,
        },
      });
      currentChatProfileDetails?.id &&
        revalidateChatProfileDetails(currentChatProfileDetails?.id);
      Swal.fire(`Success`, `Image removed!`, `success`);
      revalidateCurrentChat(selectedChatId);
      reValidateGroupChat();
      reValidatePrivateChat();
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
        <Container className={classes.container}>
          <section className="relative w-full overflow-hidden overflow-y-auto">
            <section className="py-4  w-full">
              <div className="flex gap-2 items-center">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    onClose();
                    setChangeTitle(false);
                  }}
                >
                  <Close fontSize="small" className="!text-red-600" />
                </span>
                <h1>Profile Info</h1>
              </div>
              {/* ------------------Image section----------------- */}
              {!profileData?.isPrivateGroup ? (
                <>
                  <div className="flex flex-col items-center gap-3 my-8">
                    <PhotoUpdateView
                      photo={
                        profileData?.photo ? profileData?.photo : GROUP.src
                      }
                      chatId={profileData?.id}
                      editable={
                        !profileData?.isPrivateGroup &&
                        profileData?.chatMembers?.find(
                          (item) => item?.user?.id === user?.id
                        )?.isAdmin
                      }
                    />
                    {profileData?.chatMembers?.find(
                      (item) => item?.user?.id === user?.id
                    )?.isAdmin ? (
                      <div className="flex w-full items-center justify-center">
                        <Chip
                          label="Delete icon"
                          onClick={removeChatImage}
                          onDelete={removeChatImage}
                          deleteIcon={<Delete />}
                          variant="outlined"
                          color="error"
                        />
                      </div>
                    ) : null}

                    <div className="flex flex-col gap-1 items-center">
                      {changeTitle ? (
                        <div className="flex gap-4 items-center">
                          <TextField
                            value={titleText}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setTitleText(e?.target?.value)
                            }
                            placeholder="Enter title"
                            size="small"
                          />
                          <IconButton
                            onClick={() => changeChatTitle()}
                            size="small"
                          >
                            <Done className="text-theme" />
                          </IconButton>
                          <IconButton
                            onClick={() => setChangeTitle(false)}
                            size="small"
                          >
                            <Cancel className="text-red-500" />
                          </IconButton>
                        </div>
                      ) : (
                        <div className="flex gap-4 items-center">
                          <h1 className="font-semibold break-all text-center">
                            {profileData?.title}
                          </h1>
                          {profileData?.chatMembers?.find(
                            (item) => item?.user?.id === user?.id
                          )?.isAdmin ? (
                            <Tooltip title="Edit Title">
                              <IconButton
                                onClick={() => setChangeTitle(true)}
                                size="small"
                              >
                                <Edit />
                              </IconButton>
                            </Tooltip>
                          ) : null}
                        </div>
                      )}

                      <h1 className="flex">
                        Group
                        <span className="ml-2">
                          {
                            profileData?.chatMembers?.filter(
                              (item) => !item?.isPastMember
                            )?.length
                          }{" "}
                          Participants
                        </span>
                      </h1>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center gap-3 my-8">
                    <PhotoUpdateView
                      photo={
                        profileData?.photo
                          ? profileData?.photo
                          : DEFAULTPROFILE.src
                      }
                      chatId={profileData?.id}
                      editable={
                        !profileData?.isPrivateGroup &&
                        profileData?.chatMembers?.find(
                          (item) => item?.user?.id === user?.id
                        )?.isAdmin
                      }
                    />
                    <div className="flex flex-col gap-1 items-center">
                      <h1 className="">
                        {
                          profileData?.chatMembers?.find(
                            (item) => item?.user?.id !== user?.id
                          )?.user?.email
                        }
                      </h1>
                    </div>
                  </div>
                </>
              )}

              {/* ------------------About Section-------------------- */}
              {!profileData?.isPrivateGroup &&
                profileData?.chatMembers?.find(
                  (item) => item?.user?.id === user?.id
                )?.isAdmin && (
                  <div className="my-4">
                    <div className="flex justify-between items-center">
                      <SectionTitle title="Group Description" />
                      <div className="flex gap-4 pr-4 items-center">
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() => setIsDescription(true)}
                            size="small"
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={removeChatDescription}
                            size="small"
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                    <p className="mt-2 pl-4 text-gray-600">
                      {profileData?.description}
                    </p>
                  </div>
                )}
              {!profileData?.isPrivateGroup ? (
                <div>
                  {profileData?.chatMembers?.find(
                    (item) => item?.user?.id === user?.id
                  )?.isAdmin && (
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
                  )}

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
                            {item?.isAdmin ? (
                              <div className="flex gap-3 w-2/5">
                                <div className="">
                                  <button className="text-xs text-green-500 bg-green-200 px-2 py-1 rounded-md">
                                    Group Admin
                                  </button>
                                </div>
                                {profileData?.chatMembers?.find(
                                  (item) => item?.user?.id === user?.id
                                )?.isAdmin &&
                                  item?.user?.id !== user?.id && (
                                    <MoreMenuAdmin
                                      data={item}
                                      profileData={profileData}
                                    />
                                  )}
                              </div>
                            ) : (
                              profileData?.chatMembers?.find(
                                (item) => item?.user?.id === user?.id
                              )?.isAdmin && (
                                <MoreMenu
                                  data={item}
                                  profileData={profileData}
                                />
                              )
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
              revalidateCurrentChat={() =>
                revalidateCurrentChat(selectedChatId)
              }
              onClose={() => onClose()}
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

interface MenuProps {
  data?: any;
  profileData?: any;
}

const MoreMenu = ({ data, profileData }: MenuProps) => {
  const {
    revalidateChatProfileDetails,
    revalidateCurrentChat,
    reValidateGroupChat,
  } = useChatData();
  const { change } = useChange();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = async () => {
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
          const res = await change(`chat/member/${data?.id}`, {
            method: "DELETE",
          });
          if (res?.status !== 201) {
            Swal.fire(`Error`, "Something went wrong!", "error");
            return;
          }
          revalidateChatProfileDetails(profileData?.id);
          revalidateCurrentChat(profileData?.id);
          reValidateGroupChat();
          Swal.fire(`Success`, "Member removed!", "success");
          return;
        } catch (error) {
          if (error instanceof Error) {
            Swal.fire(`Error`, error?.message, `error`);
          } else {
            Swal.fire(`Error`, "Something Went Wrong", `error`);
          }
        } finally {
        }
      }
    });
  };

  const createAdmin = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to make admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await change(`chat/member/${profileData?.id}`, {
            body: {
              memberId: data?.user?.id,
              role: "admin",
            },
          });
          if (res?.status !== 201) {
            Swal.fire(`Error`, "Something went wrong!", "error");
            return;
          }
          revalidateChatProfileDetails(profileData?.id);
          reValidateGroupChat();
          revalidateCurrentChat(profileData?.id);
          Swal.fire(`Success`, "Created as admin", "success");
          return;
        } catch (error) {
          if (error instanceof Error) {
            Swal.fire(`Error`, error?.message, `error`);
          } else {
            Swal.fire(`Error`, "Something Went Wrong", `error`);
          }
        } finally {
        }
      }
    });
  };

  return (
    <div className="">
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
        <MenuItem onClick={() => createAdmin()}>Create Admin</MenuItem>
        <MenuItem onClick={() => handleRemove()}>Remove Member</MenuItem>
      </Menu>
    </div>
  );
};
const MoreMenuAdmin = ({ data, profileData }: MenuProps) => {
  const {
    revalidateChatProfileDetails,
    revalidateCurrentChat,
    reValidateGroupChat,
  } = useChatData();
  const { change } = useChange();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = async () => {
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
          const res = await change(`chat/member/${data?.id}`, {
            method: "DELETE",
          });
          if (res?.status !== 201) {
            Swal.fire(`Error`, "Something went wrong!", "error");
            return;
          }
          revalidateChatProfileDetails(profileData?.id);
          revalidateCurrentChat(profileData?.id);
          reValidateGroupChat();
          Swal.fire(`Success`, "Member removed!", "success");
          return;
        } catch (error) {
          if (error instanceof Error) {
            Swal.fire(`Error`, error?.message, `error`);
          } else {
            Swal.fire(`Error`, "Something Went Wrong", `error`);
          }
        } finally {
        }
      }
    });
  };

  const createAdmin = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to demote as user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await change(`chat/member/${profileData?.id}`, {
            body: {
              memberId: data?.user?.id,
              role: "user",
            },
          });
          if (res?.status !== 201) {
            Swal.fire(`Error`, "Something went wrong!", "error");
            return;
          }
          revalidateChatProfileDetails(profileData?.id);
          reValidateGroupChat();
          revalidateCurrentChat(profileData?.id);
          Swal.fire(`Success`, "Updated as user", "success");
          return;
        } catch (error) {
          if (error instanceof Error) {
            Swal.fire(`Error`, error?.message, `error`);
          } else {
            Swal.fire(`Error`, "Something Went Wrong", `error`);
          }
        } finally {
        }
      }
    });
  };

  return (
    <div className="">
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
        <MenuItem onClick={() => createAdmin()}>Dismiss as admin</MenuItem>
        <MenuItem onClick={() => handleRemove()}>Remove Member</MenuItem>
      </Menu>
    </div>
  );
};
