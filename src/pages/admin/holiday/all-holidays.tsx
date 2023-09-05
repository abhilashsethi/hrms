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
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { HOLIDAY, Quotation } from "types";

const AllHolidays = () => {
	const [isGrid, setIsGrid] = useState(true);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [holidayName, setHolidayName] = useState<string | null>(null);
	const [selectStartDate, setSelectStartDate] = useState<string | null>("");
	const {
		data: holidayData,
		mutate,
		pagination,
		isLoading,
	} = useFetch<HOLIDAY[]>(
		`holidays?page=${pageNumber}&limit=6&orderBy=createdAt:desc${
			holidayName ? `&title=${holidayName}` : ""
		}${selectStartDate ? `&startDate=${selectStartDate}` : ""}`
	);
	console.log(holidayData);
	return (
		<>
			<PanelLayout title="All Quotation - Admin Panel">
				<section className="md:px-8 px-2">
					<div className="md:flex justify-between items-center py-4">
						<div className="md:flex gap-4 items-center">
							<AdminBreadcrumbs links={links} />
						</div>
						<div className="flex gap-1  items-center justify-end">
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
									<TableRowsRounded className={`${!isGrid && `!text-theme`}`} />
								</div>
							</IconButton>
							<Link href={"/admin/holiday/create-holiday"}>
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
									setHolidayName(null);
									setSelectStartDate("");
								}}
							>
								<Tooltip
									title={
										selectStartDate != "" || holidayName != null
											? `Remove Filters`
											: `Filter`
									}
								>
									{selectStartDate != "" || holidayName != null ? (
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
								id="holidayName"
								placeholder="Holiday Name"
								value={holidayName ? holidayName : ""}
								name="holidayName"
								onChange={(e) => {
									setPageNumber(1), setHolidayName(e.target.value);
								}}
							/>
							<TextField
								fullWidth
								size="small"
								id="date"
								placeholder="Select Start Date"
								name="date"
								type="date"
								value={
									selectStartDate
										? moment(selectStartDate).format("YYYY-MM-DD")
										: ""
								}
								onChange={(e) => {
									setSelectStartDate(new Date(e.target.value).toISOString());
								}}
							/>
						</div>
					</div>
					{holidayData?.length ? (
						<section className="mt-4">
							{isGrid ? (
								<>
									{isLoading && <SkeletonLoader />}
									<HolidayGrid data={holidayData} mutate={mutate} />
								</>
							) : (
								<>
									{isLoading && <Loader />}
									<HolidayColumn data={holidayData} mutate={mutate} />
								</>
							)}
							<section className="mb-6">
								{Math.ceil(
									Number(pagination?.total || 1) /
										Number(pagination?.limit || 1)
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
					) : (
						<LoaderAnime text="No Holidays Available" />
					)}
				</section>
			</PanelLayout>
		</>
	);
};

export default AllHolidays;

const links = [
	{ id: 2, page: "All Holidays", link: "/admin/holiday/all-holidays" },
];
