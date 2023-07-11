import {
	Business,
	Delete,
	Download,
	Email,
	Info,
	Person,
} from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { BAG, INVOICE } from "assets/home";
import { PhotoViewer } from "components/core";
import { useChange } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { Bills } from "types";
interface Props {
	data: Bills[];
	mutate?: any;
}

const AppointmentsGrid = ({ data, mutate }: Props) => {
	const { change } = useChange();
	const router = useRouter();
	const handleDelete = (id?: string) => {
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You want to delete!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			}).then(async (result) => {
				if (result.isConfirmed) {
					Swal.fire(`Info`, "It will take some time", "info");
					const res = await change(`bills/${id}`, {
						method: "DELETE",
					});

					if (res?.status !== 200) {
						Swal.fire(
							"Error",
							res?.results?.msg || "Something went wrong!",
							"error"
						);
						return;
					}
					Swal.fire(`Success`, "Deleted Successfully!", "success");
					mutate();
					return;
				}
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div className="grid py-4 gap-6 lg:grid-cols-3">
				{data?.map((item) => (
					<div className="relative w-full rounded-xl flex space-y-4 flex-col gap-2 tracking-wide shadow-xl">
						<div className="relative">
							<p className="absolute top-2 z-50 rounded-r-xl bg-green-500 text-white text-sm px-2 pr-3 py-1 font-semibold">
								Completed
							</p>

							<div className="absolute right-0 rounded-tl-lg top-24 z-50 bg-gradient-to-r from-rose-100 to-teal-100 p-2">
								<div className="flex">
									<Tooltip title="Details">
										<Avatar
											onClick={() =>
												router.push(`/admin/bills/bill-details?id=${item?.id}`)
											}
											variant="rounded"
											className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-yellow-500 !p-0"
											sx={{
												mr: ".1vw",
												padding: "0px !important",
												backgroundColor: "Highlight",
												cursor: "pointer",
												color: "",
												width: 30,
												height: 30,
											}}
										>
											<Info
												sx={{ padding: "0px !important" }}
												fontSize="small"
											/>
										</Avatar>
									</Tooltip>
									<Tooltip title="Delete">
										<Avatar
											variant="rounded"
											className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-500 !p-0"
											sx={{
												mr: "0.1vw",
												padding: "0px !important",
												backgroundColor: "Highlight",
												cursor: "pointer",
												color: "",
												width: 30,
												height: 30,
											}}
										>
											<Delete
												sx={{ padding: "0px !important" }}
												fontSize="small"
												onClick={() => handleDelete(item?.id)}
											/>
										</Avatar>
									</Tooltip>
								</div>
							</div>
							<div className="flex justify-center bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 py-3 rounded-t-lg w-full border">
								<PhotoViewer
									size={"6rem"}
									photo={
										"https://i.pinimg.com/736x/2a/95/fb/2a95fb49da8dcd58db8db7d3accc29aa.jpg"
									}
								/>
							</div>
							<div className="px-4 bg-gradient-to-r from-rose-100 to-teal-100">
								<div className="flex gap-2 py-2 md:py-0 justify-start">
									<p className="text-sm md:text-sm text-gray-700">
										<span>
											<Person className=" text-gray-500 mr-1" />
										</span>
										{item?.clientName || "---"}
									</p>
								</div>
								<div className="flex gap-2 py-2 md:py-0 justify-start">
									<p className="text-sm md:text-sm text-gray-700">
										<span>
											<Email className=" text-gray-500 mr-1" fontSize="small" />
										</span>
										{item?.clientEmail}
									</p>
								</div>
								<div className="flex gap-2 py-2 md:py-0 justify-start">
									<p className="text-sm md:text-sm text-gray-700">
										<span>
											<Business className="text-gray-500 mr-1" />
										</span>
										{item?.clientAddress}
									</p>
								</div>
								<div className="flex gap-2 py-2 md:py-0 -ml-1 justify-start items-center">
									<img className="w-7" src={BAG.src} alt="" />
									<p className="text-sm md:text-sm text-gray-700">
										{item?.clientGstNumber || "---"}
									</p>
								</div>
								<div className="mt-3 flex flex-col  justify-start">
									<div className="flex items-center gap-2 py-2 md:py-0">
										<p className="font-semibold text-base text-blue-600">
											Bill Type :
										</p>
										<p className="text-sm md:text-base text-red-600 font-semibold">
											{item?.billType}
										</p>
									</div>
									<div className="flex items-center gap-2 py-2 md:py-0">
										<p className="font-semibold text-base text-blue-600">
											Bill Amount :
										</p>

										<p className="text-sm md:text-base text-gray-700 font-semibold">
											{item?.grandTotal ? item?.grandTotal.toFixed(2) : "---"}
										</p>
									</div>
									<div className="flex items-center gap-2 py-2 md:py-0">
										<p className="font-semibold text-base text-blue-600">
											Invoice Number :
										</p>
										<p className="text-sm md:text-base text-gray-700">
											{item?.billNumber || "---"}
										</p>
									</div>
									<div className="flex items-center gap-2 py-2 md:py-0">
										<p className="font-semibold text-base text-blue-600">
											Invoice Date :
										</p>
										<p className="text-sm md:text-base text-gray-700">
											{item?.invoiceDate
												? moment(item?.invoiceDate).format("lll")
												: "Not Specified"}
										</p>
									</div>
									<div className="flex items-center gap-2 py-2 md:py-0">
										<p className="font-semibold text-base text-blue-600">
											Invoice Due Date :
										</p>
										<p className="text-sm md:text-base text-gray-700">
											{item?.dueDate
												? moment(item?.dueDate).format("lll")
												: "Not Specified"}
										</p>
									</div>
								</div>
								<div className="flex items-center justify-center py-4">
									<button className="border border-blue-600 hover:bg-blue-600 hover:text-white text-sm hover:font-semibold text-blue-600 px-7 py-1 rounded-md ease-in-out transition-all duration-300">
										<span>
											<Download />
										</span>
										Download Bill
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default AppointmentsGrid;
