import { Add, GridViewRounded, TableRowsRounded } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { MyMeetingColumn, MyMeetingGrid } from "components/admin/meetings";
import {
	AdminBreadcrumbs,
	Loader,
	LoaderAnime,
	SkeletonLoader,
} from "components/core";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { MEETING_DATA } from "types";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	// height: 600,
	bgcolor: "background.paper",
	// border: "2px solid #000",
	borderRadius: "10px",
	boxShadow: 24,
	p: 4,
};

const MyMeetings = () => {
	const { user } = useAuth();
	const [pageNumber, setPageNumber] = useState<number | null>(1);
	const [open, setOpen] = useState(true);
	const toggle = () => setOpen(!open);
	const [isGrid, setIsGrid] = useState(true);
	const {
		data: meetingData,
		mutate,
		isLoading,
	} = useFetch<MEETING_DATA[]>(
		`meetings?userId=${user?.id}&page=${pageNumber}&limit=8`
	);
	console.log(meetingData);
	// console.log(currentRange);
	return (
		<>
			<PanelLayout title="Meetings - Admin Panel">
				<section className="px-8">
					<div className="flex justify-between items-center py-4">
						<AdminBreadcrumbs links={links} />

						<div className="flex gap-4 items-center">
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
							<Link href={"/admin/meetings/create-meeting"}>
								<Button
									variant="contained"
									className="!bg-theme"
									startIcon={<Add />}
								>
									CREATE MEETINGS
								</Button>
							</Link>
						</div>
					</div>

					{isGrid ? (
						<>
							{isLoading && <SkeletonLoader />}
							<MyMeetingGrid data={meetingData} mutate={mutate} />
						</>
					) : (
						<>
							{isLoading && <Loader />}
							<MyMeetingColumn data={meetingData} mutate={mutate} />
						</>
					)}
					{meetingData?.length === 0 ? (
						<LoaderAnime text="No Meetings Available" />
					) : null}
				</section>
			</PanelLayout>
		</>
	);
};

export default MyMeetings;

const links = [
	{ id: 2, page: "My Meetings", link: "/admin/meetings/my-meetings" },
];
