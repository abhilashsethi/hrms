import MaterialTable from "@material-table/core";
import {
	AssignmentInd,
	AssignmentReturn,
	BorderColor,
	CurrencyRupee,
	Delete,
	Info,
	PeopleRounded,
	Spa,
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
import { AssignAsset, ReturnAsset } from "components/dialogues";
import UpdateAssets from "components/dialogues/UpdateAssets";
import { DepartmentInformation } from "components/drawer";
import ViewAssetDetailsDrawer from "components/drawer/ViewAssetDetailsDrawer";
import { useChange } from "hooks";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { Role } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";
interface Props {
	data?: any;
	mutate?: any;
}
const AssetsColumn = ({ data, mutate }: Props) => {
	console.log(data);
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
	const [assetDetails, setAssetDetails] = useState(false);
	const [assetId, setAssetId] = useState(false);

	const [isReturn, setIsReturn] = useState<{
		dialogue?: boolean;
		assetData?: string | null;
	}>({ dialogue: false, assetData: null });

	const [isAssign, setIsAssign] = useState<{
		dialogue?: boolean;
		assetData?: string | null;
	}>({ dialogue: false, assetData: null });

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

	const handelReturn = async (item: any) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You want to Return?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Return!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				setLoading(true);
				try {
					Swal.fire("", "Please Wait...", "info");
					const res = await change(`assets/asset/return/${item?.id}`, {
						method: "PATCH",
						body: { isReturn: true },
					});
					console.log(res);
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
					setIsReturn({ dialogue: true, assetData: item });
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
			<UpdateAssets
				assetData={isUpdate?.assetData}
				open={isUpdate?.dialogue}
				handleClose={() => setIsUpdate({ dialogue: false })}
				mutate={mutate}
			/>
			<ReturnAsset
				assetData={isReturn?.assetData}
				open={isReturn?.dialogue}
				handleClose={() => setIsReturn({ dialogue: false })}
				mutate={mutate}
			/>
			<ViewAssetDetailsDrawer
				open={assetDetails}
				onClose={() => setAssetDetails(false)}
				assetId={assetId}
			/>
			<AssignAsset
				assetData={isAssign?.assetData}
				open={isAssign?.dialogue}
				handleClose={() => setIsAssign({ dialogue: false })}
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

					// {
					// 	title: "Asset Images",
					// 	tooltip: "Asset Images",
					// 	field: "images",
					// },
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
						field: "billAmount",
						render: (data) => {
							return (
								<div className="">
									<CurrencyRupee />{" "}
									{data?.billAmount ? data?.billAmount : "---"}
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
									{data?.isAssign ? (
										<>
											<Tooltip title="Assign Details">
												<div className="text-sm bg-purple-600 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
													<IconButton>
														<Visibility
															onClick={() => {
																setAssetDetails(true), setAssetId(data?.id);
															}}
															className="!text-white"
														/>
													</IconButton>
												</div>
											</Tooltip>
											<Tooltip title="Return Asset">
												<div className="text-sm bg-green-600 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
													<IconButton>
														<AssignmentReturn
															onClick={() => {
																handelReturn(data?.id),
																	setIsReturn({
																		dialogue: true,
																		assetData: data,
																	});
															}}
															className="!text-white"
														/>
													</IconButton>
												</div>
											</Tooltip>
										</>
									) : (
										<Tooltip title="Assign Employee">
											<div className="text-sm bg-yellow-600 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
												<IconButton>
													<AssignmentInd
														onClick={() => {
															setIsAssign({
																dialogue: true,
																assetData: data,
															});
														}}
														className="!text-white"
													/>
												</IconButton>
											</div>
										</Tooltip>
									)}
									<Tooltip title="Edit">
										<div className="text-sm bg-blue-600 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
											<IconButton
												onClick={() =>
													setIsUpdate({ dialogue: true, assetData: data })
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
								{console.log(rowData)}
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
											<Typography className="flex" gutterBottom align="left">
												<p>Images :</p>
												<div className="grid grid-cols-3 gap-2">
													{rowData?.photos?.length ? (
														rowData?.photos?.map((item: any, i: any) => {
															return <img className="w-36" src={item} alt="" />;
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

export default AssetsColumn;
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
