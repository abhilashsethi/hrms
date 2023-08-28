import { Check, Close, CloudUpload } from "@mui/icons-material";
import {
	Button,
	Checkbox,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	FormGroup,
	IconButton,
	InputLabel,
	TextField,
	Tooltip,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { useChange } from "hooks";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { uploadFile } from "utils";
import * as Yup from "yup";

interface Props {
	open: any;
	handleClose: any;
	mutate?: any;
	assetData?: any;
	assignMutate?: any;
}
const checkListForLaptop = [
	{ id: 1, value: "isPowerOnOff", label: "Powers on/Off" },
	{
		id: 2,
		value: "isAllKeyboardButtonWork",
		label: "All keyboard button work",
	},
	{ id: 3, value: "isTrackPadWork", label: "Trackpad works" },
	{ id: 4, value: "isCameraWork", label: "Camera works" },
	{ id: 5, value: "isSpeakerWork", label: "Speakers works" },
	{ id: 6, value: "isConnectionToInternetWork", label: "Connects to internet" },
	{
		id: 7,
		value: "isBrightnessFunctionWork",
		label: "Brightness is fully adjustable to min and max brightness",
	},
	{
		id: 8,
		value: "isChargingFunctionWork",
		label: "Charging block charges laptop",
	},
	{ id: 9, value: "isAllPortsWork", label: "All ports on laptop function" },
	{ id: 10, value: "isOpenAndCloseWork", label: "Opens and close properly" },
	{
		id: 11,
		value: "isAllRubberPadsAttached",
		label: "Rubber pads are all attached",
	},
	{ id: 12, value: "isAllScrewArePresent", label: "All screws are present" },
	{
		id: 13,
		value: "isThereAnyMejorScratchOrDent",
		label: "No major scratches or dents",
	},
	{ id: 14, value: "isBroken", label: "Asset Is broken" },
];
const checkListForMonitor = [
	{ id: 1, value: "isPowerOnOff", label: "Powers on/Off" },
	{ id: 2, value: "isHDMICableInclude", label: "HDMI cable is included" },
	{
		id: 3,
		value: "isPowerAdapterInclude",
		label: "Powers adapter is included",
	},
	{
		id: 4,
		value: "isThereAnyMejorScratchOrDent",
		label: "No major scratches or dents",
	},
	{ id: 5, value: "isBroken", label: "Asset Is broken" },
];
const checkListForMouse = [
	{ id: 1, value: "isUSBReceiverWork", label: "USB receiver is included" },
	{ id: 2, value: "isLeftClickWork", label: "Left click works" },
	{ id: 3, value: "isRightClickWork", label: "Right click works" },
	{ id: 4, value: "isScrollWheelWork", label: "Scroll wheel works" },
	{ id: 5, value: "isAdditionalButtonWork", label: "Additional buttons work" },
	{
		id: 6,
		value: "isThereAnyMejorScratchOrDent",
		label: "No major scratches or dents",
	},
	{ id: 8, value: "isBroken", label: "Asset Is broken" },
];
const checkListForKeyboard = [
	{ id: 1, value: "isUSBReceiverWork", label: "USB receiver is included" },
	{
		id: 2,
		value: "isAllKeyboardButtonWork",
		label: "All keyboard button work",
	},
	{ id: 3, value: "isAllScrewArePresent", label: "All screws are present" },
	{
		id: 4,
		value: "isAllRubberPadsAttached",
		label: "Rubber pads are all attached",
	},
	{
		id: 5,
		value: "isThereAnyMejorScratchOrDent",
		label: "No major scratches or dents",
	},
	{ id: 6, value: "isBroken", label: "Asset Is broken" },
];
const other = [
	{
		id: 1,
		value: "isThereAnyMejorScratchOrDent",
		label: "No major scratches or dents",
	},
	{ id: 2, value: "isBroken", label: "Asset Is broken" },
];
const initialValues = {
	images: [],
	returnDate: "",
	returnTime: "",
	remark: "",
	checklist: [],
};

const validationSchema = Yup.object().shape({
	images: Yup.array().min(1, "Please upload at least one image"),
	returnDate: Yup.string().required("Assigned Date is required!"),
	returnTime: Yup.string().required("Assigned Date is required!"),
	remark: Yup.string().required("remark is required!"),
	checklist: Yup.array().of(Yup.string()),
});

const ReturnAsset = ({
	open,
	handleClose,
	mutate,
	assetData,
	assignMutate,
}: Props) => {
	const imageRef = useRef<HTMLInputElement | null>(null);
	const [loading, setLoading] = useState(false);
	const { change } = useChange();
	const handleSubmit = async (values: any) => {
		setLoading(true);
		try {
			const photoUrls = [];
			for (const photo of values?.images) {
				const url = await uploadFile(
					photo?.file,
					`${Date.now()}.${photo?.uniId}`
				);
				photoUrls.push(url);
			}

			const reqData: any = {
				returnTimePhotos: photoUrls,
				dateOfReturn: new Date(values?.returnDate).toISOString(),
				returnRemark: values?.remark,
				isAccepted: true,
				returnTime: values?.returnTime,
			};
			values?.checklist?.forEach((item: any) => {
				return (reqData[item] = true);
			});
			const res: any = await change(
				`assets/update-assign-asset-to-user/${assetData?.id}`,
				{
					method: "PATCH",
					body: reqData,
				}
			);
			setLoading(false);
			if (res?.status !== 200) {
				Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
				setLoading(false);
				return;
			}
			mutate();
			assignMutate();
			Swal.fire(`Success`, `You have successfully Returned!`, `success`);
			handleClose();
			return;
		} catch (error) {
			console.log(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	const handleAddRemoveValue = (
		setFieldValue: any,
		itemValue: any,
		allValues: any[]
	) => {
		//if value already present remove the value
		if (allValues?.includes(itemValue)) {
			let newFilteredValue = allValues?.filter((item) => item !== itemValue);
			setFieldValue("checkList", newFilteredValue);
			return;
		}
		setFieldValue("checklist", [...allValues, itemValue]);
	};
	return (
		<>
			<Dialog
				onClose={handleClose}
				maxWidth="lg"
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<DialogTitle id="customized-dialog-title">
					<p className="text-center text-md font-bold text-theme te tracking-wide">
						RETURN ASSET
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
				<DialogContent className="app-scrollbar" sx={{ p: 3 }}>
					<div className="md:px-4 px-2 w-full tracking-wide flex flex-col gap-3 text-sm py-4">
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
								}: any) => (
									<Form>
										<div className="grid md:grid-cols-2 grid-cols-1">
											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="returnDate">
														Date Of Return{" "}
														<span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
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
													<InputLabel htmlFor="returnTime">
														Time Of Return{" "}
														<span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													type="time"
													id="returnTime"
													name="returnTime"
													value={values.returnTime}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.returnTime && !!errors.returnTime}
													helperText={touched.returnTime && errors.returnTime}
												/>
											</div>
											<div className="md:px-4 px-2 md:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="remark">
														Remark
														<span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<TextField
													size="small"
													fullWidth
													multiline
													maxRows={4}
													id="remark"
													name="remark"
													value={values.remark}
													onChange={handleChange}
													onBlur={handleBlur}
													error={touched.remark && !!errors.remark}
													helperText={touched.remark && (errors.remark as any)}
												/>
											</div>
											<div className="md:col-span-2 md:px-4 px-2 md:py-2 py-1">
												<div className="py-2">
													<InputLabel htmlFor="remark">
														Check List
														<span className="text-red-600">*</span>
													</InputLabel>
												</div>
												<FormGroup>
													<div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4">
														{assetData?.assetType == "Laptop"
															? checkListForLaptop?.map((item, i) => (
																	<FormControlLabel
																		control={<Checkbox />}
																		label={item?.label}
																		name={item?.value}
																		checked={values?.checklist?.includes(
																			item?.value
																		)}
																		onClick={() => {
																			handleAddRemoveValue(
																				setFieldValue,
																				item?.value,
																				values?.checklist
																			);
																		}}
																	/>
															  ))
															: assetData?.assetType == "Mouse"
															? checkListForMouse?.map((item, i) => (
																	<FormControlLabel
																		control={<Checkbox />}
																		label={item?.label}
																		name={item?.value}
																		checked={values?.checklist?.includes(
																			item?.value
																		)}
																		onChange={() => {
																			handleAddRemoveValue(
																				setFieldValue,
																				item?.value,
																				values?.checklist
																			);
																		}}
																	/>
															  ))
															: assetData?.assetType == "Monitor"
															? checkListForMonitor?.map((item, i) => (
																	<FormControlLabel
																		control={<Checkbox />}
																		label={item?.label}
																		name={item?.value}
																		checked={values?.checklist?.includes(
																			item?.value
																		)}
																		onChange={() => {
																			handleAddRemoveValue(
																				setFieldValue,
																				item?.value,
																				values?.checklist
																			);
																		}}
																	/>
															  ))
															: assetData?.assetType == "KeyBoard"
															? checkListForKeyboard?.map((item, i) => (
																	<FormControlLabel
																		control={<Checkbox />}
																		label={item?.label}
																		name={item?.value}
																		checked={values?.checklist?.includes(
																			item?.value
																		)}
																		onChange={() => {
																			handleAddRemoveValue(
																				setFieldValue,
																				item?.value,
																				values?.checklist
																			);
																		}}
																	/>
															  ))
															: assetData?.assetType == "other"
															? other?.map((item, i) => (
																	<FormControlLabel
																		control={<Checkbox />}
																		label={item?.label}
																		name={item?.value}
																		checked={values?.checklist?.includes(
																			item?.value
																		)}
																		onChange={() => {
																			handleAddRemoveValue(
																				setFieldValue,
																				item?.value,
																				values?.checklist
																			);
																		}}
																	/>
															  ))
															: other?.map((item, i) => (
																	<FormControlLabel
																		control={<Checkbox />}
																		label={item?.label}
																		name={item?.value}
																		checked={values?.checklist?.includes(
																			item?.value
																		)}
																		onChange={() => {
																			handleAddRemoveValue(
																				setFieldValue,
																				item?.value,
																				values?.checklist
																			);
																		}}
																	/>
															  ))}
													</div>
												</FormGroup>
											</div>
											<div className="md:col-span-2 md:px-4 px-2 md:py-2 py-1">
												<p className="text-gray-500 mb-2">
													Upload Images
													<span className="text-red-600">*</span>
												</p>
												{/* ----------------------------multiple Images component------------------ */}
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
																	.split("+")[0];
																return {
																	file,
																	previewURL: URL.createObjectURL(file),
																	uniId,
																};
															});
															setFieldValue("images", fileObjects);
														}}
													/>
													<div className="flex justify-center items-center gap-2 flex-wrap">
														{values.images.map((image: any, index: any) => (
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
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ReturnAsset;
