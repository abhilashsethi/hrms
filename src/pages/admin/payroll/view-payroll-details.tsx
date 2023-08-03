import { CurrencyRupee, Download } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { RenderIconRow } from "components/common";
import {
	AdminBreadcrumbs,
	CopyClipboard,
	HeadText,
	PhotoViewer,
} from "components/core";
import { downloadFile, useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";

const ViewPayrollDetails = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { change } = useChange();
	const { data: employData, mutate } = useFetch<User>(
		`users/${router?.query?.id}`
	);
	console.log(employData);

	const Gross_Salary: any = employData?.grossSalary;
	const New_Fields: any = employData?.salaryInfoNewFields?.length
		? employData?.salaryInfoNewFields
		: [];
	console.log(New_Fields);

	const { data: configData, mutate: payRollMutate } = useFetch<any>(
		`payrolls/getAllPayrollConfigs`
	);
	// console.log(configData);
	const Configs = configData?.length ? configData[0] : null;
	console.log(Configs);
	const Professional_Tax = Configs?.ptTaxes?.find(
		(item: any) =>
			Gross_Salary >= item?.startGrossSalary &&
			Gross_Salary <= item?.endGrossSalary
	);

	const Tds: any = employData?.tds;
	const Tds_Amount =
		Gross_Salary - (Configs?.conveyanceAllowances + Configs?.medicalAllowances);
	const Tds_Amount_Yearly = Tds_Amount * 12;
	const Tds_Yearly = (Tds_Amount_Yearly * Tds) / 100;
	const Tds_Monthly = Tds_Yearly / 12;

	const pf =
		(Configs?.pfEmployee * ((Configs?.basicSalary * Gross_Salary) / 100)) / 100;
	const esi = (Configs?.esiEmployee * Gross_Salary) / 100;
	const Total_Deduction = pf + esi + Professional_Tax?.tax + Tds_Monthly;

	const Employer_Pf =
		(Configs?.pfEmployer * ((Configs?.basicSalary * Gross_Salary) / 100)) / 100;
	const Employer_Esi = (Configs?.esiEmployer * Gross_Salary) / 100;

	const All_Allowances = Gross_Salary
		? (Configs?.basicSalary * Gross_Salary) / 100 +
		  (Configs?.hra * Gross_Salary) / 100 +
		  Configs?.conveyanceAllowances +
		  Configs?.medicalAllowances
		: "---";
	// console.log(All_Allowances);

	const Special_Allowance =
		Gross_Salary > All_Allowances ? Gross_Salary - All_Allowances : 0;

	const payroll = [
		{
			id: 1,
			name: "Gross Salary Per Month",
			count: `${Gross_Salary ? Gross_Salary : "---"}`,
		},
		{
			id: 2,
			name: "Basic Salary",
			count: `${
				Gross_Salary ? (Configs?.basicSalary * Gross_Salary) / 100 : "---"
			}`,
		},
		{
			id: 2,
			name: "HRA",
			count: `${Gross_Salary ? (Configs?.hra * Gross_Salary) / 100 : "---"}`,
		},
		{
			id: 2,
			name: "Conveyance Allowance",
			count: `${
				Gross_Salary
					? Configs?.conveyanceAllowances
					: Gross_Salary
					? (Configs?.basicSalary * Gross_Salary) / 100
					: "---"
			}`,
		},
		{
			id: 2,
			name: "Medical Allowance",
			count: `${Gross_Salary ? Configs?.medicalAllowances : "---"}`,
		},
		{
			id: 2,
			name: "Special Allowance",
			count: `${Gross_Salary ? Special_Allowance : "---"}`,
		},
	];
	const deduction = [
		{
			id: 1,
			name: "PF Contribution by Employee",
			count: `${
				Gross_Salary
					? (Configs?.pfEmployee *
							((Configs?.basicSalary * Gross_Salary) / 100)) /
					  100
					: "---"
			}`,
		},
		{
			id: 2,
			name: "ESI Contribution by Employee",
			count: `${
				Gross_Salary ? (Configs?.esiEmployee * Gross_Salary) / 100 : "---"
			}`,
		},
		{
			id: 2,
			name: "Professional Tax",
			count: `${Gross_Salary ? Professional_Tax?.tax : "---"}`,
		},
		{ id: 3, name: "TDS", count: `${Gross_Salary ? Tds_Monthly : "---"}` },
		{
			id: 4,
			name: "Total Deduction",
			count: `${Gross_Salary ? Total_Deduction : "---"}`,
		},
		{
			id: 5,
			name: "Net Salary",
			count: `${Gross_Salary ? Gross_Salary - Total_Deduction : "---"}`,
		},
		// New_Fields?.length
		// 	? {
		// 			id: 6,
		// 			name: `${
		// 				New_Fields ? New_Fields?.map((item: any) => item?.title) : null
		// 			}`,
		// 			count: `${
		// 				New_Fields ? New_Fields?.map((item: any) => item?.value) : null
		// 			}`,
		// 	  }
		// 	: null,
	];

	const ctc = [
		{
			id: 1,
			name: "PF Contribution by Employer",
			count: `${
				Gross_Salary
					? (Configs?.pfEmployer *
							((Configs?.basicSalary * Gross_Salary) / 100)) /
					  100
					: "---"
			}`,
		},
		{
			id: 2,
			name: "ESI Contribution by Employer",
			count: `${
				Gross_Salary ? (Configs?.esiEmployer * Gross_Salary) / 100 : "---"
			}`,
		},
		{ id: 2, name: "KPI", count: `${Gross_Salary ? employData?.kpi : "---"}` },
		{
			id: 2,
			name: "CTC",
			count: `${
				Gross_Salary ? Gross_Salary + Employer_Pf + Employer_Esi : "---"
			}`,
		},
	];

	const links = [
		{ id: 1, page: "Employees", link: "/admin/employees" },
		{
			id: 2,
			page: "Payroll Detail",
			link: `/admin/payroll/view-payroll-details?id=${employData?.id}`,
		},
		// {
		// 	id: 3,
		// 	page: "employee-employees",
		// 	link: `/admin/employees/all-employee`,
		// },
	];

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const res = await downloadFile({
				url: `/payrolls/createPdf`,
				method: "POST",
				body: {
					salaryMonth: `${new Date().toLocaleString("default", {
						month: "long",
					})}`,
					companyName: "Searchingyard Pvt. Ltd",
					employeeName: employData?.name,
					employeeCode: employData?.employeeID,
					employeeGrade: "A",
					designation: employData?.role?.name,
					hiringDate: "17 January 2023",
					leaveBalance: "5",
					dateOfSalaryRecieved: "17",
					noOfWorkingDays: "20",
					presentDays: "20",
					PAN: employData?.panNo,
					bankName: employData?.bankName,
					bankAcNo: employData?.accountNo,
					payslipNo: "9",
					basicSalary: Gross_Salary
						? (Configs?.basicSalary * Gross_Salary) / 100
						: 0,
					HRA: Gross_Salary ? (Configs?.hra * Gross_Salary) / 100 : 0,
					conveyance: Configs?.conveyanceAllowances,
					medicalAllowance: Configs?.medicalAllowances,
					specialAllowance: Special_Allowance,
					employerPfContribution: Gross_Salary
						? (Configs?.pfEmployer *
								((Configs?.basicSalary * Gross_Salary) / 100)) /
						  100
						: 0,
					employerESIContribution: Gross_Salary
						? (Configs?.esiEmployer * Gross_Salary) / 100
						: 0,
					KeyPerformanceIndex: Gross_Salary ? employData?.kpi : 0,
					OtherAllowlance: "0.00",
					LeaveEncashment: "0.00",
					CityAllowance: "0.00",
					TrainingIncentive: "0.00",
					EmployeeReferralBonus: "0.00",
					Arrear: "0.00",
					SalaryAdvance: "0.00",
					InterestOfSalaryAdvance: "0.00",
					OtherAdvance: "0.00",
					PFEmployee: Gross_Salary
						? (Configs?.pfEmployee *
								((Configs?.basicSalary * Gross_Salary) / 100)) /
						  100
						: 0,
					ESIEmployee: Gross_Salary
						? (Configs?.esiEmployee * Gross_Salary) / 100
						: 0,
					ProfessionalTax: Gross_Salary ? Professional_Tax?.tax : 0,
					IncomeTax: "0.00",
					TotalEarnings: Gross_Salary
						? Gross_Salary + Employer_Pf + Employer_Esi
						: 0,
					TotalDeductions: Gross_Salary ? Total_Deduction : 0,
					GrossEarnings: Gross_Salary,
					NetSalary: Gross_Salary ? Gross_Salary - Total_Deduction : 0,
				},
			});

			setLoading(false);

			Swal.fire(`Success`, `You have successfully Downloaded!`, `success`);
			return;
		} catch (error) {
			console.log(error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};
	return (
		<PanelLayout title="PayRoll Details - Admin Panel">
			<section className="md:px-8 px-2 md:py-4 py-2">
				<div className="px-2 md:px-0">
					<AdminBreadcrumbs links={links} />
				</div>
				<div className="flex justify-center py-2">
					<div className="md:w-3/4 w-full rounded-lg bg-white shadow-lg px-4 py-4">
						<h1 className="text-lg uppercase md:text-xl lg:text-2xl text-theme flex justify-center font-extrabold py-2">
							Employee Pay Roll Details
						</h1>
						<div className="px-4 py-4 text-lg">
							<div className="grid lg:grid-cols-2 my-2 gap-x-24 gap-y-1 w-full">
								<div className=" bg-theme rounded-lg shadow-lg px-4 py-4">
									<div className="grid text-white text-lg justify-items-center">
										<PhotoViewer size="7rem" photo={employData?.photo} />
										<p className="font-semibold tracking-wide">
											{employData?.name || "---"}
										</p>
										<p className="text-sm lg:pl-4 mt-1 font-bold flex gap-2">
											EMP ID :
											<span className="">
												<CopyClipboard
													value={employData?.employeeID || "---"}
												/>
											</span>
										</p>
										<p className="text-sm font-medium mt-1 flex items-center gap-3">
											<RenderIconRow
												value={employData?.email || "---"}
												isEmail
												longText={false}
											/>
										</p>
										<p className="text-sm font-medium mt-1 flex items-center gap-3">
											<RenderIconRow
												value={employData?.phone || "---"}
												isPhone
											/>
										</p>
									</div>
								</div>
								<div>
									<HeadText className={"bg-green-600"} title="Gains" />
									<div className=" my-2 grid gap-y-1 w-full">
										{payroll.map((item) => (
											<div
												key={item?.id}
												className="md:flex gap-4 justify-between"
											>
												<p className="text-gray-700">{item?.name} :</p>
												<span className="text-blue-700">
													<CurrencyRupee fontSize="small" />
													{item.count}
												</span>
											</div>
										))}
									</div>
								</div>
								<div className="pt-4">
									<HeadText className="bg-red-500" title="Deduction" />
									<div className=" my-2 grid gap-y-1 w-full">
										{deduction.map((item) => (
											<div
												key={item?.id}
												className="md:flex gap-4 justify-between"
											>
												<p className="text-gray-700">{item?.name} :</p>
												<span className="text-blue-700">
													<CurrencyRupee fontSize="small" />
													{item?.count}
												</span>
											</div>
										))}
										{New_Fields?.length > 0 &&
											New_Fields?.map((item: any) => (
												<div
													key={item?.id}
													className="md:flex gap-4 justify-between"
												>
													<p className="text-gray-700">{item?.title} :</p>
													{/* <p className="text-gray-700">{item?.name} :</p> */}
													<span className="text-blue-700">
														<CurrencyRupee fontSize="small" />
														{item?.value}
													</span>
												</div>
											))}
									</div>
								</div>
								<div className="pt-4">
									<HeadText className={"bg-yellow-500"} title="CTC" />
									<div className=" my-2 grid gap-y-1 w-full">
										{ctc.map((item) => (
											<div
												key={item?.id}
												className="md:flex gap-4 justify-between"
											>
												<p className="text-gray-700">{item?.name} :</p>
												<span className="text-blue-700">
													<CurrencyRupee fontSize="small" />
													{item.count}
												</span>
											</div>
										))}
									</div>
								</div>
							</div>
							<div className="flex justify-center items-center w-full">
								<Button
									type="submit"
									variant="contained"
									className="!bg-theme hover:!scale-95 ease-in-out transition-all duration-300"
									disabled={loading}
									startIcon={
										loading ? (
											<CircularProgress color="warning" size={20} />
										) : (
											<Download />
										)
									}
									onClick={() => handleSubmit()}
								>
									Download Salary Slip
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</PanelLayout>
	);
};

export default ViewPayrollDetails;
