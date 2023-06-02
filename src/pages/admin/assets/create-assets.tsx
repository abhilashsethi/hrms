import { useTheme } from "@material-ui/core";
import { Add, Check, CloudUpload } from "@mui/icons-material";
import { Button, CircularProgress, InputLabel, TextField } from "@mui/material";
import {
	AdminBreadcrumbs,
	FileUpload,
	MultipleImagesUpload,
	SingleImageUpdate,
} from "components/core";
import SingleImage from "components/core/SingleImage";
import { error } from "console";
import { ErrorMessage, Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRef, useState } from "react";
import * as Yup from "yup";
const initialValues = {
	assetName: "",
	modelNo: "",
	purchaseDate: "",
	billAmount: "",
	brandName: "",
	marketPrice: "",
	serialNo: "",
	uploadDoc: "",
	images: [],
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
	billAmount: Yup.number().required("Bill amount is required!"),

	serialNo: Yup.string().required("Serial No. is required!"),
	images: Yup.array().min(1, "Please upload at least one image"),
	// .of(
	// 	Yup.mixed().test(
	// 		"fileFormat",
	// 		"Unsupported file format",
	// 		(value: any) => {
	// 			if (value) {
	// 				const supportedFormats = [
	// 					"image/jpeg",
	// 					"image/png",
	// 					"image/jpg",
	// 					"image/gif",
	// 				];
	// 				return supportedFormats.includes(value.type);
	// 			}
	// 			return true;
	// 		}
	// 	)
	// ),
});

const CreateAssets = () => {
	const imageRef = useRef<HTMLInputElement | null>(null);
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
		<PanelLayout title="Create Assets - Admin Panel">
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
									<div className="grid lg:grid-cols-2">
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
												value={values.purchaseDate}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.purchaseDate && !!errors.purchaseDate}
												helperText={touched.purchaseDate && errors.purchaseDate}
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
												<InputLabel htmlFor="brandName">Brand Name</InputLabel>
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
												helperText={touched.marketPrice && errors.marketPrice}
											/>
										</div>
										<div className="md:px-4 px-2 md:py-2 py-1">
											<div className="py-2">
												<InputLabel htmlFor="serialNo">
													Serial No<span className="text-red-600">*</span>
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
												<InputLabel htmlFor="uploadDoc">
													Upload Document
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												type="file"
												// placeholder="Phone"
												id="uploadDoc"
												name="uploadDoc"
												value={values.uploadDoc}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.uploadDoc && !!errors.uploadDoc}
												helperText={touched.uploadDoc && errors.uploadDoc}
											/>
										</div>

										<div className="col-span-2">
											<p className="text-gray-500 mb-2">
												Upload Multiple Images
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

export default CreateAssets;

const links = [
	{ id: 1, page: "Employees", link: "/admin/employees" },
	{ id: 2, page: "Create Employee", link: "/admin/employees/create-employee" },
];
