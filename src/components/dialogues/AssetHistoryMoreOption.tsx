import { Check, Close } from "@mui/icons-material";
import {
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Tooltip,
} from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import { useFormik } from "formik";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

interface Props {
	open: any;
	handleClose: any;
	data?: any;
	item?: any;
}

const AssetHistoryMoreOption = ({ open, data, item, handleClose }: Props) => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { change } = useChange();
	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			open={open}
		>
			<DialogTitle
				id="customized-dialog-title"
				// sx={{ p: 2, minWidth: "28rem !important" }}
			>
				<p className="text-center text-xl font-bold text-theme tracking-wide">
					RETURN ASSET DETAILS
				</p>
			</DialogTitle>
			<DialogContent className="app-scrollbar" sx={{ p: 2 }}>
				<div className="w-[28rem] md:w-full md:px-4 px-2 tracking-wide">
					<div className="">
						<p className="font-semibold text-blue-700">
							Is Broken :{" "}
							{item?.isBroken ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
						<p className="font-semibold text-blue-700">
							Keyboard Works :{" "}
							{item?.isAllKeyboardButtonWork ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
						<p className="font-semibold text-blue-700">
							All Ports Work :{" "}
							{item?.isAllPortsWork ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
						<p className="font-semibold text-blue-700">
							All Rubber Pads Attached :{" "}
							{item?.isAllRubberPadsAttached ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
						<p className="capitalize font-semibold text-blue-700">
							all screws are present :{" "}
							{item?.isAllScrewArePresent ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
						<p className="capitalize font-semibold text-blue-700">
							brightness button works :{" "}
							{item?.isBrightnessFunctionWork ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
						<p className="capitalize font-semibold text-blue-700">
							camera works :{" "}
							{item?.isCameraWork ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
						<p className="capitalize font-semibold text-blue-700">
							Charging Works :{" "}
							{item?.isChargingFunctionWork ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
						<p className="capitalize font-semibold text-blue-700">
							internet connectivity :{" "}
							{item?.isConnectionToInternetWork ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
						<p className="capitalize font-semibold text-blue-700">
							HDMI cable include :{" "}
							{item?.isHDMICableInclude ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
						<p className="capitalize font-semibold text-blue-700">
							left click works :{" "}
							{item?.isLeftClickWork ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
						<p className="capitalize font-semibold text-blue-700">
							Right click works :{" "}
							{item?.isRightClickWork ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
						<p className="capitalize font-semibold text-blue-700">
							Scroll wheel works :{" "}
							{item?.isScrollWheelWork ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
						<p className="capitalize font-semibold text-blue-700">
							power adapter include :{" "}
							{item?.isPowerAdapterInclude ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>

						<p className="capitalize font-semibold text-blue-700">
							power on/off :{" "}
							{item?.isPowerOnOff ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
						<p className="capitalize font-semibold text-blue-700">
							Speaker Works :{" "}
							{item?.isSpeakerWork ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
						<p className="capitalize font-semibold text-blue-700">
							Is Any Dent :{" "}
							{item?.isThereAnyMejorScratchOrDent ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
						<p className="capitalize font-semibold text-blue-700">
							Track pad works :{" "}
							{item?.isTrackPadWork ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
						<p className="capitalize font-semibold text-blue-700">
							USB port works :{" "}
							{item?.isUSBReceiverWork ? (
								<span className="text-black font-medium">Yes</span>
							) : (
								<span className="text-black font-medium">No</span>
							)}
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AssetHistoryMoreOption;
