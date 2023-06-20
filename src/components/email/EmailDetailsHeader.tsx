import {
  Delete,
  East,
  KeyboardBackspace,
  Print,
  West,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

const EmailDetailsHeader = () => {
  return (
    <div className="w-full bg-theme text-white">
      <div className="w-full flex items-center container mx-auto p-4 justify-between">
        <div className="flex gap-4 items-center">
          <IconButton>
            <KeyboardBackspace className="!text-white" />
          </IconButton>
          <span className="text-gray-100/20  ">|</span>
          <IconButton>
            <Delete className="!text-white" />
          </IconButton>
          <IconButton>
            <Print className="!text-white" />
          </IconButton>
          <span className="text-gray-100/20  ">|</span>
          <p className="font-medium text-xs tracking-wide">Today, 08:34 AM</p>
        </div>
        <div className="flex gap-4 items-center">
          <IconButton>
            <West className="!text-white" />
          </IconButton>
          <IconButton>
            <East className="!text-white" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default EmailDetailsHeader;
