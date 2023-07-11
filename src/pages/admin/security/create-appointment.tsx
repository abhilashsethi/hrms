import { Check } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	CircularProgress,
	InputLabel,
	TextField,
} from "@mui/material";
import { AdminBreadcrumbs, FileUpload } from "components/core";
import { ErrorMessage, Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import { User } from "types";
import * as Yup from "yup";
const initialValues = {
	name: "",
	phone: "",
	email: "",
	address: "",
	startDate: "",
	endDate: "",
	startTime: "",
	endTime: "",
	assignedUserId: "",
	status: "",
};

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.matches(
			/^[A-Za-z ]+$/,
			"First name must only contain alphabetic characters"
		)
		.min(2, "First name must be at least 2 characters")
		.max(50, "First name must be less than 50 characters")
		.required("First name is required!"),

	phone: Yup.string()
		.required("Required!")
		.matches(
			/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
			"Phone number is not valid"
		)
		.min(6)
		.max(15),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required!"),
	address: Yup.string().required("Required!"),
	startDate: Yup.string().required("Required!"),
	endDate: Yup.string().required("Required!"),
	startTime: Yup.string().required("Required!"),
	endTime: Yup.string().required("Required!"),
	status: Yup.string().required("Required!"),
});

const CreateAppointment = () => {
	// const theme = useTheme();
	const [loading, setLoading] = useState(false);

	const { change, isChanging } = useChange();
	const { data: userData } = useFetch<User[]>(`users`);
	console.log(userData);
	const handleSubmit = async (values: any) => {
		console.log(values);
	};

	return (
		<PanelLayout title="Create Guard - Admin Panel">
			<section className="md:px-8 px-2 md:py-4 py-2">
				<div className="px-2 md:px-0">
					<AdminBreadcrumbs links={links} />
				</div>
				<section className="w-full px-0 md:py-4 py-2 flex justify-center items-center">
					<div className="md:p-6 p-2 md:w-3/4 w-full rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
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
									<h1 className="text-lg uppercase md:text-xl lg:text-2xl text-slate-600 flex justify-center font-extrabold py-2">
										Create Appointment
									</h1>
									<div className="grid lg:grid-cols-2">
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="md:py-2 py-1">
												<InputLabel htmlFor="name">
													Name <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												fullWidth
												size="small"
												id="name"
												placeholder="Name"
												name="name"
												value={values.name}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.name && !!errors.name}
												helperText={touched.name && errors.name}
											/>
										</div>

										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="email">
													Email <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												placeholder="Email"
												id="email"
												name="email"
												value={values.email}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.email && !!errors.email}
												helperText={touched.email && errors.email}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="phone">
													Phone <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												placeholder="Phone"
												id="phone"
												name="phone"
												value={values.phone}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.phone && !!errors.phone}
												helperText={touched.phone && errors.phone}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="address">
													Address <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												multiline
												rows={3}
												placeholder="Address"
												id="address"
												name="address"
												value={values.address}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.address && !!errors.address}
												helperText={touched.address && errors.address}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="startDate">
													Appointment Start Date{" "}
													<span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												type="date"
												id="startDate"
												name="startDate"
												value={values.startDate}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.startDate && !!errors.startDate}
												helperText={touched.startDate && errors.startDate}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="endDate">
													Appointment End Date{" "}
													<span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												type="date"
												id="endDate"
												name="endDate"
												value={values.endDate}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.endDate && !!errors.endDate}
												helperText={touched.endDate && errors.endDate}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="startTime">
													Appointment Start Time{" "}
													<span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												type="time"
												id="startTime"
												name="startTime"
												value={values.startTime}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.startTime && !!errors.startTime}
												helperText={touched.startTime && errors.startTime}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="endTime">
													Appointment End Time{" "}
													<span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												type="time"
												id="endTime"
												name="endTime"
												value={values.endTime}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.endTime && !!errors.endTime}
												helperText={touched.endTime && errors.endTime}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="assignedUserId">
													Whom To Visit<span className="text-red-500">*</span>
												</InputLabel>
											</div>
											<Autocomplete
												fullWidth
												size="small"
												id="assignedUserId"
												options={userData || []}
												onChange={(e, r) => {
													setFieldValue("assignedUserId", r?.id);
												}}
												getOptionLabel={(option: any) => option.name}
												renderInput={(params) => (
													<TextField
														{...params}
														// label="Role"
														placeholder="Name"
														onBlur={handleBlur}
														error={
															touched.assignedUserId && !!errors.assignedUserId
														}
														helperText={
															touched.assignedUserId && errors.assignedUserId
														}
													/>
												)}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="status">
													Appointment Status{" "}
													<span className="text-red-600">*</span>
												</InputLabel>
											</div>

											<Autocomplete
												fullWidth
												size="small"
												id="status"
												options={Status_Type || []}
												onChange={(e, r) => {
													setFieldValue("status", r?.id);
												}}
												getOptionLabel={(option: any) => option.name}
												renderInput={(params) => (
													<TextField
														{...params}
														// label="Role"
														placeholder="status"
														onBlur={handleBlur}
														error={touched.status && !!errors.status}
														helperText={touched.status && errors.status}
													/>
												)}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1 col-span-2">
											<FileUpload
												title="Upload Photo"
												values={values}
												setImageValue={(event: any) => {
													setFieldValue("image", event.currentTarget.files[0]);
												}}
											>
												<ErrorMessage name="image" />
											</FileUpload>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1 col-span-2">
											<div className="py-2">
												<InputLabel htmlFor="address">
													Reason <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												placeholder="Reason"
												multiline
												rows={3}
												id="address"
												name="address"
												value={values.address}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.address && !!errors.address}
												helperText={touched.address && errors.address}
											/>
										</div>
									</div>
									<div className="flex justify-center md:py-4 py-2">
										<Button
											type="submit"
											variant="contained"
											className="!bg-theme"
											disabled={loading}
											startIcon={
												loading ? <CircularProgress size={20} /> : <Check />
											}
										>
											SUBMIT
										</Button>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</section>
			</section>
		</PanelLayout>
	);
};

export default CreateAppointment;

const links = [
	{ id: 1, page: "Security", link: "/admin/security" },
	{ id: 2, page: "Create Guard", link: "/admin/security/create-guard" },
];
const Status_Type = [
	{
		id: 1,
		name: "Completed",
		value: "completed",
	},
	{
		id: 2,
		name: "Pending",
		value: "pending",
	},
];
