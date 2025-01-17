import { Check, Close } from "@mui/icons-material";
import {
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	MenuItem,
	TextField,
	Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import { uploadFile } from "utils";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: any;
	details?: any;
	mutate?: any;
	employData?: User;
}

const validationSchema = Yup.object().shape({
	title: Yup.string()
		.trim() // Remove leading and trailing whitespace
		.required("Document title is required")
		.test("not-only-spaces", "Title cannot be empty spaces", (value) => {
			return value.trim() !== ""; // Check if the trimmed value is not an empty string
		}),
	// type: Yup.string().required("Document type is Required"),
	link: Yup.string().required("Choose document"),
});
const AddDocumentDialogue = ({
	open,
	handleClose,
	employData,
	mutate,
}: Props) => {
	const [loading, setLoading] = useState(false);

	const initialValues = {
		title: "",
		link: null,
		// type: "",
	};

	const { change } = useChange();
	const handleSubmit = async (values: any) => {
		const dtype = values?.link?.type.split("/")[1];
		Swal.fire({
			title: "Are you sure?",
			text: "You want to add documents?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Add",
		}).then(async (result) => {
			if (result.isConfirmed) {
				Swal.fire(`Info`, "It will take some time", "info");
				const url = await uploadFile(values?.link, `${Date.now()}.${dtype}`);
				const res = await change(`users/add-doc/${employData?.id}`, {
					method: "POST",
					body: {
						title: values.title,
						link: url,
						// docType: values.type,
					},
				});
				if (res?.status !== 200) {
					Swal.fire(`Error`, "Something went wrong!", "error");
					return;
				}
				mutate();
				Swal.fire(`Success`, "Document Added Successfully!!", "success");
				handleClose();
				return;
			}
		});
	};

	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			maxWidth="lg"
			open={open}
		>
			<DialogTitle id="customized-dialog-title">
				<p className="text-center text-xl font-bold text-theme tracking-wide">
					ADD DOCUMENT
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
								<p className="font-medium text-gray-700 mb-2">
									Document Title <span className="text-red-600">*</span>
								</p>
								<TextField
									size="small"
									fullWidth
									placeholder="Title"
									name="title"
									value={values.title}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.title && !!errors.title}
									helperText={touched.title && errors.title}
								/>
								{/* <p className="font-medium text-gray-700 my-2">
									Document Type <span className="text-red-600">*</span>
								</p>
								<div className="w-full">
									<TextField
										size="small"
										select
										fullWidth
										name="type"
										placeholder="Document Type"
										value={values.type}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.type && !!errors.type}
										helperText={touched.type && errors.type}
									>
										{types.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.name}
											</MenuItem>
										))}
									</TextField>
								</div> */}

								<p className="font-medium text-gray-700 my-2">
									Choose File <span className="text-red-600">*</span>
								</p>
								<TextField
									type="file"
									name="link"
									size="small"
									fullWidth
									placeholder="Choose Document"
									// value={values?.link}
									onBlur={handleBlur}
									error={touched.link && !!errors.link}
									helperText={touched.link && errors.link}
									// onChange={handleChange}
									// value={values?.link}
									onChange={(e: any) =>
										setFieldValue("link", e?.target?.files[0])
									}
								/>

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

export default AddDocumentDialogue;

const types = [
	{ id: 1, value: "pdf", name: "DOCUMENT" },
	{ id: 2, value: "img", name: "IMAGE" },
];
