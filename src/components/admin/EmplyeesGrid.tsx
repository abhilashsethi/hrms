import {
  DeleteRounded,
  EditRounded,
  HomeRepairServiceRounded,
  InfoRounded,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  MoreVertRounded,
} from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  Tooltip,
} from "@mui/material";
import { DEFAULTIMG } from "assets/home";
import { RenderIconRow } from "components/common";
import { IOSSwitch, Loader, ReverseIOSSwitch } from "components/core";
import { useChange, useFetch } from "hooks";
import Link from "next/link";
import { useState, MouseEvent } from "react";
import Swal from "sweetalert2";
import { User } from "types";
interface ARRAY {
  id?: string;
}
interface Props {
  data?: ARRAY[];
}
const EmplyeesGrid = ({ data }: Props) => {
  const { data: employees, mutate, isLoading } = useFetch<User[]>(`users`);
  console.log("employees----", employees);
  const [pageNumber, setPageNumber] = useState<number | null>(1);

  const sortData = data?.sort(
    (a: any, b: any) =>
      (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any)
  );
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="my-8">
      <Grid container spacing={3}>
        {sortData?.map((item) => (
          <Grid key={item?.id} item lg={3}>
            <CardContent item={item} mutate={mutate} />
          </Grid>
        ))}
      </Grid>
      {/* <Pagination
        chunk={chunk}
        isLastChunk={data?.data?.data?.isLastChunk}
        isLoading={isLoading}
        setChunk={setChunk}
      /> */}
      <Stack spacing={2}>
        <Pagination count={10} variant="outlined" />
      </Stack>
      {/* <div className="flex justify-between items-center py-4">
        <Button
          className="!bg-theme"
          variant="contained"
          startIcon={<KeyboardArrowLeft />}
          onClick={() => setCurrentPage((prev: any) => prev - 1)}
        >
          PREV
        </Button>
        <div className="h-8 flex justify-center items-center w-8 bg-slate-300 rounded-full tracking-wide font-semibold">
          {currentPage}
        </div>
        <Button
          className="!bg-theme"
          variant="contained"
          endIcon={<KeyboardArrowRight />}
          onClick={() => setCurrentPage((prev: any) => prev + 1)}
        >
          NEXT
        </Button>
      </div> */}
    </section>
  );
};

export default EmplyeesGrid;

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
  const handleDelete = async (userId: string) => {
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
          const res = await change(`users/${userId}`, {
            method: "DELETE",
          });
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
          <MenuItem onClick={() => handleDelete(item?.id)}>
            <ListItemIcon>
              <DeleteRounded fontSize="small" />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>
      </div>
      <div className="h-20 w-20 rounded-full overflow-hidden shadow-xl">
        {item?.photo && (
          <div className="bg-slate-200 h-full w-full">
            <img
              className="h-full w-full object-cover"
              src={item?.photo || DEFAULTIMG.src}
              alt=""
            />
          </div>
        )}
        {!item?.photo ? (
          <div className="h-full w-full uppercase flex justify-center items-center text-4xl font-bold text-white bg-gradient-to-br from-theme-200 via-theme-50 to-secondary-200">
            {item?.name?.slice(0, 1)}
          </div>
        ) : null}
      </div>
      <span className="mt-2 text-base font-semibold tracking-wide text-gray-600">
        {item?.name}
      </span>
      <span className="mt-2 text-base font-semibold tracking-wide text-gray-600">
        <RenderIconRow value={item?.email} isEmail />
      </span>
      <div className="flex gap-2 items-center font-semibold text-sm">
        <RenderIconRow value={item?.employeeID} isId />
        {/* <HomeRepairServiceRounded /> {item?.employeeID} */}
      </div>
      <div className="w-full px-8 flex gap-2 mt-2">
        <div className="w-1/2 py-1.5 rounded-lg border-2 flex flex-col items-center gap-1">
          <p className="font-semibold tracking-wide text-sm">STATUS</p>
          <IOSSwitch
            checked={item?.isBlocked}
            onChange={(e) => handleBlock(e, item?.id)}
          />
        </div>
        <div className="w-1/2 py-1.5 rounded-lg border-2 flex flex-col items-center gap-1">
          <p className="font-semibold tracking-wide text-sm">ACCESS</p>
          <ReverseIOSSwitch
            onChange={(e) => handleAssign(e, item?.id)}
            checked={item?.isOfficeAccessGranted}
          />
        </div>
      </div>
    </div>
  );
};
