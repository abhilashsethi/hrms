import { IconButton, Tooltip } from "@mui/material";
import ICONS from "assets/icons";
import { AdminBreadcrumbs, HeadText } from "components/core";
import { ProfessionalTaxInfo } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";

const ViewConfig = () => {
	const [isInfo, setIsInfo] = useState<boolean>(false);
	const [taxDetails, setTaxDetails] = useState<any>();
	const { data: configData, mutate } = useFetch<any>(
		`payrolls/getAllPayrollConfigs`
	);
	console.log(configData);

	const handleInfoOpen = (data: any) => {
		setIsInfo(true);
		setTaxDetails(data);
	};
	// console.log(taxDetails);

	return (
		<PanelLayout title="View Config - Admin Panel">
			<AdminBreadcrumbs links={links} />

			<section className="w-full px-0 md:py-4 py-2 flex justify-center items-center">
				<div className="md:p-6 p-2 md:w-2/4 w-full rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
					<ProfessionalTaxInfo
						open={isInfo}
						handleClose={() => setIsInfo(false)}
						data={configData}
						ptTax={configData?.length && configData[0]?.ptTaxes}
					/>
					<div className="mt-4">
						<div className="text-xl pb-2 flex justify-between items-center">
							<HeadText title="Payroll Config" />
							<Tooltip title="Edit">
								<IconButton onClick={() => setIsInfo(true)}>
									<ICONS.Edit className="h-6 w-6" />
								</IconButton>
							</Tooltip>
						</div>
						<div className="flex gap-2 items-center font-medium py-1.5">
							{configData?.length && (
								<div className="">
									<p className="text-sm text-gray-600">
										Basic Salary %: {configData[0]?.basicSalary}
									</p>
									<p className="text-sm text-gray-600">
										HRA % : {configData[0]?.basicSalary}
									</p>
									<p className="text-sm text-gray-600">
										Conveyance Allowances: {configData[0]?.conveyanceAllowances}
									</p>
									<p className="text-sm text-gray-600">
										Medical Allowances: {configData[0]?.medicalAllowances}
									</p>
									<p className="text-sm text-gray-600">
										PF Employee %: {configData[0]?.pfEmployee}
									</p>
									<p className="text-sm text-gray-600">
										PF Employer %: {configData[0]?.pfEmployer}
									</p>
									<p className="text-sm text-gray-600">
										ESI Employee %: {configData[0]?.esiEmployee}
									</p>
									<p className="text-sm text-gray-600">
										ESI Employer %: {configData[0]?.esiEmployer}
									</p>
									<p className="text-md font-semibold">Professional Tax Slab</p>
									{configData[0]?.ptTaxes?.map((item: any) => {
										return (
											<div className="flex gap-3 w-full text-sm">
												<p>Form : {item?.startGrossSalary}</p>
												<p>To : {item?.endGrossSalary}</p>-
												<p>Tax : {item?.tax}</p>
											</div>
										);
									})}
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</PanelLayout>
	);
};

export default ViewConfig;

const links = [
	{ id: 1, page: "View Payroll Config", link: "/admin/payroll/view-config" },
];

// const data = [
// 	{
// 		id: 1,
// 		name: "Srinu Reddy",
// 		empId: "SY10007",
// 		email: "Srinu@sy.com",
// 		grossSalary: "$7500",
// 		tds: "10%",
// 		kpi: "5%",
// 		status: "unpaid",
// 	},
// 	{
// 		id: 2,
// 		name: "Loushik Kumar",
// 		empId: "SY10008",
// 		email: "Loushik@sy.com",
// 		grossSalary: "$7500",
// 		tds: "10%",
// 		kpi: "5%",
// 		status: "unpaid",
// 	},
// 	{
// 		id: 3,
// 		name: "Chinmay",
// 		empId: "SY10009",
// 		email: "Chinmay@sy.com",
// 		grossSalary: "$7500",
// 		tds: "10%",
// 		kpi: "5%",
// 		status: "unpaid",
// 	},
// ];
