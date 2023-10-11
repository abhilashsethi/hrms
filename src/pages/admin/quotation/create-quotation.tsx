import { Check, Delete } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	CircularProgress,
	FormControlLabel,
	FormHelperText,
	IconButton,
	InputLabel,
	Radio,
	RadioGroup,
	TextField,
	Tooltip,
} from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { Field, FieldArray, Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import dynamic from "next/dynamic";
import router from "next/router";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { Branch, Client } from "types";
import * as Yup from "yup";
// import PayrollInputField from "./PayrollInputField";
interface InputField {
	description?: string;
	qty?: string;
	cost?: number;
}
interface FormValues {
	inputFields: InputField[];
	clientName: string;
	clientEmail: string;
	clientAddress: string;
	quotationTitle: string;
	text: string;
	branchId: string;
}
const CreateQuotation = () => {
	const [isCgst, setIsCgst] = useState(true);
	const [isSgst, setIsSgst] = useState(true);
	const [loading, setLoading] = useState(false);
	const [isBillType, setIsBillType] = useState<string>("");
	const { change } = useChange();
	const ReactQuill = dynamic(import("react-quill"), { ssr: false });
	const [isGstValue, setIsGstValue] = useState(false);
	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsGstValue(event.target.value === "IGST");
		setIsCgst(event.target.value !== "IGST");
		setIsSgst(event.target.value !== "IGST");
	};
	const initialValues = {
		inputFields: [{ description: "", qty: "", cost: 0 }],
		clientName: "",
		clientEmail: "",
		clientAddress: "",
		quotationTitle: "",
		text: "",
		branchId: "",
		existingClient: "",
	};
	const validationSchema = Yup.object().shape({
		clientName: Yup.string().required("Client name is required!"),
		clientEmail: Yup.string()
			.email("Enter a valid email")
			.required("Client email is required!"),
		clientAddress: Yup.string().required("Client address is required!"),
		quotationTitle: Yup.string().required("Quotation title is required!"),
		branchId: Yup.string().required("Branch is required!"),
		text: Yup.string().required("Terms & conditions is required!"),
		inputFields: Yup.array().of(
			Yup.object()
				.shape({
					description: Yup.string().required("Description is required"),
					qty: Yup.number()
						.required("Qty is required")
						.positive("Qty must be a positive number"),
					cost: Yup.number()
						.required("Cost is required")
						.positive("Cost must be a positive number"),
				})
				.nullable()
		),
	});

	const { data: clients } = useFetch<Client[]>(`clients`);
	const { data: Branch } = useFetch<Branch[]>(`branches`);

	const handleSubmit = async (values: FormValues) => {
		setLoading(true);
		console.log(values);
		try {
			const transformedArray = values?.inputFields.map(
				(item, index: number) => {
					const timestamp = Date.now() + index; // Add the index to make the timestamp unique
					const id = (timestamp % 100000).toString().padStart(6, "0"); // Limit to 6 digits
					const description = item.description;
					const quantity = item.qty;
					const cost = Number(item.cost);
					return { id, description, quantity, cost };
				}
			);
			const resData = {
				clientName: values?.clientName,
				clientEmail: values?.clientEmail,
				clientAddress: values?.clientAddress,
				quotationTitle: values?.quotationTitle,
				termsAndConditions: values?.text,
				quotationBranchId: values?.branchId,
				isIgst: isGstValue,
				isCgst: isCgst,
				isSgst: isSgst,
				works: transformedArray,
			};
			console.log(resData);
			const res = await change(`quotations`, {
				body: resData,
			});
			console.log(res);
			setLoading(false);
			if (res?.status !== 200) {
				Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
				setLoading(false);
				return;
			}
			router?.push("/admin/quotation/all-quotation");
			Swal.fire(`Success`, `Quotation created successfully!`, `success`);
			return;
		} catch (error) {
			if (error instanceof Error) {
				Swal.fire(`Error`, error?.message, `error`);
			} else {
				Swal.fire(`Error`, "Something Went Wrong", `error`);
			}
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};
	return (
		<PanelLayout title="Create Quotation ">
			<section className="md:px-8 px-2 md:py-4 py-2">
				<div className="px-2 md:px-0">
					<AdminBreadcrumbs links={links} />
				</div>
				<section className="w-full px-0 md:py-4 py-2 flex justify-center items-center">
					<div className="md:w-[60rem] w-full bg-white md:px-4 py-4 px-2 tracking-wide rounded-lg shadow-xl">
						<p className="text-center text-2xl font-bold text-theme tracking-wide">
							Create Quotation
						</p>
						<div className="w-full md:my-6 py-6 md:px-20 px-2">
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
									setFieldTouched,
								}) => (
									<Form>
										<div className="grid lg:grid-cols-2 grid-cols-1">
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
													<InputLabel htmlFor="clientEmail">
														Client Email <span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													// placeholder="Client Address"
													id="clientEmail"
													name="clientEmail"
													value={values.clientEmail}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.clientEmail && !!errors.clientEmail}
													helperText={touched.clientEmail && errors.clientEmail}
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

											{/* <div className="px-4 py-2">
                        <div className="py-2">
                          <InputLabel htmlFor="existingClient">
                            Select Client Name (If Existing Client)
                          </InputLabel>
                        </div>

                        <Autocomplete
                          fullWidth
                          size="small"
                          id="existingClient"
                          options={clients || []}
                          onChange={(e: any, r: any) => {
                            setFieldValue("existingClient", r?.name);
                            setIsBillType(r?.value);
                          }}
                          getOptionLabel={(option: any) => option.name}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Client Name"
                              onBlur={handleBlur}
                              error={
                                touched.existingClient &&
                                !!errors.existingClient
                              }
                              helperText={
                                touched.existingClient && errors.existingClient
                              }
                            />
                          )}
                        />
                      </div> */}
											<div className="px-4 py-2">
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
													options={Branch || []}
													onChange={(e, r) => {
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
												<div className="px-4 py-2 grid gap-2 w-full">
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
																name={`inputFields[${index}].qty`}
																label="Numbers"
																fullWidth
																size="small"
																onBlur={handleBlur}
																error={
																	touched.inputFields?.[index]?.qty &&
																	!!(errors.inputFields?.[index] as InputField)
																		?.qty
																}
																helperText={
																	touched.inputFields?.[index]?.qty &&
																	(errors.inputFields?.[index] as InputField)
																		?.qty
																}
															/>
															<Field
																as={TextField}
																name={`inputFields[${index}].cost`}
																label="Cost"
																type="number"
																fullWidth
																size="small"
																onBlur={handleBlur}
																error={
																	touched.inputFields?.[index]?.cost &&
																	!!(errors.inputFields?.[index] as InputField)
																		?.cost
																}
																helperText={
																	touched.inputFields?.[index]?.cost &&
																	(errors.inputFields?.[index] as InputField)
																		?.cost
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
															push({ description: "", qty: "", cost: "" })
														}
													>
														Add Field
													</button>
												</div>
											)}
										</FieldArray>
										<div className="my-3 px-4">
											<p className="text-gray-500">
												Please Choose Tax Option
												<span className="text-red-600">*</span>
											</p>
											<RadioGroup
												defaultValue={isGstValue ? "IGST" : "SGST"}
												row
												name="isGstValue"
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
										<div className="mt-3 text-gray-500 lg:px-4 ">
											<p>
												Terms & Conditions{" "}
												<span className="text-red-600">*</span>
											</p>
											<ReactQuill
												id="text"
												placeholder="Terms & Conditions ..."
												theme="snow"
												value={values.text}
												onBlur={() => setFieldTouched("text", true)}
												onChange={(value) => setFieldValue("text", value)}
												className="lg:h-[150px] w-full bg-white"
											/>
											{Boolean(touched?.text && errors?.text) && (
												<FormHelperText error={true}>
													{touched?.text && errors?.text}
												</FormHelperText>
											)}
										</div>
										<div className="flex justify-center md:py-4 py-2 lg:mt-10 mt-3">
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

export default CreateQuotation;
const links = [
	// { id: 1, page: "Payroll", link: "/admin/payroll" },
	{
		id: 2,
		page: "Create Quotation",
		link: "/admin/quotation/create-quotation",
	},
];
