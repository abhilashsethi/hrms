import PanelLayout from "layouts/panel";
import { AdminBreadcrumbs, HeadText } from "components/core";
import { EmployeeDetails } from "components/admin";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Check, Close } from "@mui/icons-material";

const EmployeeProfile = () => {
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
            <span>IN TIME : 12:20 PM</span>
            <span>OUT TIME : 12:20 PM</span>
          </div>
        )}
      </>
    );
  }
  return (
    <PanelLayout title="User Profile - SY HR MS">
      <section className="px-8 mx-auto p-4">
        <div className="pb-4">
          <AdminBreadcrumbs links={links} />
        </div>
        <EmployeeDetails />
        {/* <CardHead /> */}
        {/* <ProfileTabs /> */}
        <div className="w-full">
          <div className="mb-4">
            <HeadText title="Month wise attendance" />
          </div>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            eventContent={renderEventContent}
            events={attendance}
          />
        </div>
      </section>
    </PanelLayout>
  );
};

export default EmployeeProfile;
const links = [
  { id: 1, page: "Employees", link: "/admin/employees" },
  {
    id: 2,
    page: "Employee Profile",
    link: "/admin/employees/employee-profile",
  },
];

const attendance = [
  { title: "PRESENT", date: "2023-04-03" },
  { title: "ABSENT", date: "2023-04-04" },
  { title: "PRESENT", date: "2023-04-05" },
  { title: "PRESENT", date: "2023-04-06" },
  { title: "PRESENT", date: "2023-04-07" },
  { title: "PRESENT", date: "2023-04-10" },
  { title: "PRESENT", date: "2023-04-11" },
  { title: "PRESENT", date: "2023-04-12" },
  { title: "PRESENT", date: "2023-04-13" },
  { title: "PRESENT", date: "2023-04-14" },
  { title: "PRESENT", date: "2023-04-17" },
  { title: "PRESENT", date: "2023-04-18" },
  { title: "PRESENT", date: "2023-04-19" },
  { title: "PRESENT", date: "2023-04-20" },
  { title: "PRESENT", date: "2023-04-21" },
  { title: "PRESENT", date: "2023-04-24" },
  { title: "PRESENT", date: "2023-04-25" },
  { title: "PRESENT", date: "2023-04-26" },
];
