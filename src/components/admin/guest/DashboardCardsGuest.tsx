import {
	AssignmentTurnedIn,
	ContentPasteGo,
	Man,
	Woman,
} from "@mui/icons-material";
import Link from "next/link";
interface Props {
	data?: any;
}
const DashboardCardsGuest = ({ data }: Props) => {
	const cards = [
		{
			id: 1,
			color: "from-green-600 to-green-400",
			icon: <ContentPasteGo fontSize="large" className="text-white group-hover:text-white" />,
			name: "Total Guest",
			count: data?.GuestInfo?.totalGuest,
			link: "/admin/guests/all-guests",
		},
		{
			id: 2,
			color: "from-red-600 to-red-400",
			icon: <AssignmentTurnedIn fontSize="large" className="text-white group-hover:text-white" />,
			name: "Total Blocked Guest",
			count: data?.GuestInfo?.blockedGuestCount,
			link: "/admin/guests/all-guests",
		},
		{
			id: 3,
			color: "from-blue-600 to-blue-400",
			icon: <Man fontSize="large" className="text-white group-hover:text-white" />,
			name: "Total Male Guest",
			count: data?.GuestInfo?.guestCountByGender[1]?._count,
			link: "/admin/guests/all-guests",
		},
		{
			id: 4,
			color: "from-[#ff5874] to-[#ff8196]",
			icon: <Woman fontSize="large" className="text-white group-hover:text-white" />,
			name: "Total Female Guest",
			count: data?.GuestInfo?.guestCountByGender[0]?._count,
			link: "/admin/guests/all-guests",
		},
	]
	return (
		<div className="flex gap-2 py-4">
			<div className="w-full ">
				<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
					{cards?.map((item) => (
						<Link href={item?.link} key={item?.id}>
							<div className={`h-32 bg-gradient-to-br ${item?.color} w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer hover:scale-105 transition duration-300 ease-in-out`}>
								<div className="flex justify-around items-center">
									<div>
										{item?.icon}
									</div>
								</div>
								<span className=" text-white font-semibold text-center tracking-wide text-lg">
									{item?.name}
								</span>
								<span className="text-xl text-white text-center font-semibold">
									{item?.count}
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default DashboardCardsGuest;
