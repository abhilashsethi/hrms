import {
	Add,
	AddCardRounded,
	BorderColor,
	Cancel,
	CheckCircle,
	Close,
	CloseSharp,
	InsertDriveFile,
	Person,
	Search,
} from "@mui/icons-material";
import {
	Avatar,
	Button,
	Card,
	CircularProgress,
	Container,
	Drawer,
	Modal,
	Radio,
	TextField,
	Tooltip,
} from "@mui/material";
import { DEFAULTPROFILE, SAMPLEDP } from "assets/home";
import { Loader } from "components/core";
import { useChange, useFetch } from "hooks";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";

type Props = {
	open?: boolean | any;
	onClose: () => void;
	setViewDocument?: any;
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

const ViewDocumentDrawer = ({ open, onClose, setViewDocument }: Props) => {
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedUser, setSelectedUser] = useState<string | null>(null);
	const [searchedUser, setSearchedUser] = useState<any>([]);

	const [openInfoModal, setOpenInfoModal] = useState(false);
	const handleInfoOpen = () => {
		setOpenInfoModal(true);
	};
	const handleInfoCloseModal = () => setOpenInfoModal(false);

	const { data: users, isLoading } = useFetch<User[]>(`users`);
	useEffect(() => {
		if (users) {
			const filtered = users.filter((user) =>
				user.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setSearchedUser(filtered);
		}
	}, [users, searchTerm]);

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

	return (
		<>
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

					{/* Drawer Element */}

					<div className="flex items-center justify-between pb-4">
						<p className="text-lg font-bold text-theme flex gap-3 items-center">
							<Person />
							View Documents
						</p>
						<button className="flex text-sm items-center bg-white text-theme p-1 rounded-md group hover:bg-theme hover:text-white border border-theme">
							Add Document{" "}
							<Add
								fontSize="small"
								className="text-theme group-hover:text-white transition duration-500 ease-in-out"
							/>
						</button>
					</div>

					{isLoading && <Loader />}
					<div className="mt-4 flex flex-col gap-4">
						{/* {!searchedUser?.length && (
							<p className="py-8 text-center flex gap-3 items-center justify-center">
								<Search /> No results found!
							</p>
						)} */}
						{Drawer_document?.map((item, index) => {
							return (
								<div
									key={index}
									className="w-full rounded-l-xl shadow-xl border-t flex justify-between items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-100 to-teal-100"
								>
									{/* <div className="w-1/5">
										<div className="h-[4rem] w-[4rem] rounded-full overflow-hidden shadow-lg">
											<img
												className="h-full w-full object-cover"
												src={DEFAULTPROFILE.src}
												alt=""
											/>
											<iframe
												src="/AllData (66).pdf"
												height={100}
												width={100}
											/>
										</div>
									</div> */}
									<Tooltip title="View Document">
										<div
											onClick={() => handleInfoOpen()}
											className="w-16 cursor-pointer hover:scale-90 transition duration-200 ease-in-out"
										>
											<img src="/folder.png" alt="" />
										</div>
									</Tooltip>
									<div>
										<p className="font-semibold">{item?.title}</p>
									</div>
									<div className="font-medium text-sm flex items-center">
										<Tooltip title="Update">
											<Avatar
												variant="rounded"
												className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-green-500 !p-0"
												sx={{
													mr: ".1vw",
													padding: "0px !important",
													backgroundColor: "Highlight",
													cursor: "pointer",
													color: "",
												}}
											>
												<BorderColor sx={{ padding: "0px !important" }} />
											</Avatar>
										</Tooltip>
										<Tooltip title="Remove">
											<Avatar
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
												<Close sx={{ padding: "0px !important" }} />
											</Avatar>
										</Tooltip>
									</div>
								</div>
							);
						})}
					</div>
				</Container>
			</Drawer>
		</>
	);
};

export default ViewDocumentDrawer;
