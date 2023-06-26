import { Check, Delete } from "@mui/icons-material";
import {
	Button,
	Checkbox,
	CircularProgress,
	FormControlLabel,
	IconButton,
	InputLabel,
	TextField,
	Tooltip,
} from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { AddMoreField } from "components/dialogues";
import { Field, FieldArray, Formik } from "formik";
import { useChange } from "hooks";
import PanelLayout from "layouts/panel";
import dynamic from "next/dynamic";
import { useState } from "react";
// import PayrollInputField from "./PayrollInputField";

const CreateQuotation = () => {
	const [fields, setFields] = useState<any>([]);
	const [loading, setLoading] = useState(false);
	const { change } = useChange();
	const [salaryInfoModal, setSalaryInfoModal] = useState<boolean>(false);

	const ReactQuill = dynamic(import("react-quill"), { ssr: false });

	const initialValues = {
		inputFields: [{ field1: "", field2: "", field3: "" }],
		quotationNumber: "",
		clientName: "",
		clientAddress: "",
		quotationTitle: "",
		text: "",
	};
	// const validationSchema = Yup.object().shape({
	// 	firstName: Yup.string()
	// 		.matches(
	// 			/^[A-Za-z ]+$/,
	// 			"First name must only contain alphabetic characters"
	// 		)
	// 		.min(2, "First name must be at least 2 characters")
	// 		.max(50, "First name must be less than 50 characters")
	// 		.required("First name is required!"),
	// 	lastName: Yup.string()
	// 		.matches(
	// 			/^[A-Za-z ]+$/,
	// 			"Last name must only contain alphabetic characters"
	// 		)
	// 		.min(2, "Last name must be at least 2 characters")
	// 		.max(50, "Last name must be less than 50 characters")
	// 		.required("Last name is required!"),
	// 	phone: Yup.string()
	// 		.required("Required!")
	// 		.matches(
	// 			/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
	// 			"Phone number is not valid"
	// 		)
	// 		.min(6)
	// 		.max(15),
	// 	email: Yup.string()
	// 		.email("Invalid email address")
	// 		.required("Email is required!"),
	// 	roleId: Yup.string().required("Required!"),
	// 	departmentId: Yup.string().required("Required!"),
	// 	employeeOfBranchId: Yup.string().required("Required!"),
	// });

	const handleSubmit = (values: any) => {
		// Access the values of all input fields
		console.log(values);
	};
	return (
		<PanelLayout title="Create Quotation - Admin Panel">
			<AddMoreField
				setFields={setFields}
				open={salaryInfoModal}
				handleClose={() => setSalaryInfoModal(false)}
			/>
			<section className="md:px-8 px-2 md:py-4 py-2">
				<div className="px-2 md:px-0">
					<AdminBreadcrumbs links={links} />
				</div>
				<section className="w-full px-0 md:py-4 py-2 flex justify-center items-center">
					<div className="md:w-[70rem] w-full bg-white md:px-4 py-4 px-2 tracking-wide rounded-lg shadow-xl">
						<p className="text-center text-2xl font-bold text-theme tracking-wide">
							Create Quotation
						</p>
						<div className="w-full my-6 py-6 px-20 flex justify-center">
							<Formik
								initialValues={initialValues}
								onSubmit={handleSubmit}
								// validationSchema={validationSchema}
								enableReinitialize={true}
							>
								{({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									setFieldValue,
								}) => (
									<form onSubmit={handleSubmit}>
										<div className="grid lg:grid-cols-2">
											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="md:py-2 py-1">
													<InputLabel htmlFor="quotationNumber">
														Quotation Number{" "}
														<span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<TextField
													fullWidth
													size="small"
													id="quotationNumber"
													// placeholder="First Name"
													name="quotationNumber"
													value={values.quotationNumber}
													onChange={handleChange}
													onBlur={handleBlur}
													error={
														touched.quotationNumber && !!errors.quotationNumber
													}
													helperText={
														touched.quotationNumber && errors.quotationNumber
													}
												/>
											</div>
											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="md:py-2 py-1">
													<InputLabel htmlFor="clientName">
														Client Name <span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<TextField
													fullWidth
													size="small"
													id="clientName"
													// placeholder="clientName"
													name="clientName"
													value={values.clientName}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.clientName && !!errors.clientName}
													helperText={touched.clientName && errors.clientName}
												/>
											</div>
											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="clientAddress">
														Client Address{" "}
														<span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													// placeholder="Client Address"
													id="clientAddress"
													name="clientAddress"
													value={values.clientAddress}
													onChange={handleChange}
													onBlur={handleBlur}
													error={
														touched.clientAddress && !!errors.clientAddress
													}
													helperText={
														touched.clientAddress && errors.clientAddress
													}
												/>
											</div>

											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="quotationTitle">
														Quotation Title{" "}
														<span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													// placeholder="Quotation Title"
													id="quotationTitle"
													name="quotationTitle"
													value={values.quotationTitle}
													onChange={handleChange}
													onBlur={handleBlur}
													error={
														touched.quotationTitle && !!errors.quotationTitle
													}
													helperText={
														touched.quotationTitle && errors.quotationTitle
													}
												/>
											</div>
										</div>

										<FieldArray name="inputFields">
											{({ remove, push }) => (
												<div className="px-4">
													{values.inputFields.map((field, index) => (
														<div
															className="grid grid-cols-4 gap-2 items-center"
															key={index}
														>
															<Field
																as={TextField}
																name={`inputFields[${index}].field1`}
																label="Description"
															/>
															<Field
																as={TextField}
																name={`inputFields[${index}].field2`}
																type="number"
																label="Qty"
															/>
															<Field
																as={TextField}
																name={`inputFields[${index}].field3`}
																label="Cost"
																type="number"
															/>

															<Tooltip title="Remove Field">
																<div className="text-sm bg-red-500 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
																	<IconButton>
																		<Delete
																			onClick={() => remove(index)}
																			className="!text-white"
																		/>
																	</IconButton>
																</div>
															</Tooltip>
														</div>
													))}
													<button
														className="w-32 mt-2 bg-white text-theme hover:scale-95 transition duration-300 ease-in-out hover:bg-theme hover:text-white border border-theme rounded-lg px-2 py-1"
														type="button"
														onClick={() =>
															push({ field1: "", field2: "", field3: "" })
														}
													>
														Add Field
													</button>
												</div>
											)}
										</FieldArray>
										<div className="my-3 px-4">
											<p className="text-gray-500">
												Please choose tax option{" "}
												<span className="text-red-600">*</span>
											</p>
											<FormControlLabel control={<Checkbox />} label="GST" />
											<FormControlLabel control={<Checkbox />} label="IGST" />
										</div>
										<div className="mt-3 text-gray-500 px-4">
											<p>
												Terms & Conditions{" "}
												<span className="text-red-600">*</span>
											</p>
											<ReactQuill
												placeholder="Reply message ..."
												theme="snow"
												value={values.text}
												onChange={(value) => setFieldValue("text", value)}
												onBlur={handleBlur("text")}
												className="lg:h-[150px] w-full bg-white"
											/>
										</div>
										<div className="flex justify-center md:py-4 py-2 mt-10">
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
									</form>
								)}
							</Formik>
						</div>
					</div>
				</section>
			</section>
		</PanelLayout>
	);
};

export default CreateQuotation;
const links = [
	// { id: 1, page: "Payroll", link: "/admin/payroll" },
	{
		id: 2,
		page: "Create Quotation",
		link: "/admin/quotation/create-quotation",
	},
];
