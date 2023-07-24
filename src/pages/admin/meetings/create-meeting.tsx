import { Add, Check, Delete } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	CircularProgress,
	InputLabel,
	TextField,
} from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { Field, FieldArray, Form, Formik } from "formik";
import { useAuth, useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { Client } from "types";
import { uploadFile } from "utils";
import * as Yup from "yup";
// import PayrollInputField from "./PayrollInputField";

interface FormValues {
	inputFields: InputField[];
	clientName: string;
	clientEmail: string;
	clientAddress: string;
	quotationTitle: string;
	text: string;
	branchId: string;
}
interface InputField {
	docTitle: string;
	doc: any;
}

interface Props {
	handleNext: () => void;
}

interface FormValues {
	inputFields: InputField[];
}
const CreateMeeting = () => {
	const { user } = useAuth();
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
		meetingTitle: "",
		meetingPurpose: "",
		meetingDate: "",
		meetingStartTime: "",
		meetingEndTime: "",
		meetingPersonName: "",
		clientName: "",
		status: "",
		docs: "",
		clientPhone: "",
		clientEmail: "",
		address: "",
		lat: "",
		lon: "",
		meetingNotes: "",
		inputFields: [{ docTitle: "", doc: null }],
	};
	const validationSchema = Yup.object().shape({
		meetingTitle: Yup.string().required("Meeting Title is required!"),
		meetingDate: Yup.string().required("Meeting Date is required!"),
		meetingStartTime: Yup.string().required("Meeting StartTime is required!"),
		meetingPersonName: Yup.string().required(
			"Meeting Person Name is required!"
		),
		clientName: Yup.string().required("Client Name is required!"),
		status: Yup.string().required("Meeting Status is required!"),
	});

	const { data: clients } = useFetch<Client[]>(`clients`);

	const handleSubmit = async (values: any) => {
		console.log(values);
		setLoading(true);
		try {
			const res = await change(`meetings`, {
				body: {
					title: values?.meetingTitle,
					purpose: values?.meetingPurpose,
					meetingDate: new Date(values?.meetingDate)?.toISOString(),
					meetingStartTime: values?.meetingStartTime,
					meetingEndTime: values?.meetingEndTime,
					meetingPersonName: values?.meetingPersonName,
					clientName: values?.clientName,
					clientPhone: values?.clientPhone?.toString(),
					clientEmail: values?.clientEmail,
					address: values?.address,
					lat: Number(values?.lat),
					lng: Number(values?.lon),
					userId: user?.id,
				},
			});

			setLoading(false);
			if (res?.status !== 201) {
				Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
				setLoading(false);
				return;
			}
			Swal.fire(`Success`, `Meeting created successfully!`, `success`);
			return;
		} catch (error) {
			console.log(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};
	return (
		<PanelLayout title="Create Quotation - Admin Panel">
			<section className="md:px-8 px-2 md:py-4 py-2">
				<div className="px-2 md:px-0">
					<AdminBreadcrumbs links={links} />
				</div>
				<section className="w-full px-0 md:py-4 py-2 flex justify-center items-center">
					<div className="md:w-[60rem] w-full bg-white md:px-4 py-4 px-2 tracking-wide rounded-lg shadow-xl">
						<p className="text-center text-2xl font-bold text-theme tracking-wide">
							Create Meeting
						</p>
						<div className="w-full my-6 py-6 px-20">
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
										<div className="grid lg:grid-cols-2">
											{/* {console.log(touched)} */}
											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="md:py-2 py-1">
													<InputLabel htmlFor="meetingTitle">
														Meeting Title{" "}
														<span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<TextField
													fullWidth
													size="small"
													id="meetingTitle"
													// placeholder="meetingTitle"
													name="meetingTitle"
													value={values.meetingTitle}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.meetingTitle && !!errors.meetingTitle}
													helperText={
														touched.meetingTitle && errors.meetingTitle
													}
												/>
											</div>

											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="meetingPurpose">
														Meeting Purpose{" "}
													</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													// placeholder="Client Address"
													id="meetingPurpose"
													name="meetingPurpose"
													value={values.meetingPurpose}
													onChange={handleChange}
													onBlur={handleBlur}
													error={
														touched.meetingPurpose && !!errors.meetingPurpose
													}
													helperText={
														touched.meetingPurpose && errors.meetingPurpose
													}
												/>
											</div>
											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="meetingDate">
														Meeting Date <span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													type="date"
													// placeholder="Client Address"
													id="meetingDate"
													name="meetingDate"
													value={values.meetingDate}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.meetingDate && !!errors.meetingDate}
													helperText={touched.meetingDate && errors.meetingDate}
												/>
											</div>

											<div className="px-4 py-2">
												<div className="py-2">
													<InputLabel htmlFor="meetingStartTime">
														Meeting Start Time
													</InputLabel>
												</div>

												<TextField
													size="small"
													fullWidth
													type="time"
													// placeholder="Client Address"
													id="meetingStartTime"
													name="meetingStartTime"
													value={values.meetingStartTime}
													onChange={handleChange}
													onBlur={handleBlur}
													error={
														touched.meetingStartTime &&
														!!errors.meetingStartTime
													}
													helperText={
														touched.meetingStartTime && errors.meetingStartTime
													}
												/>
											</div>
											<div className="px-4 py-2">
												<div className="py-2">
													<InputLabel htmlFor="meetingEndTime">
														Meeting End Time
													</InputLabel>
												</div>

												<TextField
													size="small"
													fullWidth
													type="time"
													// placeholder="Client Address"
													id="meetingEndTime"
													name="meetingEndTime"
													value={values.meetingEndTime}
													onChange={handleChange}
													onBlur={handleBlur}
													error={
														touched.meetingEndTime && !!errors.meetingEndTime
													}
													helperText={
														touched.meetingEndTime && errors.meetingEndTime
													}
												/>
											</div>

											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="meetingPersonName">
														Meeting Person Name{" "}
														<span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													// placeholder="Quotation Title"
													id="meetingPersonName"
													name="meetingPersonName"
													value={values.meetingPersonName}
													onChange={handleChange}
													onBlur={handleBlur}
													error={
														touched.meetingPersonName &&
														!!errors.meetingPersonName
													}
													helperText={
														touched.meetingPersonName &&
														errors.meetingPersonName
													}
												/>
											</div>
											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="clientName">
														Client Name <span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<Autocomplete
													fullWidth
													size="small"
													id="clientName"
													options={clients || []}
													onChange={(e: any, r: any) => {
														setFieldValue("clientName", r?.name);
														setIsBillType(r?.value);
													}}
													getOptionLabel={(option: any) => option.name}
													renderInput={(params) => (
														<TextField
															{...params}
															label="Select Client Name"
															// placeholder="Selected Gender"
															onBlur={handleBlur}
															error={touched.clientName && !!errors.clientName}
															helperText={
																touched.clientName && errors.clientName
															}
														/>
													)}
												/>
											</div>
											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="status">
														Meeting Status{" "}
														<span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<Autocomplete
													fullWidth
													size="small"
													id="status"
													options={Status_Type || []}
													onChange={(e, r) => {
														setFieldValue("status", r?.id);
													}}
													getOptionLabel={(option: any) => option.name}
													renderInput={(params) => (
														<TextField
															{...params}
															// label="Role"
															placeholder="status"
															onBlur={handleBlur}
															error={touched.status && !!errors.status}
															helperText={touched.status && errors.status}
														/>
													)}
												/>
											</div>

											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="clientPhone">
														Client Phone
													</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													type="number"
													// placeholder="Client clientPhone"
													id="clientPhone"
													name="clientPhone"
													value={values.clientPhone}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.clientPhone && !!errors.clientPhone}
													helperText={touched.clientPhone && errors.clientPhone}
												/>
											</div>
											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="clientEmail">
														Client Email
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
													<InputLabel htmlFor="address">Address</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													// placeholder="Client Address"
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
													<InputLabel htmlFor="lat">Latitude</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													// placeholder="Client Address"
													id="lat"
													name="lat"
													value={values.lat}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.lat && !!errors.lat}
													helperText={touched.lat && errors.lat}
												/>
											</div>
											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="lon">Longitude</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													// placeholder="Client Address"
													id="lon"
													name="lon"
													value={values.lon}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.lon && !!errors.lon}
													helperText={touched.lon && errors.lon}
												/>
											</div>
										</div>
										{/* <FieldArray name="inputFields">
											{({ remove, push }) => (
												<div>
													{values.inputFields.map((field, index) => (
														<div key={index} className="my-2">
															<div className="px-8 py-4 w-full grid gap-2 border-2 border-theme">
																<h1 className="">Document Title </h1>
																<Field
																	as={TextField}
																	fullWidth
																	size="small"
																	type="text"
																	onBlur={handleBlur}
																	name={`inputFields[${index}].docTitle`}
																	error={
																		touched.inputFields?.[index]?.docTitle &&
																		!!(
																			errors.inputFields?.[index] as InputField
																		)?.docTitle
																	}
																	helperText={
																		touched.inputFields?.[index]?.docTitle &&
																		(errors.inputFields?.[index] as InputField)
																			?.docTitle
																	}
																/>
																<h1 className="">Upload file </h1>
																<Field
																	as={TextField}
																	fullWidth
																	size="small"
																	type="file"
																	name={`inputFields[${index}].doc`}
																	onBlur={handleBlur}
																	error={
																		touched.inputFields?.[index]?.doc &&
																		!!(
																			errors.inputFields?.[index] as InputField
																		)?.doc
																	}
																	helperText={
																		touched.inputFields?.[index]?.doc &&
																		(errors.inputFields?.[index] as InputField)
																			?.doc
																	}
																/>
																<div className="flex justify-end w-full">
																	<Button
																		type="button"
																		variant="contained"
																		startIcon={<Delete />}
																		className="!bg-red-600"
																		onClick={() => remove(index)}
																	>
																		Remove
																	</Button>
																</div>
															</div>
														</div>
													))}
													<Button
														type="button"
														variant="contained"
														startIcon={<Add />}
														className="!bg-blue-600"
														onClick={() => push({ docTitle: "", doc: null })}
													>
														ADD MORE FIELD
													</Button>
												</div>
											)}
										</FieldArray> */}

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

export default CreateMeeting;
const links = [
	// { id: 1, page: "Payroll", link: "/admin/payroll" },
	{
		id: 2,
		page: "Create Quotation",
		link: "/admin/quotation/create-quotation",
	},
];
const Status_Type = [
	{
		id: 1,
		name: "Completed",
		value: "completed",
	},
	{
		id: 2,
		name: "Pending",
		value: "pending",
	},
];