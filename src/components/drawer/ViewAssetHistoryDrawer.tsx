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
import { LoaderAnime } from "components/core";
import { AssetHistoryMoreOption } from "components/dialogues";
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
	isLoading?: any;
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
	assetId,
	data,
	isLoading,
}: Props) => {
	const [history, setHistory] = useState(false);
	const classes = useStyles();
	console.log(data);
	const [isReturn, setIsReturn] = useState<{
		dialogue?: boolean;
		item?: string | null;
	}>({ dialogue: false, item: null });
	return (
		<>
			<AssetHistoryMoreOption
				item={isReturn?.item}
				open={isReturn?.dialogue}
				handleClose={() => setIsReturn({ dialogue: false })}
			/>

			<Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
				<Container style={{ marginTop: "1rem" }} className={classes.container}>
					{/* Drawer Element */}
					<div className="flex items-center justify-between ">
						<p className="text-lg font-bold text-theme">Asset Return History</p>
						<IconButton onClick={() => onClose()}>
							<Close
								fontSize="small"
								className="text-red-500 block md:hidden"
							/>
						</IconButton>
					</div>
					{isLoading ? <ProjectDrawerSkeletonLoading /> : null}
					{data?.length ? (
						<>
							<div className="mt-2 flex flex-col gap-4">
								{isLoading && <ProjectDrawerSkeletonLoading />}
								{data
									?.sort(
										(a: any, b: any) =>
											(new Date(b?.createdAt) as any) -
											(new Date(a?.createdAt) as any)
									)
									?.map((item: any, i: any) => {
										return (
											<div
												className={`w-full h-full  rounded-l-xl shadow-xl px-2 py-2 bg-gradient-to-r from-rose-100 to-teal-100 my-3`}
											>
												<div className="grid grid-cols-2 gap-2 ">
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
																{moment(item?.dateOfAssign)?.format(
																	"DD/MM/YYYY"
																)}
															</span>
														</div>

														<div className="gap-2">
															Date Of Return :{" "}
															<span className="text-black font-medium">
																{item?.dateOfReturn
																	? moment(item?.dateOfReturn)?.format(
																			"DD/MM/YYYY"
																	  )
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
												</div>
												<span
													className="text-center bg-theme rounded-xl text-white font-semibold px-2 py-1"
													onClick={() => {
														setIsReturn({ dialogue: true, item: item });
													}}
												>
													View More
												</span>
												<div>
													{/* <p className="text-lg font-semibold text-center">
													Return Details
												</p> */}
													{/* --------------------------------------- */}
												</div>
											</div>
										);
									})}
							</div>
						</>
					) : (
						<LoaderAnime text="No Return History Found" />
					)}
				</Container>
			</Drawer>
		</>
	);
};

export default ViewAssetHistoryDrawer;
