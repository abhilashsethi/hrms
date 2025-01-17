import { Add, Delete, Download, Edit } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { CHATDOC, PDF } from "assets/home";
import { Loader } from "components/core";
import {
	AddTenderDocument,
	UpdateTenderBasicDetails,
	UpdateTenderDocument,
	UpdateTenderEMDDetails,
	UpdateTenderFeeDetails,
} from "components/dialogues";
import { useAuth, useChange } from "hooks";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
import { Tender } from "types";
import { deleteFile, downloadFile } from "utils";
import TenderLayout from "./TenderLayout";
interface Props {
	tenderData?: Tender;
	mutate: () => void;
	isLoading?: boolean;
}
interface TenderDoc {
	link?: any;
	title?: string;
	id?: string;
}
const TenderDetail = ({ tenderData, isLoading, mutate }: Props) => {
	console.log(tenderData);
	const { user } = useAuth();
	const { change } = useChange();
	const basicDetails = [
		{
			id: 1,
			title: "Tender No",
			value: tenderData?.tenderNo || "---",
		},
		{
			id: 2,
			title: "Tender Title",
			value: tenderData?.title || "---",
		},
		{
			id: 3,
			title: "Portal",
			value: tenderData?.portal || "---",
		},
		{
			id: 4,
			title: "Tender Category",
			value: tenderData?.category || "---",
		},
		{
			id: 5,
			title: "Submission Date",
			value: `${moment(tenderData?.submissionDate).format("ll")}` || "---",
		},
		{
			id: 6,
			title: "Submission Time",
			value: tenderData?.submissionTime || "---",
		},
		{
			id: 7,
			title: "Bid Value in ₹",
			value: tenderData?.bidValue || "---",
		},
	];
	const tenderFees = [
		{
			id: 1,
			title: "Tender Fees in ₹",
			value: tenderData?.tenderFees || "---",
		},
		{
			id: 2,
			title: "Payment Mode",
			value: tenderData?.feesPaymentMode || "---",
		},
	];
	const emdFees = [
		{
			id: 3,
			title: "EMD Exemption",
			value: tenderData?.isEmdExemption ? "Yes" : "No",
		},
		{
			id: 4,
			title: "EMD Amount in ₹",
			value: tenderData?.isEmdExemption
				? "Not available"
				: tenderData?.EmdAmount || "---",
		},
		{
			id: 2,
			title: "Payment Mode",
			value: tenderData?.isEmdExemption
				? "Not available"
				: tenderData?.EmdPaymentMode || "---",
		},
	];
	const [isUpdate, setIsUpdate] = useState<{
		dialogue: boolean;
		tenderData?: Tender;
	}>({ dialogue: false, tenderData: {} });
	const [isFeeDetails, setIsFeeDetails] = useState<{
		dialogue: boolean;
		tenderData?: Tender;
	}>({ dialogue: false, tenderData: {} });
	const [isEmdDetails, setIsEmdDetails] = useState<{
		dialogue: boolean;
		tenderData?: Tender;
	}>({ dialogue: false, tenderData: {} });
	const [isDocument, setIsDocument] = useState<{
		dialogue: boolean;
		tenderData?: Tender;
	}>({ dialogue: false, tenderData: {} });
	const [isUpdateDocument, setIsUpdateDocument] = useState<{
		dialogue: boolean;
		tenderData?: TenderDoc;
	}>({ dialogue: false, tenderData: {} });
	const handleDelete = async (item: TenderDoc) => {
		try {
			Swal.fire({
				title: "Are you sure?",
				text: `You want to delete ${item?.title}?`,
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete!",
			}).then(async (result) => {
				if (result.isConfirmed) {
					Swal.fire(`Info`, "It will take some time", "info");
					const res = await change(
						`tenders/remove/document?tenderId=${tenderData?.id}&docId=${item?.id}`,
						{
							method: "DELETE",
						}
					);
					if (item?.id) {
						await deleteFile(String(item?.link?.split("/").reverse()[0]));
					}
					if (res?.status !== 200) {
						Swal.fire(`Error`, "Something went wrong!", "error");
						return;
					}
					Swal.fire(`Success`, "Deleted Successfully!", "success");
					mutate();
					return;
				}
			});
		} catch (error) {
			if (error instanceof Error) {
				Swal.fire(`Error`, error?.message, `error`);
			} else {
				Swal.fire(`Error`, "Something Went Wrong", `error`);
			}
		}
	};
	if (isLoading) {
		return (
			<section className="min-h-screen">
				<Loader />
			</section>
		);
	}
	return (
		<section className="">
			<UpdateTenderBasicDetails
				tenderData={isUpdate?.tenderData}
				open={isUpdate?.dialogue}
				handleClose={() => setIsUpdate({ dialogue: false })}
				mutate={mutate}
			/>
			<UpdateTenderFeeDetails
				tenderData={isFeeDetails?.tenderData}
				open={isFeeDetails?.dialogue}
				handleClose={() => setIsFeeDetails({ dialogue: false })}
				mutate={mutate}
			/>
			<UpdateTenderEMDDetails
				tenderData={isEmdDetails?.tenderData}
				open={isEmdDetails?.dialogue}
				handleClose={() => setIsEmdDetails({ dialogue: false })}
				mutate={mutate}
			/>
			<AddTenderDocument
				tenderData={isDocument?.tenderData}
				open={isDocument?.dialogue}
				handleClose={() => setIsDocument({ dialogue: false })}
				mutate={mutate}
			/>
			<UpdateTenderDocument
				tenderData={isUpdateDocument?.tenderData}
				open={isUpdateDocument?.dialogue}
				handleClose={() => setIsUpdateDocument({ dialogue: false })}
				mutate={mutate}
			/>

			<div className="mt-8">
				<TenderLayout title="Basic Details">
					<div className="flex justify-end absolute right-[10px] top-[10px]">
						{user?.role?.name === "CEO" ||
						user?.role?.name === "BID MANAGER" ? (
							<Tooltip title="Edit">
								<IconButton
									size="small"
									onClick={() => {
										setIsUpdate({ dialogue: true, tenderData: tenderData });
									}}
								>
									<Edit />
								</IconButton>
							</Tooltip>
						) : null}
					</div>
					<table className="w-full hidden md:block">
						<tbody>
							<tr>
								<td className="md:w-1/5 w-full text-sm font-semibold py-2">
									Status
								</td>
								<td className="md:w-3/5 w-full">
									<span className="text-sm py-1 px-2 text-white tracking-wide shadow-md bg-yellow-500 rounded-md">
										{tenderData?.status}
									</span>
								</td>
							</tr>
							{basicDetails?.map((item, i) => (
								<tr key={i}>
									<td className="md:w-1/5 w-full text-sm font-semibold py-2">
										{item?.title}
									</td>
									<td className="md:w-3/5 w-full">
										<span className="text-sm text-gray-600 py-2">
											{item?.value}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					{/* Mobile view basic details start */}
					<div className="grid md:hidden">
						<div className="grid py-2">
							<span className=" w-full text-sm font-semibold">Status :</span>
							<span className="text-sm py-1 px-2 text-white tracking-wide shadow-md bg-yellow-500 rounded-md">
								{tenderData?.status}
							</span>
						</div>
						{basicDetails?.map((item, i) => (
							<div className="grid py-2" key={i}>
								<span className=" w-full text-sm font-semibold ">
									{item?.title} :
								</span>
								<span className=" w-full">
									<span className="text-sm text-gray-600 ">{item?.value}</span>
								</span>
							</div>
						))}
					</div>
					{/* Mobile view basic details end */}
				</TenderLayout>
			</div>
			<div className="mt-14">
				<TenderLayout title="Tender Fee Details">
					<div className="flex justify-end absolute right-[10px] top-[10px]">
						{user?.role?.name === "CEO" ||
						user?.role?.name === "BID MANAGER" ? (
							<Tooltip title="Edit">
								<IconButton
									size="small"
									onClick={() => {
										setIsFeeDetails({ dialogue: true, tenderData: tenderData });
									}}
								>
									<Edit />
								</IconButton>
							</Tooltip>
						) : null}
					</div>
					<table className="w-full hidden md:block">
						<tbody>
							{tenderFees?.map((item, i) => (
								<tr key={i}>
									<td className="md:w-1/5 w-full text-sm font-semibold py-2">
										{item?.title}
									</td>
									<td className="md:w-3/5 w-full">
										<span className="text-sm text-gray-600 py-2">
											{item?.value}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					{/* Mobile view fee details start */}
					<div className="grid md:hidden">
						{tenderFees?.map((item, i) => (
							<div className="grid py-2" key={i}>
								<span className=" w-full text-sm font-semibold ">
									{item?.title} :
								</span>
								<span className=" w-full">
									<span className="text-sm text-gray-600 ">{item?.value}</span>
								</span>
							</div>
						))}
					</div>
					{/* Mobile view fee details end */}
				</TenderLayout>
			</div>
			<div className="mt-14">
				<TenderLayout title="EMD Fee Details">
					<div className="flex justify-end absolute right-[10px] top-[10px]">
						{user?.role?.name === "CEO" ||
						user?.role?.name === "BID MANAGER" ? (
							<Tooltip title="Edit">
								<IconButton
									size="small"
									onClick={() => {
										setIsEmdDetails({ dialogue: true, tenderData: tenderData });
									}}
								>
									<Edit />
								</IconButton>
							</Tooltip>
						) : null}
					</div>
					<table className="w-full hidden md:block">
						<tbody>
							{emdFees?.map((item, i) => (
								<tr key={i}>
									<td className="md:w-1/5 w-full text-sm font-semibold py-2">
										{item?.title}
									</td>
									<td className="md:w-3/5 w-full">
										<span className="text-sm text-gray-600 py-2">
											{item?.value}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					{/* Mobile view fee details start */}
					<div className="grid md:hidden">
						{emdFees?.map((item, i) => (
							<div className="grid py-2" key={i}>
								<span className=" w-full text-sm font-semibold ">
									{item?.title} :
								</span>
								<span className=" w-full">
									<span className="text-sm text-gray-600 ">{item?.value}</span>
								</span>
							</div>
						))}
					</div>
					{/* Mobile view fee details end */}
				</TenderLayout>
			</div>
			<div className="mt-14">
				<TenderLayout title="Tender Documents">
					<div>
						<div className="flex justify-end mb-2">
							{user?.role?.name === "CEO" ||
							user?.role?.name === "BID MANAGER" ? (
								<Button
									startIcon={<Add />}
									variant="contained"
									className="!bg-theme"
									onClick={() => {
										setIsDocument({ dialogue: true, tenderData: tenderData });
									}}
								>
									Add Document
								</Button>
							) : null}
						</div>
						<div className="overflow-x-auto hidden md:block">
							<table className="w-full">
								<tbody className="border-2">
									<tr className="border-b-2">
										<th className="w-[10%] text-sm font-semibold py-2 border-r-2">
											S.No
										</th>
										<th className="w-[40%] text-sm border-r-2">
											Document Name
										</th>
										<th className="w-[30%] text-sm border-r-2">Document</th>
										<th className="w-[20%] text-sm">Actions</th>
									</tr>
									{tenderData?.documents?.length ? (
										<>
											{tenderData?.documents?.map((item, index) => (
												<tr key={item?.id} className="border-b-2">
													<td
														align="center"
														className="w-[10%] text-sm py-2 border-r-2"
													>
														{Number(index) + 1}
													</td>
													<td
														align="center"
														className="w-[40%] text-sm border-r-2"
													>
														{item?.title}
													</td>
													<td
														align="center"
														className="w-[30%] text-sm border-r-2"
													>
														<div className="flex gap-2 items-center justify-center">
															<img
																className="h-6 object-contain"
																src={CHATDOC.src}
																alt=""
															/>
															<p className="text-xs">
																{item?.link?.slice(0, 9)}
																{item?.link?.length > 9 ? "..." : null}
															</p>
														</div>
													</td>
													<td align="center" className="w-[20%] text-sm">
														<div className="flex gap-1 py-2 justify-center">
															<Tooltip
																title="Download Document"
																onClick={() =>
																	downloadFile(
																		item?.link,
																		item?.link?.split("/")?.at(-1) as any
																	)
																}
															>
																<IconButton size="small">
																	<Download />
																</IconButton>
															</Tooltip>
															{user?.role?.name === "CEO" ||
															user?.role?.name === "COO" ||
															user?.role?.name === "DIRECTOR" ||
															user?.role?.name === "BID MANAGER" ? (
																<>
																	<Tooltip title="Edit Document">
																		<IconButton
																			size="small"
																			onClick={() => {
																				setIsUpdateDocument({
																					dialogue: true,
																					tenderData: item,
																				});
																			}}
																		>
																			<Edit />
																		</IconButton>
																	</Tooltip>
																	<Tooltip title="Delete Document">
																		<IconButton size="small">
																			<Delete
																				onClick={() => handleDelete(item)}
																			/>
																		</IconButton>
																	</Tooltip>
																</>
															) : null}
														</div>
													</td>
												</tr>
											))}
										</>
									) : (
										<tr>
											<td colSpan={4} className="text-center px-2 py-6">
												No Document
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
						{/* Mobile View all doc */}
						<div className="block md:hidden w-full max-h-96 overflow-scroll ">
							<div className="grid grid-cols-1 gap-4 py-2">
								{tenderData?.documents?.length ? (
									<>
										{tenderData?.documents?.map((item, index) => (
											<div key={index}>
												<div className="bg-white text-sm rounded-lg shadow-lg">
													<div className="h-28 rounded-t-lg bg-gradient-to-r from-theme-400 to-cyan-300 flex gap-4 justify-center items-center justify-items-center">
														<div>
															<img src={PDF.src} className="h-14 w-14" />
															<p className="text-xs text-white">
																{item?.link?.slice(0, 9)}
																{item?.link?.length > 9 ? "..." : null}
															</p>
														</div>
													</div>
													<div className="px-4 py-2">
														<div className="flex gap-3 pt-2">
															<span className=" font-semibold">S.No :</span>
															<span>{Number(index) + 1}</span>
														</div>
														<div className="grid gap-2">
															<span className=" font-semibold">
																Document Name :
															</span>
															<span>{item?.title}</span>
														</div>

														<div className="grid gap-2">
															<span className=" font-semibold">Actions :</span>
															<div className="flex gap-1 py-2 justify-center">
																<Tooltip
																	title="Download Document"
																	onClick={() =>
																		downloadFile(
																			item?.link,
																			item?.link?.split("/")?.at(-1) as any
																		)
																	}
																>
																	<IconButton size="small">
																		<Download />
																	</IconButton>
																</Tooltip>
																<Tooltip title="Edit Document">
																	<IconButton
																		size="small"
																		onClick={() => {
																			setIsUpdateDocument({
																				dialogue: true,
																				tenderData: item,
																			});
																		}}
																	>
																		<Edit />
																	</IconButton>
																</Tooltip>
																<Tooltip title="Delete Document">
																	<IconButton size="small">
																		<Delete
																			onClick={() => handleDelete(item)}
																		/>
																	</IconButton>
																</Tooltip>
															</div>
														</div>
													</div>
												</div>
											</div>
										))}
									</>
								) : (
									<div>
										<span className="flex justify-center px-2 py-6">
											No Document
										</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</TenderLayout>
			</div>
		</section>
	);
};

export default TenderDetail;
