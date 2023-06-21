import { Drafts, Send } from "@mui/icons-material";
import { TextField } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const TypeEmailContainer = ({
  forwardedTo,
  open,
  onClose,
}: {
  forwardedTo?: boolean;
  open?: boolean;
  onClose?: (arg: any) => void;
}) => {
  const [value, setValue] = useState("");
  return (
    <div
      className={`container p-4 mx-auto w-full bg-white shadow-lg transition-all ease-in-out duration-300 flex flex-col gap-4 ${
        open ? "h-full opacity-100" : " opacity-0 h-0 overflow-hidden "
      } `}
    >
      {forwardedTo && (
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold tracking-wide text-sm">Forward To -</h3>
          <TextField variant="outlined" size="small" fullWidth type="email" />
        </div>
      )}

      <ReactQuill
        placeholder="Reply message ..."
        theme="snow"
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
        ]}
        value={value}
        onChange={(value) => setValue(value)}
        style={{
          height: "15rem",
          paddingBottom: "2rem",
        }}
        className=" w-full bg-white "
      />

      <div className="flex items-center gap-4 py-4 w-full justify-end">
        <button className="flex gap-4 items-center hover:scale-95 transition-all border border-secondary-500 ease-in-out duration-300 hover:bg-secondary-600 justify-center bg-secondary-500 text-white px-4 py-2 rounded-md shadow-lg ">
          <Drafts />
          <span className="text-sm">Save To Draft</span>
        </button>
        <button className="flex gap-4 items-center hover:scale-95 transition-all border border-blue-500 ease-in-out duration-300 hover:bg-blue-600 justify-center bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg ">
          <Send />
          <span className="text-sm">Send Email</span>
        </button>
      </div>
    </div>
  );
};

export default TypeEmailContainer;
