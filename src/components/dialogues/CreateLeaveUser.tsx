import { Check, Close, PriorityHigh } from "@mui/icons-material";
import {
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	IconButton,
	MenuItem,
	Radio,
	RadioGroup,
	TextField,
	Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useAuth, useChange, useFetch } from "hooks";
import moment from "moment";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { uploadFile } from "utils";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: any;
	mutate?: any;
}

const validationSchema = Yup.object({
	startDate: Yup.string()
		.required("Please enter date")
		.test("minimum-date", "You Can apply leave only 1 day before!", (value) => {
			const currentDate = new Date();
			const selectedDate = new Date(value);
			const minDate = new Date();
			minDate.setDate(currentDate.getDate());
			return selectedDate >= minDate;
		}),
	reason: Yup.string().required("Required!"),
	type: Yup.string().required("Required!"),
});
const CreateLeaveUser = ({ open, handleClose, mutate }: Props) => {
	const initialValues = {
		type: "",
		startDate: "",
		reason: "",
		link: "",
		endDate: null,
		variant: "FullDay",
		leaveMonth: `${moment(new Date().toISOString()).format("MMMM")}`,
		leaveYear: `${moment(new Date().toISOString()).format("YYYY")}`,
	};
	const { change } = useChange();
	const { user } = useAuth();
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState("FullDay");
	const { data: leaveData } = useFetch<any>(
		`leaves/credits?userId=${user?.id}`
	);
	const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};
	const today = new Date();
	today.setDate(today.getDate() + 1); // Get the next day's date

	const handleSubmit = async (values: any, { resetForm }: any) => {
		const reqValue = Object.entries(values).reduce((acc: any, [key, value]) => {
			if (key !== "link" && value) {
				acc[key] = value;
			}
			return acc;
		}, {});
		setLoading(true);
		try {
			if (values?.link) {
				const dtype = values?.link && values?.link?.type.split("/")[1];
				const url =
					values?.link &&
					(await uploadFile(values?.link, `${Date.now()}.${dtype}`));
				const res = await change(`leaves`, {
					body: {
						...reqValue,
						userId: user?.id,
						startDate: new Date(values?.startDate).toISOString(),
						docs: [{ link: url, docType: dtype }],
					},
				});
				setLoading(false);
				if (res?.status !== 201) {
					Swal.fire(
						"Error",
						res?.results?.msg || "Something went wrong!",
						"error"
					);
					setLoading(false);
					return;
				}
				Swal.fire(`Success`, `Leave Added Successfully!`, `success`);
				mutate();
				setValue("FullDay");
				resetForm();
				handleClose();
				return;
			} else {
				const res = await change(`leaves`, {
					body: {
						...reqValue,
						userId: user?.id,
						startDate: new Date(values?.startDate).toISOString(),
					},
				});
				setLoading(false);
				if (res?.status !== 201) {
					Swal.fire(
						"Error",
						res?.results?.msg || "Something went wrong!",
						"error"
					);
					setLoading(false);
					return;
				}
				Swal.fire(`Success`, `Leave Added Successfully!`, `success`);
				mutate();
				setValue("FullDay");
				resetForm();
				handleClose();
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
		<Dialog
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			maxWidth="lg"
			open={open}
		>
			<DialogTitle id="customized-dialog-title" sx={{ p: 2 }}>
				<p className="text-center text-xl font-bold text-theme tracking-wide">
					ADD LEAVE
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
						validationSchema={validationSchema}
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
								<div className="border-2 border-dashed animate-border border-theme p-2 inline-block rounded-md mb-4">
									<PriorityHigh className="text-red-600 animate-bounce" />
									If You are applying{" "}
									<span className="font-semibold">Sick Leave</span> for next
									month then , 2 leave credits will be deduced from your credits
									.
								</div>
								<div className="flex justify-between">
									<div className="flex gap-x-4 my-2">
										<p className="font-medium text-gray-700">
											CL Credits Left -
										</p>
										<span className="bg-red-500 text-white font-semibold px-2 rounded-lg">
											{leaveData[0]?.leavesData?.casualLeaveCarryOver}
										</span>
									</div>
									<div className="flex gap-x-4 my-2">
										<p className="font-medium text-gray-700">
											SL Credits Left -
										</p>
										<span className="bg-red-500 text-white font-semibold px-2 rounded-lg">
											{leaveData[0]?.leavesData?.sickLeaveCarryOver}
										</span>
									</div>
								</div>
								<p className="font-medium text-gray-700 my-2">
									Leave Type<span className="text-red-600">*</span>
								</p>
								<div className="w-full">
									<TextField
										size="small"
										select
										fullWidth
										name="type"
										placeholder="Leave Type"
										value={values.type}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.type && !!errors.type}
										helperText={touched.type && errors.type}
									>
										{types.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.value}
											</MenuItem>
										))}
									</TextField>
								</div>
								<h1 className="mt-4">Leave Variant</h1>
								<div className="flex justify-center pt-2">
									<FormControl>
										<RadioGroup
											row
											defaultValue={value}
											name="row-radio-buttons-group"
											value={value}
											onChange={(e: any) => {
												handleRadioChange(e);
												// setFieldValue("leave", e.target.value);
												setFieldValue("variant", e.target.value);
											}}
										>
											<FormControlLabel
												value="FirstHalf"
												control={<Radio />}
												label="Half Day"
											/>
											<FormControlLabel
												value="FullDay"
												control={<Radio />}
												label="Full Day"
											/>
											<FormControlLabel
												value="MultipleDays"
												control={<Radio />}
												label="Multiple Days"
											/>
										</RadioGroup>
									</FormControl>
								</div>
								{errors?.variant && (
									<h1 className="text-red-500 text-sm text-center">
										{/* {errors?.variant} */}
										{errors?.variant}
									</h1>
								)}
								{value == "FullDay" ? (
									<>
										<p className="font-medium text-gray-700 my-2">
											Date<span className="text-red-600">*</span>
										</p>
										<TextField
											size="small"
											fullWidth
											placeholder="Date"
											inputProps={{
												min: today.toISOString().split("T")[0],
												max: "9999-12-31",
											}}
											type="date"
											name="startDate"
											value={values.startDate}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.startDate && !!errors.startDate}
											helperText={touched.startDate && errors.startDate}
										/>
									</>
								) : value == "MultipleDays" ? (
									<>
										<p className="font-medium text-gray-700 my-2">
											Start Date<span className="text-red-600">*</span>
										</p>
										<TextField
											size="small"
											fullWidth
											placeholder="Start Date"
											type="date"
											name="startDate"
											inputProps={{
												min: moment().format("YYYY-MM-DD"),
											}}
											value={values.startDate}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.startDate && !!errors.startDate}
											helperText={touched.startDate && errors.startDate}
										/>
										<p className="font-medium text-gray-700 my-2">End Date</p>
										<TextField
											size="small"
											fullWidth
											placeholder="End Date"
											type="date"
											name="endDate"
											value={
												values.endDate
													? moment(values?.endDate).format("YYYY-MM-DD")
													: ``
											}
											inputProps={{
												min: values?.startDate
													? moment(values?.startDate).format("YYYY-MM-DD")
													: moment().format("YYYY-MM-DD"),
											}}
											onChange={(e) => {
												setFieldValue(
													"endDate",
													new Date(e.target.value).toISOString()
												);
											}}
											onBlur={handleBlur}
											error={touched.endDate && !!errors.endDate}
											helperText={touched.endDate && errors.endDate}
										/>
									</>
								) : (
									<>
										<p className="font-medium text-gray-700 my-2">
											Date<span className="text-red-600">*</span>
										</p>
										<div className="w-full">
											<TextField
												size="small"
												fullWidth
												name="startDate"
												type="date"
												placeholder="Date"
												value={values.startDate}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.startDate && !!errors.startDate}
												helperText={touched.startDate && errors.startDate}
											/>
										</div>
										<p className="font-medium text-gray-700 my-2">Leave for</p>
										<div className="w-full">
											<TextField
												size="small"
												select
												fullWidth
												name="variant"
												placeholder="Select"
												value={values.variant}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.variant && !!errors.variant}
												helperText={touched.variant && errors.variant}
											>
												{variants.map((option) => (
													<MenuItem key={option.value} value={option.value}>
														{option.value}
													</MenuItem>
												))}
											</TextField>
										</div>
									</>
								)}
								<p className="font-medium text-gray-700 my-2">
									Reason<span className="text-red-600">*</span>
								</p>
								<TextField
									size="small"
									fullWidth
									multiline
									rows={4}
									placeholder="Reason"
									name="reason"
									value={values.reason}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.reason && !!errors.reason}
									helperText={touched.reason && errors.reason}
								/>
								<p className="font-medium text-gray-700 my-2">Choose File</p>
								<TextField
									size="small"
									fullWidth
									type="file"
									name="link"
									placeholder="Choose Document"
									// value={values?.link}
									onChange={(e: any) =>
										setFieldValue("link", e?.target?.files[0])
									}
								/>
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

export default CreateLeaveUser;
const variants = [
	{ id: 1, value: "FirstHalf" },
	{ id: 2, value: "SecondHalf" },
];
const types = [
	{ id: 1, value: "Casual" },
	{ id: 2, value: "Sick" },
];
