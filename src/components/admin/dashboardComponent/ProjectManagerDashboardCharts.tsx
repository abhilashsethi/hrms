import { GuestBarChart, GuestDonutChart } from "components/analytics";
import { NoDatas, PhotoViewer } from "components/core";
import { useAuth, useFetch } from "hooks";
import { Tooltip } from "@mui/material";
import Link from "next/link";
import moment from "moment";
import { ManagerDashboard, Projects } from "types";

const ProjectManagerDashboardCharts = () => {
  const { user } = useAuth();

  const { data: projectData } = useFetch<Projects[]>(
    `projects?${user?.id ? `&managerId=${user?.id}` : ""}`
  );
  const { data: projectDashboard } = useFetch<ManagerDashboard>(
    `dashboards/project/manager/dashboard/${user?.id}`
  );

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 grid-cols-1 content-between gap-6">
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">Attendance Overview</p>
          <GuestBarChart
            labels={
              projectDashboard?.allAttendanceMonthWise?.length
                ? projectDashboard?.allAttendanceMonthWise?.map(
                    (item) => item?.month
                  )
                : []
            }
            data={
              projectDashboard?.allAttendanceMonthWise?.length
                ? projectDashboard?.allAttendanceMonthWise?.map(
                    (item) => item?.count
                  )
                : []
            }
            type="bar"
            text=""
          />
        </div>

        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Projects Overview</p>
          <GuestDonutChart
            labels={
              projectDashboard?.projectCountStatusWise?.length
                ? projectDashboard?.projectCountStatusWise?.map(
                    (item) => item?._id
                  )
                : []
            }
            series={
              projectDashboard?.projectCountStatusWise?.length
                ? projectDashboard?.projectCountStatusWise?.map(
                    (item) => item?.count
                  )
                : []
            }
            text=""
            type="donut"
            colors={["#25d366", "#cddc39", "#448aff"]}
          />
        </div>
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">Ticket Issue Details</p>
          <GuestBarChart
            labels={
              projectDashboard?.ticketsCountAccordingProjects?.length
                ? projectDashboard?.ticketsCountAccordingProjects?.map(
                    (item) => item?.projectName
                  )
                : []
            }
            data={
              projectDashboard?.ticketsCountAccordingProjects?.length
                ? projectDashboard?.ticketsCountAccordingProjects?.map(
                    (item) => item?.ticketCount
                  )
                : []
            }
            type="bar"
            text=""
          />
        </div>
        <div className="w-full px-2 py-4 bg-white !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Recent Projects</p>
          {projectData?.length === 0 && (
            <NoDatas title="No leave Details yet!" />
          )}
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:px-8 px-2 py-4 gap-4">
            {projectData
              ?.sort(
                (a, b) =>
                  (new Date(b?.createdAt) as any) -
                  (new Date(a?.createdAt) as any)
              )
              ?.slice(0, 4)
              ?.map((item) => (
                <Link
                  href={`admin/projects/project-details?id=${item?.id}`}
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
                    <div className="grid lg:grid-cols-2 gap-4 text-sm text-center font-semibold">
                      <div className="flex flex-col gap-1 rounded-lg px-3 py-2 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 text-white justify-center w-full">
                        <span>Start Date</span>
                        <span>
                          {item?.startDate
                            ? moment(item?.startDate).format("LL")
                            : "Not specified"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 rounded-lg px-3 py-2 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 text-white justify-center w-full">
                        <span>End Date</span>
                        <span>
                          {item?.endDate
                            ? moment(item?.endDate).format("LL")
                            : "Not specified"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagerDashboardCharts;
