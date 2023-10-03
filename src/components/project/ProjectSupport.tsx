"use client";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { LoaderAnime } from "components/core";
import { ProjectCreateTicket } from "components/dialogues";
import { useAuth, useFetch } from "hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Tickets } from "types";
import { clock } from "utils";

const ProjectSupport = () => {
	const [isCreate, setIsCreate] = useState(false);
	const { user } = useAuth();
	const router = useRouter();
	const {
		data: ticketsData,
		mutate,
		isLoading,
	} = useFetch<Tickets[]>(
		`projects/all-tickets/of-projects?projectId=${router?.query?.id}&orderBy=createdAt:desc`
	);
	return (
		<section className="">
			<ProjectCreateTicket
				open={isCreate}
				mutate={mutate}
				handleClose={() => setIsCreate(false)}
			/>
			{isLoading && <p className="text-center">Please wait...</p>}
			<div className="flex justify-end mb-4">
				{user?.isClient ? (
					<Button
						className="!bg-theme"
						size="small"
						onClick={() => setIsCreate(true)}
						variant="contained"
						startIcon={<Add />}
					>
						Create ticket
					</Button>
				) : null}
			</div>
			<div className="grid max-h-[30rem] overflow-scroll gap-3">
				{ticketsData?.map((data) => (
					<div
						key={data?.id}
						className="w-full rounded-md p-6 shadow-jubilation"
					>
						<div className="md:flex hidden justify-between">
							<div className="">
								<h1 className="text-sm font-semibold text-theme mt-2">
									Ticket Issue is Resolved :
								</h1>
								<span
									className={`${
										data?.isResolved ? `bg-green-500` : `bg-red-500`
									}  font-semibold text-white lg:text-md text-sm px-4 rounded-md`}
								>
									{data?.isResolved ? "Yes" : "No"}
								</span>
							</div>
							<span className="text-xs mb-1">
								{clock(data?.createdAt).fromNow()}
							</span>
						</div>
						<div className="md:hidden block justify-between">
							<span className="text-xs mb-1">
								{clock(data?.createdAt).fromNow()}
							</span>
							<div className="grid justify-between">
								<h1 className="text-sm font-semibold text-theme mt-2">
									Ticket Issue isResolved :
								</h1>
								<span
									className={`${
										data?.isResolved ? `bg-green-500` : `bg-red-500`
									}  font-semibold text-white lg:text-md text-sm px-4 rounded-md`}
								>
									{data?.isResolved ? "Yes" : "No"}
								</span>
							</div>
						</div>
						<h1 className="text-sm font-semibold text-theme mt-2">
							Ticket Title :
						</h1>
						<h1 className="font-semibold text-slate-700 text-sm">
							{data?.title}
						</h1>
						<div className="md:flex justify-between items-center">
							<h1 className="text-sm font-semibold text-theme">User Info :</h1>
							<Link href={`/admin/clients/view-ticket-details?id=${data?.id}`}>
								<button className="bg-theme-400 hover:bg-theme-500 lg:px-3 lg:py-1 px-1 py-1 rounded-lg shadow-md text-white font-semibold hover:translate-x-1 delay-75 transition-all lg:text-md text-xs">
									View details
								</button>
							</Link>
						</div>
						<p className="md:text-lg text-xs pt-2">{data?.description}</p>
					</div>
				))}
				{ticketsData?.length === 0 ? (
					<LoaderAnime text="No support Found" />
				) : null}
			</div>
		</section>
	);
};

export default ProjectSupport;
