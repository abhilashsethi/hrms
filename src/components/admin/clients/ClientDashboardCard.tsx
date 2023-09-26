import { BLOCK, CUSTOMER, HANDSHAKE, INACTIVE } from "assets/dashboard_Icons";
import Link from "next/link";
interface Props {
	cards?: any;
}
const ClientDashboardCard = ({ cards }: Props) => {
	const cardsData = [
		{
			id: 1,
			icon: <img src={HANDSHAKE.src} className="w-16" alt="" />,
			count: cards?.clients?.totalClient,
			title: "Total Clients",
			color: "bg-gradient-to-br from-blue-600 to-cyan-400",
			link: "/admin/clients/all-clients",
		},
		{
			id: 2,
			icon: <img src={BLOCK.src} className="w-16" alt="" />,
			count: cards?.clients?.blockedClients,
			title: "Total Blocked Client",
			color: "bg-gradient-to-br from-green-500 to-emerald-400",
			link: "/admin/clients/all-clients",
		},
		{
			id: 3,

			icon: <img src={INACTIVE.src} className="w-12" alt="" />,
			count: cards?.clients?.totalMaleClients || "0",
			title: "Male",
			color: "bg-gradient-to-br from-orange-500 to-yellow-400",
			link: "/admin/clients/all-clients",
		},
		{
			id: 4,
			icon: <img src={CUSTOMER.src} className="w-12" alt="" />,
			count: cards?.clients?.totalFemaleClients || "0",
			title: "Female",
			color: "bg-gradient-to-br from-[#ff5874] to-[#ff8196]",
			link: "/admin/clients/all-clients",
		},
	];
	return (
		<>
			<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
				{cardsData?.map((data: any, id: any) => (
					<Link href={data?.link}>
						<div
							key={id}
							className={`hover:scale-105 grid justify-center justify-items-center cursor-pointer transition duration-500 ease-in-out w-full tracking-wide ${data?.color} shadow-lg rounded-xl p-4 h-36 `}
						>
							<div className="">{data?.icon}</div>
							<p className="text-lg font-medium text-white">{data?.count}</p>
							<p className="text-lg font-semibold text-white">{data?.title}</p>
						</div>
					</Link>
				))}
			</div>
		</>
	);
};

export default ClientDashboardCard;
