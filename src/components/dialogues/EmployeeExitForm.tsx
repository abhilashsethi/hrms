import { Check, Close, CloudUpload } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormLabel,
	IconButton,
	Radio,
	RadioGroup,
	TextField,
	Tooltip,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { useAuth, useChange } from "hooks";
import { ChangeEvent, useRef, useState } from "react";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: any;
	details?: any;
	mutate?: any;
}

const validationSchema = Yup.object().shape({
	clientName: Yup.string().required("Client name is required!"),
	clientEmail: Yup.string().email().required("Client Email is required!"),
	clientAddress: Yup.string().required("Client address is required!"),
	reason: Yup.string().required("Reason is required"),
	status: Yup.string().required("Status is required"),
});
const EmployeeExitForm = ({ open, handleClose }: Props) => {
	const [loading, setLoading] = useState(false);
	const [isStatus, setIsStatus] = useState("");
	const [assetReturn, setAssetReturn] = useState(false);
	const [agreement, setAgreement] = useState(false);
	const [declaration, setDeclaration] = useState(false);
	const [doc, setDoc] = useState(false);
	const imageRef = useRef<HTMLInputElement | null>(null);
	const handleAssetChange = (event: ChangeEvent<HTMLInputElement>) => {
		setAssetReturn(event.target.value === "yes");
	};
	const handleAgreementChange = (event: ChangeEvent<HTMLInputElement>) => {
		setAgreement(event.target.value === "yes");
	};
	const handleDeclarationChange = (event: ChangeEvent<HTMLInputElement>) => {
		setDeclaration(event.target.value === "yes");
	};
	const handleDocChange = (event: ChangeEvent<HTMLInputElement>) => {
		setDoc(event.target.value === "yes");
	};

	const { user } = useAuth();
	// console.log(user);
	// console.log(details);
	const initialValues = {
		status: "",
		reason: "",
		images: [] as IMAGES_TYPES[],
	};
	type IMAGES_TYPES = {
		file: File;
		uniId: string;
		previewURL: string;
	};
	const { change } = useChange();
	const handleSubmit = async (values: any) => {
		console.log(values);
	};

	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			maxWidth="lg"
			open={open}
		>
			<DialogTitle
				id="customized-dialog-title"
				sx={{ p: 2, minWidth: "40rem !important" }}
			>
				<p className="text-center text-xl font-bold text-theme tracking-wide">
					Employee Exit Form
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
				<div className="md:w-[40rem] w-[72vw] md:px-4 px-2 tracking-wide">
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
							<Form className="w-full">
								<p className="font-medium text-gray-700">
									Select Status<span className="text-red-600">*</span>
								</p>
								<div className="w-full">
									<Autocomplete
										fullWidth
										size="small"
										id="status"
										options={exitStatus || []}
										onChange={(e: any, r: any) => {
											setFieldValue("status", r?.value);
										}}
										getOptionLabel={(option: any) => option.name}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Status"
												// placeholder="Selected Gender"
												onBlur={handleBlur}
												error={touched.status && !!errors.status}
												helperText={touched.status && errors.status}
											/>
										)}
									/>
								</div>

								<p className="font-medium text-gray-700 mt-2">
									Reason<span className="text-red-600">*</span>
								</p>
								<TextField
									size="small"
									fullWidth
									placeholder="Reason..."
									multiline
									rows={3}
									name="reason"
									value={values.reason}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.reason && !!errors.reason}
									helperText={touched.reason && errors.reason}
								/>
								<FormControl>
									<FormLabel
										className="mt-3 text-gray-700"
										id="demo-controlled-radio-buttons-group"
									>
										Asset Returned<span className="text-red-600">*</span>
									</FormLabel>
									<RadioGroup
										aria-labelledby="demo-controlled-radio-buttons-group"
										name="controlled-radio-buttons-group"
										value={assetReturn ? "yes" : "no"}
										onChange={handleAssetChange}
										row
									>
										<FormControlLabel
											value="yes"
											control={<Radio />}
											label="Yes"
										/>
										<FormControlLabel
											value="no"
											control={<Radio />}
											label="No"
										/>
									</RadioGroup>
									<FormLabel
										className="mt-3 text-gray-700"
										id="demo-controlled-radio-buttons-group"
									>
										Non Disclosure Agreement
										<span className="text-red-600">*</span>
									</FormLabel>
									<RadioGroup
										aria-labelledby="demo-controlled-radio-buttons-group"
										name="controlled-radio-buttons-group"
										value={agreement ? "yes" : "no"}
										onChange={handleDeclarationChange}
										row
									>
										<FormControlLabel
											value="yes"
											control={<Radio />}
											label="Yes"
										/>
										<FormControlLabel
											value="no"
											control={<Radio />}
											label="No"
										/>
									</RadioGroup>
									<FormLabel
										className="mt-3 text-gray-700"
										id="demo-controlled-radio-buttons-group"
									>
										Declaration
										<span className="text-red-600">*</span>
									</FormLabel>
									<RadioGroup
										aria-labelledby="demo-controlled-radio-buttons-group"
										name="controlled-radio-buttons-group"
										value={declaration ? "yes" : "no"}
										onChange={handleAgreementChange}
										row
									>
										<FormControlLabel
											value="yes"
											control={<Radio />}
											label="Yes"
										/>
										<FormControlLabel
											value="no"
											control={<Radio />}
											label="No"
										/>
									</RadioGroup>
									<FormLabel
										className="mt-3 text-gray-700"
										id="demo-controlled-radio-buttons-group"
									>
										DOC Returned
										<span className="text-red-600">*</span>
									</FormLabel>
									<RadioGroup
										aria-labelledby="demo-controlled-radio-buttons-group"
										name="controlled-radio-buttons-group"
										value={doc ? "yes" : "no"}
										onChange={handleDocChange}
										row
									>
										<FormControlLabel
											value="yes"
											control={<Radio />}
											label="Yes"
										/>
										<FormControlLabel
											value="no"
											control={<Radio />}
											label="No"
										/>
									</RadioGroup>
								</FormControl>
								<div className="md:col-span-2 col-span-1 py-3">
									<p className="text-gray-500 mb-2">Upload Docs</p>
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
											onChange={(event: ChangeEvent<HTMLInputElement>) => {
												const files: File[] = Array.from(event.target.files!);
												const fileObjects = files.map((file: File) => {
													const uniId = file.type.split("/")[1].split("+")[0]; // Get unique ID of the image
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
											{values.images.map((image, index) => (
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
								<div className="flex justify-center mt-4">
									<Button
										type="submit"
										className="!bg-theme"
										variant="contained"
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
			</DialogContent>
		</Dialog>
	);
};

export default EmployeeExitForm;
const exitStatus = [
	{ id: 1, value: "resigned", name: "Resigned" },
	{ id: 2, value: "terminated", name: "Terminated" },
	{ id: 3, value: "absconded", name: "Absconded" },
	{ id: 4, value: "laidOff", name: "Laid Off" },
];
