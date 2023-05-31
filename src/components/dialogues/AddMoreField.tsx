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
import Swal from "sweetalert2";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: any;
	setFields?: any;
}
const initialValues = {
	label: "",
	textBox: "",
};
const validationSchema = Yup.object().shape({
	label: Yup.string().required("Label name required!"),
	textBox: Yup.string().required("Textfield name required!"),
});
const AddMoreField = ({ open, handleClose, setFields }: Props) => {

	const [loading, setLoading] = useState(false);
	const handleSubmit = async (values: any) => {
		console.log(values);
		setFields((prevFields: any) => [...prevFields, values]);
		Swal.fire(`Success`, `New Field Add Successfully`, `success`);
		handleClose();
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
					ADD NEW FIELD
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

								<p className="font-medium text-gray-700 my-2">Enter Label Name <span className="text-red-600">*</span></p>
								<TextField
									size="small"
									fullWidth
									placeholder="Enter Label Name"
									name="label"
									value={values.label}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.label && !!errors.label}
									helperText={touched.label && errors.label}
								/>
								<p className="font-medium text-gray-700 my-2">Enter Text Field Name <span className="text-red-600"> *</span></p>
								<TextField
									size="small"
									fullWidth
									placeholder="Enter Text Field Name"
									name="textBox"
									value={values.textBox}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.textBox && !!errors.textBox}
									helperText={touched.textBox && errors.textBox}
								/>

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
										ADD
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

export default AddMoreField;
const variants = [
	{ id: 1, value: "FirstHalf" },
	{ id: 2, value: "SecondHalf" },
];
const types = [
	{ id: 1, value: "Casual" },
	{ id: 2, value: "Sick" },
];
