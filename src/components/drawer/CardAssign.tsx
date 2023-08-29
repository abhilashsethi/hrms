import { AddCardRounded, CheckCircle, Search } from "@mui/icons-material";
import {
	Button,
	CircularProgress,
	Container,
	Drawer,
	Radio,
	TextField,
} from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import { AddValidityForm } from "components/dialogues";
import { useChange, useFetch } from "hooks";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";

type Props = {
	open?: boolean | any;
	onClose: () => void;
	cardId?: string | null;
	mutate?: any;
};

const CardAssign = ({ open, onClose, cardId, mutate }: Props) => {
	const [isValidity, setIsValidity] = useState(false);
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [isAccess, setIsAccess] = useState(true);
	const [selectedUser, setSelectedUser] = useState<string | null>(null);
	const [searchedUser, setSearchedUser] = useState<any>([]);
	const { change } = useChange();
	const { data: users } = useFetch<User[]>(`users`);
	const { data: guests } = useFetch<any[]>(`guests`);
	useEffect(() => {
		if (isAccess) {
			const filtered = users?.filter((user) => {
				return (
					user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
					!user?.isBlocked
				);
			});
			setSearchedUser(filtered);
		} else {
			const filtered = guests?.filter(
				(user) =>
					user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
					!user?.isBlocked
			);
			setSearchedUser(filtered);
		}
	}, [users, guests, searchTerm]);
	const handleAssign = async () => {
		setLoading(true);
		try {
			const res = await change(`cards/${cardId}`, {
				method: "PATCH",
				body: { userId: selectedUser },
			});
			setLoading(false);
			if (res?.status !== 200) {
				Swal.fire(
					"Error",
					res?.results?.error?.message || "Something went wrong!",
					"error"
				);
				return;
			}
			Swal.fire("Success", "User assigned successfully!", "success");
			mutate();
			setSelectedUser(null);
			onClose();
			return;
		} catch (err) {
			console.log(err);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			<AddValidityForm
				cardId={cardId}
				userId={selectedUser}
				open={isValidity}
				mutate={mutate}
				closeDrawer={onClose}
				handleClose={() => setIsValidity(false)}
			/>
			<Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
				<Container
					style={{
						width: "30vw",
						marginTop: "3.5vh",
					}}
				>
					<div className="flex justify-between items-center">
						<p className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
							<AddCardRounded />
							Assign User
						</p>
						<div className="flex gap-4 items-center">
							<div className="flex gap-1">
								<Button
									onClick={() => {
										setIsAccess(true);
										setSearchedUser(users);
									}}
									size="small"
								>
									<div
										className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
											isAccess && `border-2 border-theme`
										}`}
									>
										<p className={`${isAccess && `!text-theme`} text-gray-600`}>
											Employee
										</p>
									</div>
								</Button>
								<Button
									onClick={() => {
										setIsAccess(false);
										setSearchedUser(guests);
									}}
									size="small"
								>
									<div
										className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
											!isAccess && `border-2 border-theme`
										}`}
									>
										<p
											className={`${!isAccess && `!text-theme`} text-gray-600`}
										>
											Guest
										</p>
									</div>
								</Button>
							</div>
						</div>
					</div>
					<span className="text-sm">
						Assign an user from the below list of users
					</span>
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
					<div className="mt-4 flex flex-col gap-4">
						{isAccess ? (
							<>
								{!searchedUser?.length && (
									<p className="py-8 text-center flex gap-3 items-center justify-center">
										<Search /> No results found!
									</p>
								)}
								{searchedUser
									?.filter((item: any) => !item?.isBlocked)
									?.map((item: any) => (
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

												{selectedUser && selectedUser === item?.id ? (
													<Button
														onClick={handleAssign}
														size="small"
														startIcon={
															loading ? (
																<CircularProgress size={20} />
															) : (
																<CheckCircle />
															)
														}
														className="!bg-emerald-500"
														variant="contained"
													>
														ASSIGN
													</Button>
												) : (
													<div>
														<Radio
															onChange={() => setSelectedUser(item?.id)}
															checked={selectedUser === item?.id}
														/>
													</div>
												)}
											</div>
										</div>
									))}
							</>
						) : (
							<>
								{searchedUser
									?.filter((item: any) => !item?.isBlocked)
									?.map((item: any) => (
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
															{item?.designation}
														</p>
													</>
												</div>

												{selectedUser && selectedUser === item?.id ? (
													<Button
														onClick={() => setIsValidity(true)}
														size="small"
														startIcon={
															loading ? (
																<CircularProgress size={20} />
															) : (
																<CheckCircle />
															)
														}
														className="!bg-emerald-500"
														variant="contained"
													>
														ASSIGN
													</Button>
												) : (
													<div>
														<Radio
															onChange={() => setSelectedUser(item?.id)}
															checked={selectedUser === item?.id}
														/>
													</div>
												)}
											</div>
										</div>
									))}
							</>
						)}
					</div>
				</Container>
			</Drawer>
		</>
	);
};

export default CardAssign;
