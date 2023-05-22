import { HeadText } from "components/core";
import { Event, TaskAlt } from "@mui/icons-material";
import moment from "moment";
import { useFetch } from "hooks";
import { useRouter } from "next/router";

type Props = {
	employeeId?: any;
};

const EmployLeaves = ({ employeeId }: Props) => {
	const router = useRouter();
	const { data: leaveData, mutate } = useFetch<any>(
		`leaves/details/${router?.query?.id}`
	);

	const { data: leaveDetails, isLoading: leaveDataLoading } = useFetch<any[]>(
		`leaves?employeeID=${employeeId}`
	);

	return (
		<section className="w-full p-6 rounded-lg bg-white shadow-xl mt-4">
			<HeadText title="Employee Leaves" />
			<div className="flex flex-col gap-2 items-center">
				<div className="mt-4">
					<div className="flex gap-4 justify-center py-1">
						<div className="flex flex-col items-center">
							<p className="font-semibold text-sm mb-1">Current Month</p>
							<div className="h-20 w-20 relative text-white overflow-hidden rounded-md bg-gradient-to-r from-blue-500 to-blue-400 shadow-md flex justify-center items-center text-4xl font-bold">
								{leaveData?.monthWiseLeaves?.May}
							</div>
						</div>
						<div className="flex flex-col items-center">
							<p className="font-semibold text-sm mb-1">Current Year</p>
							<div className="h-20 w-20 relative text-white overflow-hidden rounded-md bg-gradient-to-r from-purple-500 to-purple-400 shadow-md flex justify-center items-center text-4xl font-bold">
								{leaveData?.totalLeavesCurrentYear}
							</div>
						</div>
					</div>
				</div>

				{/* <div className="h-32 w-1 bg-black rounded-sm mt-7"></div> */}

				<div className="mt-4">
					<p className="text-center font-semibold text-sm mb-1">
						Total Leaves Taken (Current Year)
					</p>
					<div className="flex gap-4 justify-center py-1">
						<div className="h-20 w-20 relative text-white overflow-hidden rounded-md bg-gradient-to-r from-blue-500 to-blue-400 shadow-md flex justify-center items-center text-4xl font-bold">
							{leaveData?.typeWiseLeaves?.Casual}
							<div className="h-8 w-8 bg-black absolute right-[-2px] top-[-2px] rounded-md text-white text-sm shadow-md flex justify-center items-center tracking-wide">
								CL
							</div>
						</div>
						<div className="h-20 w-20 relative text-white overflow-hidden rounded-md bg-gradient-to-r from-purple-500 to-purple-400 shadow-md flex justify-center items-center text-4xl font-bold">
							{leaveData?.typeWiseLeaves?.Sick}
							<div className="h-8 w-8 bg-black absolute right-[-2px] top-[-2px] rounded-md text-white text-sm shadow-md flex justify-center items-center tracking-wide">
								SL
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <p className="text-center font-semibold tracking-wide text-sm my-4">
				CREDITS LEFT
			</p> */}
			<HeadText title="Recent" />
			<div className="mt-2 flex flex-col gap-1 py-2 max-h-60 overflow-y-auto px-2">
				{leaveDetails?.map((item, i) => (
					<div
						key={i}
						className="h-20 w-full border-2 rounded-md p-2 flex gap-4"
					>
						<div className="h-14 w-14 rounded-full bg-slate-200 flex justify-center items-center shadow-md">
							<TaskAlt fontSize="large" />
						</div>
						<div className="w-3/4 flex flex-col justify-center gap-2">
							<p className="text-sm font-medium flex gap-2">
								<span>Leave on :</span>{" "}
								<span className="text-sm flex gap-2 items-center">
									<Event fontSize="small" className="!text-slate-500" />{" "}
									{moment(item?.startDate).format("ll")}
								</span>
							</p>
							<span
								className={`text-white text-xs px-4 py-1 ${
									item?.status === "Rejected"
										? "bg-red-500"
										: item?.status === "Pending"
										? "bg-yellow-500"
										: "bg-green-500"
								} font-semibold rounded-md text-center`}
							>
								{item?.status}
							</span>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default EmployLeaves;

const leaves = [1, 2, 3, 4];
