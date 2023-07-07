import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import {
	AddAdditionalBillDetails,
	AddAdditionalQuotationDetails,
	EditAdditionalQuotationDetails,
	EditBasicBillDetails,
	EditBillTermsAndCondition,
	EditQuotationDetails,
	EditTermsAndConditionDialogue,
} from "components/dialogues";
import { TenderLayout } from "components/tender";
import { useChange } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Quotation } from "types";
interface Props {
	quotationData?: Quotation;
	mutate?: any;
	isLoading?: any;
}
const BillData = ({ quotationData, mutate, isLoading }: Props) => {
	const [isQuotationWorkData, setQuotationWorkData] = useState<Quotation>({});
	const { change } = useChange();
	const [editDetails, setEditDetails] = useState<boolean>(false);
	const [additionDetails, setAdditionDetails] = useState<boolean>(false);
	const [AddadditionDetails, setAddAdditionDetails] = useState<boolean>(false);
	const [termsAndConditionDetails, setTermsAndConditionDetails] =
		useState<boolean>(false);
	console.log("Details=>", { quotationData });
	const basicDetails = [
		{
			id: 1,
			title: "Client Name",
			value: "Client_05",
		},
		{
			id: 2,
			title: "Client Email",
			value: "client@gmail.com",
		},
		{
			id: 3,
			title: "Client Address",
			value: "client address0123",
		},
		{
			id: 4,
			title: "Bill Amount",
			value: "Rs 1,20,000/-",
		},
		{
			id: 5,
			title: "Invoice Number",
			value: "SY8ey89nbg25",
		},
		{
			id: 6,
			title: "Invoice Date",
			value: "06/07/2023",
		},
		{
			id: 7,
			title: "Invoice Due Date",
			value: "15/07/2023",
		},
		{
			id: 8,
			title: "Tax",
			value: quotationData?.isIgst ? "IGST" : "CGST & SGST",
		},
	];
	const handleDelete = (item?: Quotation) => {
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You want to delete!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			}).then(async (result) => {
				if (result.isConfirmed) {
					Swal.fire(`Info`, "It will take some time", "info");
					const res = await change(`quotations/remove-work/${item?.id}`, {
						method: "DELETE",
					});

					if (res?.status !== 200) {
						Swal.fire(
							"Error",
							res?.results?.msg || "Something went wrong!",
							"error"
						);
						return;
					}
					Swal.fire(`Success`, "Deleted Successfully!", "success");
					mutate();
					return;
				}
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<section>
			<EditBasicBillDetails
				open={editDetails}
				handleClose={() => setEditDetails(false)}
				mutate={mutate}
				data={quotationData}
			/>
			<EditAdditionalQuotationDetails
				open={additionDetails}
				handleClose={() => setAdditionDetails(false)}
				mutate={mutate}
				data={isQuotationWorkData}
				quotationData={quotationData}
			/>
			<EditBillTermsAndCondition
				open={termsAndConditionDetails}
				handleClose={() => setTermsAndConditionDetails(false)}
				mutate={mutate}
				data={quotationData}
			/>
			<AddAdditionalBillDetails
				open={AddadditionDetails}
				handleClose={() => setAddAdditionDetails(false)}
				mutate={mutate}
				data={quotationData}
			/>

			<div className="mt-8">
				<TenderLayout title="Basic Details">
					<div className="flex justify-end absolute right-[10px] top-[10px]">
						<Tooltip title="Edit">
							<IconButton
								size="small"
								onClick={() => {
									setEditDetails(true);
								}}
							>
								<Edit />
							</IconButton>
						</Tooltip>
					</div>
					<table className="w-full">
						<tbody>
							<tr>
								<td className="w-1/5 text-sm font-semibold py-2">Status</td>
								<td className="w-3/5">
									<span
										className={`text-sm py-1 px-2 text-white tracking-wide shadow-md 
                  ${
										quotationData?.status === "Rejected"
											? "bg-red-500"
											: quotationData?.status === "Accepted"
											? "bg-green-500"
											: "bg-green-500"
									} rounded-md`}
									>
										Paid
									</span>
								</td>
							</tr>
							{basicDetails?.map((item) => (
								<tr>
									<td className="w-1/5 text-sm font-semibold py-2">
										{item?.title}
									</td>
									<td className="w-3/5">
										<span className="text-sm text-gray-600 py-2">
											{item?.value}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</TenderLayout>
			</div>
			<div className="mt-14">
				<TenderLayout title="Additional Details">
					<div>
						<div className="flex justify-end mb-2">
							<Button
								onClick={() => {
									setAddAdditionDetails(true);
								}}
								type="submit"
								variant="contained"
								className="!bg-theme"
								startIcon={<Add />}
							>
								Add New
							</Button>
						</div>
						<table className="w-full">
							<tbody className="border-2">
								<tr className="border-b-2">
									<th className="w-[40%] text-sm border-r-2">Description</th>
									<th className="w-[30%] text-sm border-r-2">Qty</th>
									<th className="w-[30%] text-sm border-r-2">Cost</th>
									<th className="w-[30%] text-sm">Actions</th>
								</tr>
								{quotationData?.works?.length ? (
									<>
										{quotationData?.works?.map((item) => (
											<tr className="border-b-2">
												<td
													align="center"
													className="w-[40%] text-sm border-r-2"
												>
													{item?.description}
												</td>
												<td
													align="center"
													className="w-[30%] text-sm border-r-2"
												>
													<div className="flex gap-2 items-center justify-center">
														<p className="text-xs">{item?.quantity}</p>
													</div>
												</td>
												<td
													align="center"
													className="w-[30%] text-sm border-r-2"
												>
													<div className="flex gap-2 items-center justify-center">
														<p className="text-xs">{item?.cost}</p>
													</div>
												</td>
												<td align="center" className="w-[20%] text-sm">
													<div className="flex gap-1 py-2 justify-center">
														<Tooltip title="Edit Document">
															<IconButton
																size="small"
																onClick={() => {
																	setQuotationWorkData(item),
																		setAdditionDetails(true);
																}}
															>
																<Edit />
															</IconButton>
														</Tooltip>
														<Tooltip title="Delete Document">
															<IconButton size="small">
																<Delete onClick={() => handleDelete(item)} />
															</IconButton>
														</Tooltip>
													</div>
												</td>
											</tr>
										))}
									</>
								) : (
									<tr>
										<td colSpan={4}>No Data</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</TenderLayout>
			</div>
			<div className="mt-14">
				<TenderLayout title="Terms & Conditions">
					<div className="">
						<div className="flex justify-end ">
							<Tooltip title="Edit">
								<IconButton
									size="small"
									onClick={() => {
										setTermsAndConditionDetails(true);
									}}
								>
									<Edit />
								</IconButton>
							</Tooltip>
						</div>
						<p className="text-gray-500 text-justify text-sm">
							{quotationData?.termsAndConditions ? (
								<div
									dangerouslySetInnerHTML={{
										__html: `${quotationData?.termsAndConditions}`,
									}}
								></div>
							) : (
								"No Terms And Conditions"
							)}
						</p>
					</div>
				</TenderLayout>
			</div>
		</section>
	);
};

export default BillData;