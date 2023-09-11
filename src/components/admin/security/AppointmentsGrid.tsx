import { Delete, Edit, Info } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { PhotoViewer } from "components/core";
import { UpdateAppointmentDetails } from "components/dialogues";
import { useChange } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { APPOINTMENT, Bills } from "types";
interface Props {
  data: APPOINTMENT[];
  mutate: () => void;
}

const AppointmentsGrid = ({ data, mutate }: Props) => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isAppointmentData, setIsAppointmentData] = useState<APPOINTMENT>();
  const { change } = useChange();
  const router = useRouter();
  const handleDelete = (id?: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire(`Info`, "It will take some time", "info");
          const res = await change(`appointments/${id}`, {
            method: "DELETE",
          });

          if (res?.status !== 200) {
            Swal.fire(
              "Error",
              res?.results?.msg || "Something went wrong!",
              "error"
            );
            return;
          }
          Swal.fire(`Success`, "Deleted Successfully!", "success");
          mutate();
          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <UpdateAppointmentDetails
        open={isUpdate}
        handleClose={() => setIsUpdate(false)}
        MainMutate={mutate}
        appointmentData={isAppointmentData}
      />
      <div className="grid py-4 gap-6 lg:grid-cols-3">
        {data?.map((item) => (
          <div
            key={item?.id}
            className="relative w-full rounded-xl flex space-y-4 flex-col gap-2 tracking-wide shadow-xl"
          >
            <div className="relative">
              <p className="absolute top-2 rounded-r-xl bg-green-500 text-white text-sm px-2 pr-3 py-1 font-semibold">
                {item?.status}
              </p>

              <div className="absolute right-0 rounded-tl-lg top-24 bg-gradient-to-r from-rose-100 to-teal-100 p-2">
                <div className="flex">
                  <Tooltip
                    title="Details"
                    onClick={() => {
                      setIsUpdate(true), setIsAppointmentData(item);
                    }}
                  >
                    <Avatar
                      variant="rounded"
                      className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-yellow-500 !p-0"
                      sx={{
                        mr: ".1vw",
                        padding: "0px !important",
                        backgroundColor: "Highlight",
                        cursor: "pointer",
                        color: "",
                        width: 30,
                        height: 30,
                      }}
                    >
                      <Edit
                        sx={{ padding: "0px !important" }}
                        fontSize="small"
                      />
                    </Avatar>
                  </Tooltip>
                  <Tooltip
                    title="Delete"
                    onClick={() => handleDelete(item?.id)}
                  >
                    <Avatar
                      variant="rounded"
                      className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-500 !p-0"
                      sx={{
                        mr: "0.1vw",
                        padding: "0px !important",
                        backgroundColor: "Highlight",
                        cursor: "pointer",
                        color: "",
                        width: 30,
                        height: 30,
                      }}
                    >
                      <Delete
                        sx={{ padding: "0px !important" }}
                        fontSize="small"
                      />
                    </Avatar>
                  </Tooltip>
                </div>
              </div>
              <div className="flex justify-center bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 py-3 rounded-t-lg w-full border">
                <PhotoViewer
                  size={"6rem"}
                  photo={item?.photo}
                  name={item?.name}
                />
              </div>
              <div className="px-4 bg-gradient-to-r from-rose-100 to-teal-100 ">
                <div className="flex flex-col  justify-star t">
                  <div className="flex items-center gap-2 py-2 md:py-0">
                    <p className="font-semibold text-base text-blue-600">
                      Name :
                    </p>
                    <p className="text-sm md:text-base text-red-600 font-semibold">
                      {item?.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-2 md:py-0">
                    <p className="font-semibold text-base text-blue-600">
                      Email :
                    </p>

                    <p className="text-sm md:text-base text-gray-700 font-semibold">
                      {item?.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-2 md:py-0">
                    <p className="font-semibold text-base text-blue-600">
                      Phone :
                    </p>
                    <p className="text-sm md:text-base text-gray-700">
                      {item?.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-2 md:py-0">
                    <p className="font-semibold text-base text-blue-600">
                      Start Date :
                    </p>
                    <p className="text-sm md:text-base text-gray-700">
                      {item?.startDate
                        ? moment(item?.startDate).format("ll")
                        : "---"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 py-2 md:py-0">
                    <p className="font-semibold text-base text-blue-600">
                      Whom To Visit :
                    </p>
                    <p className="text-sm md:text-base text-gray-700">
                      {item?.user?.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-2 md:py-0">
                    <p className="font-semibold text-base text-blue-600">
                      Reason :
                    </p>
                    <p className="text-sm md:text-base text-gray-700">
                      {item?.reason ? item?.reason : "---"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-2 md:py-0">
                    <p className="font-semibold text-base text-blue-600">
                      Address :
                    </p>
                    <p className="text-sm md:text-base text-gray-700">
                      {item?.address ? item?.address : "---"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AppointmentsGrid;
