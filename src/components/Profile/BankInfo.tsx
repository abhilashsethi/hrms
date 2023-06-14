import ICONS from "assets/icons";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { User } from "types";
import { BankInformationUpdate } from "components/dialogues";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Loader } from "components/core";

const BankInfo = () => {
  const [isDialogue, setIsDialogue] = useState(false);
  const router = useRouter();
  const {
    data: employData,
    mutate,
    isLoading,
  } = useFetch<User>(`users/${router?.query?.id}`);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="bg-white rounded-md shadow-md shadow-theme px-6 py-4">
        {employData?.bankName ||
        employData?.accountNo ||
        employData?.ifscCode ? (
          <>
            <div className="flex justify-between">
              <h1 className="text-xl font-medium py-2">Bank information</h1>
              <div className="py-2 px-2">
                <ICONS.Edit
                  className="h-5 w-5"
                  onClick={() => setIsDialogue(true)}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1 py-2 tracking-wide">
              <h5 className="font-medium">Bank name :</h5>
              <span className="col-span-2">{employData?.bankName}</span>
              <h5 className="font-medium">Bank account No. :</h5>
              <span className="col-span-2 ">{employData?.accountNo}</span>
              <h5 className="font-medium">IFSC Code :</h5>
              <span className="col-span-2 ">{employData?.ifscCode}</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <div className="py-6">
                <h1 className="text-xl font-medium py-2">
                  No Bank Information
                </h1>
                <Button
                  onClick={() => setIsDialogue(true)}
                  startIcon={<Add />}
                  className="!bg-theme !px-8 !py-2 !text-white !font-bold"
                >
                  Add Bank Information
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      <BankInformationUpdate
        mutate={mutate}
        open={isDialogue}
        handleClose={() => setIsDialogue(false)}
      />
    </>
  );
};

export default BankInfo;
