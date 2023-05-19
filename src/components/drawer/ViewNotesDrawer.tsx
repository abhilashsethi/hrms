import {
	AccountTreeRounded,
	Add,
	BorderColor,
	Close,
	EventNote,
	FreeBreakfast,
	Receipt,
	SupportAgent,
} from "@mui/icons-material";
import {
	Avatar,
	Button,
	Card,
	CircularProgress,
	Container,
	Drawer,
	IconButton,
	Modal,
	Tooltip,
} from "@mui/material";
import { DEFAULTPROFILE, DOC, IMG, PDF, SAMPLEDP } from "assets/home";
import { Loader } from "components/core";
import { DocPreview } from "components/dialogues";
import AddMeetingNotes from "components/dialogues/AddMeetingNotes";
import { useChange, useFetch } from "hooks";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import { makeStyles } from "@material-ui/core";

type Props = {
	open?: boolean | any;
	onClose: () => void;
	setViewTickets?: any;
	ticket?: any;
	meetingDetails: any;
	mutate?: any;
};

const useStyles = makeStyles((theme) => ({
	container: {
		width: "100vw",
		[theme.breakpoints.up("sm")]: {
			maxWidth: "50vw",
		},
		[theme.breakpoints.up("md")]: {
			maxWidth: "80vw",
		},
		[theme.breakpoints.up("lg")]: {
			maxWidth: "30vw",
		},
	},
}));

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

const ViewNotesDrawer = ({ open, onClose, meetingDetails, mutate }: Props) => {
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

	const [editDetails, setEditDetails] = useState<boolean>(false);
	const classes = useStyles();

	return (
		<>
			<DocPreview
				open={isPreview?.dialogue}
				handleClose={() => setIsPreview({ dialogue: false })}
				title={isPreview?.title}
			/>

			<AddMeetingNotes
				open={editDetails}
				handleClose={() => setEditDetails(false)}
				details={meetingDetails}
				mutate={mutate}
			/>

			<Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
				<Container
					style={{ marginTop: "1rem" }}
					className={classes.container}
					// style={{
					// 	width: "30vw",
					// 	marginTop: "3.5vh",
					// }}
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
						<div className="flex ">
							<Button
								variant="contained"
								className="!bg-blue-500 "
								startIcon={<Add />}
								size="small"
								onClick={() => setEditDetails((prev) => !prev)}
							>
								Add Notes
							</Button>
							<IconButton onClick={() => onClose()}>
								<Close
									fontSize="small"
									className="text-red-500 block md:hidden"
								/>
							</IconButton>
						</div>
					</div>

					{isLoading && <Loader />}
					<div className="mt-4 flex flex-col gap-4">
						<div className="">
							{meetingDetails?.notes?.map((item: any, i: any) => {
								return (
									<div
										key={i}
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
														<span className="text-sm text-gray-600">
															{item?.text}
														</span>
														<span className="font-semibold text-sm text-gray-500">
															{/* {item?.name} */}
														</span>
													</p>
													<p className="font-semibold">
														Added By :{" "}
														<span className="font-semibold text-sm text-gray-500">
															{item?.addedBy?.name}
														</span>
													</p>

													<p className="font-semibold">
														Note Link :{" "}
														<a
															className="text-sm font-medium text-blue-500 underline"
															target="_blank"
															href={`${item?.link}`}
														>
															Note Link
														</a>
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
		notes: "Yard ERP Notes",
		img: <img className="w-12" src={PDF.src} alt="" />,
		addedBy: "Sales Person",
	},
	{
		id: 2,
		notes: "HRMS meeting notes ",
		img: <img className="w-12" src={IMG.src} alt="" />,
		addedBy: "Sales Person",
	},
	{
		id: 3,
		notes: "Meeting Notes",
		img: <img className="w-12" src={DOC.src} alt="" />,
		addedBy: "Sales Person",
	},
	{
		id: 4,
		notes: "Meeting Notes",
		img: <img className="w-12" src={PDF.src} alt="" />,
		addedBy: "Sales Person",
	},
];
