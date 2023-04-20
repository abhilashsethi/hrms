import { Grid } from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import React from "react";

const AttendanceGrid = () => {
  return (
    <div className="mt-6">
      <Grid container spacing={2}>
        {cards?.map((item) => (
          <Grid key={item?.id} item lg={2.4}>
            <div className="h-60 w-full bg-white shadow-xl rounded-2xl flex flex-col items-center justify-between py-8 px-4">
              <div className="h-20 w-20 overflow-hidden rounded-full shadow-xl">
                <img
                  className="h-full object-cover"
                  src={item?.img || DEFAULTPROFILE.src}
                  alt="imgg"
                />
              </div>
              <p className="text-center font-semibold tracking-wide">
                {item?.name}
              </p>
              <div className="flex gap-2">
                <div
                  className={`h-12 w-12 rounded-full flex justify-center items-center text-lg font-semibold ${
                    item?.status === "present"
                      ? `bg-gradient-to-r from-green-600 to-green-400 text-white shadow-md`
                      : "shadow-xl bg-white border-[1px]"
                  }`}
                >
                  P
                </div>
                <div
                  className={`h-12 w-12 rounded-full flex justify-center items-center text-lg font-semibold ${
                    item?.status === "absent"
                      ? `bg-gradient-to-r from-red-600 to-red-400 text-white shadow-md`
                      : "shadow-xl bg-white border-[1px]"
                  }`}
                >
                  A
                </div>
                <div
                  className={`h-12 w-12 rounded-full flex justify-center items-center text-lg font-semibold ${
                    item?.status === "leave"
                      ? `bg-gradient-to-r from-yellow-600 to-yellow-400 text-white shadow-md`
                      : "shadow-xl bg-white border-[1px]"
                  }`}
                >
                  L
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AttendanceGrid;

const cards = [
  {
    id: 1,
    name: "Srinu reddy",
    status: "absent",
    img: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=996&t=st=1681990921~exp=1681991521~hmac=07be280c6263e9e69488beb2376fc53c277b8caf7b8109528da74643573d3f2d",
  },
  {
    id: 2,
    name: "Kumar ",
    status: "absent",
    img: "https://img.freepik.com/free-photo/elegant-man-with-folded-arms_1262-727.jpg?w=996&t=st=1681991033~exp=1681991633~hmac=b63bef31fb6544023cd827e2681d4e2ac65541fcbc35c2e9c33bbbc725783180",
  },
  {
    id: 3,
    name: "Loushik ",
    status: "present",
    img: "https://img.freepik.com/free-photo/confident-attractive-caucasian-guy-beige-pullon-smiling-broadly-while-standing-against-gray_176420-44508.jpg?w=996&t=st=1681991089~exp=1681991689~hmac=e664647e697fcb33105f7228085df16d2ba188310e29442b3988f9ba1f14fce3",
  },
  {
    id: 4,
    name: "Chinmay ",
    status: "leave",
    img: "https://img.freepik.com/free-photo/portrait-handsome-young-man-with-crossed-arms_176420-15569.jpg?w=996&t=st=1681991061~exp=1681991661~hmac=c192bbb72f055cf2c2881c308ecce14a94f5ababecedea5a856a81aadf2ea231",
  },
  {
    id: 5,
    name: "Aliva ",
    status: "leave",
    img: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=996&t=st=1681991188~exp=1681991788~hmac=40be4031faf7ac40ce36a113a6a9f12e99151d058ec93abdabd6d86b32226cb5",
  },
];
