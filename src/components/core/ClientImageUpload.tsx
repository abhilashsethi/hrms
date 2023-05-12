import { CloudUpload } from "@mui/icons-material";
import React, { useRef } from "react";

interface Props {
  values?: any;
  setImageValue?: any;
  children?: JSX.Element;
}

const ClientImageUpload = ({ values, setImageValue, children }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        className="min-h-40 py-6 w-full border-[1px] border-dashed border-theme cursor-pointer flex flex-col items-center justify-center text-sm"
      >
        <div className="">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(event: any) =>
              //   setFieldValue("image", event.currentTarget.files[0])
              setImageValue(event)
            }
          />
          <div className="text-red-500">{children}</div>
          {values.image && (
            <img
              className="w-24 object-contain"
              src={URL.createObjectURL(values.image)}
              alt="Preview"
            />
          )}
        </div>
        <p>Upload Logo (200 * 300)</p>
        <p>Maximum size : 200kb</p>
        <CloudUpload fontSize="large" color="primary" />
      </div>
    </div>
  );
};

export default ClientImageUpload;
