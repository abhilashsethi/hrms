import { Check, Close, CloudUpload } from "@mui/icons-material";
import {
	Autocomplete,
	Box,
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
import { ErrorMessage, Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import { uploadFile } from "utils";
import * as Yup from "yup";

interface Props {
	open: any;
	handleClose: any;
	mutate?: any;
	assetData?: any;
}

const initialValues = {
	assignTimePhotos: [],
	assignedUserId: "",
	assignDate: "",
	assignTime: "",
	// returnDate: "",
	reason: "",
	remarks: "",
};

const validationSchema = Yup.object().shape({
	assignTimePhotos: Yup.array().min(1, "Please upload at least one image"),
	assignedUserId: Yup.string().required("Assigned user is required!"),
	assignDate: Yup.string().required("Assigned Date is required!"),
	reason: Yup.string().required("Reason is required!"),
	remarks: Yup.string().required("Remarks is required!"),
	assignTime: Yup.string().required("Assign Time is required!"),
	// returnDate: Yup.string().required("Return Date is required!"),
});

const AssignAsset = ({ open, handleClose, mutate, assetData }: Props) => {
	const imageRef = useRef<HTMLInputElement | null>(null);
	const [loading, setLoading] = useState(false);
	const { change } = useChange();
	const router = useRouter();
	const { data: userData } = useFetch<User[]>(
		`users?branchId=${assetData?.branchId}`
	);
	const handleSubmit = async (values: any, { resetForm }: any) => {
		setLoading(true);
		try {
			const photoUrls = [];
			for (const photo of values?.assignTimePhotos) {
				const url = await uploadFile(
					photo?.file,
					`${Date.now()}.${photo?.uniId}`
				);
				photoUrls.push(url);
			}

			const res: any = await change(
				`assets/assign-asset-to-user/${assetData?.id}`,
				{
					body: {
						userId: values?.assignedUserId,
						dateOfAssign: new Date(values?.assignDate).toISOString(),
						assignTimePhotos: photoUrls,
						assignRemark: values?.remarks,
						reasonForAssign: values?.reason,
						assignTime: values?.assignTime,
						// dateOfReturn: new Date(values?.returnDate).toISOString(),
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
				return;
			}
			Swal.fire(`Success`, `You have successfully Assigned!`, `success`);
			resetForm();
			handleClose();
			mutate();
			return;
		} catch (error) {
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			<Dialog
				className=""
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<DialogTitle id="customized-dialog-title">
					<p className="text-center text-md font-bold text-theme te tracking-wide">
						ASSIGN ASSET
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
				<DialogContent className="p-3 app-scrollbar" sx={{ p: 2 }}>
					<div className="w-full tracking-wide flex flex-col gap-3 text-sm py-4">
						<div className="flex flex-col items-center w-full">
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
													isOptionEqualToValue={(option: any, value) =>
														option?.id === value?.userId
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
																touched.assignedUserId &&
																!!errors.assignedUserId
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
														Date Of Assign{" "}
														<span className="text-red-600">*</span>
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
													inputProps={{
														min: moment().format("YYYY-MM-DD"),
													}}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.assignDate && !!errors.assignDate}
													helperText={touched.assignDate && errors.assignDate}
												/>
											</div>

											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="assignTime">
														Time Of Assign
														<span className="text-red-600">*</span>
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
											{/* <div className="md:px-4 px-2 md:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="returnDate">
														Date Of Return{" "}
														<span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													inputProps={{
														min: values?.assignDate
															? moment(values?.assignDate).format("YYYY-MM-DD")
															: moment().format("YYYY-MM-DD"),
													}}
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
											</div> */}
											<div className="md:px-4 px-2 md:py-2 py-1 md:col-span-2">
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
											<div className="md:px-4 px-2 md:py-2 py-1 md:col-span-2">
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

											<div className="md:col-span-2 md:px-4 px-2 md:py-2 py-1">
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
														{values.assignTimePhotos.map(
															(image: any, index) => (
																<div className="" key={index}>
																	<img
																		className="w-40 object-contain"
																		src={image.previewURL}
																		alt={`Image ${index + 1}`}
																	/>
																</div>
															)
														)}
													</div>
													<p>Upload Images</p>
													<CloudUpload fontSize="large" color="primary" />
													<span className="text-red-500">
														<ErrorMessage
															name="assignTimePhotos"
															component="div"
															className="error"
														/>
													</span>
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
													loading ? (
														<CircularProgress size={20} color="secondary" />
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
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default AssignAsset;
