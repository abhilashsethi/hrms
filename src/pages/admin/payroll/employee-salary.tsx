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
// import { SalaryInfo } from "components/dialogues";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import { MuiTblOptions, getDataWithSL } from "utils";

const EmployeeSalary = () => {
  const [isInfo, setIsInfo] = useState<boolean>(false);
  return (
    <PanelLayout title="Employee Salary ">
      <section className="px-8 py-4">
        {/* <SalaryInfo open={isInfo} handleClose={() => setIsInfo(false)} /> */}
        <AdminBreadcrumbs links={links} />
        <div className="mt-4">
          <MaterialTable
            title={
              <HeadStyle name="Employee Salary" icon={<PeopleRounded />} />
            }
            isLoading={!data}
            options={{ ...MuiTblOptions() }}
            columns={[
              {
                title: "#",
                field: "sl",
                editable: "never",
                width: "2%",
              },
              {
                title: "Image",
                tooltip: "Image",
                field: "photo",
                editable: "never",
                render: ({ item }) => {
                  return (
                    <PhotoViewer
                      size="2.5rem"
                      photo={DEFAULTPROFILE?.src}
                      name={`${item?.name}`}
                    />
                  );
                },
              },
              {
                title: "Name",
                tooltip: "Name",
                field: "name",
                editable: "never",
              },
              {
                title: "Employee ID",
                tooltip: "Employee ID",
                field: "empId",
                editable: "never",
                render: (item) => {
                  return (
                    <div className="font-semibold">
                      <CopyClipboard value={item?.empId} />
                    </div>
                  );
                },
              },
              {
                title: "Email",
                tooltip: "Email",
                field: "email",
                editable: "never",
                render: (item) => {
                  return <CopyClipboard value={item?.email} />;
                },
              },
              // {
              // 	title: "Salary",
              // 	tooltip: "Salary",
              // 	field: "salary",
              // 	editable: "never",
              // },
              {
                title: "Gross Salary",
                tooltip: "Gross Salary",
                field: "grossSalary",
              },
              {
                title: "TDS",
                tooltip: "TDS",
                field: "tds",
              },
              {
                title: "KPI",
                tooltip: "KPI",
                field: "kpi",
              },
              {
                title: "Payslip",
                tooltip: "Payslip",
                field: "salary",
                editable: "never",
                render: ({ item }) => {
                  return (
                    <Tooltip title="Download Payslip">
                      <IconButton>
                        <Download className="!text-emerald-500" />
                      </IconButton>
                    </Tooltip>
                  );
                },
              },
              {
                title: "Status",
                tooltip: "Status",
                field: "status",
                lookup: { paid: "Paid", unpaid: "Unpaid" },
              },
              {
                title: "Details",
                tooltip: "Details",
                editable: "never",
                field: "details",
                render: (item) => {
                  return (
                    <Tooltip title="Details">
                      <IconButton onClick={() => setIsInfo(true)}>
                        <Info className="!text-blue-500" />
                      </IconButton>
                    </Tooltip>
                  );
                },
              },
            ]}
            editable={{
              onRowUpdate: async (oldData, newData) => {},
            }}
            data={data ? getDataWithSL<any>(data) : []}
          />
        </div>
      </section>
    </PanelLayout>
  );
};

export default EmployeeSalary;

const links = [
  { id: 1, page: "Employee Salary", link: "/admin/payroll/employee-salary" },
];

const data = [
  {
    id: 1,
    name: "Srinu Reddy",
    empId: "SY10007",
    email: "Srinu@sy.com",
    grossSalary: "$7500",
    tds: "10%",
    kpi: "5%",
    status: "unpaid",
  },
  {
    id: 2,
    name: "Loushik Kumar",
    empId: "SY10008",
    email: "Loushik@sy.com",
    grossSalary: "$7500",
    tds: "10%",
    kpi: "5%",
    status: "unpaid",
  },
  {
    id: 3,
    name: "Chinmay",
    empId: "SY10009",
    email: "Chinmay@sy.com",
    grossSalary: "$7500",
    tds: "10%",
    kpi: "5%",
    status: "unpaid",
  },
];
