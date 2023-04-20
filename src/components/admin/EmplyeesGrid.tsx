import {
  DeleteRounded,
  EditRounded,
  HomeRepairServiceRounded,
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
import { DEFAULTIMG } from "assets/home";
import { useFetch } from "hooks";
import Link from "next/link";
import React from "react";
import { User } from "types";

const EmplyeesGrid = () => {
  const { data: employees, isLoading, mutate } = useFetch<User[]>(`users`);
  return (
    <section className="mt-8">
      <Grid container spacing={3}>
        {employees?.map((item) => (
          <Grid key={item?.id} item lg={3}>
            <CardContent item={item} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default EmplyeesGrid;

const CardContent = ({ item }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="h-60 relative bg-white w-full rounded-xl flex flex-col gap-2 tracking-wide items-center justify-center shadow-xl">
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
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EditRounded fontSize="small" />
            </ListItemIcon>
            Edit
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DeleteRounded fontSize="small" />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>
      </div>
      <div className="h-24 w-24 border-2 rounded-full overflow-hidden">
        <img className="h-full object-cover" src={DEFAULTIMG.src} alt="" />
      </div>
      <span className="mt-2 text-sm">{item?.name}</span>
      <div className="flex gap-2 items-center font-semibold text-slate-500 text-md">
        <HomeRepairServiceRounded /> {item?.employeeID}
      </div>
    </div>
  );
};
