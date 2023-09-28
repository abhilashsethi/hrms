import { CheckCircle, Person, Search } from "@mui/icons-material";
import {
	Button,
	Checkbox,
	CircularProgress,
	Container,
	Drawer,
	Radio,
	TextField,
} from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import { Loader } from "components/core";
import { useFetch } from "hooks";
import { useEffect, useState } from "react";
import { User } from "types";

type Props = {
	open?: boolean | any;
	onClose: () => void;
	setSelectedMembers?: any;
};

const SelectMembers = ({ open, onClose, setSelectedMembers }: Props) => {
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedEmployees, setSelectedEmployees] = useState<User[]>([]);
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

	const handleChecked = (event: any) => {
		const value = event.target.value;
		if (selectedEmployees.includes(value)) {
			setSelectedEmployees((prevSelectedItems: any) =>
				prevSelectedItems.filter((item: any) => item !== value)
			);
		} else {
			setSelectedEmployees((prevSelectedItems: any) => [
				...prevSelectedItems,
				value,
			]);
		}
	};

	useEffect(() => {
		setSelectedMembers(selectedEmployees);
	}, [selectedEmployees]);

	return (
		<>
			<Drawer
				anchor="right"
				open={open}
				onClose={() => {
					onClose && onClose(), setSearchedUser(users);
				}}
			>
				<Container
					style={{
						width: "30vw",
						marginTop: "3.5vh",
					}}
				>
					<p className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
						<Person />
						Select Members
					</p>
					<span className="text-sm">Select members</span>
					<div className="mt-2 w-full flex gap-2">
						<div className="w-2/3">
							<TextField
								fullWidth
								variant="outlined"
								size="small"
								placeholder="Enter name"
								onChange={(e: any) => setSearchTerm(e.target.value)}
							/>
						</div>
						<div className="w-1/3">
							<Button
								startIcon={<Search />}
								className="!bg-theme"
								fullWidth
								variant="contained"
							>
								SEARCH
							</Button>
						</div>
					</div>
					{isLoading && <Loader />}
					<div className="mt-4 flex flex-col gap-4">
						{!searchedUser?.length && (
							<p className="py-8 text-center flex gap-3 items-center justify-center">
								<Search /> No results found!
							</p>
						)}
						{searchedUser?.map((item: any) => (
							<div
								key={item?.id}
								className="w-full rounded-l-full shadow-xl border-t flex items-center gap-2 px-4 py-2"
							>
								<div className="w-1/5">
									<div className="h-[4rem] w-[4rem] rounded-full overflow-hidden shadow-lg">
										{item?.photo && (
											<img
												className="h-full w-full object-cover"
												src={item?.photo || DEFAULTPROFILE.src}
												alt=""
											/>
										)}
										{!item?.photo ? (
											<div className="h-full w-full text-white rounded-full flex justify-center items-center text-2xl font-semibold bg-gradient-to-br from-theme-100 via-theme-50 to-secondary-300">
												{item?.name?.slice(0, 1)}
											</div>
										) : null}
									</div>
								</div>
								<div className="w-4/5 flex justify-between items-start h-full">
									<div className="flex flex-col h-full justify-center">
										<>
											<p className="text-sm">
												{item?.name?.slice(0, 18)}
												{item?.name?.length > 18 ? "..." : ""}
											</p>
											<p className="mt-1 text-sm font-semibold text-gray-500">
												{item?.role?.name}
											</p>
										</>
									</div>
									<div className="">
										<Checkbox
											value={item?.id}
											onChange={(e) => handleChecked(e)}
											checked={selectedEmployees.includes(item?.id)}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</Container>
			</Drawer>
		</>
	);
};

export default SelectMembers;
