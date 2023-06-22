import {
  AttachFile,
  Close,
  Drafts,
  InsertDriveFile,
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
import { useAuth, useChange, useFetch } from "hooks";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import { deleteFile, uploadFile } from "utils";
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

  const { change, isChanging } = useChange();

  const { user } = useAuth();

  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      recipients: "",
      ccRecipients: "",
      bccRecipients: "",
      subject: "",
      attachments: [],
      message: "",
      isDraft: false,
    },
    validationSchema: Yup.object({
      recipients: Yup.array(Yup.object()).required(
        "Email recipient is required*"
      ),
      ccRecipients: Yup.array(Yup.object()).optional().nullable(),
      bccRecipients: Yup.array(Yup.object()).optional().nullable(),
      attachments: Yup.array().optional().nullable(),
      subject: Yup.string(),
      message: Yup.string().required("Message is required*"),
      isDraft: Yup.boolean(),
    }),
    onSubmit: async (value) => {
      let attachmentUrl: string[] = [];
      try {
        //if attachments are present then upload the file and get ur

        if (value?.attachments?.length) {
          await Promise.all(
            value?.attachments?.map((item: File) => {
              return new Promise(async (resolve, reject) => {
                try {
                  let url = await uploadFile(
                    item,
                    Date.now() + "-" + item?.name
                  );
                  url && attachmentUrl.push(url);
                  resolve(true);
                } catch (error) {
                  reject(error);
                }
              });
            })
          );
        }

        const response = await change(`emails`, {
          method: "POST",
          body: {
            senderId: user?.id,
            receiverIds:
              Array.isArray(value?.recipients) &&
              value?.recipients?.map((item: User) => item?.id),
            cc:
              Array.isArray(value?.ccRecipients) &&
              value?.ccRecipients?.map((item: User) => item?.id),
            bcc:
              Array.isArray(value?.bccRecipients) &&
              value?.bccRecipients?.map((item: User) => item?.id),
            subject: value?.subject,
            content: value?.message,
            attachments: attachmentUrl,
            isSend: !value?.isDraft,
          },
        });

        if (response?.status !== 200) throw new Error(response?.results?.msg);

        Swal.fire({
          title: "Success",
          text: response?.results?.msg,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        push(`/admin/email/sent`);
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
    <div className="w-full flex  flex-col my-4 p-4 border rounded-lg bg-white shadow-lg gap-4">
      <div className="flex flex-col gap-4 lg:flex-row items-center ">
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
            isOptionEqualToValue={(option, value) =>
              option?.name === value.name
            }
            clearOnBlur={false}
            getOptionLabel={(option: any) => option.name}
            filterSelectedOptions={true}
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
                error={Boolean(
                  formik?.touched?.recipients && formik?.errors?.recipients
                )}
                helperText={
                  formik?.touched?.recipients &&
                  (formik?.errors?.recipients as any)
                }
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
      <div className="flex flex-col gap-4 lg:flex-row items-center ">
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
            isOptionEqualToValue={(option, value) =>
              option?.name === value?.name
            }
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
                error={Boolean(
                  formik?.touched?.ccRecipients && formik?.errors?.ccRecipients
                )}
                helperText={
                  formik?.touched?.ccRecipients &&
                  (formik?.errors?.ccRecipients as any)
                }
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
            isOptionEqualToValue={(option, value) =>
              option?.name === value?.name
            }
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
                error={Boolean(
                  formik?.touched?.bccRecipients &&
                    formik?.errors?.bccRecipients
                )}
                helperText={
                  formik?.touched?.bccRecipients &&
                  (formik?.errors?.bccRecipients as any)
                }
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
          <button
            className="flex gap-4 items-center hover:scale-95 transition-all border border-blue-500 ease-in-out duration-300 hover:bg-blue-600 justify-center bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg "
            onClick={() => {
              formik?.submitForm();
            }}
          >
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

          <button
            className="flex gap-4 items-center hover:scale-95 transition-all border border-secondary-500 ease-in-out duration-300 hover:bg-secondary-600 justify-center bg-secondary-500 text-white px-4 py-2 rounded-md shadow-lg "
            onClick={() => {
              formik?.setFieldValue("isDraft", true);
              formik?.submitForm();
            }}
            type="submit"
          >
            <Drafts />
            <span className="text-sm">Save To Draft</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEmail;
