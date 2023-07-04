import { Settings } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { AdminBreadcrumbs, FileUpload } from "components/core";
import { ErrorMessage, Form, Formik } from "formik";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import * as Yup from "yup";
const initialValues = {
	// gst: "",
	// cgst: "",
	// sgst: "",
};

const validationSchema = Yup.object().shape({
	// gst: Yup.number().required("% For GST is required !"),
	// cgst: Yup.number().required("% For CGST is required !"),
	// sgst: Yup.number().required("% For SGST is required !"),
});

const SignatureConfig = () => {
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (values: any, { resetForm }: any) => {
		console.log(values);
	};

	return (
		<PanelLayout title="GST configure - Admin Panel">
			<section className="lg:px-8 px-2 lg:py-4 py-2">
				<div className="px-2 lg:px-0">
					<AdminBreadcrumbs links={links} />
				</div>
				<section className="w-full px-0 lg:py-4 py-2 flex justify-center items-center">
					<div className="lg:p-6 p-2 lg:w-2/4 w-full rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
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
									<h1 className="text-lg uppercase md:text-xl lg:text-2xl text-theme flex justify-center font-extrabold py-2">
										Signature Configuration
									</h1>

									<div className="grid lg:grid-cols-1">
										<FileUpload
											title="Upload Signature "
											values={values}
											setImageValue={(event: any) => {
												setFieldValue("image", event.currentTarget.files[0]);
											}}
										>
											<ErrorMessage name="image" />
										</FileUpload>
									</div>
									<div className="flex justify-center lg:py-4 py-2">
										<Button
											type="submit"
											variant="contained"
											className="!bg-theme"
											disabled={loading}
											startIcon={
												loading ? (
													<CircularProgress size={20} color="warning" />
												) : (
													<Settings />
												)
											}
										>
											CONFIGURE
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

export default SignatureConfig;

const links = [
	// { id: 1, page: "Payroll", link: "/admin/payroll" },
	{ id: 2, page: "Gst Configure", link: "/admin/quotation/gst-config" },
];
