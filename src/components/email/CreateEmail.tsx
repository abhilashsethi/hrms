import {
  AttachFile,
  Cancel,
  Close,
  Drafts,
  InsertDriveFile,
  Label,
  Send,
} from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Chip,
  FormHelperText,
  IconButton,
  InputLabel,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { User } from "types";
import * as Yup from "yup";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const CreateEmail = () => {
  const [pageLimit, setPageLimit] = useState<number | undefined>(20);
  const [searchText, setSearchText] = useState("");

  const attachRef = useRef<HTMLInputElement | null>(null);

  const { data: users, isValidating: userLoading } = useFetch<User[]>(
    `users?${pageLimit ? "page=1&limit=" + pageLimit + "&" : ""}` +
      (searchText ? `name=${searchText}` : "")
  );

  const formik = useFormik({
    initialValues: {
      recipients: "",
      ccRecipients: "",
      bccRecipients: "",
      subject: "",
      attachments: [],
      message: "",
    },
    validationSchema: Yup.object({
      recipients: Yup.array(Yup.object()).required(
        "Email recipient is required*"
      ),
      ccRecipients: Yup.array(Yup.object()).optional().nullable(),
      bccRecipients: Yup.array(Yup.object()).optional().nullable(),
      attachments: Yup.array(Yup.object()).optional().nullable(),
      subject: Yup.string(),
      message: Yup.string().required("Message is required*"),
    }),
    onSubmit: (value) => {
      console.log({ value });
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
    <div className="w-full flex  flex-col my-4 p-4 border rounded-lg bg-white shadow-lg gap-4">
      <div className="flex flex-col gap-4 md:flex-row items-center ">
        <div className="flex flex-col w-full gap-2">
          <InputLabel className="!font-semibold"> To - </InputLabel>
          <Autocomplete
            loading={userLoading}
            multiple
            fullWidth
            limitTags={2}
            options={users || []}
            value={
              Array.isArray(formik?.values?.recipients)
                ? formik?.values?.recipients
                : []
            }
            isOptionEqualToValue={(option, value) => option?.name === value}
            clearOnBlur={false}
            getOptionLabel={(option: any) => option.name}
            filterSelectedOptions
            noOptionsText={
              <h3
                className="font-semibold tracking-wide !text-sm cursor-pointer"
                onClick={() => {
                  setPageLimit(undefined);
                  setSearchText("");
                }}
              >
                Select All
              </h3>
            }
            onChange={(e, v) => {
              formik?.setFieldValue("recipients", v);
            }}
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  label={
                    <div className="flex flex-col">
                      <h3 className="font-semibold tracking-wide  !text-sm">
                        {option.name}
                      </h3>
                      <p className="!text-xs whitespace-nowrap ">
                        {option?.username}
                      </p>
                    </div>
                  }
                  avatar={
                    <Avatar src={option?.photo || undefined}>
                      {option?.name[0]}
                    </Avatar>
                  }
                />
              ));
            }}
            renderInput={(params) => (
              <TextField
                value={searchText}
                onChange={(e) => setSearchText(e?.target?.value)}
                {...params}
                size="small"
                fullWidth
              />
            )}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <InputLabel className="!font-semibold"> Subject - </InputLabel>
          <TextField
            size="small"
            name="subject"
            value={formik?.values?.subject}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={Boolean(formik?.touched?.subject && formik?.errors?.subject)}
            helperText={
              formik?.touched?.subject && (formik?.errors?.subject as any)
            }
            fullWidth
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row items-center ">
        <div className="flex flex-col w-full gap-2">
          <InputLabel className="!font-semibold"> Cc - </InputLabel>
          <Autocomplete
            loading={userLoading}
            clearOnBlur={false}
            multiple
            fullWidth
            limitTags={2}
            value={
              Array.isArray(formik?.values?.ccRecipients)
                ? formik?.values?.ccRecipients
                : []
            }
            isOptionEqualToValue={(option, value) => option?.name === value}
            options={users || []}
            getOptionLabel={(option: any) => option.name}
            filterSelectedOptions
            noOptionsText={
              <h3
                className="font-semibold tracking-wide !text-sm cursor-pointer"
                onClick={() => {
                  setPageLimit(undefined);
                  setSearchText("");
                }}
              >
                Select All
              </h3>
            }
            onChange={(e, v) => {
              formik?.setFieldValue("ccRecipients", v);
            }}
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  label={
                    <div className="flex flex-col">
                      <h3 className="font-semibold tracking-wide  !text-sm">
                        {option.name}
                      </h3>
                      <p className="!text-xs whitespace-nowrap ">
                        {option?.username}
                      </p>
                    </div>
                  }
                  avatar={
                    <Avatar src={option?.photo || undefined}>
                      {option?.name[0]}
                    </Avatar>
                  }
                />
              ));
            }}
            renderInput={(params) => (
              <TextField
                value={searchText}
                onChange={(e) => setSearchText(e?.target?.value)}
                {...params}
                size="small"
                fullWidth
              />
            )}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <InputLabel className="!font-semibold"> Bcc - </InputLabel>
          <Autocomplete
            loading={userLoading}
            multiple
            fullWidth
            clearOnBlur={false}
            limitTags={2}
            options={users || []}
            value={
              Array.isArray(formik?.values?.bccRecipients)
                ? formik?.values?.bccRecipients
                : []
            }
            isOptionEqualToValue={(option, value) => option?.name === value}
            getOptionLabel={(option: any) => option.name}
            filterSelectedOptions
            noOptionsText={
              <h3
                className="font-semibold tracking-wide !text-sm cursor-pointer"
                onClick={() => {
                  setPageLimit(undefined);
                  setSearchText("");
                }}
              >
                Select All
              </h3>
            }
            onChange={(e, v) => {
              formik?.setFieldValue("bccRecipients", v);
            }}
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  label={
                    <div className="flex flex-col">
                      <h3 className="font-semibold tracking-wide  !text-sm">
                        {option.name}
                      </h3>
                      <p className="!text-xs whitespace-nowrap ">
                        {option?.username}
                      </p>
                    </div>
                  }
                  avatar={
                    <Avatar src={option?.photo || undefined}>
                      {option?.name[0]}
                    </Avatar>
                  }
                />
              ));
            }}
            renderInput={(params) => (
              <TextField
                value={searchText}
                onChange={(e) => setSearchText(e?.target?.value)}
                {...params}
                size="small"
                fullWidth
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-col w-full gap-2">
        <InputLabel className="!font-semibold"> Message - </InputLabel>
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
            height: "50vh",
            paddingBottom: "2rem",
          }}
          className=" w-full bg-white rounded-lg"
        />
        {Boolean(formik?.touched?.message && formik?.errors?.message) && (
          <FormHelperText error={true}>
            {formik?.touched?.message && formik?.errors?.message}
          </FormHelperText>
        )}
      </div>
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
      </div>
    </div>
  );
};

export default CreateEmail;