import { Avatar, Card, Container, Drawer, Modal, Tooltip } from "@mui/material";
import { AccountTreeRounded, FreeBreakfast } from "@mui/icons-material";
import { DEFAULTPROFILE, SAMPLEDP } from "assets/home";
import { Loader, SkeletonLoader } from "components/core";
import { useChange, useFetch } from "hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "types";
import moment from "moment";
import ICONS from "assets/icons";
import { ProjectDrawerSkeletonLoading } from "components/admin/clients";
import { NODOCUMENT } from "assets/animations";

type Props = {
	open?: boolean | any;
	onClose: () => void;
	setViewProject?: any;
	ticketsId?: any;
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

const ViewProjectsDrawerClientMain = ({
	open,
	onClose,
	setViewProject,
	ticketsId,
}: Props) => {
	const [openInfoModal, setOpenInfoModal] = useState(false);
	const handleInfoOpen = () => {
		setOpenInfoModal(true);
	};
	const handleInfoCloseModal = () => setOpenInfoModal(false);
	const { data: projectData, isLoading } = useFetch<any>(
		`projects?${ticketsId ? `&clientId=${ticketsId}` : ""}`
	);
	return (
		<>
			<Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
				<Container className="lg:w-[30vw] mt-[3.5vh]">
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
						<span onClick={() => onClose && onClose()}>
							<ICONS.Close />
						</span>
						<p className="text-lg font-bold text-theme">View All Projects</p>
					</div>

					{isLoading && <ProjectDrawerSkeletonLoading />}
					<div className="mt-4 flex flex-col gap-4">
						{projectData?.length ? (
							projectData?.map((item: any, index: any) => {
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
													{item?.status}
												</p>
											</div>
											<div className=" text-center">
												<h1 className="text-lg font-bold inline-block">
													{item?.name}
												</h1>{" "}
											</div>
											<div className="mt-4">
												<h1 className="text-md font-semibold mb-2">Team Lead</h1>{" "}
												<div className="flex w-full justify-between items-center gap-5">
													{/* <Avatar
                          alt={item?.manager?.name}
                          src={item?.manager?.photo}
                          className="h-20 w-20 bg-slate-400 rounded-full shadow-xl"
                        /> */}

													<img
														className="h-20 w-20 bg-slate-400 rounded-full shadow-xl"
														src={
															item?.manager?.photo
																? item?.manager?.photo
																: "/manager.png"
														}
														alt=""
													/>
													<div className="">
														<p className="font-semibold">
															Name :{" "}
															<span className="font-semibold text-sm text-gray-500">
																{item?.manager?.name
																	? item?.manager?.name
																	: "Name Not Set"}
															</span>
														</p>
														<p className="font-semibold">
															Start Date :{" "}
															<span className="font-semibold text-sm text-gray-500">
																{item?.startDate
																	? moment(item?.startDate).format("ll")
																	: "Not Set"}
															</span>
														</p>
														<p className="font-semibold">
															End Date :{" "}
															<span className="font-semibold text-sm text-gray-500">
																{item?.endDate
																	? moment(item?.endDate).format("ll")
																	: "Not Set"}
															</span>
														</p>
													</div>
													<Tooltip title="Project Details">
														<div className="w-24 rounded-full group flex justify-start items-center hover:scale-105 ease-in-out transition-all duration-400 cursor-pointer !text-blue-600 flex-col gap-2">
															<span className="p-2 bg-white shadow-lg rounded-md transition-all ease-in-out duration-200">
																<Link
																	href={`/admin/projects/project-details?id=${item?.id}`}
																>
																	<AccountTreeRounded />{" "}
																</Link>
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
							})
						) : <Loader image={NODOCUMENT} />}
					</div>
				</Container>
			</Drawer>
		</>
	);
};

export default ViewProjectsDrawerClientMain;
