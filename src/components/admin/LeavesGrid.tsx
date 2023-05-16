import {
  Button,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { SAMPLEDP } from "assets/home";
import { Check, Close, KeyboardArrowLeftRounded } from "@mui/icons-material";
import { LeaveDocuments } from "components/drawer";

interface Array {
  photo?: string | undefined;
  name?: string | undefined;
  role?: string | undefined;
  status?: string | undefined;
  credit?: number | undefined;
}
interface Props {
  data?: Array[];
}
const LeavesGrid = ({ data }: Props) => {
  const [isDocuments, setIsDocuments] = useState(false);
  const renderStatus = (status: any) => {
    switch (status) {
      case "Approved":
        return (
          <>
            {/* <span className="bg-green-300 text-green-600 rounded-full px-6 py-1 font-semibold">
            {status}
						</span> */}
            <div className="flex justify-center items-center">
              <div className="text-xs w-1/3 bg-[#44bd44] text-white p-1 rounded-md font-semibold px-2">
                {status}
              </div>
            </div>
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
      case "Pending":
        return (
          <>
            {/* <span className="bg-yellow-300 text-yellow-600 rounded-full px-6 py-1 font-semibold">
              {status}
            </span> */}
            <div>
              <Stepper activeStep={1} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div className="md:flex items-center justify-center mt-2 pt-2 space-x-3">
              <Button
                className="!bg-[#44bd44]"
                variant="contained"
                startIcon={<Check />}
                size="small"
              >
                ACCEPT
              </Button>
              <Button
                className="!bg-red-600"
                variant="contained"
                startIcon={<Close />}
                size="small"
              >
                DECLINE
              </Button>
            </div>
          </>
        );
      case "Decline":
        return (
          <>
            <div className="flex justify-center items-center">
              <div className="text-xs w-1/3 bg-red-600 text-white p-1 rounded-md font-semibold px-2">
                {status}
              </div>
            </div>
            <div className="pt-2">
              <Stepper activeStep={0} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </>
        );
      case "Semi":
        return (
          <>
            <div className="flex justify-center items-center">
              <div className="text-xs w-1/3 bg-blue-600 text-white p-1 rounded-md font-semibold px-2">
                Pending
              </div>
            </div>
            <div className="pt-2">
              <Stepper activeStep={0} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </>
        );
      default:
        return (
          <>
            <span>{status}</span>
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
    <>
      <LeaveDocuments
        open={isDocuments}
        onClose={() => setIsDocuments(false)}
      />
      <section className="py-6 ">
        <div className="grid grid-cols-4 gap-6 py-6 items-center justify-center mt-4">
          {data?.map((item: any, index: any) => (
            <div
              key={index}
              className="relative flex flex-col px-2 justify-center justify-items-center w-full pt-4 text-center rounded-md shadow-xl drop-shadow-lg bg-gradient-to-r from-rose-100 to-teal-100 h-64 hover:scale-105 ease-in-out transition-all duration-200"
            >
              <span className="absolute right-[8px] top-[8px]">
                <Tooltip title="Details">
                  <IconButton onClick={() => setIsDocuments(true)}>
                    <KeyboardArrowLeftRounded />
                  </IconButton>
                </Tooltip>
              </span>
              <img
                alt=""
                className="absolute -top-10 self-center flex-shrink-0 w-16 h-16 bg-center bg-cover rounded-full bg-gray-500"
                src={SAMPLEDP.src}
              />
              <div className="flex-1 my-6">
                <p className="text-base font-semibold leading-snug">
                  {item?.name}
                </p>
                <p className="mb-2 text-sm">{item.role}</p>
                <div className="mb-2 text-sm group flex items-center justify-center gap-2 pb-2">
                  {/* <ShoppingBasket />{" "} */}
                  {/* <div className="font-semibold">Credit</div>
										<div className="flex justify-between items-center">
											<p>Monthly Credit</p>
											<p>Annual Credit</p>
										</div> */}
                  <div className="flex w-full justify-center gap-2">
                    <div className="text-xs cursor-pointer bg-[#bbcbff] rounded-lg shadow-lg py-1 px-2">
                      <p className="font-semibold">Monthly Left</p>
                      <p>2</p>
                    </div>
                    <div className="text-xs cursor-pointer bg-[#bbcbff] rounded-lg shadow-lg py-1 px-2">
                      <p className="font-semibold">Annual Left</p>
                      <p>12</p>
                    </div>
                  </div>
                  {/* {item?.credit} */}
                </div>
                <div className="">{renderStatus(item.status)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default LeavesGrid;
const steps = ["Team Manager", "Hr"];
