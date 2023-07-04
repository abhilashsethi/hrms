import { BorderColor, Edit } from "@mui/icons-material";
import {
	Button,
	Grid,
	IconButton,
	Tooltip,
	useMediaQuery,
} from "@mui/material";
import ICONS from "assets/icons";
import { RenderIconRow } from "components/common";
import { Loader, PhotoViewer } from "components/core";
import {
	ChangeProfile,
	CreateLeave,
	DocPreview,
	EditQuotationDetails,
	UpdateClient,
} from "components/dialogues";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { Client, MeetingProps, MeetingTypes } from "types";
import { ViewNotesDrawer, ViewTicketsDrawer } from "components/drawer";
import { DEFAULTPROFILE, DOC, IMG, PDF, Video, XLS } from "assets/home";
import AddDocument from "components/dialogues/AddDocument";
import EditMeetingDetails from "components/dialogues/EditMeetingDetails";
import { useTheme } from "@emotion/react";
import moment from "moment";
import Swal from "sweetalert2";
import { TenderLayout } from "components/tender";

const QuotationData = () => {
	const router = useRouter();

	const [editDetails, setEditDetails] = useState<boolean>(false);

	const {
		data: meetingDetails,
		mutate,
		isLoading,
	} = useFetch<any>(`meetings/${router?.query?.id}`);

	// console.log(meetingDetails);

	if (isLoading) {
		return <Loader />;
	}
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
				mutate={mutate}
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
