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
import { ErrorMessage, Form, Formik } from "formik";
import { useAuth, useChange, useFetch } from "hooks";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
import { HOLIDAY } from "types";
import * as Yup from "yup";
import { useMemo } from "react";
import { SingleImageUpdateBranch, SingleImageUpload } from "components/core";
import { uploadFile } from "utils";

interface Props {
	open: boolean;
	handleClose: () => void;
	holidayData?: HOLIDAY;
	mutate: () => void;
}

const validationSchema = Yup.object().shape({
	startDate: Yup.string().required("Required!"),
	endDate: Yup.string()
		// .required("Required!")
		.test(
			"endDateAfterStartDate",
			"End date should be greater than or equal to start date",
			function (endDate) {
				const { startDate } = this.parent; // Get the value of startDate field
				if (!startDate || !endDate) return true; // If either date is not provided, skip validation
				return new Date(endDate) >= new Date(startDate);
			}
		),
	title: Yup.string().required("Required!"),
});
const EditHoliday = ({ open, handleClose, holidayData, mutate }: Props) => {
	const { user } = useAuth();
	const [loading, setLoading] = useState(false);
	const { data: branchData } = useFetch<any>(`branches`);
	const initialValues = useMemo(() => {
		return {
			holidayOfBranchId: holidayData?.branchId,
			startDate: holidayData?.startDate
				? moment(holidayData.startDate)?.format("YYYY-MM-DD")
				: "",
			endDate: holidayData?.endDate
				? moment(holidayData.endDate)?.format("YYYY-MM-DD")
				: "",
			title: holidayData?.title ? holidayData?.title : "",
			description: holidayData?.description,
			image: holidayData?.image,
		};
	}, [
		holidayData?.id,
		holidayData?.endDate,
		holidayData?.holidayOfBranchId,
		holidayData?.title,
	]);

	const { change } = useChange();
	const handleSubmit = async (values: HOLIDAY) => {
		console.log(values);
		try {
			setLoading(true);
			const uniId = values?.image?.type?.split("/")[1];
			const url =
				typeof values?.image === "object" &&
				values?.image !== null &&
				(await uploadFile(values?.image, `${Date.now()}.${uniId}`));
			const res = await change(`holidays/${holidayData?.id}`, {
				method: "PUT",
				body: {
					image: url || undefined,
					startDate: new Date(values?.startDate)?.toISOString(),
					endDate: values?.endDate
						? new Date(values?.endDate)?.toISOString()
						: new Date(values?.startDate)?.toISOString(),
					title: values?.title,
					description: values?.description,
					branchId: values?.holidayOfBranchId,
				},
			});

			if (res?.status !== 200) throw new Error("Something went wrong");
			Swal.fire(`Success`, "Holiday updated successfully!!", "success");
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
					EDIT HOLIDAY
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
												option.id === value.holidayOfBranchId
											}
											value={
												values?.holidayOfBranchId
													? branchData?.find(
															(option: any) =>
																option?.id === values?.holidayOfBranchId
													  )
													: {}
											}
											onChange={(e: any, r: any) => {
												setFieldValue("holidayOfBranchId", r?.id);
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
										<div className="py-2">
											<InputLabel htmlFor="startDate">
												Start Date <span className="text-red-600">*</span>
											</InputLabel>
										</div>
										<TextField
											size="small"
											fullWidth
											type="date"
											placeholder="Start date"
											id="startDate"
											name="startDate"
											value={values.startDate}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.startDate && !!errors.startDate}
											helperText={touched.startDate && errors.startDate}
										/>
									</div>
									<div className="md:px-4 px-2 md:py-2 py-1">
										<div className="py-2">
											<InputLabel htmlFor="endDate">End Date</InputLabel>
										</div>
										<TextField
											size="small"
											type="date"
											fullWidth
											placeholder="End date"
											id="endDate"
											name="endDate"
											value={values.endDate}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.endDate && !!errors.endDate}
											helperText={touched.endDate && errors.endDate}
										/>
									</div>
									<div className="md:px-4 px-2 md:py-2 py-1">
										<div className="py-2">
											<InputLabel htmlFor="title">
												Title <span className="text-red-600">*</span>
											</InputLabel>
										</div>
										<TextField
											size="small"
											fullWidth
											placeholder="Title"
											id="title"
											name="title"
											value={values.title}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.title && !!errors.title}
											helperText={touched.title && errors.title}
										/>
									</div>
									<div className="md:px-4 px-2 md:py-2 py-1">
										<div className="py-2">
											<InputLabel htmlFor="description">Description</InputLabel>
										</div>
										<TextField
											size="small"
											fullWidth
											placeholder="Description"
											id="description"
											name="description"
											value={values.description}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.description && !!errors.description}
											helperText={touched.description && errors.description}
										/>
									</div>
									<div className="px-2 md:py-2 py-1">
										<div className="md:py-2 py-1">
											<InputLabel htmlFor="name">
												Upload Holiday Image
											</InputLabel>
										</div>
										<SingleImageUpdateBranch
											values={values}
											setImageValue={(event: any) => {
												setFieldValue("image", event.currentTarget.files[0]);
											}}
										>
											<ErrorMessage name="image" />
										</SingleImageUpdateBranch>
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

export default EditHoliday;
