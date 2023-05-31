import MaterialTable from "@material-table/core";
import { Download, Info, PeopleRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import {
	AdminBreadcrumbs,
	CopyClipboard,
	HeadStyle,
	PhotoViewer,
} from "components/core";
import { SalaryInfo } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import { MuiTblOptions, getDataWithSL } from "utils";

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
	console.log(taxDetails);

	return (
		<PanelLayout title="View Config - Admin Panel">
			<section className="px-8 py-4">
				<SalaryInfo
					open={isInfo}
					handleClose={() => setIsInfo(false)}
					data={taxDetails}
				/>
				<AdminBreadcrumbs links={links} />
				<div className="mt-4">
					<MaterialTable
						title={<HeadStyle name="View Config" icon={<PeopleRounded />} />}
						data={configData ? getDataWithSL<any>(configData) : []}
						isLoading={!configData}
						options={{ ...MuiTblOptions() }}
						columns={[
							{
								title: "#",
								field: "sl",
								editable: "never",
								width: "2%",
							},
							{
								title: "Basic Salary",
								tooltip: "Basic Salary",
								field: "basicSalary",
								// editable: "never",
								// render: ({ item }) => {
								// 	return (
								// 		<PhotoViewer
								// 			size="2.5rem"
								// 			photo={DEFAULTPROFILE?.src}
								// 			name={`${item?.name}`}
								// 		/>
								// 	);
								// },
							},
							{
								title: "HRA",
								tooltip: "HRA",
								field: "hra",
								// editable: "never",
							},
							{
								title: "PF Employee",
								tooltip: "PF Employee",
								field: "pfEmployee",
								// editable: "never",
								// render: (item) => {
								// 	return (
								// 		<div className="font-semibold">
								// 			<CopyClipboard value={item?.empId} />
								// 		</div>
								// 	);
								// },
							},
							{
								title: "PF Employer",
								tooltip: "PF Employer",
								field: "pfEmployer",
								editable: "never",
								// render: (item) => {
								// 	return <CopyClipboard value={item?.email} />;
								// },
							},

							{
								title: "ESI Employee",
								tooltip: "ESI Employee",
								field: "esiEmployee",
							},
							{
								title: "ESI Employer",
								tooltip: "ESI Employer",
								field: "esiEmployer",
							},
							{
								title: "Conveyance Allowances",
								tooltip: "Conveyance Allowances",
								field: "conveyanceAllowances",
							},
							{
								title: "Medical Allowances",
								tooltip: "Medical Allowances",
								field: "medicalAllowances",
							},
							// {
							// 	title: "Payslip",
							// 	tooltip: "Payslip",
							// 	field: "salary",
							// 	editable: "never",
							// 	render: ({ item }) => {
							// 		return (
							// 			<Tooltip title="Download Payslip">
							// 				<IconButton>
							// 					<Download className="!text-emerald-500" />
							// 				</IconButton>
							// 			</Tooltip>
							// 		);
							// 	},
							// },
							// {
							// 	title: "Status",
							// 	tooltip: "Status",
							// 	field: "status",
							// 	lookup: { paid: "Paid", unpaid: "Unpaid" },
							// },
							{
								title: "Details",
								tooltip: "Details",
								editable: "never",
								// field: "details",
								render: (row) => {
									return (
										<Tooltip title="Details">
											<IconButton onClick={() => handleInfoOpen(row)}>
												<Info className="!text-blue-500" />
											</IconButton>
										</Tooltip>
									);
								},
							},
						]}
						editable={{
							onRowUpdate: async (oldData, newData) => {
								console.log(newData);
							},
						}}
					/>
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
