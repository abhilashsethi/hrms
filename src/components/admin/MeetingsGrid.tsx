import {
	AccessTime,
	DeleteRounded,
	EditRounded,
	Info,
	MoreVertRounded,
	Place,
} from "@mui/icons-material";
import {
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Tooltip,
} from "@mui/material";
import { SAMPLEDP } from "assets/home";
import Link from "next/link";
import { MouseEvent, useState } from "react";

const MeetingsGrid = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const [isUpdate, setisUpdate] = useState<{
		dialogue?: boolean;
		id?: string | null;
	}>({ dialogue: false, id: null });
	return (
		<>
			<div className="grid py-4 gap-6 lg:grid-cols-3">
				{projectData?.map((items: any) => (
					<div className="relative py-4 bg-white w-full rounded-xl flex space-y-4 flex-col gap-2 tracking-wide shadow-xl">
						<div className="absolute right-[10px] top-[10px]">
							<Tooltip title="More">
								<IconButton onClick={handleClick}>
									<MoreVertRounded />
								</IconButton>
							</Tooltip>
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
											mr: "15th June 2021",
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
								<Link href="/admin/meetings/meeting-details">
									<MenuItem onClick={handleClose}>
										<ListItemIcon>
											<Info fontSize="small" />
										</ListItemIcon>
										Details
									</MenuItem>
								</Link>
								<MenuItem onClick={handleClose}>
									<ListItemIcon>
										<DeleteRounded fontSize="small" />
									</ListItemIcon>
									Delete
								</MenuItem>
							</Menu>
						</div>
						<div className="px-4">
							<div className="flex justify-between items-center">
								<span className="py-1 pr-4 text-xl font-semibold capitalize tracking-wide">
									{items?.name}
								</span>
							</div>
							<div className="py-1 group flex items-center gap-x-2 tracking-wide">
								<AccessTime />
								<span>{items?.startLine}</span>
								<div
									className={`text-xs ${
										items?.status === "Completed"
											? "bg-[#44bd44]"
											: items?.status === "On Progress"
											? "bg-amber-500"
											: "bg-red-500"
									} text-white p-1 rounded-md font-semibold px-2 ml-10`}
								>
									{items?.status}
								</div>
							</div>
							<div className="py-2 text-lg tracking-wide">
								<span className="text-md font-medium">Purpose :</span>
								<p>{items?.description}</p>
							</div>
							<div className=" group flex items-center py-2 text-md tracking-wide text-lg">
								<Place />
								<span className="text-md font-medium">Location :</span>
							</div>
							<iframe
								className="w-full py-2"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.0498150250405!2d85.77649581162628!3d20.25676868112798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a740ae304117%3A0x629ce9db127f69ef!2sSearchingYard%20Software%20Group!5e0!3m2!1sen!2sin!4v1682685199057!5m2!1sen!2sin"
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							></iframe>
							<div className="flex gap-2 py-2 justify-center">
								<div className="text-md hover:scale-105 ease-in-out transition-all duration-200 rounded-lg shadow-lg border-2 px-10 py-2 grid justify-items-center">
									<h1 className="text-md pb-2 font-semibold">Client</h1>
									<img
										alt=""
										className="self-center flex-shrink-0 w-24 h-24 bg-center bg-cover rounded-full bg-gray-500"
										src={SAMPLEDP.src}
									/>
									<span className="text-sm pt-2 text-slate-400 font-medium">
										{items?.client}
									</span>
								</div>
								<div className="text-md hover:scale-105 ease-in-out transition-all duration-200 rounded-lg shadow-lg border-2 px-10 py-2 grid justify-items-center">
									<h1 className="text-md pb-2 font-semibold">Member</h1>
									<img
										alt=""
										className="self-center flex-shrink-0 w-24 h-24 bg-center bg-cover rounded-full bg-gray-500"
										src={SAMPLEDP.src}
									/>
									<span className="text-sm pt-2 text-slate-400 font-medium">
										{items?.member}
									</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default MeetingsGrid;

const projectData = [
	{
		name: "Kendriya Vidyalaya",
		startLine: "10:00 AM - 12:00 PM",
		description: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. ",
		photo: "https://source.unsplash.com/100x100/?portrait?30",
		mode: "Virtual",
		client: "John Done",
		longitude: "https://source.unsplash.com/100x100/?portrait?300",
		latitude: "https://source.unsplash.com/100x100/?portrait?300",
		memberPhoto: "https://source.unsplash.com/100x100/?portrait?300",
		member: "Srinu Ready",
		status: "Completed",
	},
	{
		name: "Trident Academy",
		startLine: "10:00 AM - 12:00 PM",
		description:
			" Lorem ipsum dolor sit, amet consectetur ipsum dolor sit, amet consectetur adipisicing elit. ",
		mode: "Virtual",
		photo: "https://source.unsplash.com/100x100/?portrait?20",
		memberPhoto: "https://source.unsplash.com/100x100/?portrait?200",
		client: "John Done",
		member: "Srinu Ready",
		longitude: "https://source.unsplash.com/100x100/?portrait?300",
		latitude: "https://source.unsplash.com/100x100/?portrait?300",
		status: "On Progress",
	},
	{
		name: "KIIT University",
		startLine: "10:00 AM - 12:00 PM",
		description: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. ",
		mode: "Physical",
		photo: "https://source.unsplash.com/100x100/?portrait?10",
		memberPhoto: "https://source.unsplash.com/100x100/?portrait?28",
		client: "John Done",
		member: "Srinu Ready",
		longitude: "https://source.unsplash.com/100x100/?portrait?300",
		latitude: "https://source.unsplash.com/100x100/?portrait?300",
		status: "Cancelled",
	},
];
