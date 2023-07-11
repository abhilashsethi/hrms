import { Delete, Info } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { PhotoViewer } from "components/core";
import { useChange } from "hooks";
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
				<div className="relative w-full rounded-xl flex space-y-4 flex-col gap-2 tracking-wide shadow-xl">
					<div className="relative">
						<p className="absolute top-2 rounded-r-xl bg-green-500 text-white text-sm px-2 pr-3 py-1 font-semibold">
							Completed
						</p>

						<div className="absolute right-0 rounded-tl-lg top-24 bg-gradient-to-r from-rose-100 to-teal-100 p-2">
							<div className="flex">
								<Tooltip title="Details">
									<Avatar
										onClick={() => router.push(`/admin/bills/bill-details`)}
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
										<Info sx={{ padding: "0px !important" }} fontSize="small" />
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
											// onClick={() => handleDelete(item?.id)}
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
						<div className="px-4 bg-gradient-to-r from-rose-100 to-teal-100 ">
							<div className="flex flex-col  justify-star t">
								<div className="flex items-center gap-2 py-2 md:py-0">
									<p className="font-semibold text-base text-blue-600">
										Name :
									</p>
									<p className="text-sm md:text-base text-red-600 font-semibold">
										Tanmaya Mohapatra
									</p>
								</div>
								<div className="flex items-center gap-2 py-2 md:py-0">
									<p className="font-semibold text-base text-blue-600">
										Email :
									</p>

									<p className="text-sm md:text-base text-gray-700 font-semibold">
										tanmaya@gmail.com
									</p>
								</div>
								<div className="flex items-center gap-2 py-2 md:py-0">
									<p className="font-semibold text-base text-blue-600">
										Phone :
									</p>
									<p className="text-sm md:text-base text-gray-700">
										7485961452
									</p>
								</div>
								<div className="flex items-center gap-2 py-2 md:py-0">
									<p className="font-semibold text-base text-blue-600">
										Start Date :
									</p>
									<p className="text-sm md:text-base text-gray-700">
										12/07/2023 11:00 AM
									</p>
								</div>
								<div className="flex items-center gap-2 py-2 md:py-0">
									<p className="font-semibold text-base text-blue-600">
										End Date :
									</p>
									<p className="text-sm md:text-base text-gray-700">
										12/07/2023 02:00 PM
									</p>
								</div>
								<div className="flex items-center gap-2 py-2 md:py-0">
									<p className="font-semibold text-base text-blue-600">
										Whom To Visit :
									</p>
									<p className="text-sm md:text-base text-gray-700">
										Gaurav Kumar
									</p>
								</div>
							</div>
							{/* <div className="flex items-center justify-center py-4">
									<button className="border border-blue-600 hover:bg-blue-600 hover:text-white text-sm hover:font-semibold text-blue-600 px-7 py-1 rounded-md ease-in-out transition-all duration-300">
										<span>
											<Download />
										</span>
										Download Bill
									</button>
								</div> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AppointmentsGrid;
