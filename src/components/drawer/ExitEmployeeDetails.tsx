import { makeStyles } from "@material-ui/core";
import { Close, ExitToApp, Info } from "@mui/icons-material";
import { Container, Drawer, IconButton, Tooltip } from "@mui/material";
import { CHATDOC, DOC, PDF } from "assets/home";
import { PhotoViewer } from "components/core";
import { DocPreview } from "components/dialogues";
import moment from "moment";
import { useState } from "react";
import { downloadFile } from "utils";

type Props = {
	open?: boolean | any;
	onClose: () => void;
	data?: any;
};
const useStyles = makeStyles((theme) => ({
	container: {
		width: "100vw",
		[theme.breakpoints.up("sm")]: {
			maxWidth: "50vw",
		},
		[theme.breakpoints.up("md")]: {
			maxWidth: "80vw",
		},
		[theme.breakpoints.up("lg")]: {
			maxWidth: "30vw",
		},
	},
}));

const ExitEmployeeDetails = ({ open, onClose, data }: Props) => {
	console.log(data);
	const classes = useStyles();

	return (
		<>
			<Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
				<Container style={{ marginTop: "1rem" }} className={classes.container}>
					<div className="flex justify-between">
						<h1 className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
							<ExitToApp />
							Employee Exit Details
						</h1>
						<IconButton onClick={() => onClose()}>
							<Close fontSize="small" className="text-red-500" />
						</IconButton>
					</div>
					<div>
						<h1 className="font-semibold mt-4">Exit Status</h1>
						<h2 className="text-gray-600">{data?.status}</h2>
						<h1 className="font-semibold mt-4">Exit Date</h1>
						<h2 className="text-gray-600">
							{moment(data?.createdAt).format("lll")}
						</h2>
						<h1 className="font-semibold mt-4">Reason</h1>
						<h2 className="text-gray-600">{data?.reason}</h2>
						<h1 className="font-semibold mt-4">Asset Returned</h1>
						<h2 className="text-gray-600">
							{data?.assetsReturn ? "Yes" : "No"}
						</h2>
						<h1 className="font-semibold mt-4">Non Disclosure Agreement</h1>
						<h2 className="text-gray-600">
							{data?.nonDisclouserAggrement ? "Yes" : "No"}
						</h2>
						<h1 className="font-semibold mt-4">Declaration</h1>
						<h2 className="text-gray-600">
							{data?.Declaration ? "Yes" : "No"}
						</h2>
						<h1 className="font-semibold mt-4">DOC Returned</h1>
						<h2 className="text-gray-600">{data?.docReturn ? "Yes" : "No"}</h2>
					</div>
					<h1 className="font-semibold my-4">Documents </h1>
					<div className="flex w-full">
						<div className="flex gap-2 flex-wrap">
							{data?.exitDocs?.length ? (
								data?.exitDocs?.map((item: any, i: number) => (
									<Tooltip title="Click to download">
										<div
											key={i}
											onClick={() => window.open(item)}
											className="h-20 w-20 border-2 rounded-md flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-slate-200 transition-all ease-in-out duration-200"
										>
											<img
												className="h-12 object-contain"
												src={DOC.src}
												alt="photo"
											/>
										</div>
									</Tooltip>
								))
							) : (
								<p>No documents Uploaded</p>
							)}
						</div>
					</div>
				</Container>
			</Drawer>
		</>
	);
};

export default ExitEmployeeDetails;
