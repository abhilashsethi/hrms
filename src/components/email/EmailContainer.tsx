import { FileDownload, InsertDriveFile } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import ReplyToEmail from "./ReplyToEmail";

const EmailContainer = () => {
  return (
    <div className="w-full flex flex-col  gap-4">
      <ReplyToEmail />
      <div className="p-4 flex w-full bg-secondary-600 rounded-t-lg items-center gap-4 border-b border-white justify-start">
        <Avatar />
        <div className="flex flex-col">
          <h3 className="font-bold text-white tracking-wide">
            John Constantine
          </h3>
          <h3 className="font-medium text-xs text-gray-200">
            john@searchingyard.com
          </h3>
        </div>
      </div>
      <div className="flex flex-col px-4 gap-4">
        <h3 className="font-bold tracking-wide text-gray-900 text-2xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit,
          praesentium.
        </h3>
        <p className="font-medium text-gray-600 tracking-wide text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil itaque,
          voluptatum non eveniet impedit commodi dolor magni eum quo sed id, qui
          aperiam recusandae ad deleniti dicta sint corrupti amet. Aliquid ipsa
          laboriosam totam fugit.
        </p>
      </div>
      <h3 className="font-medium tracking-wide px-4">Attachments -</h3>
      <div className="flex flex-wrap gap-4 px-4 pb-4 ">
        {Array(5)
          .fill(4)
          .map((_, i) => (
            <div
              className="flex flex-col items-center p-4 rounded-md bg-themeBlue shadow-lg"
              key={i}
            >
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <InsertDriveFile className="!text-7xl !text-theme" />
              </a>
              <p className="text-center py-2 text-xs font-medium  break-words">
                image-icon.png
              </p>
              <IconButton className=" !bg-secondary  shadow-lg p-2 ">
                <FileDownload className="!text-white" />
              </IconButton>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EmailContainer;
