import {
	AccountTreeRounded,
	EventNote,
	FreeBreakfast,
	Receipt,
	SupportAgent,
} from "@mui/icons-material";
import {
	Avatar,
	Card,
	CircularProgress,
	Container,
	Drawer,
	Modal,
	Tooltip,
} from "@mui/material";
import { DEFAULTPROFILE, DOC, IMG, PDF, SAMPLEDP } from "assets/home";
import { Loader } from "components/core";
import { DocPreview } from "components/dialogues";
import { useChange, useFetch } from "hooks";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";

type Props = {
	open?: boolean | any;
	onClose: () => void;
	setViewTickets?: any;
	ticket?: any;
};

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	// height: 600,
	bgcolor: "background.paper",
	// border: "2px solid #000",
	borderRadius: "10px",
	boxShadow: 24,
	p: 4,
};

const Projects_Details = [
	{
		id: 1,
		title: "Project Title",
		name: "Shrinu Readdy",
		startDate: "25-04-2023",
		endDate: "25-05-2023",
	},
	{
		id: 2,
		title: "Project Title",
		name: "Shrinu Readdy",
		startDate: "25-04-2023",
		endDate: "25-05-2023",
	},
	{
		id: 3,
		title: "Project Title",
		name: "Shrinu Readdy",
		startDate: "25-04-2023",
		endDate: "25-05-2023",
	},
	{
		id: 4,
		title: "Project Title",
		name: "Shrinu Readdy",
		startDate: "25-04-2023",
		endDate: "25-05-2023",
	},
];

const ViewNotesDrawer = ({ open, onClose, setViewTickets, ticket }: Props) => {
	const [openInfoModal, setOpenInfoModal] = useState(false);
	const handleInfoOpen = () => {
		setOpenInfoModal(true);
	};
	const handleInfoCloseModal = () => setOpenInfoModal(false);
	const { data: users, isLoading } = useFetch<User[]>(`users`);

	const [isPreview, setIsPreview] = useState<{
		dialogue?: boolean;
		title?: string;
	}>({
		dialogue: false,
		title: "Preview",
	});

	return (
		<>
			<DocPreview
				open={isPreview?.dialogue}
				handleClose={() => setIsPreview({ dialogue: false })}
				title={isPreview?.title}
			/>
			<Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
				<Container
					style={{
						width: "30vw",
						marginTop: "3.5vh",
					}}
				>
					{/* Document Modal  */}
					<Modal
						open={openInfoModal}
						onClose={handleInfoCloseModal}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Card
							sx={style}
							className="dashboard-card-shadow w-[30%] border-t-4 border-b-4 border-t-theme border-b-theme !p-6"
						>
							Open Modal
							<iframe
								src={"/invoice11.pdf"}
								width="100%"
								height="500"
								title="Document Preview"
							/>
						</Card>
					</Modal>
					<div className="flex items-center justify-between pb-4">
						<p className="text-lg font-bold text-theme">View All Notes</p>
					</div>

					{isLoading && <Loader />}
					<div className="mt-4 flex flex-col gap-4">
						<div className="">
							{Note_Details?.map((item, i) => {
								return (
									<div
										// key={index}
										className="w-full relative rounded-l-xl shadow-xl px-2 py-2 bg-gradient-to-r from-rose-100 to-teal-100 mb-8"
									>
										<div className="absolute -top-4">
											<Avatar
												onClick={() => handleInfoOpen()}
												variant="rounded"
												className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-blue-700 !p-0"
											>
												<EventNote
													sx={{ padding: "0px !important" }}
													fontSize="large"
												/>
											</Avatar>
										</div>
										<div className="mt-7">
											<div className="flex w-full justify-between items-center gap-5">
												<img
													className="h-20 w-20 "
													src={"/writing.png"}
													alt=""
												/>
												<div className="">
													<p className="font-semibold">
														Notes :{" "}
														<span className="text-base text-gray-600">
															{item?.notes}
														</span>
														<span className="font-semibold text-sm text-gray-500">
															{/* {item?.name} */}
														</span>
													</p>
													<p className="font-semibold">
														Added By :{" "}
														<span className="font-semibold text-sm text-gray-500">
															{item?.addedBy}
														</span>
													</p>
												</div>
												<Tooltip title="Details">
													<div
														onClick={() =>
															setIsPreview({
																dialogue: true,
																title: "Doc 53426",
															})
														}
													>
														<div className="w-24 rounded-full group flex justify-start items-center hover:scale-105 ease-in-out transition-all duration-400 cursor-pointer !text-blue-600 flex-col gap-2">
															{item?.img}
														</div>
													</div>
												</Tooltip>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</Container>
			</Drawer>
		</>
	);
};

export default ViewNotesDrawer;

const Note_Details = [
	{
		id: 1,
		notes: "Project Title",
		img: <img className="w-12" src={PDF.src} alt="" />,
		addedBy: "Sales Person",
	},
	{
		id: 2,
		notes: "Project Title",
		img: <img className="w-12" src={IMG.src} alt="" />,
		addedBy: "Sales Person",
	},
	{
		id: 3,
		notes: "Project Title",
		img: <img className="w-12" src={DOC.src} alt="" />,
		addedBy: "Sales Person",
	},
	{
		id: 4,
		notes: "Project Title",
		img: <img className="w-12" src={PDF.src} alt="" />,
		addedBy: "Sales Person",
	},
];
