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
	meetingName: "",
	startTime: "",
	endTime: "",
	clientName: "",
	clientEmail: "",
	clientPhone: "",
	clientCountry: "",
	membersVisited: "",
};

const validationSchema = Yup.object().shape({
	meetingName: Yup.string().required("Meeting Name is Required"),
	startTime: Yup.string().required("Start Time is required"),
	endTime: Yup.string().required("End Time is required"),
	clientName: Yup.string().required("Client Name is required"),
	clientEmail: Yup.string().required("Client Email is required"),
	clientPhone: Yup.string().required("Client Phone is required"),
	clientCountry: Yup.string().required("Client Country is required"),
	membersVisited: Yup.string().required("Members Visited is required"),
});
const EditMeetingDetails = ({ open, handleClose }: Props) => {
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
									name="meetingName"
									value={values.meetingName}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.meetingName && !!errors.meetingName}
									helperText={touched.meetingName && errors.meetingName}
								/>

								<p className="font-medium text-gray-700 my-2">Start Time</p>
								<TextField
									size="small"
									fullWidth
									placeholder="Start Time"
									name="startTime"
									type="time"
									value={values.startTime}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.startTime && !!errors.startTime}
									helperText={touched.startTime && errors.startTime}
								/>
								<p className="font-medium text-gray-700 my-2">End Time</p>
								<TextField
									size="small"
									fullWidth
									placeholder="End Time"
									name="endTime"
									type="time"
									value={values.endTime}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.endTime && !!errors.endTime}
									helperText={touched.endTime && errors.endTime}
								/>
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
								<p className="font-medium text-gray-700 my-2">Client Country</p>
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
								/>
								<p className="font-medium text-gray-700 my-2">
									Members Visited
								</p>
								<TextField
									size="small"
									fullWidth
									placeholder="Members Visited"
									name="membersVisited"
									value={values.membersVisited}
									onChange={handleChange}
									onBlur={handleBlur}
									error={touched.membersVisited && !!errors.membersVisited}
									helperText={touched.membersVisited && errors.membersVisited}
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
