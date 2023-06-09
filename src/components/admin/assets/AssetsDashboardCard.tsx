import {
	TOTAL_ASSETS,
	BLOCKED,
	ASSIGNMENT,
	PROHIBITION,
	TOTAL_BRANCH,
} from "assets/dashboard_Icons";
import Link from "next/link";

interface Props {
	data?: any;
	branch?: any;
}
const AssetsDashboardCard = ({ data, branch }: Props) => {
	const cards = [
		{
			id: 1,
			name: "Total Assets",
			count: data?.totalAsset ? data?.totalAsset : 0,
			icon: <img src={TOTAL_ASSETS.src} className="w-16" alt="" />,
			color: "bg-gradient-to-br from-blue-600 to-cyan-400",
			link: "/admin/assets/all-assets",
		},
		{
			id: 2,
			name: "Total Assigned",
			count: data?.totalAssignAsset ? data?.totalAssignAsset : 0,
			icon: <img src={ASSIGNMENT.src} className="w-16" alt="" />,
			color: "bg-gradient-to-br from-green-500 to-emerald-400",
			link: "/admin/assets/all-assets",
		},
		{
			id: 3,
			name: "Total Not Assigned",
			count: data?.totalNotAssignedAsset ? data?.totalNotAssignedAsset : 0,
			icon: <img src={PROHIBITION.src} className="w-16" alt="" />,
			color: "bg-gradient-to-br from-orange-500 to-yellow-400",
			link: "/admin/assets/all-assets",
		},
		{
			id: 4,
			name: "Total Branch",
			count: branch?.totalBranchCount,
			icon: <img src={TOTAL_BRANCH.src} className="w-16" alt="" />,
			color: "bg-gradient-to-br from-[#ff5874] to-[#ff8196]",
			link: "/admin/assets/all-assets",
		},
	];
	return (
		<>
			<div className="flex gap-2 py-4">
				<div className="w-full">
					<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
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

export default AssetsDashboardCard;
