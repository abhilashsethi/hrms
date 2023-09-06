import { Button, CircularProgress, InputLabel, TextField } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { AdminBreadcrumbs } from "components/core";
import { Check } from "@mui/icons-material";
import PanelLayout from "layouts/panel";
import { useChange } from "hooks";
import { useState } from "react";
import { HOLIDAY } from "types";
import Swal from "sweetalert2";
import * as Yup from "yup";

const initialValues = {
	startDate: "",
	endDate: "",
	title: "",
};

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

const CreateHoliday = () => {
	// const theme = useTheme();
	const [loading, setLoading] = useState(false);
	const { change } = useChange();

	const handleSubmit = async (
		values: HOLIDAY,
		{ resetForm }: FormikHelpers<HOLIDAY>
	) => {
		setLoading(true);
		try {
			const res = await change(`holidays`, {
				body: {
					startDate: new Date(values?.startDate)?.toISOString(),
					endDate: values?.endDate
						? new Date(values?.endDate)?.toISOString()
						: undefined,
					title: values?.title,
				},
			});

			setLoading(false);
			if (res?.status !== 200) {
				Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
				setLoading(false);
				return;
			}
			Swal.fire(`Success`, `Holiday Created Successfully!`, `success`);
			resetForm();

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
		<PanelLayout title="Create Support - Admin Panel">
			<section className="md:px-8 px-2 md:py-4 py-2">
				<div className="px-2 md:px-0">
					<AdminBreadcrumbs links={links} />
				</div>
				<section className="w-full px-0 md:py-4 py-2 flex justify-center items-center">
					<div className="md:p-6 p-2 md:w-2/3 w-full rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
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
										Create Holiday
									</h1>
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
												<InputLabel htmlFor="endDate">
													End Date
													{/* <span className="text-red-600">*</span> */}
												</InputLabel>
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
									<div className="flex justify-center md:py-4 py-2">
										<Button
											type="submit"
											variant="contained"
											className="!bg-theme"
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
				</section>
			</section>
		</PanelLayout>
	);
};

export default CreateHoliday;

const links = [
	{ id: 1, page: "Create Holiday", link: "/admin/holiday/create-holiday" },
];
