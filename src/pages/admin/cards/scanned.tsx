import MaterialTable from "@material-table/core";
import { AddCardRounded, QrCodeScannerRounded } from "@mui/icons-material";
import { IconButton, Paper, Tooltip } from "@mui/material";
import { AdminBreadcrumbs, HeadStyle, IOSSwitch } from "components/core";
import { CardAssign } from "components/drawer";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import Swal from "sweetalert2";
import { Card, User } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";

const Cards = () => {
  const [isAssign, setIsAssign] = useState<{
    drawer?: boolean;
    activeCardId?: string | null;
  }>({
    drawer: false,
    activeCardId: null,
  });
  const { data, isLoading, mutate } = useFetch<Card[]>(`cards`);
  const { data: users, isLoading: isUsersFetching } = useFetch<User[]>(`users`);
  const { change, isChanging } = useChange();
  const handleBlock = async (e: any, cardId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await change(`cards/${cardId}`, {
          method: "PATCH",
          body: { isBlocked: !e.target?.checked },
        });
        mutate();
        if (res?.status !== 200) {
          Swal.fire(`Error`, "Something went wrong!", "error");
          return;
        }
        Swal.fire(`Success`, "Status updated successfully!!", "success");
        return;
      }
    });
  };
  return (
    <PanelLayout title="Scanned Cards - SY HR MS">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <div className="mt-4">
          <MaterialTable
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={
              <HeadStyle name="Scanned Cards" icon={<QrCodeScannerRounded />} />
            }
            isLoading={isLoading || isUsersFetching || isChanging}
            data={data ? getDataWithSL<Card>(data) : []}
            options={{ ...MuiTblOptions() }}
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
                editable: "never",
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
              {
                title: "Unblock / Block",
                field: "createdAt",
                render: (data) => (
                  <IOSSwitch
                    checked={data?.isBlocked}
                    onChange={(e) => handleBlock(e, data?.cardId)}
                  />
                ),
                editable: "never",
              },
              {
                title: "Assign User",
                field: "createdAt",
                render: (data) => (
                  <div>
                    <Tooltip title="Assign User">
                      <IconButton
                        onClick={() => {
                          setIsAssign({
                            drawer: true,
                            activeCardId: data?.cardId,
                          });
                        }}
                      >
                        <AddCardRounded
                          className="!text-theme"
                          fontSize="large"
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                ),
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
              async onRowDelete(oldData) {
                console.log(oldData);
              },
            }}
          />
        </div>
        <CardAssign
          cardId={isAssign?.activeCardId}
          open={isAssign?.drawer}
          onClose={() => setIsAssign({ drawer: false })}
          mutate={mutate}
        />
      </section>
    </PanelLayout>
  );
};

export default Cards;
const links = [
  { id: 1, page: "Cards", link: "/admin/cards" },
  { id: 2, page: "Scanned Cards", link: "/admin/cards/scanned" },
];
