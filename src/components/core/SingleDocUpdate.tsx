import { Update } from "@mui/icons-material";
import { Button } from "@mui/material";
import { NEWPDF } from "assets/dashboard_Icons";
import { PDF } from "assets/home";
import { useRef } from "react";

interface Props {
  values?: any;
  setImageValue?: any;
  children?: JSX.Element;
}

const SingleDocUpdate = ({ values, setImageValue, children }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  //
  return (
    <div className="w-full">
      {/* <p className="text-theme font-semibold my-2">Upload Image</p> */}
      <div
        onClick={handleClick}
        className="min-h-40 py-6 w-full border-[1px] border-dashed border-theme cursor-pointer flex flex-col items-center justify-center text-sm"
      >
        <div className="">
          <input
            ref={inputRef}
            type="file"
            accept="pdf/*"
            style={{ display: "none" }}
            onChange={(event: any) =>
              //   setFieldValue("image", event.currentTarget.files[0])
              setImageValue(event)
            }
          />
          <div className="text-red-500">{children}</div>

          {/* {console.log({ value: values?.logo })} */}
          {values.docs && values.docs !== "null" && (
            <img
              className="w-24 object-contain"
              src={
                typeof values?.docs == "string" && values?.docs
                  ? PDF.src
                  : NEWPDF.src
              }
              alt="Preview"
            />
          )}
        </div>
        <p>Upload Document</p>
        <Button
          variant="contained"
          className="!bg-theme !mt-3"
          startIcon={<Update />}
        >
          UPDATE DOCUMENT
        </Button>
      </div>
    </div>
  );
};

export default SingleDocUpdate;
