import { Close, Delete, FileDownload } from "@mui/icons-material";
import {
	Button,
	Card,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Tooltip,
} from "@mui/material";
import { useRouter } from "next/router";

interface Props {
	open?: any;
	handleClose?: any;
	mutate?: any;
	title?: string;
	data?: any;
	activeLink?: any;
}

const DocPreview = ({
	open,
	handleClose,
	mutate,
	title,
	data,
	activeLink,
}: Props) => {
	// console.log(data);
	const router = useRouter();
	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			open={open}
		>
			<DialogTitle
				id="customized-dialog-title"
				sx={{ p: 2, minWidth: "35rem !important" }}
			>
				<p className="text-center text-xl text-theme tracking-wide">{title}</p>
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
				<div className="md:w-full w-full md:px-4 px-2 tracking-wide">
					<div className="py-4 w-full flex justify-center items-center">
						<iframe
							src={activeLink ? activeLink : ``}
							width="100%"
							height="500"
							title="Document Preview"
						/>
					</div>
				</div>
				<div className="flex gap-2 items-center justify-center">
					<Button
						variant="contained"
						className="!bg-blue-500"
						startIcon={<FileDownload />}
					>
						<a href={""}>DOWNLOAD</a>
					</Button>
					<Button
						variant="contained"
						className="!bg-red-500"
						startIcon={<Delete />}
					>
						DELETE
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DocPreview;
