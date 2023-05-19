import { RoleBarChart, RoleDonutChart } from "components/analytics";

interface Props {
  data?: any;
}
const DashboardChartsGuest = ({ data }: Props) => {
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">Role Overview</p>
          <RoleBarChart
            labels={
              data?.GuestInfo?.totalGuest ? data?.GuestInfo?.totalGuest : ""
            }
            data={
              data?.GuestInfo?.totalGuest ? data?.GuestInfo?.totalGuest : ""
            }
            type="bar"
            text=""
          />
        </div>
        <div className="w-full flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Role Details</p>
          <RoleDonutChart
            labels={
              data?.GuestInfo?.totalGuest ? data?.GuestInfo?.totalGuest : ""
            }
            series={
              data?.GuestInfo?.totalGuest ? data?.GuestInfo?.totalGuest : ""
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
