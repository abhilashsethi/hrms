import {
	Add,
	Close,
	Delete,
	Download,
	InsertDriveFileRounded,
} from "@mui/icons-material";
import { Avatar, Container, Drawer, IconButton, Tooltip } from "@mui/material";
import { NODOCUMENT } from "assets/animations";
import { DOC, IMG, PDF, XLS } from "assets/home";
import { LoaderAnime } from "components/core";
import AddDocumentModal from "components/dialogues/AddDocumentModal";
import { useChange, useFetch } from "hooks";
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
	const router = useRouter();
	const [isPreview, setIsPreview] = useState<{
		dialogue?: boolean;
		title?: string;
	}>({
		dialogue: false,
		title: "Preview",
	});
	const [activeDocLink, setActiveDocLink] = useState<any>();
	const [activeId, setActiveId] = useState<any>();
	const [getDocument, setGetDocument] = useState<boolean>(false);
	const { data: documentDetails, mutate } = useFetch<any>(
		`projects/${router?.query?.id}`
	);
	const { change } = useChange();
	const handleDelete = (id: string) => {
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
				if (result.isConfirmed) {
					const response = await change(
						`projects/delete-doc/${router?.query?.id}/${id}`,
						{
							method: "DELETE",
						}
					);
					if (response?.status !== 200) {
						Swal.fire("Error", "Something went wrong!", "error");
					}
					Swal.fire("Success", "Deleted successfully!", "success");
					mutate();
				}
			} catch (error) {
				console.log(error);
			}
		});
	};
	const classes = useStyles();

	return (
		<>
			{/* <DocPreview
				open={isPreview?.dialogue}
				handleClose={() => setIsPreview({ dialogue: false })}
				title={isPreview?.title}
				data={documentDetails?.documents}
				activeLink={activeDocLink}
			/> */}

			<AddDocumentModal
				open={getDocument}
				handleClose={() => setGetDocument(false)}
				// details={meetingDetails}
				// mutate={mutate}
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
					</div>
					<div className="flex justify-center w-full">
						<div className="flex gap-2 flex-wrap">
							{documentDetails?.docs?.length ? (
								documentDetails?.docs?.map((item: any) => (
									<div
										key={item?.id}
										className="h-40 w-28 border-2 rounded-md flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-slate-200 transition-all ease-in-out duration-200"
									>
										<img
											onClick={() => {
												setIsPreview({ dialogue: true, title: item?.title });
												setActiveDocLink(item?.link);
												setActiveId(item?.id);
											}}
											className="w-20"
											src={item?.docType === "pdf" ? PDF.src : ""}
											alt="photo"
										/>

										<p className="text-xs">
											{item?.title?.slice(0, 9)}
											{item?.title?.length > 9 ? "..." : null}
										</p>

										<div className="flex">
											<Tooltip title="Delete">
												<Avatar
													onClick={() => {
														setActiveId(item?.id);
														handleDelete(item?.id);
													}}
													variant="rounded"
													className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-500 !p-0"
													sx={{
														mr: ".1vw",
														padding: "0px !important",
														backgroundColor: "Highlight",
														cursor: "pointer",
														color: "",
													}}
												>
													<Delete sx={{ padding: "0px !important" }} />
												</Avatar>
											</Tooltip>

											<a href={activeDocLink}>
												<Tooltip title="Download">
													<Avatar
														variant="rounded"
														className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-blue-700 !p-0"
														sx={{
															mr: ".1vw",
															padding: "0px !important",
															backgroundColor: "Highlight",
															cursor: "pointer",
															color: "",
														}}
													>
														<Download sx={{ padding: "0px !important" }} />
													</Avatar>
												</Tooltip>
											</a>
										</div>
									</div>
								))
							) : (
								<div className="md:w-[27vw] w-[100vw] mt-28 flex justify-center items-center">
									<LoaderAnime
										image={NODOCUMENT}
										animeHight={400}
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
