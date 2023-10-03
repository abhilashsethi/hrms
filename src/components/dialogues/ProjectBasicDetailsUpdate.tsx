import {
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
	// startDate: Yup.string().required("Start Date is required!"),
	name: Yup.string()
		.matches(/^[A-Za-z ]+$/, "Name must only contain alphabetic characters")
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be less than 50 characters")
		.required("Name is required!"),
	description: Yup.string()
		.min(5, "Description must be at least 2 characters")
		.max(500, "Description must be less than 500 characters"),
	gmail: Yup.string().email("Invalid gmail address"),
});

const ProjectBasicDetailsUpdate = ({
	open,
	handleClose,
	mutate,
	id,
}: Props) => {
	const { data, isLoading } = useFetch<any>(`users`);
	const [loading, setLoading] = useState(false);
	const { change } = useChange();
	const router = useRouter();
	const { data: employData } = useFetch<any>(`projects/${id}`);
	const initialValues = {
		name: `${employData?.name ? employData?.name : ""}`,
		description: `${employData?.description ? employData?.description : ""}`,
		gmail: `${employData?.gmail ? employData?.gmail : ""}`,
		startDate: `${employData?.startDate ? employData?.startDate : ""}`,
		endDate: `${employData?.endDate ? employData?.endDate : ""}`,
		status: `${employData?.status ? employData?.status : ""}`,
		industry: `${employData?.industry ? employData?.industry : ""}`,
		// industry: `${employData?.industry ? employData?.industry : ""}`,
	};
	const handleSubmit = async (values: any) => {
		const reqValue = Object.entries(values).reduce((acc: any, [key, value]) => {
			if (value) {
				acc[key] = value;
			}
			return acc;
		}, {});
		setLoading(true);
		try {
			const res = await change(`projects/${id}`, {
				method: "PATCH",
				body: reqValue,
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
		} catch (error) {
			if (error instanceof Error) {
				Swal.fire(`Error`, error?.message, `error`);
			} else {
				Swal.fire(`Error`, "Something Went Wrong", `error`);
			}
			setLoading(false);
		} finally {
			setLoading(false);
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
				<DialogTitle
					id="customized-dialog-title"
					// sx={{ p: 2, minWidth: "40rem !important" }}
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
										<div className="grid md:grid-cols-2  w-full">
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
													<InputLabel htmlFor="gmail">Industry</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													placeholder="Industry"
													name="industry"
													value={values.industry}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.industry && !!errors.industry}
													helperText={touched.industry && errors.industry}
												/>
											</div>
											<div className="px-4 py-2">
												<div className="py-2">
													<InputLabel htmlFor="name">Status</InputLabel>
												</div>
												<TextField
													select
													size="small"
													fullWidth
													name="status"
													value={values.status}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.status && !!errors.status}
													helperText={touched.status && errors.status}
												>
													{statuses.map((option) => (
														<MenuItem key={option.id} value={option.label}>
															{option.label}
														</MenuItem>
													))}
												</TextField>
											</div>
											{/* <div className="px-4 py-2">
                        <div className="py-2">
                          <InputLabel htmlFor="gmail">Industry</InputLabel>
                        </div>
                        <TextField
                          size="small"
                          fullWidth
                          placeholder="Industry"
                          id="industry"
                          name="industry"
                          value={values.industry}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.industry && !!errors.industry}
                          helperText={touched.industry && errors.industry}
                        />
                      </div> */}

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
													inputProps={{
														max: values?.endDate
															? new Date(values?.endDate)
																	.toISOString()
																	.split("T")[0]
															: "",
													}}
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
													<InputLabel htmlFor="endDate">Deadline</InputLabel>
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
												className="!bg-theme"
												disabled={loading}
												startIcon={
													loading ? <CircularProgress size={20} /> : <Check />
												}
											>
												UPDATE
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

export default ProjectBasicDetailsUpdate;

const statuses = [
	{ id: 1, label: "Pending" },
	{ id: 2, label: "Ongoing" },
	{ id: 3, label: "Onhold" },
	{ id: 4, label: "Completed" },
];
