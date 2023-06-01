import { Button, CircularProgress } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { Add, BorderColor, Done } from "@mui/icons-material";
import * as Yup from "yup";
import TextInput from "components/core/TextInput";
import AdminAutocomplete from "components/core/AdminAutocomplete";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { AdminBreadcrumbs } from "components/core";
import { AddMoreField } from "components/dialogues";
import PayrollInputField from "./PayrollInputField";

const AddPrescription = () => {
	const [fields, setFields] = useState<any>([]);
	const [loading, setLoading] = useState(false);
	const { change } = useChange();
	const [salaryInfoModal, setSalaryInfoModal] = useState<boolean>(false);

	const { data: usersData, isLoading } = useFetch<any>(`users`);
	const payrollSchema = useMemo(() => {
		return [
			{
				key: "1",
				name: "userId",
				size: "small",
				label: "Select Employee",
				placeholder: "",
				styleContact: "rounded-lg mb-5",
				type: "autocomplete",
				validationSchema: Yup.string().required("Employee is required"),
				initialValue: "",
				icon: <BorderColor />,

				options: usersData?.map((item: any, i: any) => {
					return {
						data: item,
						label: `${item?.name}`,
						value: item?.id,
						key: item?.name,
					};
				}),
				required: true,
			},
			{
				key: "1",
				// placeholder: 'Enter your email',
				name: "grossSalary",
				label: "Enter Gross Salary Per Month",
				placeholder: "",
				size: "small",
				styleContact: "rounded-lg mb-5",
				type: "number",
				validationSchema: Yup.string().required(
					"Gross Salary Per Month Required."
				),
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
		console.log(values?.salaryInfoNewFields);
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
			const res = await change(`users/addSalaryInfo/${values?.userId}`, {
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
			//  router?.push("/admin/guests/all-guests");
			Swal.fire(`Success`, `You have successfully added!`, `success`);
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
	return (
		<PanelLayout title="Add Salary Info - Admin Panel">
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
					<div className="md:w-[40rem] w-full bg-white md:px-4 py-4 px-2 tracking-wide rounded-lg shadow-xl">
						<p className="text-center text-xl font-bold text-theme tracking-wide">
							ADD SALARY INFO
						</p>
						<div className="">
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
												{inputItem?.type === "autocomplete" ? (
													<div className=" w-full pb-4">
														<AdminAutocomplete
															size={"small"}
															label={inputItem?.label}
															isOptionEqualToValue={(option, value) =>
																option?.value === value?.value
															}
															error={Boolean(
																formik?.touched[inputItem?.name] &&
																	formik?.errors[inputItem?.name]
															)}
															helperText={
																formik?.touched[inputItem?.name] &&
																(formik?.errors[inputItem?.name] as any)
															}
															onChange={(e: any, value: any) => {
																console.log(value?.data?.id, inputItem?.name);
																formik?.setFieldValue(
																	inputItem?.name,
																	value?.data?.id
																);
																inputItem?.name === "userId";
															}}
															options={inputItem?.options}
															noOptionText={
																<div className="flex w-full flex-col gap-2">
																	<small className="tracking-wide">
																		No options found
																	</small>
																</div>
															}
														/>
													</div>
												) : inputItem?.name === "salaryInfoNewFields" ? (
													<div className=" w-full py-1">
														{formik.values[inputItem.name]?.length &&
															formik?.values[inputItem.name]?.map(
																(item: any) => {
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
																}
															)}

														<button
															onClick={() =>
																handleClick(inputItem?.name, formik)
															}
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
