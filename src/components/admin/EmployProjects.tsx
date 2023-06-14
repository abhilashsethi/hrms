import { HeadText, NoDatas } from "components/core";
import moment from "moment";
import { AccountTreeRounded } from "@mui/icons-material";
import { status } from "nprogress";
import { useFetch } from "hooks";
import { useState } from "react";

type Props = {
	projectDetails?: any;
	userName?: string;
};

const EmployProjects = ({ projectDetails, userName }: Props) => {
	const { data: projectData } = useFetch<any>(
		`projects?memberName=${userName}`
	);
	console.log(projectData);
	return (
		<section className="w-full p-6 rounded-lg bg-white shadow-xl mt-4">
			<HeadText title="Latest Projects" />
			{projectDetails?.length === 0 && (
				<NoDatas title="Not involved in any projects yet!" />
			)}
			<div className="flex flex-col gap-1 mt-4 max-h-[15rem] overflow-y-auto">
				{projectData?.map((item: any, i: any) => (
					<div key={i} className="flex gap-1 py-3 border-b-[1px]">
						<div className="w-1/5 flex justify-center items-center">
							<div className="h-12 w-12 bg-theme-100 rounded-full flex justify-center items-center">
								<AccountTreeRounded className="!text-secondary" />
							</div>
						</div>
						<div className="w-4/5">
							<div className="flex justify-between pr-3 items-center">
								<p className="text-sm font-semibold tracking-wide">
									{item?.name?.length >= 20
										? item?.name?.substring(0, 20) + "..."
										: item?.name}
								</p>
								<span
									className={`py-1 px-3 rounded-md  ${
										item?.status === "Rejected"
											? "bg-red-500"
											: item?.status === "Pending"
											? "bg-yellow-500"
											: "bg-green-500"
									} tracking-wide text-white text-xs font-semibold`}
								>
									{item?.status}
								</span>
							</div>
							<p className="text-sm tracking-wide">
								Starts On :{" "}
								{item?.startDate
									? moment(item?.startDate).format("ll")
									: "Date Not Specified"}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default EmployProjects;

const cards = [
	{
		id: 1,
		title: "HRMS for SY",
		deadline: "May 10, 2023",
		status: "COMPLETED",
	},
	{
		id: 2,
		title: "Yard ERP",
		deadline: "May 10, 2023",
		status: "COMPLETED",
	},
	{
		id: 3,
		title: "Yard CRM",
		deadline: "May 10, 2023",
		status: "COMPLETED",
	},
];
