import { HeadText } from "components/core";
import moment from "moment";
import { AccountTreeRounded, Handyman } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { ViewProjectsDrawerClient } from "components/drawer";
interface Props {
	projectData?: any;
	isLoading?: any;
}
const ClientProjects = ({ projectData, isLoading }: Props) => {
	const [projects, setProjects] = useState(false);
	const [viewProjects, setViewProjects] = useState<any>(null);
	// console.log(projectData);
	return (
		<section className="w-full p-6 rounded-lg bg-white shadow-xl mt-4">
			<ViewProjectsDrawerClient
				open={projects}
				onClose={() => setProjects(false)}
				setViewProject={setViewProjects}
				projectData={projectData}
				isLoading={isLoading}
			/>
			<div className="flex justify-between">
				<HeadText title={`Projects (${projectData?.length})`} />
				<Tooltip title="View All Projects">
					<div className="rounded-full group flex justify-start items-center hover:scale-105 ease-in-out transition-all duration-400 cursor-pointer !text-blue-500 flex-col gap-2 ">
						<span className="bg-[#dbe3ff] p-2 shadow-lg rounded-md transition-all ease-in-out duration-200">
							<Handyman onClick={() => setProjects(true)} />
						</span>
					</div>
				</Tooltip>
			</div>
			<div className="flex flex-col gap-1 mt-4 max-h-[15rem] overflow-y-auto">
				{projectData?.map((item: any, i: any) => (
					<div key={i} className="flex gap-1 py-3 border-b-[1px]">
						<div className="w-1/5 flex justify-center items-center">
							<div className="h-12 w-12 bg-theme-100 rounded-full flex justify-center items-center">
								<AccountTreeRounded className="!text-secondary" />
							</div>
						</div>
						<div className="w-4/5 h-12">
							<div className="flex justify-between pr-3 items-center">
								<p className="text-sm font-semibold tracking-wide">
									{item?.name}
								</p>
								<span
									className={`py-1 px-3 rounded-md ${
										item?.status === "Pending"
											? `bg-yellow-100 border-yellow-400 border-[1px] text-yellow-500 `
											: `bg-emerald-100 border-green-400 border-[1px] text-green-500 `
									} text-xs font-semibold tracking-wide`}
								>
									{item?.status}
								</span>
							</div>
							<p className="text-sm tracking-wide">
								Deadline :{" "}
								{item?.endDate ? moment(item?.endDate).format("ll") : "Not Set"}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default ClientProjects;
