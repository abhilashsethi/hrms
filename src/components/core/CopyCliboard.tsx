import { Alert, Snackbar, Tooltip } from "@mui/material";
import ICONS from "assets/icons";
import React from "react";

interface Props {
  value?: any;
  isCut?: boolean;
}

const CopyClipboard = ({ value, isCut = true }: Props) => {
  const [isSnackbar, setIsSnackbar] = React.useState(false);
  const handleClick = () => {
    setIsSnackbar(true);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbar(false);
  };
  return (
    <>
      <Snackbar open={isSnackbar} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Copied to clipboard
        </Alert>
      </Snackbar>
      <span className="group flex gap-2 items-center text-sm">
        {isCut ? (
          <span>
            {value?.slice(0, 15)}
            {value?.length >= 15 ? "..." : ""}
          </span>
        ) : (
          <span>{value}</span>
        )}
        <Tooltip title="Copy to clipboard">
          <span
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(value);
              handleClick();
            }}
            className="scale-0 rounded cursor-pointer p-1 transition hover:bg-indigo-100 active:bg-green-100 group-hover:scale-100 "
          >
            <ICONS.Copy />
          </span>
        </Tooltip>
      </span>
    </>
  );
};
export default CopyClipboard;
