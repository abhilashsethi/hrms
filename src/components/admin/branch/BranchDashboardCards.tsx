import {
	BLOCKED,
	TOTAL_ASSETS,
	TOTAL_BRANCH,
	TOTAL_CLIENT,
	TOTAL_EMPLOYEE,
	UNBLOCK,
} from "assets/dashboard_Icons";
import Link from "next/link";
import { BranchDashboard } from "types";

interface Props {
	data?: BranchDashboard;
}
const BranchDashboardCards = ({ data }: Props) => {
	const cards = [
		{
			id: 1,
			name: "Total Branch",
			count: data?.totalBranchCount,
			icon: <img src={TOTAL_BRANCH.src} className="w-16" alt="" />,
			color: "bg-gradient-to-br from-blue-600 to-cyan-400",
			link: "/admin/branch/all-branch",
		},
		{
			id: 2,
			name: "Total Country",
			count: data?.countryWiseBranchCount?.length
				? data?.countryWiseBranchCount?.length
				: "0",
			icon: <img src={TOTAL_ASSETS.src} className="w-16" alt="" />,
			color: "bg-gradient-to-br from-green-500 to-emerald-400",
			link: "/admin/branch/all-branch",
		},
		{
			id: 3,
			name: "Total Active Branch",
			count: data?.totalActiveBranch,
			icon: <img src={UNBLOCK.src} className="w-16" alt="" />,
			color: "bg-gradient-to-br from-orange-500 to-yellow-400",
			link: "/admin/branch/all-branch",
		},
		{
			id: 4,
			name: "Total InActive Branch",
			count: data?.totalInActiveBranch,
			icon: <img src={BLOCKED.src} className="w-16" alt="" />,
			color: "bg-gradient-to-br from-[#ff5874] to-[#ff8196]",
			link: "/admin/branch/all-branch",
		},
	];
	return (
		<>
			<div className="flex gap-2 py-4">
				<div className="w-full">
					<div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-4">
						{cards?.map((item, i) => (
							<Link key={i} href={item?.link}>
								<div
									className={`group hover:scale-105 transition duration-500 ease-in-out ${item?.color} w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer`}
								>
									<div className="flex justify-around items-center pb-3">
										<div className="p-3 rounded-full">
											<div className="w-16">{item?.icon}</div>
										</div>
									</div>
									<span className="text-white font-semibold text-center tracking-wide text-md">
										{item?.name}
									</span>
									<span className="text-white text-xl text-center font-semibold ">
										{item?.count}
									</span>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default BranchDashboardCards;
