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
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: any;
	details?: any;
	mutate?: any;
}

const validationSchema = Yup.object().shape({
	statusType: Yup.string().required("Select status"),
	clientName: Yup.string().required("Client name is required!"),
	clientEmail: Yup.string().email().required("Client Email is required!"),
	clientAddress: Yup.string().required("Client address is required!"),
	quotationTitle: Yup.string().required("Quotation Title is required!"),
	quotationNumber: Yup.string().required("Quotation Number is required!"),
});
const EditQuotationDetails = ({
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
	const [isStatusType, setIsStatusType] = useState<string>("");
	const { user } = useAuth();
	// console.log(user);
	// console.log(details);
	const initialValues = {
		statusType: "",
		clientName: "",
		clientEmail: "",
		clientAddress: "",
		quotationTitle: "",
		quotationNumber: "",
	};

	const { change } = useChange();
	const handleSubmit = async (values: any) => {
		console.log(values);
	};

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
					Edit Quotation Details
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
										setIsStatusType(r?.value);
									}}
									getOptionLabel={(option: any) => option.name}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Bill Type"
											// placeholder="Selected Gender"
											onBlur={handleBlur}
											error={touched.statusType && !!errors.statusType}
											helperText={touched.statusType && errors.statusType}
										/>
									)}
								/>

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
								<p className="font-medium text-gray-700 mt-2">
									Enter Quotation Number<span className="text-red-600">*</span>
								</p>
								<TextField
									size="small"
									fullWidth
									placeholder="Quotation Number"
									name="quotationNumber"
									value={values.quotationNumber}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.quotationNumber && !!errors.quotationNumber}
									helperText={touched.quotationNumber && errors.quotationNumber}
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

export default EditQuotationDetails;
