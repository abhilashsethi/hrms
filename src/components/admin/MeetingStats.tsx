import { HeadText } from "components/core";
import React from "react";
import CircularProgress, {
	CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const MeetingStats = () => {
	function CircularProgressWithLabel(
		props: CircularProgressProps & { value: number }
	) {
		return (
			<Box sx={{ position: "relative", display: "inline-flex" }}>
				<CircularProgress size={80} variant="determinate" {...props} />
				<Box
					sx={{
						top: 0,
						left: 0,
						bottom: 0,
						right: 0,
						position: "absolute",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Typography
						variant="caption"
						component="div"
						color="text.secondary"
					>{`${Math.round(props.value)}%`}</Typography>
				</Box>
			</Box>
		);
	}
	const [progress, setProgress] = React.useState(80);

	return (
		<section className="w-full p-6 rounded-lg bg-white shadow-xl mt-4">
			<HeadText title="Employee Leaves" />

			<div className="flex gap-2 mt-2">
				<div className="w-1/3 h-28 flex justify-center shadow-md items-center flex-col gap-3 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-200">
					<p className="text-lg font-semibold tracking-wide">12</p>
					<p className="text-sm font-semibold tracking-wide text-green-700">
						APPROVED
					</p>
				</div>
				<div className="w-1/3 h-28 flex justify-center shadow-md items-center flex-col gap-3 rounded-lg bg-gradient-to-br from-red-400 to-red-200">
					<p className="text-lg font-semibold tracking-wide">0</p>
					<p className="text-sm font-semibold tracking-wide text-red-700">
						REJECTED
					</p>
				</div>
				<div className="w-1/3 h-28 flex justify-center shadow-md items-center flex-col gap-3 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-200">
					<p className="text-lg font-semibold tracking-wide">1</p>
					<p className="text-sm font-semibold tracking-wide text-yellow-700">
						PENDING
					</p>
				</div>
			</div>
		</section>
	);
};

export default MeetingStats;

const cards = [1, 2, 3, 4];
