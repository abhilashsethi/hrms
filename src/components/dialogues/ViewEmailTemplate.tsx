import { Close, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DEFAULTIMG } from "assets/home";
import Link from "next/link";
import Swal from "sweetalert2";
import { MailTemplate } from "types";

interface Props {
  open?: any;
  handleClose?: any;
  item?: MailTemplate;
}

const ViewEmailTemplate = ({ open, handleClose, item }: Props) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ p: 2, minWidth: "30rem !important" }}>
        <p className="text-center text-lg font-semibold text-theme tracking-wide">
          {item?.title}
        </p>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            top: 10,
            right: 10,
            position: "absolute",
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Tooltip title="Close">
            <Close />
          </Tooltip>
        </IconButton>
      </DialogTitle>
      <DialogContent className="app-scrollbar" sx={{ p: 2 }}>
        <div className="md:w-full w-full md:px-4 px-2 tracking-wide">
          <section className="flex justify-center">
            <div
              dangerouslySetInnerHTML={{
                __html: `${item?.content}`,
              }}
            ></div>
          </section>
          <div className="flex justify-center mt-4 font-semibold mb-3 gap-4">
            <Link href={`/admin/templates/edit-template?id=${item?.id}`}>
              <Button
                variant="contained"
                startIcon={<Edit />}
                className="!bg-blue-500"
              >
                Edit
              </Button>
            </Link>
            <Button
              variant="contained"
              startIcon={<Delete />}
              className="!bg-red-600"
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You want to delete this template?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, send!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire(
                      "Sent!",
                      "Template deleted successfully!",
                      "success"
                    );
                  }
                });
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewEmailTemplate;
