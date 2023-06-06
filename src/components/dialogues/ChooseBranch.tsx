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

const ChooseBranch = ({ open, handleClose, mutate }: Props) => {
	const [loading, setLoading] = useState(false);
	const [isBranch, setIsBranch] = useState<any>(null);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const { change } = useChange();
	const { data: branchData } = useFetch<any>(`branches`);
	// console.log(branchData);
	const router = useRouter();
	const validationSchema = Yup.object().shape({
		branchId: Yup.string().required("Branch is required!"),
	});
	const initialValues = {
		branchId: "",
	};

	const handleSubmit = async (values: any) => {
		console.log(values);

		try {
			setLoading(true);
			// Swal.fire("Success", "Successfully submitted", "success");
			router?.push(`/admin/assets/create-assets?id=${values.branchId}`);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
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
					CHOOSE BRANCH
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
												Choose Branch<span className="text-red-500">*</span>
											</InputLabel>
										</div>
										<Autocomplete
											fullWidth
											size="small"
											id="branchId"
											options={branchData || []}
											getOptionLabel={(option: any) =>
												option.name ? option.name : ""
											}
											isOptionEqualToValue={(option, value) =>
												option.id === value.userId
											}
											value={
												values?.branchId
													? branchData?.find(
															(option: any) => option.id === values.branchId
													  )
													: {}
											}
											onChange={(e: any, r: any) => {
												setFieldValue("branchId", r?.id);
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
													placeholder="Branch Name"
													onBlur={handleBlur}
													error={touched.branchId && !!errors.branchId}
													helperText={touched.branchId && errors.branchId}
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

export default ChooseBranch;
