import { Container, Drawer, IconButton } from "@mui/material";
import { Loader } from "components/core";
import { useChange, useFetch } from "hooks";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import { makeStyles } from "@material-ui/core";
import { Close } from "@mui/icons-material";

type Props = {
	open?: boolean | any;
	onClose: () => void;
	setViewLeaves?: any;
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

const Projects_Details = [
	{
		id: 1,
		date: "10-05-2023",
		status: "Approved",
		credit: -1,
	},
	{
		id: 2,
		date: "12-05-2023",
		status: "Rejected",
		credit: -2,
	},
	{
		id: 3,
		date: "14-05-2023",
		status: "Approved",
		credit: -1,
	},
	{
		id: 4,
		date: "16-05-2023",
		status: "Approved",
		credit: -2,
	},
];

const ViewLeaveDrawer = ({ open, onClose, setViewLeaves }: Props) => {
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

	return (
		<>
			<Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
				<Container style={{ marginTop: "1rem" }} className={classes.container}>
					{/* Drawer Element */}

					<div className="flex items-center justify-between pb-4">
						<p className="text-lg font-bold text-theme">View Leaves</p>
						<IconButton onClick={() => onClose()}>
							<Close
								fontSize="small"
								className="text-red-500 block md:hidden"
							/>
						</IconButton>
					</div>

					{isLoading && <Loader />}
					<div className="mt-4 flex flex-col gap-4">
						{/* {!searchedUser?.length && (
							<p className="py-8 text-center flex gap-3 items-center justify-center">
								<Search /> No results found!
							</p>
						)} */}
						{Projects_Details?.map((item, index) => {
							return (
								<div className="">
									<div
										key={index}
										className="w-full h-28 rounded-l-xl shadow-xl px-2 py-2 bg-[#edf4fe] my-3"
									>
										<div className="flex flex-col gap-3 font-semibold text-blue-700">
											<div className="flex gap-2">
												Date :{" "}
												<span className="text-black font-medium">
													{item?.date}
												</span>
											</div>
											<div>
												Status :{" "}
												<span
													className={`text-sm ${
														item?.status === "Rejected"
															? "bg-red-500"
															: "bg-green-500"
													} text-white p-1 rounded-lg`}
												>
													{item?.status}
												</span>
											</div>
											<div>
												Credits Used :{" "}
												<span className="text-black font-medium">
													{item?.credit}
												</span>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</Container>
			</Drawer>
		</>
	);
};

export default ViewLeaveDrawer;
