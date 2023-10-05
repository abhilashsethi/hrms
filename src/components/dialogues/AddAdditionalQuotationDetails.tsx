import { Check, Close } from "@mui/icons-material";
import {
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
	Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { Quotation, QuotationWork } from "types";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: () => void;
	mutate: () => void;
	data?: QuotationWork;
}

const validationSchema = Yup.object().shape({
	description: Yup.string().required("Description is required"),
	qty: Yup.number()
		.required("Quantity is required!")
		.positive("Qty must be a positive number"),
	cost: Yup.number()
		.required("Cost is required")
		.positive("Cost must be a positive number"),
});
const AddAdditionalQuotationDetails = ({
	open,
	data,
	handleClose,
	mutate,
}: Props) => {
	const { change } = useChange();
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState("one");
	const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};
	const initialValues = {
		description: "",
		qty: "",
		cost: 0,
	};

	const handleSubmit = async (values: any) => {
		setLoading(true);
		try {
			const timestamp = Date.now();
			const id = (timestamp % 100000).toString().padStart(6, "0");
			const resData = {
				id: id,
				description: values?.description,
				cost: Number(values?.cost),
				quantity: values?.qty,
			};
			const res = await change(`quotations/add-work/${data?.id}`, {
				body: resData,
			});
			console.log("after submit", res);
			setLoading(false);
			if (res?.status !== 200) {
				Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
				setLoading(false);
				return;
			}
			Swal.fire(`Success`, `Additional details add successfully!`, `success`);
			mutate();
			handleClose();
			return;
		} catch (error) {
			if (error instanceof Error) {
				Swal.fire(`Error`, error?.message, `error`);
			} else {
				Swal.fire(`Error`, "Something Went Wrong", `error`);
			}
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
			<DialogTitle id="customized-dialog-title">
				<p className="text-center text-xl font-bold text-theme tracking-wide">
					Additional Details
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
								<div className="my-4">
									<p className="font-medium text-gray-700">
										Enter Description<span className="text-red-600">*</span>
									</p>
									<TextField
										size="small"
										fullWidth
										placeholder="Description"
										name="description"
										value={values.description}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.description && !!errors.description}
										helperText={touched.description && errors.description}
									/>
								</div>

								<div className="my-4">
									<p className="font-medium text-gray-700 mt-2">
										Enter Qty<span className="text-red-600">*</span>
									</p>
									<TextField
										size="small"
										fullWidth
										placeholder="Qty"
										name="qty"
										value={values.qty}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.qty && !!errors.qty}
										helperText={touched.qty && errors.qty}
									/>
								</div>

								<div className="my-4">
									<p className="font-medium text-gray-700 mt-2">
										Enter Cost<span className="text-red-600">*</span>
									</p>
									<TextField
										size="small"
										fullWidth
										placeholder="Cost"
										type="number"
										name="cost"
										value={values.cost}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.cost && !!errors.cost}
										helperText={touched.cost && errors.cost}
									/>
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

export default AddAdditionalQuotationDetails;
