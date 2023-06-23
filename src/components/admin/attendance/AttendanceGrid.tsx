import { MoreHorizRounded, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Grid, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import ICONS from "assets/icons";
import { RenderIconRow } from "components/common";
import moment from "moment";
import Link from "next/link";
import { useState, MouseEvent } from "react";

interface ARRAY {
	id?: string;
}

interface Props {
	data?: ARRAY[];
}

const AttendanceGrid = ({ data }: Props) => {
	return (
		<div className="mt-6">
			<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
				{data?.map((item: any) => (
					<div key={item?.id}>
						<div className="h-full w-full bg-white shadow-xl rounded-2xl flex flex-col items-center gap-4 py-4 px-4 hover:scale-105 ease-in-out transition-all duration-150">
							<div className="w-full flex justify-between items-center">
								{/* <div className="flex gap-2 items-center"> */}
								<span
									className={`border-[1px] rounded-lg font-medium tracking-wide text-sm px-3 py-0.5 ${
										item?.status === "present"
											? `bg-emerald-200 text-green-600 border-green-500`
											: `bg-red-200 text-red-600 border-red-500`
									}`}
								>
									{item?.status === "present" ? `PRESENT` : `ABSENT`}
								</span>
								<MenuComponent id={item?.userId} />
								{/* </div> */}
							</div>
							<div className="h-16 w-16 overflow-hidden rounded-full shadow-xl">
								{item?.photo && (
									<img
										className="h-full w-full object-cover"
										src={item?.photo || DEFAULTPROFILE.src}
										alt="imgg"
									/>
								)}
								{!item?.photo ? (
									<div className="h-full w-full uppercase flex justify-center items-center text-4xl font-bold text-white bg-gradient-to-br from-theme-200 via-theme-50 to-secondary-200">
										{item?.name?.slice(0, 1)}
									</div>
								) : null}
							</div>
							<div>
								<p className="text-center font-semibold tracking-wide">
									{item?.name}
								</p>
								<span className="text-sm text-slate-500">
									<RenderIconRow value={item?.username} isEmail />
								</span>
							</div>
							<div className="w-full bg-slate-100 py-3 px-1 border-[1px] border-gray-200 rounded-lg">
								<p className="py-1 text-sm font-medium tracking-wide text-center">
									EID : {item?.employeeID}
								</p>
								{item?.status === "present" ? (
									<div className="flex justify-between items-center">
										<div className="w-1/2 py-2 px-2 flex flex-col gap-2 tracking-wide items-center">
											<div className="flex gap-2 items-center text-xs tracking-wide font-medium">
												<ICONS.Entry /> IN TIME
											</div>
											<span className="font-semibold text-slate-600 text-sm">
												{moment(item?.inTime).format("hh:mm A")}
											</span>
										</div>
										<div className="w-1/2 py-2 px-2 flex flex-col gap-2 tracking-wide items-center">
											<div className="flex gap-2 items-center text-xs tracking-wide font-medium ">
												<span className="text-red-500">
													<ICONS.Exit />
												</span>
												OUT TIME
											</div>
											<span className="font-semibold text-slate-600 text-sm">
												{moment(item?.outTime).format("hh:mm A")}
											</span>
										</div>
									</div>
								) : (
									<p className="text-center py-4">Employee is absent...</p>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AttendanceGrid;

interface Props {
	id?: any;
}

const MenuComponent = ({ id }: Props) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<IconButton onClick={handleClick}>
				<MoreHorizRounded />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
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
				<Link href={`/admin/employees/profile/${id}`}>
					<MenuItem onClick={handleClose}>
						<ListItemIcon>
							<RemoveRedEyeOutlined fontSize="small" />
						</ListItemIcon>
						Visit Profile
					</MenuItem>
				</Link>
			</Menu>
		</>
	);
};
