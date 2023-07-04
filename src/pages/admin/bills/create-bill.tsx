import { Check, Delete } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	Checkbox,
	CircularProgress,
	FormControlLabel,
	IconButton,
	InputLabel,
	Radio,
	RadioGroup,
	TextField,
	Tooltip,
} from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { AddMoreField, AddQuotationClientDialogue } from "components/dialogues";
import { Field, FieldArray, Formik } from "formik";
import { useChange } from "hooks";
import PanelLayout from "layouts/panel";
import { ChangeEvent, useState } from "react";
import dynamic from "next/dynamic";
import * as Yup from "yup";
// import PayrollInputField from "./PayrollInputField";

interface InputField {
	field1: string;
	field2: number;
	field3: number;
}
interface FormValues {
	inputFields: InputField[];
}

const CreateBills = () => {
	const [fields, setFields] = useState([]);
	const [loading, setLoading] = useState(false);
	const ReactQuill = dynamic(import("react-quill"), { ssr: false });
	const { change } = useChange();
	const [salaryInfoModal, setSalaryInfoModal] = useState<boolean>(false);
	const [isBillType, setIsBillType] = useState<string>("");
	const [isUnpaid, setIsUnpaid] = useState(false);
	const [editDetails, setEditDetails] = useState<boolean>(false);
	const [isEmdValue, setIsEmdValue] = useState(false);
	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsEmdValue(event.target.value === "IGST");
	};

	const initialValues = {
		billType: "",
		inputFields: [{ field1: "", field2: 0, field3: 0 }],
		quotationNumber: "",
		clientName: "",
		clientEmail: "",
		clientAddress: "",
		invoiceNumber: "",
		invoiceDate: "",
		dueDate: "",
		clientGSTNumber: "",
		text: "",
	};
	const validationSchema = Yup.object().shape({
		billType: Yup.string().required("Bill type is required!"),
		quotationNumber: Yup.string().required("Quotation Number is required!"),
		clientName: Yup.string().required("Client name is required!"),
		clientEmail: Yup.string().email().required("Client Email is required!"),
		clientAddress: Yup.string().required("Client address is required!"),
		invoiceNumber: Yup.string().required("invoice number is required!"),
		invoiceDate: Yup.string().required("invoice date is required!"),
		dueDate: Yup.string().required("Due date is required!"),
		inputFields: Yup.array().of(
			Yup.object()
				.shape({
					field1: Yup.string().required("Description is required"),
					field2: Yup.mixed().required("Qty is required"),
					field3: Yup.mixed().required("Cost is required"),
				})
				.nullable()
		),
	});

	const Bill_Type = [
		{
			id: 1,
			name: "Unpaid Bill",
			value: "unpaidBill",
		},
		{
			id: 2,
			name: "Advanced Bill",
			value: "advanceBill",
		},
		{
			id: 3,
			name: "Paid Bill",
			value: "paidBill",
		},
	];

	const Client_Name = [
		{
			id: 1,
			name: "Gaurav Kumar",
			value: "",
		},
		{
			id: 2,
			name: "Prashad",
			value: "",
		},
		{
			id: 3,
			name: "Srinu",
			value: "",
		},
	];

	const handleSubmit = (values: any) => {
		// Access the values of all input fields
		console.log("isEmdValue", isEmdValue);
		console.log(values);
	};
	return (
		<PanelLayout title="Create Bill - Admin Panel">
			<AddQuotationClientDialogue
				open={editDetails}
				handleClose={() => setEditDetails(false)}
			/>

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
					<div className="md:w-[60rem] w-full bg-white md:px-4 py-4 px-2 tracking-wide rounded-lg shadow-xl">
						<p className="text-center text-2xl font-bold text-theme tracking-wide">
							Create Bill
						</p>
						<div className="w-full my-6 py-6  px-20">
							<Formik
								initialValues={initialValues}
								onSubmit={handleSubmit}
								validationSchema={validationSchema}
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
										<div className="px-4 py-2">
											<div className="py-2">
												<InputLabel htmlFor="billType">
													Select Bill Type{" "}
													<span className="text-red-600">*</span>
												</InputLabel>
											</div>

											<Autocomplete
												fullWidth
												size="small"
												id="billType"
												options={Bill_Type || []}
												onChange={(e: any, r: any) => {
													setFieldValue("billType", r?.name);
													setIsBillType(r?.value);
												}}
												getOptionLabel={(option: any) => option.name}
												renderInput={(params) => (
													<TextField
														{...params}
														label="Bill Type"
														// placeholder="Selected Gender"
														onBlur={handleBlur}
														error={touched.billType && !!errors.billType}
														helperText={touched.billType && errors.billType}
													/>
												)}
											/>
										</div>

										{isBillType === "unpaidBill" ? (
											<div className="grid">
												<div className="md:px-4 px-2 md:py-2 py-1">
													<div className="md:py-2 py-1">
														<div className="flex justify-end">
															<div
																onClick={() => setEditDetails((prev) => !prev)}
																className="text-sm cursor-pointer bg-white text-theme hover:scale-95 transition duration-300 ease-in-out hover:bg-theme hover:text-white border border-theme rounded-lg px-2 py-1"
															>
																Enter Client Details
															</div>
														</div>
														<InputLabel htmlFor="clientName">
															Choose Client{" "}
															<span className="text-red-600">*</span>
														</InputLabel>
													</div>

													<Autocomplete
														fullWidth
														size="small"
														id="clientName"
														options={Client_Name || []}
														onChange={(e: any, r: any) => {
															setFieldValue("clientName", r?.name);
														}}
														getOptionLabel={(option: any) => option.name}
														renderInput={(params) => (
															<TextField
																{...params}
																label="Client Name"
																// placeholder="Selected Gender"
																onBlur={handleBlur}
																error={
																	touched.clientName && !!errors.clientName
																}
																helperText={
																	touched.clientName && errors.clientName
																}
															/>
														)}
													/>
												</div>

												<div className="grid grid-cols-2">
													<div className="md:px-4 px-2 md:py-2 py-1">
														<div className="md:py-2 py-1">
															<InputLabel htmlFor="invoiceDate">
																Invoice Date{" "}
																<span className="text-red-600">*</span>
															</InputLabel>
														</div>
														<TextField
															fullWidth
															size="small"
															id="invoiceDate"
															type="date"
															// placeholder="invoiceDate"
															name="invoiceDate"
															value={values.invoiceDate}
															onChange={handleChange}
															onBlur={handleBlur}
															error={
																touched.invoiceDate && !!errors.invoiceDate
															}
															helperText={
																touched.invoiceDate && errors.invoiceDate
															}
														/>
													</div>

													<div className="md:px-4 px-2 md:py-2 py-1">
														<div className="md:py-2 py-1">
															<InputLabel htmlFor="dueDate">
																Due Date <span className="text-red-600">*</span>
															</InputLabel>
														</div>
														<TextField
															fullWidth
															size="small"
															id="dueDate"
															type="date"
															// placeholder="dueDate"
															name="dueDate"
															value={values.dueDate}
															onChange={handleChange}
															onBlur={handleBlur}
															error={touched.dueDate && !!errors.dueDate}
															helperText={touched.dueDate && errors.dueDate}
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
																		label="SAC Code"
																	/>
																	<Field
																		as={TextField}
																		name={`inputFields[${index}].field3`}
																		label="Amount"
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
													<RadioGroup
														defaultValue={isEmdValue ? "IGST" : "SGST"}
														row
														name="isEmdValue"
														onChange={handleOptionChange}
													>
														<FormControlLabel
															value="IGST"
															control={<Radio />}
															label="IGST"
														/>
														<FormControlLabel
															value="SGST"
															control={<Radio />}
															label="SGST & CGST"
														/>
													</RadioGroup>
												</div>
											</div>
										) : isBillType === "paidBill" ? (
											<div className="grid">
												<div className="md:px-4 px-2 md:py-2 py-1">
													<div className="md:py-2 py-1">
														<InputLabel htmlFor="clientName">
															Choose Client{" "}
															<span className="text-red-600">*</span>
														</InputLabel>
													</div>

													<Autocomplete
														fullWidth
														size="small"
														id="clientName"
														options={Client_Name || []}
														onChange={(e: any, r: any) => {
															setFieldValue("clientName", r?.name);
														}}
														getOptionLabel={(option: any) => option.name}
														renderInput={(params) => (
															<TextField
																{...params}
																label="Client Name"
																// placeholder="Selected Gender"
																onBlur={handleBlur}
																error={
																	touched.clientName && !!errors.clientName
																}
																helperText={
																	touched.clientName && errors.clientName
																}
															/>
														)}
													/>
												</div>
												<div className="grid grid-cols-2">
													<div className="md:px-4 px-2 md:py-2 py-1">
														<div className="md:py-2 py-1">
															<InputLabel htmlFor="invoiceDate">
																Invoice Date{" "}
																<span className="text-red-600">*</span>
															</InputLabel>
														</div>
														<TextField
															fullWidth
															size="small"
															id="invoiceDate"
															type="date"
															// placeholder="invoiceDate"
															name="invoiceDate"
															value={values.invoiceDate}
															onChange={handleChange}
															onBlur={handleBlur}
															error={
																touched.invoiceDate && !!errors.invoiceDate
															}
															helperText={
																touched.invoiceDate && errors.invoiceDate
															}
														/>
													</div>
													<div className="md:px-4 px-2 md:py-2 py-1">
														<div className="md:py-2 py-1">
															<InputLabel htmlFor="clientGSTNumber">
																Client GST Number{" "}
																<span className="text-red-600">*</span>
															</InputLabel>
														</div>
														<TextField
															fullWidth
															size="small"
															id="clientGSTNumber"
															// placeholder="clientGSTNumber"
															name="clientGSTNumber"
															value={values.clientGSTNumber}
															onChange={handleChange}
															onBlur={handleBlur}
															error={
																touched.clientGSTNumber &&
																!!errors.clientGSTNumber
															}
															helperText={
																touched.clientGSTNumber &&
																errors.clientGSTNumber
															}
														/>
													</div>
												</div>

												<FieldArray name="inputFields">
													{({ remove, push }) => (
														<div className="px-4 my-2">
															{values.inputFields.map((field, index) => (
																<div
																	className="grid grid-cols-4 gap-2 items-center"
																	key={index}
																>
																	<Field
																		as={TextField}
																		label="Description"
																		fullWidth
																		size="small"
																		name={`inputFields[${index}].field1`}
																		onBlur={handleBlur}
																		// error={
																		// 	touched.inputFields?.[index]?.field1 &&
																		// 	!!(
																		// 		errors.inputFields?.[
																		// 			index
																		// 		] as InputField
																		// 	)?.field1
																		// }
																		// helperText={
																		// 	touched.inputFields?.[index]?.field1 &&
																		// 	(
																		// 		errors.inputFields?.[
																		// 			index
																		// 		] as InputField
																		// 	)?.field1
																		// }
																	/>
																	<Field
																		as={TextField}
																		name={`inputFields[${index}].field2`}
																		type="number"
																		label="SAC Code"
																		fullWidth
																		size="small"
																		onBlur={handleBlur}
																	/>
																	<Field
																		as={TextField}
																		name={`inputFields[${index}].field3`}
																		label="Amount"
																		type="number"
																		fullWidth
																		size="small"
																		onBlur={handleBlur}
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
												<div className="mt-3 text-gray-500 px-4">
													<p>
														Terms & Conditions{" "}
														<span className="text-red-600">*</span>
													</p>
													<ReactQuill
														placeholder="Terms & Conditions ..."
														theme="snow"
														value={values.text}
														onChange={(value) => setFieldValue("text", value)}
														onBlur={handleBlur("text")}
														className="lg:h-[150px] w-full bg-white"
													/>
												</div>
											</div>
										) : isBillType === "advanceBill" ? (
											<div className="grid">
												<div className="md:px-4 px-2 md:py-2 py-1">
													<div className="md:py-2 py-1">
														<InputLabel htmlFor="clientName">
															Choose Client{" "}
															<span className="text-red-600">*</span>
														</InputLabel>
													</div>

													<Autocomplete
														fullWidth
														size="small"
														id="clientName"
														options={Client_Name || []}
														onChange={(e: any, r: any) => {
															setFieldValue("clientName", r?.name);
														}}
														getOptionLabel={(option: any) => option.name}
														renderInput={(params) => (
															<TextField
																{...params}
																label="Client Name"
																// placeholder="Selected Gender"
																onBlur={handleBlur}
																error={
																	touched.clientName && !!errors.clientName
																}
																helperText={
																	touched.clientName && errors.clientName
																}
															/>
														)}
													/>
												</div>
												<div className="grid grid-cols-2">
													<div className="md:px-4 px-2 md:py-2 py-1">
														<div className="md:py-2 py-1">
															<InputLabel htmlFor="invoiceDate">
																Invoice Date{" "}
																<span className="text-red-600">*</span>
															</InputLabel>
														</div>
														<TextField
															fullWidth
															size="small"
															id="invoiceDate"
															type="date"
															// placeholder="invoiceDate"
															name="invoiceDate"
															value={values.invoiceDate}
															onChange={handleChange}
															onBlur={handleBlur}
															error={
																touched.invoiceDate && !!errors.invoiceDate
															}
															helperText={
																touched.invoiceDate && errors.invoiceDate
															}
														/>
													</div>
												</div>

												<FieldArray name="inputFields">
													{({ remove, push }) => (
														<div className="px-4 my-2">
															{values.inputFields.map((field, index) => (
																<div
																	className="grid grid-cols-4 gap-2 items-center"
																	key={index}
																>
																	<Field
																		as={TextField}
																		label="Description"
																		fullWidth
																		size="small"
																		name={`inputFields[${index}].field1`}
																		onBlur={handleBlur}
																		// error={
																		// 	touched.inputFields?.[index]?.field1 &&
																		// 	!!(
																		// 		errors.inputFields?.[
																		// 			index
																		// 		] as InputField
																		// 	)?.field1
																		// }
																		// helperText={
																		// 	touched.inputFields?.[index]?.field1 &&
																		// 	(
																		// 		errors.inputFields?.[
																		// 			index
																		// 		] as InputField
																		// 	)?.field1
																		// }
																	/>
																	<Field
																		as={TextField}
																		name={`inputFields[${index}].field2`}
																		type="number"
																		label="SAC Code"
																		fullWidth
																		size="small"
																		onBlur={handleBlur}
																	/>
																	<Field
																		as={TextField}
																		name={`inputFields[${index}].field3`}
																		label="Amount"
																		type="number"
																		fullWidth
																		size="small"
																		onBlur={handleBlur}
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
											</div>
										) : null}

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
												CREATE
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

export default CreateBills;
const links = [
	{ id: 1, page: "Bills", link: "/admin/bills" },
	{
		id: 2,
		page: "Create Bill",
		link: "/admin/bills/create-bill",
	},
];

const short = [
	{ id: 1, value: "unpaid", name: "Unpaid Bill" },
	{ id: 2, value: "advance", name: "Advance Bill" },
	{ id: 3, value: "paid", name: "Paid Bill" },
];
