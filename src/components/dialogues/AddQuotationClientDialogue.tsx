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
} from "@mui/material";
import { FileUpload } from "components/core";
import { Formik, Form, ErrorMessage } from "formik";
import { useAuth, useChange } from "hooks";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { uploadFile } from "utils";
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
});
const AddQuotationClientDialogue = ({
	open,
	handleClose,
	details,
	mutate,
}: Props) => {
	// console.log(details);
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState("one");
	const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};
	const { user } = useAuth();
	// console.log(user);
	// console.log(details);
	const initialValues = {
		clientName: "",
		clientEmail: "",
		clientAddress: "",
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
					Add Client
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
									Enter Client Name<span className="text-red-600">*</span>
								</p>
								<TextField
									size="small"
									fullWidth
									placeholder="Client Name"
									name="clientName"
									value={values.clientName}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.clientName && !!errors.clientName}
									helperText={touched.clientName && errors.clientName}
								/>

								<p className="font-medium text-gray-700 mt-2">
									Enter Client Email<span className="text-red-600">*</span>
								</p>
								<TextField
									size="small"
									fullWidth
									placeholder="Client Email"
									name="clientEmail"
									value={values.clientEmail}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.clientEmail && !!errors.clientEmail}
									helperText={touched.clientEmail && errors.clientEmail}
								/>
								<p className="font-medium text-gray-700 mt-2">
									Enter Client Address<span className="text-red-600">*</span>
								</p>
								<TextField
									size="small"
									fullWidth
									placeholder="Client Address"
									name="clientAddress"
									value={values.clientAddress}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.clientAddress && !!errors.clientAddress}
									helperText={touched.clientAddress && errors.clientAddress}
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

export default AddQuotationClientDialogue;
const leavesType = [
	{ id: 1, value: "First_Half" },
	{ id: 2, value: "Second_Half" },
];
