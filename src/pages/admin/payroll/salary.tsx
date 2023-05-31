import { Container, Typography } from "@mui/material";
// import { AdminAutocomplete } from 'components/core'
import { Form, Formik, FormikProps } from "formik";
// import TextInput from 'components/core/TextInput'
// import DrugInputField from './DrugInputField'
// import { useGET, useMutation } from 'hooks'
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
import DrugInputField from "./DrugInputField";
import AdminAutocomplete from "components/core/AdminAutocomplete";
import { useFetch } from "hooks";

const AddPrescription = () => {
	const router = useRouter();

	const { data: usersData } = useFetch<any>(`users`);

	// const { data: singleUser, mutate: userGet } = useGET<any[]>(
	//   `prescription/get-pet-details?userId=${userdata?._id}`
	// )
	// console.log(singleUser)

	const AddPrescriptionSchema = useMemo(() => {
		return [
			{
				key: "1",
				name: "ownerName",
				label: "Owner Name *",
				placeholder: "",
				styleContact: "rounded-lg mb-5",
				type: "autocomplete",
				validationSchema: Yup.string().required("Owner name is required"),
				initialValue: "",
				icon: <BorderColor />,

				options: usersData?.map((item: any, i: any) => {
					return {
						data: item,
						label: `${item?.name} (${item?.email})`,
						value: item?._id,
						key: item?.name,
					};
				}),
				required: true,
			},
			{
				key: "1",
				// placeholder: 'Enter your email',
				name: "email",
				label: "Email *",
				placeholder: "",
				styleContact: "rounded-lg mb-5",
				type: "text",
				validationSchema: Yup.string()
					.required("Email Required.")
					.email("Enter valid email"),
				initialValue: "",
				icon: <Email />,
				required: true,
			},
			{
				key: "2",
				// placeholder: 'Enter your email',
				name: "phoneNumber",
				label: "Contact Number *",
				placeholder: "",
				styleContact: "rounded-lg mb-5",
				type: "number",
				validationSchema: Yup.string().required("Contact number is required"),
				initialValue: "",
				icon: <ContactPhone />,
				required: true,
			},

			{
				key: "4",
				label: "Pet Name",
				name: "petName",
				type: "autocomplete",
				validationSchema: Yup.string().required("Pet Name is required"),
				initialValue: "",
				icon: <BorderColor />,
				styleContact: "rounded-lg mb-5",

				options: usersData?.map((item: any, i: any) => {
					return {
						label: `${item?.pet?.petName} (${item?.pet?.petCategory})`,
						value: item?.pet?._id,
						key: item?.pet?._id,
					};
				}),
				required: true,
			},
			{
				key: "4",
				// placeholder: 'Enter your email',
				name: "drugName",
				label: "Drug Name *",
				placeholder: "",
				styleContact: "rounded-lg mb-5",
				type: "text",
				validationSchema: Yup.array().required("Item Name is required"),
				initialValue: [{ value: "", amount: "", key: "1" }],
				icon: <MedicationLiquid />,
				required: true,
			},
		];
	}, []);

	// const { isMutating, trigger } = useMutation(`prescription/create`)
	const handleSend = async (values: any, submitProps: any) => {
		console.log(values);

		const petDetails = usersData?.find(
			(petDetail: any) => petDetail?.pet?._id === values?.petName
		);
		console.log(petDetails);

		const drugData = values.drugName.map((item: any) => {
			return {
				drugName: `${item.value}`,
				prescriptionNote: `${item.amount}`,
			};
		});

		const newObject: any = {
			wholeData: drugData,
			userName: usersData?.name,
			appointmentId: petDetails?._id,
			petName: petDetails?.pet?.petName,
			petId: petDetails?.pet?._id,
			userId: usersData?._id,
			petCategory: petDetails?.pet?.petCategory,
			userMail: usersData?.email,
		};
		console.log(newObject);

		try {
			// const { error, success } = await trigger(newObject);
			// if (error) return Swal.fire("Error", error.message, "error");

			// const addPrescription = {
			// 	...success?.data,
			// };
			// setUserdata('')
			// submitProps.resetForm();
			// Swal.fire("Success", success.message, "success");
			// router.push("/admin/prescription/prescription-history");
			// console.log(addPrescription);
			// console.log(values);

			return;
		} catch (error) {
			submitProps.setSubmitting(false);
			Swal.fire("Error", "Something went wrong", "error");
			console.log(error);
		}
	};
	const initialValues = AddPrescriptionSchema.reduce(
		(accumulator, currentValue) => {
			accumulator[currentValue.name] = currentValue.initialValue;
			return accumulator;
		},
		{} as any
	);
	const validationSchema = AddPrescriptionSchema?.reduce(
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
		} catch (error) {}
	};

	const handleFormikOnChange = (
		formik: FormikProps<any>,
		amount: any,
		value: any,
		key: string
	) => {
		try {
			formik?.setFieldValue(
				"drugName",
				formik?.values?.drugName?.map((item: any) => {
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
		} catch (error) {}
	};

	return (
		<Container
			maxWidth="xl"
			// style={{
			//   width: '40vw',
			//   marginTop: '5vh',
			// }}
		>
			<Typography
				align="center"
				// color="text.primary"
				variant="h5"
				className="!mt-2 font-bold text-theme"
				sx={{ marginBottom: 3 }}
			>
				{/* Create User */}
			</Typography>

			<div className="m-auto w-[50vw]">
				<Formik
					enableReinitialize
					initialValues={{
						...initialValues,
						email: usersData?.email,
						phoneNumber: usersData?.phoneNumber,
						ownerName: usersData?._id,
					}}
					validationSchema={Yup.object(validationSchema)}
					onSubmit={handleSend}
				>
					{(formik) => (
						<Form>
							{AddPrescriptionSchema?.map((inputItem: any, index: any) => (
								<div key={index}>
									{inputItem?.type === "autocomplete" ? (
										<div className=" w-full pb-4">
											<AdminAutocomplete
												size={"medium"}
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
												onChange={(e, value) => {
													console.log(value?.value, inputItem?.name);
													formik?.setFieldValue(inputItem?.name, value?.value);
													inputItem?.name === "ownerName";
													// &&
													// setUserdata(value?.data);
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
									) : inputItem?.name === "drugName" ? (
										<div className=" w-full py-4">
											{formik.values[inputItem.name]?.length &&
												formik?.values[inputItem.name]?.map((item: any) => {
													return (
														<DrugInputField
															name="item"
															error={Boolean(
																formik?.touched?.drugName &&
																	formik?.errors?.drugName
															)}
															helperText={"This field is required."}
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
										<div className={"py-4"}>
											<TextInput
												fullWidth
												key={index}
												name={inputItem?.name}
												options={inputItem.options}
												title={inputItem?.label}
												multiline={inputItem?.multiline}
												rows={inputItem?.rows}
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
								<div className="mt-2 mb-2">
									<LoadingButton
										className="btn-background !bg-primary"
										variant="contained"
										type="submit"
										fullWidth
										disabled={formik.isSubmitting || !formik.isValid}
										loading={formik.isSubmitting}
										loadingPosition="start"
										startIcon={<Done />}
									>
										Submit
									</LoadingButton>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</Container>
	);
};

export default AddPrescription;
