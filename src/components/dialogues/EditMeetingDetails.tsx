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
import CountrySelector from "components/core/CountrySelector";
import { Form, Formik, FormikValues } from "formik";
import { useChange, useFetch } from "hooks";
import moment from "moment";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { MeetingProps } from "types";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: () => void;
	meetingId: string | string[] | undefined;
	mutate: () => void;
}

const validationSchema = Yup.object().shape({
	title: Yup.string().required("Meeting Name is Required"),
	meetingStartTime: Yup.string().required("Start Time is required"),
	// meetingEndTime: Yup.string().required("End Time is required"),
	clientName: Yup.string().required("Client Name is required"),
	clientEmail: Yup.string().required("Client Email is required"),
	status: Yup.string().required("Meeting Status is required!"),
	clientPhone: Yup.string().required("Client Phone is required"),
	// clientCountry: Yup.string().required("Client Country is required"),
	meetingPersonName: Yup.string().required("Members Visited is required"),
});
const EditMeetingDetails = ({
	open,
	handleClose,
	meetingId,
	mutate,
}: Props) => {
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState("one");
	const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};
	const { data: meetingDetails, isLoading } = useFetch<MeetingProps>(
		`meetings/${meetingId}`
	);
	console.log(meetingDetails);

	const initialValues = {
		title: `${meetingDetails?.title ? meetingDetails?.title : ""}`,
		meetingDate: `${
			meetingDetails?.meetingDate ? meetingDetails?.meetingDate : ""
		}`,
		meetingStartTime: `${
			meetingDetails?.meetingStartTime ? meetingDetails?.meetingStartTime : ""
		}`,
		meetingEndTime: `${
			meetingDetails?.meetingEndTime ? meetingDetails?.meetingEndTime : ""
		}`,
		clientName: `${
			meetingDetails?.clientName ? meetingDetails?.clientName : ""
		}`,
		clientEmail: `${
			meetingDetails?.clientEmail ? meetingDetails?.clientEmail : ""
		}`,
		clientPhone: `${
			meetingDetails?.clientPhone ? meetingDetails?.clientPhone : ""
		}`,
		countryCode: meetingDetails?.countryCode
			? meetingDetails?.countryCode
			: "91" || null,
		// clientCountry: "",
		meetingPersonName: `${
			meetingDetails?.meetingPersonName ? meetingDetails?.meetingPersonName : ""
		}`,
		status: meetingDetails?.status,
	};

	const { change } = useChange();
	const handleSubmit = async (values: FormikValues) => {
		// console.log(meetingId);
		try {
			setLoading(true);
			const res = await change(`meetings/${meetingId}`, {
				method: "PATCH",
				body: {
					title: values?.title,
					clientName: values?.clientName,
					clientEmail: values?.clientEmail,
					clientPhone: values?.clientPhone,
					countryCode: values?.countryCode,
					meetingPersonName: values?.meetingPersonName,
					meetingDate: new Date(values?.meetingDate)?.toISOString(),
					meetingStartTime: values?.meetingStartTime,
					meetingEndTime: values?.meetingEndTime,
					status: values?.status,
				},
			});

			if (res?.status !== 200) {
				Swal.fire(`Error`, "Something went wrong!", "error");
				setLoading(false);
				return;
			}
			Swal.fire(`Success`, "Status updated successfully!!", "success");
			setLoading(false);
			mutate();
			handleClose();
			return;
		} catch (error) {
			if (error instanceof Error) {
				Swal.fire(`Error`, error?.message, `error`);
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
			<DialogTitle
				id="customized-dialog-title"
				// sx={{ p: 2, minWidth: "40rem !important" }}
			>
				<p className="text-center md:text-xl text-lg font-bold text-theme tracking-wide">
					EDIT MEETING DETAILS
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
								<p className="font-medium text-gray-700 mb-2">Meeting Name</p>
								<TextField
									size="small"
									fullWidth
									placeholder="Meeting Name"
									name="title"
									value={values.title}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.title && !!errors.title}
									helperText={touched.title && errors.title}
								/>

								<div className="">
									<div className="py-2">
										<p>
											Meeting Date <span className="text-red-600">*</span>
										</p>
									</div>

									<TextField
										size="small"
										fullWidth
										type="date"
										// placeholder="Client Address"
										id="meetingDate"
										name="meetingDate"
										value={moment(values.meetingDate)?.format("YYYY-MM-DD")}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.meetingDate && !!errors.meetingDate}
										helperText={touched.meetingDate && errors.meetingDate}
									/>
								</div>

								<div className="">
									<div className="py-2">
										<p>
											Meeting Start Time <span className="text-red-600">*</span>
										</p>
									</div>

									<TextField
										size="small"
										fullWidth
										type="time"
										// placeholder="Client Address"
										id="meetingStartTime"
										name="meetingStartTime"
										value={values.meetingStartTime}
										onChange={handleChange}
										onBlur={handleBlur}
										error={
											touched.meetingStartTime && !!errors.meetingStartTime
										}
										helperText={
											touched.meetingStartTime && errors.meetingStartTime
										}
									/>
								</div>
								<div className="">
									<div className="py-2">
										<p>Meeting End Time</p>
									</div>

									<TextField
										size="small"
										fullWidth
										type="time"
										// placeholder="Client Address"
										id="meetingEndTime"
										name="meetingEndTime"
										value={values.meetingEndTime}
										onChange={handleChange}
										onBlur={handleBlur}
										error={touched.meetingEndTime && !!errors.meetingEndTime}
										helperText={touched.meetingEndTime && errors.meetingEndTime}
									/>
								</div>
								<p className="font-medium text-gray-700 my-2">Client Name</p>
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
								<p className="font-medium text-gray-700 my-2">Client Email</p>
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
								<p className="font-medium text-gray-700 my-2">Country Code</p>
								<CountrySelector
									className="bg-white border border-gray-400 py-4"
									defaultValue="91"
									name="countryCode"
									onChange={(e: any, r: any) => {
										setFieldValue("countryCode", r?.phone);
									}}
									onBlur={handleBlur}
									value={values.countryCode}
									error={touched.countryCode && !!errors.countryCode}
									helperText={touched.countryCode && errors.countryCode}
								/>
								<p className="font-medium text-gray-700 my-2">Client Phone</p>
								<TextField
									fullWidth
									placeholder="Client Phone"
									name="clientPhone"
									value={values.clientPhone}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.clientPhone && !!errors.clientPhone}
									helperText={touched.clientPhone && errors.clientPhone}
								/>

								<div className="">
									<p className="font-medium text-gray-700 my-2">
										Status <span className="text-red-600">*</span>
									</p>

									<Autocomplete
										// sx={{ width: "100%" }}
										options={Status_Type || []}
										// autoHighlight
										getOptionLabel={(option: any) =>
											option.name ? option.name : ""
										}
										isOptionEqualToValue={
											(option: any, value: any) =>
												option.status === value.status
											// console.log(option, value)
										}
										value={
											values?.status
												? Status_Type?.find(
														(option: any) => option.status === values.status
												  )
												: {}
										}
										onChange={(e: any, r: any) => {
											setFieldValue("status", r?.status);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												placeholder="Select Status"
												inputProps={{
													...params.inputProps,
												}}
											/>
										)}
									/>
								</div>

								<p className="font-medium text-gray-700 my-2">
									Members Visited
								</p>
								<TextField
									size="small"
									fullWidth
									placeholder="Members Visited"
									name="meetingPersonName"
									value={values.meetingPersonName}
									onChange={handleChange}
									onBlur={handleBlur}
									error={
										touched.meetingPersonName && !!errors.meetingPersonName
									}
									helperText={
										touched.meetingPersonName && errors.meetingPersonName
									}
								/>

								<div className="flex justify-center mt-4">
									<Button
										type="submit"
										className="!bg-theme"
										variant="contained"
										disabled={loading}
										startIcon={
											loading ? (
												<CircularProgress size={20} color="secondary" />
											) : (
												<Check />
											)
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

export default EditMeetingDetails;
const leavesType = [
	{ id: 1, value: "First_Half" },
	{ id: 2, value: "Second_Half" },
];
const Status_Type = [
	{
		id: 1,
		name: "Ongoing",
		status: "Ongoing",
	},
	{
		id: 2,
		name: "InPipeline",
		status: "InPipeline",
	},
	{
		id: 3,
		name: "QuotationSent",
		status: "QuotationSent",
	},
	{
		id: 4,
		name: "Closed",
		status: "Closed",
	},
];
