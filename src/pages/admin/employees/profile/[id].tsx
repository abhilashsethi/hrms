import PanelLayout from "layouts/panel";
import { AdminBreadcrumbs, HeadText } from "components/core";
import { EmployeeDetails } from "components/admin";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { BarChart, Check, Close } from "@mui/icons-material";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "@mui/material";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { User } from "types";

const EmployeeProfile = ({
  user,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [activeMonth, setActiveMonth] = useState();
  const router = useRouter();
  const [attendances, setAttendances] = useState<any>([]);
  function renderEventContent(eventInfo: any) {
    return (
      <>
        <span
          className={`flex items-center px-4 py-1 border-[1px] justify-center font-semibold ${
            eventInfo.event.title === "PRESENT"
              ? `bg-emerald-200 text-green-500 border-green-400`
              : `bg-red-200 text-red-500 border-red-400`
          }`}
        >
          {eventInfo.event.title === "PRESENT" ? (
            <Check fontSize="small" />
          ) : (
            <Close fontSize="small" />
          )}
          {eventInfo.event.title === "PRESENT" ? "PRESENT" : "ABSENT"}
        </span>
        {eventInfo.event.title === "PRESENT" && (
          <div className="flex flex-col">
            <span>
              IN TIME :
              {moment(eventInfo.event.extendedProps.inTime).format("hh:mm A")}
            </span>
            <span>
              OUT TIME :
              {moment(eventInfo.event.extendedProps.outTime).format("hh:mm A")}
            </span>
          </div>
        )}
      </>
    );
  }

  const { data: attendanceData, isLoading } = useFetch<any>(
    `attendances/${router?.query?.id}`
  );
  useEffect(() => {
    let reqData = attendanceData?.map((item: any) => {
      return {
        ...item,
        title: "PRESENT",
        date: `${moment(item?.date).format("YYYY-MM-DD")}`,
      };
    });
    setAttendances(reqData);
  }, [attendanceData]);

  const links = [
    { id: 1, page: "Employees", link: "/admin/employees" },
    {
      id: 2,
      page: "Employee Profile",
      link: `/admin/employees/employee-profile?id=${router?.query?.id}`,
    },
  ];

  return (
    <PanelLayout title={`${user.name} - Profile `}>
      <section className="md:px-8 px-2 mx-auto">
        <div className="pb-4">
          <AdminBreadcrumbs links={links} />
        </div>
        <EmployeeDetails />
        {isLoading ? null : (
          <div className="flex gap-3">
            <div className="w-full">
              <div className="mb-4 flex justify-between">
                <HeadText title="Month wise attendance" />
                <Link
                  href={`/admin/employees/attendance-report?empId=${router?.query?.id}&month=${activeMonth}`}
                >
                  <Button
                    variant="contained"
                    className="!bg-theme"
                    startIcon={<BarChart />}
                  >
                    VIEW REPORT
                  </Button>
                </Link>
              </div>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                eventContent={renderEventContent}
                events={attendances}
                datesSet={(dateInfo: any) =>
                  setActiveMonth(dateInfo?.view?.currentStart?.getMonth())
                }
              />
            </div>
          </div>
        )}
      </section>
    </PanelLayout>
  );
};

export default EmployeeProfile;

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of users and generate paths for each user
  const res = await fetch(`https://hrms.yardiot.com/api/v1/users`, {
    headers: {
      "x-access-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNlb0BzZWFyY2hpbmd5YXJkLmNvbSIsIl9pZCI6IjY0NDI3NjljODAxZDk2M2M5OTliMzFkYiIsInJvbGUiOiI2NDNhNmZmYTAzZTg1ZjI1Y2FiMDcxMWEiLCJpYXQiOjE2ODI1NzY5OTV9.FGxmZwdu9oz_SX0Vx_TM9eCbJX-c5ZIccdnoMb3JQkg`,
    },
  });
  const users = (await res.json()) as { data: User[] };

  return {
    paths: users.data.map((u) => ({ params: { id: u.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ user: User }> = async (
  context
) => {
  const res = await fetch(
    `https://hrms.yardiot.com/api/v1/users/${context.params?.id}`
  );
  const response = await res.json();
  return { props: { user: response.data } };
};
