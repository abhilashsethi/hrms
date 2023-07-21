import { AccountTree, BugReport, Handyman, Receipt } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import ICONS from "assets/icons";
import { RenderIconRow } from "components/common";
import {
	ClientProfileImage,
	CountryNameFlag,
	HeadText,
	IOSSwitch,
	Loader,
} from "components/core";
import { UpdateClient } from "components/dialogues";
import { ViewProjectsDrawerClient, ViewTicketsDrawer } from "components/drawer";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { Client } from "types";
import ClientMeetings from "./ClientMeetings";
import ClientProjects from "./ClientProjects";

const ClientDetails = () => {
	const router = useRouter();
	const { change } = useChange();
	const [isDialogue, setIsDialogue] = useState(false);
	const [tickets, setTickets] = useState(false);
	const [projects, setProjects] = useState(false);
	const [viewTickets, setViewTickets] = useState<any>(null);
	const {
		data: clientData,
		mutate,
		isLoading,
	} = useFetch<Client>(`clients/${router?.query?.id}`);
	console.log(clientData);
	const { data: ticketsData } = useFetch<any>(
		`tickets?${router?.query?.id ? `&clientId=${router?.query?.id}` : ""}`
	);
	const { data: projectData } = useFetch<any>(
		`projects?${router?.query?.id ? `&clientId=${router?.query?.id}` : ""}`
	);

	const basicDetails = [
		{
			id: 1,
			title: "Name",
			value: `${clientData?.name ? clientData?.name : "---"}`,
		},
		{
			id: 2,
			title: "Email",
			value: `${clientData?.email ? clientData?.email : "---"}`,
		},

		{
			id: 5,
			title: "Phone",
			value: `${clientData?.phone ? clientData?.phone : "---"}`,
		},

		{
			id: 8,
			title: "Gender",
			value: `${clientData?.gender ? clientData?.gender : "---"}`,
		},
		{
			id: 8,
			title: "Country",
			value: `${clientData?.country ? clientData?.country : "---"}`,
		},
	];
	if (isLoading) {
		return <Loader />;
	}
	const handleBlock = async (e: any) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You want to update status?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, update!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const res = await change(`clients/${clientData?.id}`, {
					method: "PATCH",
					body: { isBlocked: !e.target?.checked },
				});
				mutate();
				if (res?.status !== 200) {
					Swal.fire(`Error`, "Something went wrong!", "error");
					return;
				}
				Swal.fire(`Success`, "Client status updated successfully!!", "success");
				return;
			}
		});
	};
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
				ticket={ticketsData}
			/>
			<ViewProjectsDrawerClient
				open={projects}
				onClose={() => setProjects(false)}
				projectData={projectData}
			/>
			<section className="">
				<div className="grid lg:grid-cols-3 gap-4">
					<div className="lg:col-span-2">
						<div className="w-full rounded-lg bg-white shadow-xl p-4">
							<div className="w-full bg-blue-100/50 rounded-lg p-8">
								<div className="grid lg:grid-cols-2 gap-4">
									<div className="tracking-wide w-full h-full">
										<p className="font-semibold tracking-wide">
											{clientData?.name || "---"}
										</p>
										<p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
											<RenderIconRow
												value={clientData?.email || "---"}
												isEmail
											/>
										</p>
										<p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
											<RenderIconRow
												value={clientData?.phone || "---"}
												isPhone
											/>
										</p>
										<p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
											<CountryNameFlag
												countryName={clientData?.country || "---"}
											/>
										</p>
										<div className="w-full py-2 flex gap-2 mt-2">
											<div className=" py-1.5 rounded-lg border-2 flex items-center gap-2 px-4">
												<p className="font-semibold tracking-wide text-sm">
													STATUS
												</p>
												<IOSSwitch
													checked={clientData?.isBlocked}
													onChange={(e) => handleBlock(e)}
												/>
											</div>
										</div>
									</div>

									<div className="px-4 grid md:justify-items-end ">
										<span>
											<ClientProfileImage values={clientData} mutate={mutate} />
										</span>
									</div>
								</div>
								<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 items-center pt-4">
									<div
										onClick={() => setProjects(true)}
										className="hover:scale-95 transition duration-500 ease-in-out cursor-pointer text-center py-3 rounded-md shadow-lg bg-[#bbcbff] "
									>
										<Handyman
											fontSize="large"
											className="bg-white p-1 rounded-lg mb-3 text-theme"
										/>
										<p className={`text-sm text-gray-800 font-semibold`}>
											Total Projects
										</p>
										<p className="text-sm font-medium">
											{" "}
											{clientData?._count?.projects}
										</p>
									</div>
									<div
										onClick={() => setProjects(true)}
										className="hover:scale-95 transition duration-500 ease-in-out cursor-pointer text-center py-3 rounded-md shadow-lg bg-[#b9e9fd]"
									>
										<AccountTree
											fontSize="large"
											className="bg-white p-1 rounded-lg mb-3 text-theme"
										/>
										<p className={`text-sm text-gray-800 font-semibold`}>
											Completed Projects
										</p>
										<p className="text-sm font-medium">
											{clientData?.completedProjectCount}
										</p>
									</div>
									<div
										onClick={() => setTickets(true)}
										className="hover:scale-95 transition duration-500 ease-in-out cursor-pointer text-center py-3 rounded-md shadow-lg bg-[#f6c8ff]"
									>
										<Receipt
											fontSize="large"
											className="bg-white p-1 rounded-lg mb-3 text-theme"
										/>
										<p className={`text-sm text-gray-800 font-semibold`}>
											Total Tickets
										</p>
										<p className="text-sm font-medium">
											{clientData?._count.tickets}
										</p>
									</div>
									<div
										onClick={() => setTickets(true)}
										className="hover:scale-95 transition duration-500 ease-in-out cursor-pointer text-center py-3 rounded-md shadow-lg bg-[#feb76f]"
									>
										<BugReport
											fontSize="large"
											className="bg-white p-1 rounded-lg mb-3 text-theme"
										/>
										<p className={`text-sm text-gray-800 font-semibold`}>
											Resolved Tickets
										</p>
										<p className="text-sm font-medium">
											{clientData?.resolvedTicketCount}
										</p>
									</div>
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
						</div>
					</div>
					<div>
						<div className="w-full h-full">
							<ClientMeetings ticketsData={ticketsData} isLoading={isLoading} />
							<ClientProjects projectData={projectData} isLoading={isLoading} />
						</div>
					</div>
				</div>
			</section>
		</section>
	);
};

export default ClientDetails;
