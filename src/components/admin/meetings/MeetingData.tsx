import {
	AccessTime,
	AccountTree,
	Add,
	BorderColor,
	BugReport,
	Handyman,
	Receipt,
	Send,
} from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import ICONS from "assets/icons";
import { RenderIconRow } from "components/common";
import { Loader, PhotoViewer } from "components/core";
import { ChangeProfile, UpdateClient } from "components/dialogues";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { Client } from "types";
import { ViewTicketsDrawer } from "components/drawer";
import { DEFAULTPROFILE, DOC, IMG, PDF, XLS } from "assets/home";

const MeetingData = () => {
	const router = useRouter();
	const [isDialogue, setIsDialogue] = useState(false);
	const [tickets, setTickets] = useState(false);
	const [viewTickets, setViewTickets] = useState<any>(null);
	const {
		data: clientData,
		mutate,
		isLoading,
	} = useFetch<Client>(`clients/${router?.query?.id}`);

	if (isLoading) {
		return <Loader />;
	}
	return (
		<section>
			<UpdateClient
				mutate={mutate}
				open={isDialogue}
				handleClose={() => setIsDialogue(false)}
			/>
			<ViewTicketsDrawer
				open={tickets}
				onClose={() => setTickets(false)}
				setViewTickets={setViewTickets}
			/>
			<section className="mb-12 flex gap-3">
				<div className="w-full m-auto rounded-lg bg-white shadow-xl p-4">
					<div className="relative w-full bg-blue-100/50 rounded-lg p-4">
						<div className="absolute top-3 left-[25rem]">
							<Button
								variant="contained"
								className="!bg-blue-500 "
								startIcon={<BorderColor />}
								size="small"
							>
								Edit
							</Button>
						</div>
						<Grid container spacing={3}>
							<Grid item lg={5}>
								<div>
									<p className="pb-1 text-lg font-semibold">
										Meeting Name :{" "}
										<span className="font-normal">HRMS Meeting</span>
									</p>
									<div className="py-1 group flex items-center gap-x-2 tracking-wide">
										<p className=" font-semibold">Time</p> : <AccessTime />
										<span>10:00 AM - 12:00 PM</span>
									</div>
									<div className="py-1 group flex items-center gap-x-2 tracking-wide">
										<p className=" font-semibold">Client Name</p> :{" "}
										<span>John Smith</span>
									</div>
									<div className="py-1 group flex items-center gap-x-2 tracking-wide">
										<p className=" font-semibold">Client Email</p> :{" "}
										<span>john@gmail.com</span>
									</div>
									<div className="py-1 group flex items-center gap-x-2 tracking-wide">
										<p className=" font-semibold">Client Phone</p> :{" "}
										<span>8496587412</span>
									</div>
									<div className="py-1 group flex items-center gap-x-2 tracking-wide">
										<p className=" font-semibold">Client Country</p> :{" "}
										<span>Australia</span>
									</div>
									<div className="py-1 group flex items-center gap-x-2 tracking-wide">
										<p className=" font-semibold">Members Visited</p> :{" "}
										<span>Srinu Readdy</span>
									</div>
									<div className="relative w-full">
										<div className="absolute top-3 left-[20rem]">
											<Button
												variant="contained"
												className="!bg-blue-500 "
												startIcon={<Add />}
												size="small"
											>
												Add Document
											</Button>
										</div>
										<p className="font-semibold pb-3">Documents :</p>
										<div className="grid grid-cols-3 w-2/3 gap-6">
											<div className="cursor-pointer">
												<img className="w-12" src={PDF.src} alt="" />
												<p className="text-xs">doc_1002...</p>
											</div>
											<div className="cursor-pointer">
												<img className="w-12" src={DOC.src} alt="" />
												<p className="text-xs">doc_1003...</p>
											</div>
											<div className="cursor-pointer">
												<img className="w-12" src={XLS.src} alt="" />
												<p className="text-xs">doc_1004...</p>
											</div>
											<div className="cursor-pointer">
												<img className="w-12" src={IMG.src} alt="" />
												<p className="text-xs">doc_1005...</p>
											</div>
											<div className="cursor-pointer">
												<img className="w-12" src="/docs.png" alt="" />
												<p className="text-xs">doc_1006...</p>
											</div>
											<div className="cursor-pointer">
												<img className="w-12" src="/docs.png" alt="" />
												<p className="text-xs">doc_1006...</p>
											</div>
											{/* <div className="border border-theme h-8 mt-3 flex justify-center items-center rounded-lg text-sm text-theme hover:scale-95 transition duration-300 ease-in-out hover:bg-theme hover:text-white">
												<button onClick={() => setTickets(true)}>
													View All
												</button>
											</div> */}
										</div>
									</div>
								</div>
							</Grid>
							<Grid item lg={7}>
								<div className="w-full h-full">
									<iframe
										className="w-full h-full"
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.0498150250405!2d85.77649581162628!3d20.25676868112798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a740ae304117%3A0x629ce9db127f69ef!2sSearchingYard%20Software%20Group!5e0!3m2!1sen!2sin!4v1682685199057!5m2!1sen!2sin"
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
									></iframe>
								</div>
							</Grid>
						</Grid>
					</div>
				</div>
			</section>
		</section>
	);
};

export default MeetingData;
