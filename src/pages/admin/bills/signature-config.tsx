import { Add, DeleteRounded, Edit, MoreVertRounded } from "@mui/icons-material";
import {
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { AdminBreadcrumbs, LoaderAnime, SkeletonLoader } from "components/core";
import {
  AddSignatureConfig,
  UpdateSignatureConfig,
} from "components/dialogues";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { MouseEvent, useState } from "react";
import Swal from "sweetalert2";
import { deleteFile } from "utils";
interface Props {
  id?: string;
  name?: string;
  link?: string;
}
const SignatureConfig = () => {
  const [isSignature, setIsSignature] = useState<boolean>(false);
  const {
    data: signature,
    mutate,
    isLoading,
  } = useFetch<Props[]>(`signatures/get-all`);
  return (
    <PanelLayout title="Signature configure">
      <AddSignatureConfig
        open={isSignature}
        handleClose={() => setIsSignature(false)}
        mutate={mutate}
      />
      <section className="lg:px-8 px-2 lg:py-4 py-2">
        <div className="flex justify-between items-center py-4">
          <AdminBreadcrumbs links={links} />
          <Button
            size="small"
            className="!bg-theme"
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setIsSignature(true);
            }}
          >
            ADD SIGNATURE
          </Button>
        </div>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <section className="w-full px-0 lg:py-4 py-2">
            {signature?.length ? (
              <div className="grid w-full lg:grid-cols-3 gap-4">
                {signature?.map((item) => (
                  <CardContent
                    key={item?.id}
                    item={item}
                    mutate={mutate}
                    signature={signature}
                  />
                ))}
              </div>
            ) : (
              <LoaderAnime text="No Signature" />
            )}
          </section>
        )}
      </section>
    </PanelLayout>
  );
};

export default SignatureConfig;
const CardContent = ({ item, mutate, signature }: any) => {
  const [isItem, setIsItem] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { change } = useChange();
  const handleDelete = async (item: Props) => {
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
          const res = await change(`signatures/${item?.id}`, {
            method: "DELETE",
          });
          if (item?.link) {
            await deleteFile(String(item?.link?.split("/").reverse()[0]));
          }
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
      <UpdateSignatureConfig
        open={isUpdate}
        handleClose={() => setIsUpdate(false)}
        mutate={mutate}
        data={isItem}
      />
      <div className="bg-white relative rounded-lg px-4 py-4 shadow-lg">
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
            transformOrigin={{
              horizontal: "right",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
          >
            <MenuItem onClick={() => handleDelete(item)}>
              <ListItemIcon>
                <DeleteRounded fontSize="small" />
              </ListItemIcon>
              Delete
            </MenuItem>
            <MenuItem
              onClick={() => {
                setIsItem(item), setIsUpdate(true);
              }}
            >
              <ListItemIcon>
                <Edit fontSize="small" />
              </ListItemIcon>
              Edit
            </MenuItem>
          </Menu>
        </div>
        <div className="grid">
          <div className="text-xl text-theme font-bold tracking-wide flex text-center justify-center items-center">
            <h1>{item?.name}</h1>
          </div>
          <div className="py-2">
            <img
              className="lg:h-56 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
              src={item?.link}
              alt="signature"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const links = [
  // { id: 1, page: "Payroll", link: "/admin/payroll" },
  { id: 2, page: "Signature", link: "/admin/bills/signature-config" },
];
