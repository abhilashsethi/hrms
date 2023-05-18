import { ClientLineCharts } from "components/analytics";
import ClientBarGraph from "components/analytics/ClientBarGraph";

const ClientDashboardCharts = () => {
  return (
    <div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
      <div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-8 !border-grey-500 rounded-xl !shadow-xl">
        <p className="text-lg text-center font-bold">Client Strength</p>
        {/* <ClientMultiDataChart text="Client Strength" type="bar" /> */}
        <ClientBarGraph
          series={[
            {
              name: "ACTIVE CLIENTS",
              data: [44, 55, 41, 37, 56],
            },
            {
              name: "INACTIVE CLIENTS",
              data: [32, 32, 33, 22, 23],
            },
            {
              name: "BLOCKED CLIENTS",
              data: [10, 22, 8, 15, 13],
            },
          ]}
          categories={["2022", "2021", "2020", "2019", "2018"]}
          colors={["#5B50A1", "#C43C5C", "#E97451"]}
          title=""
          barHeight={360}
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
