import { ContentPasteGo, Pending, PendingActions, Sick } from "@mui/icons-material";
import { CASUAL_LEAVE, PENDING, SICK_LEAVE, TOTAL_LEAVES } from "assets/dashboard_Icons";
import { LeaveBarChart, LeaveDonutChart } from "components/analytics";
import { DashboardCard } from "components/core";
import { useFetch } from "hooks";
import { MouseEvent, useEffect, useState } from "react";

const LeaveDashboard = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: leaveData, isLoading } = useFetch<any>(
    `leaves/dashboard/details`
  );
  console.log(leaveData);


  const cards = [
    {
      id: 1,
      icon: <ContentPasteGo fontSize="large" className="text-theme " />,
      count: leaveData?.leaves?.totalLeaves
        ? leaveData?.leaves?.totalLeaves
        : 0,
      title: "Total Leaves",
      bg: "from-blue-500 to-blue-300",
      img: TOTAL_LEAVES.src,
    },
    {
      id: 2,
      icon: <Sick fontSize="large" className="text-theme " />,
      count: leaveData?.leaves?.totalApprovedSickLeave
        ? leaveData?.leaves?.totalApprovedSickLeave
        : 0,
      title: "Approved Sick Leaves",
      bg: "from-yellow-500 to-yellow-300",
      img: SICK_LEAVE.src,
    },
    {
      id: 4,
      icon: <Pending fontSize="large" className="text-theme " />,
      count: leaveData?.leaves?.totalApprovedCasualLeave
        ? leaveData?.leaves?.totalApprovedCasualLeave
        : 0,
      title: "Approved Casual Leaves",
      bg: "from-emerald-500 to-emerald-300",
      img: CASUAL_LEAVE.src,
    },
    {
      id: 5,
      icon: <PendingActions fontSize="large" className="text-theme " />,
      count: leaveData?.leaves?.totalPendingLeaveRequest
        ? leaveData?.leaves?.totalPendingLeaveRequest
        : 0,
      title: "Pending Leave Request",
      bg: "from-green-500 to-green-300",
      img: PENDING.src,
    },
  ];

  return (
    <>
      <div className="flex gap-2 py-4">
        <div className="w-3/4 px-4 ">
          <DashboardCard data={cards} />
        </div>
      </div>
      <div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
        <div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-7 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">Leave Overview</p>

          <LeaveBarChart
            series={[
              {
                name: leaveData?.leaves?.leaveCountMonthWiseArr[0]?.leaveType,
                data: leaveData?.leaves?.leaveCountMonthWiseArr[0]?.leaveCounts?.map((item: any) => item?.count),
              },
              {
                name: leaveData?.leaves?.leaveCountMonthWiseArr[1]?.leaveType,
                data: leaveData?.leaves?.leaveCountMonthWiseArr[1]?.leaveCounts?.map((item: any) => item?.count),
              },
            ]}
            categories={leaveData?.leaves?.leaveCountMonthWiseArr[1]?.leaveCounts?.map((item: any) => item?.month)}
            type="bar"
            text=""
          />
        </div>
        <div className="col-span-12 w-full flex flex-col justify-center md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Leave Ratio</p>
          <LeaveDonutChart
            series={[
              leaveData?.leaves?.leaveTypesList[1]?._count
                ? leaveData?.leaves?.leaveTypesList[1]?._count
                : 0,
              leaveData?.leaves?.leaveTypesList[0]?._count
                ? leaveData?.leaves?.leaveTypesList[0]?._count
                : 0,
            ]}
            type="pie"
            labels={["Casual Leave", "Sick Leave"]}
          />
        </div>
      </div>
    </>
  );
};

export default LeaveDashboard;
