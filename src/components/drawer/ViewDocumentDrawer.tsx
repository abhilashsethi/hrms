import { makeStyles } from "@material-ui/core";
import { Add, Close, Delete, Person } from "@mui/icons-material";
import {
	Button,
	Card,
	CircularProgress,
	Container,
	Drawer,
	IconButton,
	Modal,
} from "@mui/material";
import { DOC, IMG, PDF, XLS } from "assets/home";
import { Loader, NoDatas } from "components/core";
import { DocPreview } from "components/dialogues";
import AddDocumentDialogue from "components/dialogues/AddDocumentDialogue";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";

type Props = {
	open?: boolean | any;
	onClose: () => void;
	setViewDocument?: any;
	employData?: any;
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

const ViewDocumentDrawer = ({
	open,
	onClose,
	employData,
	setViewDocument,
}: Props) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeDocLink, setActiveDocLink] = useState<any>();

	const [openInfoModal, setOpenInfoModal] = useState(false);
	const handleInfoOpen = () => {
		setOpenInfoModal(true);
	};
	const handleInfoCloseModal = () => setOpenInfoModal(false);

	const { data: users, isLoading } = useFetch<User[]>(`users`);

	const [getDocument, setGetDocument] = useState<boolean>(false);

	const [isPreview, setIsPreview] = useState<{
		dialogue?: boolean;
		title?: string;
	}>({
		dialogue: false,
		title: "Preview",
	});
	const classes = useStyles();

	const { data: documentDetails, mutate } = useFetch<any>(
		`users/${employData?.id}`
	);
	return (
		<>
			<DocPreview
				open={isPreview?.dialogue}
				handleClose={() => setIsPreview({ dialogue: false })}
				title={isPreview?.title}
				data={documentDetails?.documents}
				activeLink={activeDocLink}
			/>

			<AddDocumentDialogue
				open={getDocument}
				handleClose={() => setGetDocument(false)}
				// details={meetingDetails}
				mutate={mutate}
			/>

			<Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
				<Container style={{ marginTop: "1rem" }} className={classes.container}>
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
							{activeDocLink && (
								<iframe
									src={activeDocLink}
									width="100%"
									height="500"
									title="Document Preview"
								/>
							)}
						</Card>
					</Modal>

					{/* Drawer Element */}

					<div className="flex items-center justify-between pb-4">
						<p className="text-lg font-bold text-theme flex gap-3 items-center">
							<Person />
							View Documents
						</p>
						<button
							onClick={() => setGetDocument((prev) => !prev)}
							className="flex text-sm items-center bg-white text-theme p-1 rounded-md group hover:bg-theme hover:text-white border border-theme"
						>
							Add Document{" "}
							<Add
								fontSize="small"
								className="text-theme group-hover:text-white transition duration-500 ease-in-out"
							/>
						</button>
						<IconButton onClick={() => onClose()}>
							<Close
								fontSize="small"
								className="text-red-500 block md:hidden"
							/>
						</IconButton>
					</div>

					{isLoading && <Loader />}
					{documentDetails?.documents?.length === 0 && (
						<NoDatas title="No documents found!" />
					)}
					<div className="">
						<div className="mt-4 ">
							<div className="grid grid-cols-3 gap-y-3 w-full">
								{documentDetails?.documents?.map((item: any) => (
									<div
										key={item?.id}
										className="h-28 w-28 border-2 rounded-md flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-slate-200 transition-all ease-in-out duration-200"
									>
										<a
											className="cursor-pointer flex flex-col items-center justify-center"
											href={`${item?.link}`}
										>
											<img
												className="w-12"
												src={
													item?.docType === "pdf"
														? PDF.src
														: item?.docType === "img"
														? IMG.src
														: DOC.src
												}
												alt=""
											/>
										</a>
										<p className="text-xs">
											{item?.title?.slice(0, 9)}
											{item?.title?.length > 9 ? "..." : null}
										</p>
										<DeleteButton id={item?.id} mutate={mutate} />
									</div>
								))}
							</div>
						</div>
					</div>
				</Container>
			</Drawer>
		</>
	);
};

export default ViewDocumentDrawer;

const docs = [
	{ id: 1, title: "Doc 53426", img: PDF.src },
	{ id: 2, title: "Document432", img: DOC.src },
	{ id: 3, title: "CSV4536", img: XLS.src },
	{ id: 4, title: "DCIM356.", img: IMG.src },
	{ id: 5, title: "traac12", img: DOC.src },
	{ id: 6, title: "JPGJHHJ11", img: PDF.src },
	{ id: 7, title: "hghgug", img: PDF.src },
];

const Drawer_document = [
	{
		id: 1,
		title: "Document Title 1",
	},
	{
		id: 2,
		title: "Document Title 2",
	},
	{
		id: 3,
		title: "Document Title 3",
	},
	{
		id: 4,
		title: "Document Title 4",
	},
	{
		id: 5,
		title: "Document Title 5",
	},
	{
		id: 6,
		title: "Document Title 6",
	},
];
interface ButtonProps {
	id?: string | null | undefined;
	mutate?: any;
}

const DeleteButton = ({ id, mutate }: ButtonProps) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { change } = useChange();
	const handleDelete = (id: any) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You want to delete!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			try {
				setLoading(true);
				if (result.isConfirmed) {
					Swal.fire(`Info`, "It will take some time", "info");
					const response = await change(
						`users/delete-doc/${router?.query?.id}/${id}`,
						{
							method: "DELETE",
						}
					);
					setLoading(false);
					if (response?.status !== 200) {
						Swal.fire("Error", "Something went wrong!", "error");
					}
					mutate();
					Swal.fire("Success", "Deleted successfully!", "success");
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
			} finally {
				setLoading(false);
			}
		});
	};
	return (
		<Button
			onClick={() => {
				// setActiveId(item?.id);
				handleDelete(id);
			}}
			disabled={loading}
			variant="contained"
			className="!bg-red-500 text-xs"
			startIcon={loading ? <CircularProgress size={20} /> : <Delete />}
			size="small"
		>
			DELETE
		</Button>
	);
};
