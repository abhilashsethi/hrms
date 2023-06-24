import { Add, CheckBox, Delete, Edit } from "@mui/icons-material";
import {
	Avatar,
	AvatarGroup,
	Button,
	Checkbox,
	IconButton,
	Tooltip,
} from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import { PhotoViewer } from "components/core";
import { ProjectCreateTask, UpdateTaskStatus } from "components/dialogues";
import { useAuth, useChange, useFetch } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";

const ProjectTasks = () => {
	const { user } = useAuth();
	const { change } = useChange();
	const [isCreate, setIsCreate] = useState(false);
	const [isItemId, setItemId] = useState("");
	const [isUpdate, setIsUpdate] = useState(false);
	const router = useRouter();
	const {
		data: projectData,
		mutate,
		isLoading,
	} = useFetch<any>(`projects/${router?.query?.id}`);

	const handleDelete = (id: any) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You want to delete!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			try {
				if (result.isConfirmed) {
					Swal.fire(`Info`, "It will take some time", "info");
					const response = await change(
						`projects/remove-tasks/${projectData?.id}`,
						{
							method: "DELETE",
							body: {
								tasks: [`${id}`],
							},
						}
					);
					if (response?.status !== 200) {
						Swal.fire("Error", "Something went wrong!", "error");
					}
					mutate();
					Swal.fire("Success", "Deleted successfully!", "success");
				}
			} catch (error) {
				console.log(error);
			}
		});
	};
	return (
		<>
			<ProjectCreateTask
				id={router?.query?.id}
				open={isCreate}
				mutate={mutate}
				handleClose={() => setIsCreate(false)}
			/>

			{user?.role?.name == "CEO" ||
				user?.role?.name == "HR" ||
				user?.role?.name == "PROJECT MANAGER" ? (
				<div className="flex border-b-2 pb-2 justify-end">
					<Button
						onClick={() => setIsCreate(true)}
						size="small"
						className="!bg-cyan-500"
						variant="contained"
						startIcon={<Add />}
					>
						ADD NEW
					</Button>
				</div>
			) : null}
			{isLoading && <p className="text-center">Please wait...</p>}
			<section className="flex flex-col gap-3 max-h-[30rem] overflow-y-auto pr-2 pt-2">
				{projectData?.tasks?.map((item: any) => (
					<div
						key={item?.id}
						className={`w-full rounded-md shadow-md p-4 shadow-sleek ${item?.status === "COMPLETED"
							? "bg-green-100"
							: item?.status === "ONGOING"
								? "bg-blue-100"
								: "bg-cyan-50"
							}`}
					>
						<UpdateTaskStatus
							handleClose={() => setIsUpdate(false)}
							id={isItemId}
							mutate={mutate}
							open={isUpdate}
						/>
						<div className="flex justify-end text-xs">
							<p>{moment(item?.createdAt).format("ll")}</p>
						</div>
						<div className="flex justify-between">
							<h1 className="font-semibold text-slate-700">{item?.title}</h1>
							<span
								className={`text-xs font-semibold px-4 py-1 h-6 rounded-full text-white ${item?.status === "Open"
									? "bg-purple-400"
									: item?.status === "Pending"
										? "bg-yellow-500"
										: item?.status === "Ongoing"
											? "bg-blue-500"
											: item?.status === "Fixed"
												? "bg-green-500"
												: item?.status === "Reviewed"
													? "bg-red-500"
													: "bg-red-400"
									}`}
							>
								{item?.status}
							</span>
						</div>
						<p className="mt-1 text-sm tracking-wide">{item?.description}</p>
						<h2 className="mt-2 text-sm font-semibold text-slate-700">
							Assigned To :
						</h2>
						<div className="flex justify-between mt-4">
							<PhotoViewer name={item?.assignedUsers?.name} photo={item?.assignedUsers?.photo} size="20" />
							{user?.role?.name === "CEO" || user?.role?.name === "HR" ? (
								<div className="flex gap-2 items-center">
									<Tooltip title="Edit">
										<IconButton onClick={() => { setItemId(item?.id), setIsUpdate(true) }}>
											<Edit />
										</IconButton>
									</Tooltip>
									<Tooltip title="Delete">
										<IconButton onClick={() => handleDelete(item?.id)}>
											<Delete />
										</IconButton>
									</Tooltip>
								</div>
							) : null}
						</div>
					</div>
				))}
			</section>
			{projectData?.tasks?.length === 0 ? <p>No Tasks found...</p> : null}
		</>
	);
};

export default ProjectTasks;

const cards = [
	{ id: 1, title: "Scanned Cards UI for guests section", status: "ONGOING" },
	{ id: 2, title: "Scanned Cards UI for guests section", status: "COMPLETED" },
	{ id: 3, title: "Scanned Cards UI for guests section", status: "COMPLETED" },
];
