import { HeadText } from "components/core";
import CircularProgress, {
	CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { DEFAULTPROFILE } from "assets/home";
import { useState } from "react";
import { useFetch } from "hooks";

const UpcomingLeaves = ({ data, employeeDetails }: any) => {
	const { data: leaveDetails } = useFetch<any>(`leaves/dashboard/details`);
	console.log(employeeDetails?.allAbsentUsers);
	const [progress, setProgress] = useState(80);

	return (
		<section className="w-full p-6 rounded-lg bg-white shadow-xl mt-4">
			<HeadText title="Employee Status" />
			<div className="md:flex justify-between items-center py-4 pt-4 px-4 ">
				{/* <CircularProgressWithLabel value={progress} /> */}
				<div className="flex gap-9 items-center">
					<div>
						<p className="font-semibold">
							{data?.filter((item: any) => item?.isBlocked)?.length || 0}
						</p>
						<div className="flex gap-2 items-center">
							<div className="h-3 w-3 bg-emerald-500 rounded-sm"></div>
							<p>Blocked</p>
						</div>
					</div>
					<div>
						<p className="font-semibold">
							{data?.filter((item: any) => item?.isBlocked === false)?.length ||
								0}
						</p>
						<div className="flex gap-2 items-center">
							<div className="h-3 w-3 bg-yellow-500 rounded-sm "></div>
							<p>Un-Blocked</p>
						</div>
					</div>
				</div>
			</div>
			<HeadText title="Employee Leaves" />
			<div className="md:flex justify-center items-center grid gap-2 mt-2">
				{leaveDetails?.leaves?.leaveTypesList?.map((item: any, i: any) => {
					return (
						<div
							key={i}
							className={`md:w-1/3 h-28 flex justify-center shadow-md items-center flex-col gap-3 rounded-lg ${item?.type === "Casual"
									? "bg-gradient-to-br from-emerald-400 to-emerald-200"
									: "bg-gradient-to-br from-red-400 to-red-200"
								}`}
						>
							<p className="text-lg font-semibold tracking-wide">
								{item?._count ? item?._count : 0}
							</p>
							<p
								className={`text-sm font-semibold tracking-wide ${item?.type === "Casual" ? "text-green-700" : "text-red-700"
									}`}
							>
								{item?.type && `${(item?.type).toUpperCase()} LEAVE`}
							</p>
						</div>
					);
				})}
			</div>
			<div className="mt-6 flex gap-4 items-center">
				<HeadText title="Today Absent" />
				<div className="h-8 w-8 bg-red-200 rounded-md flex justify-center items-center text-red-600 font-semibold">
					{employeeDetails?.allAbsentUsers
						? employeeDetails?.allAbsentUsers?.length
						: 0}
				</div>
			</div>
			<div className="h-[17rem] overflow-y-auto pr-2">
				<div className="w-full mt-4 md:flex flex-col gap-2">
					{employeeDetails?.allAbsentUsers?.length &&
						employeeDetails?.allAbsentUsers?.map((item: any) => (
							<div className="w-full border-2 tracking-wide p-4 rounded-lg">
								<div className="flex gap-4 items-center">
									<div className="h-12 w-12 bg-slate-300 rounded-full overflow-hidden shadow-lg">
										<img
											className="h-full w-full object-cover"
											src={item?.photo}
											alt=""
										/>
									</div>
									<div>
										<p className="text-sm font-semibold">{item?.name}</p>
										<p className="text-sm">{item?.role?.name}</p>
									</div>
								</div>
								{/* <div className="flex justify-between items-center mt-2">
									<div className="text-sm">
									<p className="text-gray-400">4 Sep 2019</p>
									<p className="font-semibold">Leave Date</p>
								</div>
									<span className="bg-green-200 text-green-600 border-[1px] border-green-400 px-3 py-1 rounded-md font-medium">
										Approved
									</span>
								</div> */}
							</div>
						))}
				</div>
			</div>
		</section>
	);
};

export default UpcomingLeaves;

const cards = [1, 2, 3, 4];
