import MaterialTable from "@material-table/core";
import { Check, Close, Info, PendingActions } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Tooltip,
  TextField,
} from "@mui/material";
import { HeadStyle, PhotoViewerSmall } from "components/core";
import { LeaveDocuments } from "components/drawer";
import { useAuth, useChange, useFetch } from "hooks";
import moment from "moment";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { Leave } from "types";
import { MuiTblOptions } from "utils";

interface Array {
  photo?: string | undefined;
  name?: string | undefined;
  role?: string | undefined;
  status?: string | undefined;
  credit?: number | undefined;
  monthlyleft?: number | undefined;
  anuualleft?: number | undefined;
  approvedByManager?: string | undefined;
  approvedByHR?: string | undefined;
}
interface Props {
  data?: any;
  mutate?: any;
}

const LeavesColumn = ({ data, mutate }: Props) => {
  const [activeData, setActiveData] = useState<any>({});
  const [isDetails, setIsDetails] = useState(false);
  const [isApproveLeave, setApproveLeave] = useState(false);
  const [isCurrentUserLeaveId, setCurrentUserLeaveId] = useState<string>();
  const [isCurrentData, setCurrentData] = useState<Leave>();
  const { change } = useChange();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [rloading, setRLoading] = useState(false);
  const [isValue, setIsValue] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsValue(event.target.value === "paid");
  };
  const { data: sandwichLeave, isLoading } = useFetch<any>(
    `leaves/leave/days-info?leaveId=${isCurrentUserLeaveId}`
  );

  const rejectLeave = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject!",
    }).then(async (result) => {
      if (result?.isConfirmed) {
        setRLoading(true);
        try {
          const res = await change(`leaves/${id}`, {
            method: "PATCH",
            body: { status: "Rejected" },
          });
          setRLoading(false);
          if (res?.status !== 200) {
            Swal.fire(
              "Error",
              res?.results?.msg || "Something went wrong!",
              "error"
            );
            setRLoading(false);
            return;
          }
          Swal.fire(`Success`, `Status changed successfully!`, `success`);
          mutate();
          return;
        } catch (error) {
          if (error instanceof Error) {
            Swal.fire(`Error`, error?.message, `error`);
          } else {
            Swal.fire(`Error`, "Something Went Wrong", `error`);
          }
          setRLoading(false);
        } finally {
          setRLoading(false);
        }
      }
    });
  };
  const renderStatus = (item: any) => {
    switch (item?.status) {
      case "Approved":
        return (
          <div className="flex justify-center">
            <span className="bg-green-600 text-white white rounded-full px-6 py-1 text-sm">
              {item?.status}
            </span>
          </div>
        );
      case "Pending":
        return (
          <>
            <div className="md:flex grid gap-2 items-center justify-center mt-2 pt-2 space-x-3">
              <Button
                onClick={() => {
                  setApproveLeave(true),
                    setCurrentUserLeaveId(item?.id),
                    setCurrentData(item);
                }}
                className="!bg-green-600"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Check />}
                size="small"
              >
                ACCEPT
              </Button>
              <Button
                onClick={() => rejectLeave(item?.id)}
                className="!bg-red-600"
                disabled={rloading}
                variant="contained"
                startIcon={
                  rloading ? <CircularProgress size={20} /> : <Close />
                }
                size="small"
              >
                DECLINE
              </Button>
            </div>
            <div className="md:flex grid justify-center gap-4">
              {user?.role?.name === "CEO" || user?.role?.name === "HR" ? (
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={isValue ? "paid" : "unPaid"}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="paid"
                      control={
                        <Radio
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 20,
                            },
                          }}
                        />
                      }
                      label="Paid"
                    />
                    <FormControlLabel
                      value="unPaid"
                      control={
                        <Radio
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 20,
                            },
                          }}
                        />
                      }
                      label="UnPaid"
                    />
                  </RadioGroup>
                </FormControl>
              ) : null}
            </div>
          </>
        );
      case "Rejected":
        return (
          <div className="flex justify-center">
            <span className="bg-red-600 text-white rounded-full px-6 py-1 text-sm">
              {item?.status}
            </span>
          </div>
        );
      default:
        return (
          <>
            <span>{item?.status}</span>
          </>
        );
    }
  };
  return (
    <>
      <LeaveDocuments
        data={activeData}
        open={isDetails}
        onClose={() => setIsDetails(false)}
      />
      <IsSandwichLeave
        open={isApproveLeave}
        handleClose={() => setApproveLeave(false)}
        mutate={mutate}
        isCurrentData={isCurrentData}
        sandwichLeave={sandwichLeave}
      />
      <div className="mt-6">
        <MaterialTable
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={<HeadStyle name="Leave Requests" icon={<PendingActions />} />}
          isLoading={!data}
          data={
            !data?.length
              ? []
              : data?.map((_: any, i: number) => ({
                  ..._,
                  sn: i + 1,
                  name: _?.user?.name,
                  photo: _?.user?.photo ? _?.user?.photo : null,
                  role: _?.user?.role,
                  createdAt: moment(_?.createdAt).format("lll"),
                }))
          }
          options={{
            ...MuiTblOptions("Leave Requests"),
            paging: false,
          }}
          columns={[
            {
              title: "#",
              field: "sn",
              editable: "never",
              width: "2%",
            },
            {
              title: "Photo",
              tooltip: "Photo",
              searchable: true,
              export: false,
              field: "photo",
              render: (item) => (
                <PhotoViewerSmall
                  name={item?.name}
                  photo={item?.photo}
                  size="2.5rem"
                />
              ),
            },
            {
              title: "Name",
              tooltip: "Employee Name",
              searchable: true,
              field: "name",
              render: (item) => (
                <span className="font-semibold">{item?.name}</span>
              ),
            },
            {
              title: "Role",
              tooltip: "Role",
              field: "role",
              render: (item) => (
                <span className="italic text-gray-600text-sm font-medium ">
                  {item?.role}
                </span>
              ),
            },
            {
              title: "Details",
              tooltip: "Details",
              field: "status",
              export: false,
              render: (item) => {
                {
                  return (
                    <div
                      onClick={() => {
                        setActiveData(item);
                        setIsDetails(true);
                      }}
                      className="h-7 w-7 bg-black text-white flex justify-center items-center rounded-md cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 shadow-lg"
                    >
                      <Info fontSize="small" />
                    </div>
                  );
                }
              },
            },
            {
              title: "Status",
              tooltip: "Status",
              field: "status",
              render: (item) => {
                {
                  return <div>{renderStatus(item)}</div>;
                }
              },
            },
            {
              title: "Total approved leave",
              tooltip: "Total approved leave",
              field: "totalLeaveThisMonth",
            },
            {
              title: "Total leaves this year",
              tooltip: "Total leaves this year",
              field: "totalLeaveThisYear",
            },
            {
              title: "Created At",
              tooltip: "Created At",
              field: "createdAt",
              render: (item) => (
                <span className="text-sm">
                  {moment(new Date(item?.createdAt).toISOString()).format(
                    "lll"
                  )}
                </span>
              ),
            },
          ]}
        />
      </div>
    </>
  );
};

export default LeavesColumn;
interface ModalProps {
  open: boolean;
  isCurrentData: any;
  handleClose: () => void;
  mutate: () => void;
  sandwichLeave?: any;
}

const IsSandwichLeave = ({
  open,
  handleClose,
  sandwichLeave,
  isCurrentData,
  mutate,
}: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const { user } = useAuth();
  const [isTotalDay, setTotalDay] = useState("0");
  const [isValue, setIsValue] = useState(true);
  const [dayValidationError, setDayValidationError] = useState("");

  const handleDayInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === "" || /^\d+(\.\d*)?$/.test(inputValue)) {
      const numericValue = parseInt(inputValue, 10);
      if (inputValue === "" || numericValue >= 0) {
        setTotalDay(inputValue);
        setDayValidationError("");
      } else {
        setDayValidationError("Value must be between 0 and 12");
      }
    } else {
      setDayValidationError("Please enter a valid number");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsValue(event.target.value === "paid");
    setTotalDay("0");
  };
  const approveLeave = (id?: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve!",
    }).then(async (result) => {
      if (result?.isConfirmed) {
        setLoading(true);
        try {
          // Leave Approve For Paid Leave
          if (isValue) {
            const res = await change(`leaves/${id}`, {
              method: "PATCH",
              body: {
                status: "Approved",
                isPaidLeave: isValue,
              },
            });
            setLoading(false);
            if (res?.status !== 200) {
              Swal.fire(
                "Error",
                res?.results?.msg || "Something went wrong!",
                "error"
              );
              setLoading(false);
              return;
            }
          }
          // Leave Approve For Unpaid Leave
          else {
            const res = await change(`leaves/${id}`, {
              method: "PATCH",
              body: {
                status: "Approved",
                isPaidLeave: isValue,
                unpaidLeaveCount: Number(isTotalDay),
              },
            });
            setLoading(false);
            if (res?.status !== 200) {
              Swal.fire(
                "Error",
                res?.results?.msg || "Something went wrong!",
                "error"
              );
              setLoading(false);
              return;
            }
          }

          Swal.fire(`Success`, `Status changed successfully!`, `success`);
          mutate();
          setTotalDay("0");
          handleClose();
          return;
        } catch (error) {
          if (error instanceof Error) {
            Swal.fire(`Error`, error?.message, `error`);
          } else {
            Swal.fire(`Error`, "Something Went Wrong", `error`);
          }
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
    });
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      maxWidth="lg"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">
        <p className="text-center text-xl font-bold text-theme tracking-wide">
          APPROVE LEAVE
        </p>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            top: 10,
            right: 10,
            position: "absolute",
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Tooltip title="Close">
            <Close />
          </Tooltip>
        </IconButton>
      </DialogTitle>
      <DialogContent className="app-scrollbar" sx={{ p: 2 }}>
        <div className="md:w-[40rem] w-[65vw] md:px-4 px-2 tracking-wide">
          <div className="md:flex grid gap-2 md:justify-between py-3">
            <div>
              {isCurrentData?.variant === "FirstHalf" ||
              isCurrentData?.variant === "SecondHalf" ? (
                <span className="bg-green-600 text-white rounded-full px-2 py-1">
                  Half Day
                </span>
              ) : (
                <>
                  <span className="">Total Days : </span>
                  <span className="bg-green-600 text-white rounded-full px-2 py-1">
                    {sandwichLeave?.totalDays || 0}
                  </span>
                </>
              )}
            </div>
            <div>
              {isCurrentData?.isSandWitch ? (
                <>
                  <span>Total Sandwich Days : </span>
                  <span className="bg-green-600 text-white rounded-full px-2 py-1">
                    {sandwichLeave?.totalSandWitch || 0}
                  </span>
                </>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {user?.role?.name === "CEO" || user?.role?.name === "HR" ? (
              <>
                <div className="flex pt-2 justify-center">
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={isValue ? "paid" : "unPaid"}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="paid"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 20,
                              },
                            }}
                          />
                        }
                        label="Paid"
                      />
                      <FormControlLabel
                        value="unPaid"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 20,
                              },
                            }}
                          />
                        }
                        label="UnPaid"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </>
            ) : null}
            {isValue ? null : (
              <div className="grid gap-2 justify-center">
                <p>Enter Total Unpaid Day</p>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter Day"
                  name="unpaid"
                  value={isTotalDay}
                  onChange={handleDayInputChange}
                  error={Boolean(dayValidationError)}
                  helperText={dayValidationError}
                />
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="!bg-theme"
              disabled={
                loading ||
                (!isValue && isTotalDay === "0") ||
                isTotalDay === "" ||
                isTotalDay === "0." ||
                isTotalDay === "0.0" ||
                dayValidationError !== "" ||
                parseFloat(isTotalDay) < 0.5
              }
              onClick={() => approveLeave(isCurrentData?.id)}
              startIcon={
                loading ? (
                  <CircularProgress color="secondary" size={20} />
                ) : (
                  <Check />
                )
              }
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
