import { HeadStyle, IOSSwitch, Loader, RoleComponent } from "components/core";
import {
	Article,
	Event,
	EventAvailable,
	Info,
	InfoOutlined,
	PeopleRounded,
	Receipt,
	Tag,
} from "@mui/icons-material";
import { MuiTblOptions, getDataWithSL } from "utils";
import { RenderIconRow } from "components/common";
import MaterialTable from "@material-table/core";
import { useChange } from "hooks";
import Swal from "sweetalert2";
import { useState } from "react";
import {
	Autocomplete,
	Avatar,
	Card,
	Menu,
	MenuItem,
	Modal,
	TextField,
	Tooltip,
} from "@mui/material";
import { DEFAULTIMG } from "assets/home";
interface ARRAY {
	id?: string;
}
interface Props {
	data?: ARRAY[];
	mutate?: any;
}

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	// height: 600,
	bgcolor: "background.paper",
	// border: "2px solid #000",
	borderRadius: "10px",
	boxShadow: 24,
	p: 4,
};

const AllLeaveRequests = ({ data, mutate }: Props) => {
	const { change, isChanging } = useChange();
	const handleBlock = async (e: any, userId: string) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You want to update status?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, update!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const res = await change(`users/${userId}`, {
					method: "PATCH",
					body: { isBlocked: !e.target?.checked },
				});
				mutate();
				if (res?.status !== 200) {
					Swal.fire(`Error`, "Something went wrong!", "error");
					return;
				}
				Swal.fire(`Success`, "Status updated successfully!", "success");
				return;
			}
		});
	};

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const [openInfoModal, setOpenInfoModal] = useState(false);
	const handleInfoOpen = () => {
		setOpenInfoModal(true);
	};
	const handleInfoCloseModal = () => setOpenInfoModal(false);

	const [tabelData, setTabelData] = useState([
		{
			Id: "1",
			name: "Ashutosh Mohapatra",
			email: "ashutosh@gmail.com",
			leaveType: "Casual Leave",
			leaveFrom: "05/05/2023",
			leaveTo: "14/05/2023",
			days: "10",
			reason: "personal",
			createdAt: "02 May, 2023",
		},
	]);

	return (
		<section className="mt-8">
			<Modal
				open={openInfoModal}
				onClose={handleInfoCloseModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Card
					sx={style}
					className="dashboard-card-shadow w-[50%] border-t-4 border-b-4 border-t-theme border-b-theme !p-6"
				>
					<div className="flex items-center gap-3">
						<div className="h-20 w-20 rounded-full overflow-hidden shadow-xl">
							<div className="bg-slate-200 h-full w-full">
								<img
									className="h-full w-full object-cover"
									src={"/manager.png"}
									alt=""
								/>
							</div>
						</div>
						<div className="font-semibold">
							{" "}
							Asutosh Mohapatra{" "}
							<span className="font-medium text-xs text-white rounded-md p-[1px] border border-green-500 bg-green-500">
								CEO
							</span>
						</div>
					</div>
					<div className="pt-3 flex flex-col gap-7">
						<div className="flex items-center gap-4">
							<Tooltip title="Leave Type">
								<Receipt className="text-gray-500" />
							</Tooltip>{" "}
							<p className="font-semibold">Medical Leave</p>
						</div>
						<div className="flex items-center gap-4">
							<Tooltip title="Leave From">
								<Event className="text-gray-500" />
							</Tooltip>{" "}
							<p className="font-semibold">05/05/2023</p>
						</div>
						<div className="flex items-center gap-4">
							<Tooltip title="Leave To">
								<EventAvailable className="text-gray-500" />
							</Tooltip>{" "}
							<p className="font-semibold">14/05/2023</p>
						</div>
						<div className="flex items-center gap-4">
							<Tooltip title="No.of days">
								<Tag className="text-gray-500" />
							</Tooltip>
							<p className="font-semibold">10</p>
						</div>
						<div className="flex items-center gap-4">
							<Tooltip title="Status">
								<InfoOutlined className="text-gray-500" />
							</Tooltip>
							<p className="font-semibold">Accepted</p>
						</div>
						<div className="flex items-center gap-4">
							<Tooltip title="Reason">
								<Article className="text-gray-500" />
							</Tooltip>{" "}
							<p className="font-semibold">
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Necessitatibus perspiciatis aliquid nam provident soluta enim,
								sunt consectetur corrupti beatae assumenda unde iure omnis totam
								possimus deleniti. Eos quam aut voluptates?
							</p>
						</div>
					</div>
				</Card>
			</Modal>
			<MaterialTable
				title={<HeadStyle name="All Leave Requests" icon={<PeopleRounded />} />}
				isLoading={!data}
				// data={data ? getDataWithSL<any>(data) : []}
				data={tabelData}
				options={{ ...MuiTblOptions(), selection: true }}
				columns={[
					{
						title: "#",
						field: "sl",
						editable: "never",
						width: "2%",
					},
					{
						title: "Name",
						tooltip: "Name",
						field: "name",
						editable: "never",
					},
					{
						title: "Email",
						tooltip: "Email",
						field: "email",
						editable: "never",
					},
					{
						title: "Leave Type",
						field: "leaveType",
						emptyValue: "Not Provided",
						editable: "never",
					},
					{
						title: "Leave From",
						field: "leaveFrom",
						emptyValue: "Not Provided",
						editable: "never",
					},
					{
						title: "Leave To",
						field: "leaveTo",
						emptyValue: "Not Provided",

						editable: "never",
					},
					{
						title: "No Of Days",
						field: "days",
						emptyValue: "Not Provided",
						editable: "never",
					},
					{
						title: "Details",
						export: true,
						render: (row) => (
							<>
								{console.log(row)}
								<div className="flex">
									<Tooltip title="Info">
										<Avatar
											onClick={() => handleInfoOpen()}
											variant="rounded"
											className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-blue-700 !p-0"
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
								</div>
							</>
						),
					},
					{
						title: "Status",
						editable: "never",
						render: (row) => (
							<>
								{console.log(row)}
								<div className="flex">
									<Autocomplete
										disablePortal
										id="combo-box-demo"
										options={[{ label: "Accept" }, { label: "Reject" }]}
										sx={{ width: 140 }}
										renderInput={(params) => (
											<TextField {...params} label="Leave Status" />
										)}
									/>
								</div>
							</>
						),
					},
					{
						title: "Reason",
						field: "reason",
						emptyValue: "Not Provided",
						editable: "never",
					},

					{
						title: "Created",
						field: "createdAt",
						// render: (data) => new Date(data.createdAt).toDateString(),
						editable: "never",
					},
				]}
				// onRowDoubleClick={(e, rowData) =>
				//   push(`/admin/attendances/user/${rowData?.id}`)
				// }

				editable={{
					onRowDelete: async (oldData) => {
						const res = await change(`users/${oldData}`, {
							method: "DELETE",
						});
						if (res?.status !== 200) {
							Swal.fire(`Error`, "Something went wrong!", "error");
							return;
						}
						Swal.fire(`Success`, "Deleted Successfully!", "success");
						mutate();
						return;
					},
					onRowUpdate: async (newData: any) => {
						const res = await change(`users/${newData?.id}`, {
							method: "PATCH",
							body: {
								isOfficeAccessGranted:
									newData?.isOfficeAccessGranted === "true" ? true : false,
							},
						});
						console.log(res);
						mutate();
						if (res?.status !== 200) {
							Swal.fire(`Error`, "Something went wrong!", "error");
							return;
						}
						Swal.fire(`Success`, "Updated Successfully!", "success");
						return;
					},
				}}
			/>
		</section>
	);
};

export default AllLeaveRequests;
