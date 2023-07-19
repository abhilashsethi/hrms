import {
  Construction,
  Diversity2,
  ExitToApp,
  Groups3,
  MeetingRoom,
  People,
  PlaylistAddCheckCircleRounded,
  QrCodeScannerRounded,
  SupportAgent,
} from "@mui/icons-material";
import { Grid, Tooltip } from "@mui/material";
import { CardAsset } from "assets/home";
import { GuestBarChart, GuestDonutChart } from "components/analytics";
import { NoDatas, PhotoViewer } from "components/core";
import { useAuth, useFetch } from "hooks";
import moment from "moment";
import Link from "next/link";

const AdminDashboard = () => {
  const { user } = useAuth();

  const { data: projectData } = useFetch<any>(`projects`);
  const { data: leaveAll } = useFetch<any>(`leaves/all?orderBy=createdAt:asc`);
  console.log(projectData);

  const cards = [
    {
      id: 1,
      icon: <People fontSize="medium" className="text-theme" />,
      count: "34",
      title: "Total Employees",
      color: "bg-[#bbcbff]",
      link: "/admin/employees/all-employees",
    },
    {
      id: 2,
      icon: <QrCodeScannerRounded fontSize="medium" className="text-theme" />,
      count: "12",
      title: "Scanned Cards",
      color: "bg-[#b9e9fd]",
      link: "/admin/cards/scanned",
    },
    {
      id: 3,
      icon: (
        <PlaylistAddCheckCircleRounded
          fontSize="medium"
          className="text-theme "
        />
      ),
      count: "30",
      title: "Today's Attendance",
      color: "bg-[#f6c8ff]",
      link: "/admin/attendances/today",
    },
    {
      id: 4,
      icon: <People fontSize="medium" className="text-theme" />,
      count: "43",
      title: "Projects",
      color: "bg-[#feb76f]",
      link: "/admin/projects/all-projects",
    },
  ];

  return (
    <>
      <div className="flex gap-2 py-4 md:flex-row flex-col">
        <div className="md:w-3/4 px-4 w-full">
          <Grid
            container
            spacing={{
              xs: 1,
              sm: 2,
              md: 2,
            }}
          >
            {cards?.map((item, index) => (
              <Grid key={item?.id} item lg={3} md={6} sm={12} xs={12}>
                <Link href={item?.link}>
                  <div
                    className={`h-40 ${item?.color} w-full p-4 flex flex-col rounded-xl shadow-xl cursor-pointer hover:scale-105 transition duration-500 ease-in-out relative overflow-hidden`}
                  >
                    <img
                      className="absolute right-[-35px] top-[-12px] h-24 object-contain"
                      src={CardAsset.src}
                      alt=""
                    />
                    <div className="bg-white h-12 w-12 rounded-lg flex items-center justify-center">
                      {item?.icon}
                    </div>
                    <span className="text-lg mt-6">{item?.count}</span>
                    <span className="font-semibold tracking-wide text-sm ">
                      {item?.title}
                    </span>
                  </div>
                </Link>
              </Grid>
            ))}
            <div className="w-full mt-5">
              <p className="font-semibold text-lg pb-5 ml-5">Quick Access</p>{" "}
              <div className="flex justify-between px-8 flex-wrap">
                {Quick_Access?.map((item, index) => {
                  return (
                    <Tooltip key={index} title={item?.title}>
                      <Link
                        href={item?.link}
                        // onClick={item?.onClick}
                        className="w-24 h-24 rounded-full group flex justify-start items-center hover:scale-105 ease-in-out transition-all duration-400 cursor-pointer !text-blue-600 flex-col gap-2"
                      >
                        <div
                          className={`p-2 w-12 h-12 flex justify-center items-center ${item?.color} shadow-lg rounded-md transition-all ease-in-out duration-200`}
                        >
                          <span>{item?.icon}</span>
                        </div>
                        <p className="text-xs text-center font-semibold">
                          {item?.title}
                        </p>
                      </Link>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </Grid>
          <div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
            {/* attandance section */}
            <div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-6 !border-gray-500 rounded-xl !shadow-xl">
              <p className="text-center font-semibold text-lg">
                Branch Wise Employee Strength
              </p>
              <GuestDonutChart
                labels={["Approved", "Pending", "Rejected"]}
                series={[3, 4, 10]}
                text=""
                type="pie"
                colors={[
                  "#cddc39",
                  "#a855f7",
                  "#03a9f4",
                  "#ef4444",
                  "#3f51b5",
                  "#e91e63",
                  "#00bcd4",
                  "#ffeb3b",
                  "#76ff03",
                  "#2962ff",
                ]}
              />
            </div>
            {/* Project section */}
            <div className="px-2 col-span-12 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-6 !border-gray-500 rounded-xl !shadow-xl">
              <div className="w-full py-4">
                <p className="text-lg font-bold text-center">Recent Projects</p>
                <div className="grid lg:grid-cols-2 grid-cols-1 px-2 py-4 gap-4">
                  {projectData?.length ? (
                    projectData
                      ?.slice(0, 4)
                      ?.sort(
                        (a: any, b: any) =>
                          (new Date(b?.createdAt) as any) -
                          (new Date(a?.createdAt) as any)
                      )
                      ?.map((item: any) => (
                        <Link
                          href={`/admin/projects/project-details?id=${item?.id}`}
                          key={item?.id}
                        >
                          <div
                            className={`h-full w-full bg-slate-200 py-4 lg:px-5 px-2 flex flex-col gap-2 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition duration-300 ease-in-out`}
                          >
                            <Tooltip title="Project Manager">
                              <span className="flex w-full justify-center justify-items-center">
                                <PhotoViewer />
                              </span>
                            </Tooltip>
                            <span className="font-semibold text-center tracking-wide text-lg">
                              {item?.name}
                            </span>
                            <div className="grid lg:grid-cols-2 gap-4 text-xs text-center font-semibold">
                              <div className="flex flex-col gap-1 rounded-lg px-3 py-2 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 text-white justify-center w-full">
                                <span>Start Date</span>
                                <span>
                                  {item?.endDate
                                    ? moment(item?.endDate).format("ll")
                                    : "Not Specified"}
                                </span>
                              </div>
                              <div className="flex flex-col gap-1 rounded-lg px-3 py-2 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 text-white justify-center w-full">
                                <span>End Date</span>
                                <span>
                                  {item?.startDate
                                    ? moment(item?.startDate).format("ll")
                                    : "Not Specified"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                  ) : (
                    <NoDatas title={"No Recent Projects"} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/4 w-full p-2 rounded-xl shadow-xl flex flex-col gap-3">
          <div className="px-2 col-span-12 bg-white w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-6 !border-gray-500 rounded-xl !shadow-xl">
            <div className="font-semibold pl-2 py-3 space-y-2">
              <p>Recent Leaves </p>
            </div>
            <div className="h-[24rem] overflow-scroll">
              {leaveAll?.length ? (
                <>
                  {leaveAll?.slice(0, 4)?.map?.((item: any, i: any) => {
                    return (
                      <div key={i}>
                        <div className="border border-1 shadow-lg rounded-lg p-5 mb-2">
                          <div className="flex items-center gap-3">
                            <PhotoViewer
                              name={item?.user?.name}
                              photo={item?.user?.photo}
                              size="3.3rem"
                            />
                            <div className="flex flex-col">
                              <p className="font-medium text-sm">
                                Name:{" "}
                                <span className="font-semibold text-sm">
                                  {item?.user?.name}
                                </span>
                              </p>
                              <p className="font-medium text-sm">
                                Id:{" "}
                                <span className="font-semibold text-sm">
                                  {item?.user?.employeeID}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-3">
                            <div className="text-sm font-semibold ">
                              <p>Leave Type</p>
                              <p>{item?.type}</p>
                            </div>
                            <button
                              className={`hover:scale-105 transition duration-500 ease-in-out text-xs font-medium ${
                                item?.status === "Rejected"
                                  ? `text-red-700 bg-red-300`
                                  : item?.status === "Pending"
                                  ? `text-yellow-700 bg-yellow-300`
                                  : `text-green-700 bg-green-300`
                              } p-1 h-7 rounded-lg text-center`}
                            >
                              {item?.status}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <NoDatas title={"No Leave Taken"} />
              )}
            </div>
          </div>
          <div className="px-2 col-span-12 bg-white w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-6 !border-gray-500 rounded-xl !shadow-xl">
            <div className="font-semibold pl-2 py-3 space-y-2">
              <p>Recent Tenders </p>
            </div>
            <div className="h-[24rem] overflow-scroll">
              {leaveAll?.length ? (
                <>
                  {leaveAll?.slice(0, 4)?.map?.((item: any, i: any) => {
                    return (
                      <div key={i}>
                        <div className="border border-1 shadow-lg rounded-lg p-5 mb-2">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <p className="font-medium text-sm">
                                Title:{" "}
                                <span className="font-semibold text-sm">
                                  {item?.user?.name}
                                </span>
                              </p>
                              <p className="font-medium text-sm">
                                Tender No :{" "}
                                <span className="font-semibold text-sm">
                                  {item?.user?.employeeID}
                                </span>
                              </p>
                              <p className="font-medium text-sm">
                                Category :{" "}
                                <span className="font-semibold text-sm">
                                  {item?.user?.employeeID}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-3">
                            <div className="text-sm font-semibold ">
                              <p>Submission Date </p>
                              <p>{item?.type}</p>
                            </div>
                            <button
                              className={`hover:scale-105 transition duration-500 ease-in-out text-xs font-medium ${
                                item?.status === "Rejected"
                                  ? `text-red-700 bg-red-300`
                                  : item?.status === "Pending"
                                  ? `text-yellow-700 bg-yellow-300`
                                  : `text-green-700 bg-green-300`
                              } p-1 h-7 rounded-lg text-center`}
                            >
                              {item?.status}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <NoDatas title={"No Leave Taken"} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
        <div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-6 !border-grey-500 rounded-xl !shadow-xl">
          <p className="font-semibold text-lg text-center">Tender Overview</p>
          <GuestBarChart
            labels={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
            data={[23, 8, 10, 10, 20, 10, 15, 23, 14, 8, 10, 9]}
            type="bar"
            text=""
          />
        </div>
        <div className="col-span-12 pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-6 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-semibold text-lg text-center">Project Overview</p>
          <GuestDonutChart
            labels={[
              "Completed Task",
              "Inprogress Tasks",
              "On Hold Tasks",
              "Pending Tasks",
              "Review Tasks",
            ]}
            series={[166, 115, 31, 47, 27]}
            text=""
            type="donut"
            colors={[
              "#cddc39",
              "#a855f7",
              "#03a9f4",
              "#ef4444",
              "#3f51b5",
              "#e91e63",
              "#00bcd4",
              "#ffeb3b",
              "#76ff03",
              "#2962ff",
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

const Quick_Access = [
  {
    id: 1,
    icon: <ExitToApp fontSize="medium" className="text-white" />,
    title: "Leaves",
    color: "bg-[#673ab7]",
    link: "/admin/leaves/all-leaves",
  },
  {
    id: 2,
    icon: <Groups3 fontSize="medium" className="text-white" />,
    title: "Roles",
    color: "bg-[#e91e63]",
    link: "/admin/roles/all-roles",
  },
  {
    id: 3,
    icon: <Diversity2 fontSize="medium" className="text-white" />,
    title: "Departments",
    color: "bg-[#ff9800]",
    link: "/admin/department/all-department",
  },
  {
    id: 4,
    icon: <MeetingRoom fontSize="medium" className="text-white" />,
    title: "Meetings",
    color: "bg-[#00bcd4]",
    link: "/admin/meetings/all-meetings",
  },
  {
    id: 5,
    icon: <People fontSize="medium" className="text-white" />,
    title: "Clients",
    color: "bg-[#607d8b]",
    link: "/admin/clients/all-clients",
  },
  {
    id: 6,
    icon: <Construction fontSize="medium" className="text-white" />,
    title: "Technologies",
    color: "bg-[#3f51b5]",
    link: "/admin/technologies/all-technologies",
  },
  {
    id: 7,
    icon: <SupportAgent fontSize="medium" className="text-white" />,
    title: "Support",
    color: "bg-[#4caf50]",
    link: "/admin/support",
  },
];
