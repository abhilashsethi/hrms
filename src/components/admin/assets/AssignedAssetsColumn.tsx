import MaterialTable from "@material-table/core";
import {
	AssignmentInd,
	BorderColor,
	CurrencyRupee,
	Delete,
	Info,
	PeopleRounded,
	Visibility,
} from "@mui/icons-material";
import {
	Card,
	CardContent,
	IconButton,
	Tooltip,
	Typography,
} from "@mui/material";
import { PDF } from "assets/home";
import { HeadStyle } from "components/core";
import UpdateAssets from "components/dialogues/UpdateAssets";
import { useChange } from "hooks";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { MuiTblOptions, getDataWithSL } from "utils";
interface Props {
	data?: any;
	mutate?: any;
}
const AssignedAssetsColumn = ({ data, mutate }: Props) => {
	const [loading, setLoading] = useState(false);
	const { change, isChanging } = useChange();
	const [isInfo, setIsInfo] = useState<{ dialogue?: boolean; role?: any }>({
		dialogue: false,
		role: null,
	});
	const [isUpdate, setIsUpdate] = useState<any>({
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
			{/* <DepartmentInformation
				open={isInfo?.dialogue}
				onClose={() => setIsInfo({ dialogue: false })}
				roleId={isInfo?.role?.id}
			/> */}
			<UpdateAssets
				assetData={isUpdate?.assetData}
				open={isUpdate?.dialogue}
				handleClose={() => setIsUpdate({ dialogue: false })}
				mutate={mutate}
			/>
			<MaterialTable
				title={<HeadStyle name="All Assets" icon={<PeopleRounded />} />}
				isLoading={!data}
				data={data ? getDataWithSL<any>(data) : []}
				options={{ ...MuiTblOptions(), selection: false, paging: false }}
				columns={[
					{
						title: "#",
						field: "sl",
						editable: "never",
						width: "2%",
					},
					{
						title: "Asset Name",
						tooltip: "Asset Name",
						field: "name",
					},

					{
						title: "Brand Name",
						tooltip: "Brand Name",
						field: "brandName",
						render: (data) => {
							return (
								<div className="">
									{data?.brandName ? data?.brandName : "---"}
								</div>
							);
						},
					},
					{
						title: "Date Of Purchase",
						tooltip: "Date Of Purchase",
						field: "dateOfPurchase",
						render: (data) => {
							return (
								<div className="">
									{data?.dateOfPurchase
										? moment(data?.dateOfPurchase).format("DD/MM/YYYY")
										: "---"}
								</div>
							);
						},
					},
					{
						title: "Bill Amount",
						tooltip: "Bill Amount",
						field: "purchasePrice",
						render: (data) => {
							return (
								<div className="">
									<CurrencyRupee />{" "}
									{data?.purchasePrice ? data?.purchasePrice : "---"}
								</div>
							);
						},
					},
					{
						title: "Current Market Price",
						tooltip: "Current Market Price",
						field: "marketPrice",
						render: (data) => {
							return (
								<div className="">
									<CurrencyRupee />{" "}
									{data?.marketPrice ? data?.marketPrice : "---"}
								</div>
							);
						},
					},
					{
						title: "Serial Number",
						tooltip: "Serial Number",
						field: "serialNumber",
						render: (data) => {
							return (
								<div className="">
									{data?.serialNumber ? data?.serialNumber : "---"}
								</div>
							);
						},
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
									<Tooltip title="Edit">
										<div className="text-sm bg-blue-600 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
											<IconButton
												onClick={() =>
													setIsUpdate({ dialogue: true, role: data })
												}
											>
												<BorderColor className="!text-white" />
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
									<Link href={`/admin/assets/assign-assets?id=${data?.id}`}>
										<Tooltip title="Assign Employee">
											<div className="text-sm bg-purple-600 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
												<IconButton>
													<AssignmentInd className="!text-white" />
												</IconButton>
											</div>
										</Tooltip>
									</Link>
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
									{" "}
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
											<Typography className="flex" gutterBottom align="left">
												<p>Images : </p>
												<div className="flex gap-2">
													{rowData?.photos?.length ? (
														rowData?.photos?.map((item: any, i: any) => {
															<div
																key={i}
																className="bg-white rounded-lg shadow-lg px-2 py-2"
															>
																<img
																	className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
																	src={item}
																	alt="Branch"
																/>
															</div>;
														})
													) : (
														<span> No Images Found</span>
													)}
												</div>
											</Typography>
											<Typography gutterBottom align="left">
												Docs :
												<div className="flex gap-2">
													{rowData?.docs?.length ? (
														rowData?.docs?.map((item: any, i: any) => {
															return (
																<a href={item?.link}>
																	<img className="w-10" src={PDF.src} alt="" />
																</a>
															);
														})
													) : (
														<span>No Docs Found</span>
													)}
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

export default AssignedAssetsColumn;
