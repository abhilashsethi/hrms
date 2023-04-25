import { MoreHorizRounded, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Grid, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import ICONS from "assets/icons";
import { RenderIconRow } from "components/common";
import { useFetch } from "hooks";
import moment from "moment";
import Link from "next/link";
import { useState, MouseEvent } from "react";

interface ARRAY {
  id?: string;
}

interface Props {
  data: ARRAY[];
}

const AttendanceGrid = ({ data }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const { data: attendance } = useFetch<any>(
  //   `attendances/isPresent/date/${new Date().toISOString().slice(0, 10)}`
  // );
  // console.log(attendance);
  return (
    <div className="mt-6">
      <Grid container spacing={2}>
        {data?.map((item: any) => (
          <Grid key={item?.id} item lg={3}>
            <div className="h-full w-full bg-white shadow-xl rounded-2xl flex flex-col items-center gap-4 py-4 px-4 hover:scale-105 ease-in-out transition-all duration-150">
              <div className="w-full flex justify-between items-center">
                {/* <div className="flex gap-2 items-center"> */}
                <span
                  className={`border-[1px] rounded-lg font-medium tracking-wide text-sm px-3 py-0.5 ${
                    item?.isPresent
                      ? `bg-emerald-200 text-green-600 border-green-500`
                      : `bg-red-200 text-red-600 border-red-500`
                  }`}
                >
                  {item?.isPresent ? `PRESENT` : `ABSENT`}
                </span>
                <IconButton onClick={handleClick}>
                  <MoreHorizRounded />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <Link
                    href={`/admin/employees/employee-profile?id=${item?.id}`}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <RemoveRedEyeOutlined fontSize="small" />
                      </ListItemIcon>
                      Visit Profile
                    </MenuItem>
                  </Link>
                </Menu>
                {/* </div> */}
              </div>
              <div className="h-16 w-16 overflow-hidden rounded-full shadow-xl">
                {item?.photo && (
                  <img
                    className="h-full w-full object-cover"
                    src={item?.photo || DEFAULTPROFILE.src}
                    alt="imgg"
                  />
                )}
                {!item?.photo ? (
                  <div className="h-full w-full uppercase flex justify-center items-center text-4xl font-bold text-white bg-gradient-to-br from-theme-200 via-theme-50 to-secondary-200">
                    {item?.name?.slice(0, 1)}
                  </div>
                ) : null}
              </div>
              <div>
                <p className="text-center font-semibold tracking-wide">
                  {item?.name}
                </p>
                <span className="text-sm text-slate-500">
                  <RenderIconRow value={item?.email} isEmail />
                </span>
              </div>
              <div className="w-full bg-slate-100 p-3 border-[1px] border-gray-200 rounded-lg">
                <p className="py-1 text-sm font-medium tracking-wide text-center">
                  EID : {item?.employeeID}
                </p>
                {item?.ispresent ? (
                  <div className="flex gap-3">
                    <div className="w-1/2 py-2 px-2 flex flex-col gap-2 tracking-wide items-center">
                      <div className="flex gap-2 items-center text-sm tracking-wide font-medium">
                        <ICONS.Entry /> IN TIME
                      </div>
                      <p className="font-semibold text-slate-600 text-sm">
                        {moment(item?.createdAt).format("HH:MM A")}
                      </p>
                    </div>
                    <div className="w-1/2 py-2 px-2 flex flex-col gap-2 tracking-wide items-center">
                      <div className="flex gap-2 items-center text-sm tracking-wide font-medium ">
                        <span className="text-red-500">
                          <ICONS.Exit />
                        </span>
                        OUT TIME
                      </div>
                      <p className="font-semibold text-slate-600 text-sm">
                        {moment(item?.updatedAt).format("HH:MM A")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-center py-4">Employee is absent...</p>
                )}
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
    email: "demo@gmail.com",
    status: "absent",
    img: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=996&t=st=1681990921~exp=1681991521~hmac=07be280c6263e9e69488beb2376fc53c277b8caf7b8109528da74643573d3f2d",
  },
  {
    id: 2,
    name: "Kumar ",
    status: "absent",
    email: "demo@gmail.com",
    img: "https://img.freepik.com/free-photo/elegant-man-with-folded-arms_1262-727.jpg?w=996&t=st=1681991033~exp=1681991633~hmac=b63bef31fb6544023cd827e2681d4e2ac65541fcbc35c2e9c33bbbc725783180",
  },
  {
    id: 3,
    name: "Loushik ",
    email: "demo@gmail.com",
    status: "present",
    img: "https://img.freepik.com/free-photo/confident-attractive-caucasian-guy-beige-pullon-smiling-broadly-while-standing-against-gray_176420-44508.jpg?w=996&t=st=1681991089~exp=1681991689~hmac=e664647e697fcb33105f7228085df16d2ba188310e29442b3988f9ba1f14fce3",
  },
  {
    id: 4,
    name: "Chinmay ",
    status: "present",
    email: "demo@gmail.com",
    img: "https://img.freepik.com/free-photo/portrait-handsome-young-man-with-crossed-arms_176420-15569.jpg?w=996&t=st=1681991061~exp=1681991661~hmac=c192bbb72f055cf2c2881c308ecce14a94f5ababecedea5a856a81aadf2ea231",
  },
  {
    id: 5,
    name: "Aliva ",
    status: "present",
    email: "demo@gmail.com",
    img: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=996&t=st=1681991188~exp=1681991788~hmac=40be4031faf7ac40ce36a113a6a9f12e99151d058ec93abdabd6d86b32226cb5",
  },
];
