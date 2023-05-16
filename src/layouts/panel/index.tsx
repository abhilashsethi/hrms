import { Logout, Settings } from "@mui/icons-material";
import {
  Avatar,
  Chip,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import ICONS from "assets/icons";
import { useAuth, useMenuItems } from "hooks";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Drawer from "./drawer";
import { NOTIFICATIONBELL } from "assets/home";
import { PhotoViewerSmall } from "components/core";
type Props = {
  children: JSX.Element | JSX.Element[];
  title?: string;
};
const PanelLayout = ({ children, title = "HR MS - SearchingYard" }: Props) => {
  const { user, setUser, validateUser, logout } = useAuth();
  const router = useRouter();
  const MenuItems: any = useMenuItems();
  const [isOpen, setIsOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    (async () => {
      const currentUser = await validateUser();
      if (!currentUser) return router.push(`/login`);
      setUser(currentUser);
    })();
  }, []);

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
        router.push(`/login`);
      }
    });
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicone.ico" />
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
              ? "md:ml-[calc(100vw-calc(100vw-240px))] md:w-[calc(100vw-258px)] w-[calc(100vw-72px)]"
              : "md:ml-[calc(100vw-calc(100vw-72px))] md:w-[calc(100vw-72px)] w-[calc(100vw-58px)] ml-[calc(100vw-calc(100vw-55px))]"
          } dashboard-main `}
        >
          <header className={`h-16 bg-white`}>
            <div className="flex h-16 items-center justify-between px-4">
              <h1 className="lg:text-xl text-sm uppercase lg:block font-semibold text-theme">
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
              <div className="flex items-center gap-3">
                <Link
                  href={
                    user?.role?.name === "CEO"
                      ? "/admin"
                      : user?.role?.name === "HR"
                      ? "/admin"
                      : "/"
                  }
                >
                  <Tooltip title="Notifications">
                    <p className="cursor-pointer rounded-lg bg-[#bbcbff87] p-2 shadow-md">
                      <img
                        className="h-5 object-contain"
                        src={NOTIFICATIONBELL.src}
                        alt=""
                      />
                    </p>
                  </Tooltip>
                </Link>
                <Tooltip title="Profile">
                  <div className="flex w-fit  items-center justify-start gap-2 overflow-hidden bg-white">
                    {/* <Chip
                      className=""
                      onClick={handleClick}
                      avatar={<Avatar alt="" src="" />}
                      label="Profile"
                      variant="outlined"
                    /> */}
                    <div
                      onClick={handleClick}
                      className="flex gap-2 items-center cursor-pointer"
                    >
                      <PhotoViewerSmall size="2rem" photo={user?.photo} />
                      <div className="hidden md:block">
                        <h1 className="text-sm">{user?.name}</h1>
                        <h1 className="text-sm font-light">{user?.email}</h1>
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
                          secondary={user?.email}
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
