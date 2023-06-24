import {
  Delete,
  East,
  KeyboardBackspace,
  Print,
  West,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";

const EmailDetailsHeader = ({
  print,
  sentTime,
}: {
  print?: () => void;
  sentTime?: string;
}) => {
  const { back, query } = useRouter();

  const handleDeleteEmail = () => {
    try {
    } catch (error) {}
  };

  return (
    <div className="w-full bg-theme text-white">
      <div className="w-full flex items-center container mx-auto p-4 justify-between">
        <div className="flex gap-4 items-center">
          <IconButton onClick={back}>
            <KeyboardBackspace className="!text-white" />
          </IconButton>
          <span className="text-gray-100/20  ">|</span>
          <IconButton onClick={handleDeleteEmail}>
            <Delete className="!text-white" />
          </IconButton>
          <IconButton onClick={print}>
            <Print className="!text-white" />
          </IconButton>
          <span className="text-gray-100/20  ">|</span>
          <p className="font-medium text-xs tracking-wide">
            {moment(sentTime).format("LL")}
          </p>
        </div>
        {/* <div className="flex gap-4 items-center">
          <IconButton>
            <West className="!text-white" />
          </IconButton>
          <IconButton>
            <East className="!text-white" />
          </IconButton>
        </div> */}
      </div>
    </div>
  );
};

export default EmailDetailsHeader;
