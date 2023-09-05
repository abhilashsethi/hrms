import { Check, Close } from "@mui/icons-material";
import {
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
import { useChange } from "hooks";
import moment from "moment";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { HOLIDAY } from "types";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: () => void;
	holidayData?: HOLIDAY;
	mutate: () => void;
}

const validationSchema = Yup.object().shape({
	startDate: Yup.string().required("Required!"),

	title: Yup.string().required("Required!"),
});
const EditHoliday = ({ open, handleClose, holidayData, mutate }: Props) => {
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState("one");
	const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};

	const initialValues = {
		startDate: holidayData?.startDate
			? moment(holidayData.startDate)?.format("YYYY-MM-DD")
			: "",
		endDate: holidayData?.endDate
			? moment(holidayData.endDate)?.format("YYYY-MM-DD")
			: "",
		title: holidayData?.title ? holidayData?.title : "",
	};

	const { change } = useChange();
	const handleSubmit = async (values: HOLIDAY) => {
		setLoading(true);
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You want to update status?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, update!",
			}).then(async (result) => {
				if (result.isConfirmed) {
					const res = await change(`holidays/${holidayData?.id}`, {
						method: "PUT",
						body: {
							title: values?.title,
							startDate: new Date(values?.startDate)?.toISOString(),
							endDate: values?.endDate
								? new Date(values?.endDate)?.toISOString()
								: undefined,
						},
					});
					mutate();
					// handleClose();
					handleClose();
					if (res?.status !== 200) {
						Swal.fire(`Error`, "Something went wrong!", "error");
						return;
					}
					Swal.fire(`Success`, "Holiday updated successfully!!", "success");
					return;
				}
			});
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
const leavesType = [
	{ id: 1, value: "First_Half" },
	{ id: 2, value: "Second_Half" },
];
