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
	const [isDialogue, setIsDialogue] = useState(false);
	const [tickets, setTickets] = useState(false);
	const [viewTickets, setViewTickets] = useState<any>(null);
	const [isLeave, setIsLeave] = useState<boolean>(false);
	const [editDetails, setEditDetails] = useState<boolean>(false);

	const [isPreview, setIsPreview] = useState<{
		dialogue?: boolean;
		title?: string;
	}>({
		dialogue: false,
		title: "Preview",
	});
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
			title: "Tender No",
			// value: tenderData?.tenderNo || "---"
		},
		{
			id: 2,
			title: "Tender Title",
			// value: tenderData?.title || "---",
		},
		{
			id: 3,
			title: "Portal",
			// value: tenderData?.portal || "---",
		},
		{
			id: 4,
			title: "Tender Category",
			// value: tenderData?.category || "---",
		},
		{
			id: 5,
			title: "Submission Date",
			// value: `${moment(tenderData?.submissionDate).format("ll")}` || "---",
		},
		{
			id: 6,
			title: "Submission Time",
			// value: tenderData?.submissionTime || "---",
		},
		{
			id: 7,
			title: "Bid Value in ₹",
			// value: tenderData?.bidValue || "---",
		},
	];

	return (
		<section>
			<DocPreview
				open={isPreview?.dialogue}
				handleClose={() => setIsPreview({ dialogue: false })}
				title={isPreview?.title}
			/>
			<AddDocument open={isLeave} handleClose={() => setIsLeave(false)} />
			<EditMeetingDetails
				open={editDetails}
				handleClose={() => setEditDetails(false)}
				meetingId={router?.query?.id}
				mutate={mutate}
			/>

			<UpdateClient
				mutate={mutate}
				open={isDialogue}
				handleClose={() => setIsDialogue(false)}
			/>
			<ViewNotesDrawer
				open={tickets}
				onClose={() => setTickets(false)}
				setViewTickets={setViewTickets}
				meetingDetails={meetingDetails}
				mutate={mutate}
			/>

			<div className="mt-8">
				<TenderLayout title="Basic Details">
					<div className="flex justify-end absolute right-[10px] top-[10px]">
						<Tooltip title="Edit">
							<IconButton
								size="small"
								onClick={() => {
									// setIsUpdate({ dialogue: true, tenderData: tenderData });
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
									<span className="text-sm py-1 px-2 text-white tracking-wide shadow-md bg-yellow-500 rounded-md">
										{/* {tenderData?.status} */}
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
											{/* {item?.value} */}
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
