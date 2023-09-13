import { Grid } from "@mui/material";
import { Loader, PhotoViewer } from "components/core";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { User } from "types";

const GuestDetails = () => {
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
    <section>
      <section className="mb-12 flex gap-3">
        <Grid
          alignItems={"center"}
          justifyContent={"center"}
          container
          spacing={2}
        >
          <Grid item lg={5}>
            <div className="w-full h-full rounded-lg bg-white shadow-xl py-4 flex flex-col justify-center items-center">
              <div className="w-64 h-32 bg-blue-600 rounded-t-lg flex justify-center items-center">
                <div className="">
                  <PhotoViewer
                    size="5.5em"
                    photo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzTSDO6sbQw9RJmGwMKYaubB1wDwyqOYAfuWM1fg&s"
                  />
                </div>
              </div>
              <div className="w-64 py-4 text-sm shadow-xl rounded-lg flex flex-col justify-center items-center">
                <p className="font-bold text-lg pb-4">John Doe</p>
                <p className="font-semibold text-gray-700">
                  Email :{" "}
                  <span className="font-medium text-gray-500">
                    test@gmail.com
                  </span>
                </p>
                <p className="font-semibold text-gray-700">
                  Phone :{" "}
                  <span className="font-medium text-gray-500">9988654325</span>
                </p>
                <p className="font-semibold text-gray-700">
                  Gender :{" "}
                  <span className="font-medium text-gray-500">Male</span>
                </p>
                <p className="font-semibold text-gray-700">
                  Validity From :{" "}
                  <span className="font-medium text-gray-500">
                    May 9, 2023 4:15 PM
                  </span>
                </p>
                <p className="font-semibold text-gray-700">
                  Validity Till :{" "}
                  <span className="font-medium text-gray-500">
                    May 9, 2023 4:15 PM
                  </span>
                </p>
                <p className="font-semibold text-gray-700">
                  Card Id :{" "}
                  <span className="font-medium text-gray-500">SY1006</span>
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
      </section>
    </section>
  );
};

export default GuestDetails;
