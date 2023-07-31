import {
	Autocomplete,
	AutocompleteChangeDetails,
	Button,
	CircularProgress,
	IconButton,
	TextField,
	Tooltip,
} from "@mui/material";
import { Field, FieldArray, Form, Formik, FormikProps } from "formik";
import { SyntheticEvent, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { Add, BorderColor, Check, Delete, Done } from "@mui/icons-material";
import * as Yup from "yup";
import TextInput from "components/core/TextInput";
import AdminAutocomplete from "components/core/AdminAutocomplete";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { AdminBreadcrumbs, LoaderAnime } from "components/core";
import { AddMoreField } from "components/dialogues";
import PayrollInputField from "./PayrollInputField";
import { User } from "types";

interface Props {
	open: boolean;
	handleClose: any;
	userId?: any;
	mutate?: any;
}
interface InputField {
	title?: string;
	value?: number;
}

const AddPrescription = ({ open, handleClose, userId, mutate }: Props) => {
	const [fields, setFields] = useState<any>([]);
	const [loading, setLoading] = useState(false);
	const { change } = useChange();
	const [salaryInfoModal, setSalaryInfoModal] = useState<boolean>(false);

	const { data: usersData, isLoading } = useFetch<any>(`users`);

	const initialValues = {
		user: "",
		grossSalary: "",
		kpi: 0,
		tds: 0,
		salaryInfoNewFields: null,
		inputFields: [{ title: "", value: 0 }],
	};
	const { data: employees } = useFetch<User[]>(`users`);

	const handleSubmit = async (values: any) => {
		setLoading(true);
		try {
			const ticketText = {
				grossSalary: values?.grossSalary,
				kpi: values?.kpi,
				tds: values?.tds,
				salaryInfoNewFields: values?.inputFields,
			};
			const res = await change(`users/addSalaryInfo/${userId}`, {
				method: "PATCH",
				body: ticketText,
			});
			setLoading(false);
			if (res?.status !== 200) {
				Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
				setLoading(false);
				return;
			}
			Swal.fire(
				`Success`,
				`Gross Salary added successfully for ${res?.results?.data?.name}`,
				`success`
			);
			mutate();
			handleClose();
			return;
		} catch (error) {
			console.log(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};
	return (
		<PanelLayout title="Add Salary Info - Admin Panel">
			<AddMoreField
				setFields={setFields}
				open={salaryInfoModal}
				handleClose={() => setSalaryInfoModal(false)}
			/>
			{/* {isLoading ? <LoaderAnime text="Loading..." /> : null} */}
			<section className="md:px-8 px-2 md:py-4 py-2">
				<div className="px-2 md:px-0">
					<AdminBreadcrumbs links={links} />
				</div>
				<section className="w-full px-0 md:py-4 py-2 flex justify-center items-center">
					<div className="md:w-[40rem] w-full bg-white md:px-4 py-4 px-2 tracking-wide rounded-lg shadow-xl">
						<p className="text-center text-xl font-bold text-theme tracking-wide">
							ADD SALARY INFO
						</p>
						<div className="">
							<Formik
								initialValues={initialValues}
								// validationSchema={validationSchema}
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
									<Form className="w-full">
										<p className="font-medium text-gray-700 mb-2">
											Select Employee <span className="text-red-600">*</span>
										</p>
										{/* <Autocomplete
											options={employees || []}
											fullWidth
											multiple
											size="small"
											getOptionLabel={(option) =>
												option.name ? option?.name : ""
											}
											onChange={(
												e: SyntheticEvent<Element, Event>,
												r: User | null
											) => setFieldValue("user", r?.id)}
											renderInput={(params) => (
												<TextField
													{...params}
													name="user"
													placeholder="Select User"
													onBlur={handleBlur}
													error={touched.user && !!errors.user}
													helperText={
														Boolean(touched.user) && (errors.user as string)
													}
												/>
											)}
										/> */}
										<Autocomplete
											options={employees || []}
											fullWidth
											multiple // This enables multiple selection
											size="small"
											getOptionLabel={(option) =>
												option.name ? option.name : ""
											}
											onChange={(
												event: React.SyntheticEvent<Element, Event>,
												value: User[] | null,
												reason: AutocompleteChangeReason,
												details?: AutocompleteChangeDetails<User> | undefined
											) => {
												// Handle the selected values here
												if (value) {
													const selectedUserIds = value.map((user) => user.id);
													setFieldValue("user", selectedUserIds);
												} else {
													setFieldValue("user", []);
												}
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													name="user"
													placeholder="Select User"
													onBlur={handleBlur}
													error={touched.user && !!errors.user}
													helperText={
														Boolean(touched.user) && (errors.user as string)
													}
												/>
											)}
										/>

										<p className="font-medium text-gray-700 mb-2">
											Enter Gross Salary <span className="text-red-600">*</span>
										</p>
										<TextField
											size="small"
											fullWidth
											type="number"
											placeholder="Gross Salary"
											name="grossSalary"
											value={values.grossSalary}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.grossSalary && !!errors.grossSalary}
											helperText={touched.grossSalary && errors.grossSalary}
										/>
										<p className="font-medium text-gray-700 my-2">
											KPI <span className="text-red-600">*</span>
										</p>
										<div className="w-full">
											<TextField
												size="small"
												type="number"
												fullWidth
												name="kpi"
												placeholder="Document kpi"
												value={values.kpi}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.kpi && !!errors.kpi}
												helperText={touched.kpi && errors.kpi}
											/>
										</div>

										<p className="font-medium text-gray-700 my-2">
											TDS <span className="text-red-600">*</span>
										</p>
										<div className="w-full">
											<TextField
												size="small"
												type="number"
												fullWidth
												name="tds"
												placeholder="Document tds"
												value={values.tds}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.tds && !!errors.tds}
												helperText={touched.tds && errors.tds}
											/>
										</div>

										<p className="font-medium text-gray-700 my-2">
											More Fields
										</p>
										<FieldArray name="inputFields">
											{({ remove, push }) => (
												<div className="grid gap-2 w-full">
													{values.inputFields.map((field, index) => (
														<div
															className="grid gap-2 items-center"
															key={index}
														>
															<Field
																as={TextField}
																label="Payroll Name"
																fullWidth
																size="small"
																name={`inputFields[${index}].title`}
																onBlur={handleBlur}
																error={
																	touched.inputFields?.[index]?.title &&
																	!!(errors.inputFields?.[index] as InputField)
																		?.title
																}
																helperText={
																	touched.inputFields?.[index]?.title &&
																	(errors.inputFields?.[index] as InputField)
																		?.title
																}
															/>

															<Field
																as={TextField}
																name={`inputFields[${index}].value`}
																label="value"
																type="number"
																fullWidth
																size="small"
																onBlur={handleBlur}
																error={
																	touched.inputFields?.[index]?.value &&
																	!!(errors.inputFields?.[index] as InputField)
																		?.value
																}
																helperText={
																	touched.inputFields?.[index]?.value &&
																	(errors.inputFields?.[index] as InputField)
																		?.value
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
															push({ description: "", sac: "", value: "" })
														}
													>
														Add Field
													</button>
												</div>
											)}
										</FieldArray>

										<div className="flex justify-center mt-4">
											<Button
												type="submit"
												className="!bg-theme"
												variant="contained"
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
					</div>
				</section>
			</section>
		</PanelLayout>
	);
};

export default AddPrescription;
const links = [
	{ id: 1, page: "Payroll", link: "/admin/payroll" },
	{ id: 2, page: "Add Salary Info", link: "/admin/payroll/add-salary-info" },
];
