import { Button, CircularProgress, Container, Typography } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useMemo, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import {
	Add,
	BorderColor,
	ContactPhone,
	Done,
	Email,
	MedicationLiquid,
} from "@mui/icons-material";
import * as Yup from "yup";
import { useRouter } from "next/router";
import TextInput from "components/core/TextInput";
import AdminAutocomplete from "components/core/AdminAutocomplete";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { AdminBreadcrumbs } from "components/core";
import { AddMoreField } from "components/dialogues";
import PayrollInputField from "./PayrollInputField";

const AddPrescription = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const router = useRouter();
	const [fields, setFields] = useState<any>([]);
	const [loading, setLoading] = useState(false);
	const [salaryInfoModal, setSalaryInfoModal] = useState<boolean>(false);
	const handleClose = () => {
		setAnchorEl(null);
	};
	const { data: usersData } = useFetch<any>(`users`);


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
						value: item?._id,
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
				validationSchema: Yup.string()
					.required("Gross Salary Per Month Required."), initialValue: "",
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
				initialValue: "",
			},

			{
				key: "4",
				label: "TDS",
				size: "small",
				name: "tds",
				type: "number",
				initialValue: "",
				styleContact: "rounded-lg mb-5",
			},
			{
				key: "5",
				// placeholder: 'Enter your email',
				name: "enterPayRollName",
				label: "Payroll Name *",
				placeholder: "",
				styleContact: "rounded-lg mb-5",
				type: "text",
				initialValue: [{ value: "", amount: "", key: "1" }],
			},
		];
	}, []);

	// const { isMutating, trigger } = useMutation(`prescription/create`)
	const handleSend = async (values: any, submitProps: any) => {
		console.log(values);
	};
	const initialValues = payrollSchema.reduce(
		(accumulator, currentValue) => {
			accumulator[currentValue.name] = currentValue.initialValue;
			return accumulator;
		},
		{} as any
	);
	const validationSchema = payrollSchema?.reduce(
		(accumulator, currentValue) => {
			accumulator[currentValue.name] = currentValue.validationSchema;
			return accumulator;
		},
		{} as any
	);

	const handleClick = (name: string, formik: FormikProps<any>) => {
		try {
			console.log(name);
			formik?.setFieldValue(
				name,
				formik?.values[name]?.length > 0
					? [
						...formik?.values[name],
						{ key: Date.now(), value: "", amount: "" },
					]
					: [{ key: Date.now(), value: "", amount: "" }]
			);
		} catch (error) { }
	};

	const handleFormikOnChange = (
		formik: FormikProps<any>,
		amount: any,
		value: any,
		key: string
	) => {
		try {
			formik?.setFieldValue(
				"enterPayRollName",
				formik?.values?.enterPayRollName?.map((item: any) => {
					if (item.key === key) {
						return {
							...item,
							value,
							amount,
						};
					}
					return item;
				})
			);
		} catch (error) { }
	};

	return (
		<PanelLayout title="Add Salary Info - Admin Panel" >
			<AddMoreField
				setFields={setFields}
				open={salaryInfoModal}
				handleClose={() => setSalaryInfoModal(false)}
			/>
			<section className="md:px-8 px-2 md:py-4 py-2" >
				<div className="px-2 md:px-0" >
					<AdminBreadcrumbs links={links} />
				</div>
				<section className="w-full px-0 md:py-4 py-2 flex justify-center items-center" >
					<div className="md:w-[40rem] w-full bg-white md:px-4 py-4 px-2 tracking-wide rounded-lg shadow-xl" >
						<p className="text-center text-xl font-bold text-theme tracking-wide" >
							ADD SALARY INFO
						</p>
						{/* <div className="flex justify-end" >
							<Button onClick={
								() => {
									setSalaryInfoModal((prev) => !prev);
									handleClose;
								}
							} variant="outlined" startIcon={<Add />}>
								Add New Field
							</Button>
						</div> */}
						<div className="" >
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
											<div key={index} >
												{inputItem?.type === "autocomplete" ? (
													<div className=" w-full pb-4" >
														<AdminAutocomplete
															size={"small"}

															label={inputItem?.label}
															isOptionEqualToValue={(option, value) =>
																option?.value === value?.value
															}
															error={
																Boolean(
																	formik?.touched[inputItem?.name] &&
																	formik?.errors[inputItem?.name]
																)}
															helperText={
																formik?.touched[inputItem?.name] &&
																(formik?.errors[inputItem?.name] as any)
															}
															onChange={(e: any, value: any) => {
																console.log(value?.data?.id, inputItem?.name);
																formik?.setFieldValue(inputItem?.name, value?.data?.id);
																inputItem?.name === "userId";

															}}
															options={inputItem?.options}
															noOptionText={
																<div className="flex w-full flex-col gap-2" >
																	<small className="tracking-wide" >
																		No options found
																	</small>
																</div>
															}
														/>
													</div>
												) : inputItem?.name === "enterPayRollName" ? (
													<div className=" w-full py-1">
														{formik.values[inputItem.name]?.length &&
															formik?.values[inputItem.name]?.map((item: any) => {
																return (
																	<PayrollInputField
																		name="item"
																		error={Boolean(
																			formik?.touched?.enterPayRollName &&
																			formik?.errors?.enterPayRollName
																		)}
																		value={item.value}
																		amount={item?.amount}
																		onChange={(amount: any, value: any) =>
																			handleFormikOnChange(
																				formik,
																				amount,
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
													<div className={"py-1"} >
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
															error={
																Boolean(
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