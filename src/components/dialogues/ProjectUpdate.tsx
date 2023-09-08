import {
	Autocomplete,
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	InputLabel,
	TextField,
	Tooltip,
} from "@mui/material";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Check, Close } from "@mui/icons-material";
import Swal from "sweetalert2";
import moment from "moment";
import { useState } from "react";

interface Props {
	open?: any;
	handleClose: any;
	mutate?: any;
	id?: any;
}
const validationSchema = Yup.object().shape({
	devURL: Yup.string().url("Invalid Url"),
	userIDs: Yup.array().required("Please assign users!").nullable(),
	startDate: Yup.string().required("Start Date is required!"),
	prodURL: Yup.string().url("Invalid Url"),
	name: Yup.string()
		.matches(/^[A-Za-z ]+$/, "Name must only contain alphabetic characters")
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be less than 50 characters")
		.required("Name is required!"),
	description: Yup.string()
		.min(5, "Description must be at least 2 characters")
		.max(500, "Description must be less than 500 characters"),
	github: Yup.string().matches(
		/^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+\/?$/,
		"Invalid GitHub repository link"
	),
	gmail: Yup.string().email("Invalid gmail address"),
});

const ProjectUpdate = ({ open, handleClose, mutate, id }: Props) => {
	const { data, isLoading } = useFetch<any>(`users`);
	const [loading, setLoading] = useState(false);
	const { change } = useChange();
	const router = useRouter();
	const { data: employData } = useFetch<any>(`projects/${id}`);
	const initialValues = {
		name: `${employData?.name ? employData?.name : ""}`,
		github: `${employData?.github ? employData?.github : ""}`,
		description: `${employData?.description ? employData?.description : ""}`,
		gmail: `${employData?.gmail ? employData?.gmail : ""}`,
		prodURL: `${employData?.prodURL ? employData?.prodURL : ""}`,
		startDate: `${employData?.startDate ? employData?.startDate : ""}`,
		userIDs: `${employData?.userIDs ? employData?.userIDs : []}`,
		devURL: `${employData?.devURL ? employData?.devURL : ""}`,
		endDate: `${employData?.endDate ? employData?.endDate : ""}`,
	};
	const handleSubmit = async (values: any) => {
		// console.log("=============", values);
		// return;
		setLoading(true);
		try {
			const form = new FormData();
			form.append("name", values?.name);
			form.append("github", values?.github);
			form.append("description", values?.description);
			form.append("gmail", values?.gmail);
			form.append("prodURL", values?.prodURL);
			form.append("startDate", values?.startDate);
			form.append("devURL", values?.devURL);
			form.append("endDate", values?.endDate);

			values?.userIDs?.forEach((item: string) => {
				return form.append("userIDs", item);
			});
			const res = await change(`projects/${id}`, {
				method: "PATCH",
				// isFormData: true,
				body: values,
			});
			setLoading(false);
			if (res?.status !== 200) {
				Swal.fire("Error", res?.results?.msg || "Unable to Update", "error");
				setLoading(false);
				return;
			}
			mutate();
			Swal.fire(`Success`, `Updated Successfully`, `success`);
			handleClose();
			return;
		} catch (error) {}
	};
	return (
		<>
			<Dialog
				onClose={handleClose}
				maxWidth="lg"
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<DialogTitle
					id="customized-dialog-title"
					sx={{ p: 2, minWidth: "40rem !important" }}
				>
					<p className="text-center text-md font-bold text-theme te tracking-wide">
						UPDATE PROJECT
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
										<div className="grid grid-cols-2 w-full">
											<div className="px-4 py-2">
												<div className="py-2">
													<InputLabel htmlFor="name">Project Name</InputLabel>
												</div>
												<TextField
													fullWidth
													size="small"
													id="name"
													placeholder="Project Name"
													name="name"
													value={values.name}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.name && !!errors.name}
													helperText={touched.name && errors.name}
												/>
											</div>
											<div className="px-4 py-2">
												<div className="py-2">
													<InputLabel htmlFor="gmail">Gmail</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													placeholder="Gmail"
													id="gmail"
													name="gmail"
													value={values.gmail}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.gmail && !!errors.gmail}
													helperText={touched.gmail && errors.gmail}
												/>
											</div>

											<div className="px-4 py-2">
												<div className="py-2">
													<InputLabel htmlFor="devURL">Dev URL</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													placeholder="Dev URL"
													id="devURL"
													name="devURL"
													value={values.devURL}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.devURL && !!errors.devURL}
													helperText={touched.devURL && errors.devURL}
												/>
											</div>
											<div className="px-4 py-2">
												<div className="py-2">
													<InputLabel htmlFor="prodURL">Prod URL</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													placeholder="Prod URL"
													id="prodURL"
													name="prodURL"
													value={values.prodURL}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.prodURL && !!errors.prodURL}
													helperText={touched.prodURL && errors.prodURL}
												/>
											</div>
											<div className="px-4 py-2">
												<div className="py-2">
													<InputLabel htmlFor="github">Github Link</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													placeholder="Github Link"
													id="github"
													name="github"
													value={values.github}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.github && !!errors.github}
													helperText={touched.github && errors.github}
												/>
											</div>
											<div className="px-4 py-2">
												<div className="py-2">
													<InputLabel htmlFor="startDate">
														Start Date
													</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													type="date"
													placeholder="Start Date"
													id="startDate"
													name="startDate"
													value={moment(values?.startDate).format("YYYY-MM-DD")}
													onChange={(e) => {
														setFieldValue(
															"startDate",
															new Date(e?.target.value)
														);
													}}
													onBlur={handleBlur}
													error={touched.startDate && !!errors.startDate}
													helperText={touched.startDate && errors.startDate}
												/>
											</div>
											<div className="px-4 py-2">
												<div className="py-2">
													<InputLabel htmlFor="employee">
														Employee Name
													</InputLabel>
												</div>
												<Autocomplete
													multiple
													fullWidth
													limitTags={2}
													size="small"
													id="userIDs"
													value={data?.filter((item: any) => {
														return values?.userIDs?.includes(item.id);
													})}
													options={data || []}
													onChange={(e: any, r: any) => {
														setFieldValue(
															"userIDs",
															r?.map((data: { id: string }) => data?.id)
														);
													}}
													getOptionLabel={(option: any) => option.name}
													renderInput={(params) => (
														<TextField
															{...params}
															// value={values.userIDs}
															label="Employee Name"
															placeholder="Assigned"
															onBlur={handleBlur}
															error={touched.userIDs && !!errors.userIDs}
															helperText={touched.userIDs && errors.userIDs}
														/>
													)}
												/>
											</div>
											<div className="px-4 py-2">
												<div className="py-2">
													<InputLabel htmlFor="startDate">End Date</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													type="date"
													placeholder="Start Date"
													id="endDate"
													name="endDate"
													value={moment(values?.endDate).format("YYYY-MM-DD")}
													onChange={(e) => {
														setFieldValue("endDate", new Date(e?.target.value));
													}}
													onBlur={handleBlur}
													error={touched.endDate && !!errors.endDate}
													helperText={touched.endDate && errors.endDate}
												/>
											</div>
											<div className="px-4 py-2">
												<div className="py-2">
													<InputLabel htmlFor="description">
														Description
													</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													multiline
													maxRows={3}
													type="text"
													placeholder="Description"
													id="description"
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
												className="!bg-theme !px-10 !py-3 hover:!bg-sky-800 hover:!shadow-xl"
												disabled={loading}
												startIcon={
													loading ? <CircularProgress size={20} /> : <Check />
												}
											>
												Submit
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

export default ProjectUpdate;

const genders = [
	{ id: 1, value: "Male" },
	{ id: 2, value: "Female" },
];
