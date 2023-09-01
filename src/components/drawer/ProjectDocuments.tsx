import {
	Add,
	Close,
	Delete,
	Download,
	InsertDriveFileRounded,
} from "@mui/icons-material";
import {
	Avatar,
	Button,
	CircularProgress,
	Container,
	Drawer,
	IconButton,
	Tooltip,
} from "@mui/material";
import { NODOCUMENT } from "assets/animations";
import { DOC, IMG, PDF, XLS } from "assets/home";
import { LoaderAnime } from "components/core";
import AddDocumentModal from "components/dialogues/AddDocumentModal";
import { useAuth, useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core";

type Props = {
	open?: boolean | any;
	onClose: () => void;
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

const ProjectDocuments = ({ open, onClose }: Props) => {
	const { user } = useAuth();
	const router = useRouter();
	const [getDocument, setGetDocument] = useState<boolean>(false);
	const { data: documentDetails, mutate } = useFetch<any>(
		`projects/${router?.query?.id}`
	);

	const classes = useStyles();

	return (
		<>
			<AddDocumentModal
				open={getDocument}
				handleClose={() => setGetDocument(false)}
				// details={meetingDetails}
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
					<IconButton
						className="flex justify-end w-full"
						onClick={() => onClose()}
					>
						<Close fontSize="small" className="text-red-500 block md:hidden" />
					</IconButton>
					<div className="flex items-center justify-between pb-4">
						<p className="md:text-lg text-md font-bold text-theme flex gap-3 items-center">
							<InsertDriveFileRounded />
							Project Documents
						</p>
						{user?.role?.name === "CEO" ||
						user?.role?.name === "HR" ||
						user?.role?.name === "DIRECTOR" ||
						user?.role?.name === "COO" ||
						user?.role?.name === "PROJECT MANAGER" ? (
							<button
								onClick={() => setGetDocument((prev) => !prev)}
								className="flex text-sm items-center bg-white text-theme md:p-1 p-[2px] rounded-md group hover:bg-theme hover:text-white border border-theme"
							>
								Add Document{" "}
								<Add
									fontSize="small"
									className="text-theme group-hover:text-white transition duration-500 ease-in-out"
								/>
							</button>
						) : null}
					</div>
					<div className="flex justify-center w-full">
						<div className="flex gap-2 flex-wrap">
							{documentDetails?.docs?.filter(
								(item: any) => item.docType === "pdf" || item.docType === "img"
							)?.length ? (
								documentDetails?.docs
									.filter(
										(item: any) =>
											item.docType === "pdf" || item.docType === "img"
									)
									?.map((item: any) => (
										<div
											key={item?.id}
											className="h-28 w-28 border-2 rounded-md grid grid-cols-1 items-center justify-center cursor-pointer hover:bg-slate-200 transition-all ease-in-out duration-200"
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
											<p className="text-xs text-center font-semibold">
												{item?.title?.slice(0, 9)}
												{item?.title?.length > 9 ? "..." : null}
											</p>
											<DeleteButton id={item?.id} mutate={mutate} />
										</div>
									))
							) : (
								<div className="md:w-[27vw] w-[100vw] mt-28 flex justify-center items-center">
									<LoaderAnime
										image={NODOCUMENT}
										animeHight={200}
										animeWidth={150}
										text={"No Documents found!"}
									/>
								</div>
							)}
						</div>
					</div>
				</Container>
			</Drawer>
		</>
	);
};

export default ProjectDocuments;

const docs = [
	{ id: 1, title: "Doc 53426", img: PDF.src },
	{ id: 2, title: "Document432", img: DOC.src },
	{ id: 3, title: "CSV4536", img: XLS.src },
	{ id: 4, title: "DCIM356.", img: IMG.src },
	{ id: 5, title: "traac12", img: DOC.src },
	{ id: 6, title: "JPGJHHJ11", img: PDF.src },
	{ id: 7, title: "hghgug", img: PDF.src },
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
						`projects/delete-doc/${router?.query?.id}/${id}`,
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
