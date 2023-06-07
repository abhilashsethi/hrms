import { Check, Close, CloudUpload } from "@mui/icons-material";
import {
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
import * as Yup from "yup";
import { useRef, useState } from "react";
import { useChange, useFetch } from "hooks";
import Swal from "sweetalert2";
import { Role } from "types";
import moment from "moment";
import { PDF } from "assets/home";
import { useRouter } from "next/router";

interface Props {
	open: any;
	handleClose: any;
	mutate?: any;
	assetData?: any;
}

const UpdateAssets = ({ open, handleClose, mutate, assetData }: Props) => {
	// console.log(assetData);
	const [loading, setLoading] = useState(false);
	const imageRef = useRef<HTMLInputElement | null>(null);
	const { change } = useChange();
	const initialValues = {
		assetName: `${assetData?.name ? assetData?.name : ""}`,
		modelNo: `${assetData?.modelName ? assetData?.modelName : ""}`,
		purchaseDate: `${
			assetData?.dateOfPurchase
				? moment(assetData?.dateOfPurchase).format("YYYY-MM-DD")
				: ""
		}`,
		billAmount: `${assetData?.purchasePrice ? assetData?.purchasePrice : ""}`,
		brandName: `${assetData?.brandName ? assetData?.brandName : ""}`,
		marketPrice: `${assetData?.marketPrice ? assetData?.marketPrice : ""}`,
		serialNo: `${assetData?.serialNumber ? assetData?.serialNumber : ""}`,
		uploadDoc: [],
		// images: [],
		images: assetData?.photos ? assetData?.photos : [],
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
	});

	const handleSubmit = async (values: any) => {
		console.log(values);

		setLoading(true);
		try {
			const res = await change(`assets/${assetData?.id}`, {
				method: "PATCH",
				body: {
					name: values?.assetName,
					purchasePrice: values?.billAmount,
					brandName: values?.brandName,
					marketPrice: values?.marketPrice,
					isAssign: true,
					modelName: values?.modelNo,
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
			// MainMutate();
			handleClose();
			Swal.fire(`Success`, `Updated Successfully!`, `success`);
			return;
		} catch (error) {
			console.log(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			open={open}
		>
			<DialogTitle
				id="customized-dialog-title"
				sx={{ p: 2, minWidth: "18rem !important" }}
			>
				<p className="text-center text-xl font-bold text-theme tracking-wide">
					UPDATE ASSET
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
			<DialogContent className="app-scrollbar" sx={{ p: 2 }}>
				<div className="md:px-4 px-2 tracking-wide">
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
												Date Of Purchase <span className="text-red-600">*</span>
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
								</div>
								<div className="flex justify-center md:py-4 py-2">
									<Button
										fullWidth
										type="submit"
										variant="contained"
										className="!bg-green-500"
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

				<div className="grid lg:grid-cols-2 gap-4 py-4">
					{assetData?.docs?.map((data: any, k: any) => (
						<div
							key={k}
							className="px-2 py-2 shadow-lg bg-slate-200 rounded-lg"
						>
							<a href={data?.link}>
								<img src={PDF.src} alt="" />
							</a>
							<div className="flex justify-between gap-1 pt-4 pb-2">
								<button
									onClick={() => {
										console.log(data);
										// setIsUpdate({ dialogue: true, imageData: data });
									}}
									className="bg-theme hover:bg-theme-600 px-4 py-1 text-white font-semibold rounded"
								>
									Edit
								</button>
								<button className="bg-red-600 hover:bg-red-700 px-4 py-1 text-white font-semibold rounded">
									Delete
								</button>
							</div>
						</div>
					))}
				</div>

				<div className="grid lg:grid-cols-2 gap-4 py-4">
					{assetData?.photos?.map((data: any, k: any) => (
						<div
							key={k}
							className="px-2 py-2 shadow-lg bg-slate-200 rounded-lg"
						>
							<img
								className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
								src={data}
								alt="Branch"
							/>
							<div className="flex justify-between gap-1 pt-4 pb-2">
								<button
									onClick={() => {
										console.log(data);
										// setIsUpdate({ dialogue: true, imageData: data });
									}}
									className="bg-theme hover:bg-theme-600 px-4 py-1 text-white font-semibold rounded"
								>
									Edit
								</button>
								<button className="bg-red-600 hover:bg-red-700 px-4 py-1 text-white font-semibold rounded">
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateAssets;
