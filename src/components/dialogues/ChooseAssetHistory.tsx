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
	MenuItem,
	TextField,
	Tooltip,
} from "@mui/material";
import { ViewProjectsDrawer } from "components/drawer";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";

interface Props {
	open: boolean;
	handleClose: any;
	mutate?: any;
	setBranchId?: any;
}

const ChooseAssetHistory = ({
	open,
	handleClose,
	mutate,
	setBranchId,
}: Props) => {
	const [loading, setLoading] = useState(false);
	const [projects, setProjects] = useState(false);
	const [viewProjects, setViewProjects] = useState<any>(null);
	const [isBranch, setIsBranch] = useState<any>(null);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const { change } = useChange();
	const { data: branchData } = useFetch<any>(`branches`);
	const router = useRouter();
	const validationSchema = Yup.object().shape({
		type: Yup.string().required("Branch is required!"),
	});
	const initialValues = {
		type: "",
	};

	const handleSubmit = async (values: any) => {
		try {
			console.log(values);
			handleClose();
			setProjects(true);
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
					ASSET HISTORY
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
												Choose History Type
												<span className="text-red-500">*</span>
											</InputLabel>
										</div>
										<TextField
											size="small"
											select
											fullWidth
											name="type"
											placeholder="Document Type"
											value={values.type}
											onChange={handleChange}
											onBlur={handleBlur}
											error={touched.type && !!errors.type}
											helperText={touched.type && errors.type}
										>
											{Asset_History.map((option) => (
												<MenuItem key={option.value} value={option.value}>
													{option.name}
												</MenuItem>
											))}
										</TextField>
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

const Asset_History = [
	{ id: 1, value: "assignHistory", name: "Assign History" },
	{ id: 2, value: "returnHistory", name: "Return History" },
];

export default ChooseAssetHistory;
