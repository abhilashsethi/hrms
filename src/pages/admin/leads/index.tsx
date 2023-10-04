import MaterialTable from "@material-table/core";
import { Leaderboard } from "@mui/icons-material";
import { HeadStyle, HeadText } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import React from "react";
import { HOLIDAY } from "types";
import { MuiTblOptions } from "utils";

const Leads = () => {
  const {
    data: holidayData,
    mutate,
    pagination,
    isLoading,
  } = useFetch<HOLIDAY[]>(`holidays`);
  return (
    <PanelLayout title="Leads">
      <section className="md:px-8 px-2 py-4">
        <MaterialTable
          title={<HeadStyle name="All Leads" icon={<Leaderboard />} />}
          isLoading={!holidayData}
          data={
            holidayData
              ? holidayData?.map((_: HOLIDAY, i: number) => ({
                  ..._,
                  sl: i + 1,
                  startDate: new Date(_?.startDate).toDateString(),
                  endDate: _?.endDate
                    ? new Date(_?.endDate).toDateString()
                    : "---",
                }))
              : []
          }
          options={{
            ...MuiTblOptions(),
            selection: false,
            paging: false,
            search: true,
          }}
          columns={[
            {
              title: "#",
              field: "sl",
              editable: "never",
              searchable: true,
            },
            {
              title: "Title",
              tooltip: "Title",
              field: "title",
              searchable: true,
            },

            {
              title: "Start Date",
              field: "startDate",
              editable: "never",
            },
            {
              title: "End Date",
              field: "endDate",
              editable: "never",
            },
          ]}
        />
      </section>
    </PanelLayout>
  );
};

export default Leads;
