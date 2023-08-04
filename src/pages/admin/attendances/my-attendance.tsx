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
  return (
    <PanelLayout title="Today Attendance - Admin Panel">
      <section className="px-8 py-4">
        <div className="mt-4 py-2 lg:flex justify-between">
          <AdminBreadcrumbs links={links} />
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
      </section>
    </PanelLayout>
  );
};

export default MyAttendance;
