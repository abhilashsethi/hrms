import {
	Autocomplete,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	MenuItem,
	TextField,
	Tooltip,
} from "@mui/material";
import { useAuth, useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { Formik, Form, FormikValues } from "formik";
import * as Yup from "yup";
import { Check, Close } from "@mui/icons-material";
import Swal from "sweetalert2";
import moment from "moment";
import { useState } from "react";
import CountrySelector from "components/core/CountrySelector";
import { Branch, Role, User } from "types";

interface Props {
	open: boolean;
	handleClose: () => void;
	mutate: () => void;
	employData?: User;
}
const validationSchema = Yup.object().shape({
	firstName: Yup.string()
		.matches(
			/^[A-Za-z ]+$/,
			"First name must only contain alphabetic characters"
		)
		.min(2, "First name must be at least 2 characters")
		.max(50, "First name must be less than 50 characters")
		.required("First name is required!"),
	lastName: Yup.string()
		.matches(
			/^[A-Za-z ]+$/,
			"Last name must only contain alphabetic characters"
		)
		.min(2, "Last name must be at least 2 characters")
		.max(50, "Last name must be less than 50 characters")
		.required("Last name is required!"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Personal Email Required!")
		.matches(
			/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
			"Invalid email address"
		),
	// employeeID: Yup.string().required("Employee ID is required!"),
	employeeOfBranchId: Yup.string().required("Branch is Required."),
	phone: Yup.string()
		.required("Phone no is required!")
		.matches(
			/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
			"Phone number is not valid"
		)
		.min(6)
		.max(15),
	dob: Yup.string()
		.required("Date of birth is required")
		.test("minimum-age", "You must be at least 18 years old", (value: any) => {
			// Check for null, undefined, or empty string
			if (value === null || value === undefined || value === "") {
				return true; // Allow null, undefined, or empty value
			}

			const currentDate = new Date();
			const selectedDate = new Date(value);
			const minAgeDate = new Date();
			minAgeDate.setFullYear(currentDate.getFullYear() - 18);

			return selectedDate <= minAgeDate;
		}),
	countryCode: Yup.string().required("Country code required."),
	roleId: Yup.string().required("Role is required!"),
	departmentId: Yup.string().required("Department Id is required!"),
	gender: Yup.string().required("Gender is required!"),
	// joiningDate: Yup.string().required("Joining date is required"),
});

const UpdateProfileHead = ({
	open,
	handleClose,
	employData,
	mutate,
}: Props) => {
	const [loading, setLoading] = useState(false);
	const { change } = useChange();
	const { user } = useAuth();
	const { data: roles } = useFetch<Role[]>(`roles`);
	const { data: departmentsData } = useFetch<Role[]>(`departments`);
	const { data: branchData } = useFetch<Branch[]>(`branches`);
	const router = useRouter();
	const initialValues = {
		firstName: employData?.firstName || null,
		lastName: employData?.lastName || null,
		phone: employData?.phone || null,
		email: employData?.email || null,
		dob: employData?.dob || "",
		address: employData?.address || null,
		gender: employData?.gender || null,
		roleId: employData?.roleId || null,
		departmentId: employData?.departmentId || null,
		joiningDate: employData?.joiningDate || null,
		bloodGroup: employData?.bloodGroup || null,
		employeeOfBranchId: employData?.employeeOfBranchId || null,
		countryCode: employData?.countryCode ? employData?.countryCode : null,
	};
	const handleSubmit = async (values: FormikValues) => {
		setLoading(true);
		try {
			const res = await change(`users/${employData?.id}`, {
				method: "PATCH",
				body: {
					firstName: values?.firstName,
					lastName: values?.lastName,
					phone: values?.phone,
					email: values?.email,
					dob: values?.dob ? values?.dob : null,
					address: values?.address,
					gender: values?.gender,
					roleId: values?.roleId,
					departmentId: values?.departmentId,
					joiningDate: values?.joiningDate,
					bloodGroup: values?.bloodGroup,
					employeeOfBranchId: values?.employeeOfBranchId,
					countryCode: values?.countryCode,
				},
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
				<DialogTitle id="customized-dialog-title">
					<p className="text-center text-md font-bold text-theme te tracking-wide">
						UPDATE
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
					<div className="md:w-[50rem] w-[65vw] md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-4">
						<div className="flex flex-col items-center w-full">
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
									<Form className="w-full">
										{/* {console.log(values, "*****", errors)} */}
										<div className="grid lg:grid-cols-2 gap-4">
											<div className="w-full">
												<p className="text-theme font-semibold my-2">
													First Name <span className="text-red-600">*</span>
												</p>
												<TextField
													fullWidth
													name="firstName"
													placeholder="First Name"
													value={values.firstName}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.firstName && !!errors.firstName}
													helperText={
														Boolean(touched.firstName) &&
														(errors.firstName as string)
													}
												/>
											</div>
											<div className="w-full">
												<p className="text-theme font-semibold my-2">
													Last Name <span className="text-red-600">*</span>
												</p>
												<TextField
													fullWidth
													name="lastName"
													placeholder="Last Name"
													value={values.lastName}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.lastName && !!errors.lastName}
													helperText={
														Boolean(touched.lastName) &&
														(errors.lastName as string)
													}
												/>
											</div>
											<div className="w-full">
												<p className="text-theme font-semibold my-2">
													Personal Email <span className="text-red-600">*</span>
												</p>
												<TextField
													fullWidth
													name="email"
													placeholder="Enter Email"
													value={values.email}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.email && !!errors.email}
													helperText={
														Boolean(touched.email) && (errors.email as string)
													}
												/>
											</div>
											<div className="w-full">
												<p className="text-theme font-semibold my-2">
													Country Code <span className="text-red-600">*</span>
												</p>
												<CountrySelector
													className="bg-white border border-gray-400 py-4"
													defaultValue="91"
													name="countryCode"
													onChange={(e: any, r: any) => {
														setFieldValue("countryCode", r?.phone);
													}}
													onBlur={handleBlur}
													value={values.countryCode}
													error={touched.countryCode && !!errors.countryCode}
													helperText={touched.countryCode && errors.countryCode}
												/>
											</div>
											<div className="w-full">
												<p className="text-theme font-semibold my-2">
													Phone No <span className="text-red-600">*</span>
												</p>
												<div className="md:flex grid justify-center gap-2 items-center">
													<TextField
														fullWidth
														name="phone"
														placeholder="Enter Phone No"
														value={values.phone}
														onChange={handleChange}
														onBlur={handleBlur}
														error={touched.phone && !!errors.phone}
														helperText={
															Boolean(touched.phone) && (errors.phone as string)
														}
													/>
												</div>
											</div>
											<div className="w-full">
												<p className="text-theme font-semibold my-2">
													Date of Birth<span className="text-red-600">*</span>
												</p>
												<TextField
													fullWidth
													variant="outlined"
													name="dob"
													placeholder="Enter Date of Birth"
													value={moment(values?.dob).format("YYYY-MM-DD")}
													onChange={(e) => {
														setFieldValue("dob", new Date(e?.target.value));
													}}
													onBlur={handleBlur}
													error={touched.dob && !!errors.dob}
													type={"date"}
													helperText={
														Boolean(touched.dob) && (errors.dob as string)
													}
												/>
											</div>
											<div className="w-full">
												<p className="text-theme font-semibold my-2">
													Gender<span className="text-red-600">*</span>
												</p>
												<TextField
													select
													fullWidth
													name="gender"
													placeholder="Gender"
													value={values.gender}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.gender && !!errors.gender}
													helperText={
														Boolean(touched.gender) && (errors.gender as string)
													}
												>
													{genders.map((option) => (
														<MenuItem key={option.value} value={option.value}>
															{option.value}
														</MenuItem>
													))}
												</TextField>
											</div>
											<div className="w-full">
												<p className="text-theme font-semibold my-2">
													Blood Group
												</p>
												<TextField
													select
													fullWidth
													name="bloodGroup"
													placeholder="Blood Group"
													value={values.bloodGroup}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.bloodGroup && !!errors.bloodGroup}
													helperText={
														Boolean(touched.bloodGroup) &&
														(errors.bloodGroup as string)
													}
												>
													{bloodGroup.map((option) => (
														<MenuItem key={option.value} value={option.value}>
															{option.label}
														</MenuItem>
													))}
												</TextField>
											</div>
											<div className="w-full">
												<p className="text-theme font-semibold my-2">
													Role <span className="text-red-600">*</span>
												</p>
												<Autocomplete
													sx={{ width: "100%" }}
													options={roles || []}
													autoHighlight
													getOptionLabel={(option: any) =>
														option?.name ? option?.name : ""
													}
													isOptionEqualToValue={(option: any, value) =>
														option.id === value.roleId
													}
													value={
														values?.roleId
															? roles?.find(
																	(option: any) => option.id === values.roleId
															  )
															: {}
													}
													onChange={(e: any, r: any) => {
														setFieldValue("roleId", r?.id);
													}}
													renderInput={(params) => (
														<TextField
															{...params}
															label="Select Role"
															inputProps={{
																...params.inputProps,
															}}
															error={touched.roleId && !!errors.roleId}
															helperText={
																<p className="text-red-600">
																	{`${errors?.roleId ? errors?.roleId : ""}`}
																</p>
															}
														/>
													)}
												/>
											</div>
											<div className="w-full">
												<p className="text-theme font-semibold my-2">
													Branch <span className="text-red-600">*</span>
												</p>
												<Autocomplete
													sx={{ width: "100%" }}
													options={branchData || []}
													autoHighlight
													getOptionLabel={(option: any) =>
														option.name ? option.name : ""
													}
													isOptionEqualToValue={(option: any, value) =>
														option.id === value.employeeOfBranchId
													}
													value={
														values?.employeeOfBranchId
															? branchData?.find(
																	(option: any) =>
																		option.id === values.employeeOfBranchId
															  )
															: {}
													}
													onChange={(e: any, r: any) => {
														setFieldValue("employeeOfBranchId", r?.id);
													}}
													renderInput={(params) => (
														<TextField
															{...params}
															error={
																touched.employeeOfBranchId &&
																!!errors.employeeOfBranchId
															}
															helperText={
																<p className="text-red-600">
																	{`${
																		errors?.employeeOfBranchId
																			? errors?.employeeOfBranchId
																			: ""
																	}`}
																</p>
															}
															placeholder="Select Branch"
															inputProps={{
																...params.inputProps,
															}}
														/>
													)}
												/>
											</div>
											<div className="w-full">
												<p className="text-theme font-semibold my-2">
													Department <span className="text-red-600">*</span>
												</p>
												<Autocomplete
													sx={{ width: "100%" }}
													options={departmentsData || []}
													autoHighlight
													getOptionLabel={(option: any) =>
														option.name ? option.name : ""
													}
													isOptionEqualToValue={(option: any, value) =>
														option.id === value.departmentId
													}
													value={
														values?.departmentId
															? departmentsData?.find(
																	(option: any) =>
																		option.id === values.departmentId
															  )
															: {}
													}
													onChange={(e: any, r: any) => {
														setFieldValue("departmentId", r?.id);
													}}
													renderOption={(props, option) => (
														<Box
															component="li"
															sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
															{...props}
														>
															{option.name}
														</Box>
													)}
													renderInput={(params) => (
														<TextField
															{...params}
															label="Select Role"
															inputProps={{
																...params.inputProps,
															}}
															error={
																touched.departmentId && !!errors.departmentId
															}
															helperText={
																<p className="text-red-600">
																	{`${
																		errors?.departmentId
																			? errors?.departmentId
																			: ""
																	}`}
																</p>
															}
														/>
													)}
												/>
											</div>
											<div className="w-full">
												<p className="text-theme font-semibold my-2">
													Joining Date<span className="text-red-600">*</span>
												</p>
												<TextField
													fullWidth
													variant="outlined"
													name="joiningDate"
													placeholder="Enter Date of Birth"
													value={moment(values?.joiningDate).format(
														"YYYY-MM-DD"
													)}
													onChange={(e: any) => {
														setFieldValue(
															"joiningDate",
															new Date(e.target.value)
														);
													}}
													onBlur={handleBlur}
													error={touched.joiningDate && !!errors.joiningDate}
													type={"date"}
													helperText={
														Boolean(touched.joiningDate) &&
														(errors.joiningDate as any)
													}
												/>
											</div>
											<div className="w-full">
												<p className="text-theme font-semibold my-2">Address</p>
												<TextField
													fullWidth
													name="address"
													multiline
													maxRows={4}
													placeholder="Enter Address"
													value={values.address}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.address && !!errors.address}
													helperText={
														Boolean(touched.address) && (errors.address as any)
													}
												/>
											</div>
										</div>
										<div className="flex gap-3 justify-center mt-4">
											<Button
												type="submit"
												className="!bg-theme"
												variant="contained"
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

export default UpdateProfileHead;
const bloodGroup = [
	{ id: 1, value: "A_Positive", label: "A+" },
	{ id: 1, value: "A_Negative", label: "A-" },
	{ id: 1, value: "B_Positive", label: "B+" },
	{ id: 1, value: "B_Negative", label: "B-" },
	{ id: 1, value: "AB_Positive", label: "AB+" },
	{ id: 1, value: "AB_Negative", label: "AB-" },
	{ id: 1, value: "O_Positive", label: "O+" },
	{ id: 1, value: "O_Negative", label: "O-" },
];
const genders = [
	{ id: 1, value: "Male" },
	{ id: 2, value: "Female" },
];
