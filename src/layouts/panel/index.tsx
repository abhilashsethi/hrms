import {
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Logout, Settings } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import Drawer from "./drawer";
import Swal from "sweetalert2";
import { useMenuItems } from "hooks";
import useAuth from "hooks/useAuth";
import ICONS from "assets/icons";
import { DEFAULTIMG } from "assets/home";
type Props = {
  children: JSX.Element | JSX.Element[];
  title?: string;
};
const PanelLayout = ({ children, title = "Junion" }: Props) => {
  const { user, setUser } = useAuth();
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
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
    }
    if (storedUser) {
      setUser?.(JSON.parse(storedUser));
    }
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
        setUser?.({});
        router.push(`/login`);
      }
    });
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon2.png" />
      </Head>
      <>
        <Drawer
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          role={
            router?.query?.role?.toString()?.toUpperCase() as
              | "ADMIN"
              | "MANAGER"
          }
        />
        <main
          className={`min-h-screen bg-white ${
            isOpen
              ? "ml-[calc(100vw-calc(100vw-240px))] w-[calc(100vw-258px)]"
              : "ml-[calc(100vw-calc(100vw-72px))] w-[calc(100vw-72px)]"
          } dashboard-main `}
        >
          <header className={`h-16 bg-white`}>
            <div className="flex h-16 items-center justify-between px-4">
              <h1 className="lg:text-xl text-sm uppercase lg:block font-semibold text-black">
                {/* {user?.role === "MANAGER" ? `${user?.role} / ` : ""} */}
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
              <div className="flex items-center gap-6">
                {/* <Badge badgeContent={4} color="warning"> */}
                <Link
                  href={
                    user?.role === "STUDENT"
                      ? "/panel/student/notifications"
                      : user?.role === "ADMIN"
                      ? "/panel/admin/notifications"
                      : user?.role === "AMBASSADOR" ||
                        "FACULTY" ||
                        "MANAGER" ||
                        "UNIVERSITY_STUDENT"
                      ? "/panel/user/notifications"
                      : "/"
                  }
                >
                  <p className="cursor-pointer rounded-lg bg-theme p-2 shadow-md">
                    <ICONS.Notification className="h-6 w-6 text-white" />
                  </p>
                </Link>
                {/* </Badge> */}

                <div className="flex w-fit min-w-[8rem]  items-center justify-start gap-2 overflow-hidden rounded-full bg-white">
                  <Avatar
                    src=""
                    className="cursor-pointer !bg-theme"
                    onClick={handleClick}
                  />
                  <span
                    className="flex cursor-pointer flex-col gap-1"
                    onClick={handleClick}
                  >
                    <h2 className="cursor-pointer text-lg font-medium tracking-wide text-black">
                      Profile
                    </h2>
                    {/* <h5 className="text-xs font-medium tracking-wide text-black">
                    superadmin@gmail.com
                  </h5> */}
                  </span>
                  {/* <Chip
                className=''
            onClick={handleClick}
            avatar={<Avatar alt="" src="" />}
            label="Profile"
            variant="outlined"
          /> */}
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
                      <Avatar
                        src={user?.avatar || DEFAULTIMG.src}
                        alt={user?.name}
                      />
                      <ListItemText
                        primary={`${user?.name}`}
                        secondary={user?.email}
                      />
                    </MenuItem>
                    <Divider />
                    {/* {user?.role !== "ADMIN" ? (
                      <MenuItem>
                        <ListItemIcon>
                          <LocalGroceryStore fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Store Name: ${
                            user?.store?.displayName
                              ? user?.store?.displayName
                              : "Not Assigned"
                          }`}
                          secondary={`Store Email: ${
                            user?.store?.email
                              ? user?.store?.email
                              : "Not Assigned"
                          } `}
                        />{" "}
                      </MenuItem>
                    ) : null} */}
                    <Link
                      href={
                        user?.role === "ADMIN"
                          ? `/panel/admin/change-password`
                          : user?.role === "STUDENT"
                          ? `/panel/student/change-password`
                          : user?.role === "AMBASSADOR" ||
                            "FACULTY" ||
                            "MANAGER" ||
                            "UNIVERSITY_STUDENT"
                          ? `/panel/user/change-password`
                          : `/panel/admin/change-password`
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
              </div>
            </div>
          </header>
          {children}
        </main>
      </>
      {/* )} */}
    </>
  );
};

export default PanelLayout;
