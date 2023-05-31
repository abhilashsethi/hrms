import {
	Autocomplete,
	Box,
	Button,
	CircularProgress,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";
import { Add, Check, Done, Settings } from "@mui/icons-material";
import { AdminBreadcrumbs, PhotoViewerSmall } from "components/core";
import { useTheme } from "@material-ui/core";
import PanelLayout from "layouts/panel";
import { Form, Formik } from "formik";
import { ChangeEvent, useState } from "react";
import * as Yup from "yup";
import { useFetch } from "hooks";
import AddSalaryInfo from "components/dialogues/AddSalaryInfo";
const initialValues = {
	userId: "",
	variant: "",
	grossSalary: "",
	kpi: "",
	tds: "",
};

const validationSchema = Yup.object().shape({
	userId: Yup.string().required("Select an employee"),
	grossSalary: Yup.number().required("% For Gross Salary is required !"),
	// variant: Yup.string().required("Please select a variant!"),
	// kpi: Yup.string().required("Please enter kpi amount!"),
});

const AddSalaryInformation = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { data: usersData } = useFetch(`users`);
	const [loading, setLoading] = useState(false);
	const [salaryInfoModal, setSalaryInfoModal] = useState<boolean>(false);
	const handleClose = () => {
		setAnchorEl(null);
	};


	const handleSubmit = async (values: any) => {
		console.log(values);
	};

	return (
		<PanelLayout title="Add Salary Info - Admin Panel">
			<AddSalaryInfo
				// mutate={mutate}
				open={salaryInfoModal}
				handleClose={() => setSalaryInfoModal(false)}
			/>
			<section className="md:px-8 px-2 md:py-4 py-2">
				<div className="px-2 md:px-0">
					<AdminBreadcrumbs links={links} />
				</div>
				<section className="w-full px-0 md:py-4 py-2 flex justify-center items-center">
					<div className="md:w-[40rem] w-full bg-white md:px-4 py-4 px-2 tracking-wide rounded-lg shadow-xl">
						<p className="text-center text-xl font-bold text-theme tracking-wide">
							ADD SALARY INFO
						</p>
						<div className="flex justify-end">
							<Button onClick={() => {
								setSalaryInfoModal((prev) => !prev);
								handleClose;
							}} variant="outlined" startIcon={<Add />}>
								Add New Field
							</Button>
						</div>
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
									<div className="md:px-4 px-2 md:py-2 py-1 ">
										<div className="py-2">
											<InputLabel htmlFor="chooseEmp">
												Choose Employee<span className="text-red-600"> *</span>
											</InputLabel>
										</div>

										<Autocomplete
											options={usersData as any}
											size="small"
											fullWidth
											autoHighlight
											getOptionLabel={(option: any) => option.name}
											onChange={(e, r) => {
												setFieldValue("userId", r?.id);
											}}
											renderOption={(props, option) => (
												<Box
													component="li"
													sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
													{...props}
												>
													<div className="mr-2">
														<PhotoViewerSmall
															size="2rem"
															name={option.name}
															photo={option.photo}
														/>
													</div>
													{option.name}
												</Box>
											)}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Select Employee"
													onBlur={handleBlur}
													error={touched.userId && !!errors.userId}
													helperText={touched.userId && errors.userId}
													inputProps={{
														...params.inputProps,
														autoComplete: "", // disable autocomplete and autofill
													}}
												/>
											)}
										/>
									</div>

									<div className="md:px-4 px-2 md:py-2 py-1">
										<div className="md:py-2 py-1">
											<InputLabel htmlFor="grossSalary">
												Enter Gross Salary Per Month
												<span className="text-red-600"> *</span>
											</InputLabel>
										</div>
										<TextField
											fullWidth
											size="small"
											id="grossSalary"
											// placeholder="% for basic salary"
											name="grossSalary"
											value={values.grossSalary}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.grossSalary && !!errors.grossSalary}
											helperText={touched.grossSalary && errors.grossSalary}
										/>
									</div>

									<div className="md:px-4 px-2 md:py-2 py-1 ">
										<div className="py-2">
											<InputLabel htmlFor="chooseEmp">
												KPI
											</InputLabel>
										</div>
										<TextField
											size="small"
											fullWidth
											// placeholder="Date"
											name="kpi"
											value={values.kpi}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.kpi && !!errors.kpi}
											helperText={touched.kpi && errors.kpi}
										/>
									</div>
									<div className="md:px-4 px-2 md:py-2 py-1 ">
										<div className="py-2">
											<InputLabel htmlFor="chooseEmp">
												TDS
											</InputLabel>
										</div>
										<TextField
											size="small"
											fullWidth
											name="tds"
											// placeholder="Date"
											value={values.tds}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.tds && !!errors.tds}
											helperText={touched.tds && errors.tds}
										/>
									</div>


									<div className="flex justify-center md:py-4 py-1">
										<Button
											type="submit"
											variant="contained"
											className="!bg-theme"
											disabled={loading}
											startIcon={
												loading ? (
													<CircularProgress size={20} color="warning" />
												) : (
													<Done />
												)
											}
										>
											SAVE
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

export default AddSalaryInformation;

const variants = [
	{ id: 1, value: "tds" },
	{ id: 2, value: "kpi" },
];
const links = [
	{ id: 1, page: "Payroll", link: "/admin/payroll" },
	{ id: 2, page: "Add Salary Info", link: "/admin/payroll/add-salary-info" },
];
