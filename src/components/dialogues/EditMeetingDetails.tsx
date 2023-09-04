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
import { useChange, useFetch } from "hooks";
import moment from "moment";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { MeetingProps } from "types";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: any;
	meetingId?: any;
	mutate?: any;
}

const validationSchema = Yup.object().shape({
	title: Yup.string().required("Meeting Name is Required"),
	meetingStartTime: Yup.string().required("Start Time is required"),
	meetingEndTime: Yup.string().required("End Time is required"),
	clientName: Yup.string().required("Client Name is required"),
	clientEmail: Yup.string().required("Client Email is required"),
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
		// clientCountry: "",
		meetingPersonName: `${
			meetingDetails?.meetingPersonName ? meetingDetails?.meetingPersonName : ""
		}`,
	};

	const { change } = useChange();
	const handleSubmit = async (values: any) => {
		// console.log(meetingId);
		Swal.fire({
			title: "Are you sure?",
			text: "You want to update status?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, update!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const res = await change(`meetings/${meetingId}`, {
					method: "PATCH",
					body: {
						title: values?.title,
						clientName: values?.clientName,
						clientEmail: values?.clientEmail,
						clientPhone: values?.clientPhone,
						meetingPersonName: values?.meetingPersonName,
						meetingDate: values?.meetingDate,
						meetingStartTime: new Date(values?.meetingStartTime).toISOString(),
						meetingEndTime: new Date(values?.meetingEndTime).toISOString(),
					},
				});
				mutate();
				// handleClose();
				handleClose();
				if (res?.status !== 200) {
					Swal.fire(`Error`, "Something went wrong!", "error");
					return;
				}
				Swal.fire(`Success`, "Status updated successfully!!", "success");
				return;
			}
		});
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
								{/* {console.log(values)} */}
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

								<div className="md:px-4 px-2 md:py-2 py-1">
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

								<div className="px-4 py-2">
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
										value={moment(values.meetingStartTime)?.format("HH:mm")}
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
								<div className="px-4 py-2">
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
										value={moment(values.meetingEndTime)?.format("HH:mm")}
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
								<p className="font-medium text-gray-700 my-2">Client Phone</p>
								<TextField
									size="small"
									fullWidth
									placeholder="Client Phone"
									name="clientPhone"
									value={values.clientPhone}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.clientPhone && !!errors.clientPhone}
									helperText={touched.clientPhone && errors.clientPhone}
								/>
								{/* <p className="font-medium text-gray-700 my-2">Client Country</p>
								<TextField
									size="small"
									fullWidth
									placeholder="Client Country"
									name="clientCountry"
									value={values.clientCountry}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.clientCountry && !!errors.clientCountry}
									helperText={touched.clientCountry && errors.clientCountry}
								/> */}
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

export default EditMeetingDetails;
const leavesType = [
	{ id: 1, value: "First_Half" },
	{ id: 2, value: "Second_Half" },
];
