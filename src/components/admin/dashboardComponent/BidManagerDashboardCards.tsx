import {
	AccountTree,
	BugReport,
	Chat,
	Construction,
	Email,
	EventAvailable,
	PendingActions,
	PersonPin,
	RecentActors,
	SupportAgent,
} from "@mui/icons-material";
import { Grid, Tooltip } from "@mui/material";
import { CardAsset } from "assets/home";
import { NoDatas, PhotoViewer } from "components/core";
import { useAuth, useFetch } from "hooks";
import Link from "next/link";
import { Leave } from "types";
interface Props {
	data?: any;
}
const BidManagerDashboardCards = ({ data }: Props) => {
	const { user } = useAuth();
	const { data: leaveData } = useFetch<Leave[]>(
		`leaves?${user?.id ? `userId=${user?.id}` : ""}`
	);
	const cards = [
		{
			id: 1,
			color: "bg-[#bbcbff]",
			icon: <AccountTree fontSize="medium" className="text-theme" />,
			name: "Total Leaves This Year",
			count: data?.totalInvolvedProjects || 0,
			link: "/admin/leaves/my-leaves",
		},
		{
			id: 2,
			color: "bg-[#b9e9fd]",
			icon: <PendingActions fontSize="medium" className="text-theme" />,
			name: "Total Assets",
			count: data?.lastMonthAttendanceCount || 0,
			link: "/admin/assets/my-assets",
		},
		{
			id: 3,
			color: "bg-[#f6c8ff]",
			icon: <BugReport fontSize="medium" className="text-theme" />,
			name: "Total Tenders",
			count: data?.totalAssignAssetCount || 0,
			link: "/admin/tenders/all-tenders",
		},
		{
			id: 4,
			color: "bg-[#feb76f]",
			icon: <Construction fontSize="medium" className="text-theme" />,
			name: "Total Attendance This Month",
			count: data?.totalChatCount || 0,
			link: "/admin/attendances/my-attendance",
		},
	];
	const Quick_Access = [
		{
			id: 1,
			icon: <PersonPin fontSize="medium" className="text-white" />,
			title: "My Profile",
			color: "bg-[#673ab7]",
			link: "/admin/employees/my-profile",
		},
		{
			id: 2,
			icon: <RecentActors fontSize="medium" className="text-white" />,
			title: "My Cards",
			color: "bg-[#e91e63]",
			link: "/admin/cards/my-card",
		},
		{
			id: 3,
			icon: <EventAvailable fontSize="medium" className="text-white" />,
			title: "My Attendance",
			color: "bg-[#ff9800]",
			link: "/admin/attendances/my-attendance",
		},
		{
			id: 4,
			icon: <AccountTree fontSize="medium" className="text-white" />,
			title: "All Tenders",
			color: "bg-[#00bcd4]",
			link: "/admin/tenders/all-tenders",
		},
		{
			id: 5,
			icon: <Email fontSize="medium" className="text-white" />,
			title: "Email",
			color: "bg-[#607d8b]",
			link: "/admin/email",
		},
		{
			id: 6,
			icon: <Chat fontSize="medium" className="text-white" />,
			title: "Chats",
			color: "bg-[#3f51b5]",
			link: "/admin/chat",
		},
		{
			id: 7,
			icon: <SupportAgent fontSize="medium" className="text-white" />,
			title: "Support",
			color: "bg-[#4caf50]",
			link: "/admin/support",
		},
	];

	return (
		<div className="flex gap-2 py-4">
			<div className="w-3/4 ">
				<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
					{cards?.map((item, index) => (
						<Grid key={item?.id} item lg={3} md={6} sm={12} xs={12}>
							<Link href={item?.link}>
								<div
									className={`h-40 ${item?.color} w-full p-4 flex flex-col rounded-xl shadow-xl cursor-pointer hover:scale-105 transition duration-500 ease-in-out relative overflow-hidden`}
								>
									<img
										className="absolute right-[-20px] top-[-5px] h-24 object-contain"
										src={CardAsset.src}
										alt=""
									/>
									<div className="bg-white h-10 w-10 rounded-lg flex items-center justify-center">
										{item?.icon}
									</div>
									<span className="text-xl mt-6">{item?.count}</span>
									<span className="font-semibold tracking-wide text-sm ">
										{item?.name}
									</span>
								</div>
							</Link>
						</Grid>
					))}
				</div>
				<div className="w-full mt-5">
					<p className="font-semibold text-lg pb-5 ml-5">Quick Access</p>{" "}
					<div className="flex justify-between px-8 flex-wrap">
						{Quick_Access?.map((item, index) => {
							return (
								<Tooltip title={item?.title}>
									<Link
										href={item?.link}
										// onClick={item?.onClick}
										className="w-24 h-24 rounded-full group flex justify-start items-center hover:scale-105 ease-in-out transition-all duration-400 cursor-pointer !text-blue-600 flex-col gap-2"
									>
										<div
											className={`p-2 w-12 h-12 flex justify-center items-center ${item?.color} shadow-lg rounded-md transition-all ease-in-out duration-200`}
										>
											<span>{item?.icon}</span>
										</div>
										<p className="text-xs text-center font-semibold">
											{item?.title}
										</p>
									</Link>
								</Tooltip>
							);
						})}
					</div>
				</div>
			</div>
			<div className="w-1/4">
				<div className="px-2 col-span-12 bg-white w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-6 !border-gray-500 rounded-xl !shadow-xl">
					<div className="font-semibold pl-2 py-3 space-y-2">
						<p>Recent Leaves </p>
					</div>
					<div className="h-[20rem] overflow-scroll">
						{leaveData?.length ? (
							<>
								{leaveData
									?.slice(0, 4)
									?.sort(
										(a: any, b: any) =>
											(new Date(b?.createdAt) as any) -
											(new Date(a?.createdAt) as any)
									)
									?.map?.((item, i) => {
										return (
											<div key={i}>
												<div className="border border-1 shadow-lg rounded-lg p-5 mb-2">
													<div className="flex items-center gap-3">
														<PhotoViewer
															name={item?.user?.name}
															photo={item?.user?.photo}
															size="3.3rem"
														/>
														<div className="flex flex-col">
															<p className="font-medium text-sm">
																Name:{" "}
																<span className="font-semibold text-sm">
																	{item?.user?.name}
																</span>
															</p>
															<p className="font-medium text-sm">
																Id:{" "}
																<span className="font-semibold text-sm">
																	{item?.user?.employeeID}
																</span>
															</p>
														</div>
													</div>
													<div className="flex justify-between items-center mt-3">
														<div className="text-sm font-semibold ">
															<p>Leave Type</p>
															<p>{item?.type}</p>
														</div>
														<button
															className={`hover:scale-105 transition duration-500 ease-in-out text-xs font-medium ${
																item?.status === "Pending"
																	? `text-red-700 bg-red-300`
																	: `text-green-700 bg-green-300`
															} p-1 h-7 rounded-lg text-center`}
														>
															{item?.status}
														</button>
													</div>
												</div>
											</div>
										);
									})}
							</>
						) : (
							<NoDatas title={"No Leave Taken"} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BidManagerDashboardCards;
