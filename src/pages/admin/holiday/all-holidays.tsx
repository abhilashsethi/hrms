import {
	Add,
	Close,
	FilterListRounded,
	GridViewRounded,
	TableRowsRounded,
} from "@mui/icons-material";
import {
	Button,
	IconButton,
	MenuItem,
	Pagination,
	Stack,
	TextField,
	Tooltip,
} from "@mui/material";
import { HolidayColumn, HolidayGrid } from "components/admin/holiday";
import { QuotationGrid } from "components/admin/quotation";
import {
	AdminBreadcrumbs,
	Loader,
	LoaderAnime,
	SkeletonLoader,
} from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Quotation } from "types";

const AllHolidays = () => {
	const [isGrid, setIsGrid] = useState(true);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [clientName, setClientName] = useState<string | null>(null);

	const {
		data: quotationData,
		mutate,
		pagination,
		isLoading,
	} = useFetch<any>(
		`quotations?page=${pageNumber}&limit=6&orderBy=createdAt:desc${
			clientName ? `&clientName=${clientName}` : ""
		}`
	);
	return (
		<>
			<PanelLayout title="All Quotation - Admin Panel">
				<section className="md:px-8 px-2">
					<div className="md:flex justify-between items-center py-4">
						<div className="md:flex gap-4 items-center">
							<AdminBreadcrumbs links={links} />
							<div className="flex gap-1">
								<IconButton onClick={() => setIsGrid(true)} size="small">
									<div
										className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
											isGrid && `border-2 border-theme`
										}`}
									>
										<GridViewRounded className={`${isGrid && `!text-theme`}`} />
									</div>
								</IconButton>
								<IconButton onClick={() => setIsGrid(false)} size="small">
									<div
										className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
											!isGrid && `border-2 border-theme`
										}`}
									>
										<TableRowsRounded
											className={`${!isGrid && `!text-theme`}`}
										/>
									</div>
								</IconButton>
							</div>
							<Link href={"/admin/quotation/create-quotation"}>
								<Button
									variant="contained"
									className="!bg-theme"
									startIcon={<Add />}
								>
									ADD HOLIDAY
								</Button>
							</Link>
						</div>
					</div>

					<div className="md:flex grid gap-4 md:justify-between w-full py-2">
						<div
							className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
						>
							<IconButton
								onClick={() => {
									setClientName(null);
								}}
							>
								<Tooltip
									title={clientName != null ? `Remove Filters` : `Filter`}
								>
									{clientName != null ? (
										<Close className={"!text-white"} />
									) : (
										<FilterListRounded className={"!text-white"} />
									)}
								</Tooltip>
							</IconButton>
						</div>

						<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
							<TextField
								fullWidth
								size="small"
								id="clientName"
								placeholder="Client Name"
								value={clientName ? clientName : ""}
								name="clientName"
								onChange={(e) => {
									setPageNumber(1), setClientName(e.target.value);
								}}
							/>
						</div>
					</div>
					<section className="mt-4">
						{isGrid ? (
							<>
								{isLoading && <SkeletonLoader />}
								<HolidayGrid data={quotationData} mutate={mutate} />
							</>
						) : (
							<>
								{isLoading && <Loader />}
								<HolidayColumn data={quotationData} mutate={mutate} />
							</>
						)}
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
		</>
	);
};

export default AllHolidays;

const status = [
	{ id: 1, value: "Accepted" },
	{ id: 2, value: "Rejected" },
	{ id: 3, value: "Modified" },
];
const short = [
	{ id: 1, value: "quotationTitle:asc", name: "Name Ascending" },
	{ id: 2, value: "quotationTitle:desc", name: "Name Descending" },
	{ id: 3, value: "createdAt:asc", name: "CreatedAt Ascending" },
	{ id: 4, value: "createdAt:desc", name: "CreatedAt Descending" },
];
const links = [
	{ id: 1, page: "Quotation", link: "/admin/quotation" },
	{ id: 2, page: "All Quotation", link: "/admin/quotation/all-quotation" },
];
