import { Check } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	CircularProgress,
	InputLabel,
	TextField,
} from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import router from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
const initialValues = {
	firstName: "",
	lastName: "",
	phone: "",
	email: "",
	roleId: "",
	departmentId: "",
	employeeOfBranchId: "",
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
	roleId: Yup.string().required("Required!"),
	departmentId: Yup.string().required("Required!"),
	employeeOfBranchId: Yup.string().required("Required!"),
	// password: Yup.string()
	//   .min(6, "Password should minimum 6 characters!")
	//   .required("Password is required!"),
	// confirmPassword: Yup.string()
	//   .oneOf([Yup.ref("password")], "Password Must Match!")
	//   .required("Confirm password is required!"),
});

const CreateEmployee = () => {
	// const theme = useTheme();
	// const [showPassword, setShowPassword] = useState(false);
	// const [showConPassword, setShowConPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { data: departmentsData } = useFetch<any>(`departments`);
	const { data: roleData, isLoading, mutate } = useFetch<any>(`roles`);
	const { data: branchData } = useFetch<any>(`branches`);
	const { change, isChanging } = useChange();
	const handleSubmit = async (values: any) => {
		const reqValue = Object.entries(values).reduce((acc: any, [key, value]) => {
			if (value) {
				acc[key] = value;
			}
			return acc;
		}, {});
		try {
			setLoading(true);
			const res: any = await change(`users`, {
				body: reqValue,
			});
			setLoading(false);
			console.log(res);
			if (res?.status !== 201) {
				Swal.fire("Error", res?.results?.msg || "Unable to Submit", "info");
				setLoading(false);
				return;
			}
			router?.push("/admin/employees/all-employees");
			Swal.fire(
				`Success!`,
				`${res?.results?.msg || `Employee Created Successfully`}`,
				`success`
			);
			return;
		} catch (error) {
			console.log(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<PanelLayout title="Create Employee - Admin Panel">
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
										Create Employee
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
										{/* <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="password">
                          Password <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Password"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {"password" === "password" && (
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div> */}
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
												<InputLabel htmlFor="role">
													Role <span className="text-red-600">*</span>
												</InputLabel>
											</div>

											<Autocomplete
												fullWidth
												size="small"
												id="roleId"
												options={roleData || []}
												onChange={(e: any, r: any) => {
													setFieldValue("roleId", r?.id);
												}}
												getOptionLabel={(option: any) => option.name}
												renderInput={(params) => (
													<TextField
														{...params}
														// label="Role"
														placeholder="Role"
														onBlur={handleBlur}
														error={touched.roleId && !!errors.roleId}
														helperText={touched.roleId && errors.roleId}
													/>
												)}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="departmentId">
													Department Name{" "}
													<span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<Autocomplete
												fullWidth
												size="small"
												id="departmentId"
												options={departmentsData || []}
												onChange={(e: any, r: any) => {
													setFieldValue("departmentId", r?.id);
												}}
												getOptionLabel={(option: any) => option.name}
												renderInput={(params) => (
													<TextField
														{...params}
														// label="Department Name"
														placeholder="Department Name"
														onBlur={handleBlur}
														error={
															touched.departmentId && !!errors.departmentId
														}
														helperText={
															touched.departmentId && errors.departmentId
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

export default CreateEmployee;

const links = [
	{ id: 1, page: "Employees", link: "/admin/employees" },
	{ id: 2, page: "Create Employee", link: "/admin/employees/create-employee" },
];
