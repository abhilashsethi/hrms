import { Logout, Person, Settings } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { CHATICON, MAIL, NOTIFICATIONBELL } from "assets/home";
import { PhotoViewerSmall } from "components/core";
import { Public_FAV_ICON, Public_LOGO } from "config/env.config";
import {
  BASE_URL,
  useAuth,
  useChange,
  useChatData,
  useFCMToken,
  useMailData,
  useMenuItems,
  useNotificationData,
  useSocket,
} from "hooks";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Drawer from "./drawer";

type Props = {
  children: JSX.Element | JSX.Element[];
  title?: string;
};

type NewMessageCountType = {
  totalUnread: number;
};

const PanelLayout = ({ children, title = "YardOne" }: Props) => {
  const { user, setUser, validateUser, logout, syncUserState } = useAuth();
  const { connect, socketRef } = useSocket();
  const router = useRouter();
  const MenuItems: any = useMenuItems();
  const [isOpen, setIsOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { getUnreadChatCount, revalidateChatCount, selectedChatId } =
    useChatData();
  const { getUnreadMailCount, revalidateMailCount } = useMailData();
  const { getUnreadNotificationCount, revalidateNotificationCount } =
    useNotificationData();
  const { change } = useChange();
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const isMobileView = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768; // You can adjust the breakpoint as needed
    }
    return false;
  };

  useEffect(() => {
    // Check the screen width on initial load and set the drawer accordingly
    setIsOpen(!isMobileView());

    // Add a listener to update the drawer state when the window is resized
    const handleResize = () => {
      setIsOpen(!isMobileView());
    };
    window.addEventListener("resize", handleResize);

    return () => {
      // Remove the resize listener when the component unmounts
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    (async () => {
      const currentUser = await validateUser();
      if (!currentUser) return router.push(`/`);
      setUser(currentUser);
      //connect to socket
      connect();
      //fetch current chat count
      revalidateChatCount();
      revalidateMailCount(user?.id);
      revalidateNotificationCount();
    })();
  }, []);

  const handleUpdateMessageDelivered = async (chatId: string) => {
    try {
      await change(`chat/message-ack`, {
        BASE_URL,
        method: "POST",
        body: {
          chatId: chatId,
        },
      });
    } catch (error) {}
  };

  //listen to all the chat event upon receiving event update the chat count
  useEffect(() => {
    (() => {
      if (!user?.id || !socketRef || !selectedChatId) return;

      //after that emit the event user is connected
      socketRef?.emit("USER_CONNECT", { userId: user?.id });

      //get all the chat id that user currently present with
      user?.ChatMember?.map((item) => {
        return socketRef?.on(
          `MESSAGE_RECEIVED_${item?.chatGroupId}`,
          async () => {
            //call message delivered
            item?.chatGroupId &&
              (await handleUpdateMessageDelivered(item?.chatGroupId));
            revalidateChatCount();
          }
        );
      });
    })();
  }, [user, socketRef, selectedChatId]);

  useEffect(() => {
    (() => {
      if (!user?.id || !socketRef) return;
      syncUserState("ONLINE", user?.id, user?.isClient);

      socketRef?.emit("USER_CONNECT", {
        userId: user?.id,
      });

      window.addEventListener("beforeunload", () => {
        syncUserState("OFFLINE", user?.id as any, user?.isClient as any);
      });
    })();
  }, [user?.id, socketRef]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success", "Successfully logged out.", "success");
        logout();
        router.push(`/`);
      }
    });
  };

  useFCMToken(user?.id);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href={`${Public_FAV_ICON}`} />
        <meta
          name="description"
          content={`This App is a Streamline HR processes, optimize employee management, and enhance productivity with our innovative HR management system. Simplify HR tasks and empower your workforce for success.`}
        ></meta>

        <meta property="og:image" content={Public_LOGO} />
      </Head>
      <>
        <Drawer
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          role={user?.role?.name}
        />
        <main
          className={`min-h-screen bg-white ${
            isOpen
              ? "md:ml-[calc(100vw-calc(100vw-240px))] md:w-[calc(100vw-258px)] w-[calc(100vw-0px)]"
              : "md:ml-[calc(100vw-calc(100vw-72px))] md:w-[calc(100vw-72px)] w-[calc(100vw-58px)] ml-[calc(100vw-calc(100vw-55px))]"
          } dashboard-main `}
        >
          <header className={`h-16 bg-white`}>
            <div className="flex h-16 items-center md:justify-between justify-end px-4">
              <h1 className="lg:text-xl text-sm uppercase lg:block hidden font-semibold text-theme">
                {
                  MenuItems?.find(
                    (item: any) =>
                      item?.route ===
                      router?.pathname?.replace(
                        "[role]",
                        router?.query?.role as string
                      )
                  )?.title
                }
                {
                  MenuItems?.find((item: any) =>
                    item?.submenus?.find(
                      (submenus: any) =>
                        submenus?.route ===
                        router?.pathname?.replace(
                          "[role]",
                          router?.query?.role as string
                        )
                    )
                  )?.title
                }
                {MenuItems?.find((item: any) =>
                  item?.submenus?.find(
                    (submenus: any) =>
                      submenus.route ===
                      router?.pathname?.replace(
                        "[role]",
                        router?.query?.role as string
                      )
                  )
                )?.title ? (
                  <span> / </span>
                ) : (
                  <span> </span>
                )}
                {
                  MenuItems?.find((item: any) =>
                    item?.submenus?.find(
                      (submenus: any) =>
                        submenus.route ===
                        router?.pathname?.replace(
                          "[role]",
                          router?.query?.role as string
                        )
                    )
                  )?.submenus?.find(
                    (submenus: any) =>
                      submenus?.route ===
                      router?.pathname?.replace(
                        "[role]",
                        router?.query?.role as string
                      )
                  )?.title
                }
              </h1>
              <div className="flex items-center  gap-4">
                <div className="flex gap-4 items-center">
                  <Link href={"/admin/email"}>
                    <Tooltip title="Mails">
                      <Badge
                        badgeContent={
                          (getUnreadMailCount &&
                            (getUnreadMailCount > 99
                              ? "10+"
                              : getUnreadMailCount)) ||
                          undefined
                        }
                        color="warning"
                      >
                        <p className="cursor-pointer rounded-lg group bg-[#e7d0ff] hover:bg-white transition-all ease-in-out duration-200 md:p-2 p-1 shadow-md">
                          <img
                            className="md:h-5 h-7 object-contain group-hover:scale-105 transition-all ease-in-out duration-200"
                            src={MAIL.src}
                            alt=""
                          />
                        </p>
                      </Badge>
                    </Tooltip>
                  </Link>
                  <Link href={"/admin/chat"}>
                    <Tooltip title="Chats">
                      <Badge
                        badgeContent={
                          (getUnreadChatCount &&
                            (getUnreadChatCount > 99
                              ? "10+"
                              : getUnreadChatCount)) ||
                          undefined
                        }
                        color="warning"
                      >
                        <p className="cursor-pointer rounded-lg group bg-[#ffeb6b87] hover:bg-white transition-all ease-in-out duration-200 md:p-2 p-1 shadow-md">
                          <img
                            className="md:h-5 h-7 object-contain group-hover:scale-105 transition-all ease-in-out duration-200"
                            src={CHATICON.src}
                            alt=""
                          />
                        </p>
                      </Badge>
                    </Tooltip>
                  </Link>
                  <Link href={"/admin/notification"}>
                    <Tooltip title="Notifications">
                      <Badge
                        badgeContent={
                          (getUnreadNotificationCount &&
                            (getUnreadNotificationCount > 99
                              ? "99+"
                              : getUnreadNotificationCount)) ||
                          undefined
                        }
                        color="warning"
                      >
                        <p className="cursor-pointer group rounded-lg bg-[#bbcbff87] hover:bg-white transition-all ease-in-out duration-200 md:p-2 p-1 shadow-md">
                          <img
                            className="md:h-5 h-7 object-contain group-hover:scale-105 transition-all ease-in-out duration-200"
                            src={NOTIFICATIONBELL.src}
                            alt=""
                          />
                        </p>
                      </Badge>
                    </Tooltip>
                  </Link>
                </div>
                <Tooltip title="Profile">
                  <div className="flex w-fit  items-center justify-start gap-2 overflow-hidden bg-white">
                    <div
                      onClick={handleClick}
                      className="flex gap-2 items-center cursor-pointer"
                    >
                      <PhotoViewerSmall
                        size="2rem"
                        photo={user?.photo}
                        name={user?.name}
                      />
                      <div className="hidden md:block">
                        <h1 className="text-sm">{user?.name}</h1>
                        <h1 className="text-sm font-light">{user?.username}</h1>
                      </div>
                    </div>
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 40,
                            height: 40,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem>
                        <Avatar src={user?.photo || " "} alt={user?.name} />
                        <ListItemText
                          primary={`${user?.name}`}
                          secondary={user?.username}
                        />
                      </MenuItem>
                      <Divider />
                      <Link
                        href={
                          user?.role?.name === "CEO"
                            ? `/admin/change-password`
                            : `/admin/change-password`
                        }
                      >
                        <MenuItem>
                          <ListItemIcon>
                            <Settings fontSize="small" />
                          </ListItemIcon>
                          Settings
                        </MenuItem>
                      </Link>
                      <Link
                        href={
                          user?.isClient
                            ? `/admin/clients/client-profile?id=${user?.id}`
                            : `/admin/employees/my-profile`
                        }
                      >
                        <MenuItem>
                          <ListItemIcon>
                            <Person fontSize="small" />
                          </ListItemIcon>
                          Profile
                        </MenuItem>
                      </Link>
                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                </Tooltip>
              </div>
            </div>
          </header>
          <section className="min-h-screen bg-gradient-to-b from-slate-100 to-white">
            {children}
          </section>
        </main>
      </>
    </>
  );
};

export default PanelLayout;
