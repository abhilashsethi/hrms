import {
  DeleteRounded,
  EditRounded,
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
import { PhotoViewerGuests } from "components/core";
import { UpdateTechnology } from "components/dialogues";
import { useChange } from "hooks";

import { useState, MouseEvent } from "react";
import Swal from "sweetalert2";
import { deleteFile } from "utils";
interface ARRAY {
  id?: string;
}
interface Props {
  data?: any;
  mutate?: any;
}
const TechnologyGrid = ({ data, mutate }: Props) => {
  return (
    <section className="my-4">
      <div className="grid xl:grid-cols-4 gap-4 lg:grid-cols-2">
        {data?.map((item: any) => (
          <div key={item?.id}>
            <CardContent item={item} mutate={mutate} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnologyGrid;

const CardContent = ({ item, mutate }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [isUpdate, setIsUpdate] = useState<{
    dialogue?: boolean;
    techData?: string | null;
  }>({ dialogue: false, techData: null });
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { change } = useChange();
  const handleDelete = async (item: any) => {
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
          const res = await change(`technologies/${item?.id}`, {
            method: "DELETE",
          });
          await deleteFile(String(item?.logo?.split("/").reverse()[0]));
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
  return (
    <>
      <UpdateTechnology
        techData={isUpdate?.techData}
        open={isUpdate?.dialogue}
        handleClose={() => setIsUpdate({ dialogue: false })}
        mutate={mutate}
      />
      <div className=" relative bg-white w-full rounded-xl shadow-xl hover:scale-105 ease-in-out transition-all duration-200">
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
            <MenuItem
              onClick={() => setIsUpdate({ dialogue: true, techData: item })}
            >
              <ListItemIcon>
                <EditRounded fontSize="small" />
              </ListItemIcon>
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleDelete(item)}>
              <ListItemIcon>
                <DeleteRounded fontSize="small" />
              </ListItemIcon>
              Delete
            </MenuItem>
          </Menu>
        </div>
        <div className="py-4 flex justify-center">
          <PhotoViewerGuests
            className="border-[3px]"
            name={item?.name}
            photo={item?.logo}
          />
        </div>
        <div className="flex items-center py-1 justify-center px-2">
          <span className="text-xl font-semibold tracking-wide text-gray-600">
            {item?.name}
          </span>
        </div>
        <div className="w-full pb-3 px-2 flex gap-2 justify-center">
          <div className=" py-1 rounded-lg text-gray-600 flex items-center gap-2 px-4">
            <p className="font-semibold tracking-wide text-sm">
              Total Project :
            </p>
            {item?.usedProjectIds?.length}
          </div>
        </div>
      </div>
    </>
  );
};
