import { makeStyles } from "@material-ui/core";
import { Close } from "@mui/icons-material";
import { Container, Drawer, IconButton } from "@mui/material";
import { useFetch } from "hooks";
import moment from "moment";
import Slider from "react-slick";

type Props = {
	open?: boolean | any;
	onClose: () => void;
	assetId?: any;
	mutate?: any;
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

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	// height: 600,
	bgcolor: "background.paper",
	// border: "2px solid #000",
	borderRadius: "10px",
	boxShadow: 24,
	p: 4,
};

const ViewAssetDetailsDrawer = ({ open, onClose, assetId, mutate }: Props) => {
	// console.log(assetId);
	const classes = useStyles();
	const { data: assignId, isLoading } = useFetch<any>(
		`assets/asset/assign-asset/${assetId}`
	);
	// console.log(assignId);

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

	return (
		<>
			<Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
				<Container style={{ marginTop: "1rem" }} className={classes.container}>
					{/* Drawer Element */}

					<div className="flex items-center justify-between ">
						<p className="text-lg font-bold text-theme">Assign Details</p>
						<IconButton onClick={() => onClose()}>
							<Close
								fontSize="small"
								className="text-red-500 block md:hidden"
							/>
						</IconButton>
					</div>

					{isLoading ? (
						<p>Loading ....</p>
					) : (
						<div className="mt-2 flex flex-col gap-4">
							<div className="">
								<div
									className={`w-full h-full  rounded-l-xl shadow-xl px-2 py-2 bg-[#edf4fe] my-3`}
								>
									<div className="w-full order-2 border border-gray-500 rounded-md p-[1px] mb-2">
										<Slider {...settings} className="">
											{assignId?.assignTimePhotos?.map((data: any, k: any) => (
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
												{assignId?.assignUser?.name}
											</span>
										</div>
										<div className="gap-2">
											Date Of Assign :{" "}
											<span className="text-black font-medium">
												{moment(assignId?.dateOfAssign)?.format("DD/MM/YYYY")}
											</span>
										</div>

										<div className="gap-2">
											Time Of Assign :{" "}
											<span className="text-black font-medium">
												{assignId?.assignTime
													? assignId?.assignTime
													: "Not Specified"}
											</span>
										</div>
										<div className="gap-2">
											Reason :{" "}
											<span className="text-black font-medium">
												{assignId?.reasonForAssign}
											</span>
										</div>
										<div className="gap-2">
											Remarks :{" "}
											<span className="text-black font-medium">
												{assignId?.assignRemark}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</Container>
			</Drawer>
		</>
	);
};

export default ViewAssetDetailsDrawer;
