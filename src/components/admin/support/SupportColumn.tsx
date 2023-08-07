import MaterialTable from "@material-table/core";
import { Delete, Info, SupportAgent, Visibility } from "@mui/icons-material";
import { Avatar, Card, CardContent, Tooltip, Typography } from "@mui/material";
import { HeadStyle, ReverseIOSSwitch } from "components/core";
import { SendReply } from "components/dialogues";
import { useChange } from "hooks";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
import { MuiTblOptions, getDataWithSL } from "utils";
interface Props {
	data?: any;
	mutate?: any;
}
const SupportColumn = ({ data, mutate }: Props) => {
	const [loading, setLoading] = useState(false);
	const { change, isChanging } = useChange();
	const [isReply, setIsReply] = useState<any>({
		dialogue: false,
		departmentData: null,
	});
	console.log(data);

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
					const response = await change(`supports/${id}`, {
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
	const handleSubmit = async (e: any, id: any) => {
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
				const res = await change(`supports/${id}`, {
					method: "PATCH",
					body: {
						isResolved: !e?.target?.checked,
					},
				});
				mutate();

				if (res?.status !== 200) {
					Swal.fire(
						`Error`,
						res?.results?.msg || "Something went wrong!",
						"error"
					);
					return;
				}
				Swal.fire(`Success`, "Status updated successfully!", "success");
				return;
			}
		});
	};

	return (
		<section className="mt-8">
			<SendReply
				open={isReply?.dialogue}
				handleClose={() => setIsReply({ dialogue: false })}
			/>
			<MaterialTable
				title={<HeadStyle name="All Supports" icon={<SupportAgent />} />}
				isLoading={!data}
				data={data ? getDataWithSL<any>(data) : []}
				options={{
					...MuiTblOptions(),
					exportMenu: [],
					search: false,
				}}
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
						render: (data) => {
							return <div>{data?.reqUser?.name}</div>;
						},
					},

					{
						title: "Email",
						tooltip: "Email",
						render: (data) => {
							return <div>{data?.reqUser?.email}</div>;
						},
					},

					{
						title: "Resolved",
						tooltip: "Resolved",
						// field: "isResolved",
						render: (data) => {
							return (
								<div>
									<ReverseIOSSwitch
										checked={data?.isResolved}
										onChange={(e) => handleSubmit(e, data?.id)}
									/>
								</div>
							);
						},
					},
					{
						title: "Resolved Status",
						tooltip: "Resolved Status",
						field: "isResolved",
						render: ({ isResolved }) => {
							return <div>{isResolved ? "Resolved" : "Not Resolved"}</div>;
						},
					},

					{
						title: "Created",
						field: "createdAt",
						render: (data) => moment(data?.createdAt).format("DD/MM/YYYY"),
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
						render: (data) => (
							<>
								<div className="flex">
									<Tooltip title="Delete">
										<Avatar
											onClick={() => handleDelete(data?.id)}
											variant="rounded"
											className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-500 !p-0"
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
											// maxWidth: 500,
											maxWidth: 800,
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
												Message :
												<div className="flex gap-2">
													<p className="font-semibold">{rowData?.message}</p>
												</div>
											</Typography>
										</CardContent>
									</Card>
								</div>
							</>
						),
					},
				]}
			/>
		</section>
	);
};

export default SupportColumn;
