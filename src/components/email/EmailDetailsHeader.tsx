import {
  Delete,
  East,
  KeyboardBackspace,
  Print,
  West,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useChange } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const EmailDetailsHeader = ({
  print,
  sentTime,
}: {
  print?: () => void;
  sentTime?: string;
}) => {
  const { back, query } = useRouter();

  const { change } = useChange();

  const handleDeleteEmail = async () => {
    try {
      const response = await change(`emails/${query?.emailId}`, {
        method: "DELETE",
      });

      if (response?.status !== 200) throw new Error(response?.results?.msg);

      Swal.fire({
        title: "Success",
        text: "Email deleted successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      back();
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          title: "Error",
          text: error?.message,
          icon: "error",
        });
        return;
      }
      Swal.fire({
        title: "Error",
        text: "Something went wrong!.Try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full bg-theme text-white">
      <div className="w-full flex items-center container mx-auto md:p-4 p-1 justify-between">
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
          <p className="font-medium text-xs md:block hidden tracking-wide">
            {moment(sentTime).format("LL")}
          </p>
          <p className="font-medium text-xs md:hidden block tracking-wide">
            {moment(sentTime).format("ll")}
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
