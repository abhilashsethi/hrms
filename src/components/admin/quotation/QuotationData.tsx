import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import {
	EditAdditionalQuotationDetails,
	EditQuotationDetails,
} from "components/dialogues";
import { TenderLayout } from "components/tender";
import { useState } from "react";

const QuotationData = () => {
	const [editDetails, setEditDetails] = useState<boolean>(false);
	const [additionDetails, setAdditionDetails] = useState<boolean>(false);

	const basicDetails = [
		{
			id: 1,
			title: "Client Name",
			value: "Piyush Agrawal",
		},
		{
			id: 2,
			title: "Client Email",
			value: "piyush@gmail.com",
		},
		{
			id: 3,
			title: "Client Address",
			value:
				"Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
		},
		{
			id: 4,
			title: "Quotation Title",
			value: "YardERP",
		},
		{
			id: 5,
			title: "Quotation Number",
			value: "SY202306043QU",
		},
	];

	return (
		<section>
			<EditQuotationDetails
				open={editDetails}
				handleClose={() => setEditDetails(false)}
			/>
			<EditAdditionalQuotationDetails
				open={additionDetails}
				handleClose={() => setAdditionDetails(false)}
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
									<span className="text-sm py-1 px-2 text-white tracking-wide shadow-md bg-green-500 rounded-md">
										{/* {tenderData?.status} */}Accepted
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
						<table className="w-full">
							<tbody className="border-2">
								<tr className="border-b-2">
									<th className="w-[10%] text-sm font-semibold py-2 border-r-2">
										S.No
									</th>
									<th className="w-[40%] text-sm border-r-2">Description</th>
									<th className="w-[30%] text-sm border-r-2">Qty</th>
									<th className="w-[30%] text-sm border-r-2">Cost</th>
									<th className="w-[30%] text-sm">Actions</th>
								</tr>

								<>
									<tr className="border-b-2">
										<td
											align="center"
											className="w-[10%] text-sm py-2 border-r-2"
										>
											1
										</td>
										<td align="center" className="w-[40%] text-sm border-r-2">
											{/* {item?.title} */}Android App & Admin Panel Development
										</td>
										<td align="center" className="w-[30%] text-sm border-r-2">
											<div className="flex gap-2 items-center justify-center">
												<p className="text-xs">1</p>
											</div>
										</td>
										<td align="center" className="w-[30%] text-sm border-r-2">
											<div className="flex gap-2 items-center justify-center">
												<p className="text-xs">1,20,000</p>
											</div>
										</td>
										<td align="center" className="w-[20%] text-sm">
											<div className="flex gap-1 py-2 justify-center">
												<Tooltip title="Edit Document">
													<IconButton
														size="small"
														onClick={() => {
															setAdditionDetails(true);
														}}
													>
														<Edit />
													</IconButton>
												</Tooltip>
												<Tooltip title="Delete Document">
													<IconButton size="small">
														<Delete
														// onClick={() => handleDelete(item)}
														/>
													</IconButton>
												</Tooltip>
											</div>
										</td>
									</tr>
								</>
							</tbody>
						</table>
					</div>
				</TenderLayout>
			</div>
		</section>
	);
};

export default QuotationData;

// const docs = [
// 	{ id: 1, title: "Doc 53426", img: PDF.src },
// 	{ id: 2, title: "Doc 53426", img: DOC.src },
// 	{ id: 3, title: "Doc 53426", img: XLS.src },
// 	{ id: 4, title: "Doc 53426", img: IMG.src },
// 	{ id: 5, title: "Doc 53426", img: PDF.src },
// 	{ id: 6, title: "Doc 53426", img: PDF.src },
// ];
