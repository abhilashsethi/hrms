import { Button, CircularProgress, InputLabel, TextField } from "@mui/material";
import { Add, Check, Settings } from "@mui/icons-material";
import { AdminBreadcrumbs } from "components/core";
import { useTheme } from "@material-ui/core";
import PanelLayout from "layouts/panel";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
const initialValues = {
	basicSalary: "",
	hra: "",
	employeePf: "",
	employerPf: "",
	employeeEsi: "",
	employerEsi: "",
	extraPay: "",
	tds: "",
	conveyance: "",
	medical: "",
	professional: "",
};

const validationSchema = Yup.object().shape({
	basicSalary: Yup.number().required("% For Basic Salary is required !"),
	hra: Yup.number().required("% For HRA is required !"),
	employeePf: Yup.number().required(
		"% For PF (Employee contribution) is required !"
	),
	employerPf: Yup.number().required(
		"% For PF (Employer contribution) is required !"
	),
	employerEsi: Yup.number().required(
		"% For ESI(Employer contribution) is required !"
	),
	employeeEsi: Yup.number().required(
		"% For ESI(Employee contribution) is required !"
	),
	conveyance: Yup.number().required("Conveyance allowances is required !"),
	medical: Yup.number().required("Medical allowances is required !"),
	professional: Yup.number().required("Professional tax is required !"),
});

const Configure = () => {
	const theme = useTheme();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (values: any) => {
		console.log(values);
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
									<h1 className="text-lg uppercase md:text-xl lg:text-2xl text-theme flex justify-center font-extrabold py-2">
										Payroll Configuration
									</h1>
									{/* <div className="flex justify-end">
										<Button variant="outlined" startIcon={<Add />}>
											Add New Field
										</Button>
									</div> */}
									<div className="grid lg:grid-cols-2">
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="md:py-2 py-1">
												<InputLabel htmlFor="basicSalary">
													Basic Salary % <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												fullWidth
												size="small"
												id="basicSalary"
												// placeholder="% for basic salary"
												name="basicSalary"
												value={values.basicSalary}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.basicSalary && !!errors.basicSalary}
												helperText={touched.basicSalary && errors.basicSalary}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="hra">
													HRA % <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												// placeholder="% for HRA"
												id="hra"
												name="hra"
												value={values.hra}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.hra && !!errors.hra}
												helperText={touched.hra && errors.hra}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="employeePf">
													PF %(Employee Contribution){" "}
													<span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												// placeholder="% for PF"
												id="employeePf"
												name="employeePf"
												value={values.employeePf}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.employeePf && !!errors.employeePf}
												helperText={touched.employeePf && errors.employeePf}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="employerPf">
													PF %(Employer Contribution){" "}
													<span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												// placeholder="% for PF"
												id="employerPf"
												name="employerPf"
												value={values.employerPf}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.employerPf && !!errors.employerPf}
												helperText={touched.employerPf && errors.employerPf}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="employeeEsi">
													ESI %(Employee Contribution){" "}
													<span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												// placeholder="% for ESI"
												id="employeeEsi"
												name="employeeEsi"
												value={values.employeeEsi}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.employeeEsi && !!errors.employeeEsi}
												helperText={touched.employeeEsi && errors.employeeEsi}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="employerEsi">
													ESI %(Employer Contribution){" "}
													<span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												// placeholder="% for ESI"
												id="employerEsi"
												name="employerEsi"
												value={values.employerEsi}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.employerEsi && !!errors.employerEsi}
												helperText={touched.employerEsi && errors.employerEsi}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="tds">TDS %</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												// placeholder="% for ESI"
												id="tds"
												name="tds"
												value={values.tds}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.tds && !!errors.tds}
												helperText={touched.tds && errors.tds}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="conveyance">
													Conveyance allowances
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												// placeholder="% for ESI"
												id="conveyance"
												name="conveyance"
												value={values.conveyance}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.conveyance && !!errors.conveyance}
												helperText={touched.conveyance && errors.conveyance}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="medical">
													Medical allowances
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												// placeholder="% for ESI"
												id="medical"
												name="medical"
												value={values.medical}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.medical && !!errors.medical}
												helperText={touched.medical && errors.medical}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="professional">
													Professional Tax
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												// placeholder="% for ESI"
												id="professional"
												name="professional"
												value={values.professional}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.professional && !!errors.professional}
												helperText={touched.professional && errors.professional}
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
												loading ? (
													<CircularProgress size={20} color="warning" />
												) : (
													<Settings />
												)
											}
										>
											CONFIGURE
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

export default Configure;

const links = [
	{ id: 1, page: "Employees", link: "/admin/employees" },
	{ id: 2, page: "Create Employee", link: "/admin/employees/create-employee" },
];
