import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import FullCalendar from "@fullcalendar/react";
import { BarChart, Check, Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import { EmployeeDetails } from "components/admin";
import { AdminBreadcrumbs, HeadText, Loader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const EmployeeProfile = () => {
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
          <span className="md:block hidden">
            {eventInfo.event.title === "PRESENT" ? (
              <Check fontSize="small" />
            ) : (
              <Close fontSize="small" />
            )}
            {eventInfo.event.title === "PRESENT" ? "PRESENT" : "ABSENT"}
          </span>
          {/* Mobile View start */}
          <span className="md:hidden px-2 block">
            {eventInfo.event.title === "PRESENT" ? "P" : "A"}
          </span>
          {/* Mobile View end */}
        </span>
        {eventInfo.event.title === "PRESENT" && (
          <div className="md:flex flex-col hidden">
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
    {
      id: 2,
      page: "Employee Profile",
      link: `/admin/employees/profile/${router?.query?.id}`,
    },
  ];
  const calendarClassName = "responsive-calendar";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to update the screen width state
    const updateScreenWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check if window is available (client-side) before adding the event listener
    if (typeof window !== "undefined") {
      updateScreenWidth();
      window.addEventListener("resize", updateScreenWidth); // Listen for window resize events
      return () => {
        window.removeEventListener("resize", updateScreenWidth); // Remove event listener to prevent memory leaks
      };
    }
  }, []);
  return (
    <PanelLayout title={`Employee Profile - SY HR Management System`}>
      <section className="md:px-8 px-2 py-4 mx-auto">
        <div className="pb-4 mt-4">
          <AdminBreadcrumbs links={links} />
        </div>
        <EmployeeDetails />
        {isLoading ? null : (
          <div className="md:flex grid gap-3">
            <div className="w-full">
              <div className="mb-4 md:flex py-2 justify-between">
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
              <div className={calendarClassName}>
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
          </div>
        )}
        {typeof window !== "undefined" && (
          <style>
            {`
            .fc-header-toolbar {
              flex-direction: ${isMobile ? "column" : "row"} !important;
            }
          `}
          </style>
        )}
      </section>
    </PanelLayout>
  );
};

export default EmployeeProfile;
