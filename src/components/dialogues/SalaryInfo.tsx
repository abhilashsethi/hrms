import { Check, Close } from "@mui/icons-material";
import {
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
	Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useChange, useFetch } from "hooks";
import Swal from "sweetalert2";

interface Props {
	open: any;
	handleClose: any;
	mutate?: any;
	id?: any;
	data?: any;
}

const SalaryInfo = ({ open, handleClose, mutate, id, data }: Props) => {
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
					PAYROLL DETAILS
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
					Employ payroll details goes here!
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SalaryInfo;
