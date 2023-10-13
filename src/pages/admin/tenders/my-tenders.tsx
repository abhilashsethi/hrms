import { Delete, Info } from "@mui/icons-material";
import {
	IconButton,
	MenuItem,
	Pagination,
	Stack,
	TextField,
	Tooltip,
} from "@mui/material";
import { TENDERCARD } from "assets/home";
import { AdminBreadcrumbs, LoaderAnime, SkeletonLoader } from "components/core";
import { useAuth, useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { Tender } from "types";
import { deleteFile } from "utils";

const MyTenders = () => {
	const { user } = useAuth();

	const [pageNumber, setPageNumber] = useState<number>(1);
	const [isOrderBy, setIsOrderBy] = useState<string>("createdAt:desc");
	const {
		data: tenderData,
		mutate,
		isLoading,
		pagination,
	} = useFetch<Tender[]>(
		`tenders/all-tender/by-memberId?userId=${user?.id}&page=${pageNumber}&limit=8&orderBy=createdAt:desc`
	);
	console.log(pagination);
	return (
		<PanelLayout title="My Tenders ">
			<section className="md:px-8 px-4 py-4">
				<AdminBreadcrumbs links={links} />

				<section className="mt-4">
					{isLoading && <SkeletonLoader />}
					<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
						{tenderData?.map((item, i) => (
							<div key={i}>
								<CardContent
									item={item?.tenders}
									tenderId={item?.tenders?._id?.$oid}
									mutate={mutate}
								/>
							</div>
						))}
					</div>
					{tenderData?.length === 0 ? <LoaderAnime /> : null}
					<section className="mb-6">
						{Math.ceil(
							Number(pagination?.total || 1) / Number(pagination?.limit || 1)
						) > 1 ? (
							<div className="flex justify-center md:py-8 py-4">
								<Stack spacing={2}>
									<Pagination
										count={Math.ceil(
											Number(pagination?.total || 1) /
												Number(pagination?.limit || 1)
										)}
										onChange={(e, v: number) => {
											setPageNumber(v);
										}}
										page={pageNumber}
										variant="outlined"
									/>
								</Stack>
							</div>
						) : null}
					</section>
				</section>
			</section>
		</PanelLayout>
	);
};

export default MyTenders;
interface Props {
	item?: Tender;
	mutate: () => void;
	tenderId?: string;
}

const CardContent = ({ item, mutate, tenderId }: Props) => {
	const { user } = useAuth();
	const { change } = useChange();
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
					const res = await change(`tenders/${id}`, {
						method: "DELETE",
					});
					const docPaths = item?.documents;
					if (docPaths && docPaths.length > 0) {
						docPaths.forEach(async (path) => {
							await deleteFile(String(path));
						});
					}
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
			if (error instanceof Error) {
				Swal.fire(`Error`, error?.message, `error`);
			} else {
				Swal.fire(`Error`, "Something Went Wrong", `error`);
			}
		}
	};
	return (
		<>
			<div className="w-full h-full rounded-lg overflow-hidden shadow-sleek">
				<div
					className={`h-28 w-full flex justify-center items-center relative bg-[#76DCC7]`}
				>
					<div
						className={`px-4 py-0.5 rounded-r-full absolute top-[10px] left-0 ${
							item?.status === "Open"
								? `bg-yellow-400`
								: item?.status === "Disqualified"
								? `bg-red-500`
								: item?.status === "L1"
								? `bg-blue-500`
								: item?.status === "Cancelled"
								? `bg-[#f97316]`
								: item?.status === "FinancialEvaluation"
								? `bg-[#8b5cf6]`
								: item?.status === "TechnicalEvaluation"
								? `bg-[#e879f9]`
								: item?.status === "BidAwarded"
								? `bg-[#9333ea]`
								: `bg-green-500`
						}`}
					>
						<span className="text-xs font-semibold text-white tracking-wide">
							{item?.status}
						</span>
					</div>
					<div className=" px-4 py-1 bg-white absolute right-0 bottom-[-15px] rounded-l-md flex gap-2 items-center">
						<Link href={`/admin/tenders/tender-details?id=${item?._id?.$oid}`}>
							<Tooltip title="Details">
								<IconButton size="small">
									<Info />
								</IconButton>
							</Tooltip>
						</Link>
						{user?.role?.name === "CEO" ||
						user?.role?.name === "BID MANAGER" ? (
							<Tooltip title="Delete">
								<IconButton
									size="small"
									onClick={() => handleDelete(item?._id?.$oid)}
								>
									<Delete className="!text-youtube" />
								</IconButton>
							</Tooltip>
						) : null}
					</div>
					<img
						className="h-12 object-contain "
						src={TENDERCARD.src}
						alt="icon"
					/>
				</div>
				<div className="bg-white p-4">
					<h1 className="font-semibold text-sm">{item?.title}</h1>
					<h1 className="mt-2 text-sm font-semibold">Tender No :</h1>
					<span className="text-sm text-gray-600">{item?.tenderNo}</span>
					<h1 className="mt-2 text-sm font-semibold">Category :</h1>
					<span className="text-sm text-gray-600">{item?.category}</span>
					<h1 className="mt-2 text-sm font-semibold">Submission Date :</h1>
					<span className="text-sm text-gray-600">
						{item?.submissionDate ? (
							moment(item?.submissionDate).format("ll")
						) : (
							<p className="text-gray-500 font-medium">Not Specified</p>
						)}
					</span>
				</div>
			</div>
		</>
	);
};

const links = [
	{
		id: 2,
		page: "My Tenders",
		link: "/admin/tenders/my-tenders",
	},
];

const short = [
	{ id: 1, value: "title:asc", name: "Name Ascending" },
	{ id: 2, value: "title:desc", name: "Name Descending" },
	{ id: 3, value: "createdAt:asc", name: "CreatedAt Ascending" },
	{ id: 4, value: "createdAt:desc", name: "CreatedAt Descending" },
];
