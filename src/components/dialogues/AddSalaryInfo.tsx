import { Add, BorderColor, Close, Done } from "@mui/icons-material";
import {
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Tooltip,
} from "@mui/material";
import PayrollInputField from "components/admin/PayrollInputField";
import TextInput from "components/core/TextInput";
import { Form, Formik, FormikProps } from "formik";
import { useChange, useFetch } from "hooks";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
interface Props {
	open: boolean;
	handleClose: any;
	userId?: any;
	mutate?: any;
}

const AddSalaryInfo = ({ open, handleClose, userId, mutate }: Props) => {
	const [loading, setLoading] = useState(false);
	const { change } = useChange();

	const payrollSchema = useMemo(() => {
		return [
			{
				key: "1",
				// placeholder: 'Enter your email',
				name: "grossSalary",
				label: "Enter Gross Salary Per Month *",
				placeholder: "",
				size: "small",
				styleContact: "rounded-lg mb-5",
				type: "number",
				validationSchema: Yup.number()
					.min(0, "enter positive value")
					.required("Gross Salary Per Month Required."),
				initialValue: "",
				required: true,
			},
			{
				key: "2",
				// placeholder: 'Enter your email',
				name: "kpi",
				label: "KPI",
				size: "small",
				placeholder: "",
				styleContact: "rounded-lg mb-5",
				type: "number",
				initialValue: 0,
			},

			{
				key: "4",
				label: "TDS",
				size: "small",
				name: "tds",
				type: "number",
				initialValue: 0,
				styleContact: "rounded-lg mb-5",
			},
			{
				key: "5",
				// placeholder: 'Enter your email',
				name: "salaryInfoNewFields",
				label: "Payroll Name",
				placeholder: "",
				styleContact: "rounded-lg mb-5",
				initialValue: null,
			},
		];
	}, []);

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
			console.log(ticketText);
			const res = await change(`users/addSalaryInfo/${userId}`, {
				method: "PATCH",
				body: ticketText,
			});
			console.log(res);
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
	const initialValues = payrollSchema.reduce((accumulator, currentValue) => {
		accumulator[currentValue.name] = currentValue.initialValue;
		return accumulator;
	}, {} as any);
	const validationSchema = payrollSchema?.reduce(
		(accumulator, currentValue) => {
			accumulator[currentValue.name] = currentValue.validationSchema;
			return accumulator;
		},
		{} as any
	);

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
			<DialogTitle id="customized-dialog-title" sx={{ p: 2 }}>
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
						enableReinitialize
						initialValues={{
							...initialValues,
						}}
						validationSchema={Yup.object(validationSchema)}
						onSubmit={handleSend}
					>
						{(formik) => (
							<Form>
								{payrollSchema?.map((inputItem: any, index: any) => (
									<div key={index}>
										{inputItem?.name === "salaryInfoNewFields" ? (
											<div className=" w-full py-1">
												{formik.values[inputItem.name]?.length &&
													formik?.values[inputItem.name]?.map((item: any) => {
														return (
															<PayrollInputField
																name="item"
																error={Boolean(
																	formik?.touched?.salaryInfoNewFields &&
																		formik?.errors?.salaryInfoNewFields
																)}
																value={item.value}
																title={item?.title}
																onChange={(title: any, value: any) =>
																	handleFormikOnChange(
																		formik,
																		title,
																		value,
																		item?.key
																	)
																}
															/>
														);
													})}

												<button
													onClick={() => handleClick(inputItem?.name, formik)}
													type="button"
													className="mt-5 flex items-center gap-1 rounded-md bg-theme px-4 py-2 text-sm text-white transition-all duration-300 ease-in-out hover:scale-105"
												>
													<Add className="!text-[1.3rem]" /> Add More
												</button>
											</div>
										) : (
											<div className={"py-1"}>
												<TextInput
													fullWidth
													key={index}
													name={inputItem?.name}
													options={inputItem.options}
													title={inputItem?.label}
													multiline={inputItem?.multiline}
													rows={inputItem?.rows}
													size={inputItem?.size}
													type={inputItem?.type as any}
													startIcon={inputItem?.icon}
													styleContact={inputItem?.styleContact}
													error={Boolean(
														formik?.touched[inputItem.name] &&
															formik?.errors[inputItem.name]
													)}
													helperText={
														formik?.touched[inputItem.name] &&
														(formik?.errors[inputItem.name] as any)
													}
													value={formik?.values[inputItem.name]}
													onChange={formik?.handleChange}
													onBlur={formik?.handleBlur}
												/>
											</div>
										)}
									</div>
								))}

								<div>
									<div className="flex justify-center py-1">
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
