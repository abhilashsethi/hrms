import MaterialTable from "@material-table/core";
import {
	BorderColor,
	Delete,
	Info,
	MeetingRoom,
	RadioButtonChecked,
	Visibility,
} from "@mui/icons-material";
import {
	Avatar,
	Card,
	CardContent,
	Paper,
	Tooltip,
	Typography,
} from "@mui/material";
import { AdminBreadcrumbs, HeadStyle } from "components/core";
import { EditShift } from "components/dialogues";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { SHIFT } from "types";
import { MuiTblOptions } from "utils";

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

const AllShifts = ({ data }: Props) => {
	const [isLeave, setIsLeave] = useState<boolean>(false);
	const [editDetails, setEditDetails] = useState<boolean>(false);
	const [editShiftData, setEditShiftData] = useState<SHIFT>();

	const {
		data: shiftData,
		mutate,
		isLoading,
		pagination,
	} = useFetch<any>(`security/shift`);
	console.log(shiftData);
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

	const router = useRouter();

	return (
		<>
			<PanelLayout title="All Shifts - Admin Panel">
				<section className="md:px-8 px-2">
					<AdminBreadcrumbs links={links} />
					<EditShift
						open={editDetails}
						handleClose={() => setEditDetails(false)}
						shiftData={editShiftData}
						mutate={mutate}
					/>
					<div className="mt-6">
						<MaterialTable
							components={{
								Container: (props) => <Paper {...props} elevation={5} />,
							}}
							title={<HeadStyle name="All Shifts" icon={<MeetingRoom />} />}
							// isLoading={!data}
							data={
								!shiftData?.length
									? []
									: shiftData?.map((_: any, i: number) => ({
											..._,
											sn: i + 1,
									  }))
							}
							options={{
								...MuiTblOptions(),
							}}
							columns={[
								{
									title: "#",
									field: "sn",
									editable: "never",
									// width: "2%",
								},
								{
									title: "Branch",
									tooltip: "Branch",
									searchable: true,
									field: "title",
								},
								{
									title: "Shift",
									tooltip: "Shift",
									searchable: true,
									field: "type",
								},
								{
									title: "Start Time",
									tooltip: "Start Time",
									searchable: true,
									field: "startTime",
								},
								{
									title: "End TIme",
									tooltip: "End Time",
									searchable: true,
									field: "endTime",
									render: (data) =>
										data?.clientPhone ? data?.clientPhone : "---",
								},

								{
									title: "Actions",
									cellStyle: {
										textAlign: "right",
									},
									export: true,
									// width: "18%",
									// field: "pick",
									render: (item) => (
										<>
											<div className="flex">
												<Tooltip title="Edit">
													<Avatar
														// onClick={() => setOpenAddCustomerDrawer(row)}
														onClick={() => {
															setEditDetails((prev) => !prev),
																setEditShiftData(item);
														}}
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
														<BorderColor sx={{ padding: "0px !important" }} />
													</Avatar>
												</Tooltip>
												<Tooltip title="Delete">
													<Avatar
														onClick={() => handleDelete(item?.id)}
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
						/>
					</div>
				</section>
			</PanelLayout>
		</>
	);
};

export default AllShifts;

const links = [
	{ id: 1, page: "Meetings", link: "/admin/meetings" },
	{ id: 2, page: "All Meetings", link: "/admin/meetings/all-meetings" },
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
