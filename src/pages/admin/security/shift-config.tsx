import { Settings } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	CircularProgress,
	InputLabel,
	TextField,
} from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { Form, Formik, FormikHelpers } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { SHIFT } from "types";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
	shiftOfBranchId: Yup.string().required("Required!"),
	type: Yup.string().required("Required !"),
	startTime: Yup.string().required("Required !"),
	endTime: Yup.string().required("Required !"),
});

const ShiftConfig = () => {
	const router = useRouter();
	const { data: branchData } = useFetch<any>(`branches`);
	const { change } = useChange();
	const [loading, setLoading] = useState(false);

	const initialValues = {
		shiftOfBranchId: "",
		type: "",
		startTime: "",
		endTime: "",
	};
	const handleSubmit = async (
		values: SHIFT,
		{ resetForm }: FormikHelpers<SHIFT>
	) => {
		setLoading(true);
		try {
			const res = await change(`security/shift`, {
				method: "POST",
				body: {
					type: values?.type,
					startTime: values?.startTime,
					endTime: values?.endTime,
					branchId: values?.shiftOfBranchId,
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
			router.push("/admin/security/all-shifts");
			Swal.fire(`Success`, `Created Successfully !`, `success`);
			resetForm();
			return;
		} catch (error) {
			console.log(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<PanelLayout title="Shift configure ">
			<section className="lg:px-8 px-2 lg:py-4 py-2">
				<div className="px-2 lg:px-0">
					<AdminBreadcrumbs links={links} />
				</div>
				<section className="w-full px-0 lg:py-8 py-2 flex justify-center items-center">
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
										Shift Configuration
									</h1>

									<div className="grid lg:grid-cols-1">
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="shiftOfBranchId">
													Branch <span className="text-red-600">*</span>
												</InputLabel>
											</div>

											<Autocomplete
												fullWidth
												size="small"
												id="shiftOfBranchId"
												options={branchData || []}
												onChange={(e: any, r: any) => {
													setFieldValue("shiftOfBranchId", r?.id);
												}}
												getOptionLabel={(option: any) => option.name}
												renderInput={(params) => (
													<TextField
														{...params}
														// label="Role"
														placeholder="Branch"
														onBlur={handleBlur}
														error={
															touched.shiftOfBranchId &&
															!!errors.shiftOfBranchId
														}
														helperText={
															touched.shiftOfBranchId && errors.shiftOfBranchId
														}
													/>
												)}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="type">
													Shift <span className="text-red-600">*</span>
												</InputLabel>
											</div>

											<Autocomplete
												fullWidth
												size="small"
												id="shift"
												options={Shift_Type || []}
												onChange={(e: any, r: any) => {
													setFieldValue("type", r?.value);
												}}
												getOptionLabel={(option: any) => option.name}
												renderInput={(params) => (
													<TextField
														{...params}
														// label="Role"
														placeholder="type"
														onBlur={handleBlur}
														error={touched.type && !!errors.type}
														helperText={touched.type && errors.type}
													/>
												)}
											/>
										</div>
										<div className="lg:px-4 px-2 lg:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="startTime">
													Start Time <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												type="time"
												// placeholder="% for startTime"
												id="startTime"
												name="startTime"
												value={values.startTime}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.startTime && !!errors.startTime}
												helperText={
													Boolean(touched.startTime) &&
													(errors.startTime as string)
												}
											/>
										</div>
										<div className="lg:px-4 px-2 lg:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="endTime">
													End Time <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												type="time"
												// placeholder="% for PF"
												id="endTime"
												name="endTime"
												value={values.endTime}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.endTime && !!errors.endTime}
												helperText={
													Boolean(touched.endTime) && (errors.endTime as string)
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
											SET CONFIGURE
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

export default ShiftConfig;

const links = [
	// { id: 1, page: "Payroll", link: "/admin/payroll" },
	{ id: 2, page: "Shift Configure", link: "/admin/security/shift-config" },
];

const Shift_Type = [
	{
		id: 1,
		name: "First Shift",
		value: "FirstShift",
	},
	{
		id: 2,
		name: "Second Shift",
		value: "SecondShift",
	},
	{
		id: 3,
		name: "Night Shift",
		value: "NightShift",
	},
];
