import { makeStyles } from "@material-ui/core";
import { Close } from "@mui/icons-material";
import { Container, Drawer, IconButton } from "@mui/material";
import { Loader } from "components/core";
import { useFetch } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "types";

type Props = {
	open?: boolean | any;
	onClose: () => void;
	setViewLeaves?: any;
	employeeId?: any;
	assetId?: any;
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

const ViewAssetDetailsDrawer = ({
	open,
	onClose,
	setViewLeaves,
	employeeId,
	assetId,
}: Props) => {
	console.log(assetId);
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedUser, setSelectedUser] = useState<string | null>(null);
	const [searchedUser, setSearchedUser] = useState<any>([]);

	const { data: assetInfo } = useFetch<any>(
		`assets/getAssignAssetById/${assetId}`
	);

	console.log(assetInfo);

	const { data: users, isLoading } = useFetch<User[]>(`users`);
	useEffect(() => {
		if (users) {
			const filtered = users.filter((user) =>
				user.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setSearchedUser(filtered);
		}
	}, [users, searchTerm]);

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
						<div className="">
							<div
								className={`w-full h-full rounded-l-xl shadow-xl px-2 py-2 bg-[#edf4fe] my-3`}
							>
								<div className="flex flex-col gap-3 font-semibold text-blue-700">
									<>
										<div className="flex gap-2">
											Start Date :{" "}
											<span className="text-black font-medium">
												{moment(new Date())?.format("DD/MM/YYYY")}
											</span>
										</div>
										<div className="flex gap-2">
											End Date :{" "}
											<span className="text-black font-medium">
												{moment(new Date())?.format("DD/MM/YYYY")}
											</span>
										</div>
									</>

									<div className="flex gap-2">
										Date :{" "}
										<span className="text-black font-medium">
											{moment(new Date())?.format("DD/MM/YYYY")}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</Drawer>
		</>
	);
};

export default ViewAssetDetailsDrawer;
