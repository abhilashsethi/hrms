import { ClientLineCharts } from "components/analytics";
import ClientBarGraph from "components/analytics/ClientBarGraph";
interface Props {
  cards?: any;
}
const ClientDashboardCharts = ({ cards }: Props) => {
  return (
    <div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
      <div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-8 !border-grey-500 rounded-xl !shadow-xl">
        <p className="text-lg text-center font-bold">Client Strength</p>
        {/* <ClientMultiDataChart text="Client Strength" type="bar" /> */}
        <ClientBarGraph
          labels={
            cards?.clients?.countryWiseClientList?.length
              ? cards?.clients?.countryWiseClientList?.map(
                  (item: any) => item?.country
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
      <div className="col-span-12 pt-9 w-full gap-5 md:col-span-12 lg:col-span-4 !border-grey-500 rounded-xl !shadow-xl">
        <p className="text-center text-lg font-bold">Unblock/Block Report</p>
        <ClientLineCharts text="" type="donut" />
      </div>
    </div>
  );
};

export default ClientDashboardCharts;
