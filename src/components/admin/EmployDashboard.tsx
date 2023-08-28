import {
  AssignmentTurnedIn,
  ContactPhone,
  DevicesOther,
  PendingActions,
} from "@mui/icons-material";
import {
  CARDICON1,
  CARDICON2,
  CARDICON3,
  CARDICON4,
} from "assets/dashboard_Icons";
import {
  DailyAttendance,
  GenderRation,
  RolewiseStrength,
} from "components/analytics";
import { DashboardCard, UpcomingLeaves } from "components/core";
import { useFetch } from "hooks";
import { Projects, User } from "types";

const EmployDashboard = () => {
  const { data: cardDetails } = useFetch<{
    cards?: {
      scannedCards?: number | undefined;
      blockedCards?: number | undefined;
      cardsAssignedToEmployee?: number | undefined;
      cardsAssignedToGuest?: number | undefined;
    };
  }>(`cards/dashboard/details`);

  const { data: projectData } = useFetch<Projects[]>(`projects`);

  const { data: employeeData } = useFetch<User[]>(`users`);

  const { data: employeeDetails } = useFetch<any>(`users/dashboard/details`);
  const roleData = employeeDetails?.departmentWiseUsers;
  const cards = [
    {
      id: 1,
      icon: <ContactPhone className="text-theme" />,
      count: employeeData?.length ? employeeData?.length : 0,
      title: "All Employees",
      img: CARDICON1.src,
      bg: "from-blue-500 to-blue-300",
      className: "h-40",
      link: "/admin/employees/all-employees",
    },
    {
      id: 4,
      icon: <DevicesOther className="text-theme" />,
      count: cardDetails?.cards?.cardsAssignedToEmployee
        ? cardDetails?.cards?.cardsAssignedToEmployee
        : 0,
      title: "Assigned to Cards",
      bg: "from-purple-500 to-purple-300",
      img: CARDICON4.src,
      className: "h-40",
      link: "/admin/cards/scanned",
    },
    {
      id: 2,
      icon: <PendingActions className="text-theme" />,
      count: employeeData?.filter((item) => item?.isBlocked)?.length || 0,
      title: "Blocked",
      bg: "from-yellow-500 to-yellow-300",
      img: CARDICON2.src,
      className: "h-40",
      link: "/admin/employees/all-employees",
    },
    {
      id: 3,
      icon: <AssignmentTurnedIn className="text-theme" />,
      count:
        employeeData?.filter((item) => item?.isBlocked === false)?.length || 0,
      title: "Un-Blocked",
      bg: "from-emerald-500 to-emerald-300",
      img: CARDICON3.src,
      className: "h-40",
      link: "/admin/employees/all-employees",
    },
  ];

  return (
    <>
      <div className="md:flex gap-2 py-6">
        <div className="md:w-2/3 w-full px-4 ">
          <div className="flex gap-2 py-4">
            <DashboardCard data={cards} />
          </div>

          <div className="grid content-between !mb-6">
            <div className=" bg-white w-full py-3 !border-grey-500 rounded-xl !shadow-xl">
              <div className="font-semibold flex justify-center py-4 pl-2 ">
                <p>Last Week Employee's Report </p>
              </div>
              <DailyAttendance
                type="area"
                data={employeeDetails?.lastWeekAttendanceArr}
                totalUsers={employeeDetails?.totalUsers}
              />
            </div>
          </div>
        </div>
        <div className="md:w-1/3 w-full py-4 p-3 bg-white rounded-xl shadow-xl flex flex-col gap-3">
          <h1 className="mt-2 font-bold text-theme">PROJECTS</h1>
          <div className="h-40 w-full border-2 rounded-xl py-4 px-6 flex tracking-wide">
            <div className="w-1/2 border-r-2 h-full flex flex-col gap-3 justify-center items-center">
              <span className="text-lg font-semibold text-theme">
                {projectData?.length ? projectData?.length : 0}
              </span>
              <span className="w-1/2 text-center font-semibold">
                Total Projects
              </span>
            </div>
            <div className="w-1/2 h-full flex flex-col gap-3 justify-center items-center">
              <span className="text-lg font-semibold text-theme">
                {projectData?.length
                  ? projectData?.filter((item) => item?.status === "Ongoing")
                      ?.length
                  : 0}
              </span>
              <span className="w-1/2 text-center font-semibold">
                Projects Ongoing
              </span>
            </div>
          </div>
          <UpcomingLeaves
            data={employeeData}
            employeeDetails={employeeDetails}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 content-between gap-6 ">
        <div className="col-span-12 pt-9 px-3 w-full bg-white  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">
            Department-wise Strength
          </p>
          <RolewiseStrength
            series={
              roleData?.length
                ? [
                    {
                      name: "Strength",
                      data: roleData?.length
                        ? roleData?.map((item: any) =>
                            item?._count ? item?._count : 0
                          )
                        : [],
                    },
                  ]
                : []
            }
            categories={
              roleData?.length
                ? roleData?.map((item: any) =>
                    item?.name ? item?.name : "Not Specified"
                  )
                : []
            }
            text=""
            type="bar"
          />
        </div>
        <div className="col-span-12  pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold bg-white text-center">
            Employee Gender Ratio
          </p>
          <GenderRation
            series={
              employeeDetails?.groupByGender?.length
                ? employeeDetails?.groupByGender?.map(
                    (item: any) => item?._count
                  )
                : []
            }
            labels={
              employeeDetails?.groupByGender?.length
                ? employeeDetails?.groupByGender?.map((item: any) =>
                    item?.gender ? item?.gender : "Not specified"
                  )
                : []
            }
            text=""
            type="donut"
          />
        </div>
      </div>
    </>
  );
};

export default EmployDashboard;
