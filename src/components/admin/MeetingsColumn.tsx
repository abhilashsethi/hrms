import MaterialTable from "@material-table/core";
import {
	BorderColor,
	Delete,
	Info,
	KeyboardArrowDownRounded,
	MedicalInformationRounded,
	MeetingRoom,
	RadioButtonChecked,
} from "@mui/icons-material";
import {
	Avatar,
	Card,
	CardContent,
	Menu,
	MenuItem,
	Paper,
	Tooltip,
	Typography,
} from "@mui/material";
import { SAMPLEDP } from "assets/home";
import { HeadStyle } from "components/core";
import { useFetch } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useState, MouseEvent } from "react";
import { MuiTblOptions } from "utils";
import Swal from "sweetalert2";
import { useChange } from "hooks";

interface ARRAY {
	id?: string;
	title?: string;
	address?: string;
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

const MeetingsColumn = ({ data, mutate }: Props) => {
	const [isLeave, setIsLeave] = useState<boolean>(false);

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

	// const { data: meetingData, mutate, isLoading } = useFetch<any>(`meetings`);
	// // console.log(meetingData);

	const router = useRouter();

	return (
		<>
			<div className="mt-6">
				<MaterialTable
					components={{
						Container: (props) => <Paper {...props} elevation={5} />,
					}}
					title={<HeadStyle name="Meetings" icon={<MeetingRoom />} />}
					isLoading={!data}
					data={
						!data?.length
							? []
							: data?.map((_: any, i: number) => ({ ..._, sn: i + 1 }))
					}
					options={{
						...MuiTblOptions(),
					}}
					columns={[
						{
							title: "#",
							field: "sn",
							editable: "never",
							width: "2%",
						},
						{
							title: "Meeting Title",
							tooltip: "Meeting Title",
							searchable: true,
							field: "title",
						},
						{
							title: "Client Email",
							tooltip: "Client Email",
							searchable: true,
							field: "clientEmail",
						},
						{
							title: "Client Name",
							tooltip: "Client Name",
							searchable: true,
							field: "clientName",
						},
						{
							title: "Client Phone",
							tooltip: "Client Phone",
							searchable: true,
							field: "clientPhone",
						},
						{
							title: "Meeting Date",
							tooltip: "Meeting Date",
							searchable: true,
							field: "meetingDate",
							render: (data) => moment(data?.meetingDate).format("ll"),
						},
						{
							title: "Meeting Start Time",
							tooltip: "Meeting Start Time",
							searchable: true,
							field: "meetingStartTime",
							render: (data) => moment(data?.meetingStartTime).format("LT"),
						},
						{
							title: "Meeting End Time",
							tooltip: "MeetingEnd Time",
							searchable: true,
							field: "meetingEndTime",
							render: (data) => moment(data?.meetingEndTime).format("LT"),
						},
						{
							title: "Status",
							tooltip: "Status",
							field: "status",
							// render: (item) => <MeetingStatus />,
						},
						{
							title: "Created",
							field: "createdAt",
							render: (data) => moment(data?.createdAt).format("ll"),
							editable: "never",
						},
						{
							title: "Actions",
							cellStyle: {
								textAlign: "right",
							},
							export: true,
							// width: "18%",
							// field: "pick",
							render: (row) => (
								<>
									<div className="flex">
										<Tooltip title="Edit">
											<Avatar
												// onClick={() => setOpenAddCustomerDrawer(row)}
												onClick={() =>
													router.push(
														`/admin/meetings/meeting-details?id=${row?.id}`
													)
												}
												variant="rounded"
												className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-theme !p-0"
												sx={{
													mr: ".1vw",
													padding: "0px !important",
													backgroundColor: "Highlight",
													cursor: "pointer",
													color: "",
												}}
											>
												<Info sx={{ padding: "0px !important" }} />
											</Avatar>
										</Tooltip>
										<Tooltip title="Delete">
											<Avatar
												onClick={() => handleDelete(row?.id)}
												variant="rounded"
												className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-700 !p-0"
												sx={{
													mr: "0.1vw",
													padding: "0px !important",
													backgroundColor: "Highlight",
													cursor: "pointer",
													color: "",
												}}
											>
												<Delete sx={{ padding: "0px !important" }} />
											</Avatar>
										</Tooltip>
									</div>
								</>
							),
						},
					]}
					detailPanel={[
						{
							tooltip: "info",
							// icon: "info",
							// openIcon: "visibility",
							render: ({ rowData }) => (
								<>
									<div
										style={{
											padding: "12px",
											margin: "auto",
											backgroundColor: "#eef5f9",
										}}
									>
										<Card
											sx={{
												minWidth: 450,
												maxWidth: 500,
												transition: "0.3s",
												margin: "auto",
												borderRadius: "10px",
												boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
												"&:hover": {
													boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
												},
											}}
										>
											<CardContent>
												<Typography gutterBottom align="left">
													Location :
													<span
														style={{
															color: "rgb(30, 136, 229)",
															fontSize: "15px",
															wordBreak: "break-word",
															wordWrap: "break-word",
														}}
													>
														<iframe
															className="w-full py-2"
															src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.0498150250405!2d85.77649581162628!3d20.25676868112798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a740ae304117%3A0x629ce9db127f69ef!2sSearchingYard%20Software%20Group!5e0!3m2!1sen!2sin!4v1682685199057!5m2!1sen!2sin"
															loading="lazy"
															referrerPolicy="no-referrer-when-downgrade"
														></iframe>
														{/* <iframe
															className="w-full py-2"
															src={`https://maps.google.com/maps?q='+20.2961+','+85.8245+'&hl=es&z=14&amp;output=embed`}
															loading="lazy"
															referrerPolicy="no-referrer-when-downgrade"
														></iframe> */}
														{/* <iframe
															src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${rowData?.lat}!2d${rowData?.lng}!3d[Latitude]&output=embed`}
														></iframe> */}
													</span>
												</Typography>
												<Typography gutterBottom align="left">
													Purpose :
													<p
														style={{
															color: "rgb(30, 136, 229)",
															fontSize: "15px",
															wordBreak: "break-word",
															wordWrap: "break-word",
														}}
													>
														{rowData?.purpose}
													</p>
												</Typography>
											</CardContent>
										</Card>
									</div>
								</>
							),
						},
					]}
				/>
			</div>
		</>
	);
};

export default MeetingsColumn;

const MeetingStatus = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div>
			<button
				onClick={handleClick}
				className="flex gap-3 items-center bg-white px-4 py-1.5 rounded-full font-medium shadow-lg"
			>
				<span className="flex gap-2 items-center">
					<RadioButtonChecked fontSize="small" className="!text-blue-500" />
					Completed
				</span>
				<div>
					<KeyboardArrowDownRounded fontSize="small" />
				</div>
			</button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				{status?.map((item) => (
					<MenuItem
						key={item?.id}
						className="flex gap-2 items-center"
						onClick={handleClose}
					>
						{item?.icon}
						{item?.value}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};

const cards = [
	{ id: 1, title: "Today Presents", value: "12/20" },
	{ id: 2, title: "Planned Leaves", value: "8" },
	{ id: 3, title: "Unplanned Leaves", value: "0" },
	{ id: 4, title: "Pending Requests", value: "12" },
];

const data = [
	{
		id: 1,
		meetingTitle: "HRMS Meeting",
		startTime: "10:00 AM",
		endTime: "12:30 PM",
	},
];

const status = [
	{
		id: 1,
		value: "Completed",
		icon: <RadioButtonChecked fontSize="small" className="!text-blue-500" />,
	},
	{
		id: 2,
		value: "On Progress",
		icon: <RadioButtonChecked fontSize="small" className="!text-green-500" />,
	},
	{
		id: 3,
		value: "Cancelled",
		icon: <RadioButtonChecked fontSize="small" className="!text-red-500" />,
	},
];
