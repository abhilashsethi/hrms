import {
	ChevronLeft,
	ExitToApp,
	ExpandLessRounded,
	ExpandMoreRounded,
} from "@mui/icons-material";
import {
	Box,
	Button,
	Collapse,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tooltip,
	Typography,
} from "@mui/material";
import { LOGO } from "assets";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import Swal from "sweetalert2";
import ICONS from "../../../assets/icons";
import { useMenuItems, useAuth } from "hooks";

import { CustomDrawer, CustomDrawerHeader } from "./custom";

type DrawerType = {
	onToggle?: () => void;
	open?: boolean;
	role?: string;
};

const Drawer = ({ open, onToggle, role }: DrawerType) => {
	const router = useRouter();
	const { setUser } = useAuth();
	const [selectedSubMenu, setSelectedSubMenu] = useState("");
	const MenuItems = useMenuItems();
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
		<section className="dashboard-main">
			<CustomDrawer variant="permanent" open={open}>
				<CustomDrawerHeader>
					<div className="flex h-16 w-full items-center justify-between my-2">
						<div className="flex justify-center">
							<img
								src={LOGO.src}
								alt=""
								className={`${
									open ? "h-12 w-[80%]  object-contain" : "hidden"
								}`}
							/>
						</div>
						<IconButton onClick={onToggle}>
							{open ? <ChevronLeft /> : <ICONS.Menu className="" />}
						</IconButton>
					</div>
				</CustomDrawerHeader>
				{/* <Divider /> */}
				{/* Render Menu Items */}

				<List sx={{ mt: "1px" }} className="super-bold-drawer-font">
					{MenuItems?.map((item: any) => (
						<Fragment key={item?.key}>
							<Tooltip
								title={item?.title}
								followCursor
								arrow
								placement="top-end"
							>
								<ListItemButton
									onClick={() => {
										if (item?.route) return router?.push(item?.route);
										item?.submenus &&
											setSelectedSubMenu((prev) =>
												prev === item?.key ? "" : item?.key
											);
									}}
									className={
										router.asPath === item?.route
											? "!rounded-r-[25px] !bg-theme !text-white !font-bold "
											: "!text-black !font-bold"
									}
									selected={
										item?.submenus
											? selectedSubMenu === item?.key
											: router?.asPath === item?.route
									}
								>
									<ListItemIcon
										className={
											router.asPath === item?.route ? " !text-white" : ""
										}
										sx={{
											minWidth: "32px",
											background: "transparent",
										}}
									>
										{item?.icon}
									</ListItemIcon>
									{open && (
										<ListItemText>
											<Typography
												variant="body1"
												fontFamily={'Montserrat", sans-serif'}
												fontWeight={600}
												className="!font-semibold"
											>
												{item?.title}
											</Typography>
										</ListItemText>
									)}
									{item?.submenus &&
										(selectedSubMenu === item?.key ? (
											<ExpandLessRounded />
										) : (
											<ExpandMoreRounded />
										))}
								</ListItemButton>
							</Tooltip>
							{item?.submenus && (
								<Collapse
									in={selectedSubMenu === item?.key}
									timeout="auto"
									unmountOnExit
								>
									<List component="div" disablePadding>
										{item?.submenus?.map((submenu: any) => (
											<ListItemButton
												onClick={() => router.push(submenu?.route)}
												sx={{ pl: 4 }}
												selected={router?.pathname === submenu?.route}
												key={submenu?.key}
												className={
													router.asPath === submenu?.route
														? "!bg-theme !text-white"
														: ""
												}
											>
												<ListItemIcon
													sx={{
														minWidth: "42px",
														background: "transparent",
													}}
													className={
														router?.asPath === submenu?.route
															? "  !text-white"
															: ""
													}
												>
													{submenu?.icon}
												</ListItemIcon>

												{open && (
													<ListItemText
														// primary={submenu?.title}
														sx={{
															whiteSpace: "break-spaces",
														}}
													>
														<Typography
															variant="body2"
															fontFamily={'Montserrat", sans-serif'}
															className="!font-semibold"
														>
															{submenu?.title}
														</Typography>
													</ListItemText>
												)}
											</ListItemButton>
										))}
									</List>
								</Collapse>
							)}
						</Fragment>
					))}

					<Box hidden={open}>
						<Tooltip
							title={"Click Here To Logout"}
							followCursor
							arrow
							placement="top-end"
						>
							<ListItemButton>
								<ListItemIcon>
									<ExitToApp />
								</ListItemIcon>
								<ListItemText primary={"Logout"} />
							</ListItemButton>
						</Tooltip>
					</Box>
				</List>
				<Box
					sx={{ textAlign: "center" }}
					className={`${
						open ? "flex" : "hidden"
					} flex-col items-center gap-2 pt-5`}
				>
					<div className="py-5">
						<Button
							onClick={handleLogout}
							variant="contained"
							startIcon={<ExitToApp />}
							color="error"
							className="!bg-theme"
						>
							Logout
						</Button>
					</div>
				</Box>
			</CustomDrawer>
		</section>
	);
};

export default Drawer;
