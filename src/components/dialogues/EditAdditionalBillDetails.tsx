import { Check, Close, Settings } from "@mui/icons-material";
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
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Bills, BillsWork, Quotation, QuotationWork } from "types";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: () => void;
	mutate: () => void;
	data?: BillsWork;
	billData?: Bills;
}

const validationSchema = Yup.object().shape({
	description: Yup.string().required("Description is required"),
	sacCode: Yup.string().required("Sac Code is required!"),
	Amount: Yup.string().required("Amount is required!"),
});
const EditAdditionalBillDetails = ({
	open,
	data,
	handleClose,
	mutate,
	billData,
}: Props) => {
	const { change } = useChange();
	const [loading, setLoading] = useState(false);
	const initialValues = {
		description: `${data?.description ? data?.description : ""}`,
		sacCode: `${data?.SACcode ? data?.SACcode : ""}`,
		Amount: data?.Amount ? data?.Amount : 0,
	};

	const handleSubmit = async (values: any) => {
		console.log(values);
		setLoading(true);
		try {
			const resData = {
				description: values?.description,
				SACcode: values?.sacCode,
				Amount: Number(values?.Amount),
			};
			const res = await change(`bills/update-work/${data?.id}`, {
				method: "PATCH",
				body: {
					data: resData,
					billId: billData?.id,
				},
			});
			console.log("after submit", res);
			setLoading(false);
			if (res?.status !== 200) {
				Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
				setLoading(false);
				return;
			}
			Swal.fire(`Success`, `Bills updated successfully!`, `success`);
			mutate();
			handleClose();
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
			maxWidth="lg"
			open={open}
		>
			<DialogTitle
				id="customized-dialog-title"
				// sx={{ p: 2, minWidth: "40rem !important" }}
			>
				<p className="text-center text-xl font-bold text-theme tracking-wide">
					Edit Additional Details
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
							<Form>
								<div className="grid lg:grid-cols-1">
									<div className="lg:px-4 px-2 lg:py-2 py-1">
										<div className="lg:py-2 py-1">
											<InputLabel htmlFor="description">
												Description <span className="text-red-600">*</span>
											</InputLabel>
										</div>
										<TextField
											fullWidth
											size="small"
											id="description"
											// placeholder="% for basic salary"
											name="description"
											value={values.description}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.description && !!errors.description}
											helperText={touched.description && errors.description}
										/>
									</div>
									<div className="lg:px-4 px-2 lg:py-2 py-1">
										<div className="py-2">
											<InputLabel htmlFor="sacCode">
												SAC Code <span className="text-red-600">*</span>
											</InputLabel>
										</div>
										<TextField
											size="small"
											fullWidth
											// placeholder="% for sacCode"
											id="sacCode"
											name="sacCode"
											value={values.sacCode}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.sacCode && !!errors.sacCode}
											helperText={touched.sacCode && errors.sacCode}
										/>
									</div>
									<div className="lg:px-4 px-2 lg:py-2 py-1">
										<div className="py-2">
											<InputLabel htmlFor="Amount">
												Amount <span className="text-red-600">*</span>
											</InputLabel>
										</div>
										<TextField
											size="small"
											fullWidth
											type="number"
											// placeholder="% for PF"
											id="Amount"
											name="Amount"
											value={values.Amount}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.Amount && !!errors.Amount}
											helperText={touched.Amount && errors.Amount}
										/>
									</div>
								</div>
								<div className="flex justify-center lg:py-4 py-2">
									<Button
										type="submit"
										variant="contained"
										className="!bg-theme"
										disabled={loading}
										startIcon={
											loading ? (
												<CircularProgress size={20} color="warning" />
											) : (
												<Check />
											)
										}
									>
										UPDATE
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

export default EditAdditionalBillDetails;
