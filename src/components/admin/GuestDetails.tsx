import { Grid, IconButton, Tooltip } from "@mui/material";
import ICONS from "assets/icons";
import {
	CopyClipboard,
	HeadText,
	Loader,
	PhotoViewer,
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
import { useState } from "react";
import { User } from "types";
import EmpAttendanceIndividual from "./EmpAttendanceIndividual";
import EmployProjects from "./EmployProjects";
import EmployLeaves from "./EmployLeaves";

const GuestDetails = () => {
	const router = useRouter();
	const [isDialogue, setIsDialogue] = useState(false);
	const [isPersonal, setIsPersonal] = useState(false);
	const [isBank, setIsBank] = useState(false);
	const {
		data: employData,
		mutate,
		isLoading,
	} = useFetch<User>(`users/${router?.query?.id}`);
	const basicDetails = [
		{
			id: 1,
			title: "Name",
			value: `${employData?.name ? employData?.name : "---"}`,
		},
		{
			id: 2,
			title: "Email",
			value: `${employData?.email ? employData?.email : "---"}`,
			copy: true,
		},
		{
			id: 3,
			title: "Emp Id",
			value: `${employData?.employeeID ? employData?.employeeID : "---"}`,
			copy: true,
		},

		{
			id: 4,
			title: "Date Of Joining",
			value: `${
				employData?.joiningDate
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
			value: `${
				employData?.dob ? moment(employData?.dob).format("ll") : "---"
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
			value: `${employData?.bloodGroup ? employData?.bloodGroup : "---"}`,
		},
		{
			id: 9,
			title: "Department Id",
			value: `${
				employData?.department?.name ? employData?.department?.name : "---"
			}`,
		},
		{
			id: 9,
			title: "Wallet",
			value: `${employData?.wallet ? employData?.wallet : "---"}`,
		},
	];
	const personalDetails = [
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
	];
	const bankDetails = [
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
			value: `${employData?.IFSCCode ? employData?.IFSCCode : "---"}`,
		},
	];
	if (isLoading) {
		return <Loader />;
	}
	return (
		<section>
			<UpdateProfileHead
				mutate={mutate}
				open={isDialogue}
				handleClose={() => setIsDialogue(false)}
			/>
			<PersonalInformations
				mutate={mutate}
				open={isPersonal}
				handleClose={() => setIsPersonal(false)}
			/>
			<BankInformationUpdate
				mutate={mutate}
				open={isBank}
				handleClose={() => setIsBank(false)}
			/>
			<section className="mb-12 flex gap-3">
				<Grid
					alignItems={"center"}
					justifyContent={"center"}
					container
					spacing={2}
				>
					<Grid item lg={5}>
						<div className="w-full h-full rounded-lg bg-white shadow-xl py-4 flex flex-col justify-center items-center">
							<div className="w-64 h-32 bg-blue-600 rounded-t-lg flex justify-center items-center">
								<div className="">
									<PhotoViewer
										size="5.5em"
										photo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzTSDO6sbQw9RJmGwMKYaubB1wDwyqOYAfuWM1fg&s"
									/>
								</div>
							</div>
							<div className="w-64 py-4 text-sm shadow-xl rounded-lg flex flex-col justify-center items-center">
								<p className="font-bold text-lg pb-4">John Doe</p>
								<p className="font-semibold text-gray-700">
									Email :{" "}
									<span className="font-medium text-gray-500">
										test@gmail.com
									</span>
								</p>
								<p className="font-semibold text-gray-700">
									Phone :{" "}
									<span className="font-medium text-gray-500">9988654325</span>
								</p>
								<p className="font-semibold text-gray-700">
									Gender :{" "}
									<span className="font-medium text-gray-500">Male</span>
								</p>
								<p className="font-semibold text-gray-700">
									Validity From :{" "}
									<span className="font-medium text-gray-500">
										May 9, 2023 4:15 PM
									</span>
								</p>
								<p className="font-semibold text-gray-700">
									Validity Till :{" "}
									<span className="font-medium text-gray-500">
										May 9, 2023 4:15 PM
									</span>
								</p>
								<p className="font-semibold text-gray-700">
									Card Id :{" "}
									<span className="font-medium text-gray-500">SY1006</span>
								</p>
							</div>
						</div>
					</Grid>
				</Grid>
			</section>
		</section>
	);
};

export default GuestDetails;
