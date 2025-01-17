import {
  DeleteRounded,
  MoreVertRounded,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { RenderIconRow } from "components/common";
import { PhotoViewerGuests } from "components/core";
import {
  ViewProjectsDrawerClientMain,
  ViewTicketsDrawer,
} from "components/drawer";
import { useChange, useFetch } from "hooks";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import Swal from "sweetalert2";
import { Client } from "types";
import { deleteFile } from "utils";
interface ARRAY {
  id?: string;
}
interface Props {
  data?: ARRAY[];
  mutate?: any;
}
const ClientsGrid = ({ data, mutate }: Props) => {
  return (
    <>
      <section className="py-6 ">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 w-full gap-6 ">
          {data?.map((item: any, index: any) => (
            <div key={index}>
              <MoreOption item={item} mutate={mutate} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ClientsGrid;

const MoreOption = ({ item, mutate }: any) => {
  console.log(item);
  const [ticketsId, setTicketsId] = useState("");
  const [tickets, setTickets] = useState(false);
  const [viewTickets, setViewTickets] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { change } = useChange();
  const [viewProjects, setViewProjects] = useState<any>(null);
  const [projects, setProjects] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data: ticketsData, isLoading } = useFetch<any>(
    `tickets?clientId=${ticketsId}`
  );

  const handleDelete = async (item: Client) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to delete ${item?.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire(`Info`, "It will take some time", "info");
          const res = await change(`clients/${item?.id}`, {
            method: "DELETE",
          });
          await deleteFile(String(item?.photo?.split("/").reverse()[0]));
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
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
    }
  };

  return (
    <>
      <ViewTicketsDrawer
        open={tickets}
        onClose={() => setTickets(false)}
        setViewTickets={setViewTickets}
        ticket={ticketsData}
        isLoading={isLoading}
      />
      <ViewProjectsDrawerClientMain
        open={projects}
        onClose={() => setProjects(false)}
        setViewProject={setViewProjects}
        ticketsId={ticketsId}
      />

      <div className="flex flex-col px-4 w-full py-4 h-full justify-center justify-items-center text-center rounded-md shadow-xl drop-shadow-lg bg-white md:hover:scale-105 ease-in-out transition-all duration-200">
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
            <Link href={`/admin/clients/client-profile?id=${item?.id}`}>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <RemoveRedEyeOutlined fontSize="small" />
                </ListItemIcon>
                Visit Profile
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
        <Link href={`/admin/clients/client-profile?id=${item?.id}`}>
          <div className="flex justify-center">
            <PhotoViewerGuests
              className="border-[3px]"
              name={item?.name}
              photo={item?.photo}
            />
          </div>
        </Link>
        <div className="flex-1 mt-6">
          <p className="text-sm font-semibold capitalize leading-snug">
            {item?.name}
          </p>
          <p className="text-sm font-medium leading-snug">
            <RenderIconRow value={item?.username} isEmail />
          </p>
          <p className="mb-2 text-sm text-slate-400 font-medium">{item.role}</p>
        </div>

        <div className="md:flex grid gap-3 justify-center">
          <button
            onClick={() => {
              setTickets(true), setTicketsId(item?.id);
            }}
            className="rounded-md text-sm bg-theme text-white font-semibold shadow-md px-4 py-1.5"
          >
            Tickets <span>{`(${item._count.tickets})`}</span>
          </button>
          <button
            onClick={() => {
              setTicketsId(item?.id), setProjects(true);
            }}
            className="rounded-md text-sm bg-secondary text-white font-semibold shadow-md px-4 py-1.5"
          >
            Projects <span>{`(${item._count.projects})`}</span>
          </button>
        </div>
      </div>
    </>
  );
};
