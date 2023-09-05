import {
  DeleteRounded,
  Info,
  MoreVertRounded,
  Place,
} from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useChange } from "hooks";
import moment from "moment";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import Swal from "sweetalert2";

interface ARRAY {
  id?: string;
  address?: string;
  title?: string;
  clientEmail?: string;
  clientName?: string;
  clientPhone?: string;
  meetingDate?: string;
  meetingEndTime?: string;
  meetingStartTime?: string;
  meetingPersonName?: string;
  status?: string;
  purpose?: string;
}
interface Props {
  data?: ARRAY[];
  mutate: () => void;
}

const MeetingsGrid = ({ data, mutate }: Props) => {
  return (
    <>
      <div className="grid py-4 gap-6 lg:grid-cols-3">
        {data
          ?.sort(
            (a: any, b: any) =>
              (new Date(b?.createdAt) as any) - (new Date(a?.createdAt) as any)
          )
          ?.map((items: any) => (
            <div
              className="relative border-2 border-b-theme py-4 bg-white w-full rounded-xl flex space-y-4 flex-col gap-2 tracking-wide shadow-xl"
              key={items?.id}
            >
              <CardComponent items={items} mutate={mutate} />
              <div className="md:px-4 px-2">
                <div className="flex justify-between items-center">
                  <span className="py-1 pr-4 text-xl font-semibold capitalize tracking-wide">
                    {items?.title}
                  </span>
                </div>
                <div className="relative mb-3 py-1 group flex items-center gap-x-2 tracking-wide">
                  <div
                    className={`md:absolute -top-5 md:right-3 text-xs ${
                      items?.status === "Completed"
                        ? "bg-[#44bd44]"
                        : items?.status === "Ongoing"
                        ? "bg-amber-500"
                        : "bg-red-500"
                    } text-white p-1 rounded-md font-semibold px-2 md:ml-10`}
                  >
                    {items?.status}
                  </div>
                </div>
                <div className="md:flex py-2 md:py-0">
                  <p className="font-semibold text-base">Meeting Start Dt : </p>
                  {/* <AccessTime /> */}
                  <span className="text-sm md:text-base">{`${moment(
                    items?.meetingDate
                  ).format("DD/MM/YYYY")}, ${items?.meetingStartTime}`}</span>
                </div>

                <div className="md:flex py-2 md:py-0">
                  <p className="font-semibold text-base">Meeting End Dt:</p>
                  {/* <AccessTime /> */}
                  <span className="text-sm md:text-base">
                    {`${moment(items?.meetingDate).format("DD/MM/YYYY")}, ${
                      items?.meetingEndTime ? items?.meetingEndTime : "---"
                    }`}
                  </span>
                </div>
                <div className="py-2 text-lg tracking-wide">
                  <span className="font-semibold text-base">Purpose :</span>
                  <p className="text-sm md:text-base">
                    {items?.purpose ? items?.purpose : "---"}
                  </p>
                </div>
                <div className="md:flex gap-2 py-2 md:py-0">
                  <p className="font-semibold text-base">Client Name :</p>
                  <p className="text-sm md:text-base">{items?.clientName}</p>
                </div>
                <div className="md:flex gap-2 py-2 md:py-0">
                  <p className="font-semibold text-base">Client Email :</p>
                  <p className="text-sm md:text-base">
                    {items?.clientEmail ? items?.clientEmail : "---"}
                  </p>
                </div>
                <div className="md:flex gap-2 py-2 md:py-0">
                  <p className="font-semibold text-base">Client Phone :</p>
                  <p className="text-sm md:text-base">
                    {items?.clientPhone ? items?.clientPhone : "---"}
                  </p>
                </div>
                <div className="md:flex gap-2 py-2 md:py-0">
                  <p className="font-semibold text-base">Member Name :</p>
                  <p className="text-sm md:text-base">
                    {items?.meetingPersonName}
                  </p>
                </div>
                <div className="py-2 text-lg tracking-wide">
                  <span className=" font-semibold text-base">Address :</span>
                  <p className="text-sm md:text-base">
                    {items?.address ? items?.address : "---"}
                  </p>
                </div>

                <div className=" group md:flex items-center py-2 text-md tracking-wide text-lg">
                  <Place />
                  <span className="text-md font-medium">Location :</span>
                </div>
                <iframe
                  className="w-full py-2"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.0498150250405!2d85.77649581162628!3d20.25676868112798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a740ae304117%3A0x629ce9db127f69ef!2sSearchingYard%20Software%20Group!5e0!3m2!1sen!2sin!4v1682685199057!5m2!1sen!2sin"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default MeetingsGrid;

const CardComponent = ({ items, mutate }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { change } = useChange();
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          Swal.fire(`Info`, "It will take some time", "info");
          const response = await change(`meetings/${id}`, {
            method: "DELETE",
          });
          if (response?.status !== 200) {
            Swal.fire("Error", "Something went wrong!", "error");
          }
          Swal.fire("Success", "Deleted successfully!", "success");
          mutate();
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div className="absolute right-[10px] top-[10px]">
      <Tooltip title="More">
        <IconButton onClick={handleClick}>
          <MoreVertRounded />
        </IconButton>
      </Tooltip>
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
              mr: "15th June 2021",
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
        <Link href={`/admin/meetings/meeting-details?id=${items?.id}`}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Info fontSize="small" />
            </ListItemIcon>
            Details
          </MenuItem>
        </Link>
        <MenuItem onClick={() => handleDelete(items?.id)}>
          <ListItemIcon>
            <DeleteRounded fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};
