import {
	AccessTime,
	AccountTree,
	Add,
	BorderColor,
	BugReport,
	Handyman,
	Receipt,
	Send,
} from "@mui/icons-material";
import { Button, Grid, Tooltip, useMediaQuery } from "@mui/material";
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
import { DEFAULTPROFILE, DOC, IMG, PDF, XLS } from "assets/home";
import AddDocument from "components/dialogues/AddDocument";
import EditMeetingDetails from "components/dialogues/EditMeetingDetails";
import { useTheme } from "@emotion/react";
import moment from "moment";
import Swal from "sweetalert2";

const MeetingData = () => {
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
	} = useFetch<MeetingProps>(`meetings/${router?.query?.id}`);

	// console.log(meetingDetails);

	if (isLoading) {
		return <Loader />;
	}

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
			{/* <ViewTicketsDrawer
				open={tickets}
				onClose={() => setTickets(false)}
				setViewTickets={setViewTickets}
			/> */}
			<ViewNotesDrawer
				open={tickets}
				onClose={() => setTickets(false)}
				setViewTickets={setViewTickets}
				meetingDetails={meetingDetails}
				mutate={mutate}
				// ticket={tickets}
			/>
			<section className="mb-12 flex gap-3">
				<div className="w-full m-auto rounded-lg bg-white shadow-xl p-4">
					<div className="relative w-full bg-blue-100/50 rounded-lg p-4">
						<div className="absolute top-3 left-[25rem]">
							<Button
								variant="contained"
								className="!bg-blue-500 "
								startIcon={<BorderColor />}
								size="small"
								onClick={() => setEditDetails((prev) => !prev)}
							>
								Edit
							</Button>
						</div>
						<Grid container spacing={3}>
							<Grid item lg={5}>
								<div>
									<p className="pb-1 text-lg font-semibold">
										Meeting Name :{" "}
										<span className="font-normal">{meetingDetails?.title}</span>
									</p>
									<div className="py-1 group flex items-center gap-x-2 tracking-wide">
										{/* <p className=" font-semibold">Time</p> : <AccessTime /> */}
										<div className="flex py-2 md:py-0">
											<p className="font-semibold text-sm md:text-base">
												Meeting Start Dt :{" "}
											</p>
											{/* <AccessTime /> */}
											<span className="text-sm md:text-base">{`${moment(
												meetingDetails?.meetingDate
											).format("LL")}, ${moment(
												meetingDetails?.meetingStartTime
											).format("LT")}`}</span>
										</div>
									</div>
									<div className="flex py-2 md:py-0">
										<p className="font-semibold text-sm md:text-base">
											Meeting End Dt :{" "}
										</p>
										{/* <AccessTime /> */}
										<span className="text-sm md:text-base">
											{`${moment(meetingDetails?.meetingDate).format(
												"LL"
											)}, ${moment(meetingDetails?.meetingEndTime).format(
												"LT"
											)}`}
										</span>
									</div>
									<div className="py-1 group flex items-center gap-x-2 tracking-wide">
										<p className=" font-semibold">Client Name</p> :{" "}
										<span>{meetingDetails?.clientName}</span>
									</div>
									<div className="py-1 group flex items-center gap-x-2 tracking-wide">
										<p className=" font-semibold">Client Email</p> :{" "}
										<span>{meetingDetails?.clientEmail}</span>
									</div>
									<div className="py-1 group flex items-center gap-x-2 tracking-wide">
										<p className=" font-semibold">Client Phone</p> :{" "}
										<span>{meetingDetails?.clientPhone}</span>
									</div>

									<div className="py-1 group flex items-center gap-x-2 tracking-wide">
										<p className=" font-semibold">Members Visited</p> :{" "}
										<span>{meetingDetails?.meetingPersonName}</span>
									</div>
									<div className="w-full">
										<div className="flex justify-end">
											<Button
												variant="contained"
												className="!bg-blue-500 "
												// startIcon={<Add />}
												size="small"
												onClick={() => setTickets(true)}
											>
												View Notes
											</Button>
										</div>
										<p className="font-semibold pb-3">Documents :</p>
										<div className="grid grid-cols-3 w-2/3 gap-6">
											{docs.map((item: any, i) => {
												return (
													<Tooltip title="Click to Preview">
														<div
															key={i}
															className="cursor-pointer"
															onClick={() =>
																setIsPreview({
																	dialogue: true,
																	title: "Doc 53426",
																})
															}
														>
															<img className="w-12" src={item?.img} alt="" />
															<p className="text-xs">{item?.title}</p>
														</div>
													</Tooltip>
												);
											})}
										</div>
									</div>
								</div>
							</Grid>
							<Grid item lg={7}>
								<div className="w-full h-full">
									<iframe
										className="w-full h-full"
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.0498150250405!2d85.77649581162628!3d20.25676868112798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a740ae304117%3A0x629ce9db127f69ef!2sSearchingYard%20Software%20Group!5e0!3m2!1sen!2sin!4v1682685199057!5m2!1sen!2sin"
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
									></iframe>
								</div>
							</Grid>
						</Grid>
					</div>
				</div>
			</section>
		</section>
	);
};

export default MeetingData;

const docs = [
	{ id: 1, title: "Doc 53426", img: PDF.src },
	{ id: 2, title: "Doc 53426", img: DOC.src },
	{ id: 3, title: "Doc 53426", img: XLS.src },
	{ id: 4, title: "Doc 53426", img: IMG.src },
	{ id: 5, title: "Doc 53426", img: PDF.src },
	{ id: 6, title: "Doc 53426", img: PDF.src },
];
