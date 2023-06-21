import {
  AttachFile,
  Cancel,
  Close,
  Drafts,
  InsertDriveFile,
  Send,
} from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

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
  const attachRef = useRef<HTMLInputElement | null>(null);

  const formik = useFormik({
    initialValues: {
      isForwarded: forwardedTo,
      forwardTo: "",
      message: "",
      attachments: [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      isForwarded: Yup.boolean(),
      forwardTo: Yup.string().when("isForwarded", (value, schema) =>
        value ? Yup.string().required().email("Provide a valid email*") : schema
      ),
      message: Yup.string().required(),
      attachments: Yup.array().optional().nullable(),
    }),
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  const handleRemoveFile = (slNumber: number) => {
    //filter out this number of index and set other favlue

    formik?.setFieldValue(
      "attachments",
      formik?.values?.attachments?.filter((item, index) => index !== slNumber)
    );
  };

  return (
    <div
      className={`container p-4 mx-auto w-full bg-white shadow-lg transition-all ease-in-out duration-300 flex flex-col gap-4 ${
        open ? "h-full opacity-100" : " opacity-0 h-0 overflow-hidden "
      } `}
    >
      {forwardedTo && (
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold tracking-wide text-sm">Forward To -</h3>
          <TextField
            variant="outlined"
            name="forwardTo"
            value={formik?.values?.forwardTo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="small"
            fullWidth
            type="email"
            error={Boolean(
              formik?.touched?.forwardTo && formik?.errors?.forwardTo
            )}
            helperText={
              formik?.touched?.forwardTo && (formik?.errors?.forwardTo as any)
            }
          />
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
        value={formik?.values?.message}
        onChange={(value) => formik?.setFieldValue("message", value)}
        onBlur={() => formik?.setFieldTouched("message", true)}
        style={{
          height: "15rem",
          paddingBottom: "2rem",
        }}
        className=" w-full bg-white rounded-lg"
      />
      {formik?.values?.attachments?.length ? (
        <>
          <h3 className="font-medium tracking-wide mt-8 px-4">Attachments -</h3>
          <div className="flex flex-wrap gap-4 px-4 pb-4 ">
            {formik?.values?.attachments?.map((item: any, i) => (
              <div
                className="flex flex-col items-center relative p-4 rounded-md bg-themeBlue shadow-lg"
                key={i}
              >
                <span className="absolute -top-5 -right-5 z-10">
                  <IconButton
                    className="!bg-red-500 !text-white"
                    onClick={() => handleRemoveFile(i)}
                  >
                    <Close className="!text-xl" />
                  </IconButton>
                </span>
                <a
                  href={URL.createObjectURL(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InsertDriveFile className="!text-7xl !text-theme" />
                </a>
                <p className="text-center py-2 text-xs font-medium  break-words">
                  {item?.name}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : null}

      <div className="flex items-center gap-4 py-4 w-full justify-between">
        <div className="flex gap-4 items-center">
          <button className="flex gap-4 items-center hover:scale-95 transition-all border border-blue-500 ease-in-out duration-300 hover:bg-blue-600 justify-center bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg ">
            <Send />
            <span className="text-sm">Send Email</span>
          </button>
          <input
            type="file"
            name="attachments"
            ref={attachRef}
            onChange={(e: any) =>
              formik.setFieldValue(
                "attachments",
                formik?.values?.attachments?.length
                  ? [...formik?.values?.attachments, e?.target?.files[0]]
                  : [e?.target?.files[0]]
              )
            }
            className="!opacity-0 !w-0 !overflow-hidden absolute "
          />
          <button
            className="flex gap-4 items-center hover:scale-95 transition-all border border-secondary-500 ease-in-out duration-300 hover:bg-secondary-600 justify-center bg-secondary-500 text-white px-4 py-2 rounded-md shadow-lg "
            onClick={() => attachRef?.current?.click()}
          >
            <AttachFile />
            <span className="text-sm">Attach</span>
          </button>

          <button className="flex gap-4 items-center hover:scale-95 transition-all border border-secondary-500 ease-in-out duration-300 hover:bg-secondary-600 justify-center bg-secondary-500 text-white px-4 py-2 rounded-md shadow-lg ">
            <Drafts />
            <span className="text-sm">Save To Draft</span>
          </button>
        </div>
        <button
          className="flex gap-4 items-center hover:scale-95 transition-all border border-red-500 ease-in-out duration-300 hover:bg-red-600 justify-center bg-red-500 text-white px-4 py-2 rounded-md shadow-lg "
          onClick={() => {
            onClose?.(false);
          }}
        >
          <Cancel />
          <span className="text-sm">Cancel</span>
        </button>
      </div>
    </div>
  );
};

export default TypeEmailContainer;
