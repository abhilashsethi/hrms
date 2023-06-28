import {
	BorderColor,
	Business,
	Delete,
	Download,
	Email,
	Person,
} from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { QUOTATION } from "assets/home";
import { PhotoViewerGuests } from "components/core";
import { useChange } from "hooks";
import { MouseEvent, useState } from "react";
import Swal from "sweetalert2";

interface ARRAY {
	id?: string;
	address?: string;
	title?: string;
	clientEmail?: string;
	clientName?: string;
	clientPhone?: string;
	meetingDate?: string;
	meetingEndTime?: string;
	meetingStartTime?: string;
	meetingPersonName?: string;
	status?: string;
	purpose?: string;
}
interface Props {
	data?: ARRAY[];
	mutate?: any;
}

const QuotationGrid = ({ data, mutate }: Props) => {
	const [isUpdate, setisUpdate] = useState<{
		dialogue?: boolean;
		id?: string | null;
	}>({ dialogue: false, id: null });

	return (
		<>
			<div className="grid py-4 gap-6 lg:grid-cols-3">
				{projectData?.map((items: any) => (
					<div className="relative w-full rounded-xl flex space-y-4 flex-col gap-2 tracking-wide shadow-xl">
						<CardComponent items={items} mutate={mutate} />
						<div className="relative">
							<p className="absolute top-2 z-50 rounded-r-xl bg-green-500 text-white text-sm px-2 pr-3 py-1 font-semibold">
								Accepted
							</p>
							<div className="absolute right-0 rounded-tl-lg top-24 z-50 bg-gradient-to-r from-rose-100 to-teal-100 p-2">
								<div className="flex">
									<Tooltip title="Edit">
										<Avatar
											variant="rounded"
											className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-yellow-500 !p-0"
											sx={{
												mr: ".1vw",
												padding: "0px !important",
												backgroundColor: "Highlight",
												cursor: "pointer",
												color: "",
												width: 30,
												height: 30,
											}}
										>
											<BorderColor
												sx={{ padding: "0px !important" }}
												fontSize="small"
											/>
										</Avatar>
									</Tooltip>
									<Tooltip title="Delete">
										<Avatar
											variant="rounded"
											className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-500 !p-0"
											sx={{
												mr: "0.1vw",
												padding: "0px !important",
												backgroundColor: "Highlight",
												cursor: "pointer",
												color: "",
												width: 30,
												height: 30,
											}}
										>
											<Delete
												sx={{ padding: "0px !important" }}
												fontSize="small"
											/>
										</Avatar>
									</Tooltip>
								</div>
							</div>
							<div className="flex justify-center bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 py-3 rounded-t-lg w-full">
								<img src={QUOTATION.src} alt="" className="w-24" />
							</div>
							<div className="px-4 bg-gradient-to-r from-rose-100 to-teal-100">
								<div className="flex gap-2 py-2 md:py-0 justify-center">
									<p className="text-sm md:text-sm text-gray-700">
										<span>
											<Person className=" text-gray-500 mr-1" />
										</span>
										Bernard Ellison
									</p>
								</div>
								<div className="flex gap-2 py-2 md:py-0 justify-center">
									<p className="text-sm md:text-sm text-gray-700">
										<span>
											<Email className=" text-gray-500 mr-1" fontSize="small" />
										</span>
										bernard@gmail.com
									</p>
								</div>
								<div className="flex gap-2 py-2 md:py-0 justify-center">
									<p className="text-sm md:text-sm text-gray-700">
										<span>
											<Business className="text-gray-500 mr-1" />
										</span>
										33 Malcolm Rd, Llanfihangel-nant-melan
									</p>
								</div>
								<div className="mt-3 flex flex-col items-center justify-center">
									<div className="flex items-center gap-2 py-2 md:py-0">
										<p className="font-semibold text-base text-blue-600">
											Quotation Title :
										</p>
										<p className="text-sm md:text-base text-gray-700">
											Yard ERP
										</p>
									</div>
									<div className="flex items-center gap-2 py-2 md:py-0">
										<p className="font-semibold text-base text-blue-600">
											Date :
										</p>
										<p className="text-sm md:text-base text-gray-700">
											20/06/2023
										</p>
									</div>
									<div className="flex items-center gap-2 py-2 md:py-0">
										<p className="font-semibold text-base text-blue-600">
											Quotation Number :
										</p>
										<p className="text-sm md:text-base text-gray-700">
											SY202306043QU{" "}
										</p>
									</div>

									<div className="flex items-center justify-center gap-2 py-2 md:py-0">
										<p className="font-semibold text-base text-blue-600">
											Cost (IN INR){" "}
										</p>
										<p className="text-sm text-gray-700">1,20,000/-</p>
									</div>
								</div>
								<div className="flex items-center justify-center py-4">
									<button className="border border-blue-600 hover:bg-blue-600 hover:text-white text-sm hover:font-semibold text-blue-600 px-7 py-1 rounded-md ease-in-out transition-all duration-300">
										<span>
											<Download />
										</span>
										Download Quotation
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default QuotationGrid;

const CardComponent = ({ items, mutate }: any) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const { change } = useChange();
	const handleDelete = (id: string) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You want to delete!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			try {
				if (result.isConfirmed) {
					Swal.fire(`Info`, "It will take some time", "info");
					const response = await change(`meetings/${id}`, {
						method: "DELETE",
					});
					if (response?.status !== 200) {
						Swal.fire("Error", "Something went wrong!", "error");
					}
					Swal.fire("Success", "Deleted successfully!", "success");
					mutate();
				}
			} catch (error) {
				console.log(error);
			}
		});
	};

	return (
		<>
			{/* <div className="absolute right-[10px] top-[10px]">
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
				<Link href={`/admin/meetings/meeting-details?id=${items?.id}`}>
					<MenuItem onClick={handleClose}>
						<ListItemIcon>
							<Info fontSize="small" />
						</ListItemIcon>
						Details
					</MenuItem>
				</Link>
				<MenuItem onClick={() => handleDelete(items?.id)}>
					<ListItemIcon>
						<DeleteRounded fontSize="small" />
					</ListItemIcon>
					Delete
				</MenuItem>
			</Menu>
		</div> */}
		</>
	);
};

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
