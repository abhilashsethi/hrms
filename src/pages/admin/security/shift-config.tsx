import { Settings } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	CircularProgress,
	InputLabel,
	TextField,
} from "@mui/material";
import { GstConfigSkeleton } from "components/admin/skeleton";
import { AdminBreadcrumbs } from "components/core";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import Swal from "sweetalert2";
import { QuotationGst } from "types";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
	shift: Yup.string().required("% For GST is required !"),
	cgst: Yup.number().required("% For CGST is required !"),
	sgst: Yup.number().required("% For SGST is required !"),
});

const ShiftConfig = () => {
	const { change } = useChange();
	const [loading, setLoading] = useState(false);
	const {
		data: gstData,
		mutate,
		isLoading,
	} = useFetch<any>(`quotations/get/gst/info`);
	const initialValues = {
		shift: "",
		Cgst: gstData?.Cgst ? gstData?.Cgst : 0,
		Sgst: gstData?.Sgst ? gstData?.Sgst : 0,
	};
	const handleSubmit = async (values: any) => {
		setLoading(true);
		try {
			const res = await change(`quotations/gst-info/${gstData?.id}`, {
				method: "PATCH",
				body: {
					Igst: Number(values?.Igst),
					Cgst: Number(values?.Cgst),
					Sgst: Number(values?.Sgst),
				},
			});
			setLoading(false);
			if (res?.status !== 200) {
				Swal.fire(
					"Error",
					res?.results?.msg || "Something went wrong!",
					"error"
				);
				setLoading(false);
				return;
			}
			mutate();
			Swal.fire(
				`Success`,
				`Gst Configuration Update Successfully !`,
				`success`
			);
			return;
		} catch (error) {
			console.log(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<PanelLayout title="Shift configure - Admin Panel">
			<section className="lg:px-8 px-2 lg:py-4 py-2">
				<div className="px-2 lg:px-0">
					<AdminBreadcrumbs links={links} />
				</div>
				<section className="w-full px-0 lg:py-8 py-2 flex justify-center items-center">
					<div className="lg:p-6 p-2 lg:w-2/4 w-full rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
						{isLoading ? (
							<GstConfigSkeleton />
						) : (
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
											Shift Configuration
										</h1>

										<div className="grid lg:grid-cols-1">
											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="shift">
														Shift <span className="text-red-600">*</span>
													</InputLabel>
												</div>

												<Autocomplete
													fullWidth
													size="small"
													id="shift"
													options={Shift_Type || []}
													onChange={(e: any, r: any) => {
														setFieldValue("shift", r?.id);
													}}
													getOptionLabel={(option: any) => option.name}
													renderInput={(params) => (
														<TextField
															{...params}
															// label="Role"
															placeholder="Shift"
															onBlur={handleBlur}
															error={touched.shift && !!errors.shift}
															helperText={touched.shift && errors.shift}
														/>
													)}
												/>
											</div>
											<div className="lg:px-4 px-2 lg:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="Cgst">
														Start Date and Time{" "}
														<span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													type="date"
													// placeholder="% for cgst"
													id="Cgst"
													name="Cgst"
													value={values.Cgst}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.Cgst && !!errors.Cgst}
													helperText={
														Boolean(touched.Cgst) && (errors.Cgst as string)
													}
												/>
											</div>
											<div className="lg:px-4 px-2 lg:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="Sgst">
														End Date and Time{" "}
														<span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													type="date"
													// placeholder="% for PF"
													id="Sgst"
													name="Sgst"
													value={values.Sgst}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.Sgst && !!errors.Sgst}
													helperText={
														Boolean(touched.Sgst) && (errors.Sgst as string)
													}
												/>
											</div>
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
												UPDATE CONFIGURE
											</Button>
										</div>
									</Form>
								)}
							</Formik>
						)}
					</div>
				</section>
			</section>
		</PanelLayout>
	);
};

export default ShiftConfig;

const links = [
	// { id: 1, page: "Payroll", link: "/admin/payroll" },
	{ id: 2, page: "Gst Configure", link: "/admin/quotation/gst-config" },
];

const Shift_Type = [
	{
		id: 1,
		name: "First Shift",
		value: "first",
	},
	{
		id: 2,
		name: "Second Shift",
		value: "second",
	},
	{
		id: 3,
		name: "Night Shift",
		value: "night",
	},
];
