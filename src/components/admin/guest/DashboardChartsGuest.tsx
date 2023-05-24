import { GuestBarChart, GuestDonutChart } from "components/analytics";

interface Props {
  data?: any;
}
const DashboardChartsGuest = ({ data }: Props) => {
  const getMonthName = (monthNumber: any) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "long" });
  };
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">Guest Overview</p>
          <GuestBarChart
            labels={
              data?.GuestInfo?.guestCountMonthWise?.length
                ? data?.GuestInfo?.guestCountMonthWise?.map((item: any) =>
                    getMonthName(item?.month)
                  )
                : []
            }
            data={
              data?.GuestInfo?.guestCountMonthWise?.length
                ? data?.GuestInfo?.guestCountMonthWise?.map(
                    (item: any) => item?.guestCount
                  )
                : []
            }
            type="bar"
            text=""
          />
        </div>
        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Guest Details</p>
          <GuestDonutChart
            labels={
              data?.GuestInfo?.guestCountByGender?.length
                ? data?.GuestInfo?.guestCountByGender?.map(
                    (item: any) => item?.gender
                  )
                : []
            }
            series={
              data?.GuestInfo?.guestCountByGender?.length
                ? data?.GuestInfo?.guestCountByGender?.map(
                    (item: any) => item?._count
                  )
                : []
            }
            text=""
            type="donut"
            colors={[
              "#106EAD",
              "#C33C5E",
              "#25d366",
              "#BD33B5",
              "#E60023",
              "#005d32",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardChartsGuest;
