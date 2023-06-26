import { Check, Close } from "@mui/icons-material";
import {
	Autocomplete,
	Box,
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
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: any;
	mutate?: any;
}

const CreateTenderMember = ({ open, handleClose, mutate }: Props) => {
	const [loading, setLoading] = useState(false);
	const { change } = useChange();
	const { data: userData } = useFetch<any>(`users`);
	// console.log(userData);
	const router = useRouter();
	const validationSchema = Yup.object().shape({
		userId: Yup.string().required("User is required!"),
	});
	const initialValues = {
		userId: "",
	};

	const handleSubmit = async (values: any) => {
		console.log(values);


	};

	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			open={open}
		>
			<DialogTitle
				id="customized-dialog-title"
				sx={{ p: 2, minWidth: "18rem !important" }}
			>
				<p className="text-center text-xl font-bold text-theme tracking-wide">
					CHOOSE MEMBER
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
				<div className="md:w-[22rem] w-[72vw] md:px-4 px-2 tracking-wide">
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
								<div className="px-4 py-2">
									<div className="px-4 py-2">
										<div className="py-2">
											<InputLabel htmlFor="name">
												Choose Member<span className="text-red-500">*</span>
											</InputLabel>
										</div>
										<Autocomplete
											fullWidth
											size="small"
											id="userId"
											options={userData || []}
											getOptionLabel={(option: any) =>
												option.name ? option.name : ""
											}
											isOptionEqualToValue={(option, value) =>
												option.id === value.userId
											}
											value={
												values?.userId
													? userData?.find(
														(option: any) => option.id === values.userId
													)
													: {}
											}
											onChange={(e: any, r: any) => {
												setFieldValue("userId", r?.id);
											}}
											renderOption={(props, option) => (
												<Box
													component="li"
													sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
													{...props}
												>
													{option.name}
												</Box>
											)}
											renderInput={(params) => (
												<TextField
													{...params}
													placeholder="Member Name"
													onBlur={handleBlur}
													error={touched.userId && !!errors.userId}
													helperText={touched.userId && errors.userId}
												/>
											)}
										/>
									</div>
								</div>
								<div className="flex justify-center py-4">
									<Button
										type="submit"
										variant="contained"
										className="!bg-theme"
										disabled={loading}
										startIcon={
											loading ? <CircularProgress size={20} /> : <Check />
										}
									>
										Submit
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

export default CreateTenderMember;
