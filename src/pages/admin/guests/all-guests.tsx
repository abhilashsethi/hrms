import { Add, Close, FilterListRounded } from "@mui/icons-material";
import {
	Button,
	IconButton,
	MenuItem,
	Pagination,
	Stack,
	TextField,
	Tooltip,
} from "@mui/material";
import { GuestColumn, GuestsGrid } from "components/admin/guest";
import {
	AdminBreadcrumbs,
	GridAndList,
	Loader,
	LoaderAnime,
	SkeletonLoader,
} from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";

const AllGuests = () => {
	const [isGrid, setIsGrid] = useState(true);
	const [userName, setUsername] = useState<string | null>(null);
	const [isOrderBy, setIsOrderBy] = useState<string | null>(null);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const {
		data: guestData,
		mutate,
		isLoading,
		pagination,
	} = useFetch<any[]>(
		`guests?page=${pageNumber}&limit=8${userName ? `&name=${userName}` : ""}${
			isOrderBy ? `&orderBy=${isOrderBy}` : ""
		}`
	);
	return (
		<PanelLayout title="All Guests - Admin Panel">
			<section className="lg:px-8 px-4 py-4">
				<div className="md:flex justify-between">
					<AdminBreadcrumbs links={links} />
					<div className="md:flex gap-4 items-center">
						<GridAndList isGrid={isGrid} setIsGrid={setIsGrid} />
						<Link href="/admin/guests/create-guest">
							<Button
								className="!bg-theme"
								variant="contained"
								startIcon={<Add />}
							>
								ADD GUEST
							</Button>
						</Link>
					</div>
				</div>
				<div>
					<div className="md:flex gap-4 justify-between w-full py-2">
						<div
							className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
						>
							<IconButton
								onClick={() => {
									setIsOrderBy(null);
									setUsername(null);
								}}
							>
								<Tooltip
									title={
										isOrderBy != null || userName != null
											? `Remove Filters`
											: `Filter`
									}
								>
									{isOrderBy != null || userName != null ? (
										<Close className={"!text-white"} />
									) : (
										<FilterListRounded className={"!text-white"} />
									)}
								</Tooltip>
							</IconButton>
						</div>
						<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<TextField
								fullWidth
								size="small"
								id="name"
								value={userName ? userName : ""}
								onChange={(e) => {
									setPageNumber(1), setUsername(e.target.value);
								}}
								placeholder="Guest Name"
								name="name"
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
					</div>
				</div>
				{isGrid ? (
					<>
						{isLoading && <SkeletonLoader />}
						<GuestsGrid data={guestData} mutate={mutate} />
					</>
				) : (
					<>
						{isLoading && <Loader />}
						<GuestColumn data={guestData} mutate={mutate} />
					</>
				)}
				{guestData?.length === 0 ? <LoaderAnime /> : null}
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
		</PanelLayout>
	);
};

export default AllGuests;

const links = [
	{ id: 1, page: "Guests", link: "/admin/guests" },
	{ id: 2, page: "All Guests", link: "/admin/guests/all-guests" },
];
const short = [
	{ id: 1, value: "name:asc", name: "Name Ascending" },
	{ id: 2, value: "name:desc", name: "Name Descending" },
	{ id: 3, value: "createdAt:desc", name: "CreatedAt Ascending" },
	{ id: 4, value: "createdAt:asc", name: "CreatedAt Descending" },
];
