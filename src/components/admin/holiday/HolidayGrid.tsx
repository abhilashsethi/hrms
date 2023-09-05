import {
	BorderColor,
	Business,
	Delete,
	Download,
	Email,
	Info,
	Person,
} from "@mui/icons-material";
import { Avatar, Button, CircularProgress, Tooltip } from "@mui/material";
import { QUOTATION } from "assets/home";
import { downloadFile, useChange, useFetch } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { HOLIDAY, Quotation } from "types";
import { useState } from "react";
import { EditHoliday } from "components/dialogues";

interface Props {
	data?: HOLIDAY[];
	mutate: () => void;
}

const HolidayGrid = ({ data, mutate }: Props) => {
	const { change } = useChange();
	const [loading, setLoading] = useState(false);
	const [isActive, setIsActive] = useState<string | undefined>("");
	const [editDetails, setEditDetails] = useState<boolean>(false);
	const [holidays, setHolidays] = useState();
	const router = useRouter();
	const { data: bankAccountsDetails, mutate: bankAccountMutate } =
		useFetch<any>(`quotations/get-all/accounts`);
	// console.log(bankAccountsDetails);

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
				{data?.map((item: any) => (
					<div
						key={item?.id}
						className="relative w-full rounded-xl flex space-y-4 flex-col gap-2 tracking-wide shadow-xl bg-gradient-to-r from-rose-100 to-teal-100"
					>
						<div className="relative">
							<div className="absolute right-0 rounded-tl-lg top-[6.2rem] z-50 bg-gradient-to-r from-rose-100 to-teal-100 p-2">
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
							</div>
							<div className="h-36 bg-contain flex justify-center bg-[url('https://img.freepik.com/premium-vector/summer-beach-background-top-view-panoramic_8087-3858.jpg?w=1380')] py-3 rounded-t-lg w-full border" />
							<div className="p-2">
								<div className="flex justify-start">
									<div className="flex flex-col items-center gap-1">
										<div className="bg-blue-500 p-1 text-sm flex flex-col justify-center items-center rounded-md text-white">
											<p className="font-semibold">
												{moment(item?.startDate).format("LL")}
											</p>
										</div>
										{item?.endDate ? (
											<>
												<div className="text-sm">TO</div>
												<div className="bg-blue-500 p-1 text-sm flex flex-col justify-center items-center rounded-md text-white">
													<p className="font-semibold">
														{moment(item?.endDate).format("LL")}
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
