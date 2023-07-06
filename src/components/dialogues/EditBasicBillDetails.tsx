import { Check, Close } from "@mui/icons-material";
import {
	Autocomplete,
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	IconButton,
	Radio,
	RadioGroup,
	TextField,
	Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { Quotation } from "types";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: () => void;
	mutate: () => void;
	data?: Quotation;
}
interface QuotationInput {
	status: string;
	clientName: string;
	clientEmail: string;
	clientAddress: string;
	billAmount: string;
	invoiceNumber: string;
	invoiceDate: string;
	invoiceDueDate: string;
}
const validationSchema = Yup.object().shape({
	status: Yup.string().required("Select status"),
	clientName: Yup.string().required("Client name is required!"),
	clientEmail: Yup.string().email().required("Client email is required!"),
	clientAddress: Yup.string().required("Client address is required!"),
	billAmount: Yup.string().required("Bill amount is required!"),
	invoiceNumber: Yup.string().required("Invoice Number is required!"),
	invoiceDate: Yup.string().required("Invoice Date is required!"),
	invoiceDueDate: Yup.string().required("Invoice Due Date is required!"),
});
const EditBasicBillDetails = ({ open, handleClose, mutate, data }: Props) => {
	const [isCgst, setIsCgst] = useState(true);
	const [isSgst, setIsSgst] = useState(true);
	const [loading, setLoading] = useState(false);
	const [isGstValue, setIsGstValue] = useState(false);
	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsGstValue(event.target.value === "IGST");
		setIsCgst(event.target.value !== "IGST");
		setIsSgst(event.target.value !== "IGST");
	};
	const initialValues = {
		status: `${data?.status ? data?.status : null}`,
		clientName: `${data?.clientName ? data?.clientName : ""}`,
		clientEmail: `${data?.clientEmail ? data?.clientEmail : ""}`,
		clientAddress: `${data?.clientAddress ? data?.clientAddress : ""}`,
		billAmount: `${data?.quotationTitle ? data?.quotationTitle : ""}`,
		invoiceNumber: "",
		invoiceDate: "",
		invoiceDueDate: "",
	};
	const { change } = useChange();
	const handleSubmit = async (values: QuotationInput) => {
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
					Edit Basic Details
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
								<p className="font-medium text-gray-700 mt-2">
									Select Bill Status
									<span className="text-red-600">*</span>
								</p>
								<Autocomplete
									fullWidth
									size="small"
									id="status"
									options={Status_Type || []}
									onChange={(e: any, r: any) => {
										setFieldValue("status", r?.name);
									}}
									value={
										values?.status
											? Status_Type?.find(
													(option: any) => option.value === values.status
											  )
											: {}
									}
									getOptionLabel={(option: any) => option.name}
									renderInput={(params) => (
										<TextField
											{...params}
											// placeholder="Selected Gender"
											onBlur={handleBlur}
											error={touched.status && !!errors.status}
											helperText={touched.status && errors.status}
										/>
									)}
								/>

								<div className="my-4">
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
								</div>

								<div className="my-4">
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
								</div>
								<div className="my-4">
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
								</div>
								<div className="my-4">
									<p className="font-medium text-gray-700 mt-2">
										Enter Bill amount<span className="text-red-600">*</span>
									</p>
									<TextField
										size="small"
										fullWidth
										placeholder="Bill amount"
										name="billAmount"
										value={values.billAmount}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.billAmount && !!errors.billAmount}
										helperText={touched.billAmount && errors.billAmount}
									/>
								</div>
								<div className="my-4">
									<p className="font-medium text-gray-700 mt-2">
										Enter Invoice Number<span className="text-red-600">*</span>
									</p>
									<TextField
										size="small"
										fullWidth
										placeholder="Invoice Number"
										name="billAmount"
										value={values.billAmount}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.billAmount && !!errors.billAmount}
										helperText={touched.billAmount && errors.billAmount}
									/>
								</div>
								<div className="my-4">
									<p className="font-medium text-gray-700 mt-2">
										Enter Invoice Date<span className="text-red-600">*</span>
									</p>
									<TextField
										size="small"
										fullWidth
										type="date"
										placeholder="Invoice Date"
										name="invoiceDate"
										value={values.invoiceDate}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.invoiceDate && !!errors.invoiceDate}
										helperText={touched.invoiceDate && errors.invoiceDate}
									/>
								</div>
								<div className="my-4">
									<p className="font-medium text-gray-700 mt-2">
										Enter Invoice Due Date
										<span className="text-red-600">*</span>
									</p>
									<TextField
										size="small"
										fullWidth
										type="date"
										placeholder="Invoice Due Date"
										name="invoiceDueDate"
										value={values.invoiceDueDate}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.invoiceDueDate && !!errors.invoiceDueDate}
										helperText={touched.invoiceDueDate && errors.invoiceDueDate}
									/>
								</div>
								<div className="my-3 px-4">
									<p className="text-gray-500">
										Please choose tax option{" "}
										<span className="text-red-600">*</span>
									</p>
									<RadioGroup
										defaultValue={data?.isIgst ? "IGST" : "SGST"}
										row
										name="isGstValue"
										onChange={handleOptionChange}
									>
										<FormControlLabel
											value="IGST"
											control={<Radio />}
											label="IGST"
										/>
										<FormControlLabel
											value="SGST"
											control={<Radio />}
											label="SGST & CGST"
										/>
									</RadioGroup>
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

export default EditBasicBillDetails;
const Status_Type = [
	{
		id: 1,
		name: "Accepted",
		value: "Accepted",
	},
	{
		id: 2,
		name: "Rejected",
		value: "Rejected",
	},
	{
		id: 3,
		name: "Modified",
		value: "Modified",
	},
];
