import { Check } from "@mui/icons-material";
import { Button, CircularProgress, InputLabel, TextField } from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import * as Yup from "yup";
const initialValues = {
	name: "",
	phone: "",
	email: "",
	message: "",
};

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.matches(
			/^[A-Za-z ]+$/,
			"First name must only contain alphabetic characters"
		)
		.min(2, "First name must be at least 2 characters")
		.max(50, "First name must be less than 50 characters")
		.required("First name is required!"),

	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required!"),
	message: Yup.string().required("Required!"),
});

const CreateSupport = () => {
	// const theme = useTheme();
	const [loading, setLoading] = useState(false);
	const { change, isChanging } = useChange();
	const handleSubmit = async (values: any) => {
		console.log(values);
	};

	return (
		<PanelLayout title="Create Support - Admin Panel">
			<section className="md:px-8 px-2 md:py-4 py-2">
				<div className="px-2 md:px-0">
					<AdminBreadcrumbs links={links} />
				</div>
				<section className="w-full px-0 md:py-4 py-2 flex justify-center items-center">
					<div className="md:p-6 p-2 md:w-3/4 w-full rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
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
									<h1 className="text-lg uppercase md:text-xl lg:text-2xl text-slate-600 flex justify-center font-extrabold py-2">
										Support
									</h1>
									<div className="grid lg:grid-cols-1">
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="md:py-2 py-1">
												<InputLabel htmlFor="name">
													Name <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												fullWidth
												size="small"
												id="name"
												placeholder="Name"
												name="name"
												value={values.name}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.name && !!errors.name}
												helperText={touched.name && errors.name}
											/>
										</div>

										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="email">
													Email <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												placeholder="Email"
												id="email"
												name="email"
												value={values.email}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.email && !!errors.email}
												helperText={touched.email && errors.email}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="phone">Phone</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												placeholder="Phone"
												id="phone"
												name="phone"
												value={values.phone}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.phone && !!errors.phone}
												helperText={touched.phone && errors.phone}
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
												multiline
												rows={4}
												placeholder="Message"
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
											type="submit"
											variant="contained"
											className="!bg-theme"
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
				</section>
			</section>
		</PanelLayout>
	);
};

export default CreateSupport;

const links = [{ id: 1, page: "Support", link: "/admin/support" }];
const Status_Type = [
	{
		id: 1,
		name: "Completed",
		value: "completed",
	},
	{
		id: 2,
		name: "Pending",
		value: "pending",
	},
];
