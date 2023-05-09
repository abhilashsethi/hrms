import { Check, Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	CircularProgress,
	IconButton,
	InputAdornment,
	InputLabel,
	TextField,
} from "@mui/material";
import { AdminBreadcrumbs, Loader } from "components/core";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import router from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import * as Yup from "yup";
const initialValues = {
	name: "",
	phone: "",
	email: "",
	gender: "",
	validFromDate: "",
	validFromTime: "",
	validTillDate: "",
	validTillTime: "",
	visitInfo: "",
};

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.matches(/^[A-Za-z ]+$/, "Name must only contain alphabetic characters")
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be less than 50 characters")
		.required("Name is required!"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required!"),
	phone: Yup.string()
		.matches(
			/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
			"Phone number is not valid"
		)
		.min(6)
		.max(15),
	gender: Yup.string().required("Gender is required!"),
	validFromDate: Yup.date().required("Date is required"),
	validFromTime: Yup.string().required("Time is required"),
	validTillDate: Yup.date().required("Date is required"),
	validTillTime: Yup.string().required("Time is required"),
	visitInfo: Yup.string().required("Visit information is required"),
});

const CreateGuest = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConPassword, setShowConPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { data: departmentsData } = useFetch<any>(`departments`);
	const { data: roleData, isLoading, mutate } = useFetch<any>(`roles`);
	const { change, isChanging } = useChange();

	const handleSubmit = async (values: any) => {
		// setLoading(true);
		// try {
		// 	delete values.confirmPassword;
		// 	const res = await change(`users`, {
		// 		body: values,
		// 	});
		// 	setLoading(false);
		// 	if (res?.status !== 201) {
		// 		Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
		// 		setLoading(false);
		// 		return;
		// 	}
		// 	router?.push("/admin/employees/all-employees");
		// 	Swal.fire(`Success`, `You have successfully Created!`, `success`);
		// 	return;
		// } catch (error) {
		// 	console.log(error);
		// 	setLoading(false);
		// } finally {
		// 	setLoading(false);
		// }

		console.log(values);
	};

	const Gender = [
		{
			id: 1,
			name: "Male",
		},
		{
			id: 2,
			name: "Female",
		},
	];

	return (
		<PanelLayout title="Create Guest - SY HR MS">
			<section className="px-8 py-4">
				<AdminBreadcrumbs links={links} />
				<section className="w-full px-2 py-4 flex justify-center items-center">
					<div className="p-6 w-3/4 rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
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
									<h1 className="text-2xl uppercase md:text-xl lg:text-2xl text-theme flex justify-center font-extrabold py-2">
										Create Guest
									</h1>
									<div className="grid lg:grid-cols-2">
										<div className="px-4 py-2">
											<div className="py-2">
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
										<div className="px-4 py-2">
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

										<div className="px-4 py-2">
											<div className="py-2">
												<InputLabel htmlFor="phone">Phone</InputLabel>
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
										<div className="px-4 py-2">
											<div className="py-2">
												<InputLabel htmlFor="role">
													Gender <span className="text-red-600">*</span>
												</InputLabel>
											</div>

											<Autocomplete
												fullWidth
												size="small"
												id="gender"
												options={Gender || []}
												onChange={(e: any, r: any) => {
													setFieldValue("gender", r?.name);
												}}
												getOptionLabel={(option: any) => option.name}
												renderInput={(params) => (
													<TextField
														{...params}
														label="Select Gender"
														placeholder="Selected Gender"
														onBlur={handleBlur}
														error={touched.gender && !!errors.gender}
														helperText={touched.gender && errors.gender}
													/>
												)}
											/>
										</div>

										<div className="mt-3">
											<p className="text-center font-semibold -mb-3">
												Valid From
											</p>

											<div className="grid grid-cols-2">
												<div className="px-4 py-2">
													<div className="py-2">
														<InputLabel htmlFor="validFromDate">
															Date <span className="text-red-600">*</span>
														</InputLabel>
													</div>
													<TextField
														size="small"
														fullWidth
														type="date"
														// placeholder="Employee ID"
														id="validFromDate"
														name="validFromDate"
														value={values.validFromDate}
														onChange={handleChange}
														onBlur={handleBlur}
														error={
															touched.validFromDate && !!errors.validFromDate
														}
														helperText={
															touched.validFromDate && errors.validFromDate
														}
													/>
												</div>
												<div className="px-4 py-2">
													<div className="py-2">
														<InputLabel htmlFor="validFromTime">
															Time <span className="text-red-600">*</span>
														</InputLabel>
													</div>
													<TextField
														size="small"
														fullWidth
														type="Time"
														// placeholder="Employee ID"
														id="validFromTime"
														name="validFromTime"
														value={values.validFromTime}
														onChange={handleChange}
														onBlur={handleBlur}
														error={
															touched.validFromTime && !!errors.validFromTime
														}
														helperText={
															touched.validFromTime && errors.validFromTime
														}
													/>
												</div>
											</div>
										</div>

										<div className="mt-3">
											<p className="text-center font-semibold -mb-3">
												Valid Till
											</p>

											<div className="grid grid-cols-2">
												<div className="px-4 py-2">
													<div className="py-2">
														<InputLabel htmlFor="validTillDate">
															Date <span className="text-red-600">*</span>
														</InputLabel>
													</div>
													<TextField
														size="small"
														fullWidth
														type="date"
														// placeholder="Employee ID"
														id="validTillDate"
														name="validTillDate"
														value={values.validTillDate}
														onChange={handleChange}
														onBlur={handleBlur}
														error={
															touched.validTillDate && !!errors.validTillDate
														}
														helperText={
															touched.validTillDate && errors.validTillDate
														}
													/>
												</div>
												<div className="px-4 py-2">
													<div className="py-2">
														<InputLabel htmlFor="validTillTime">
															Date <span className="text-red-600">*</span>
														</InputLabel>
													</div>
													<TextField
														size="small"
														fullWidth
														type="time"
														// placeholder="Employee ID"
														id="validTillTime"
														name="validTillTime"
														value={values.validTillTime}
														onChange={handleChange}
														onBlur={handleBlur}
														error={
															touched.validTillTime && !!errors.validTillTime
														}
														helperText={
															touched.validTillTime && errors.validTillTime
														}
													/>
												</div>
											</div>
										</div>

										<div className="px-4 py-2 col-span-2">
											<div className="py-2">
												<InputLabel htmlFor="visitInfo">
													Visit Info <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												multiline
												rows={4}
												size="small"
												fullWidth
												// placeholder="Employee ID"
												id="visitInfo"
												name="visitInfo"
												value={values.visitInfo}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.visitInfo && !!errors.visitInfo}
												helperText={touched.visitInfo && errors.visitInfo}
											/>
										</div>
									</div>
									<div className="flex justify-center py-4">
										<Button
											type="submit"
											variant="contained"
											className="!bg-theme !px-10 !py-3 hover:!bg-sky-800 hover:!shadow-xl"
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
				</section>
			</section>
		</PanelLayout>
	);
};

export default CreateGuest;

const links = [
	{ id: 1, page: "Guests", link: "/admin/guests" },
	{ id: 2, page: "Create Guest", link: "/admin/guests/create-guests" },
];