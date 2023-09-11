import { Check, Close, KeyboardArrowLeftRounded } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Tooltip,
} from "@mui/material";
import { PhotoViewer } from "components/core";
import { LeaveDocuments } from "components/drawer";
import { useAuth, useChange, useFetch } from "hooks";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { Leave } from "types";
interface Props {
  data?: Leave[];
  mutate: () => void;
}
const LeavesGrid = ({ data, mutate }: Props) => {
  const { user } = useAuth();
  return (
    <>
      <section className="md:py-2 py-2">
        <Grid container spacing={3}>
          {data?.map((item) => (
            <>
              {user?.role?.name === "PROJECT MANAGER" ? (
                <CardComponent
                  item={item?.leave}
                  mutate={mutate}
                  key={item?.id}
                  mainId={item?.id}
                />
              ) : (
                <CardComponent
                  item={item}
                  mainId={item?.id}
                  mutate={mutate}
                  key={item?.id}
                />
              )}
            </>
          ))}
        </Grid>
      </section>
    </>
  );
};

export default LeavesGrid;
const steps = ["Team Manager", "Hr"];

interface Props {
  item?: Leave;
  mutate: () => void;
  mainId?: string;
}

const CardComponent = ({ item, mainId, mutate }: Props) => {
  const { user } = useAuth();
  const { change } = useChange();
  const [loading, setLoading] = useState(false);
  const [rloading, setRLoading] = useState(false);
  const [isDocuments, setIsDocuments] = useState(false);
  const [isApproveLeave, setApproveLeave] = useState(false);
  const [isCurrentUserLeaveId, setCurrentUserLeaveId] = useState<string>();
  const [isCurrentData, setCurrentData] = useState<Leave>();

  const { data: sandwichLeave, isLoading } = useFetch<any>(
    `leaves/leave/days-info?leaveId=${isCurrentUserLeaveId}`
  );
  const managerApproveLeave = (id?: string) => {
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
          const res = await change(`leaves/manager/request/${mainId}`, {
            method: "PATCH",
            body: {
              status: "Approved",
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
          Swal.fire(`Success`, `Status changed successfully!`, `success`);
          mutate();
          return;
        } catch (error) {
          console.log(error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
    });
  };
  const managerRejectLeave = (id?: string) => {
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
        setRLoading(true);
        try {
          const res = await change(`leaves/manager/request/${mainId}`, {
            method: "PATCH",
            body: {
              status: "Rejected",
            },
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
          console.log(error);
          setRLoading(false);
        } finally {
          setRLoading(false);
        }
      }
    });
  };

  const rejectLeave = (id?: string) => {
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
          console.log(error);
          setRLoading(false);
        } finally {
          setRLoading(false);
        }
      }
    });
  };
  const renderStatus = (item?: Leave) => {
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
            <span className="bg-yellow-600 text-white rounded-full px-6 py-1 text-sm">
              {item?.status}
            </span>
            {user?.role?.name === "PROJECT MANAGER" ? (
              <div className="md:flex items-center justify-center mt-2 pt-2 space-x-3">
                <Button
                  onClick={() => managerApproveLeave(item?.id)}
                  className="!bg-green-600"
                  variant="contained"
                  disabled={loading}
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <Check />
                  }
                  size="small"
                >
                  ACCEPT
                </Button>
                <Button
                  onClick={() => managerRejectLeave(item?.id)}
                  className="!bg-red-600"
                  disabled={rloading}
                  variant="contained"
                  startIcon={
                    rloading ? <CircularProgress size={20} /> : <Close />
                  }
                  size="small"
                >
                  REJECT
                </Button>
              </div>
            ) : (
              <div className="md:flex items-center justify-center mt-2 pt-2 space-x-3">
                <Button
                  onClick={() => {
                    setApproveLeave(true),
                      setCurrentUserLeaveId(item?.id),
                      setCurrentData(item);
                  }}
                  className="!bg-green-600"
                  variant="contained"
                  disabled={loading}
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <Check />
                  }
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
                  REJECT
                </Button>
              </div>
            )}

            <div></div>
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
            <div className="pt-4">
              <Stepper activeStep={2} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </>
        );
    }
  };

  return (
    <Grid item lg={3} sm={12} xs={12}>
      <IsSandwichLeave
        item={item}
        open={isApproveLeave}
        handleClose={() => setApproveLeave(false)}
        mutate={mutate}
        isCurrentData={isCurrentData}
        sandwichLeave={sandwichLeave}
      />
      <div
        className={`relative h-full mt-7 flex flex-col px-2 justify-center justify-items-center w-full pt-4 text-center rounded-md shadow-xl drop-shadow-lg bg-gradient-to-r from-rose-100 to-teal-100 hover:scale-105 ease-in-out transition-all duration-200 md:mt-0`}
      >
        <LeaveDocuments
          data={item}
          open={isDocuments}
          onClose={() => setIsDocuments(false)}
        />
        <span className="absolute right-[8px] top-[8px]">
          <Tooltip title="Details">
            <IconButton onClick={() => setIsDocuments(true)}>
              <KeyboardArrowLeftRounded />
            </IconButton>
          </Tooltip>
        </span>

        <div className="flex justify-center ">
          <PhotoViewer name={item?.user?.name} photo={item?.user?.photo} />
        </div>
        <div className="flex-1 my-4">
          <p className="text-base font-semibold leading-snug">
            {item?.user?.name}
          </p>
          <p className="mb-2 text-sm">{item?.user?.role}</p>
          <div className="mb-2 text-sm group flex items-center justify-center gap-2 pb-2">
            <div className="flex w-full justify-center gap-2">
              <div className="text-xs cursor-pointer bg-[#bbcbff] rounded-lg shadow-lg py-1 px-2">
                <p className="font-semibold">Total approved leave</p>
                <p>{item?.totalLeaveThisMonth || 0}</p>
              </div>
              <div className="text-xs cursor-pointer bg-[#bbcbff] rounded-lg shadow-lg py-1 px-2">
                <p className="font-semibold">This Year Leaves</p>
                <p>{item?.totalLeaveThisYear || 0}</p>
              </div>
            </div>
          </div>
          <div className="">{renderStatus(item)}</div>
        </div>
      </div>
    </Grid>
  );
};

interface ModalProps {
  open: boolean;
  isCurrentData: any;
  handleClose: () => void;
  mutate: () => void;
  item?: Leave;
  sandwichLeave?: any;
}

const IsSandwichLeave = ({
  open,
  handleClose,
  sandwichLeave,
  isCurrentData,
  mutate,
  item,
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
      if (inputValue === "" || (numericValue >= 0 && numericValue <= 12)) {
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
          console.log(error);
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
              disabled={loading}
              onClick={() => approveLeave(item?.id)}
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
