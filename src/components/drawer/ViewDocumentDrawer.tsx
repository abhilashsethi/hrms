import {
	AddCardRounded,
	Cancel,
	CheckCircle,
	CloseSharp,
	Person,
	Search,
} from "@mui/icons-material";
import {
	Button,
	CircularProgress,
	Container,
	Drawer,
	Radio,
	TextField,
} from "@mui/material";
import { DEFAULTPROFILE, SAMPLEDP } from "assets/home";
import { Loader } from "components/core";
import { useChange, useFetch } from "hooks";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";

type Props = {
	open?: boolean | any;
	onClose: () => void;
	setViewDocument?: any;
};

const ViewDocumentDrawer = ({ open, onClose, setViewDocument }: Props) => {
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedUser, setSelectedUser] = useState<string | null>(null);
	const [searchedUser, setSearchedUser] = useState<any>([]);
	const { data: users, isLoading } = useFetch<User[]>(`users`);
	useEffect(() => {
		if (users) {
			const filtered = users.filter((user) =>
				user.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setSearchedUser(filtered);
		}
	}, [users, searchTerm]);
	return (
		<>
			<Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
				<Container
					style={{
						width: "30vw",
						marginTop: "3.5vh",
					}}
				>
					<p className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
						<Person />
						View Documents
					</p>

					{isLoading && <Loader />}
					<div className="mt-4 flex flex-col gap-4">
						{/* {!searchedUser?.length && (
							<p className="py-8 text-center flex gap-3 items-center justify-center">
								<Search /> No results found!
							</p>
						)} */}
						<div className="w-full rounded-l-full shadow-xl border-t flex justify-between items-center gap-2 px-4 py-2">
							{/* <div className="w-1/5"> */}
							{/* <div className="h-[4rem] w-[4rem] rounded-full overflow-hidden shadow-lg"> */}
							{/* <img
										className="h-full w-full object-cover"
										src={DEFAULTPROFILE.src}
										alt=""
									/> */}
							<iframe src="/AllData (66).pdf" height={100} width={100} />
							{/* </div> */}
							{/* </div> */}
							<div>
								<p>Default Text</p>
							</div>
							<div className="font-medium text-sm">
								<Button
									className="!bg-red-500"
									variant="contained"
									startIcon={<Cancel />}
									size="small"
								>
									Remove
								</Button>
							</div>
						</div>
					</div>
				</Container>
			</Drawer>
		</>
	);
};

export default ViewDocumentDrawer;
