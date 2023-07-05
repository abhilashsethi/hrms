import { Check, Close } from "@mui/icons-material";
import {
	Autocomplete,
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
import { useAuth, useChange } from "hooks";
import { ChangeEvent, useState } from "react";
import { Quotation } from "types";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: any;
	mutate?: any;
	data?: Quotation;
}

const validationSchema = Yup.object().shape({
	statusType: Yup.string().required("Select status"),
	clientName: Yup.string().required("Client name is required!"),
	clientEmail: Yup.string().email().required("Client Email is required!"),
	clientAddress: Yup.string().required("Client address is required!"),
	quotationTitle: Yup.string().required("Quotation Title is required!"),
});
const EditQuotationDetails = ({
	open,
	handleClose,
	mutate,
	data,
}: Props) => {
	// console.log(details);
	const [loading, setLoading] = useState(false);

	const initialValues = {
		statusType: `${data?.status ? data?.status : ""}`,
		clientName: `${data?.clientName ? data?.clientName : ""}`,
		clientEmail: `${data?.clientEmail ? data?.clientEmail : ""}`,
		clientAddress: `${data?.clientAddress ? data?.clientAddress : ""}`,
		quotationTitle: `${data?.quotationTitle ? data?.quotationTitle : ""}`,
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
									Select Quotation Status
									<span className="text-red-600">*</span>
								</p>
								<Autocomplete
									fullWidth
									size="small"
									id="statusType"
									options={Status_Type || []}
									onChange={(e: any, r: any) => {
										setFieldValue("statusType", r?.name);
									}}
									getOptionLabel={(option: any) => option.name}
									renderInput={(params) => (
										<TextField
											{...params}
											// placeholder="Selected Gender"
											onBlur={handleBlur}
											error={touched.statusType && !!errors.statusType}
											helperText={touched.statusType && errors.statusType}
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
										Enter Quotation Title<span className="text-red-600">*</span>
									</p>
									<TextField
										size="small"
										fullWidth
										placeholder="Quotation Title"
										name="quotationTitle"
										value={values.quotationTitle}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.quotationTitle && !!errors.quotationTitle}
										helperText={touched.quotationTitle && errors.quotationTitle}
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

export default EditQuotationDetails;
const Status_Type = [
	{
		id: 1,
		name: "Accepted",
		value: "accepted",
	},
	{
		id: 2,
		name: "Rejected",
		value: "rejected",
	},
	{
		id: 3,
		name: "Modified",
		value: "modified",
	},
];