import { Tooltip } from "@mui/material";
import { GuestBarChart, GuestDonutChart } from "components/analytics";
import { PhotoViewer } from "components/core";
import Link from "next/link";
interface Props {
	data?: any;
}
const ProjectManagerDashboardCharts = ({ data }: Props) => {
	const getMonthName = (monthNumber: any) => {
		const date = new Date();
		date.setMonth(monthNumber - 1);
		return date.toLocaleString("default", { month: "long" });
	};
	const cards = [
		{
			id: 1,
			color: "bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600",

			name: "Yard Erp",
			count: data?.GuestInfo?.totalGuest || 0,
			link: `/admin/projects/project-details?id=${data?.projectId}`,
		},
		{
			id: 2,
			color: "bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600",

			name: "HRMS Yard Iot",
			count: data?.GuestInfo?.blockedGuestCount || 0,
			link: `/admin/projects/project-details?id=${data?.projectId}`,
		},
		{
			id: 3,
			color: "bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600",

			name: "Study In Russia",
			count: data?.GuestInfo?.guestCountByGender[0]?._count || 0,
			link: `/admin/projects/project-details?id=${data?.projectId}`,
		},
		{
			id: 4,
			color: "bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600",

			name: "Political Party Web",
			count: data?.GuestInfo?.guestCountByGender[1]?._count || 0,
			link: `/admin/projects/project-details?id=${data?.projectId}`,
		},
	];
	return (
		<div className="w-full">
			<div className="grid lg:grid-cols-2 content-between gap-6">
				<div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
					<p className="font-bold text-lg text-center">
						Current Year Leave Overview
					</p>
					<GuestBarChart
						labels={[
							"Jan",
							"Feb",
							"Mar",
							"Apr",
							"May",
							"Jun",
							"Jul",
							"Aug",
							"Sept",
							"Oct",
							"Nov",
						]}
						data={[5, 5, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
						type="bar"
						text=""
					/>
				</div>

				<div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
					<p className="text-lg font-bold text-center">
						Current Month Projects Overview
					</p>
					<GuestDonutChart
						labels={["On Going Projects", "Finished Projects", "Total Bugs"]}
						series={[45, 25, 30]}
						text=""
						type="donut"
						colors={["#25d366", "#E60023", "#BD33B5"]}
					/>
				</div>
				<div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
					<p className="font-bold text-lg text-center">Ticket Issue Details</p>
					<GuestBarChart
						labels={[
							"Yard Erp",
							"HRMS Yard Iot",
							"Study In Russia",
							"Political Party Web",
						]}
						data={[5, 5, 10, 12]}
						type="bar"
						text=""
					/>
				</div>
				<div className="w-full px-2 py-4 bg-white !border-gray-500 rounded-xl !shadow-xl">
					<p className="text-lg font-bold text-center">Recent Projects</p>
					<div className="grid lg:grid-cols-2 grid-cols-1 lg:px-8 px-2 py-4 gap-4">
						{cards?.map((item) => (
							<Link href={item?.link} key={item?.id}>
								<div
									className={`h-full w-full bg-slate-200 py-4 lg:px-5 px-2 flex flex-col gap-2 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition duration-300 ease-in-out`}
								>
									<Tooltip title="Project Manager">
										<span className="flex w-full justify-center justify-items-center">
											<PhotoViewer />
										</span>
									</Tooltip>
									<span className="font-semibold text-center tracking-wide text-lg">
										{item?.name}
									</span>
									<div className="grid lg:grid-cols-2 gap-4 text-sm text-center font-semibold">
										<div className="flex flex-col gap-1 rounded-lg px-3 py-2 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 text-white justify-center w-full">
											<span>Start Date</span>
											<span>15-02-2023</span>
										</div>
										<div className="flex flex-col gap-1 rounded-lg px-3 py-2 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 text-white justify-center w-full">
											<span>End Date</span>
											<span>18-03-2023</span>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectManagerDashboardCharts;