import { HeadText, PhotoViewer } from "components/core";
import moment from "moment";
import { AccountTreeRounded } from "@mui/icons-material";

const ClientChats = () => {
	return (
		<section className="w-full p-6 rounded-lg bg-white shadow-xl mt-4">
			<HeadText title="Chats" />
			<div className="flex flex-col gap-1 mt-4 max-h-[20rem] overflow-y-auto">
				{chats?.map((item, i) => (
					<div key={i} className="flex gap-1 py-3 border-b-[1px]">
						<div className="w-1/5 flex justify-center items-center">
							<div className=" bg-theme-100 rounded-full flex justify-center items-center">
								{item?.icon}
							</div>
						</div>
						<div className="w-4/5">
							<div className="flex justify-between pr-3 items-center">
								<p className="text-sm font-semibold tracking-wide">
									{item?.name}
								</p>
								{/* <span className="py-1 px-3 rounded-md bg-emerald-100 tracking-wide border-green-400 border-[1px] text-green-500 text-xs font-semibold">
									{item?.status}
								</span> */}
							</div>
							<p className="text-sm tracking-wide">
								{/* Deadline : {moment(new Date()).format("ll")} */}
								{item?.details}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default ClientChats;

const chats = [
	{
		id: 1,
		icon: (
			<PhotoViewer
				photo={
					"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
				}
				size="3rem"
			/>
		),
		name: "John Smith",
		details:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas nobis id tempora impedit facere cupiditate rem officiis repellendus quasi delectus!",
		status: "COMPLETED",
	},
	{
		id: 2,
		icon: (
			<PhotoViewer
				photo={
					"https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg"
				}
				size="3rem"
			/>
		),
		name: "Shrinu Readdy",
		details:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas ",
		status: "COMPLETED",
	},
	{
		id: 3,
		icon: (
			<PhotoViewer
				photo={
					"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
				}
				size="3rem"
			/>
		),
		name: "John Smith",
		details:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas nobis id tempora impedit facere cupiditate rem officiis repellendus quasi delectus!",
		status: "COMPLETED",
	},
	{
		id: 4,
		icon: (
			<PhotoViewer
				photo={
					"https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg"
				}
				size="3rem"
			/>
		),
		name: "Shrinu Readdy",
		details:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas ",
		status: "COMPLETED",
	},
];
