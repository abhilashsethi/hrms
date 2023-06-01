import { BorderColor, Close, Settings } from "@mui/icons-material";
import {
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
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

interface Props {
	open?: any;
	handleClose?: any;
	mutate?: any;
	data?: any;
	ptTax?: any;
}
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
	startGrossSalary1: Yup.number().required("Fill this field !"),
	endGrossSalary1: Yup.number().required("Fill this field !"),
	professionalTax1: Yup.number().required("Fill this field !"),
	professionalTax2: Yup.number().required("Fill this field !"),
	professionalTax3: Yup.number().required("Fill this field !"),
});

const UpdateProfileHead = ({
	open,
	handleClose,
	mutate,
	data,
	ptTax,
}: Props) => {
	console.log(data);
	const [loading, setLoading] = useState(false);
	const { change } = useChange();

	const router = useRouter();
	// const { data: employData } = useFetch<any>(`users/${router?.query?.id}`);
	const initialValues = {
		basicSalary: `${data?.length ? data[0]?.basicSalary : null}`,
		hra: `${data?.length ? data[0]?.hra : null}`,
		employeePf: `${data?.length ? data[0]?.pfEmployee : null}`,
		employerPf: `${data?.length ? data[0]?.pfEmployer : null}`,
		employeeEsi: `${data?.length ? data[0]?.esiEmployee : null}`,
		employerEsi: `${data?.length ? data[0]?.esiEmployer : null}`,
		conveyance: `${data?.length ? data[0]?.conveyanceAllowances : null}`,
		medical: `${data?.length ? data[0]?.medicalAllowances : null}`,
		startGrossSalary1: `${ptTax?.length ? ptTax[0]?.startGrossSalary : null}`,
		endGrossSalary1: `${ptTax?.length ? ptTax[0]?.endGrossSalary : null}`,
		startGrossSalary2: `${ptTax?.length ? ptTax[1]?.startGrossSalary : null}`,
		endGrossSalary2: `${ptTax?.length ? ptTax[1]?.endGrossSalary : null}`,
		startGrossSalary3: `${ptTax?.length ? ptTax[2]?.startGrossSalary : null}`,
		professionalTax1: `${ptTax?.length ? ptTax[0]?.tax : null}`,
		professionalTax2: `${ptTax?.length ? ptTax[1]?.tax : null}`,
		professionalTax3: `${ptTax?.length ? ptTax[2]?.tax : null}`,
	};
	const handleSubmit = async (values: any) => {
		setLoading(true);
		try {
			const res = await change(
				`payrolls/updatePayrollConfig/${data?.length && data[0]?.id}`,
				{
					method: "PATCH",
					body: {
						basicSalary: Number(values?.basicSalary),
						hra: Number(values?.hra),
						pfEmployee: Number(values?.employeePf),
						pfEmployer: Number(values?.employerPf),
						esiEmployee: Number(values?.employeeEsi),
						esiEmployer: Number(values?.employerEsi),
						conveyanceAllowances: Number(values?.conveyance),
						medicalAllowances: Number(values?.medical),
						variant: Number(values?.variant),
						ptTaxes: [
							{
								startGrossSalary: Number(values?.startGrossSalary1),
								endGrossSalary: Number(values?.endGrossSalary1),
								tax: Number(values?.professionalTax1),
							},
							{
								startGrossSalary: Number(values?.startGrossSalary2),
								endGrossSalary: Number(values?.endGrossSalary2),
								tax: Number(values?.professionalTax2),
							},
							{
								startGrossSalary: Number(values?.startGrossSalary3),
								tax: Number(values?.professionalTax3),
							},
						],
					},
				}
			);
			setLoading(false);
			if (res?.status !== 200) {
				Swal.fire("Error", res?.results?.msg || "Unable to Update", "error");
				setLoading(false);
				return;
			}
			Swal.fire(`Success`, `Updated Successfully !`, `success`);
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
					<div className="md:w-[50rem] w-[72vw] md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-4">
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
									<Form>
										{/* <h1 className="text-lg uppercase md:text-xl lg:text-2xl text-theme flex justify-center font-extrabold py-2">
											Payroll Configuration
										</h1> */}
										{/* <div className="flex justify-end">
										<Button variant="outlined" startIcon={<Add />}>
											Add New Field
										</Button>
									</div> */}
										<div className="grid lg:grid-cols-2">
											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="md:py-2 py-1">
													<InputLabel htmlFor="basicSalary">
														Basic Salary %{" "}
														<span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<TextField
													fullWidth
													size="small"
													id="basicSalary"
													type="number"
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
													type="number"
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
													type="number"
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
													type="number"
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
													type="number"
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
													type="number"
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
													<InputLabel htmlFor="conveyance">
														Conveyance allowances
														<span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													type="number"
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
														<span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													type="number"
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

											{/* Profession tax range */}

											<div className="flex gap-2 md:px-4 px-2 md:py-2 py-1 col-span-2 justify-evenly">
												<div>
													<p className="text-center text-gray-500">
														Gross Salary
														<span className="text-red-600">*</span>
													</p>
													<div className="flex gap-2 mb-2">
														<TextField
															size="small"
															fullWidth
															type="number"
															placeholder="From"
															id="startGrossSalary1"
															name="startGrossSalary1"
															value={values.startGrossSalary1}
															onChange={handleChange}
															onBlur={handleBlur}
															error={
																touched.startGrossSalary1 &&
																!!errors.startGrossSalary1
															}
															helperText={
																touched.startGrossSalary1 &&
																errors.startGrossSalary1
															}
														/>
														<TextField
															size="small"
															fullWidth
															type="number"
															placeholder="TO"
															id="endGrossSalary1"
															name="endGrossSalary1"
															value={values.endGrossSalary1}
															onChange={handleChange}
															onBlur={handleBlur}
															error={
																touched.endGrossSalary1 &&
																!!errors.endGrossSalary1
															}
															helperText={
																touched.endGrossSalary1 &&
																errors.endGrossSalary1
															}
														/>
													</div>
													<div className="flex gap-2 mb-2">
														<TextField
															size="small"
															fullWidth
															type="number"
															placeholder="From"
															id="startGrossSalary2"
															name="startGrossSalary2"
															value={values.startGrossSalary2}
															onChange={handleChange}
															onBlur={handleBlur}
															error={
																touched.startGrossSalary2 &&
																!!errors.startGrossSalary2
															}
															helperText={
																touched.startGrossSalary2 &&
																errors.startGrossSalary2
															}
														/>
														<TextField
															size="small"
															fullWidth
															type="number"
															placeholder="TO"
															id="endGrossSalary2"
															name="endGrossSalary2"
															value={values.endGrossSalary2}
															onChange={handleChange}
															onBlur={handleBlur}
															error={
																touched.endGrossSalary2 &&
																!!errors.endGrossSalary2
															}
															helperText={
																touched.endGrossSalary2 &&
																errors.endGrossSalary2
															}
														/>
													</div>
													<div className="flex gap-2">
														<TextField
															size="small"
															fullWidth
															type="number"
															placeholder="Above last range"
															id="startGrossSalary3"
															name="startGrossSalary3"
															value={values.startGrossSalary3}
															onChange={handleChange}
															onBlur={handleBlur}
															error={
																touched.startGrossSalary3 &&
																!!errors.startGrossSalary3
															}
															helperText={
																touched.startGrossSalary3 &&
																errors.startGrossSalary3
															}
														/>
													</div>
												</div>
												<div>
													<p className="text-center text-gray-500">
														Professional Tax
														<span className="text-red-600">*</span>
													</p>
													<div className="mb-2">
														<TextField
															size="small"
															fullWidth
															type="number"
															placeholder="Tax Amount"
															id="professionalTax1"
															name="professionalTax1"
															value={values.professionalTax1}
															onChange={handleChange}
															onBlur={handleBlur}
															error={
																touched.professionalTax1 &&
																!!errors.professionalTax1
															}
															helperText={
																touched.professionalTax1 &&
																errors.professionalTax1
															}
														/>
													</div>
													<div className="mb-2">
														<TextField
															size="small"
															fullWidth
															type="number"
															placeholder="Tax Amount"
															id="professionalTax2"
															name="professionalTax2"
															value={values.professionalTax2}
															onChange={handleChange}
															onBlur={handleBlur}
															error={
																touched.professionalTax2 &&
																!!errors.professionalTax2
															}
															helperText={
																touched.professionalTax2 &&
																errors.professionalTax2
															}
														/>
													</div>
													<div>
														<TextField
															size="small"
															fullWidth
															type="number"
															placeholder="Tax Amount"
															id="professionalTax3"
															name="professionalTax3"
															value={values.professionalTax3}
															onChange={handleChange}
															onBlur={handleBlur}
															error={
																touched.professionalTax3 &&
																!!errors.professionalTax3
															}
															helperText={
																touched.professionalTax3 &&
																errors.professionalTax3
															}
														/>
													</div>
												</div>
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
														<BorderColor />
													)
												}
											>
												Update
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
	{ id: 1, value: "A_Positive", name: "A_Positive" },
	{ id: 1, value: "A_Negative", name: "A_Negative" },
	{ id: 1, value: "B_Positive", name: "B_Positive" },
	{ id: 1, value: "B_Negative", name: "B_Negative" },
	{ id: 1, value: "AB_Positive", name: "AB_Positive" },
	{ id: 1, value: "AB_Negative", name: "AB_Negative" },
	{ id: 1, value: "O_Positive", name: "O_Positive" },
	{ id: 1, value: "O_Negative", name: "O_Negative" },
];
const genders = [
	{ id: 1, value: "Male" },
	{ id: 2, value: "Female" },
];
