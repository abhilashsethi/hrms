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
import { LeavesColumn, LeavesGrid } from "components/admin";
import {
	AdminBreadcrumbs,
	GridAndList,
	Loader,
	LoaderAnime,
} from "components/core";
import { CreateLeave } from "components/dialogues";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import { Leave } from "types";

const MyLeaves = () => {
	const { user } = useAuth();
	const [isGrid, setIsGrid] = useState(true);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [userName, setUsername] = useState<string | null>(null);
	const [empId, setEmpId] = useState<string | null>(null);
	const [leaveType, setLeaveType] = useState<string | null>(null);
	const [leaveStatus, setLeaveStatus] = useState<string | null>(null);
	const [isLeave, setIsLeave] = useState<boolean>(false);
	const {
		data: leavesData,
		mutate,
		pagination,
		isLoading,
	} = useFetch<Leave[]>(
		`leaves/all?page=${pageNumber}&limit=8${
			leaveStatus ? `&status=${leaveStatus}` : ""
		}${leaveType ? `&type=${leaveType}` : ""}${
			user?.id ? `&userId=${user?.id}` : ""
		}`
	);
	return (
		<PanelLayout title="Leave Requests - Admin Panel">
			<section className="md:px-8 px-4 py-2">
				<CreateLeave
					mutate={mutate}
					open={isLeave}
					handleClose={() => setIsLeave(false)}
				/>
				<div className="flex justify-between items-center py-4 md:flex-row flex-col">
					<AdminBreadcrumbs links={links} />
					<div className="flex gap-4 items-center">
						<Button
							onClick={() => setIsLeave((prev) => !prev)}
							startIcon={<Add />}
							variant="contained"
							className="!bg-theme"
						>
							ADD LEAVE
						</Button>
					</div>
				</div>
				<div className="md:flex gap-4 justify-between w-full py-2">
					<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						<TextField
							fullWidth
							select
							label="Leave Type"
							size="small"
							value={leaveType ? leaveType : ""}
							onChange={(e) => {
								setPageNumber(1), setLeaveType(e?.target?.value);
							}}
						>
							{types.map((option: any) => (
								<MenuItem key={option.id} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
						<TextField
							fullWidth
							select
							label="Leave Status"
							size="small"
							value={leaveStatus ? leaveStatus : ""}
							onChange={(e) => {
								setPageNumber(1), setLeaveStatus(e?.target?.value);
							}}
						>
							{statuses.map((option: any) => (
								<MenuItem key={option.id} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</div>
				</div>
				{isLoading ? (
					<div className="w-full h-[80vh]">
						<Loader />
					</div>
				) : (
					<>
						<LeavesGrid data={leavesData} mutate={mutate} />
					</>
				)}

				{leavesData?.length === 0 && <LoaderAnime />}
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

export default MyLeaves;

const links = [
	{ id: 1, page: "Leaves", link: "/admin/leaves" },
	{ id: 2, page: "My Leaves", link: "/admin/leaves/my-leaves" },
];

const statuses = [
	{
		id: 1,
		value: "Pending",
		label: "Pending",
	},
	{
		id: 2,
		value: "Approved",
		label: "Approved",
	},
	{
		id: 3,
		value: "Rejected",
		label: "Rejected",
	},
];

const types = [
	{ id: 1, value: "Casual", label: "Casual" },
	{ id: 2, value: "Sick", label: "Sick" },
];
