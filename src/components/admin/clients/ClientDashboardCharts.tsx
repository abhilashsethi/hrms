import { ClientLineCharts } from "components/analytics";
import ClientBarGraph from "components/analytics/ClientBarGraph";
interface Props {
  cards?: any;
}
const ClientDashboardCharts = ({ cards }: Props) => {
  console.log(cards);
  return (
    <div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
      <div className="col-span-12 pt-9 w-full bg-white gap-5 md:col-span-12 lg:col-span-8 !border-grey-500 rounded-xl !shadow-xl">
        <p className="text-lg text-center font-bold">Client Strength</p>
        {/* <ClientMultiDataChart text="Client Strength" type="bar" /> */}
        <ClientBarGraph
          labels={
            cards?.clients?.countryWiseClientList?.length
              ? cards?.clients?.countryWiseClientList?.map(
                  (item: any) => item?._count
                )
              : []
          }
          data={
            cards?.clients?.countryWiseClientList?.length
              ? cards?.clients?.countryWiseClientList?.map(
                  (item: any) => item?._count
                )
              : []
          }
          type="bar"
          text=""
        />
      </div>
      <div className="col-span-12 px-2 py-4 pt-9 bg-white w-full gap-5 md:col-span-12 lg:col-span-4 !border-grey-500 rounded-xl !shadow-xl">
        <p className="text-center text-lg font-bold">Country Strength</p>
        <ClientLineCharts
          labels={
            cards?.clients?.countryWiseClientList?.length
              ? cards?.clients?.countryWiseClientList?.map(
                  (item: any) => item?._count
                )
              : []
          }
          series={
            cards?.clients?.countryWiseClientList?.length
              ? cards?.clients?.countryWiseClientList?.map(
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
  );
};

export default ClientDashboardCharts;
