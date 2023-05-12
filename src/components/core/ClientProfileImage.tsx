import { Edit } from "@mui/icons-material";
import { ChangeClientProfile, ChangeProfile } from "components/dialogues";
import { useState } from "react";

interface Props {
  values?: any;
  mutate?: any;
}
const ClientProfileImage = ({ values, mutate }: Props) => {
  const [isProfile, setIsProfile] = useState(false);

  return (
    <div className="w-full">
      <ChangeClientProfile
        open={isProfile}
        handleClose={() => setIsProfile(false)}
        mutate={mutate}
      />
      <div className="flex flex-col items-center gap-2">
        <div className="h-24 w-24 rounded-full border-[4px] border-white flex justify-center items-center text-3xl">
          <div className="relative h-full w-full flex justify-center items-center group">
            {values?.photo && (
              <div className="h-full w-full bg-slate-300 rounded-full">
                <img
                  className="h-full w-full object-cover rounded-full shadow-md"
                  src={values?.photo}
                  alt="Image"
                />
              </div>
            )}
            {!values?.photo && (
              <div className="h-full w-full text-white rounded-full uppercase shadow-lg flex justify-center items-center text-4xl font-bold bg-gradient-to-br from-theme-100 via-theme-50 to-secondary-100">
                {values?.name.slice(0, 1)}
              </div>
            )}
            <div
              onClick={() => setIsProfile(true)}
              className="absolute cursor-pointer rounded-full w-full h-full group-hover:flex transition-all ease-in-out duration-300 justify-center items-center hidden  bg-[#0007]"
            >
              <Edit className="!text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfileImage;
