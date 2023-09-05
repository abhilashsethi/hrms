import {
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
import { Quotation } from "types";
import { useState } from "react";

interface Props {
	data: Quotation[];
	mutate: () => void;
}

const HolidayGrid = ({ data, mutate }: Props) => {
	const { change } = useChange();
	const [loading, setLoading] = useState(false);
	const [isActive, setIsActive] = useState<string | undefined>("");
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
					const res = await change(`quotations/${id}`, {
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

	const handleSubmit = async (item?: Quotation) => {
		setLoading(true);
		setIsActive(item?.id);
		// console.log(item);
		try {
			const res = await downloadFile({
				url: `/quotations/generate/pdf`,
				method: "POST",
				body: {
					quotationNumber: item?.quotationNumber,
					cinNumber: "U72501OR2018PTC029550",
					date: moment(new Date()).format("DD/MM/YYYY"),
					clientName: item?.clientName,
					clientEmail: item?.clientEmail,
					clientAddress: item?.clientAddress,
					quotationTitle: item?.quotationTitle,
					works: item?.works,
					termsAndConditions: item?.termsAndConditions,
					status: item?.status,
					igstPercent: item?.igstPercent,
					cgstPercent: item?.cgstPercent,
					sgstPercent: item?.sgstPercent,
					igstVal: item?.igstVal,
					cgstVal: item?.cgstVal,
					sgstVal: item?.sgstVal,
					isIgst: item?.isIgst,
					isCgst: item?.isCgst,
					isSgst: item?.isSgst,
					reason: item?.reason,
					total: item?.total,
					grandTotal: item?.grandTotal,
					bankAccount1: bankAccountsDetails[0],
					bankAccount2: bankAccountsDetails[1],
				},
			});

			setLoading(false);

			Swal.fire(`Success`, `You have successfully Downloaded!`, `success`);
			return;
		} catch (error) {
			console.log(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="grid py-4 gap-6 lg:grid-cols-3">
				{data?.map((item: any) => (
					<div
						key={item?.id}
						className="relative w-full rounded-xl flex space-y-4 flex-col gap-2 tracking-wide shadow-xl bg-gradient-to-r from-rose-100 to-teal-100"
					>
						<div className="relative">
							<p
								className={`absolute top-2 z-50 rounded-r-xl 
              ${
								item?.status === "Rejected"
									? "bg-red-500"
									: item?.status === "Accepted"
									? "bg-green-500"
									: "bg-yellow-500"
							} text-white text-sm px-2 pr-3 py-1 font-semibold`}
							>
								{item?.status}
							</p>
							<div className="absolute right-0 rounded-tl-lg top-24 z-50 bg-gradient-to-r from-rose-100 to-teal-100 p-2">
								<div className="flex">
									<Tooltip title="Details">
										<Avatar
											onClick={() =>
												router.push(
													`/admin/quotation/quotation-details?id=${item?.id}`
												)
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
							<div className="flex justify-center bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 py-3 rounded-t-lg w-full border">
								<img src={QUOTATION.src} alt="" className="w-24" />
							</div>
							<div className="px-4">
								<div className="flex gap-2 py-2 md:py-0 justify-start">
									<p className="text-sm md:text-sm text-gray-700">
										<span>
											<Person className="text-gray-500 mr-1" />
										</span>
										{item?.clientName}
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
								<div className="mt-3 flex flex-col justify-start">
									<div className="flex items-center gap-2 py-2 md:py-0">
										<p className="font-semibold text-base text-blue-600">
											Quotation Title :
										</p>
										<p className="text-sm md:text-base text-gray-700">
											{item?.quotationTitle}
										</p>
									</div>
									<div className="flex items-center gap-2 py-2 md:py-0">
										<p className="font-semibold text-base text-blue-600">
											Date :
										</p>
										<p className="text-sm md:text-base text-gray-700">
											{item?.createdAt
												? moment(item?.createdAt).format("lll")
												: "Not Specified"}
										</p>
									</div>
									<div className="flex items-center gap-2 py-2 md:py-0">
										<p className="font-semibold text-base text-blue-600">
											Quotation Number :
										</p>
										<p className="text-sm md:text-base text-gray-700">
											{item?.quotationNumber}
										</p>
									</div>

									<div className="flex items-center justify-start gap-2 py-2 md:py-0">
										<p className="font-semibold text-base text-blue-600">
											Cost (IN INR){" "}
										</p>
										<p className="text-sm text-gray-700">
											{item?.grandTotal ? item?.grandTotal : "0"}/-
										</p>
									</div>
								</div>
								<div className="flex items-center justify-center py-4">
									<Button
										type="submit"
										variant="contained"
										className="!bg-theme hover:!scale-95 ease-in-out transition-all duration-300"
										disabled={loading && isActive === item?.id}
										startIcon={
											loading && isActive === item?.id ? (
												<CircularProgress color="warning" size={20} />
											) : (
												<Download />
											)
										}
										onClick={() => handleSubmit(item)}
									>
										Download Quotation
									</Button>
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
