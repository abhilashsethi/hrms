import { Check, CloudUpload } from "@mui/icons-material";
import {
	Autocomplete,
	Box,
	Button,
	CircularProgress,
	InputLabel,
	TextField,
} from "@mui/material";
import {
	AdminBreadcrumbs
} from "components/core";
import { ErrorMessage, Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRef, useState } from "react";
import * as Yup from "yup";
const initialValues = {
	assetName: "",
	modelNo: "",
	billAmount: "",
	brandName: "",
	marketPrice: "",
	serialNo: "",
	uploadDoc: "",
	images: [],
	assignedUser: "",
	assignDate: "",
	assignTime: "",
	reason: "",
	remarks: "",
};

const validationSchema = Yup.object().shape({
	assetName: Yup.string()
		.matches(
			/^[A-Za-z ]+$/,
			"Asset Name must only contain alphabetic characters"
		)
		.min(2, "Asset Name must be at least 2 characters")
		.max(50, "Asset Name must be less than 50 characters")
		.required("Asset Name is required!"),
	modelNo: Yup.string().required("Model No is required!"),

	billAmount: Yup.number().required("Bill amount is required!"),

	serialNo: Yup.string().required("Serial No. is required!"),
	images: Yup.array().min(1, "Please upload at least one image"),
	assignedUser: Yup.string().required("Assigned user is required!"),
	assignDate: Yup.string().required("Assigned Date is required!"),
	assignTime: Yup.string().required("Assigned Date is required!"),
	reason: Yup.string().required("Reason is required!"),
	remarks: Yup.string().required("Remarks is required!"),
});

const ReturnAssets = () => {
	const imageRef = useRef<HTMLInputElement | null>(null);
	const [loading, setLoading] = useState(false);
	const { data: userData } = useFetch<any>(`users`);
	const { change, isChanging } = useChange();

	const handleSubmit = async (values: any) => {
		console.log(values);
	};

	return (
		<PanelLayout title="Return Assets - Admin Panel">
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
										Assign Assets
									</h1>
									<div className="grid lg:grid-cols-2">
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="name">
													Assign User<span className="text-red-500">*</span>
												</InputLabel>
											</div>
											<Autocomplete
												fullWidth
												size="small"
												id="assignedUser"
												options={userData || []}
												getOptionLabel={(option: any) =>
													option.name ? option.name : ""
												}
												isOptionEqualToValue={(option, value) =>
													option.id === value.userId
												}
												value={
													values?.assignedUser
														? userData?.find(
															(option: any) =>
																option.id === values.assignedUser
														)
														: {}
												}
												onChange={(e: any, r: any) => {
													setFieldValue("assignedUser", r?.id);
												}}
												renderOption={(props, option) => (
													<Box
														component="li"
														sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
														{...props}
													>
														{option.name}
													</Box>
												)}
												renderInput={(params) => (
													<TextField
														{...params}
														placeholder="User Name"
														onBlur={handleBlur}
														error={
															touched.assignedUser && !!errors.assignedUser
														}
														helperText={
															touched.assignedUser && errors.assignedUser
														}
													/>
												)}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="assignDate">
													Date Of Assign <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												// placeholder="Email"
												type="date"
												id="assignDate"
												name="assignDate"
												value={values.assignDate}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.assignDate && !!errors.assignDate}
												helperText={touched.assignDate && errors.assignDate}
											/>
										</div>

										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="assignTime">
													Time Of Assign <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												// placeholder="Email"
												type="time"
												id="assignTime"
												name="assignTime"
												value={values.assignTime}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.assignTime && !!errors.assignTime}
												helperText={touched.assignTime && errors.assignTime}
											/>
										</div>

										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="reason">
													Reason
													<span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												// placeholder="Employee ID"
												id="reason"
												name="reason"
												value={values.reason}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.reason && !!errors.reason}
												helperText={touched.reason && errors.reason}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1 col-span-2">
											<div className="py-2">
												<InputLabel htmlFor="remarks">
													Remarks<span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												type="number"
												// placeholder="Phone"
												multiline
												maxRows={3}
												rows="4"
												id="remarks"
												name="remarks"
												value={values.remarks}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.remarks && !!errors.remarks}
												helperText={touched.remarks && errors.remarks}
											/>
										</div>

										<div className="col-span-2 md:px-4 px-2 md:py-2 py-1">
											<p className="text-gray-500 mb-2">
												Assigned Time Photos
												<span className="text-red-600">*</span>
											</p>
											{/* ----------------------------multiple image component------------------ */}
											<div
												onClick={() => imageRef?.current?.click()}
												className="min-h-[8rem] py-6 w-full border-[1px] border-dashed border-theme cursor-pointer flex flex-col items-center justify-center text-sm"
											>
												<input
													className="hidden"
													ref={imageRef}
													type="file"
													multiple
													onChange={(event: any) => {
														const files = Array.from(event.target.files);
														const fileObjects = files.map((file: any) => ({
															file,
															previewURL: URL.createObjectURL(file),
														}));
														setFieldValue("images", fileObjects);
													}}
												/>
												<div className="flex justify-center items-center gap-2 flex-wrap">
													{values.images.map((image: any, index) => (
														<div className="" key={index}>
															<img
																className="w-40 object-contain"
																src={image.previewURL}
																alt={`Image ${index + 1}`}
															/>
														</div>
													))}
												</div>
												<p>Upload Images</p>
												<CloudUpload fontSize="large" color="primary" />
												<ErrorMessage
													name="images"
													component="div"
													className="error"
												/>
											</div>
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

export default ReturnAssets;

const links = [
	{ id: 1, page: "Assign Assets", link: "/admin/assets/assign-assets" },
];
