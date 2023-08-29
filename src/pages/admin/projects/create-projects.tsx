import { Check } from "@mui/icons-material";
import { Button, CircularProgress, InputLabel, TextField } from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import { AdminBreadcrumbs, Loader } from "components/core";
import { SelectManager, SelectMembers } from "components/drawer";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import router from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import * as Yup from "yup";
const initialValues = {
	name: "",
	description: "",
	industry: "",
};

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.matches(/^[A-Za-z ]+$/, "Name must only contain alphabetic characters")
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be less than 50 characters")
		.required("Project name is required!"),
	description: Yup.string()
		.min(5, "Description must be at least 2 characters")
		.max(500, "Description must be less than 500 characters"),
});

const CreateProjects = () => {
	const [loading, setLoading] = useState(false);
	const [isManager, setIsManager] = useState(false);
	const [isMembers, setIsMembers] = useState(false);
	const [selectedManager, setSelectedManager] = useState<User | null>(null);
	const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
	const [membersData, setMembersData] = useState<any>([]);
	const { data: employeesData, isLoading, mutate } = useFetch<any>(`users`);
	const { change, isChanging } = useChange();

	useEffect(() => {
		let reqData = employeesData?.filter((item: any) =>
			selectedMembers?.find((data) => data === item?.id)
		);
		setMembersData(reqData);
	}, [selectedMembers]);

	const handleSubmit = async (values: any) => {
		const reqValue = Object.entries(values).reduce((acc: any, [key, value]) => {
			if (value) {
				acc[key] = value;
			}
			return acc;
		}, {});
		setLoading(true);
		try {
			if (selectedMembers?.length == 0) {
				Swal.fire(`Info`, `Please Add Team Members`, `info`);
				return;
			}
			Swal.fire(`Info`, `Please Wait..., It will take Some time!`, `info`);
			const res = await change(`projects`, {
				body: {
					...reqValue,
					managerId: selectedManager ? selectedManager?.id : null,
					involvedMemberIds:
						selectedMembers?.length >= 1 ? selectedMembers : null,
				},
			});
			console.log(res);
			setLoading(false);
			if (res?.status !== 201) {
				Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
				setLoading(false);
				return;
			}
			router?.push("/admin/projects/all-projects");
			Swal.fire(`Success`, `You have successfully created!`, `success`);
			return;
		} catch (error) {
			console.log(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	if (isLoading) {
		return <Loader />;
	}
	return (
		<PanelLayout title="Projects - Admin Panel">
			<section className="px-8 py-4">
				<AdminBreadcrumbs links={links} />
				<SelectManager
					open={isManager}
					onClose={() => setIsManager(false)}
					setSelectedManager={setSelectedManager}
				/>
				<SelectMembers
					open={isMembers}
					onClose={() => setIsMembers(false)}
					setSelectedMembers={setSelectedMembers}
				/>
				<section className="w-full md:px-2 py-4 flex justify-center items-center">
					<div className="md:p-6 p-1 md:w-1/2 w-full rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
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
									<h1 className="text-2xl uppercase md:text-xl lg:text-2xl text-slate-600 flex justify-center font-extrabold py-2">
										Create Project
									</h1>
									<div className="">
										<div className="px-4">
											<div className="py-2">
												<InputLabel htmlFor="name">
													Project Name
													<span className="text-red-600 px-1">*</span>
												</InputLabel>
											</div>
											<TextField
												fullWidth
												size="small"
												id="name"
												placeholder="Project Name"
												name="name"
												value={values.name}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.name && !!errors.name}
												helperText={touched.name && errors.name}
											/>
										</div>
										<div className="px-4">
											<div className="py-2">
												<InputLabel htmlFor="name">Industry</InputLabel>
											</div>
											<TextField
												fullWidth
												size="small"
												placeholder="Industry"
												name="industry"
												value={values.industry}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.industry && !!errors.industry}
												helperText={touched.industry && errors.industry}
											/>
										</div>
										<div className="px-4 py-2">
											<div className="py-2">
												<InputLabel htmlFor="description">
													Description
												</InputLabel>
											</div>
											<TextField
												size="small"
												fullWidth
												multiline
												rows={3}
												type="text"
												placeholder="Description"
												id="description"
												name="description"
												value={values.description}
												onChange={handleChange}
												onBlur={handleBlur}
												error={touched.description && !!errors.description}
												helperText={touched.description && errors.description}
											/>
										</div>
										<div className="px-4 flex gap-2">
											<div className="w-1/2">
												<div className="py-2">
													<InputLabel htmlFor="name">
														Project Manager
													</InputLabel>
												</div>
												<div
													onClick={() => setIsManager(true)}
													className="h-48 p-3 w-full border-[1px] border-dashed bg-slate-100 border-slate-300 cursor-pointer rounded-md flex tracking-wide"
												>
													{selectedManager ? (
														<>
															<div className="h-16 w-full rounded-md shadow-xl bg-white px-3 flex gap-3 items-center">
																<div className="h-[2.5rem] w-[2.5rem] rounded-full overflow-hidden shadow-md">
																	<img
																		className="h-full w-full object-cover"
																		src={
																			selectedManager?.photo ||
																			DEFAULTPROFILE.src
																		}
																		alt="photo"
																	/>
																</div>
																<div>
																	<p className="text-sm font-semibold">
																		{selectedManager?.name?.slice(0, 12)}
																		{selectedManager?.name?.length > 12
																			? "..."
																			: ""}
																	</p>
																	<p className="text-xs">
																		{selectedManager?.role?.name?.slice(0, 12)}
																	</p>
																</div>
															</div>
														</>
													) : (
														<div className="h-full w-full flex justify-center items-center">
															<p className="text-sm text-center">
																Click to select Project Manager
															</p>
														</div>
													)}
												</div>
											</div>
											<div className="w-1/2">
												<div className="py-2 flex gap-2 items-center">
													<InputLabel htmlFor="name">
														Team Members{" "}
														<span className="text-red-600 px-1">*</span>
													</InputLabel>
													{membersData?.length ? (
														<div
															onClick={() => setIsMembers(true)}
															className="h-4 w-4 flex justify-center cursor-pointer items-center text-white bg-theme rounded-full text-xs font-semibold"
														>
															{membersData?.length}
														</div>
													) : null}
												</div>
												<div
													onClick={() => setIsMembers(true)}
													className="h-48 w-full border-[1px] border-dashed border-slate-300 cursor-pointer rounded-md tracking-wide overflow-y-auto"
												>
													{selectedMembers?.length ? (
														<div className="flex flex-col gap-2 w-full px-2">
															{membersData?.map((item: any) => (
																<div
																	key={item?.id}
																	className="h-16 w-full rounded-md shadow-xl bg-white px-2 flex gap-3 items-center"
																>
																	<div className="h-[2.5rem] w-[2.5rem] rounded-full overflow-hidden shadow-md">
																		<img
																			className="h-full w-full object-cover"
																			src={item?.photo || DEFAULTPROFILE.src}
																			alt="photo"
																		/>
																	</div>
																	<div>
																		<p className="text-sm font-semibold">
																			{item?.name?.slice(0, 12)}
																			{item?.name?.length > 12 ? "..." : ""}
																		</p>
																		<p className="text-xs">
																			{item?.role?.name?.slice(0, 12)}
																		</p>
																	</div>
																</div>
															))}
														</div>
													) : (
														<div className="h-full w-full flex justify-center items-center">
															<p className="text-sm text-center">
																Click to select Team Members
															</p>
														</div>
													)}
												</div>
											</div>
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
				</section>
			</section>
		</PanelLayout>
	);
};

export default CreateProjects;
const links = [
	{ id: 1, page: "Projects", link: "/admin/projects" },
	{ id: 2, page: "Create Projects", link: "/admin/projects/create-projects" },
];
