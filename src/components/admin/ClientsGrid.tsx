import { MoreVertRounded, RemoveRedEyeOutlined } from "@mui/icons-material";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { useState, MouseEvent } from "react";
const ClientsGrid = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const renderStatus = (status: any) => {
    switch (status) {
      case "Approved":
        return (
          <span className="bg-green-300 text-green-600 rounded-full px-6 py-1 font-semibold">
            {status}
          </span>
        );
      case "Pending":
        return (
          <>
            {/* <span className="bg-yellow-300 text-yellow-600 rounded-full px-6 py-1 font-semibold">
              {status}
            </span> */}
            <div className="flex items-center justify-center mt-2 pt-2 space-x-3">
              <button className="bg-green-600 text-white font-semibold rounded-md px-6 py-2 hover:bg-green-700">
                Accept
              </button>
              <button className="bg-red-600 text-white font-semibold rounded-md px-6 py-2 hover:bg-red-700">
                Decline
              </button>
            </div>
          </>
        );
      case "Decline":
        return (
          <span className="bg-red-300 text-red-600 rounded-full px-6 py-1 font-semibold">
            {status}
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };
  return (
    <>
      <section className="py-6 ">
        <div className="grid grid-cols-4 gap-6 py-6 items-center justify-center">
          {leavData?.map((item: any, index: any) => (
            <>
              <div
                key={index}
                className="flex flex-col py-4 h-full justify-center justify-items-center w-full pt-4 text-center rounded-md shadow-xl drop-shadow-lg bg-white  hover:scale-105 ease-in-out transition-all duration-200"
              >
                <div className="absolute right-[10px] top-[10px]">
                  <IconButton onClick={handleClick}>
                    <MoreVertRounded />
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
                </div>
                <img
                  alt=""
                  className="self-center flex-shrink-0 w-24 h-24 bg-center bg-cover rounded-full bg-gray-500"
                  src={item?.photo}
                />
                <div className="flex-1 mt-6">
                  <h1 className="text-xl font-semibold leading-snug">
                    {item?.company}
                  </h1>
                  <p className="text-md font-semibold leading-snug">
                    {item?.name}
                  </p>
                  <p className="mb-2 text-md text-slate-400 font-medium">
                    {item.role}
                  </p>
                </div>
                <div className="flex gap-4 justify-center">
                  <button className="rounded-md bg-theme text-white font-semibold shadow-md px-4 py-2">
                    Message
                  </button>
                  <button className="rounded-md bg-secondary text-white font-semibold shadow-md px-4 py-2">
                    View Profile
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </section>
    </>
  );
};

export default ClientsGrid;
const leavData = [
  {
    photo: "https://source.unsplash.com/100x100/?portrait?0",
    company: "CSS Technology",
    name: "Srinu Redy",
    role: "CEO",
  },
  {
    photo: "https://source.unsplash.com/100x100/?portrait?1",
    company: "CSS Technology",
    name: "Kumara Gourav",
    role: "Manager",
  },
  {
    photo: "https://source.unsplash.com/100x100/?portrait?2",
    company: "CSS Technology",
    name: "Sunil Mishra",
    role: "Director",
  },
  {
    photo: "https://source.unsplash.com/100x100/?portrait?3",
    company: "CSS Technology",
    name: "Prasad Murmu",
    role: "CEO",
  },
];
