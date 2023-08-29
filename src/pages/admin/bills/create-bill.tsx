import { Check, Delete } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
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
import { Field, FieldArray, Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import dynamic from "next/dynamic";
import router from "next/router";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { Branch, Client, Quotation } from "types";
import * as Yup from "yup";

interface InputField {
	description?: string;
	sac?: number;
	amount?: number;
}
interface FormValues {
	inputFields?: InputField[];
	quotationId?: string;
	clientEmail?: string;
	clientAddress?: string;
	quotationTitle?: string;
	dueDate?: Date;
	billType?: string;
	clientGSTNumber?: string;
	text?: string;
	invoiceNumber?: string;
	invoiceDate?: Date;
	branchId?: string;
}
const CreateBills = () => {
	const [isPaidId, setIsPaidId] = useState("");
	const [isAdvanceId, setIsAdvanceId] = useState("");
	const [isQuotationId, setIsQuotationId] = useState("");
	const [isClientName, setIsClientName] = useState("");
	const [isClientEmail, setIsClientEmail] = useState("");
	const [isClientAddress, setIsClientAddress] = useState("");
	const [isCgst, setIsCgst] = useState(true);
	const [isSgst, setIsSgst] = useState(true);
	const [isGstValue, setIsGstValue] = useState(false);
	const [fields, setFields] = useState([]);
	const [loading, setLoading] = useState(false);
	const ReactQuill = dynamic(import("react-quill"), { ssr: false });
	const { change } = useChange();
	const [salaryInfoModal, setSalaryInfoModal] = useState<boolean>(false);
	const [isBillType, setIsBillType] = useState<string>("");
	const [editDetails, setEditDetails] = useState<boolean>(false);
	const [isEmdValue, setIsEmdValue] = useState(false);
	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsGstValue(event.target.value === "IGST");
		setIsCgst(event.target.value !== "IGST");
		setIsSgst(event.target.value !== "IGST");
	};
	const initialValues = {
		billType: "",
		inputFields: [{ description: "", sac: "", amount: 0 }],
		quotationId: "",
		clientEmail: ``,
		clientAddress: ``,
		invoiceNumber: "",
		invoiceDate: "",
		dueDate: null,
		clientGSTNumber: "",
		text: "",
		branchId: "",
	};
	const validationSchema = Yup.object().shape({
		billType: Yup.string().required("Bill type is required!"),
		branchId: Yup.string().required("Branch is required!"),
		invoiceDate: Yup.string().required("invoice date is required!"),
		inputFields: Yup.array().of(
			Yup.object()
				.shape({
					description: Yup.string().required("Description is required"),
					sac: Yup.mixed().required("SAC code is required"),
					amount: Yup.mixed().required("Amount is required"),
				})
				.nullable()
		),
	});
	const { data: clients } = useFetch<Client[]>(`clients`);
	const { data: quotation } = useFetch<Quotation[]>(`quotations`);
	const { data: branch } = useFetch<Branch[]>(`branches`);
	const handleSubmit = async (values: any) => {
		setLoading(true);
		try {
			const transformedArray = values?.inputFields.map(
				(item: any, index: number) => {
					const timestamp = Date.now() + index; // Add the index to make the timestamp unique
					const id = (timestamp % 100000).toString().padStart(6, "0"); // Limit to 6 digits
					const description = item.description;
					const SACcode = item.sac;
					const Amount = Number(item.amount);
					return { id, description, SACcode, Amount };
				}
			);
			if (isBillType === "Unpaid") {
				if (!values?.dueDate) {
					Swal.fire(`info`, `Due date is required!`, `info`);
					return;
				}
				if (!isQuotationId) {
					Swal.fire(`info`, `Client address is required!`, `info`);
					return;
				}

				if (isCgst) {
					const resData = await change(`bills`, {
						body: {
							billType: values?.billType,
							quotationId: isQuotationId,
							clientName: isClientName,
							billOfBranchId: values?.branchId,
							clientEmail: isClientEmail,
							dueDate: new Date(values?.dueDate).toISOString(),
							clientAddress: isClientAddress,
							quotationTitle: values?.quotationTitle,
							isCgst: isCgst,
							isSgst: isSgst,
							works: transformedArray,
							invoiceDate: values?.invoiceDate,
						},
					});
					setLoading(false);
					if (resData?.status !== 200) {
						Swal.fire(
							"Error",
							resData?.results?.msg || "Unable to Submit",
							"error"
						);
						setLoading(false);
						return;
					}
					router?.push("/admin/bills/all-bills");
					Swal.fire(`Success`, `Bill created successfully!`, `success`);
					return;
				}
				const res = await change(`bills`, {
					body: {
						billType: values?.billType,
						quotationId: isQuotationId,
						billOfBranchId: values?.branchId,
						clientEmail: isClientEmail,
						clientName: isClientName,
						dueDate: new Date(values?.dueDate).toISOString(),
						clientAddress: values?.clientAddress,
						quotationTitle: values?.quotationTitle,
						isIgst: isGstValue,
						works: transformedArray,
						invoiceDate: values?.invoiceDate,
					},
				});
				setLoading(false);
				if (res?.status !== 200) {
					Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
					setLoading(false);
					return;
				}
				router?.push("/admin/bills/all-bills");

				Swal.fire(`Success`, `Bill created successfully!`, `success`);
				return;
			}
			if (isBillType === "Paid") {
				if (!values?.clientGSTNumber) {
					Swal.fire(`info`, `GST Number is required!`, `info`);
					return;
				}
				if (!values?.text) {
					Swal.fire(`info`, `Terms and condition is required!`, `info`);
					return;
				}
				if (!values?.clientAddress) {
					Swal.fire(`info`, `Client address is required!`, `info`);
					return;
				}
				if (!isPaidId) {
					Swal.fire(`info`, `Client name is required!`, `info`);
					return;
				}
				if (isCgst) {
					const resData = await change(`bills`, {
						body: {
							billType: values?.billType,
							quotationId: isPaidId,
							// dueDate: null,
							billOfBranchId: values?.branchId,
							clientEmail: isClientEmail,
							clientName: isClientName,
							clientAddress: values?.clientAddress,
							works: transformedArray,
							termsAndConditions: values?.text,
							clientGstNumber: values?.clientGSTNumber,
							invoiceDate: values?.invoiceDate,
							isCgst: isCgst,
							isSgst: isSgst,
						},
					});
					setLoading(false);
					if (resData?.status !== 200) {
						Swal.fire(
							"Error",
							resData?.results?.msg || "Unable to Submit",
							"error"
						);
						setLoading(false);
						return;
					}
					router?.push("/admin/bills/all-bills");

					Swal.fire(`Success`, `Bill created successfully!`, `success`);
					return;
				}
				const res = await change(`bills`, {
					body: {
						billType: values?.billType,
						quotationId: isPaidId,
						// dueDate: null,
						billOfBranchId: values?.branchId,
						clientName: isClientName,
						clientEmail: isClientEmail,
						clientAddress: values?.clientAddress,
						works: transformedArray,
						termsAndConditions: values?.text,
						isIgst: isGstValue,
						clientGstNumber: values?.clientGSTNumber,
						invoiceDate: values?.invoiceDate,
					},
				});
				setLoading(false);
				if (res?.status !== 200) {
					Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
					setLoading(false);
					return;
				}
				router?.push("/admin/bills/all-bills");

				Swal.fire(`Success`, `Bill created successfully!`, `success`);
				return;
			}
			if (isBillType === "Advance") {
				if (!values?.clientAddress) {
					Swal.fire(`info`, `Client address is required!`, `info`);
					return;
				}
				if (!isAdvanceId) {
					Swal.fire(`info`, `Client name is required!`, `info`);
					return;
				}
				if (isCgst) {
					const resData = await change(`bills`, {
						body: {
							billType: values?.billType,
							quotationId: isAdvanceId,
							dueDate: null,
							billOfBranchId: values?.branchId,
							clientName: isClientName,
							clientEmail: isClientEmail,
							clientAddress: values?.clientAddress,
							works: transformedArray,
							invoiceDate: values?.invoiceDate,
							isCgst: isCgst,
							isSgst: isSgst,
						},
					});
					setLoading(false);
					if (resData?.status !== 200) {
						Swal.fire(
							"Error",
							resData?.results?.msg || "Unable to Submit",
							"error"
						);
						setLoading(false);
						return;
					}
					router?.push("/admin/bills/all-bills");
					Swal.fire(`Success`, `Bill created successfully!`, `success`);
					return;
				}
				const res = await change(`bills`, {
					body: {
						billType: values?.billType,
						dueDate: null,
						billOfBranchId: values?.branchId,
						quotationId: isAdvanceId,
						clientEmail: isClientEmail,
						clientName: isClientName,
						clientAddress: values?.clientAddress,
						works: transformedArray,
						invoiceDate: values?.invoiceDate,
						isIgst: isGstValue,
					},
				});
				setLoading(false);
				if (res?.status !== 200) {
					Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
					setLoading(false);
					return;
				}
				router?.push("/admin/bills/all-bills");
				Swal.fire(`Success`, `Bill created successfully!`, `success`);
				return;
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
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
					<div className="md:w-[60rem] w-full bg-white md:px-4 py-4 tracking-wide rounded-lg shadow-xl">
						<p className="text-center text-2xl font-bold text-theme tracking-wide">
							Create Bill
						</p>
						<div className="w-full my-6 py-6 lg:px-20">
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
									<Form>
										<div className="lg:px-4 px-2 py-2">
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
													setFieldValue("billType", r?.value);
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
										<div className="lg:px-4 px-2 py-2">
											<div className="py-2">
												<InputLabel htmlFor="branchId">
													Select Branch
													<span className="text-red-600">*</span>
												</InputLabel>
											</div>

											<Autocomplete
												fullWidth
												size="small"
												id="branchId"
												options={branch || []}
												onChange={(e: any, r: any) => {
													setFieldValue("branchId", r?.id);
												}}
												getOptionLabel={(option: any) => option.name}
												renderInput={(params) => (
													<TextField
														{...params}
														label="Branch"
														// placeholder="Selected Gender"
														onBlur={handleBlur}
														error={touched.branchId && !!errors.branchId}
														helperText={touched.branchId && errors.branchId}
													/>
												)}
											/>
										</div>

										{isBillType === "Unpaid" ? (
											<div className="grid">
												<div className="md:px-4 px-2 md:py-2 py-1">
													<div className="md:py-2 py-1">
														<InputLabel htmlFor="quotationId">
															Choose Client{" "}
															<span className="text-red-600">*</span>
														</InputLabel>
													</div>

													<Autocomplete
														fullWidth
														size="small"
														id="quotationId"
														options={quotation || []}
														onChange={(e: any, r: any) => {
															setFieldValue("quotationId", r?.id);
															setIsQuotationId(r?.id);
															setIsClientName(r?.clientName);
															setIsClientEmail(r?.clientEmail);
															setIsClientAddress(r?.clientAddress);
														}}
														getOptionLabel={(option: any) => option.clientName}
														renderInput={(params) => (
															<TextField
																{...params}
																label="Client Name"
																// placeholder="Selected Gender"
																onBlur={handleBlur}
																error={
																	touched.quotationId && !!errors.quotationId
																}
																helperText={
																	touched.quotationId && errors.quotationId
																}
															/>
														)}
													/>
												</div>
												<div className="grid md:grid-cols-2">
													<div className="md:px-4 px-2 md:py-2 py-1">
														<div className="md:py-2 py-1">
															<InputLabel htmlFor="clientEmail">
																Client Email{" "}
															</InputLabel>
														</div>
														<TextField
															fullWidth
															size="small"
															id="clientEmail"
															disabled
															// placeholder="clientEmail"
															name="clientEmail"
															value={isClientEmail}
															onChange={handleChange}
															onBlur={handleBlur}
															error={
																touched.clientEmail && !!errors.clientEmail
															}
															helperText={
																touched.clientEmail && errors.clientEmail
															}
														/>
													</div>
													<div className="md:px-4 px-2 md:py-2 py-1">
														<div className="md:py-2 py-1">
															<InputLabel htmlFor="clientAddress">
																Client Address{" "}
															</InputLabel>
														</div>
														<TextField
															fullWidth
															size="small"
															disabled
															multiline
															maxRows={4}
															id="clientAddress"
															// placeholder="clientAddress"
															name="clientAddress"
															value={isClientAddress}
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
													/>
												</div>
											</div>
										) : isBillType === "Paid" ? (
											<div className="grid">
												<div className="md:px-4 px-2 md:py-2 py-1">
													<div className="md:py-2 py-1">
														<InputLabel htmlFor="quotationId">
															Choose Client{" "}
															<span className="text-red-600">*</span>
														</InputLabel>
													</div>

													<Autocomplete
														fullWidth
														size="small"
														id="quotationId"
														options={
															clients?.filter((item) => !item?.isBlocked) || []
														}
														onChange={(e: any, r: any) => {
															setFieldValue("quotationId", r?.id);
															setIsPaidId(r?.id);
															setIsClientName(r?.name);
															setIsClientEmail(r?.email);
															setIsClientAddress(r?.address);
														}}
														getOptionLabel={(option: any) => option.name}
														renderInput={(params) => (
															<TextField
																{...params}
																label="Client Name"
																// placeholder="Selected Gender"
																onBlur={handleBlur}
																error={
																	touched.quotationId && !!errors.quotationId
																}
																helperText={
																	touched.quotationId && errors.quotationId
																}
															/>
														)}
													/>
												</div>
												<div className="grid md:grid-cols-2">
													<div className="md:px-4 px-2 md:py-2 py-1">
														<div className="md:py-2 py-1">
															<InputLabel htmlFor="clientEmail">
																Client Email{" "}
																<span className="text-red-600">*</span>
															</InputLabel>
														</div>
														<TextField
															fullWidth
															size="small"
															id="clientEmail"
															disabled
															// placeholder="clientEmail"
															name="clientEmail"
															value={isClientEmail}
															onChange={handleChange}
															onBlur={handleBlur}
															error={
																touched.clientEmail && !!errors.clientEmail
															}
															helperText={
																touched.clientEmail && errors.clientEmail
															}
														/>
													</div>
													<div className="md:px-4 px-2 md:py-2 py-1">
														<div className="md:py-2 py-1">
															<InputLabel htmlFor="clientAddress">
																Client Address{" "}
																<span className="text-red-600">*</span>
															</InputLabel>
														</div>
														<TextField
															fullWidth
															size="small"
															id="clientAddress"
															multiline
															maxRows={4}
															// placeholder="clientAddress"
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
															touched.clientGSTNumber && errors.clientGSTNumber
														}
													/>
												</div>
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

												<div className="my-3 mb-12 text-gray-500 px-4">
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
										) : isBillType === "Advance" ? (
											<div className="grid">
												<div className="md:px-4 px-2 md:py-2 py-1">
													<div className="md:py-2 py-1">
														<InputLabel htmlFor="quotationId">
															Choose Client{" "}
															<span className="text-red-600">*</span>
														</InputLabel>
													</div>
													<Autocomplete
														fullWidth
														size="small"
														id="quotationId"
														options={
															clients?.filter((item) => !item?.isBlocked) || []
														}
														onChange={(e: any, r: any) => {
															setIsAdvanceId(r?.id);
															setIsClientName(r?.name);
															setFieldValue("quotationId", r?.id);
															setIsClientEmail(r?.email);
															setIsClientAddress(r?.address);
														}}
														getOptionLabel={(option: any) => option.name}
														renderInput={(params) => (
															<TextField
																{...params}
																label="Client Name"
																// placeholder="Selected Gender"
																onBlur={handleBlur}
																error={
																	touched.quotationId && !!errors.quotationId
																}
																helperText={
																	touched.quotationId && errors.quotationId
																}
															/>
														)}
													/>
												</div>
												<div className="grid md:grid-cols-2">
													<div className="md:px-4 px-2 md:py-2 py-1">
														<div className="md:py-2 py-1">
															<InputLabel htmlFor="clientEmail">
																Client Email{" "}
																<span className="text-red-600">*</span>
															</InputLabel>
														</div>
														<TextField
															fullWidth
															size="small"
															id="clientEmail"
															disabled
															// placeholder="clientEmail"
															name="clientEmail"
															value={isClientEmail}
															onChange={handleChange}
															onBlur={handleBlur}
															error={
																touched.clientEmail && !!errors.clientEmail
															}
															helperText={
																touched.clientEmail && errors.clientEmail
															}
														/>
													</div>
													<div className="md:px-4 px-2 md:py-2 py-1">
														<div className="md:py-2 py-1">
															<InputLabel htmlFor="clientAddress">
																Client Address{" "}
																<span className="text-red-600">*</span>
															</InputLabel>
														</div>
														<TextField
															fullWidth
															size="small"
															id="clientAddress"
															multiline
															maxRows={4}
															// placeholder="clientAddress"
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
												</div>
											</div>
										) : null}
										<FieldArray name="inputFields">
											{({ remove, push }) => (
												<div className="lg:px-4 px-2 py-2 grid gap-2 w-full">
													{values.inputFields.map((field, index) => (
														<div
															className="grid lg:grid-cols-4 gap-2 items-center"
															key={index}
														>
															<Field
																as={TextField}
																label="Description"
																fullWidth
																size="small"
																name={`inputFields[${index}].description`}
																onBlur={handleBlur}
																error={
																	touched.inputFields?.[index]?.description &&
																	!!(errors.inputFields?.[index] as InputField)
																		?.description
																}
																helperText={
																	touched.inputFields?.[index]?.description &&
																	(errors.inputFields?.[index] as InputField)
																		?.description
																}
															/>
															<Field
																as={TextField}
																name={`inputFields[${index}].sac`}
																label="SAC Code"
																fullWidth
																size="small"
																onBlur={handleBlur}
																error={
																	touched.inputFields?.[index]?.sac &&
																	!!(errors.inputFields?.[index] as InputField)
																		?.sac
																}
																helperText={
																	touched.inputFields?.[index]?.sac &&
																	(errors.inputFields?.[index] as InputField)
																		?.sac
																}
															/>
															<Field
																as={TextField}
																name={`inputFields[${index}].amount`}
																label="Amount"
																type="number"
																fullWidth
																size="small"
																onBlur={handleBlur}
																error={
																	touched.inputFields?.[index]?.amount &&
																	!!(errors.inputFields?.[index] as InputField)
																		?.amount
																}
																helperText={
																	touched.inputFields?.[index]?.amount &&
																	(errors.inputFields?.[index] as InputField)
																		?.amount
																}
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
															push({ description: "", sac: "", amount: "" })
														}
													>
														Add Field
													</button>
												</div>
											)}
										</FieldArray>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="md:py-2 py-1">
												<InputLabel htmlFor="invoiceDate">
													Invoice Date <span className="text-red-600">*</span>
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
												error={touched.invoiceDate && !!errors.invoiceDate}
												helperText={touched.invoiceDate && errors.invoiceDate}
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
												CREATE
											</Button>
										</div>
									</Form>
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

const Bill_Type = [
	{
		id: 1,
		name: "Unpaid Bill",
		value: "Unpaid",
	},
	{
		id: 2,
		name: "Advanced Bill",
		value: "Advance",
	},
	{
		id: 3,
		name: "Paid Bill",
		value: "Paid",
	},
];
//  Unpaid or Advance or Paid
