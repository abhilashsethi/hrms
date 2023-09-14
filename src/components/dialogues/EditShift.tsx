import { Check, Close } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	InputLabel,
	TextField,
	Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { SHIFT } from "types";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: () => void;
	shiftData?: SHIFT;
	mutate: () => void;
}

const validationSchema = Yup.object().shape({
	shiftOfBranchId: Yup.string().required("Required!"),
	type: Yup.string().required("Required !"),
	startTime: Yup.string().required("Required !"),
	endTime: Yup.string().required("Required !"),
});
const EditShift = ({ open, handleClose, shiftData, mutate }: Props) => {
	console.log(shiftData);
	const [loading, setLoading] = useState(false);
	const [selectedBranch, setSelectedBranch] = useState<string | undefined>("");
	const [initialValues, setInitialValue] = useState<{
		shiftOfBranchId?: string;
		type?: string;
		startTime?: string;
		endTime?: string;
	}>({
		shiftOfBranchId: "",
		type: "",
		startTime: "",
		endTime: "",
	});
	const { data: branchData } = useFetch<any>(`branches`);
	const { data: securityShift } = useFetch<SHIFT[]>(
		`security/shift?branchId=${selectedBranch}`
	);
	console.log(securityShift);

	useEffect(() => {
		if (!shiftData?._id?.$oid) return;
		setSelectedBranch(shiftData?.branchData?.id);

		setInitialValue({
			shiftOfBranchId: shiftData?.branchData?.id,
			type: shiftData?.type,
			startTime: shiftData?.startTime,
			endTime: shiftData?.endTime,
		});
	}, [shiftData]);

	console.log({ initialValues });

	const { change } = useChange();
	const handleSubmit = async (values: SHIFT) => {
		console.log(values);

		try {
			setLoading(true);
			// if (!values?.type) return;
			const res = await change(`security/shift/${shiftData?._id?.$oid}`, {
				method: "PATCH",
				body: {
					type: values?.type,
					startTime: values?.startTime,
					endTime: values?.endTime,
					branchId: values?.shiftOfBranchId,
				},
			});

			if (res?.status !== 200) throw new Error("Something went wrong");
			Swal.fire(`Success`, "Shift updated successfully!!", "success");
			mutate();
			handleClose();
			setLoading(false);

			return;
		} catch (error) {
			if (error instanceof Error) {
				Swal.fire(`Error`, error?.message, `error`);
			}
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
			<DialogTitle
				id="customized-dialog-title"
				// sx={{ p: 2, minWidth: "40rem !important" }}
			>
				<p className="text-center md:text-xl text-lg font-bold text-theme tracking-wide">
					EDIT SHIFT
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
								{/* {console.log(values)} */}
								<div className="grid lg:grid-cols-1">
									<div className="md:px-4 px-2 md:py-2 py-1">
										<p className="text-theme font-semibold my-2">
											Branch <span className="text-red-600">*</span>
										</p>
										<Autocomplete
											sx={{ width: "100%" }}
											options={branchData || []}
											autoHighlight
											getOptionLabel={(option: any) =>
												option.name ? option.name : ""
											}
											isOptionEqualToValue={(option, value) =>
												option.id === value.shiftOfBranchId
											}
											value={
												values?.shiftOfBranchId
													? branchData?.find(
															(option: any) =>
																option.id === values.shiftOfBranchId
													  )
													: {}
											}
											onChange={(e: any, r: any) => {
												setFieldValue("shiftOfBranchId", r?.id);
												setFieldValue("type", "");
												setSelectedBranch(r?.id);
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													placeholder="Select Branch"
													inputProps={{
														...params.inputProps,
													}}
												/>
											)}
										/>
									</div>
									<div className="md:px-4 px-2 md:py-2 py-1">
										<p className="text-theme font-semibold my-2">
											Shift <span className="text-red-600">*</span>
										</p>

										{securityShift?.length ? (
											<Autocomplete
												sx={{ width: "100%" }}
												options={securityShift || []}
												autoHighlight
												getOptionLabel={(option: any) =>
													option?.type ? option?.type : ""
												}
												isOptionEqualToValue={(option: any, value: any) =>
													option?.type === value?.type
												}
												value={
													values?.type
														? securityShift?.find(
																(option: any) => option?.type === values?.type
														  )
														: {}
												}
												onChange={(e: any, r: any) => {
													setFieldValue("type", r?.type);
												}}
												renderInput={(params) => (
													<TextField
														{...params}
														error={touched.type && !!errors.type}
														helperText={
															<p className="text-red-600">
																{`${errors?.type ? errors?.type : ""}`}
															</p>
														}
														placeholder="Select Shift"
														inputProps={{
															...params.inputProps,
														}}
													/>
												)}
											/>
										) : (
											<p className="text-red-500">Please Add Shift</p>
										)}
									</div>
									<div className="lg:px-4 px-2 lg:py-2 py-1">
										<div className="py-2">
											<InputLabel htmlFor="startTime">
												Start Time <span className="text-red-600">*</span>
											</InputLabel>
										</div>
										<TextField
											size="small"
											fullWidth
											type="time"
											// placeholder="% for startTime"
											id="startTime"
											name="startTime"
											value={values.startTime}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.startTime && !!errors.startTime}
											helperText={
												Boolean(touched.startTime) &&
												(errors.startTime as string)
											}
										/>
									</div>
									<div className="lg:px-4 px-2 lg:py-2 py-1">
										<div className="py-2">
											<InputLabel htmlFor="endTime">
												End Time <span className="text-red-600">*</span>
											</InputLabel>
										</div>
										<TextField
											size="small"
											fullWidth
											type="time"
											// placeholder="% for PF"
											id="endTime"
											name="endTime"
											value={values.endTime}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.endTime && !!errors.endTime}
											helperText={
												Boolean(touched.endTime) && (errors.endTime as string)
											}
										/>
									</div>
								</div>

								<div className="flex justify-center mt-4">
									<Button
										type="submit"
										className="!bg-theme"
										variant="contained"
										disabled={loading}
										startIcon={
											loading ? (
												<CircularProgress color="secondary" size={20} />
											) : (
												<Check />
											)
										}
									>
										UPDATE
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

export default EditShift;
const Shift_Type = [
	{
		id: 1,
		name: "First Shift",
		type: "FirstShift",
	},
	{
		id: 2,
		name: "Second Shift",
		type: "SecondShift",
	},
	{
		id: 3,
		name: "Night Shift",
		type: "NightShift",
	},
];
