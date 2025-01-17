import { useTheme } from "@material-ui/core";
import { Upload } from "@mui/icons-material";
import { Button, CircularProgress, TextField } from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import PanelLayout from "layouts/panel";
import router from "next/router";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
interface FormValues {
	files: File | null;
}
const initialValues = {
	files: null,
};

const validationSchema = Yup.object().shape({
	files: Yup.string().required("CSV file is required"),
});

const UploadEmployeeData = () => {
	const theme = useTheme();
	const [isFile, setIsFile] = useState<File | null | undefined>(null);
	const [loading, setLoading] = useState(false);
	const { change, isChanging } = useChange();
	const handleSubmit = async (values: FormValues) => {
		try {
			setLoading(true);
			const formData = new FormData();
			if (values.files) {
				formData.append("files", values.files);
			}

			const res = await change(`users/upload`, {
				isFormData: true,
				body: formData,
			});
			setLoading(false);
			console.log(res);
			if (res?.status !== 201) {
				Swal.fire("Error", res?.results?.msg || "Unable to Submit", "info");
				setLoading(false);
				return;
			}
			console.log(res);
			router?.push("/admin/employees/all-employees");
			Swal.fire(
				`Success!`,
				`${res?.results?.msg || `Employee Created Successfully`}`,
				`success`
			);
			return;
		} catch (error) {
			if (error instanceof Error) {
				Swal.fire(`Error`, error?.message, `error`);
			} else {
				Swal.fire(`Error`, "Something Went Wrong", `error`);
			}
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<PanelLayout title="Create Employee ">
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
									<TextField
										type="file"
										name="files"
										size="small"
										fullWidth
										placeholder="Choose CSV Document"
										inputProps={{ accept: ".csv" }}
										//   value={values?.files}
										onChange={(e: ChangeEvent<HTMLInputElement>) => {
											const file = e?.target?.files?.[0];
											setFieldValue("files", file);
											setIsFile(file);
										}}
										onBlur={handleBlur}
										error={touched.files && !!errors.files}
										helperText={touched.files && errors.files}
									/>

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
	{
		id: 2,
		page: "Upload Employee's Data",
		link: "/admin/employees/upload-employee-data",
	},
];
