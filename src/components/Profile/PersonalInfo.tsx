import ICONS from "assets/icons";
import { PersonalInformations } from "components/dialogues";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { User } from "types";
import BankInfo from "./BankInfo";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Loader } from "components/core";
const PersonalInfo = () => {
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
      <div className="grid lg:grid-cols-2 gap-6 pt-6">
        <div className="bg-white rounded-md shadow-md shadow-theme px-6 py-4">
          {employData?.panNo || employData?.aadharNo || employData?.gmail ? (
            <>
              <div className="flex justify-between">
                <h1 className="text-xl font-medium py-2">
                  Personal Informations
                </h1>
                <div className="py-2 px-2">
                  <ICONS.Edit
                    className="h-5 w-5"
                    onClick={() => setIsDialogue(true)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 py-2 tracking-wide">
                <h5 className="font-medium">Pan No. :</h5>
                <span className="col-span-2">{employData?.panNo || "---"}</span>
                <h5 className="font-medium">Aadhar No :</h5>
                <span className="col-span-2 ">
                  {employData?.aadharNo || "---"}
                </span>
                <h5 className="font-medium">Gmail :</h5>
                <span className="col-span-2 ">
                  {employData?.gmail || "---"}
                </span>
                <h5 className="font-medium">Nationality :</h5>
                <span className="col-span-2 ">Indian</span>
                <h5 className="font-medium">Linkedin Id :</h5>
                <span className="col-span-2 ">
                  {employData?.linkedin || "---"}
                </span>
                <h5 className="font-medium">Github Id :</h5>
                <span className="col-span-2 ">
                  {employData?.github || "---"}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <div className="py-6">
                  <h1 className="text-xl font-medium py-2">
                    No Personal Informations
                  </h1>
                  <Button
                    onClick={() => setIsDialogue(true)}
                    startIcon={<Add />}
                    className="!bg-theme !px-8 !py-2 !text-white !font-bold"
                  >
                    Add Personal Data
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bank Info */}
        <BankInfo />
      </div>
      <PersonalInformations
        mutate={mutate}
        open={isDialogue}
        handleClose={() => setIsDialogue(false)}
      />
    </>
  );
};

export default PersonalInfo;
