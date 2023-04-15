import MaterialTable from "@material-table/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { Card } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";

const Cards = () => {
  const { data, isLoading } = useFetch<Card[]>(`cards`);
  return (
    <PanelLayout title="Scanned Cards - SY HR MS">
      <section className="container mx-auto">
        <MaterialTable
          title="All Scanned Cards"
          isLoading={isLoading}
          data={data ? getDataWithSL<Card>(data) : []}
          options={{ ...MuiTblOptions(), selection: true }}
          columns={[
            {
              title: "#",
              field: "sl",
              editable: "never",
              width: "2%",
            },
            {
              title: "Card ID",
              field: "cardId",
            },
            {
              title: "Assigned User",
              field: "userId",
            },
            {
              title: "Last Updated",
              field: "updatedAt",
              render: (data) => clock(data.updatedAt).fromNow(),
            },
            {
              title: "Created",
              field: "createdAt",
              render: (data) => new Date(data.createdAt).toDateString(),
            },
          ]}
          editable={{
            onRowDelete: async (oldData) => {},
          }}
        />
      </section>
    </PanelLayout>
  );
};

export default Cards;
