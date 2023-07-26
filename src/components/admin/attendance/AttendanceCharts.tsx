import { DailyAttendance, DonutChart } from "components/analytics";
import { useFetch } from "hooks";
interface Props {
  dashboardDetails?: any;
  absentData?: any;
  presentData?: any;
}
const AttendanceCharts = ({
  dashboardDetails,
  absentData,
  presentData,
}: Props) => {
  const { data: employeeDetails } = useFetch<any>(`users/dashboard/details`);

  return (
    <>
      <div className="grid grid-cols-12 py-2 content-between gap-6 !mb-6">
        <div className="col-span-12 bg-white pt-9 w-full  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
          {/* <p className="font-bold text-lg text-center">
						Attendance from last week
					</p> */}
          <DailyAttendance
            text="This Week Employee's Report"
            type="area"
            data={employeeDetails?.lastWeekAttendanceArr}
            totalUsers={employeeDetails?.totalUsers}
          />
        </div>
        <div className="col-span-12 bg-white pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Today's Attendance</p>
          <DonutChart
            labels={["Present", "Absent"]}
            series={[
              presentData?.length ? presentData?.length : `0`,
              absentData?.length ? absentData?.length : `0`,
            ]}
            text=""
            type="donut"
          />
        </div>
      </div>
    </>
  );
};

export default AttendanceCharts;
