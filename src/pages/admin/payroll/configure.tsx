import { useTheme } from "@material-ui/core";
import { Check, Settings } from "@mui/icons-material";
import { Button, CircularProgress, InputLabel, TextField } from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { Form, Formik } from "formik";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import * as Yup from "yup";
const initialValues = {
	basicSalary: "",
	hra: "",
	employeepf: "",
	employerpf: "",
	employeeEsi: "",
	employerEsi: "",
	extraPay: "",
	tds: "",
};

const validationSchema = Yup.object().shape({
	basicSalary: Yup.number().required("% For Basic Salary is required !"),
	hra: Yup.number().required("% For HRA is required !"),
	employeepf: Yup.number().required(
		"% For PF (Employee contribution) is required !"
	),
	employerpf: Yup.number().required(
		"% For PF (Employer contribution) is required !"
	),
	employerEsi: Yup.number().required(
		"% For ESI(Employer contribution) is required !"
	),
	employeeEsi: Yup.number().required(
		"% For ESI(Employee contribution) is required !"
	),
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
									<h1 className="text-lg uppercase md:text-xl lg:text-2xl text-slate-600 flex justify-center font-extrabold py-2">
										Payroll Configuration
									</h1>
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
												<InputLabel htmlFor="employeepf">
													PF %(Employee Contribution){" "}
													<span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												// placeholder="% for PF"
												id="employeepf"
												name="employeepf"
												value={values.employeepf}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.employeepf && !!errors.employeepf}
												helperText={touched.employeepf && errors.employeepf}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="employerpf">
													PF %(Employer Contribution){" "}
													<span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												// placeholder="% for PF"
												id="employerpf"
												name="employerpf"
												value={values.employerpf}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.employerpf && !!errors.employerpf}
												helperText={touched.employerpf && errors.employerpf}
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
									</div>
									<div className="flex justify-center md:py-4 py-2">
										<Button
											type="submit"
											variant="contained"
											className="!bg-theme"
											disabled={loading}
											startIcon={
												loading ? <CircularProgress size={20} /> : <Settings />
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
