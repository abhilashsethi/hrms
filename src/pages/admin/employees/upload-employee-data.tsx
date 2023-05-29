import { useTheme } from "@material-ui/core";
import { Check, Upload } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import {
	AdminBreadcrumbs,
	EmployeeDataUpload,
	FileUpload,
} from "components/core";
import { ErrorMessage, Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import * as Yup from "yup";

const initialValues = {
	name: "",
};

const validationSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
});

const UploadEmployeeData = () => {
	const theme = useTheme();
	const [showPassword, setShowPassword] = useState(false);
	const [showConPassword, setShowConPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { data: departmentsData } = useFetch<any>(`departments`);
	const { data: roleData, isLoading, mutate } = useFetch<any>(`roles`);
	const { change, isChanging } = useChange();
	const handleSubmit = async (values: any) => {
		console.log(values);
	};

	return (
		<PanelLayout title="Create Employee - Admin Panel">
			<section className="md:px-8 px-2 md:py-4 py-2">
				<div className="px-2 md:px-0">
					<AdminBreadcrumbs links={links} />
				</div>
				<section className="w-full px-0 md:py-4 py-2 flex justify-center items-center mt-10">
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
								<Form className="w-full">
									<EmployeeDataUpload
										values={values}
										setImageValue={(event: any) => {
											setFieldValue("image", event.currentTarget.files[0]);
										}}
									>
										<ErrorMessage name="image" />
									</EmployeeDataUpload>
									<div className="flex justify-center mt-4">
										<Button
											type="submit"
											className="!bg-theme"
											variant="contained"
											disabled={loading}
											startIcon={
												loading ? <CircularProgress size={20} /> : <Upload />
											}
										>
											Upload
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

export default UploadEmployeeData;

const links = [
	{ id: 1, page: "Employees", link: "/admin/employees" },
	{
		id: 2,
		page: "Upload Employee's Data",
		link: "/admin/employees/upload-employee-data",
	},
];
