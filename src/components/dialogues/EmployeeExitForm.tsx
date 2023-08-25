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
import { PDF } from "assets/home";
import { ErrorMessage, Form, Formik } from "formik";
import { useAuth, useChange } from "hooks";
import { ChangeEvent, useRef, useState } from "react";
import Swal from "sweetalert2";
import { uploadFile } from "utils";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: any;
	details?: any;
	mutate?: any;
	userId?: string;
}

const validationSchema = Yup.object().shape({
	reason: Yup.string().required("Reason is required"),
	status: Yup.string().required("Status is required"),
});
const EmployeeExitForm = ({ open, handleClose, userId, mutate }: Props) => {
	const [loading, setLoading] = useState(false);
	const [isStatus, setIsStatus] = useState("");
	const [assetReturn, setAssetReturn] = useState(false);
	const [agreement, setAgreement] = useState(false);
	const [declaration, setDeclaration] = useState(false);
	const [doc, setDoc] = useState(false);
	const docsRef = useRef<HTMLInputElement | null>(null);
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
		uploadDoc: [] as IMAGES_TYPES[],
	};
	type IMAGES_TYPES = {
		file: File;
		uniId: string;
		previewURL: string;
	};

	const { change } = useChange();
	const handleSubmit = async (values: any) => {
		setLoading(true);
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You want to Exit?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, exit!",
			}).then(async (result) => {
				setLoading(true);
				if (result.isConfirmed) {
					setLoading(true);
					const docsUrls = [];
					for (const docs of values?.uploadDoc) {
						// console.log(docs?.uniId);

						const url = await uploadFile(
							docs?.file,
							`${Date.now()}.${docs?.uniId}`
						);
						docsUrls.push(url);
					}
					const res = await change(`employee-exit`, {
						body: {
							userId: userId,
							reason: values?.reason,
							status: values?.status,
							assetsReturn: assetReturn,
							nonDisclouserAggrement: agreement,
							Declaration: declaration,
							docReturn: doc,
							exitDocs: docsUrls,
						},
					});

					setLoading(false);
					if (res?.status !== 200) {
						Swal.fire(
							"Error",
							res?.results?.msg || "Unable to Submit",
							"error"
						);
						setLoading(false);
						return;
					}
					Swal.fire(`Success`, `Employee successfully exited!`, `success`);
					mutate();
					handleClose();
					return;
				}
			});
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
			maxWidth="lg"
			open={open}
		>
			<DialogTitle
				id="customized-dialog-title"
				// sx={{ p: 2, minWidth: "40rem !important" }}
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
								{/* {console.log(values)} */}
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
										Declaration
										<span className="text-red-600">*</span>
									</FormLabel>
									<RadioGroup
										aria-labelledby="demo-controlled-radio-buttons-group"
										name="controlled-radio-buttons-group"
										value={declaration ? "yes" : "no"}
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
											onChange={(event) => {
												const files: File[] = Array.from(event.target.files!);
												const fileObjects = files.map((file: File) => {
													const uniId = file.type.split("/")[1].split("+")[0]; // Get unique ID of the image
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
											{values.uploadDoc.map((image, index) => (
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
	{ id: 1, value: "Resigned", name: "Resigned" },
	{ id: 2, value: "Terminated", name: "Terminated" },
	{ id: 3, value: "Absconded", name: "Absconded" },
	{ id: 4, value: "LaidOff", name: "Laid Off" },
];
