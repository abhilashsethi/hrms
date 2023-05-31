import { Close, Done } from "@mui/icons-material";
import {
	Autocomplete,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	IconButton,
	InputLabel,
	Radio,
	RadioGroup,
	TextField,
	Tooltip,
} from "@mui/material";
import { PhotoViewerSmall } from "components/core";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import { ChangeEvent, useState } from "react";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: any;
	mutate?: any;
}

const validationSchema = Yup.object().shape({
	userId: Yup.string().required("Select an employee"),
	grossSalary: Yup.number().required("% For Gross Salary is required !"),
	// variant: Yup.string().required("Please select a variant!"),
	// kpi: Yup.string().required("Please enter kpi amount!"),
});
const AddSalaryInfo = ({ open, handleClose, mutate }: Props) => {
	const initialValues = {
		userId: "",
		variant: "",
		grossSalary: "",
		kpi: "",
		tds: "",
	};
	const { change } = useChange();
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState("one");
	const { data: usersData } = useFetch(`users`);
	const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
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
							<Form>
								{/* <div className="md:px-4 px-2 md:py-2 py-1 ">
									<div className="py-2">
										<InputLabel htmlFor="chooseEmp">Choose Employee</InputLabel>
									</div>

									<Autocomplete
										options={usersData as any}
										fullWidth
										autoHighlight
										getOptionLabel={(option: any) => option.name}
										onChange={(e, r) => {
											setFieldValue("userId", r?.id);
										}}
										renderOption={(props, option) => (
											<Box
												component="li"
												sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
												{...props}
											>
												<div className="mr-2">
													<PhotoViewerSmall
														size="2rem"
														name={option.name}
														photo={option.photo}
													/>
												</div>
												{option.name}
											</Box>
										)}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Select Employee"
												onBlur={handleBlur}
												error={touched.userId && !!errors.userId}
												helperText={touched.userId && errors.userId}
												inputProps={{
													...params.inputProps,
													autoComplete: "", // disable autocomplete and autofill
												}}
											/>
										)}
									/>
								</div> */}

								<div className="md:px-4 px-2 md:py-2 py-1">
									<div className="md:py-2 py-1">
										<InputLabel htmlFor="grossSalary">
											Enter Gross Salary Per Month
											<span className="text-red-600"> *</span>
										</InputLabel>
									</div>
									<TextField
										fullWidth
										size="small"
										id="grossSalary"
										// placeholder="% for basic salary"
										name="grossSalary"
										value={values.grossSalary}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.grossSalary && !!errors.grossSalary}
										helperText={touched.grossSalary && errors.grossSalary}
									/>
								</div>

								<div className="flex justify-center pt-2">
									<RadioGroup
										row
										name="leave"
										value={value}
										onChange={(e: any) => {
											handleRadioChange(e);
											setFieldValue("variant", e.target.value);
										}}
									>
										<FormControlLabel
											value="tds"
											control={<Radio />}
											label="TDS"
										/>
										<FormControlLabel
											value="kpi"
											control={<Radio />}
											label="KPI"
										/>
									</RadioGroup>
								</div>
								{errors?.variant && (
									<h1 className="text-red-500 text-sm text-center">
										{errors?.variant}
									</h1>
								)}
								{value == "kpi" ? (
									<>
										<p className="font-medium text-gray-700 my-2">KPI</p>
										<TextField
											size="small"
											fullWidth
											// placeholder="Date"
											name="kpi"
											value={values.kpi}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.kpi && !!errors.kpi}
											helperText={touched.kpi && errors.kpi}
										/>
									</>
								) : value == "tds" ? (
									<>
										<p className="font-medium text-gray-700 my-2">TDS</p>
										<div className="w-full">
											<TextField
												size="small"
												fullWidth
												name="tds"
												// placeholder="Date"
												value={values.tds}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.tds && !!errors.tds}
												helperText={touched.tds && errors.tds}
											/>
										</div>
									</>
								) : null}

								<div className="flex justify-center md:py-4 py-2">
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
