import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import FullCalendar from "@fullcalendar/react";
import { Check, Close } from "@mui/icons-material";
import { AdminBreadcrumbs } from "components/core";
import { addDays } from "date-fns";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
interface MyDateRef {
  current: HTMLInputElement | null;
  setOpen: (value: boolean) => void;
}

const MyAttendance = () => {
  const [activeMonth, setActiveMonth] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [attendances, setAttendances] = useState<any>([]);
  const { user } = useAuth();

  const links = [
    {
      id: 2,
      page: "My Attendance",
      link: "/admin/attendances/my-attendance",
    },
  ];

  const { data: attendanceData, isLoading } = useFetch<any>(
    `attendances/${user?.id ? `${user?.id}` : ``}`
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

  const tomorrow = addDays(new Date(), 1);
  const disabledDates = [];
  for (let i = 0; i < 365; i++) {
    disabledDates.push(addDays(tomorrow, i));
  }
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
  const calendarClassName = "responsive-calendar";

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
    <PanelLayout title="Today Attendance - Admin Panel">
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
            datesSet={(dateInfo: any) =>
              setActiveMonth(dateInfo?.view?.currentStart?.getMonth())
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
