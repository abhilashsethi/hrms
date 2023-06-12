import { Check, CloudUpload } from "@mui/icons-material";
import {
	Autocomplete,
	Box,
	Button,
	CircularProgress,
	InputLabel,
	TextField,
} from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { ErrorMessage, Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { uploadFile } from "utils";
import * as Yup from "yup";
const initialValues = {
	assignTimePhotos: [],
	assignedUserId: "",
	assignDate: "",
	assignTime: "",
	returnDate: "",
	reason: "",
	remarks: "",
};

const validationSchema = Yup.object().shape({
	assignTimePhotos: Yup.array().min(1, "Please upload at least one image"),
	assignedUserId: Yup.string().required("Assigned user is required!"),
	assignDate: Yup.string().required("Assigned Date is required!"),
	reason: Yup.string().required("Reason is required!"),
});

const AssignAssets = () => {
	const router = useRouter();
	const imageRef = useRef<HTMLInputElement | null>(null);
	const [loading, setLoading] = useState(false);
	const [isBranchId, setIsBranchId] = useState<string | null>(null);
	const { data: assetData } = useFetch<any>(`assets/${router?.query?.id}`);
	console.log(assetData);

	const { data: userData } = useFetch<any>(
		`users?branchId=${assetData?.branchId}`
	);
	const { change, isChanging } = useChange();

	const handleSubmit = async (values: any, { resetForm }: any) => {
		console.log(values);
		setLoading(true);

		try {
			const photoUrls = [];
			for (const photo of values?.assignTimePhotos) {
				console.log(photo?.uniId);
				const url = await uploadFile(
					photo?.file,
					`${Date.now()}.${photo?.uniId}`
				);
				photoUrls.push(url);
				console.log(values?.assignTimePhotos);
			}

			const res: any = await change(
				`assets/assignAssetToUser/${router?.query?.id}`,
				{
					body: {
						userId: values?.assignedUserId,
						dateOfAssign: new Date(values?.assignDate).toISOString(),
						assignTimePhotos: photoUrls,
						assignRemark: values?.remarks,
						reasonForAssign: values?.reason,
						assignTime: values?.assignTime,
						dateOfReturn: new Date(values?.returnDate).toISOString(),
					},
				}
			);
			setLoading(false);
			if (res?.status !== 200) {
				Swal.fire(
					"Error",
					res?.results?.message || "Unable to Submit",
					"error"
				);
				setLoading(false);
				console.log(res);
				return;
			}
			Swal.fire(`Success`, `You have successfully Assigned!`, `success`);
			resetForm();
			router.push("/admin/assets/all-assets");
			console.log(res);
			return;
		} catch (error) {
			console.log(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
		console.log(values);
	};

	return (
		<PanelLayout title="Assign Assets - Admin Panel">
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
												<InputLabel htmlFor="assignedUserId">
													Assign User<span className="text-red-500">*</span>
												</InputLabel>
											</div>
											<Autocomplete
												fullWidth
												size="small"
												id="assignedUserId"
												options={userData || []}
												getOptionLabel={(option: any) =>
													option.name ? option.name : ""
												}
												isOptionEqualToValue={(option, value) =>
													option.id === value.userId
												}
												value={
													values?.assignedUserId
														? userData?.find(
																(option: any) =>
																	option.id === values.assignedUserId
														  )
														: {}
												}
												onChange={(e: any, r: any) => {
													setFieldValue("assignedUserId", r?.id);
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
															touched.assignedUserId && !!errors.assignedUserId
														}
														helperText={
															touched.assignedUserId && errors.assignedUserId
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
												<InputLabel htmlFor="returnDate">
													Date Of Return <span className="text-red-600">*</span>
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												// placeholder="Email"
												type="date"
												id="returnDate"
												name="returnDate"
												value={values.returnDate}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.returnDate && !!errors.returnDate}
												helperText={touched.returnDate && errors.returnDate}
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
														const fileObjects = files.map((file: any) => {
															const uniId = file.type
																.split("/")[1]
																.split("+")[0]; // Get unique ID of the image
															return {
																file,
																previewURL: URL.createObjectURL(file),
																uniId, // Add unique ID to the file object
															};
														});
														setFieldValue("assignTimePhotos", fileObjects);
													}}
												/>
												<div className="flex justify-center items-center gap-2 flex-wrap">
													{values.assignTimePhotos.map((image: any, index) => (
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

export default AssignAssets;

const links = [
	{ id: 1, page: "Assets", link: "/admin/assets" },
	{ id: 2, page: "Assign Assets", link: "/admin/assets/assign-assets" },
];
