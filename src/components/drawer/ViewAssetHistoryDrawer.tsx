import { makeStyles } from "@material-ui/core";
import { Close } from "@mui/icons-material";
import {
	Button,
	Container,
	Drawer,
	IconButton,
	InputLabel,
	MenuItem,
	TextField,
} from "@mui/material";
import { ProjectDrawerSkeletonLoading } from "components/admin/clients";
import { Form, Formik } from "formik";
import { useFetch } from "hooks";
import moment from "moment";
import { useState } from "react";
import Slider from "react-slick";
import * as Yup from "yup";

type Props = {
	open?: boolean | any;
	onClose: () => void;
	setViewProject?: any;
	assetId?: any;
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

const settings = {
	dots: false,
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	speed: 400,
	cssEase: "linear",
	autoplaySpeed: 3000,
	pauseOnHover: false,
	arrows: false,
	responsive: [
		{
			breakpoint: 940,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				arrows: false,
			},
		},
		{
			breakpoint: 760,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				arrows: false,
			},
		},
	],
};

const ViewAssetHistoryDrawer = ({
	open,
	onClose,
	setViewProject,
	assetId,
	data,
}: Props) => {
	const [history, setHistory] = useState(false);
	const classes = useStyles();
	const { data: assignId, isLoading } = useFetch<any>(
		`assets/all/return/asset/${assetId}`
	);

	// console.log(data);

	const validationSchema = Yup.object().shape({
		type: Yup.string().required("Branch is required!"),
	});
	const initialValues = {
		type: "returnHistory",
	};
	const handleSubmit = async (values: any) => {
		try {
			if (values.type == "assignHistory") {
				setHistory(true);
			}
			if (values.type == "returnHistory") {
				setHistory(false);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
				<Container style={{ marginTop: "1rem" }} className={classes.container}>
					{/* Drawer Element */}
					<div className="flex items-center justify-between ">
						<p className="text-lg font-bold text-theme">Asset History</p>
						<IconButton onClick={() => onClose()}>
							<Close
								fontSize="small"
								className="text-red-500 block md:hidden"
							/>
						</IconButton>
					</div>

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
										>
											Submit
										</Button>
									</div>
								</Form>
							)}
						</Formik>
					</div>
					{history ? (
						<div className="mt-2 flex flex-col gap-4">
							<div className="">
								<div
									className={`w-full h-full  rounded-l-xl shadow-xl px-2 py-2 bg-[#edf4fe] my-3`}
								>
									<div className="w-full order-2 border border-gray-500 rounded-md p-[1px] mb-2">
										<Slider {...settings} className="">
											{data?.assignTimePhotos?.map((data: any, k: any) => (
												<img
													key={k}
													className="w-full object-cover object-center 
											transition duration-500 ease-in-out transform group-hover:scale-105"
													src={data}
													alt="assets"
												/>
											))}
										</Slider>
									</div>
									<div className="flex flex-col gap-1 font-semibold text-blue-700">
										<div className="">
											Assigned User :{" "}
											<span className="text-black font-medium">
												{data?.assignUser?.name}
											</span>
										</div>
										<div className="gap-2">
											Date Of Assign :{" "}
											<span className="text-black font-medium">
												{moment(data?.dateOfAssign)?.format("DD/MM/YYYY")}
											</span>
										</div>

										<div className="gap-2">
											Date Of Return :{" "}
											<span className="text-black font-medium">
												{data?.dateOfReturn
													? moment(data?.dateOfReturn)?.format("DD/MM/YYYY")
													: "Not Specified"}
											</span>
										</div>
										<div className="gap-2">
											Time Of Assign :{" "}
											<span className="text-black font-medium">
												{data?.assignTime
													? moment(data?.assignTime)?.format("LT")
													: "Not Specified"}
											</span>
										</div>
										<div className="gap-2">
											Reason :{" "}
											<span className="text-black font-medium">
												{data?.reasonForAssign}
											</span>
										</div>
										<div className="gap-2">
											Remarks :{" "}
											<span className="text-black font-medium">
												{data?.assignRemark}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<>
							<div className="mt-2 flex flex-col gap-4">
								{isLoading && <ProjectDrawerSkeletonLoading />}
								{data?.map((item: any, i: any) => {
									return (
										<div
											className={`w-full h-full  rounded-l-xl shadow-xl px-2 py-2 bg-gradient-to-r from-rose-100 to-teal-100 my-3`}
										>
											<div className="w-full order-2 border border-gray-500 rounded-md p-[1px] mb-2">
												{item?.returnTimePhotos?.length ? (
													<Slider {...settings} className="">
														{item?.returnTimePhotos?.map(
															(data: any, k: any) => (
																<img
																	key={k}
																	className="w-full object-cover object-center 
											transition duration-500 ease-in-out transform group-hover:scale-105"
																	src={data}
																	alt="assets"
																/>
															)
														)}
													</Slider>
												) : (
													<p className="text-center">No Photos Available</p>
												)}
											</div>
											<div className="flex flex-col gap-1 font-semibold text-blue-700">
												<div className="">
													Returned User :{" "}
													<span className="text-black font-medium">
														{item?.assignUser?.name}
													</span>
												</div>
												<div className="gap-2">
													Date Of Assign :{" "}
													<span className="text-black font-medium">
														{moment(item?.dateOfAssign)?.format("DD/MM/YYYY")}
													</span>
												</div>

												<div className="gap-2">
													Date Of Return :{" "}
													<span className="text-black font-medium">
														{item?.dateOfReturn
															? moment(data?.dateOfReturn)?.format("DD/MM/YYYY")
															: "Not Specified"}
													</span>
												</div>
												<div className="gap-2">
													Time Of Assign :{" "}
													<span className="text-black font-medium">
														{item?.assignTime}
													</span>
												</div>
												<div className="gap-2">
													Reason :{" "}
													<span className="text-black font-medium">
														{item?.reasonForAssign}
													</span>
												</div>
												<div className="gap-2">
													Remarks :{" "}
													<span className="text-black font-medium">
														{item?.assignRemark}
													</span>
												</div>
											</div>
											<div>
												<p className="text-lg font-semibold text-center">
													Return Details
												</p>
												{/* --------------------------------------- */}
												<div className="">
													<p className="font-semibold text-blue-700">
														Is Broken :{" "}
														{item?.isBroken ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
													<p className="font-semibold text-blue-700">
														Keyboard Works :{" "}
														{item?.isAllKeyboardButtonWork ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
													<p className="font-semibold text-blue-700">
														All Ports Work :{" "}
														{item?.isAllPortsWork ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
													<p className="font-semibold text-blue-700">
														All Rubber Pads Attached :{" "}
														{item?.isAllRubberPadsAttached ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
													<p className="capitalize font-semibold text-blue-700">
														all screws are present :{" "}
														{item?.isAllScrewArePresent ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
													<p className="capitalize font-semibold text-blue-700">
														brightness button works :{" "}
														{item?.isBrightnessFunctionWork ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
													<p className="capitalize font-semibold text-blue-700">
														camera works :{" "}
														{item?.isCameraWork ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
													<p className="capitalize font-semibold text-blue-700">
														Charging Works :{" "}
														{item?.isChargingFunctionWork ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
													<p className="capitalize font-semibold text-blue-700">
														internet connectivity :{" "}
														{item?.isConnectionToInternetWork ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
													<p className="capitalize font-semibold text-blue-700">
														HDMI cable include :{" "}
														{item?.isHDMICableInclude ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
													<p className="capitalize font-semibold text-blue-700">
														left click works :{" "}
														{item?.isLeftClickWork ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
													<p className="capitalize font-semibold text-blue-700">
														Right click works :{" "}
														{item?.isRightClickWork ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
													<p className="capitalize font-semibold text-blue-700">
														Scroll wheel works :{" "}
														{item?.isScrollWheelWork ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
													<p className="capitalize font-semibold text-blue-700">
														power adapter include :{" "}
														{item?.isPowerAdapterInclude ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>

													<p className="capitalize font-semibold text-blue-700">
														power on/off :{" "}
														{item?.isPowerOnOff ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
													<p className="capitalize font-semibold text-blue-700">
														Speaker Works :{" "}
														{item?.isSpeakerWork ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
													<p className="capitalize font-semibold text-blue-700">
														Is Any Dent :{" "}
														{item?.isThereAnyMejorScratchOrDent ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
													<p className="capitalize font-semibold text-blue-700">
														Track pad works :{" "}
														{item?.isTrackPadWork ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
													<p className="capitalize font-semibold text-blue-700">
														USB port works :{" "}
														{item?.isUSBReceiverWork ? (
															<span className="text-black font-medium">
																Yes
															</span>
														) : (
															<span className="text-black font-medium">No</span>
														)}
													</p>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</>
					)}
				</Container>
			</Drawer>
		</>
	);
};

export default ViewAssetHistoryDrawer;

const Asset_History = [
	{ id: 1, value: "assignHistory", name: "Assign History" },
	{ id: 2, value: "returnHistory", name: "Return History" },
];

const assetData = [
	{
		id: "01",
		name: "Laptop",
		photos: [
			{
				i: 1,
				photo:
					"https://img.freepik.com/free-photo/laptop-with-blank-black-screen-white-table_53876-97915.jpg?w=996&t=st=1685941336~exp=1685941936~hmac=600279e95b0695fc35146572dbae5a835b4b173cda718b594fff338d67c92c1f",
			},
			{
				i: 2,
				photo:
					"https://img.freepik.com/free-photo/work-desk-with-computer-cup-with-pens-pencils-against-white-wall_181624-44978.jpg?w=996&t=st=1685941433~exp=1685942033~hmac=dcd1ecea9d29a5b13041ca4b54294595ad87ef525867f1b8cf5c1d3c3be44f88",
			},
			{
				i: 3,
				photo:
					"https://img.freepik.com/free-photo/empty-meeting-room-with-table-whiteboard_1262-3763.jpg?w=996&t=st=1685941618~exp=1685942218~hmac=9cd100c941a6b9bceb1c82b24a870c0ba7da1bbe0d50a6acd83e162bc284d87c",
			},
			{
				i: 4,
				photo:
					"https://img.freepik.com/free-photo/home-printer-based-toner_23-2149287461.jpg?w=996&t=st=1685943942~exp=1685944542~hmac=ca684816e145f3b09d5192377ff31eb0fed21d348b67d326b8582c36defce9e0",
			},
		],
		modelName: "82K201Y8IN",
		brandName: "Lenovo",
		dateOfPurchase: "05/06/2023",
		purchasePrice: "50,000",
		marketPrice: "40,000",
		serialNumber: "2131335465",
		docs: "",
		assetOfBranch: {
			name: "Searching Yard",
		},
	},
	{
		id: "02",
		name: "Desktop",
		photos: [
			{
				i: 1,
				photo:
					"https://img.freepik.com/free-photo/laptop-with-blank-black-screen-white-table_53876-97915.jpg?w=996&t=st=1685941336~exp=1685941936~hmac=600279e95b0695fc35146572dbae5a835b4b173cda718b594fff338d67c92c1f",
			},
			{
				i: 2,
				photo:
					"https://img.freepik.com/free-photo/work-desk-with-computer-cup-with-pens-pencils-against-white-wall_181624-44978.jpg?w=996&t=st=1685941433~exp=1685942033~hmac=dcd1ecea9d29a5b13041ca4b54294595ad87ef525867f1b8cf5c1d3c3be44f88",
			},
			{
				i: 3,
				photo:
					"https://img.freepik.com/free-photo/empty-meeting-room-with-table-whiteboard_1262-3763.jpg?w=996&t=st=1685941618~exp=1685942218~hmac=9cd100c941a6b9bceb1c82b24a870c0ba7da1bbe0d50a6acd83e162bc284d87c",
			},
			{
				i: 4,
				photo:
					"https://img.freepik.com/free-photo/home-printer-based-toner_23-2149287461.jpg?w=996&t=st=1685943942~exp=1685944542~hmac=ca684816e145f3b09d5192377ff31eb0fed21d348b67d326b8582c36defce9e0",
			},
		],
		modelNo: "82K201Y8IN",
		brand: "Lenovo",
		dateOfPurchase: "05/06/2023",
		billAmount: "50,000",
		currentMp: "40,000",
		slNo: "2131335465",
		docs: "",
	},
	{
		id: "03",
		name: "Office Chairs",
		location: "Electronic City, Karnatak,",
		photos: [
			{
				i: 1,
				photo:
					"https://img.freepik.com/free-photo/laptop-with-blank-black-screen-white-table_53876-97915.jpg?w=996&t=st=1685941336~exp=1685941936~hmac=600279e95b0695fc35146572dbae5a835b4b173cda718b594fff338d67c92c1f",
			},
			{
				i: 2,
				photo:
					"https://img.freepik.com/free-photo/work-desk-with-computer-cup-with-pens-pencils-against-white-wall_181624-44978.jpg?w=996&t=st=1685941433~exp=1685942033~hmac=dcd1ecea9d29a5b13041ca4b54294595ad87ef525867f1b8cf5c1d3c3be44f88",
			},
			{
				i: 3,
				photo:
					"https://img.freepik.com/free-photo/empty-meeting-room-with-table-whiteboard_1262-3763.jpg?w=996&t=st=1685941618~exp=1685942218~hmac=9cd100c941a6b9bceb1c82b24a870c0ba7da1bbe0d50a6acd83e162bc284d87c",
			},
			{
				i: 4,
				photo:
					"https://img.freepik.com/free-photo/home-printer-based-toner_23-2149287461.jpg?w=996&t=st=1685943942~exp=1685944542~hmac=ca684816e145f3b09d5192377ff31eb0fed21d348b67d326b8582c36defce9e0",
			},
		],
		modelNo: "Movable Chair",
		brand: "",
		dateOfPurchase: "05/06/2023",
		billAmount: "50,000",
		currentMp: "40,000",
		slNo: "2131335465",
		docs: "",
	},
	{
		id: "04",
		name: "Printer",
		photos: [
			{
				i: 1,
				photo:
					"https://img.freepik.com/free-photo/laptop-with-blank-black-screen-white-table_53876-97915.jpg?w=996&t=st=1685941336~exp=1685941936~hmac=600279e95b0695fc35146572dbae5a835b4b173cda718b594fff338d67c92c1f",
			},
			{
				i: 2,
				photo:
					"https://img.freepik.com/free-photo/work-desk-with-computer-cup-with-pens-pencils-against-white-wall_181624-44978.jpg?w=996&t=st=1685941433~exp=1685942033~hmac=dcd1ecea9d29a5b13041ca4b54294595ad87ef525867f1b8cf5c1d3c3be44f88",
			},
			{
				i: 3,
				photo:
					"https://img.freepik.com/free-photo/empty-meeting-room-with-table-whiteboard_1262-3763.jpg?w=996&t=st=1685941618~exp=1685942218~hmac=9cd100c941a6b9bceb1c82b24a870c0ba7da1bbe0d50a6acd83e162bc284d87c",
			},
			{
				i: 4,
				photo:
					"https://img.freepik.com/free-photo/home-printer-based-toner_23-2149287461.jpg?w=996&t=st=1685943942~exp=1685944542~hmac=ca684816e145f3b09d5192377ff31eb0fed21d348b67d326b8582c36defce9e0",
			},
		],
		modelNo: "82K201Y8IN",
		brand: "Lenovo",
		dateOfPurchase: "05/06/2023",
		billAmount: "50,000",
		currentMp: "40,000",
		slNo: "2131335465",
		docs: "",
	},
];

const photos = [
	{
		i: 1,
		photo:
			"https://img.freepik.com/free-photo/laptop-with-blank-black-screen-white-table_53876-97915.jpg?w=996&t=st=1685941336~exp=1685941936~hmac=600279e95b0695fc35146572dbae5a835b4b173cda718b594fff338d67c92c1f",
	},
	{
		i: 2,
		photo:
			"https://img.freepik.com/free-photo/work-desk-with-computer-cup-with-pens-pencils-against-white-wall_181624-44978.jpg?w=996&t=st=1685941433~exp=1685942033~hmac=dcd1ecea9d29a5b13041ca4b54294595ad87ef525867f1b8cf5c1d3c3be44f88",
	},
	{
		i: 3,
		photo:
			"https://img.freepik.com/free-photo/empty-meeting-room-with-table-whiteboard_1262-3763.jpg?w=996&t=st=1685941618~exp=1685942218~hmac=9cd100c941a6b9bceb1c82b24a870c0ba7da1bbe0d50a6acd83e162bc284d87c",
	},
	{
		i: 4,
		photo:
			"https://img.freepik.com/free-photo/home-printer-based-toner_23-2149287461.jpg?w=996&t=st=1685943942~exp=1685944542~hmac=ca684816e145f3b09d5192377ff31eb0fed21d348b67d326b8582c36defce9e0",
	},
];
