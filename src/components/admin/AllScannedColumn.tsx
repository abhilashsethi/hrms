import MaterialTable from "@material-table/core";
import {
  QrCodeScannerRounded,
  AddCardRounded,
  Done,
  PersonRemoveRounded,
} from "@mui/icons-material";
import { IconButton, Paper, Tooltip } from "@mui/material";
import { CopyClipboard, HeadStyle, IOSSwitch, Loader } from "components/core";
import { CardAssign } from "components/drawer";
import { useChange, useFetch } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Card, User } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";
interface Props {
  data?: Card[];
  mutate?: any;
}

const AllScannedColumn = ({ data, mutate }: Props) => {
  const [isAssign, setIsAssign] = useState<{
    drawer?: boolean;
    activeCardId?: string | null;
  }>({
    drawer: false,
    activeCardId: null,
  });
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
  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove employee!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          const response = await change(`cards/${id}`, {
            method: "DELETE",
          });
          if (response?.status !== 200) {
            Swal.fire("Error", "Something went wrong!", "error");
          }
          Swal.fire("Success", "Removed successfully!", "success");
          mutate();
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
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
          isLoading={!data}
          data={
            !data
              ? []
              : (data?.map((_, i: number) => ({
                  ..._,
                  sl: i + 1,
                  employeeId: _?.user?.employeeID,
                  userType:
                    _?.user?.employeeID && !_?.validFrom
                      ? "Employee"
                      : _?.validFrom
                      ? "Guest"
                      : "---",
                  userID:
                    _?.user?.employeeID && !_?.validFrom
                      ? _?.user?.employeeID
                      : _?.validFrom
                      ? _?.guestId
                      : "---",
                })) as Card[])
          }
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
              title: "ID",
              field: "userID",
              emptyValue: "Not Assigned",
              render: (item: any) => {
                return (
                  <span className="font-semibold text-gray-600">
                    <CopyClipboard value={item?.userID} />
                  </span>
                );
              },
              // editable: "never",
            },
            {
              title: "User Type",
              field: "userType",
              emptyValue: "---",
              // editable: "never",
            },
            {
              title: "ID",
              field: "employeeId",
              emptyValue: "Not Assigned",
              render: (item) => {
                return (
                  <span className="font-semibold text-gray-600">
                    <CopyClipboard value={item?.user?.employeeID} />
                  </span>
                );
              },
              // editable: "never",
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
              title: "Assign / Remove",
              field: "employeeId",
              render: (data) => (
                <>
                  {data?.user?.employeeID && !data?.validFrom ? (
                    <Tooltip title="Remove Person">
                      <div className="h-10 w-10 bg-white shadow-lg rounded-full">
                        <IconButton onClick={() => handleRemove(data?.cardId)}>
                          <PersonRemoveRounded className="!text-red-500" />
                        </IconButton>
                      </div>
                    </Tooltip>
                  ) : data?.validFrom ? (
                    <Tooltip title="Remove Person">
                      <div className="h-10 w-10 bg-white shadow-lg rounded-full">
                        <IconButton onClick={() => handleRemove(data?.cardId)}>
                          <PersonRemoveRounded className="!text-red-500" />
                        </IconButton>
                      </div>
                    </Tooltip>
                  ) : (
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
                  )}
                </>
              ),
              editable: "never",
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

const GuestDetails = ({ id }: any) => {
  const { data: guestData } = useFetch<{
    name?: string;
    email?: string;
    designation?: string;
    gender?: string;
  }>(`guests/${id}`);
  return (
    <div className="w-[70%] flex flex-col items-end text-right tracking-wide">
      {/* <p className="text-xs text-blue-900 font-semibold">
        <span>GUEST ID : </span>
        {item?.user?.employeeID}
      </p> */}
      <p className="text-xs text-blue-900 font-semibold">
        <span>GUEST NAME : </span> {guestData?.name}
      </p>
      <p className="text-xs text-slate-900 font-semibold">
        {guestData?.designation}
      </p>
      <p className="text-xs text-blue-900 tracking-wide">{guestData?.email}</p>
      <p className="text-xs text-blue-900 tracking-wide">{guestData?.gender}</p>
    </div>
  );
};
