import { HeadText } from "components/core";
import moment from "moment";
import { AccountTreeRounded, Receipt } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { ViewTicketsDrawer } from "components/drawer";
import React, { useState } from "react";

const ClientMeetings = () => {
	const [tickets, setTickets] = useState(false);
	const [viewTickets, setViewTickets] = useState<any>(null);

	return (
		<section className="w-full p-6 rounded-lg bg-white shadow-xl mt-4">
			<ViewTicketsDrawer
				open={tickets}
				onClose={() => setTickets(false)}
				setViewTickets={setViewTickets}
			/>
			<div className="flex justify-between">
				<HeadText title="Tickets (20)" />
				<Tooltip title="View All Tickets">
					<div
						onClick={() => setTickets(true)}
						className="w-32 rounded-full group flex justify-start items-center hover:scale-105 ease-in-out transition-all duration-400 cursor-pointer !text-blue-500 flex-col gap-2 "
					>
						<span className="bg-[#dbe3ff] p-2 shadow-lg rounded-md transition-all ease-in-out duration-200">
							<Receipt />
						</span>
					</div>
				</Tooltip>
			</div>
			<div className="flex flex-col gap-1 mt-4 max-h-[15rem] overflow-y-auto">
				{cards?.map((item, i) => (
					<div key={i} className="flex gap-1 py-3 border-b-[1px]">
						<div className="w-1/5 flex justify-center items-center">
							<div className="h-12 w-12 bg-theme-100 rounded-full flex justify-center items-center">
								<AccountTreeRounded className="!text-secondary" />
							</div>
						</div>
						<div className="w-4/5 h-20">
							<div className="flex justify-between pr-3 items-center">
								<p className="text-sm font-semibold tracking-wide">
									{item?.title}
								</p>
							</div>
							<p className="text-sm tracking-wide my-2">
								issueDate : {moment(new Date()).format("ll")}
							</p>
							<p className="text-sm tracking-wide my-2">
								Status :{" "}
								<span className="py-1 px-3 rounded-md bg-emerald-100 tracking-wide border-green-400 border-[1px] text-green-500 text-xs font-semibold">
									{item?.status}
								</span>
							</p>
							{"  "}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default ClientMeetings;

const cards = [
	{
		id: 1,
		title: "Arrange Meeting",
		issueDate: "May 10, 2023",
		status: "Yes",
	},
	{
		id: 2,
		title: "Server Issue",
		issueDate: "May 10, 2023",
		status: "Yes",
	},
	{
		id: 3,
		title: "Arrange Meeting",
		issueDate: "May 10, 2023",
		status: "Yes",
	},
];
