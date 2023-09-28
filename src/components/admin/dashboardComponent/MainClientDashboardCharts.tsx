import { Tooltip } from "@mui/material";
import { GuestBarChart, GuestDonutChart } from "components/analytics";
import { NoDatas, PhotoViewer } from "components/core";
import { useAuth, useFetch } from "hooks";
import moment from "moment";
import Link from "next/link";
import { Client } from "types";
interface Props {
  data?: any;
}
const MainClientDashboardCharts = ({ data }: Props) => {
  const { user } = useAuth();
  console.log(user?.id);
  const { data: clientData, isLoading } = useFetch<Client>(
    `dashboards/project/client/dashboard/info/${user?.id}`
  );
  const { data: projectData } = useFetch<any>(
    `clients/get/all/projects/${user?.id}`
  );

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">Ticket Issue Details</p>
          {clientData?.ticketsCountAccordingProjects?.length ? (
            <GuestBarChart
              labels={
                clientData?.ticketsCountAccordingProjects?.length
                  ? clientData?.ticketsCountAccordingProjects?.map(
                      (item) => item?.projectName
                    )
                  : []
              }
              data={
                clientData?.ticketsCountAccordingProjects?.length
                  ? clientData?.ticketsCountAccordingProjects?.map(
                      (item) => item?.ticketCount
                    )
                  : []
              }
              type="bar"
              text=""
            />
          ) : (
            <NoDatas title="No Tickets" />
          )}
        </div>
        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">
            Tickets Status Overview
          </p>
          {clientData?.ticketCounts?.length ? (
            <GuestDonutChart
              labels={
                clientData?.ticketCounts?.length
                  ? clientData?.ticketCounts?.map((item) => item?.name)
                  : []
              }
              series={
                clientData?.ticketCounts?.length
                  ? clientData?.ticketCounts?.map((item) => item?.count)
                  : []
              }
              text=""
              type="pie"
              colors={["#BD33B5", "#005d32"]}
            />
          ) : (
            <NoDatas title="No Tickets" />
          )}
        </div>
        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">
            Current Month Projects Overview
          </p>
          {clientData?.projectCountStatusWise?.length ? (
            <GuestDonutChart
              labels={
                clientData?.projectCountStatusWise?.length
                  ? clientData?.projectCountStatusWise?.map((item) => item?._id)
                  : []
              }
              series={
                clientData?.projectCountStatusWise?.length
                  ? clientData?.projectCountStatusWise?.map(
                      (item) => item?.count
                    )
                  : []
              }
              text=""
              type="donut"
              colors={["#25d366", "#BD33B5", "#BD0309"]}
            />
          ) : (
            <NoDatas title="No Projects" />
          )}
        </div>
        <div className="w-full px-2 py-4 bg-white !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Recent Projects</p>
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:px-8 px-2 py-4 gap-4">
            {projectData
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
                    <div className="grid lg:grid-cols-2 gap-4 text-sm text-center font-semibold">
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
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainClientDashboardCharts;
