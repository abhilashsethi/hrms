import {
	Edit,
	HelpCenter,
	Receipt,
	SendRounded,
	Support,
	SupportAgent,
} from "@mui/icons-material";
import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import ICONS from "assets/icons";
import { RenderIconRow } from "components/common";
import { HeadText, Loader, PhotoViewer } from "components/core";
import {
	BankInformationUpdate,
	ChangeProfile,
	PersonalInformations,
	UpdateProfileHead,
} from "components/dialogues";
import { useFetch } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { User } from "types";
import EmployProjects from "../EmployProjects";
import ClientMeetings from "./ClientMeetings";
import ClientProjects from "./ClientProjects";
import { ViewTicketsDrawer } from "components/drawer";
import ClientChats from "./ClientChats";

const TicketDetails = () => {
	const router = useRouter();
	const [isDialogue, setIsDialogue] = useState(false);
	const [isProfile, setIsProfile] = useState(false);
	const [isPersonal, setIsPersonal] = useState(false);
	const [isBank, setIsBank] = useState(false);
	const [tickets, setTickets] = useState(false);
	const [viewTickets, setViewTickets] = useState<any>(null);
	const {
		data: employData,
		mutate,
		isLoading,
	} = useFetch<User>(`users/${router?.query?.id}`);

	if (isLoading) {
		return <Loader />;
	}
	return (
		<section>
			<section className="mb-12 flex gap-3">
				<Grid container spacing={2}>
					<Grid item lg={8}>
						<div className="w-full h-full rounded-lg bg-white shadow-xl p-4">
							<div className="w-full bg-blue-100/50 rounded-lg p-8">
								<Grid container spacing={3}>
									<Grid item lg={9}>
										<div className="tracking-wide w-full h-full">
											<div className="flex items-center gap-2 -ml-5">
												<div className="h-3 w-3 rounded-sm bg-theme"></div>
												<p className="font-bold tracking-wide">
													Requester Details
												</p>
											</div>
											<p className="text-md text-slate-600 font-medium mt-1">
												{employData?.name || "John Smith"}
											</p>
											{/* <p className="text-sm text-slate-600 font-medium mt-1">
												{employData?.role?.name || "Client" || "---"}
											</p> */}

											<p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
												<RenderIconRow
													value={
														employData?.email || "johnsmith@gmail.com" || "---"
													}
													isEmail
												/>
											</p>
											<p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
												<RenderIconRow
													value={employData?.phone || "9974521485" || "---"}
													isPhone
												/>
											</p>
										</div>
									</Grid>
									<Grid item lg={3}>
										{/* <div className="w-full h-full flex justify-center items-center">
											<div className="h-24 w-24 rounded-full border-[4px] border-white flex justify-center items-center text-3xl">
												<div className="relative h-full w-full flex justify-center items-center group">
													{employData?.photo && (
														<div className="h-full w-full bg-slate-300 rounded-full">
															<img
																className="h-full w-full object-cover rounded-full shadow-md"
																src={
																	employData?.photo ||
																	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzTSDO6sbQw9RJmGwMKYaubB1wDwyqOYAfuWM1fg&s"
																}
																alt="John Doe"
															/>
														</div>
													)}
													{!employData?.photo && (
														<div className="h-full w-full text-white rounded-full uppercase shadow-lg flex justify-center items-center text-4xl font-bold bg-gradient-to-br from-theme-100 via-theme-50 to-secondary-100">
															{employData?.name.slice(0, 1)}
														</div>
													)}
													<div
														onClick={() => setIsProfile(true)}
														className="absolute cursor-pointer rounded-full w-full h-full group-hover:flex transition-all ease-in-out duration-300 justify-center items-center hidden  bg-[#0007]"
													>
														<Edit className="!text-white" />
													</div>
												</div>
											</div>
										</div> */}
										<PhotoViewer
											photo={
												"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
											}
											size="5.5rem"
										/>
									</Grid>
								</Grid>
								<div className="flex justify-between items-center pt-4">
									<div className="w-1/2 flex justify-between gap-3 mb-7">
										<div className="hover:scale-95 transition duration-500 ease-in-out cursor-pointer border border-gray-600 text-center w-1/2 py-5 rounded-md bg-slate-200 shadow-lg">
											<p className={`text-xs  font-bold`}>PROJECTS COMPLETED</p>
											<p className="text-md font-semibold">16</p>
										</div>
										<div className="hover:scale-95 transition duration-500 ease-in-out cursor-pointer border border-gray-600 text-center w-1/2 py-5 rounded-md bg-slate-200 shadow-lg">
											<p className={`text-xs  font-bold`}>ONGOING PROJECTS</p>
											<p className="text-md font-semibold">2</p>
										</div>
									</div>
								</div>
								<div className="font-bold mb-1">Ticket Description :</div>
								<p className="text-gray-600 font-medium text-sm">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Voluptates adipisci a facere voluptatum debitis totam
									asperiores temporibus cumque commodi labore consectetur fugiat
									nihil eveniet doloribus doloremque corrupti voluptate, error
									beatae ea culpa tempore nemo eum. Enim rerum nobis quaerat
									molestiae.
								</p>
							</div>
						</div>
					</Grid>
					<Grid item lg={4}>
						<div className="w-full h-full">
							<ClientChats />
							{/* <ClientProjects /> */}
							{/* <EmployLeaves /> */}
						</div>
					</Grid>
				</Grid>
			</section>
		</section>
	);
};

export default TicketDetails;
