import { BorderColor, Delete } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { EditHoliday } from "components/dialogues";
import { useAuth, useChange } from "hooks";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
import { HOLIDAY } from "types";

interface Props {
	data?: HOLIDAY[];
	mutate: () => void;
}

const HolidayGrid = ({ data, mutate }: Props) => {
	const { user } = useAuth();
	const { change } = useChange();
	const [editDetails, setEditDetails] = useState<boolean>(false);
	const [holidays, setHolidays] = useState<HOLIDAY>();

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
					const res = await change(`holidays/${id}`, {
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
			<EditHoliday
				open={editDetails}
				handleClose={() => setEditDetails(false)}
				holidayData={holidays}
				mutate={mutate}
			/>
			<div className="grid py-4 gap-6 lg:grid-cols-3">
				{data?.map((item) => (
					<div
						key={item?.id}
						className="relative w-full rounded-xl flex space-y-4 flex-col gap-2 tracking-wide shadow-xl bg-gradient-to-r from-rose-100 to-teal-100"
					>
						<div className="relative">
							<div className="absolute right-0 rounded-tl-lg top-[6.2rem] z-50 bg-gradient-to-r from-rose-100 to-teal-100 p-2">
								{user?.role?.name === "CEO" ||
								user?.role?.name === "COO" ||
								user?.role?.name === "HR" ||
								user?.role?.name === "DIRECTOR" ? (
									<div className="flex">
										<Tooltip title="Edit">
											<Avatar
												variant="rounded"
												className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-blue-500 !p-0"
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
												<BorderColor
													sx={{ padding: "0px !important" }}
													fontSize="small"
													onClick={() => {
														setEditDetails((prev) => !prev), setHolidays(item);
													}}
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
								) : null}
							</div>
							<div
								className={`h-36 bg-cover flex justify-center py-3 rounded-t-lg w-full border`}
								style={{
									backgroundImage:
										item?.image === null
											? `url("/holiday.png")`
											: `url(${item?.image})`,
								}}
							/>
							<div className="p-2">
								<div className="flex justify-start">
									<div className="flex items-center gap-1">
										<div className="bg-blue-500 p-1 text-sm flex flex-col justify-center items-center rounded-md text-white">
											<p className="font-semibold">
												{moment(item?.startDate).format("ll")}
											</p>
										</div>
										{item?.endDate ? (
											<>
												<div className="text-sm">TO</div>
												<div className="bg-blue-500 p-1 text-sm flex flex-col justify-center items-center rounded-md text-white">
													<p className="font-semibold">
														{moment(item?.endDate).format("ll")}
													</p>
												</div>
											</>
										) : (
											<div className="h-10"></div>
										)}
									</div>
								</div>
								<div className="flex flex-col justify-center my-3">
									<p className="font-semibold">{item?.title}</p>
									<p className="text-sm">{item?.description}</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default HolidayGrid;
