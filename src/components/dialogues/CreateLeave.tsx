import { CheckCircle, Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";

interface Props {
  open: boolean;
  handleClose: any;
}

const CreateLeave = ({ open, handleClose }: Props) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        id="customized-dialog-title"
        sx={{ p: 2, minWidth: "18rem !important" }}
      >
        <p className="text-center text-xl font-bold text-theme tracking-wide">
          ADD LEAVE
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
        <div className="md:w-[30rem] w-[72vw] md:px-4 px-2 tracking-wide">
          <p className="font-medium text-gray-700 mb-2">Select Employee</p>
          <TextField size="small" fullWidth placeholder="Enter Employee name" />
          <p className="font-medium text-gray-700 mb-2 mt-2">Leave Type</p>
          <TextField size="small" fullWidth placeholder="Leave Type" />
          <p className="font-medium text-gray-700 my-2">From</p>
          <TextField size="small" fullWidth placeholder="From" type="date" />
          <p className="font-medium text-gray-700 my-2">To</p>
          <TextField size="small" fullWidth placeholder="To" type="date" />
          <p className="font-medium text-gray-700 my-2">Number Of Days</p>
          <TextField
            size="small"
            fullWidth
            placeholder="Number of days"
            type="number"
          />
          <p className="font-medium text-gray-700 my-2">Reason</p>
          <TextField
            multiline
            rows={3}
            size="small"
            fullWidth
            placeholder="Reason"
          />
          <div className="flex justify-center mt-4">
            <Button
              className="!bg-theme"
              variant="contained"
              startIcon={<CheckCircle />}
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLeave;
