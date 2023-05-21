import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Check, Close, KeyboardArrowLeftRounded } from "@mui/icons-material";
import { LeaveDocuments } from "components/drawer";
import { PhotoViewer } from "components/core";
import { useChange, useFetch } from "hooks";
import Swal from "sweetalert2";
interface Props {
  data?: any;
  mutate?: any;
}
const LeavesGrid = ({ data, mutate }: Props) => {
  return (
    <>
      <section className="md:py-2 py-2">
        <Grid container spacing={3}>
          {data?.map((item: any) => (
            <CardComponent item={item} mutate={mutate} key={item?.id} />
          ))}
        </Grid>
      </section>
    </>
  );
};

export default LeavesGrid;
const steps = ["Team Manager", "Hr"];

interface Props {
  item?: any;
  mutate?: any;
}

const CardComponent = ({ item, mutate }: Props) => {
  const { change } = useChange();
  const [loading, setLoading] = useState(false);
  const [rloading, setRLoading] = useState(false);
  const [isDocuments, setIsDocuments] = useState(false);
  const approveLeave = (id: string) => {
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
          const res = await change(`leaves/${id}`, {
            method: "PATCH",
            body: { status: "Approved" },
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
          console.log(error);
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
            <span className="bg-yellow-600 text-white rounded-full px-6 py-1 text-sm">
              {item?.status}
            </span>
            <div className="md:flex items-center justify-center mt-2 pt-2 space-x-3">
              <Button
                onClick={() => approveLeave(item?.id)}
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
        {/* <img
                  alt=""
                  className="absolute -top-10 self-center flex-shrink-0 w-16 h-16 bg-center bg-cover rounded-full bg-gray-500"
                  src={SAMPLEDP.src}
                /> */}
        <div className="flex justify-center ">
          <PhotoViewer name={item?.user?.name} photo={item?.user?.photo} />
        </div>
        <div className="flex-1 my-4">
          <p className="text-base font-semibold leading-snug">
            {item?.user?.name}
          </p>
          <p className="mb-2 text-sm">{item?.user?.role?.name}</p>
          <GetBalanceCredits id={item?.user?.id} />
          <div className="">{renderStatus(item)}</div>
        </div>
      </div>
    </Grid>
  );
};

const GetBalanceCredits = ({ id }: any) => {
  const [monthLeaves, setMonthLeaves] = useState<any>(0);
  const { data: empLeaves } = useFetch<any>(`leaves/details/${id}`);

  useEffect(() => {
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });
    if (empLeaves?.monthWiseLeaves?.hasOwnProperty(currentMonth)) {
      const value = empLeaves?.monthWiseLeaves[currentMonth];
      setMonthLeaves(value);
    } else {
      setMonthLeaves(0);
    }
  }, [empLeaves]);
  return (
    <div className="mb-2 text-sm group flex items-center justify-center gap-2 pb-2">
      <div className="flex w-full justify-center gap-2">
        <div className="text-xs cursor-pointer bg-[#bbcbff] rounded-lg shadow-lg py-1 px-2">
          <p className="font-semibold">This Month Leaves</p>
          <p>{monthLeaves}</p>
        </div>
        <div className="text-xs cursor-pointer bg-[#bbcbff] rounded-lg shadow-lg py-1 px-2">
          <p className="font-semibold">This Year Leaves</p>
          <p>
            {empLeaves?.totalLeavesCurrentYear
              ? empLeaves?.totalLeavesCurrentYear
              : 0}
          </p>
        </div>
      </div>
    </div>
  );
};
