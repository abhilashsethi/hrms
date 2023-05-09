import {
  DeleteRounded,
  EditRounded,
  InfoRounded,
  MoreVertRounded,
} from "@mui/icons-material";
import {
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { CopyClipboard, PhotoViewer } from "components/core";
import { useChange } from "hooks";
import moment from "moment";
import Link from "next/link";
import { useState, MouseEvent } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import { deleteFile } from "utils";
interface ARRAY {
  id?: string;
}
interface Props {
  data?: any;
  mutate?: any;
}
const GuestsGrid = ({ data, mutate }: Props) => {
  return (
    <section className="my-8">
      <Grid container spacing={3}>
        {data?.map((item: any) => (
          <Grid key={item?.id} item lg={3}>
            <CardContent item={item} mutate={mutate} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default GuestsGrid;

const CardContent = ({ item, mutate }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { change } = useChange();
  const handleDelete = async (user: User) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await change(`users/${user?.id}`, {
            method: "DELETE",
          });
          console.log(res);
          await deleteFile(String(user?.photo?.split("/").reverse()[0]));
          if (res?.status !== 200) {
            Swal.fire(`Error`, "Something went wrong!", "error");
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
  const handleBlock = async (e: any, userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await change(`users/${userId}`, {
          method: "PATCH",
          body: { isBlocked: !e.target?.checked },
        });
        mutate();
        if (res?.status !== 200) {
          Swal.fire(`Error`, "Something went wrong!", "error");
          return;
        }
        Swal.fire(`Success`, "User Blocked successfully!!", "success");
        return;
      }
    });
  };
  const handleAssign = async (e: any, userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to change status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await change(`users/${userId}`, {
          method: "PATCH",
          body: { isOfficeAccessGranted: !e.target?.checked },
        });
        mutate();
        if (res?.status !== 200) {
          Swal.fire(`Error`, "Something went wrong!", "error");
          return;
        }
        Swal.fire(`Success`, "Updated successfully!", "success");
        return;
      }
    });
  };
  return (
    <div className="h-full relative bg-white w-full rounded-xl flex flex-col gap-1.5 py-6 tracking-wide items-center justify-center shadow-xl hover:scale-105 ease-in-out transition-all duration-200">
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
          <Link href={`/admin/employees/employee-profile?id=${item?.id}`}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <InfoRounded fontSize="small" />
              </ListItemIcon>
              Details
            </MenuItem>
          </Link>
          <Link href={`/admin/employees/employee-profile?id=${item?.id}`}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <EditRounded fontSize="small" />
              </ListItemIcon>
              Edit
            </MenuItem>
          </Link>
          <MenuItem onClick={() => handleDelete(item)}>
            <ListItemIcon>
              <DeleteRounded fontSize="small" />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>
      </div>
      <PhotoViewer name={item?.name} photo={item?.photo} />
      <span className="mt-2 text-base font-semibold tracking-wide text-gray-600">
        {item?.name}
      </span>
      <div className="flex gap-2 items-center font-semibold text-sm pl-4">
        GUEST ID :
        <CopyClipboard value={item?.guestId} />
      </div>
      <div className="flex gap-2 items-center text-sm">
        <p>Valid From :</p>
        <p>{moment(new Date().toISOString()).format("lll")}</p>
      </div>
    </div>
  );
};