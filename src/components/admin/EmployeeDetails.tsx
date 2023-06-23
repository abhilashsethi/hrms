import { Grid, IconButton, Tooltip } from "@mui/material";
import ICONS from "assets/icons";
import {
	CopyClipboard,
	EmployeeProfileCopyLink,
	HeadText,
	Loader,
	ViewEmployeeHead,
} from "components/core";
import {
	BankInformationUpdate,
	PersonalInformations,
	UpdateProfileHead,
} from "components/dialogues";
import { useFetch } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import { User } from "types";
import EmpAttendanceIndividual from "./EmpAttendanceIndividual";
import EmployProjects from "./EmployProjects";
import EmployLeaves from "./EmployLeaves";

const EmployeeDetails = () => {
	const router = useRouter();
	const [isDialogue, setIsDialogue] = useState(false);
	const [isPersonal, setIsPersonal] = useState(false);
	const [isBank, setIsBank] = useState(false);
	const {
		data: employData,
		mutate,
		isLoading,
	} = useFetch<User>(`users/${router?.query?.id}`);

	const { data: projectDetails } = useFetch<any>(
		`projects?memberId=${router?.query?.id}`
	);

	const SwitchBloodgroup = (bloodGroup: any) => {
		return (
			<span>
				{bloodGroup === "A_Positive"
					? "A+"
					: bloodGroup === "A_Negative"
						? "A-"
						: bloodGroup === "B_Negative"
							? "B-"
							: bloodGroup === "B_Positive"
								? "B+"
								: bloodGroup === "AB_Positive"
									? "AB+"
									: bloodGroup === "AB_Negative"
										? "AB-"
										: bloodGroup === "O_Positive"
											? "O+"
											: bloodGroup === "O_Negative"
												? "0-"
												: "Not mentioned"}
			</span>
		);
	};

	const basicDetails = useMemo(
		() => [
			{
				id: 1,
				title: "First Name",
				value: employData?.firstName ? employData?.firstName : "---",
			},
			{
				id: 18,
				title: "Last Name",
				value: employData?.lastName ? employData?.lastName : "---",
			},
			{
				id: 19,
				title: "Email",
				value: employData?.username ? employData?.username : "---",
				copy: true,
				isCut: false,
			},
			{
				id: 2,
				title: "Personal Email",
				value: employData?.email ? employData?.email : "---",
				copy: true,
				isCut: false,
			},

			{
				id: 3,
				title: "Emp Id",
				value: employData?.employeeID ? employData?.employeeID : "---",
				copy: true,
			},
			{
				id: 10,
				title: "Branch",
				value: employData?.employeeOfBranch?.name
					? employData?.employeeOfBranch?.name
					: "---",
				copy: false,
			},

			{
				id: 4,
				title: "Date Of Joining",
				value: `${employData?.joiningDate
					? moment(employData?.joiningDate).format("ll")
					: "---"
					}`,
			},
			{
				id: 5,
				title: "Phone",
				value: `${employData?.phone ? employData?.phone : "---"}`,
				copy: true,
			},
			{
				id: 6,
				title: "Date Of Birth",
				value: `${employData?.dob ? moment(employData?.dob).format("ll") : "---"
					}`,
			},
			{
				id: 7,
				title: "Address",
				value: `${employData?.address ? employData?.address : "---"}`,
			},
			{
				id: 8,
				title: "Gender",
				value: `${employData?.gender ? employData?.gender : "---"}`,
			},
			{
				id: 9,
				title: "Blood Group",
				value: employData?.bloodGroup
					? SwitchBloodgroup(employData?.bloodGroup)
					: "---",
			},
			{
				id: 9,
				title: "Department",
				value: `${employData?.department?.name ? employData?.department?.name : "---"
					}`,
			},
			{
				id: 9,
				title: "Wallet",
				value: `${employData?.wallet ? employData?.wallet : "---"}`,
			},
		],
		[employData]
	);
	const personalDetails = useMemo(
		() => [
			{
				id: 1,
				title: "PAN No",
				value: `${employData?.panNo ? employData?.panNo : "---"}`,
			},
			{
				id: 2,
				title: "Aadhar No",
				value: `${employData?.aadharNo ? employData?.aadharNo : "---"}`,
			},
			{
				id: 3,
				title: "Gmail",
				value: `${employData?.gmail ? employData?.gmail : "---"}`,
			},
			{
				id: 5,
				title: "Linkedin",
				value: `${employData?.linkedin ? employData?.linkedin : "---"}`,
			},
			{
				id: 6,
				title: "Github",
				value: `${employData?.github ? employData?.github : "---"}`,
			},
		],
		[employData]
	);
	const bankDetails = useMemo(
		() => [
			{
				id: 1,
				title: "Bank Name",
				value: `${employData?.bankName ? employData?.bankName : "---"}`,
			},
			{
				id: 2,
				title: "Bank Ac/No",
				value: `${employData?.accountNo ? employData?.accountNo : "---"}`,
			},
			{
				id: 3,
				title: "IFSC Code",
				value: `${employData?.ifscCode ? employData?.ifscCode : "---"}`,
			},
		],
		[employData]
	);
	if (isLoading) {
		return (
			<section className="min-h-screen">
				<Loader />
			</section>
		);
	}

	return (
		<section>
			<UpdateProfileHead
				mutate={mutate}
				employData={employData}
				open={isDialogue}
				handleClose={() => setIsDialogue(false)}
			/>
			<PersonalInformations
				mutate={mutate}
				employData={employData}
				open={isPersonal}
				handleClose={() => setIsPersonal(false)}
			/>
			<BankInformationUpdate
				mutate={mutate}
				employData={employData}
				open={isBank}
				handleClose={() => setIsBank(false)}
			/>
			<section className="mb-12 flex gap-3">
				<Grid container spacing={2}>
					<Grid item lg={8} md={12} sm={12} xs={12}>
						<div className="w-full h-full rounded-lg bg-white shadow-xl md:p-4 p-2">
							<ViewEmployeeHead
								employData={employData}
								mutate={mutate}
							/>
							{/* --------------------Basic Details-------------------- */}
							<section className="py-4 md:px-8 px-3">
								<div className=" pb-2 flex justify-between items-center">
									<HeadText title="Basic Details" />
									<Tooltip title="Edit">
										<IconButton onClick={() => setIsDialogue(true)}>
											<ICONS.Edit className="h-5 w-5" />
										</IconButton>
									</Tooltip>
								</div>
								{basicDetails?.map((item) => (
									<div
										key={item?.id}
										className="flex gap-2 items-center font-medium py-1.5"
									>
										<div className="w-[30%]">
											<p className="text-sm text-gray-600">{item?.title} :</p>
										</div>
										<div className="w-2/3">
											{item?.copy ? (
												<CopyClipboard
													value={item?.value}
													isCut={item?.isCut}
												/>
											) : (
												<p className="text-sm">{item?.value}</p>
											)}
										</div>
									</div>
								))}
							</section>
							{/* --------------Personal Details---------------------- */}
							<section className="md:px-8 px-3">
								<div className=" pb-2 flex justify-between items-center">
									<HeadText title="Personal Details" />
									<Tooltip title="Edit">
										<IconButton onClick={() => setIsPersonal(true)}>
											<ICONS.Edit className="h-5 w-5" />
										</IconButton>
									</Tooltip>
								</div>
								{personalDetails?.map((item) => (
									<div
										key={item?.id}
										className="flex gap-2 items-center font-medium py-1.5"
									>
										<div className="w-[30%]">
											<p className="text-sm text-gray-600">{item?.title} :</p>
										</div>
										<div className="w-2/3">
											<EmployeeProfileCopyLink value={item?.value} />
										</div>
									</div>
								))}
							</section>
							{/* ---------------------Bank Details------------------------- */}
							<section className="md:px-8 px-3 mt-2">
								<div className=" pb-2 flex justify-between items-center">
									<HeadText title="Bank Details" />
									<Tooltip title="Edit">
										<IconButton onClick={() => setIsBank(true)}>
											<ICONS.Edit className="h-5 w-5" />
										</IconButton>
									</Tooltip>
								</div>
								{bankDetails?.map((item) => (
									<div
										key={item?.id}
										className="flex gap-2 items-center font-medium py-1.5"
									>
										<div className="w-[30%]">
											<p className="text-sm text-gray-600">{item?.title} :</p>
										</div>
										<div className="w-2/3">
											<p className="text-sm">{item?.value}</p>
										</div>
									</div>
								))}
							</section>
						</div>
					</Grid>
					<Grid item lg={4}>
						<div className="w-full h-full">
							<EmpAttendanceIndividual />
							<EmployLeaves employeeId={employData?.employeeID} />
							<EmployProjects
								userName={employData?.name}
								projectDetails={projectDetails}
							/>
						</div>
					</Grid>
				</Grid>
			</section>
		</section>
	);
};

export default EmployeeDetails;
