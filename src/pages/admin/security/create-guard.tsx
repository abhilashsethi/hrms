import { Check } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	CircularProgress,
	FormControlLabel,
	InputLabel,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { ChangeEvent, useState } from "react";
import * as Yup from "yup";
const initialValues = {
	firstName: "",
	lastName: "",
	phone: "",
	email: "",
	joiningDate: "",
	employeeOfBranchId: "",
	address: "",
	agencyAddress: "",
	agencyName: "",
};

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
	employeeOfBranchId: Yup.string().required("Required!"),
	address: Yup.string().required("Required!"),
	agencyAddress: Yup.string().required("Required!"),
	agencyName: Yup.string().required("Required!"),
	joiningDate: Yup.string().required("Required!"),
});

const CreateGuard = () => {
	// const theme = useTheme();
	const [loading, setLoading] = useState(false);
	const [isSecurityAgency, setIsSecurityAgency] = useState(true);

	const { data: branchData } = useFetch<any>(`branches`);
	const { change, isChanging } = useChange();
	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsSecurityAgency(event.target.value === "YES");
	};
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
										Create Guard
									</h1>
									<div className="grid lg:grid-cols-2">
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="md:py-2 py-1">
												<InputLabel htmlFor="firstName">
													First Name <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												fullWidth
												size="small"
												id="firstName"
												placeholder="First Name"
												name="firstName"
												value={values.firstName}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.firstName && !!errors.firstName}
												helperText={touched.firstName && errors.firstName}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="md:py-2 py-1">
												<InputLabel htmlFor="lastName">
													Last Name <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												fullWidth
												size="small"
												id="lastName"
												placeholder="LastName"
												name="lastName"
												value={values.lastName}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.lastName && !!errors.lastName}
												helperText={touched.lastName && errors.lastName}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="email">
													Personal Email <span className="text-red-600">*</span>
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
												<InputLabel htmlFor="employeeOfBranchId">
													Shift <span className="text-red-600">*</span>
												</InputLabel>
											</div>

											<Autocomplete
												fullWidth
												size="small"
												id="employeeOfBranchId"
												options={branchData || []}
												onChange={(e: any, r: any) => {
													setFieldValue("employeeOfBranchId", r?.id);
												}}
												getOptionLabel={(option: any) => option.name}
												renderInput={(params) => (
													<TextField
														{...params}
														// label="Role"
														placeholder="Branch"
														onBlur={handleBlur}
														error={
															touched.employeeOfBranchId &&
															!!errors.employeeOfBranchId
														}
														helperText={
															touched.employeeOfBranchId &&
															errors.employeeOfBranchId
														}
													/>
												)}
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
										<div className="my-3 px-4">
											<p className="text-gray-500">
												Security Agency
												<span className="text-red-600">*</span>
											</p>
											<RadioGroup
												defaultValue={isSecurityAgency ? "YES" : "NO"}
												row
												name="isSecurityAgency"
												onChange={handleOptionChange}
											>
												<FormControlLabel
													value="YES"
													control={<Radio />}
													label="YES"
												/>
												<FormControlLabel
													value="NO"
													control={<Radio />}
													label="NO"
												/>
											</RadioGroup>
											{isSecurityAgency ? (
												<>
													<div className="md:px-4 px-2 md:py-2 py-1">
														<div className="py-2">
															<InputLabel htmlFor="agencyName">
																Agency Name{" "}
																<span className="text-red-600">*</span>
															</InputLabel>
														</div>
														<TextField
															size="small"
															fullWidth
															placeholder="Agency"
															id="agencyName"
															name="agencyName"
															value={values.agencyName}
															onChange={handleChange}
															onBlur={handleBlur}
															error={touched.agencyName && !!errors.agencyName}
															helperText={
																touched.agencyName && errors.agencyName
															}
														/>
													</div>
													<div className="md:px-4 px-2 md:py-2 py-1">
														<div className="py-2">
															<InputLabel htmlFor="agencyAddress">
																Agency Address{" "}
																<span className="text-red-600">*</span>
															</InputLabel>
														</div>
														<TextField
															size="small"
															fullWidth
															multiline
															rows={3}
															placeholder="Address"
															id="agencyAddress"
															name="agencyAddress"
															value={values.agencyAddress}
															onChange={handleChange}
															onBlur={handleBlur}
															error={
																touched.agencyAddress && !!errors.agencyAddress
															}
															helperText={
																touched.agencyAddress && errors.agencyAddress
															}
														/>
													</div>
												</>
											) : null}
										</div>

										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="joiningDate">
													Joining Date <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												type="date"
												id="joiningDate"
												name="joiningDate"
												value={values.joiningDate}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.joiningDate && !!errors.joiningDate}
												helperText={touched.joiningDate && errors.joiningDate}
											/>
										</div>

										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="employeeOfBranchId">
													Branch <span className="text-red-600">*</span>
												</InputLabel>
											</div>

											<Autocomplete
												fullWidth
												size="small"
												id="employeeOfBranchId"
												options={branchData || []}
												onChange={(e: any, r: any) => {
													setFieldValue("employeeOfBranchId", r?.id);
												}}
												getOptionLabel={(option: any) => option.name}
												renderInput={(params) => (
													<TextField
														{...params}
														// label="Role"
														placeholder="Branch"
														onBlur={handleBlur}
														error={
															touched.employeeOfBranchId &&
															!!errors.employeeOfBranchId
														}
														helperText={
															touched.employeeOfBranchId &&
															errors.employeeOfBranchId
														}
													/>
												)}
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

export default CreateGuard;

const links = [
	{ id: 1, page: "Security", link: "/admin/security" },
	{ id: 2, page: "Create Guard", link: "/admin/security/create-guard" },
];
