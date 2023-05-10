import { AccountTreeRounded, FreeBreakfast } from "@mui/icons-material";
import {
	Avatar,
	Card,
	CircularProgress,
	Container,
	Drawer,
	Modal,
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
	setViewTickets?: any;
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
];

const ViewTicketsDrawer = ({ open, onClose, setViewTickets }: Props) => {
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
						<p className="text-lg font-bold text-theme">View Projects</p>
					</div>

					{isLoading && <Loader />}
					<div className="mt-4 flex flex-col gap-4">
						{/* {!searchedUser?.length && (
							<p className="py-8 text-center flex gap-3 items-center justify-center">
								<Search /> No results found!
							</p>
						)} */}
						{Projects_Details?.map((item, index) => {
							return (
								<div className="">
									<div
										key={index}
										className="w-full relative rounded-l-xl shadow-xl px-2 py-2 bg-gradient-to-r from-rose-100 to-teal-100 my-3"
									>
										<div className="absolute -top-4">
											<Avatar
												onClick={() => handleInfoOpen()}
												variant="rounded"
												className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-blue-700 !p-0"
											>
												<FreeBreakfast
													sx={{ padding: "0px !important" }}
													fontSize="large"
												/>
											</Avatar>
										</div>
										<div className="flex justify-end w-full">
											<p className="border border-green-500 p-1 rounded-full text-xs font-semibold text-white bg-green-500 hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
												Progress
											</p>
										</div>
										<div className=" text-center">
											<h1 className="text-lg font-bold inline-block">
												{item?.title}
											</h1>{" "}
										</div>
										<div className="mt-4">
											<h1 className="text-md font-bold">Team Lead</h1>{" "}
											<div className="flex w-full justify-between items-center gap-5">
												<img
													className="h-20 w-20 bg-slate-400 rounded-full shadow-xl"
													src={"/manager.png"}
													alt=""
												/>
												<div className="">
													<p className="font-semibold">
														Name :{" "}
														<span className="font-semibold text-sm text-gray-500">
															{item?.name}
														</span>
													</p>
													<p className="font-semibold">
														Start Date :{" "}
														<span className="font-semibold text-sm text-gray-500">
															{item?.startDate}
														</span>
													</p>
													<p className="font-semibold">
														End Date :{" "}
														<span className="font-semibold text-sm text-gray-500">
															{item?.endDate}
														</span>
													</p>
												</div>
												<Tooltip title="Project Details">
													<div className="w-24 rounded-full group flex justify-start items-center hover:scale-105 ease-in-out transition-all duration-400 cursor-pointer !text-blue-600 flex-col gap-2">
														<span className="p-2 bg-white shadow-lg rounded-md transition-all ease-in-out duration-200">
															<span>
																<AccountTreeRounded />{" "}
															</span>
														</span>
														<p className="text-xs text-center font-semibold ">
															Details
														</p>
													</div>
												</Tooltip>
											</div>
										</div>
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

export default ViewTicketsDrawer;
