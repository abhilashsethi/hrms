import { Check, Close } from "@mui/icons-material";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
	Tooltip,
	FormControlLabel,
	Radio,
	RadioGroup,
	CircularProgress,
	MenuItem,
} from "@mui/material";
import { FileUpload } from "components/core";
import { Formik, Form, ErrorMessage } from "formik";
import { ChangeEvent, useState } from "react";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: any;
}
const initialValues = {
	name: "",
	leavesType: "",
	to: "",
	from: "",
	date: "",
	message: "",
};

const validationSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	message: Yup.string().required("Message is required"),
});
const AddDocument = ({ open, handleClose }: Props) => {
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState("one");
	const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};
	const handleSubmit = async (values: any) => {
		console.log(values);
		return;
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
								<FileUpload
									values={values}
									setImageValue={(event: any) => {
										setFieldValue("image", event.currentTarget.files[0]);
									}}
								>
									<ErrorMessage name="image" />
								</FileUpload>
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

export default AddDocument;
const leavesType = [
	{ id: 1, value: "First_Half" },
	{ id: 2, value: "Second_Half" },
];
