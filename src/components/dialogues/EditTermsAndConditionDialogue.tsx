import { Check, Close } from "@mui/icons-material";
import {
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	FormHelperText,
	IconButton,
	TextField,
	Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import { ChangeEvent, useState } from "react";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import { Quotation } from "types";

interface Props {
	open: boolean;
	handleClose: any;
	mutate?: any;
	data?: Quotation;
}

const validationSchema = Yup.object().shape({
	text: Yup.string().required("Text is required!"),
});
const EditTermsAndConditionDialogue = ({ open, data, handleClose }: Props) => {
	// console.log(details);
	const ReactQuill = dynamic(import("react-quill"), { ssr: false });
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState("one");
	const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};

	const initialValues = {
		text: `${data?.termsAndConditions ? data?.termsAndConditions : ""}`,
	};

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
					Edit Terms & Conditions
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
							setFieldTouched,
						}) => (
							<Form className="w-full">
								<div className="mt-3 text-gray-500 px-4">
									<p>
										Terms & Conditions <span className="text-red-600">*</span>
									</p>
									<ReactQuill
										id="text"
										placeholder="Terms & Conditions ..."
										theme="snow"
										value={values.text}
										onBlur={() => setFieldTouched("text", true)}
										onChange={(value) => setFieldValue("text", value)}
										className="lg:h-[150px] w-full bg-white"
									/>
									{Boolean(touched?.text && errors?.text) && (
										<FormHelperText error={true}>
											{touched?.text && errors?.text}
										</FormHelperText>
									)}
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

export default EditTermsAndConditionDialogue;
