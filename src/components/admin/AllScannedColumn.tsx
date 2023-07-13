import MaterialTable from "@material-table/core";
import {
  QrCodeScannerRounded,
  AddCardRounded,
  Done,
  PersonRemoveRounded,
  MeetingRoomRounded,
} from "@mui/icons-material";
import { IconButton, Paper, Tooltip } from "@mui/material";
import { CopyClipboard, HeadStyle, IOSSwitch, Loader } from "components/core";
import { CardAssign, RoomAccessDrawer } from "components/drawer";
import { useChange, useFetch } from "hooks";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
import { Card, User } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";
interface Props {
  data?: Card[];
  mutate?: any;
  user?: any;
}

const AllScannedColumn = ({ data, user, mutate }: Props) => {
  const [isAccess, setIsAccess] = useState<{
    dialogue?: boolean;
    cardId?: string | null;
  }>({ dialogue: false, cardId: null });
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
          Swal.fire(`Info`, "It will take some time", "info");
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
      <RoomAccessDrawer
        mutate={mutate}
        open={isAccess?.dialogue}
        onClose={() => setIsAccess({ dialogue: false })}
        cardId={isAccess?.cardId}
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
                  name: _?.userId
                    ? _?.user?.name
                    : _?.guestId
                    ? _?.guest?.name
                    : "---",
                  validFrom: _?.userId
                    ? "---"
                    : _?.guestId
                    ? _?.validFrom
                    : "---",
                  validTill: _?.userId
                    ? "---"
                    : _?.guestId
                    ? _?.validTill
                    : "---",
                  userType: _?.userId
                    ? "Employee"
                    : _?.guestId
                    ? "Guest"
                    : "---",
                  userID: _?.userId ? _?.user?.employeeID : "---",
                })) as Card[])
          }
          options={{ ...MuiTblOptions(), paging: false }}
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
              field: "name",
            },
            {
              title: "ID",
              field: "userID",
              emptyValue: "Not Assigned",
              render: (item: any) => {
                return (
                  <span className="font-semibold text-gray-600">
                    {item?.user?.employeeID ? (
                      <CopyClipboard value={item?.userID} />
                    ) : (
                      item?.userID
                    )}
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
              title: "Unblock / Block",
              field: "isBlocked",
              align: "center",
              render: (data) => (
                <>
                  {data?.userId || data?.guestId ? (
                    <>
                      <IOSSwitch
                        checked={data?.isBlocked}
                        onChange={(e) => handleBlock(e, data?.cardId)}
                      />
                    </>
                  ) : null}
                </>
              ),
              editable: "never",
              hidden:
                user?.role?.name == "CEO" || user?.role?.name == "HR"
                  ? false
                  : true,
            },
            {
              title: "Assign / Remove",
              field: "employeeId",
              export: false,
              hidden:
                user?.role?.name == "CEO" || user?.role?.name == "HR"
                  ? false
                  : true,

              render: (data) => (
                <>
                  {data?.userId || data?.guestId ? (
                    <div className="flex gap-2 items-center">
                      <Tooltip title="Remove Person">
                        <div className="h-10 w-10 bg-gradient-to-r from-red-500 to-red-400 shadow-lg rounded-full">
                          <IconButton
                            onClick={() => handleRemove(data?.cardId)}
                          >
                            <PersonRemoveRounded className="!text-white" />
                          </IconButton>
                        </div>
                      </Tooltip>
                      <Tooltip title="Room Access">
                        <div className="h-10 w-10 bg-gradient-to-r from-theme-200 via-theme-50 to-secondary-200 shadow-lg rounded-full">
                          <IconButton
                            onClick={() =>
                              setIsAccess({
                                dialogue: true,
                                cardId: data?.cardId,
                              })
                            }
                          >
                            <MeetingRoomRounded className="!text-blue-600" />
                          </IconButton>
                        </div>
                      </Tooltip>
                    </div>
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
              title: "Room Access",
              field: "employeeId",
              export: false,
              hidden:
                user?.role?.name == "CEO" || user?.role?.name == "HR"
                  ? true
                  : false,

              render: (data) => (
                <>
                  <div className="flex gap-2 items-center">
                    <Tooltip title="Room Access">
                      <div className="h-10 w-10 bg-gradient-to-r from-theme-200 via-theme-50 to-secondary-200 shadow-lg rounded-full">
                        <IconButton
                          onClick={() =>
                            setIsAccess({
                              dialogue: true,
                              cardId: data?.cardId,
                            })
                          }
                        >
                          <MeetingRoomRounded className="!text-blue-600" />
                        </IconButton>
                      </div>
                    </Tooltip>
                  </div>
                </>
              ),
              editable: "never",
            },
            {
              title: "Valid From",
              field: "validFrom",
              emptyValue: "---",
              render: (data) => {
                return data?.guestId ? (
                  <span className="text-xs">
                    {moment(data.validFrom).format("lll")}
                  </span>
                ) : (
                  "---"
                );
              },
              // editable: "never",
            },
            {
              title: "Valid Till",
              field: "validTill",
              emptyValue: "---",
              render: (data) => {
                return data?.guestId ? (
                  <span className="text-xs">
                    {moment(data.validTill).format("lll")}
                  </span>
                ) : (
                  "---"
                );
              },
              // editable: "never",
            },
            {
              title: "Last Updated",
              field: "updatedAt",
              render: (data) => {
                return (
                  <span className="text-xs">
                    {clock(data.updatedAt).fromNow()}
                  </span>
                );
              },
              editable: "never",
            },
            {
              title: "Created",
              field: "createdAt",
              render: (data) => {
                return (
                  <span className="text-xs">
                    {new Date(data.createdAt).toDateString()}
                  </span>
                );
              },
              editable: "never",
            },
          ]}
          editable={{
            onRowDelete:
              user?.role?.name == "CEO" || user?.role?.name == "HR"
                ? async (oldData) => {
                    try {
                      const response = await change(
                        `cards/delete/${oldData?.id}`,
                        {
                          method: "DELETE",
                        }
                      );
                      if (response?.status !== 200) {
                        Swal.fire("Error", "Something went wrong!", "error");
                      }
                      mutate();
                      Swal.fire("Success", "Deleted successfully!", "success");
                    } catch (error) {
                      console.log(error);
                    }
                  }
                : undefined,
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

const getEmployeeName = ({ id }: any) => {
  const { data: empData } = useFetch<{
    name?: string;
  }>(`users/${id}`);
  return empData?.name;
};
const getGuestName = ({ id }: any) => {
  const { data: guestData } = useFetch<{
    name?: string;
  }>(`guests/${id}`);
  return guestData?.name;
};
