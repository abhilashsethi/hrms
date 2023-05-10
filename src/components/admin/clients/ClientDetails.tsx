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

const ClientDetails = () => {
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
	const basicDetails = [
		{
			id: 1,
			title: "Name",
			value: `${employData?.name ? employData?.name : "---"}`,
		},
		{
			id: 2,
			title: "Email",
			value: `${employData?.email ? employData?.email : "---"}`,
		},

		{
			id: 4,
			title: "Date Of Joining",
			value: `${
				employData?.joiningDate
					? moment(employData?.joiningDate).format("ll")
					: "---"
			}`,
		},
		{
			id: 5,
			title: "Phone",
			value: `${employData?.phone ? employData?.phone : "---"}`,
		},
		{
			id: 6,
			title: "Date Of Birth",
			value: `${
				employData?.dob ? moment(employData?.dob).format("ll") : "---"
			}`,
		},
		{
			id: 7,
			title: "Address",
			value: `${employData?.address ? employData?.address : "---"}`,
		},
		{
			id: 8,
			title: "Gender",
			value: `${employData?.gender ? employData?.gender : "---"}`,
		},
		{
			id: 9,
			title: "Blood Group",
			value: `${employData?.bloodGroup ? employData?.bloodGroup : "---"}`,
		},
		{
			id: 9,
			title: "Wallet",
			value: `${employData?.wallet ? employData?.wallet : "---"}`,
		},
	];
	const personalDetails = [
		{
			id: 1,
			title: "PAN No",
			value: `${employData?.panNo ? employData?.panNo : "---"}`,
		},
		{
			id: 2,
			title: "Aadhar No",
			value: `${employData?.aadharNo ? employData?.aadharNo : "---"}`,
		},
		{
			id: 3,
			title: "Gmail",
			value: `${employData?.gmail ? employData?.gmail : "---"}`,
		},
		{
			id: 5,
			title: "Linkedin",
			value: `${employData?.linkedin ? employData?.linkedin : "---"}`,
		},
		{
			id: 6,
			title: "Github",
			value: `${employData?.github ? employData?.github : "---"}`,
		},
	];

	if (isLoading) {
		return <Loader />;
	}
	return (
		<section>
			<ChangeProfile
				open={isProfile}
				handleClose={() => setIsProfile(false)}
				mutate={mutate}
			/>
			<UpdateProfileHead
				mutate={mutate}
				open={isDialogue}
				handleClose={() => setIsDialogue(false)}
			/>
			<PersonalInformations
				mutate={mutate}
				open={isPersonal}
				handleClose={() => setIsPersonal(false)}
			/>
			<BankInformationUpdate
				mutate={mutate}
				open={isBank}
				handleClose={() => setIsBank(false)}
			/>
			<ViewTicketsDrawer
				open={tickets}
				onClose={() => setTickets(false)}
				setViewTickets={setViewTickets}
			/>
			<section className="mb-12 flex gap-3">
				<Grid container spacing={2}>
					<Grid item lg={8}>
						<div className="w-full h-full rounded-lg bg-white shadow-xl p-4">
							<div className="w-full bg-blue-100/50 rounded-lg p-8">
								<Grid container spacing={3}>
									<Grid item lg={9}>
										<div className="tracking-wide w-full h-full">
											<p className="font-semibold tracking-wide">
												{employData?.name || "John Smith"}
											</p>
											<p className="text-sm text-slate-600 font-medium mt-1">
												{employData?.role?.name || "Client" || "---"}
											</p>

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
									{/* <p className="font-medium text-sm">
										<span className="font-extrabold pr-2">16</span> PROJECTS
										COMPLETED
									</p>
									<p className="font-medium text-sm">
										<span className="font-extrabold pr-2">2</span> ONGOING
									</p> */}
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

									<Tooltip title="View All Tickets">
										<div
											onClick={() => setTickets(true)}
											className="w-32 rounded-full group flex justify-start items-center hover:scale-105 ease-in-out transition-all duration-400 cursor-pointer !text-blue-600 flex-col gap-2"
										>
											<span className="p-2 bg-white shadow-lg rounded-md group-hover:rotate-[-12deg] transition-all ease-in-out duration-200">
												<Receipt />
											</span>
											<p className="text-xs text-center font-semibold ">
												View All Tickets
											</p>
										</div>
									</Tooltip>
								</div>
							</div>
							{/* --------------------Basic Details-------------------- */}
							<section className="py-4 px-8">
								<div className=" pb-2 flex justify-between items-center">
									<HeadText title="Basic Details" />
									<Tooltip title="Edit">
										<IconButton onClick={() => setIsDialogue(true)}>
											<ICONS.Edit className="h-5 w-5" />
										</IconButton>
									</Tooltip>
								</div>
								{basicDetails?.map((item) => (
									<div
										key={item?.id}
										className="flex gap-2 items-center font-medium py-1.5"
									>
										<div className="w-[30%]">
											<p className="text-sm text-gray-600">{item?.title} :</p>
										</div>
										<div className="w-2/3">
											<p className="text-sm">{item?.value}</p>
										</div>
									</div>
								))}
							</section>
							{/* --------------Personal Details---------------------- */}
							<section className="px-8">
								<div className=" pb-2 flex justify-between items-center">
									<HeadText title="Personal Details" />
									<Tooltip title="Edit">
										<IconButton onClick={() => setIsPersonal(true)}>
											<ICONS.Edit className="h-5 w-5" />
										</IconButton>
									</Tooltip>
								</div>
								{personalDetails?.map((item) => (
									<div
										key={item?.id}
										className="flex gap-2 items-center font-medium py-1.5"
									>
										<div className="w-[30%]">
											<p className="text-sm text-gray-600">{item?.title} :</p>
										</div>
										<div className="w-2/3">
											<p className="text-sm">{item?.value}</p>
										</div>
									</div>
								))}
							</section>
							{/* ---------------------Bank Details------------------------- */}
							{/* <section className="px-8 mt-2">
                <div className=" pb-2 flex justify-between items-center">
                  <HeadText title="Bank Details" />
                  <Tooltip title="Edit">
                    <IconButton onClick={() => setIsBank(true)}>
                      <ICONS.Edit className="h-5 w-5" />
                    </IconButton>
                  </Tooltip>
                </div>
                {bankDetails?.map((item) => (
                  <div
                    key={item?.id}
                    className="flex gap-2 items-center font-medium py-1.5"
                  >
                    <div className="w-[30%]">
                      <p className="text-sm text-gray-600">{item?.title} :</p>
                    </div>
                    <div className="w-2/3">
                      <p className="text-sm">{item?.value}</p>
                    </div>
                  </div>
                ))}
              </section> */}
						</div>
					</Grid>
					<Grid item lg={4}>
						<div className="w-full h-full">
							<ClientMeetings />
							<ClientProjects />
							{/* <EmployLeaves /> */}
						</div>
					</Grid>
				</Grid>
			</section>
		</section>
	);
};

export default ClientDetails;
