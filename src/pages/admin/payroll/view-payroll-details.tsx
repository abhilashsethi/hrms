import { CurrencyRupee, Download } from "@mui/icons-material";
import { useEffect, useMemo } from "react";

import { Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import { RenderIconRow } from "components/common";
import {
  AdminBreadcrumbs,
  CopyClipboard,
  HeadText,
  Loader,
  LoaderAnime,
  PhotoViewer,
} from "components/core";
import { Form, Formik } from "formik";
import { downloadFile, useAuth, useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import { NumInWords } from "utils";
import * as Yup from "yup";
import PayrollSkeleton from "components/core/PayrollSkeleton";

const validationSchema = Yup.object().shape({});
const ViewPayrollDetails = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [yearStatus, setYearStatus] = useState(
    new Date().getFullYear().toString()
  );
  const [selectMonth, setSelectMonth] = useState<any>(
    new Date().getMonth().toString()
  );

  const [salaryInfo, setSalaryInfo] = useState<any>();
  const [salaryData, setSalaryData] = useState<any>();

  const handleChange = (event: any) => {
    setYearStatus(event.target.value);
  };
  // console.log(yearStatus);
  const handleMonthChange = (event: any) => {
    setSelectMonth(event.target.value);
  };
  // console.log(selectMonth);

  const { change } = useChange();
  const currentDate = new Date();
  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth() + 1; // January is 0, so we add 1 to get the current month.
  // Function to get total days in a month
  const { data: lossOfPay } = useFetch<any>(
    `leaves/loss-of-pay/${router?.query?.id}?month=${month}&year=${year}`
  );
  const { data: configData, mutate: payRollMutate } = useFetch<any>(
    `payrolls/getAllPayrollConfigs`
  );
  // const { data: yearMonthData } = useFetch<any>(
  // 	`user-salaryinfo/get-by-userId?userId=${router?.query?.id}`
  // );
  // console.log({ yearMonthData });

  const { data: employData, mutate } = useFetch<User>(
    `users/${router?.query?.id}`
  );
  const { data: getMonthYearSalary, isLoading } = useFetch<any>(
    `user-salaryinfo/get-by-userId-and-month-and-year?userId=${router?.query?.id}&month=${selectMonth}&year=${yearStatus}`
  );
  // console.log(getMonthYearSalary);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    if (isMounted.current) {
      // setSelectMonth(getMonthYearSalary?.month);
      // setYearStatus(getMonthYearSalary?.year);
      setSalaryInfo({
        grossSalary: getMonthYearSalary?.grossSalary,
        kpi: getMonthYearSalary?.kpi,
        tds: getMonthYearSalary?.tds,
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [getMonthYearSalary]);
  // console.log(salaryInfo);

  const joiningYear = new Date(employData?.joiningDate as any)?.getFullYear();
  // Get the current year
  const currentYear = new Date().getFullYear();

  // Create an array of objects with the desired format
  const yearsArray = Array.from({ length: currentYear - 1999 }, (_, index) => {
    const year = joiningYear + index;
    return { id: index, value: year.toString(), label: year.toString() };
  });

  // Function to get total days in a month
  function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
  }

  const totalDaysInMonth = getDaysInMonth(year, month);
  const totalWorkingDay =
    totalDaysInMonth === 31 ? 22 : totalDaysInMonth === 30 ? 21 : 20;

  const Gross_Salary: any = salaryInfo?.grossSalary;
  // const New_Fields: any = employData?.salaryInfoNewFields?.length
  // 	? employData?.salaryInfoNewFields
  // 	: [];
  const totalLossOfPay =
    (Gross_Salary / totalWorkingDay) * lossOfPay?.totalUnPaidLeave || 0;
  const Configs = configData?.length ? configData[0] : null;

  const Tds: any = salaryInfo?.tds;
  // const tdsData = useMemo(() => {
  //   const Tds_Amount =
  //     Gross_Salary -
  //     (Configs?.conveyanceAllowances + Configs?.medicalAllowances);
  //   const Tds_Amount_Yearly = Tds_Amount * 12;
  //   const Tds_Yearly = (Tds_Amount_Yearly * Tds) / 100;
  //   const Tds_Monthly = Tds_Yearly / 12;

  //   return {
  //     tdsAmount: Tds_Amount,
  //     tdsAmountYearly: Tds_Amount_Yearly,
  //     tdsYearly: Tds_Yearly,
  //     tdsMonthly: Tds_Monthly,
  //   };
  // }, [Configs?.conveyanceAllowances, Configs?.medicalAllowances]);

  const Professional_Tax = Configs?.ptTaxes?.find(
    (item: any) =>
      Gross_Salary >= item?.startGrossSalary &&
      Gross_Salary <= (item?.endGrossSalary ? item.endGrossSalary : Infinity)
  );
  // console.log(Configs);

  const Tds_Amount =
    Gross_Salary - (Configs?.conveyanceAllowances + Configs?.medicalAllowances);
  const Tds_Amount_Yearly = Tds_Amount * 12;
  const Tds_Yearly = (Tds_Amount_Yearly * Tds) / 100;
  const Tds_Monthly = Tds_Yearly / 12;

  const pf =
    (Configs?.pfEmployee * ((Configs?.basicSalary * Gross_Salary) / 100)) / 100;
  const esi = (Configs?.esiEmployee * Gross_Salary) / 100;
  const Total_Deduction = Number(
    (
      pf +
      esi +
      Professional_Tax?.tax +
      Tds_Monthly +
      (totalLossOfPay ? totalLossOfPay : 0)
    ).toFixed(2)
  );

  const Employer_Pf =
    (Configs?.pfEmployer * ((Configs?.basicSalary * Gross_Salary) / 100)) / 100;
  const Employer_Esi = (Configs?.esiEmployer * Gross_Salary) / 100;

  const All_Allowances = Gross_Salary
    ? (Configs?.basicSalary * Gross_Salary) / 100 +
      (Configs?.hra * Gross_Salary) / 100 +
      Configs?.conveyanceAllowances +
      Configs?.medicalAllowances
    : "---";

  const Special_Allowance =
    Gross_Salary > All_Allowances ? Gross_Salary - All_Allowances : 0;
  const payroll = useMemo(
    () => [
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
        count: `${
          Configs?.basicSalary
            ? (Configs?.hra *
                (Gross_Salary
                  ? (Configs?.basicSalary * Gross_Salary) / 100
                  : 0)) /
              100
            : "---"
        }`,
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
    ],
    [Gross_Salary]
  );
  const deduction = useMemo(
    () => [
      {
        id: 1,
        name: "PF Cont. by Emp.",
        count: `${
          Gross_Salary
            ? (
                (Configs?.pfEmployee *
                  ((Configs?.basicSalary * Gross_Salary) / 100)) /
                100
              ).toFixed(2)
            : "---"
        }`,
      },
      {
        id: 2,
        name: "ESI Cont. by Emp.",
        count: `${
          Gross_Salary
            ? ((Configs?.esiEmployee * Gross_Salary) / 100).toFixed(2)
            : "---"
        }`,
      },
      {
        id: 2,
        name: "Professional Tax",
        count: `${Gross_Salary ? Professional_Tax?.tax : "---"}`,
      },
      {
        id: 3,
        name: "TDS",
        count: `${Gross_Salary ? Tds_Monthly?.toFixed(2) : "---"}`,
      },
      {
        id: 4,
        name: "Total Deduction",
        count: `${Gross_Salary ? Total_Deduction?.toFixed(2) : "---"}`,
      },
      {
        id: 5,
        name: "Net Salary",
        count: `${
          Gross_Salary ? (Gross_Salary - Total_Deduction)?.toFixed(2) : "---"
        }`,
      },
    ],
    [Gross_Salary]
  );

  const ctc = useMemo(
    () => [
      {
        id: 1,
        name: "PF Cont. by Emp.",
        count: `${
          Gross_Salary
            ? (
                (Configs?.pfEmployer *
                  ((Configs?.basicSalary * Gross_Salary) / 100)) /
                100
              ).toFixed(2)
            : "---"
        }`,
      },
      {
        id: 2,
        name: "ESI Cont. by Emp.",
        count: `${
          Gross_Salary
            ? ((Configs?.esiEmployer * Gross_Salary) / 100).toFixed(2)
            : "---"
        }`,
      },
      {
        id: 2,
        name: "KPI",
        count: `${Gross_Salary ? salaryInfo?.kpi : "---"}`,
      },
      {
        id: 2,
        name: "CTC",
        count: `${
          Gross_Salary
            ? (Gross_Salary + Employer_Pf + Employer_Esi).toFixed(2)
            : "---"
        }`,
      },
    ],
    [Gross_Salary]
  );

  const links = [
    user?.role?.name === "CEO" ||
    user?.role?.name === "HR" ||
    user?.role?.name === "DIRECTOR"
      ? { id: 1, page: "Employees", link: "/admin/employees" }
      : { id: 1, page: "My Profile", link: "/admin/employees/my-profile" },

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
      const monthName = monthNames[selectMonth - 1];
      const res = await downloadFile({
        url: `/payrolls/createPdf`,
        method: "POST",
        body: {
          salaryMonth: monthName,
          companyName: "SearchingYard Group",
          employeeName: employData?.name,
          employeeCode: employData?.employeeID,

          designation: employData?.role?.name ? employData?.role?.name : "--",
          hiringDate: employData?.joiningDate
            ? moment(employData?.joiningDate).format("ll")
            : "--",
          dateOfSalaryRecieved: moment(new Date()).format("ll"),
          totalLossOfPay: totalLossOfPay ? totalLossOfPay?.toFixed(2) : 0,
          totalUnPaidLeave: lossOfPay?.totalUnPaidLeave
            ? lossOfPay?.totalUnPaidLeave
            : 0,
          totalWorkingDay: totalWorkingDay ? totalWorkingDay : 0,
          PAN: employData?.panNo ? employData?.panNo : "--",
          bankName: employData?.bankName ? employData?.bankName : "--",
          bankAcNo: employData?.accountNo ? employData?.accountNo : "--",
          UAN: employData?.uanNumber ? employData?.uanNumber : "--",
          payslipNo: "9",
          basicSalary: Gross_Salary
            ? (Configs?.basicSalary * Gross_Salary) / 100
            : 0,
          HRA: Gross_Salary ? (Configs?.hra * Gross_Salary) / 100 : 0,
          conveyance: Configs?.conveyanceAllowances,
          medicalAllowance: Configs?.medicalAllowances,
          specialAllowance: Special_Allowance ? Special_Allowance : 0,
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
          bonus: "0.00",
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
          NetSalary: Gross_Salary
            ? (Gross_Salary - Total_Deduction).toFixed(2)
            : 0,
          NetSalaryInWord: NumInWords(
            Gross_Salary ? Gross_Salary - Total_Deduction : 0
          ),
        },
      });

      setLoading(false);

      Swal.fire(`Success`, `You have successfully downloaded!`, `success`);
      return;
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // const handleSubmit = async (values:any) => {
  // 	console.log(values)
  // }
  return (
    <PanelLayout title="PayRoll Details ">
      <section className="md:px-8 px-2 md:py-4 py-2">
        <div className="px-2 md:px-0">
          <AdminBreadcrumbs links={links} />
        </div>
        <div className="flex justify-center py-2">
          <div className="md:w-3/4 w-full rounded-lg bg-white shadow-lg px-4 py-4">
            <h1 className="text-lg uppercase md:text-xl lg:text-2xl text-theme flex justify-center font-extrabold py-2">
              Employee Pay Roll Details
            </h1>

            <div className="w-1/2 gap-2 flex justify-end items-center">
              <TextField
                fullWidth
                select
                label="Select Year"
                size="small"
                value={yearStatus ? yearStatus : ""}
                onChange={handleChange}
              >
                {yearsArray?.map((option: any) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                select
                label="Select Month"
                size="small"
                value={selectMonth ? selectMonth : ""}
                onChange={handleMonthChange}
              >
                {monthSelect?.map((option: any) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            {isLoading ? (
              <PayrollSkeleton />
            ) : (
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
                    disabled={loading || !Gross_Salary}
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
            )}
          </div>
        </div>
      </section>
    </PanelLayout>
  );
};

export default ViewPayrollDetails;

const monthSelect = [
  { id: 1, value: "Jan", label: "Jan" },
  { id: 2, value: "Feb", label: "Feb" },
  { id: 3, value: "Mar", label: "Mar" },
  { id: 4, value: "Apr", label: "Apr" },
  { id: 5, value: "May", label: "May" },
  { id: 6, value: "Jun", label: "Jun" },
  { id: 7, value: "Jul", label: "Jul" },
  { id: 8, value: "Aug", label: "Aug" },
  { id: 9, value: "Sep", label: "Sep" },
  { id: 10, value: "Oct", label: "Oct" },
  { id: 11, value: "Nov", label: "Nov" },
  { id: 12, value: "Dec", label: "Dec" },
  // { id: 4, value: null, label: "All" },
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
