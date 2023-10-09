import {
  CurrencyRupee,
  DeleteRounded,
  ExitToApp,
  InfoRounded,
  MoreVertRounded,
  Savings,
} from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { RenderIconRow } from "components/common";
import { CopyClipboard, PhotoViewer, IOSSwitch } from "components/core";
import { AddBonos, EmployeeExitForm } from "components/dialogues";
import AddSalaryInfo from "components/dialogues/AddSalaryInfo";
import { useChange } from "hooks";
import Link from "next/link";
import { MouseEvent, useState, ChangeEvent } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import { deleteFile } from "utils";

export const CardContent = ({ item, mutate, userDetails }: any) => {
  const [userId, setUserId] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [salaryInfoModal, setSalaryInfoModal] = useState<boolean>(false);
  const [isAddBonos, setIsAddBonos] = useState<boolean>(false);
  const [employeeExitModal, setEmployeeExitModal] = useState<boolean>(false);
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
          Swal.fire(`Info`, "It will take some time", "info");
          const res = await change(`users/${user?.id}`, {
            method: "DELETE",
          });
          if (user?.photo) {
            await deleteFile(String(user?.photo?.split("/").reverse()[0]));
          }
          if (res?.status !== 200) {
            Swal.fire(
              `Error`,
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
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
    }
  };
  const handleBlock = async (
    e: ChangeEvent<HTMLInputElement>,
    userId: string
  ) => {
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
        Swal.fire(`Success`, "Status updated successfully!", "success");
        return;
      }
    });
  };
  return (
    <div className="h-full relative bg-white w-full rounded-xl flex flex-col gap-1.5 py-6 tracking-wide items-center justify-center shadow-xl hover:scale-105 ease-in-out transition-all duration-200">
      <AddSalaryInfo
        userId={userId}
        mutate={mutate}
        open={salaryInfoModal}
        handleClose={() => setSalaryInfoModal(false)}
      />
      <AddBonos
        userId={userId}
        mutate={mutate}
        open={isAddBonos}
        handleClose={() => setIsAddBonos(false)}
      />
      <EmployeeExitForm
        userId={userId}
        mutate={mutate}
        open={employeeExitModal}
        handleClose={() => setEmployeeExitModal(false)}
      />
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
          <Link href={`/admin/employees/profile/${item?.id}`}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <InfoRounded fontSize="small" />
              </ListItemIcon>
              Details
            </MenuItem>
          </Link>
          {userDetails?.role?.name === "CEO" ||
          userDetails?.role?.name === "DIRECTOR" ||
          userDetails?.role?.name === "COO" ||
          userDetails?.role?.name === "HR" ? (
            <>
              <MenuItem
                onClick={() => {
                  setUserId(item?.id);
                  setSalaryInfoModal((prev) => !prev);
                  handleClose;
                }}
              >
                <ListItemIcon>
                  <CurrencyRupee fontSize="small" />
                </ListItemIcon>
                Add Salary Info
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setIsAddBonos((prev) => !prev);
                  handleClose;
                }}
              >
                <ListItemIcon>
                  <Savings fontSize="small" />
                </ListItemIcon>
                Add Bonus
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setUserId(item?.id);
                  setEmployeeExitModal((prev) => !prev);
                }}
              >
                <ListItemIcon>
                  <ExitToApp fontSize="small" />
                </ListItemIcon>
                Employee Exit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleDelete(item);
                }}
              >
                <ListItemIcon>
                  <DeleteRounded fontSize="small" />
                </ListItemIcon>
                Delete
              </MenuItem>
            </>
          ) : null}
        </Menu>
      </div>
      <PhotoViewer name={item?.name} photo={item?.photo} />
      <span className="mt-2 text-base font-semibold tracking-wide text-gray-600">
        {item?.name}
      </span>
      <span className="font-medium tracking-wide text-gray-400 text-sm">
        {item?.role?.name}
      </span>
      <div className="text-base font-semibold tracking-wide text-gray-600 pl-4">
        <RenderIconRow value={item?.username} isEmail />
      </div>
      <div className="flex gap-2 items-center font-semibold text-sm pl-4">
        EMP ID :
        <CopyClipboard value={item?.employeeID} />
      </div>
      {userDetails?.role?.name === "CEO" ||
      userDetails?.role?.name === "DIRECTOR" ||
      userDetails?.role?.name === "COO" ||
      userDetails?.role?.name === "HR" ? (
        <div className="w-full px-8 flex gap-2 mt-2 justify-center">
          <div className=" py-1.5 rounded-lg border-2 flex items-center gap-2 px-4">
            <p className="font-semibold tracking-wide text-sm">STATUS</p>
            <IOSSwitch
              checked={item?.isBlocked}
              onChange={(e) => handleBlock(e, item?.id)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
