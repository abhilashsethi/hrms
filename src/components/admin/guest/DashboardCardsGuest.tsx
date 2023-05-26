import {
	AssignmentTurnedIn,
	ContentPasteGo,
	Man,
	Woman,
} from "@mui/icons-material";
interface Props {
	data?: any;
}
const DashboardCardsGuest = ({ data }: Props) => {
	return (
		<div className="flex gap-2 py-4">
			<div className="w-full ">
				<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
					<div>
						<div className=" h-32 bg-gradient-to-br from-green-600 to-green-400 w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
							<div className="flex justify-around items-center">
								<div>
									<ContentPasteGo
										fontSize="large"
										className="text-white group-hover:text-white"
									/>
								</div>
							</div>
							<span className=" text-white font-semibold text-center tracking-wide text-lg">
								Total Guest
							</span>
							<span className="text-xl text-white text-center font-semibold">
								{data?.GuestInfo?.totalGuest}
							</span>
						</div>
					</div>
					<div>
						<div className=" h-32 bg-gradient-to-br from-red-600 to-red-400 w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
							<div className="flex justify-around items-center">
								<div>
									<AssignmentTurnedIn
										fontSize="large"
										className="text-white group-hover:text-white"
									/>
								</div>
							</div>
							<span className=" text-white font-semibold text-center tracking-wide text-lg">
								Total Blocked Guest
							</span>
							<span className="text-xl text-white text-center font-semibold">
								{data?.GuestInfo?.blockedGuestCount}
							</span>
						</div>
					</div>
					<div>
						<div className=" h-32 bg-gradient-to-br from-blue-600 to-blue-400 w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
							<div className="flex justify-around items-center">
								<div>
									<Man
										fontSize="large"
										className="text-white group-hover:text-white"
									/>
								</div>
							</div>
							<span className=" text-white font-semibold text-center tracking-wide text-lg">
								Total Male Guest
							</span>
							<span className="text-xl text-white text-center font-semibold">
								{data?.GuestInfo?.guestCountByGender[1]?._count}
							</span>
						</div>
					</div>
					<div>
						<div className=" h-32 bg-gradient-to-br from-[#ff5874] to-[#ff8196] w-full py-4 px-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
							<div className="flex justify-around items-center">
								<div>
									<Woman
										fontSize="large"
										className="text-white group-hover:text-white"
									/>
								</div>
							</div>
							<span className=" text-white font-semibold text-center tracking-wide text-lg">
								Total Female Guest
							</span>
							<span className="text-xl text-white text-center font-semibold">
								{data?.GuestInfo?.guestCountByGender[0]?._count}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardCardsGuest;
