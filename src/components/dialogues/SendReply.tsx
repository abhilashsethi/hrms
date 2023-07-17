import { Close, Send } from "@mui/icons-material";
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
import { useState } from "react";
import * as Yup from "yup";

interface Props {
	open: any;
	handleClose: any;
}

const UpdateAssets = ({ open, handleClose }: Props) => {
	const [loading, setLoading] = useState(false);

	const initialValues = {
		title: ``,
		message: ``,
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string().required("Title is required!"),
		message: Yup.string().required("Message date is required!"),
	});

	const handleSubmit = async (values: any) => {
		console.log(values);
	};

	return (
		<>
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<DialogTitle
					id="customized-dialog-title"
					sx={{ p: 2, minWidth: "38rem !important" }}
				>
					<p className="text-center text-xl font-bold text-theme tracking-wide">
						SEND REPLY
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
					<div className="md:px-4 px-2 tracking-wide">
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
									<div className="grid lg:grid-cols-1">
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="md:py-2 py-1">
												<InputLabel htmlFor="title">
													Title <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												fullWidth
												size="small"
												id="title"
												// placeholder="Name"
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
												<InputLabel htmlFor="message">
													Message <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												// placeholder="Email"
												multiline
												rows={3}
												id="message"
												name="message"
												value={values.message}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.message && !!errors.message}
												helperText={touched.message && errors.message}
											/>
										</div>
									</div>
									<div className="flex justify-center md:py-4 py-2">
										<Button
											fullWidth
											type="submit"
											variant="contained"
											className="!bg-green-500"
											disabled={loading}
											startIcon={
												loading ? <CircularProgress size={20} /> : <Send />
											}
										>
											SEND
										</Button>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default UpdateAssets;
