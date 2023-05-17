import MaterialTable from "@material-table/core";
import {
	KeyboardArrowDownRounded,
	MedicalInformationRounded,
	MeetingRoom,
	RadioButtonChecked,
} from "@mui/icons-material";
import {
	Card,
	CardContent,
	Menu,
	MenuItem,
	Paper,
	Typography,
} from "@mui/material";
import { SAMPLEDP } from "assets/home";
import { HeadStyle } from "components/core";
import { useFetch } from "hooks";
import { useState, MouseEvent } from "react";
import { MuiTblOptions } from "utils";

const MeetingsColumn = () => {
	const [isLeave, setIsLeave] = useState<boolean>(false);

	const { data: meetingData, mutate, isLoading } = useFetch<any>(`meetings`);
	// console.log(meetingData);

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
							field: "meetingTitle",
						},
						{
							title: "Start Time",
							tooltip: "Start Time",
							searchable: true,
							field: "startTime",
						},
						{
							title: "End Time",
							tooltip: "End Time",
							searchable: true,
							field: "endTime",
						},
						{
							title: "Status",
							tooltip: "Status",
							field: "status",
							render: (item) => <MeetingStatus />,
						},
						{
							title: "Created",
							field: "createdAt",
							render: (data) => new Date().toDateString(),
							editable: "never",
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
													</span>
												</Typography>
												<Typography gutterBottom align="left">
													Description :
													<p
														style={{
															color: "rgb(30, 136, 229)",
															fontSize: "15px",
															wordBreak: "break-word",
															wordWrap: "break-word",
														}}
													>
														Lorem ipsum dolor sit amet consectetur adipisicing
														elit. Recusandae, asperiores!
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
