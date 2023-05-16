import { DailyAttendance, DonutChart } from "components/analytics";
interface Props {
  allData?: any;
  absentData?: any;
  presentData?: any;
}
const AttendanceCharts = ({ allData, absentData, presentData }: Props) => {
  return (
    <>
      <div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
        <div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">
            Attendance from last week
          </p>
          <DailyAttendance text="" type="area" />
        </div>
        <div className="col-span-12 pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Today's Attendance</p>
          <DonutChart
            labels={["Present", "Absent"]}
            series={[
              presentData?.results?.length ? presentData?.results?.length : `0`,
              absentData?.results?.length ? absentData?.results?.length : `0`,
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
