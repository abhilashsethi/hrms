import { Check, CloudUpload } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	CircularProgress,
	InputLabel,
	TextField,
} from "@mui/material";
import { PDF } from "assets/home";
import { AdminBreadcrumbs, LoaderAnime } from "components/core";
import ChooseBranchToViewAssets from "components/dialogues/ChooseBranchToViewAssets";
import { ErrorMessage, Form, Formik } from "formik";
import { useChange } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { uploadFile } from "utils";
import * as Yup from "yup";
const initialValues = {
	assetName: "",
	modelNo: "",
	purchaseDate: "",
	billAmount: 0,
	brandName: "",
	marketPrice: 0,
	serialNo: "",
	uploadDoc: [],
	images: [],
	notes: "",
	assetType: "",
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
	purchaseDate: Yup.string().required("Purchase date is required!"),
	assetType: Yup.string().required("Asset Type is required!"),
	billAmount: Yup.number().required("Bill amount is required!"),
});

const CreateAssets = () => {
	const router = useRouter();
	const imageRef = useRef<HTMLInputElement | null>(null);
	const docsRef = useRef<HTMLInputElement | null>(null);
	const [loading, setLoading] = useState(false);
	const { change } = useChange();
	const [branchId, setBranchId] = useState<string | null>(null);
	const [isView, setIsView] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setIsView(true);
		}, 2000);
	}, []);
	const handleSubmit = async (values: any, { resetForm }: any) => {
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
			const docsUrls = [];
			for (const docs of values?.uploadDoc) {
				// console.log(docs?.uniId);

				const url = await uploadFile(
					docs?.file,
					`${Date.now()}.${docs?.uniId}`
				);
				docsUrls.push({ link: url, docType: docs?.uniId });
			}

			const res = await change(`assets`, {
				body: {
					name: values?.assetName,
					billAmount: Number(values?.billAmount),
					brandName: values?.brandName,
					marketPrice: Number(values?.marketPrice),
					modelName: values?.modelNo,
					branchId: branchId,
					serialNumber: values?.serialNo,
					dateOfPurchase: new Date(values?.purchaseDate).toISOString(),
					photos: photoUrls,
					assetType: values?.assetType,
					docs: docsUrls,
					note: values?.notes,
				},
			});
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
			Swal.fire(`Success`, `You have successfully Created!`, `success`);
			resetForm();
			router.push("/admin/assets/all-assets");
			return;
		} catch (error) {
			console.log(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<PanelLayout title="Create Assets - Admin Panel">
			<ChooseBranchToViewAssets
				open={isView}
				handleClose={() => setIsView(false)}
				setBranchId={setBranchId}
			/>
			{branchId ? (
				<>
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
												Create Assets
											</h1>
											<div className="grid lg:grid-cols-2 grid-cols-1">
												<div className="md:px-4 px-2 md:py-2 py-1">
													<div className="md:py-2 py-1">
														<InputLabel htmlFor="assetName">
															Asset Name <span className="text-red-600">*</span>
														</InputLabel>
													</div>
													<TextField
														fullWidth
														size="small"
														id="assetName"
														// placeholder="Name"
														name="assetName"
														value={values.assetName}
														onChange={handleChange}
														onBlur={handleBlur}
														error={touched.assetName && !!errors.assetName}
														helperText={touched.assetName && errors.assetName}
													/>
												</div>
												<div className="md:px-4 px-2 md:py-2 py-1">
													<div className="py-2">
														<InputLabel htmlFor="modelNo">
															Model No. <span className="text-red-600">*</span>
														</InputLabel>
													</div>
													<TextField
														size="small"
														fullWidth
														// placeholder="Email"
														id="modelNo"
														name="modelNo"
														value={values.modelNo}
														onChange={handleChange}
														onBlur={handleBlur}
														error={touched.modelNo && !!errors.modelNo}
														helperText={touched.modelNo && errors.modelNo}
													/>
												</div>

												<div className="md:px-4 px-2 md:py-2 py-1">
													<div className="py-2">
														<InputLabel htmlFor="purchaseDate">
															Date Of Purchase{" "}
															<span className="text-red-600">*</span>
														</InputLabel>
													</div>
													<TextField
														size="small"
														fullWidth
														type="date"
														// placeholder="Employee ID"
														id="purchaseDate"
														name="purchaseDate"
														inputProps={{
															max: new Date().toISOString().split("T")[0],
														}}
														value={values.purchaseDate}
														onChange={handleChange}
														onBlur={handleBlur}
														error={
															touched.purchaseDate && !!errors.purchaseDate
														}
														helperText={
															touched.purchaseDate && errors.purchaseDate
														}
													/>
												</div>
												<div className="md:px-4 px-2 md:py-2 py-1">
													<div className="py-2">
														<InputLabel htmlFor="billAmount">
															Bill Amount<span className="text-red-600">*</span>
														</InputLabel>
													</div>
													<TextField
														size="small"
														fullWidth
														type="number"
														// placeholder="Phone"
														id="billAmount"
														name="billAmount"
														value={values.billAmount}
														onChange={handleChange}
														onBlur={handleBlur}
														error={touched.billAmount && !!errors.billAmount}
														helperText={touched.billAmount && errors.billAmount}
													/>
												</div>
												<div className="md:px-4 px-2 md:py-2 py-1">
													<div className="py-2">
														<InputLabel htmlFor="brandName">
															Brand Name <span className="text-red-600">*</span>
														</InputLabel>
													</div>
													<TextField
														size="small"
														fullWidth
														// placeholder="Phone"
														id="brandName"
														name="brandName"
														value={values.brandName}
														onChange={handleChange}
														onBlur={handleBlur}
														error={touched.brandName && !!errors.brandName}
														helperText={touched.brandName && errors.brandName}
													/>
												</div>
												<div className="md:px-4 px-2 md:py-2 py-1">
													<div className="py-2">
														<InputLabel htmlFor="marketPrice">
															Current Market Price
															<span className="text-red-600">*</span>
														</InputLabel>
													</div>
													<TextField
														size="small"
														fullWidth
														// placeholder="Phone"
														id="marketPrice"
														name="marketPrice"
														value={values.marketPrice}
														onChange={handleChange}
														onBlur={handleBlur}
														error={touched.marketPrice && !!errors.marketPrice}
														helperText={
															touched.marketPrice && errors.marketPrice
														}
													/>
												</div>
												<div className="md:px-4 px-2 md:py-2 py-1">
													<div className="py-2">
														<InputLabel htmlFor="serialNo">
															Serial No
														</InputLabel>
													</div>
													<TextField
														size="small"
														fullWidth
														// placeholder="Phone"
														id="serialNo"
														name="serialNo"
														value={values.serialNo}
														onChange={handleChange}
														onBlur={handleBlur}
														error={touched.serialNo && !!errors.serialNo}
														helperText={touched.serialNo && errors.serialNo}
													/>
												</div>
												<div className="md:px-4 px-2 md:py-2 py-1">
													<div className="py-2">
														<InputLabel htmlFor="notes">Notes</InputLabel>
													</div>
													<TextField
														size="small"
														fullWidth
														// placeholder="Phone"
														multiline
														rows={3}
														id="notes"
														name="notes"
														value={values.notes}
														onChange={handleChange}
														onBlur={handleBlur}
														error={touched.notes && !!errors.notes}
														helperText={touched.notes && errors.notes}
													/>
												</div>
												<div className="px-4 py-2">
													<div className="py-2">
														<InputLabel htmlFor="role">
															Select Asset Type{" "}
															<span className="text-red-600">*</span>
														</InputLabel>
													</div>

													<Autocomplete
														fullWidth
														size="small"
														id="assetType"
														options={assetType || []}
														onChange={(e: any, r: any) => {
															setFieldValue("assetType", r?.name);
														}}
														getOptionLabel={(option: any) => option.name}
														renderInput={(params) => (
															<TextField
																{...params}
																// label="Select Asset Type"
																placeholder="Selected Asset Type"
																onBlur={handleBlur}
																error={touched.assetType && !!errors.assetType}
																helperText={
																	touched.assetType && errors.assetType
																}
															/>
														)}
													/>
												</div>

												<div className="md:col-span-2 col-span-1 py-3">
													<p className="text-gray-500 mb-2">Upload Images</p>
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
																		.split("+")[0]; // Get unique ID of the image
																	return {
																		file,
																		previewURL: URL.createObjectURL(file),
																		uniId, // Add unique ID to the file object
																	};
																});
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
												<div className="md:col-span-2 col-span-1 py-3">
													<p className="text-gray-500 mb-2">UploaI Docs</p>
													{/* ----------------------------multiple Docs component------------------ */}
													<div
														onClick={() => docsRef?.current?.click()}
														className="min-h-[8rem] py-6 w-full border-[1px] border-dashed border-theme cursor-pointer flex flex-col items-center justify-center text-sm"
													>
														<input
															className="hidden"
															ref={docsRef}
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
																setFieldValue("uploadDoc", fileObjects);
															}}
														/>
														<div className="flex justify-center items-center gap-2 flex-wrap">
															{values.uploadDoc.map((image: any, index) => (
																<div className="" key={index}>
																	<img
																		className="w-20 object-contain"
																		src={PDF.src}
																		alt={`Image ${index + 1}`}
																	/>
																</div>
															))}
														</div>
														<p>Upload Docs</p>
														<CloudUpload fontSize="large" color="primary" />
														<ErrorMessage
															name="uploadDoc"
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
				</>
			) : (
				<>
					<LoaderAnime text="Please Select Branch" />
					<div className="w-full flex justify-center items-center mt-3">
						<Button
							variant="contained"
							className="!bg-theme "
							onClick={() => setIsView(true)}
						>
							Choose Branch
						</Button>
					</div>
				</>
			)}
		</PanelLayout>
	);
};

export default CreateAssets;

const links = [
	{ id: 1, page: "Create Assets", link: "/admin/assets/create-assets" },
];
const assetType = [
	{
		id: 1,
		name: "Laptop",
	},
	{
		id: 2,
		name: "Mouse",
	},
	{
		id: 3,
		name: "Key Board",
	},
	{
		id: 4,
		name: "Computer",
	},
	{
		id: 5,
		name: "Other",
	},
];
