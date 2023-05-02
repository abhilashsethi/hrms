import MaterialTable from "@material-table/core";
import { QrCodeScannerRounded, AddCardRounded } from "@mui/icons-material";
import { IconButton, Paper, Tooltip } from "@mui/material";
import { HeadStyle, IOSSwitch, Loader } from "components/core";
import { CardAssign } from "components/drawer";
import { useChange, useFetch } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Card, User } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";

const AllScannedColumn = () => {
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
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <CardAssign
        cardId={isAssign?.activeCardId}
        open={isAssign?.drawer}
        onClose={() => setIsAssign({ drawer: false })}
        mutate={mutate}
      />
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
              // editable: "never",
            },
            {
              title: "Assigned User",
              field: "userId",
              editable: "never",
              emptyValue: "Not Assigned",
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
              align: "center",
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
            // async onRowUpdate(newData, oldData) {
            //   try {
            //     const response = await change(`cards/${newData.id}`, {
            //       method: "PATCH",
            //       body: { userId: newData.userId },
            //     });
            //     mutate();
            //     Swal.fire("Success", "Updated successfully!", "success");
            //   } catch (error) {
            //     console.log(error);
            //     Swal.fire("Error", "Something went wrong!!", "error");
            //   }
            // },
            async onRowDelete(oldData) {
              const response = await change(`cards/${oldData.id}`, {
                method: "DELETE",
              });
              mutate();
              Swal.fire("Success", "Removed successfully!", "success");
            },
          }}
        />
      </div>
    </div>
  );
};

export default AllScannedColumn;
