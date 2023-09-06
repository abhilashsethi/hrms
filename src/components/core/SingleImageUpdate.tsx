import { Update } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRef } from "react";

interface Props {
  values?: any;
  setImageValue?: any;
  children?: JSX.Element;
}

const SingleImageUpdate = ({ values, setImageValue, children }: Props) => {
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
            accept="image/*"
            style={{ display: "none" }}
            onChange={(event: any) =>
              //   setFieldValue("image", event.currentTarget.files[0])
              setImageValue(event)
            }
          />
          <div className="text-red-500">{children}</div>

          {/* {console.log({ value: values?.logo })} */}
          {values.logo && values.logo !== "null" && (
            <img
              className="w-24 object-contain"
              src={
                typeof values?.logo == "string" &&
                values?.logo?.includes("https://")
                  ? values?.logo
                  : URL?.createObjectURL(values?.logo)
              }
              alt="Preview"
            />
          )}
        </div>
        <p>Upload Logo</p>
        <p>Maximum size : 300KB</p>
        <Button
          variant="contained"
          className="!bg-theme !mt-3"
          startIcon={<Update />}
        >
          UPDATE LOGO
        </Button>
      </div>
    </div>
  );
};

export default SingleImageUpdate;
