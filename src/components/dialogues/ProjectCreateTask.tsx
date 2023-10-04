import { Check, Close } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	InputLabel,
	MenuItem,
	TextField,
	Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Projects, User } from "types";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: () => void;
	mutate: () => void;
	id: string | string[] | undefined;
	projectData: Projects;
}
const validationSchema = Yup.object().shape({
	title: Yup.string().required("Title is required!"),
	description: Yup.string().required("Required field!"),
	status: Yup.string().required("Required field!"),
	date: Yup.string().required("Required field!"),
	assignedUserIds: Yup.array().required("Required field!"),
});

const ProjectCreateTask = ({
	open,
	handleClose,
	mutate,
	id,
	projectData,
}: Props) => {
	const { data: employeesData } = useFetch<User[]>(
		`users?projectId=${projectData?.id}`
	);
	console.log(employeesData);
	const [loading, setLoading] = useState(false);
	const { change } = useChange();
	const [isMembers, setIsMembers] = useState<User[]>([]);

	const initialValues = {
		title: "",
		description: "",
		status: "",
		date: "",
		assignedUserIds: [],
	};
	const handleSubmit = async (values: any) => {
		setLoading(true);
		const reqData = {
			tasks: [
				{
					assignedUsersIds: values?.assignedUserIds,
					title: values?.title,
					description: values?.description,
					status: values?.status,
					deadLine: new Date(values?.date).toISOString(),
				},
			],
		};

		try {
			const res = await change(`projects/add-tasks/${id}`, {
				method: "PATCH",
				body: reqData,
			});
			setLoading(false);
			if (res?.status !== 200) {
				Swal.fire("Error", res?.results?.msg || "Unable to Create", "error");
				setLoading(false);
				return;
			}
			console.log({ res });

			Swal.fire(`Success`, `Created Successfully`, `success`);
			mutate();
			setLoading(false);
			handleClose();
			return;
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
			<Dialog
				onClose={handleClose}
				maxWidth="lg"
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<DialogTitle id="customized-dialog-title">
					<p className="text-center text-md font-bold text-theme te tracking-wide">
						CREATE TASK
					</p>
					<IconButton
						aria-label="close"
						onClick={handleClose}
						sx={{
							top: 10,
							right: 10,
							position: "absolute",
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<Tooltip title="Close">
							<Close />
						</Tooltip>
					</IconButton>
				</DialogTitle>
				<DialogContent className="app-scrollbar" sx={{ p: 3 }}>
					<div className="md:w-[50rem] w-[72vw] md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-4">
						<div className="items-center w-full">
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								enableReinitialize={true}
								onSubmit={handleSubmit}
							>
								{({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									setFieldValue,
								}) => (
									<Form>
										<div className="grid lg:grid-cols-2 grid-cols-1 w-full">
											<div className="px-4 py-2">
												<div className="py-2">
													<InputLabel htmlFor="name">Title</InputLabel>
												</div>
												<TextField
													fullWidth
													size="small"
													id="title"
													placeholder="Title"
													name="title"
													value={values.title}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.title && !!errors.title}
													helperText={touched.title && errors.title}
												/>
											</div>

											<div className="px-4 py-2">
												<div className="py-2">
													<InputLabel htmlFor="name">Assign Members</InputLabel>
												</div>
												<div>
													<Autocomplete
														multiple
														options={
															employeesData ? (employeesData as any) : []
														}
														size="small"
														getOptionLabel={(option: any) => option.name}
														onChange={(e, r) =>
															setFieldValue(
																"assignedUserIds",
																r.map((d) => d?.id)
															)
														}
														renderInput={(params) => (
															<TextField
																{...params}
																label="Select Members"
																placeholder="Members"
															/>
														)}
													/>
												</div>
											</div>
											<div className="px-4 py-2">
												<div className="py-2">
													<InputLabel htmlFor="name">Status</InputLabel>
												</div>
												<TextField
													fullWidth
													select
													label="Status"
													size="small"
													name="status"
													value={values.status}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.status && !!errors.status}
													helperText={touched.status && errors.status}
												>
													{statuses?.map((option: any) => (
														<MenuItem key={option.id} value={option.value}>
															{option.value}
														</MenuItem>
													))}
												</TextField>
											</div>
											<div className="px-4 py-2">
												<div className="py-2">
													<InputLabel htmlFor="name">Deadline</InputLabel>
												</div>
												<TextField
													fullWidth
													type="date"
													size="small"
													inputProps={{
														min: moment().format("YYYY-MM-DD"),
													}}
													name="date"
													value={values.date}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.date && !!errors.date}
													helperText={touched.date && errors.date}
												></TextField>
											</div>
											<div className="px-4 py-2 col-span-2">
												<div className="py-2">
													<InputLabel htmlFor="name">Description</InputLabel>
												</div>
												<TextField
													fullWidth
													size="small"
													rows={4}
													id="title"
													placeholder="Description"
													name="description"
													value={values.description}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.description && !!errors.description}
													helperText={touched.description && errors.description}
												/>
											</div>
										</div>
										<div className="flex justify-center py-4">
											<Button
												type="submit"
												variant="contained"
												className={`${loading ? "!bg-gray-300" : "bg-theme"}`}
												disabled={loading}
												startIcon={
													loading ? <CircularProgress size={20} /> : <Check />
												}
											>
												CREATE
											</Button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ProjectCreateTask;

const statuses = [
	{ id: 1, value: "Open" },
	{ id: 2, value: "Pending" },
	{ id: 3, value: "Ongoing" },
];
