import {
	DailyAttendance,
	GuestBarChart,
	GuestDonutChart,
} from "components/analytics";
import { NoDatas } from "components/core";
import { useAuth, useFetch } from "hooks";

const MainHrDashboardCharts = () => {
	const { user } = useAuth();
	const { data: hrDetails, isLoading: hrIsLoading } = useFetch<any>(
		`dashboards/hr-dashInfo?branchId=${user?.employeeOfBranchId}`
	);
	return (
		<div className="w-full">
			<div className="grid lg:grid-cols-2 grid-cols-1 content-between gap-6">
				<div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
					<p className="font-bold text-lg text-center">
						This Year Employee Joining Overview
					</p>
					{hrDetails?.userCountMonthWise?.length ? (
						<GuestBarChart
							labels={
								hrDetails?.userCountMonthWise?.length
									? hrDetails?.userCountMonthWise?.map(
											(item: any) => item?.month
									  )
									: []
							}
							data={
								hrDetails?.userCountMonthWise?.length
									? hrDetails?.userCountMonthWise?.map(
											(item: any) => item?.count
									  )
									: []
							}
							type="bar"
							text=""
						/>
					) : (
						<NoDatas title={"No Employees This Year"} />
					)}
				</div>
				<div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
					<p className="text-lg font-bold text-center">
						This Month Leave Details
					</p>
					{hrDetails?.leaveCounts?.length ? (
						<GuestDonutChart
							labels={
								hrDetails?.leaveCounts?.length
									? hrDetails?.leaveCounts?.map((item: any) => item?.type)
									: []
							}
							series={
								hrDetails?.leaveCounts?.length
									? hrDetails?.leaveCounts?.map(
											(item: any) => item?._count?.type
									  )
									: []
							}
							text=""
							type="pie"
							colors={[
								"#106EAD",
								"#C33C5E",
								"#25d366",
								"#BD33B5",
								"#E60023",
								"#005d32",
							]}
						/>
					) : (
						<NoDatas title={"No Leaves This Month"} />
					)}
				</div>
				<div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
					<p className="font-bold text-lg text-center">
						This Year Attendance Overview
					</p>
					{hrDetails?.currentYearAttendance?.length ? (
						<GuestBarChart
							labels={
								hrDetails?.currentYearAttendance?.length
									? hrDetails?.currentYearAttendance?.map(
											(item: any) => item?.month
									  )
									: []
							}
							data={
								hrDetails?.currentYearAttendance?.length
									? hrDetails?.currentYearAttendance?.map(
											(item: any) => item?.count
									  )
									: []
							}
							type="bar"
							text=""
						/>
					) : (
						<NoDatas title={"No Attendance This Year"} />
					)}
				</div>
				<div className=" !mb-6">
					<div className="bg-white w-full  gap-5 !border-grey-500 rounded-xl !shadow-xl">
						<div className="font-semibold flex justify-center py-4 pl-2 ">
							<p>Last Week Employee's Report </p>
						</div>
						{hrDetails?.lastWeekAttendanceArr?.length ? (
							<DailyAttendance
								type="area"
								data={hrDetails?.lastWeekAttendanceArr}
								totalUsers={hrDetails?.totalEmployees}
							/>
						) : (
							<NoDatas title={"No Attendance This Week"} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainHrDashboardCharts;
