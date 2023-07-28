import {
	Add,
	BorderColor,
	Check,
	Close,
	Delete,
	Done,
} from "@mui/icons-material";
import {
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
	Tooltip,
} from "@mui/material";
import PayrollInputField from "components/admin/PayrollInputField";
import TextInput from "components/core/TextInput";
import { Field, FieldArray, Form, Formik, FormikProps } from "formik";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import * as Yup from "yup";
interface Props {
	open: boolean;
	handleClose: any;
	userId?: any;
	mutate?: any;
}
interface InputField {
	payrollName?: string;

	amount?: number;
}

const AddSalaryInfo = ({ open, handleClose, userId, mutate }: Props) => {
	const [loading, setLoading] = useState(false);
	const { change } = useChange();
	const router = useRouter();

	const {
		data: employData,
		mutate: empMutate,
		isLoading,
	} = useFetch<User>(`users/${router?.query?.id}`);

	const initialValues = {
		grossSalary: "",
		kpi: 0,
		tds: 0,
		salaryInfoNewFields: null,
		inputFields: [{ payrollName: "", amount: 0 }],
	};

	const handleSend = async (values: any, submitProps: any) => {
		setLoading(true);
		try {
			const ticketText = {
				grossSalary: values?.grossSalary,
				kpi: values?.kpi,
				tds: values?.tds,
				salaryInfoNewFields: values?.salaryInfoNewFields?.map((item: any) => {
					return { title: item?.title, value: Number(item.value) };
				}),
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

	const handleClick = (name: string, formik: FormikProps<any>) => {
		try {
			formik?.setFieldValue(
				name,
				formik?.values[name]?.length > 0
					? [...formik?.values[name], { title: "", value: "" }]
					: [{ title: "", value: "" }]
			);
		} catch (error) {}
	};

	const handleFormikOnChange = (
		formik: FormikProps<any>,
		title: any,
		value: any,
		key: string
	) => {
		try {
			formik?.setFieldValue(
				"salaryInfoNewFields",
				formik?.values?.salaryInfoNewFields?.map((item: any) => {
					if (item.key === key) {
						return {
							...item,
							title,
							value,
						};
					}
					return item;
				})
			);
		} catch (error) {}
	};

	const handleSubmit = async (values: any, { resetForm }: any) => {
		console.log(values);
	};
	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			maxWidth="lg"
			open={open}
		>
			<DialogTitle
				id="customized-dialog-title"
				sx={{ p: 2, minWidth: "40rem !important" }}
			>
				<p className="text-center text-xl font-bold text-theme tracking-wide">
					ADD SALARY INFO
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
			<DialogContent className="app-scrollbar" sx={{ p: 2 }}>
				<div className="md:w-[40rem] w-[72vw] md:px-4 px-2 tracking-wide">
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

								<FieldArray name="inputFields">
									{({ remove, push }) => (
										<div className="px-4 py-2 grid gap-2 w-full">
											{values.inputFields.map((field, index) => (
												<div
													className="grid grid-cols-4 gap-2 items-center"
													key={index}
												>
													<Field
														as={TextField}
														label="Payroll Name"
														fullWidth
														size="small"
														name={`inputFields[${index}].description`}
														onBlur={handleBlur}
														error={
															touched.inputFields?.[index]?.payrollName &&
															!!(errors.inputFields?.[index] as InputField)
																?.payrollName
														}
														helperText={
															touched.inputFields?.[index]?.payrollName &&
															(errors.inputFields?.[index] as InputField)
																?.payrollName
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
			</DialogContent>
		</Dialog>
	);
};

export default AddSalaryInfo;
const variants = [
	{ id: 1, value: "FirstHalf" },
	{ id: 2, value: "SecondHalf" },
];
const types = [
	{ id: 1, value: "Casual" },
	{ id: 2, value: "Sick" },
];
