import MaterialTable from "@material-table/core";
import {
	Delete,
	Info,
	Send,
	SupportAgent,
	Visibility,
} from "@mui/icons-material";
import {
	Card,
	CardContent,
	IconButton,
	Tooltip,
	Typography,
} from "@mui/material";
import { HeadStyle } from "components/core";
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

	const handleDelete = async (id: string) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You want to delete?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				setLoading(true);
				Swal.fire("", "Please Wait...", "info");
				try {
					Swal.fire(`Info`, "It will take some time", "info");
					const res = await change(`assets/${id}`, { method: "DELETE" });
					setLoading(false);
					if (res?.status !== 200) {
						Swal.fire(
							"Error",
							res?.results?.msg || "Something went wrong!",
							"error"
						);
						setLoading(false);
						return;
					}
					Swal.fire(`Success`, `Deleted Successfully!`, `success`);
					mutate();
					return;
				} catch (error) {
					console.log(error);
					setLoading(false);
				} finally {
					setLoading(false);
				}
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
					selection: false,
					paging: false,
					exportMenu: [],
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
						field: "name",
					},

					{
						title: "Email",
						tooltip: "Email",
						field: "email",
					},
					{
						title: "Phone",
						tooltip: "Phone",
						field: "phone",
					},

					{
						title: "Created",
						field: "createdAt",
						render: (data) => moment(data?.createdAt).format("MM/DD/YYYY"),
						editable: "never",
					},
					{
						title: "Actions",
						// field: "name",
						render: (data) => {
							return (
								<div className="flex gap-1">
									<Tooltip title="Reply">
										<div className="text-sm bg-blue-600 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
											<IconButton
												onClick={() => setIsReply({ dialogue: true })}
											>
												<Send className="!text-white" />
											</IconButton>
										</div>
									</Tooltip>
									<Tooltip title="Delete">
										<div className="text-sm bg-red-500 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
											<IconButton onClick={() => handleDelete(data?.id)}>
												<Delete className="!text-white" />
											</IconButton>
										</div>
									</Tooltip>
								</div>
							);
						},
						editable: "never",
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
													<p>
														Lorem ipsum dolor sit amet consectetur, adipisicing
														elit. Aspernatur, molestias.
													</p>
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
const department = [
	{
		id: 0,
		name: "Web Development",
		updatedAt: "25th Aug",
		createdAt: "25th Aug",
	},
	{
		id: 1,
		name: "Application Development",
		updatedAt: "25th Aug",
		createdAt: "25th Aug",
	},
	{
		id: 2,
		name: "IT Management",
		updatedAt: "25th Aug",
		createdAt: "25th Aug",
	},
	{
		id: 3,
		name: "Accounts Management",
		updatedAt: "25th Aug",
		createdAt: "25th Aug",
	},
];
