import {
  AttachFile,
  Cancel,
  Close,
  Drafts,
  InsertDriveFile,
  Send,
} from "@mui/icons-material";
import {
  Autocomplete,
  FormHelperText,
  IconButton,
  InputLabel,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useAuth, useChange, useFetch } from "hooks";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { Client, EmailType, User } from "types";
import { deleteFile, uploadFile } from "utils";
import * as Yup from "yup";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const TypeEmailContainer = ({
  forwardedTo,
  open,
  onClose,
  data,
}: {
  forwardedTo?: boolean;
  open?: boolean;
  onClose?: (arg: any) => void;
  data?: EmailType;
}) => {
  const attachRef = useRef<HTMLInputElement | null>(null);

  const { change } = useChange();
  const { user } = useAuth();
  const { push } = useRouter();
  const [searchText, setSearchText] = useState("");
  const { data: users, isValidating: userLoading } = useFetch<User[]>(
    `users?page=1&limit=20` + (searchText ? `&name=${searchText}` : "")
  );
  const { data: clients, isValidating: clientLoading } = useFetch<Client[]>(
    `clients?page=1&limit=20` + (searchText ? `&name=${searchText}` : "")
  );

  const [selectedAutoComplete, setSelectedAutocomplete] = useState<any>();

  const formik = useFormik({
    initialValues: {
      isForwarded: forwardedTo,
      forwardedToId: [],
      attachments: [],
      message: "",
      isDraft: false,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      attachments: Yup.array().optional().nullable(),
      message: Yup.string().required("Message is required*"),
      isDraft: Yup.boolean(),
      isForwarded: Yup.boolean(),
      forwardedToId: Yup.array(Yup.string()).when("isForwarded", {
        is: true,
        then: () => Yup.array(Yup.string()).required("Required"),
      }),
    }),
    onSubmit: async (value) => {
      let attachmentUrl: string[] = [];
      try {
        //if attachments are present then upload the file and get ur
        if (value?.attachments?.length) {
          await Promise.all(
            value?.attachments?.map((item: any) => {
              return new Promise(async (resolve, reject) => {
                try {
                  if (typeof item === "string") {
                    attachmentUrl.push(item);
                  } else {
                    let url = await uploadFile(
                      item,
                      Date.now() + "-" + item?.name?.split(" ")?.join("-")
                    );
                    url && attachmentUrl.push(url);
                  }

                  resolve(true);
                } catch (error) {
                  reject(error);
                }
              });
            })
          );
        }

        if (value?.isForwarded && !value?.forwardedToId?.length)
          throw new Error("Choose user(s) to forward");

        const response = await change(`emails`, {
          method: "POST",
          body: {
            senderId: user?.id,
            subject: value?.isForwarded
              ? `Forwarded | ${data?.subject}`
              : `Reply | ${data?.subject}`,
            content: value?.forwardedToId?.length
              ? `Forwarded Message &lt;&lt;${data?.sender?.username}&gt;&gt; <br/> ${data?.content} &lt;&lt;${user?.username}&gt;&gt; <br/> ${value?.message} `
              : value?.message,
            attachments: attachmentUrl?.length
              ? [
                  ...attachmentUrl,
                  ...(value?.isForwarded && data?.attachments
                    ? data?.attachments
                    : []),
                ]
              : [
                  ...(value?.isForwarded && data?.attachments
                    ? data?.attachments
                    : []),
                ],
            isSend: !value?.isDraft,
            receiverIds: value?.forwardedToId?.length
              ? value?.forwardedToId
              : data?.sender?.id === user?.id
              ? [data?.receiver?.id]
              : [data?.sender?.id],
            replyId: value?.isForwarded ? undefined : data?.id,
          },
        });
        if (response?.status !== 200) throw new Error(response?.results?.msg);

        Swal.fire({
          title: "Success",
          text: `Email ${value?.isDraft ? "drafted" : "sent"} successfully`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        push(value?.isDraft ? `/admin/email/drafts` : `/admin/email/sent`);
      } catch (error) {
        //if images are already uploaded and then error thrown delete uploaded files

        if (attachmentUrl?.length) {
          await Promise.all(
            attachmentUrl?.map((item: string) => {
              return new Promise(async (resolve, reject) => {
                try {
                  await deleteFile(item);
                  resolve(true);
                } catch (error) {
                  reject(error);
                }
              });
            })
          );
        }
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
    },
  });

  const handleRemoveFile = (slNumber: number) => {
    //filter out this number of index and set other value
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
      {formik?.values?.isForwarded && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col w-full gap-2">
            <InputLabel className="!font-semibold"> Forwarded To - </InputLabel>
            <Autocomplete
              loading={userLoading}
              clearOnBlur={false}
              multiple={true}
              fullWidth
              value={selectedAutoComplete}
              isOptionEqualToValue={(option, value) => option?.id === value?.id}
              options={
                [
                  ...(users?.filter((item) => item?.id !== user?.id) || []),
                  ...(clients?.filter((item) => item?.id !== user?.id) || []),
                ] || []
              }
              getOptionLabel={(option: any) => option.username}
              onChange={(e, v) => {
                formik?.setFieldValue(
                  "forwardedToId",
                  v?.map((item) => item?.id)
                );
                setSelectedAutocomplete(v);
              }}
              renderInput={(params) => (
                <TextField
                  value={searchText}
                  onChange={(e) => setSearchText(e?.target?.value)}
                  {...params}
                  size="small"
                  fullWidth
                  error={Boolean(
                    formik?.touched?.forwardedToId &&
                      formik?.errors?.forwardedToId
                  )}
                  helperText={
                    formik?.touched?.forwardedToId &&
                    (formik?.errors?.forwardedToId as any)
                  }
                />
              )}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4">
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
              ["link"],
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
        {Boolean(formik?.touched?.message && formik?.errors?.message) && (
          <FormHelperText error={true}>
            {formik?.touched?.message && formik?.errors?.message}
          </FormHelperText>
        )}
      </div>

      {formik?.values?.attachments?.length ? (
        <>
          <h3 className="font-medium tracking-wide md:mt-8 mt-12 px-4">
            Attachments -
          </h3>
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
                <p className="text-center py-2 md:block hidden text-xs font-medium  break-words">
                  {item?.name}
                </p>
                {/* Mobile screen */}
                <p className="text-center py-2 md:hidden block text-xs font-medium  break-words">
                  {item?.name?.length > 25
                    ? item?.name?.slice(0, 25) + "..."
                    : item?.name}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : null}

      <div className="flex items-center gap-4 py-4 md:mt-5 mt-10 w-full justify-between">
        <div className="flex gap-4 items-center">
          <button
            className="flex gap-4 items-center hover:scale-95 transition-all border border-blue-500 ease-in-out duration-300 hover:bg-blue-600 justify-center bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg "
            onClick={formik?.submitForm}
            type="submit"
          >
            <Send />
            <span className="text-sm hidden md:flex">Send Email</span>
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
            onClick={() => {
              attachRef?.current?.click();
              console.log("button clicked");
            }}
          >
            <AttachFile />
            <span className="text-sm hidden md:flex">Attach</span>
          </button>

          <button
            className="flex gap-4 items-center hover:scale-95 transition-all border border-secondary-500 ease-in-out duration-300 hover:bg-secondary-600 justify-center bg-secondary-500 text-white px-4 py-2 rounded-md shadow-lg "
            onClick={() => {
              formik?.setFieldValue("isDraft", true);
              formik?.submitForm();
            }}
            type="submit"
          >
            <Drafts />
            <span className="text-sm hidden md:flex">Save To Draft</span>
          </button>
        </div>
        <button
          className="flex gap-4 items-center hover:scale-95 transition-all border border-red-500 ease-in-out duration-300 hover:bg-red-600 justify-center bg-red-500 text-white px-4 py-2 rounded-md shadow-lg "
          onClick={() => {
            onClose?.(false);
          }}
        >
          <Cancel />
          <span className="text-sm hidden md:flex">Cancel</span>
        </button>
      </div>
    </div>
  );
};

export default TypeEmailContainer;
