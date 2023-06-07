import { makeStyles } from "@material-ui/core";
import {
	AccountTreeRounded,
	Check,
	Close,
	FreeBreakfast,
} from "@mui/icons-material";
import {
	Avatar,
	Button,
	Card,
	CircularProgress,
	Container,
	Drawer,
	IconButton,
	InputLabel,
	MenuItem,
	Modal,
	TextField,
	Tooltip,
} from "@mui/material";
import { Loader } from "components/core";
import { useFetch } from "hooks";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "types";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Slider from "react-slick";

type Props = {
	open?: boolean | any;
	onClose: () => void;
	setViewProject?: any;
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

const Projects_Details = [
	{
		id: 1,
		title: "HRMS",
		name: "Shrinu Readdy",
		startDate: "25-04-2023",
		endDate: "25-05-2023",
	},
	{
		id: 2,
		title: "Yard ERP",
		name: "Shrinu Readdy",
		startDate: "25-04-2023",
		endDate: "25-05-2023",
	},
	{
		id: 3,
		title: "Yard CRM",
		name: "Shrinu Readdy",
		startDate: "25-04-2023",
		endDate: "25-05-2023",
	},
];

const ViewAssetHistoryDrawer = ({ open, onClose, setViewProject }: Props) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedUser, setSelectedUser] = useState<string | null>(null);
	const [searchedUser, setSearchedUser] = useState<any>([]);

	const [openInfoModal, setOpenInfoModal] = useState(false);
	const handleInfoOpen = () => {
		setOpenInfoModal(true);
	};
	const handleInfoCloseModal = () => setOpenInfoModal(false);

	const { data: users, isLoading } = useFetch<User[]>(`users`);
	useEffect(() => {
		if (users) {
			const filtered = users.filter((user) =>
				user.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setSearchedUser(filtered);
		}
	}, [users, searchTerm]);

	const Drawer_document = [
		{
			id: 1,
			title: "Document Title 1",
		},
	];

	const classes = useStyles();

	const { data: projectDetails, mutate } = useFetch<any>(
		`projects?memberId=${router?.query?.id}`
	);
	// console.log(projectDetails);
	const validationSchema = Yup.object().shape({
		type: Yup.string().required("Branch is required!"),
	});
	const initialValues = {
		type: "",
	};
	const handleSubmit = async (values: any) => {
		try {
			console.log(values);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
				<Container style={{ marginTop: "1rem" }} className={classes.container}>
					{/* Drawer Element */}

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

					<div className="mt-4 flex flex-col gap-4">
						<div className="">
							<div className="w-full relative rounded-l-xl shadow-xl px-2 py-2 bg-gradient-to-r from-rose-100 to-teal-100 my-3">
								<div className="w-1/2">
									<Slider {...settings} className="">
										{photos?.map((data: any, k: any) => (
											<img
												key={k}
												className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
												src={data?.photo}
												alt="Branch"
											/>
										))}
									</Slider>
								</div>
								<div></div>
							</div>
						</div>
					</div>
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
