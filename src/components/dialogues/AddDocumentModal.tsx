import { Check, Close } from "@mui/icons-material";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
	Tooltip,
	CircularProgress,
	MenuItem,
} from "@mui/material";
import { FileUpload } from "components/core";
import { Formik, Form, ErrorMessage } from "formik";
import { useAuth, useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import { uploadFile } from "utils";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: any;
	// details?: any;
	mutate?: any;
}

const validationSchema = Yup.object().shape({
	title: Yup.string().required("Document title is Required"),
	link: Yup.string().required("Choose Document"),
	// docType: Yup.string().required("Note Doc type is required"),
});
const AddDocumentModal = ({ open, handleClose, mutate }: Props) => {
	// console.log(details);
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState("one");
	const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};
	const { user } = useAuth();
	// console.log(user);
	// console.log(details);
	const initialValues = {
		title: "",
		link: null,
		// docType: "",
		type: "",
	};

	const { change } = useChange();
	const handleSubmit = async (values: any) => {
		// console.log(values);
		const dtype = values?.link?.type.split("/")[1];
		// console.log(dtype);
		Swal.fire({
			title: "Are you sure?",
			text: "You want to Add Document?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, update!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const url = await uploadFile(values?.link, `${Date.now()}.${dtype}`);
				// console.log(url);

				const res = await change(`projects/add-doc/${router?.query?.id}`, {
					method: "POST",
					body: {
						title: values.title,
						link: url,
						docType: values.type,
					},
				});

				if (res?.status !== 200) {
					Swal.fire(`Error`, "Something went wrong!", "error");
					return;
				}
				mutate();
				Swal.fire(`Success`, "Status Added successfully!!", "success");
				handleClose();
				return;
			}
		});
	};

	const {
		data: documentDetails,
		mutate: docMutate,
		isLoading,
	} = useFetch<any>(`users`);

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
					ADD DOCUMENTS
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
								<p className="font-medium text-gray-700 mb-2">Document Title</p>
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

								<p className="font-medium text-gray-700 my-2">Document Type</p>
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
								</div>

								<p className="font-medium text-gray-700 my-2">Choose File</p>
								<input
									type="file"
									name="link"
									placeholder="Choose Document"
									// value={values?.link}
									onChange={(e: any) =>
										setFieldValue("link", e?.target?.files[0])
									}
								/>
								{/* {values.link && (
									<img
										className="w-24 object-contain"
										src={URL.createObjectURL(values.link)}
										alt="Preview"
									/>
								)} */}

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

export default AddDocumentModal;
const types = [
	{ id: 1, value: "pdf", name: "PDF" },
	{ id: 2, value: "img", name: "IMAGE" },
];
