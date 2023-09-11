import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { Check, Close } from "@mui/icons-material";
import { AdminBreadcrumbs } from "components/core";
import { addDays } from "date-fns";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Attendance, AttendanceData, EventInfo } from "types";

const MyAttendance = () => {
  const [activeMonth, setActiveMonth] = useState<Date | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [attendances, setAttendances] = useState<AttendanceData[]>([]);
  const { user } = useAuth();
  const links = [
    {
      id: 2,
      page: "My Attendance",
      link: "/admin/attendances/my-attendance",
    },
  ];

  const { data: attendanceData, isLoading } = useFetch<Attendance[]>(
    `attendances/${user?.id ? `${user?.id}` : ``}`
  );
  useEffect(() => {
    if (!attendanceData) return;
    // Filter and format the events based on the current month
    const currentMonthEvents = attendanceData
      .filter((item) => {
        const eventMonth = moment(item?.date).month();
        const currentMonth = moment(activeMonth).month();
        return eventMonth === currentMonth;
      })
      .map((item) => ({
        ...item,
        title: "PRESENT",
        date: `${moment(item?.date).format("YYYY-MM-DD")}`,
      }));

    setAttendances(currentMonthEvents);
  }, [attendanceData, activeMonth]);

  const tomorrow = addDays(new Date(), 1);
  const disabledDates = [];
  for (let i = 0; i < 365; i++) {
    disabledDates.push(addDays(tomorrow, i));
  }
  function renderEventContent(eventInfo: EventInfo) {
    return (
      <>
        <span
          className={`flex items-center px-4 py-1 border-[1px] justify-center font-semibold ${
            eventInfo.event.title === "PRESENT"
              ? ` ${
                  eventInfo.event?.extendedProps?.WFH
                    ? "bg-green-200 text-green-500 border-green-400"
                    : "text-green-500 border-green-400 bg-emerald-200"
                } `
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
            {eventInfo.event?.extendedProps?.WFH
              ? "WFH"
              : eventInfo.event.title === "PRESENT"
              ? "P"
              : "A"}
          </span>
          {/* Mobile View end */}
        </span>
        {eventInfo.event.title === "PRESENT" && (
          <div className="md:flex flex-col hidden">
            {eventInfo.event?.extendedProps?.WFH ? (
              <>
                <span className="px-4 py-2 text-center">Work From Home.</span>
              </>
            ) : (
              <>
                <span>
                  IN TIME :
                  {moment(eventInfo?.event?.extendedProps?.inTime).format(
                    "hh:mm A"
                  )}
                </span>
                <span>
                  OUT TIME :
                  {moment(eventInfo?.event?.extendedProps?.outTime).format(
                    "hh:mm A"
                  )}
                </span>
              </>
            )}
          </div>
        )}
      </>
    );
  }
  const calendarClassName = "responsive-calendar";

  useEffect(() => {
    // Function to update the screen width state
    const updateScreenWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check if window is available (client-side) before adding the event listener
    if (typeof window !== "undefined") {
      updateScreenWidth();
      window.addEventListener("resize", updateScreenWidth);
      return () => {
        window.removeEventListener("resize", updateScreenWidth);
      };
    }
  }, []);
  return (
    <PanelLayout title="Today Attendance">
      <section className="md:px-8 px-3 py-4">
        <div className="mt-4 py-2 lg:flex justify-between">
          <AdminBreadcrumbs links={links} />
        </div>
        <div className={calendarClassName}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            eventContent={renderEventContent}
            events={attendances}
            datesSet={(dateInfo) =>
              setActiveMonth(dateInfo?.view?.currentStart)
            }
          />
        </div>
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

export default MyAttendance;
