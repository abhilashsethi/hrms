import MaterialTable from "@material-table/core";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { Card, User } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";

const Cards = () => {
  const { data, isLoading, mutate } = useFetch<Card[]>(`cards`);
  const { data: users, isLoading: isUsersFetching } = useFetch<User[]>(`users`);
  const { change, isChanging } = useChange();
  return (
    <PanelLayout title="Scanned Cards - SY HR MS">
      <section className="w-11/12 mx-auto">
        <MaterialTable
          title="All Scanned Cards"
          isLoading={isLoading || isUsersFetching || isChanging}
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
              editable: "never",
            },
            {
              title: "Assigned User",
              field: "userId",
              lookup: users?.reduce((lookup: any, user) => {
                lookup[user.id] = user.name;
                return lookup;
              }, {}),
            },
            {
              title: "Last Updated",
              field: "updatedAt",
              render: (data) => clock(data.updatedAt).fromNow(),
              editable: "never",
            },
            {
              title: "Created",
              field: "createdAt",
              render: (data) => new Date(data.createdAt).toDateString(),
              editable: "never",
            },
          ]}
          editable={{
            async onRowUpdate(newData, oldData) {
              const response = await change(`cards/${newData.cardId}`, {
                method: "PATCH",
                body: { userId: newData.userId },
              });
              console.log(response);
              mutate();
            },
            async onRowDelete(oldData) {},
          }}
        />
      </section>
    </PanelLayout>
  );
};

export default Cards;
