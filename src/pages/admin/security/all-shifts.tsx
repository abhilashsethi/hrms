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
						holidayData={editShiftData}
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
									tooltip: "Meeting Title",
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
									tooltip: "Client Name",
									searchable: true,
									field: "clientName",
								},
								{
									title: "End TIme",
									tooltip: "Client Phone",
									searchable: true,
									field: "clientPhone",
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
							detailPanel={[
								{
									tooltip: "info",
									icon: () => <Info />,
									openIcon: () => <Visibility />,
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
															boxShadow:
																"0 16px 70px -12.125px rgba(0,0,0,0.3)",
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
