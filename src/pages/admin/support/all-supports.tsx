import { Pagination, Stack } from "@mui/material";
import { SupportColumn } from "components/admin/support";
import { AdminBreadcrumbs, LoaderAnime, SkeletonLoader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Bills } from "types";

const AllSupports = () => {
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [selectDate, setSelectDate] = useState<string | null>(null);
	const {
		data: supportsData,
		mutate,
		isLoading,
		pagination,
	} = useFetch<any>(`supports?orderBy=createdAt:desc`);
	// console.log(supportsData);
	return (
		<>
			<PanelLayout title="All Supports - Admin Panel">
				<section className="px-8">
					<div className="flex justify-between items-center py-4">
						<AdminBreadcrumbs links={links} />
					</div>
					{/* <div className="md:flex gap-4 justify-between w-full py-2">
						<div
							className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
						>
							<IconButton
								onClick={() => {
									setIsOrderBy(null);
									setSelectDate(null);
									setBillStatus(null);
									setBillNumber(null);
									setClientName(null);
								}}
							>
								<Tooltip
									title={
										selectDate != null ||
										isOrderBy != null ||
										BillStatus != null ||
										clientName != null ||
										billNumber != null
											? `Remove Filters`
											: `Filter`
									}
								>
									{selectDate != null ||
									isOrderBy != null ||
									clientName != null ||
									BillStatus != null ||
									billNumber != null ? (
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
								id="invoiceNumber"
								placeholder="Invoice Number"
								value={billNumber ? billNumber : null}
								name="invoiceNumber"
								onChange={(e) => {
									setPageNumber(1), setBillNumber(e.target.value);
								}}
							/>

							<TextField
								fullWidth
								size="small"
								id="clientName"
								placeholder="Client Name"
								value={clientName ? clientName : null}
								name="clientName"
								onChange={(e) => {
									setPageNumber(1), setClientName(e.target.value);
								}}
							/>

							<TextField
								fullWidth
								select
								label="Bill Type"
								size="small"
								value={BillStatus ? BillStatus : null}
								onChange={(e) => {
									setPageNumber(1), setBillStatus(e?.target?.value);
								}}
							>
								{status.map((option) => (
									<MenuItem key={option.id} value={option.value}>
										{option.value}
									</MenuItem>
								))}
							</TextField>
							<TextField
								fullWidth
								size="small"
								id="date"
								label="Due Date"
								InputLabelProps={{
									shrink: true,
								}}
								placeholder="Select Date"
								name="date"
								type="date"
								value={
									selectDate ? moment(selectDate).format("YYYY-MM-DD") : null
								}
								onChange={(e) => {
									{
										setPageNumber(1),
											setSelectDate(new Date(e.target.value).toISOString());
									}
								}}
							/>
							<TextField
								fullWidth
								select
								label="Ascending/Descending"
								size="small"
								value={isOrderBy ? isOrderBy : ""}
								onChange={(e) => {
									setPageNumber(1), setIsOrderBy(e?.target?.value);
								}}
							>
								{short.map((option) => (
									<MenuItem key={option.id} value={option.value}>
										{option.name}
									</MenuItem>
								))}
							</TextField>
						</div>
					</div> */}

					<>
						{supportsData?.length ? (
							<SupportColumn data={supportsData} mutate={mutate} />
						) : (
							<LoaderAnime text="No data" />
						)}
					</>
				</section>
			</PanelLayout>
		</>
	);
};

export default AllSupports;

const links = [
	{ id: 2, page: "All Support", link: "/admin/support/all-supports" },
];
