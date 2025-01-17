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
  Button,
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
import { useEffect, useRef, useState } from "react";
import EmailEditor, { EditorRef } from "react-email-editor";
import Swal from "sweetalert2";
import { Client, EmailType, EmailUser, MailTemplate, User } from "types";
import { deleteFile, uploadFile } from "utils";
import * as Yup from "yup";
import ReplyToEmail from "./ReplyToEmail";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const CreateEmail = (templateId: any) => {
  const [pageLimit, setPageLimit] = useState<number | undefined>(20);
  const [isBtnLoading, setIsLoading] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [searchText, setSearchText] = useState("");
  const attachRef = useRef<HTMLInputElement | null>(null);
  const { data: users, isValidating: userLoading } = useFetch<User[]>(
    `users?${pageLimit ? pageLimit + "&" : ""}` +
      (searchText ? `name=${searchText}` : "")
  );
  const { data: clients, isValidating: clientLoading } = useFetch<Client[]>(
    `clients?${pageLimit ? pageLimit + "&" : ""}` +
      (searchText ? `name=${searchText}` : "")
  );

  const { change, isChanging } = useChange();
  const { user } = useAuth();
  const { push, query } = useRouter();
  const { data: draftData, isValidating } = useFetch<EmailType>(
    `emails/${query?.draftId}?draft=true`
  );

  const emailEditorRef = useRef<EditorRef>(null);

  const formik = useFormik({
    initialValues: {
      recipients: draftData?.receiver?.length ? draftData?.receiver : "",
      ccRecipients: draftData?.cc?.length ? draftData?.cc : "",
      bccRecipients: draftData?.bcc?.length ? draftData?.bcc : "",
      subject: draftData?.subject ? draftData?.subject : "",
      attachments: draftData?.attachments?.length ? draftData?.attachments : [],
      message: draftData?.content?.length ? draftData?.content : "",
      isDraft: false,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      recipients: Yup.array(Yup.object()).required(
        "Email recipient is required*"
      ),
      ccRecipients: Yup.array(Yup.object()).optional().nullable(),
      bccRecipients: Yup.array(Yup.object()).optional().nullable(),
      attachments: Yup.array().optional().nullable(),
      subject: Yup.string(),
      message: Yup.string().when("templateId", (templateId: any, schema) => {
        return templateId?.templateId !== "normal"
          ? schema
          : schema.required("Message is required*");
      }),
      isDraft: Yup.boolean(),
    }),
    onSubmit: async (value) => {
      let attachmentUrl: string[] = [];
      let validAttachments: any[] = [];
      setIsLoading(true);
      try {
        if (value?.attachments?.length) {
          await Promise.all(
            value?.attachments?.map((item: any) => {
              return new Promise(async (resolve, reject) => {
                try {
                  if (typeof item === "string") {
                    attachmentUrl.push(item);
                    validAttachments.push(item);
                  } else if (item instanceof File || item instanceof Blob) {
                    const file = new File([item], item.name, {
                      type: item.type,
                      lastModified: Date.now(),
                    });
                    let url = await uploadFile(
                      file,
                      `${Date.now()}.${file.name.split(".").at(-1)}`
                    );
                    if (url) {
                      attachmentUrl.push(url);
                      validAttachments.push(file);
                    }
                  }

                  resolve(true);
                } catch (error) {
                  reject(error);
                  setIsLoading(false);
                }
              });
            })
          );
        }

        const editorData: { content?: string; json?: any } | undefined =
          ((templateId?.templateId !== "normal" ||
            draftData?.isUsingTemplate) &&
            (await new Promise((re, rej) => {
              try {
                emailEditorRef?.current?.exportHtml((data) => {
                  return re({
                    content: data?.html,
                    json: data?.design,
                  });
                });
              } catch (error) {
                re({});
                setIsLoading(false);
              }
            }))) ||
          undefined;

        const bodyData = {
          senderId: user?.id,
          cc:
            (Array.isArray(value?.ccRecipients) &&
              value?.ccRecipients?.map((item: EmailUser) => item?.id)) ||
            undefined,
          bcc:
            (Array.isArray(value?.bccRecipients) &&
              value?.bccRecipients?.map((item: EmailUser) => item?.id)) ||
            undefined,
          subject: value?.subject,
          content: draftData?.isUsingTemplate
            ? editorData?.content
            : templateId?.templateId !== "normal"
            ? editorData?.content
            : value?.message,
          attachments: attachmentUrl,
          isSend: !value?.isDraft,
          sentAt: value?.isDraft ? undefined : new Date().toISOString(),
          isUsingTemplate: draftData?.isUsingTemplate
            ? draftData?.isUsingTemplate
            : templateId?.templateId !== "normal",
          templateJson: draftData?.isUsingTemplate
            ? JSON.stringify(editorData?.json)
            : templateId?.templateId !== "normal"
            ? JSON.stringify(editorData?.json)
            : undefined,
          receiverIds:
            Array.isArray(value?.recipients) &&
            value?.recipients?.map((item: EmailUser) => item?.id),
        };

        const response = await change(
          query?.draftId ? `emails/${query?.draftId}` : `emails`,
          {
            method: query?.draftId ? "PATCH" : "POST",
            body: bodyData,
          }
        );

        if (response?.status !== 200) throw new Error(response?.results?.msg);

        Swal.fire({
          title: "Success",
          text: value?.isDraft
            ? "Email saved to draft"
            : "Email sent successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsLoading(false);

        push(value?.isDraft ? `/admin/email/drafts` : `/admin/email/sent`);
      } catch (error) {
        //if images are already uploaded and then error thrown delete uploaded files
        setIsLoading(false);

        if (attachmentUrl?.length) {
          await Promise.all(
            attachmentUrl?.map((item: string) => {
              return new Promise(async (resolve, reject) => {
                try {
                  await deleteFile(item);
                  resolve(true);
                } catch (error) {
                  reject(error);
                  setIsLoading(false);
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
        setIsLoading(false);
        Swal.fire({
          title: "Error",
          text: "Something went wrong!.Try again.",
          icon: "error",
        });
      }
    },
  });
  const handleRemoveFile = async (slNumber: number) => {
    //checkout what is the type of attachment
    if (
      formik?.values?.attachments?.length &&
      typeof formik?.values?.attachments[slNumber] === "string"
    ) {
      //delete the image
      await deleteFile(formik?.values?.attachments[slNumber]);
    }
    //filter out this number of index and set other value
    formik?.setFieldValue(
      "attachments",
      formik?.values?.attachments?.filter((item, index) => index !== slNumber)
    );
  };
  const { data: template, isLoading } = useFetch<MailTemplate>(
    `mail-template/get-by-id?templateId=${templateId?.templateId}`
  );

  useEffect(() => {
    setIsRendered(false);
  }, [templateId?.templateId]);

  const onReady = () => {
    // editor is ready
    !isRendered &&
      template?.json?.length &&
      emailEditorRef?.current?.loadDesign?.(JSON.parse(template?.json));
    // editor is ready
    !isRendered &&
      draftData?.isUsingTemplate &&
      draftData?.templateJson &&
      emailEditorRef?.current?.loadDesign?.(
        JSON.parse(draftData?.templateJson)
      );
    setIsRendered(true);
  };

  return (
    <>
      {draftData?.replyTo?.id && (
        <ReplyToEmail data={draftData?.replyTo as any} />
      )}
      <div className="w-full flex  flex-col my-4 p-4 border rounded-lg bg-white shadow-lg gap-4">
        <div className="flex flex-col gap-4 lg:flex-row items-center ">
          <div className="flex flex-col w-full gap-2">
            <InputLabel className="!font-semibold"> To - </InputLabel>
            <Autocomplete
              loading={userLoading}
              multiple
              fullWidth
              limitTags={2}
              options={
                [
                  ...(users?.filter((item) => item?.id !== user?.id) || []),
                  ...(clients?.filter((item) => item?.id !== user?.id) || []),
                ] || []
              }
              value={
                Array.isArray(formik?.values?.recipients)
                  ? formik?.values?.recipients
                  : []
              }
              isOptionEqualToValue={(option, value) =>
                option?.name === value?.name
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
                          {option?.name}
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
                  onChange={(e) => {
                    setSearchText(e?.target?.value), setSearchText("");
                  }}
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
              error={Boolean(
                formik?.touched?.subject && formik?.errors?.subject
              )}
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
              options={
                [
                  ...(users?.filter(
                    (item) =>
                      ![
                        user?.id,
                        ...(Array.isArray(formik?.values?.recipients)
                          ? formik?.values?.recipients?.map((item) => item?.id)
                          : [formik?.values?.recipients]),
                      ]?.includes(String(item?.id))
                  ) || []),
                  ...(clients?.filter(
                    (item) =>
                      ![
                        user?.id,
                        ...(Array.isArray(formik?.values?.recipients)
                          ? formik?.values?.recipients?.map((item) => item?.id)
                          : [formik?.values?.recipients]),
                      ]?.includes(String(item?.id))
                  ) || []),
                ] || []
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
                  onChange={(e) => {
                    setSearchText(e?.target?.value), setSearchText("");
                  }}
                  {...params}
                  size="small"
                  fullWidth
                  error={Boolean(
                    formik?.touched?.ccRecipients &&
                      formik?.errors?.ccRecipients
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
              options={
                [
                  ...(users?.filter(
                    (item) =>
                      ![
                        user?.id,
                        ...(Array.isArray(formik?.values?.recipients)
                          ? formik?.values?.recipients?.map((item) => item?.id)
                          : [formik?.values?.recipients]),
                        ...(Array.isArray(formik?.values?.ccRecipients)
                          ? formik?.values?.ccRecipients?.map(
                              (item) => item?.id
                            )
                          : [formik?.values?.ccRecipients]),
                      ]?.includes(String(item?.id))
                  ) || []),
                  ...(clients?.filter(
                    (item) =>
                      ![
                        user?.id,
                        ...(Array.isArray(formik?.values?.recipients)
                          ? formik?.values?.recipients?.map((item) => item?.id)
                          : [formik?.values?.recipients]),
                        ...(Array.isArray(formik?.values?.ccRecipients)
                          ? formik?.values?.ccRecipients?.map(
                              (item) => item?.id
                            )
                          : [formik?.values?.ccRecipients]),
                      ]?.includes(String(item?.id))
                  ) || []),
                ] || []
              }
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
                  onChange={(e) => {
                    setSearchText(e?.target?.value), setSearchText("");
                  }}
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
          {query?.draftId && draftData?.isUsingTemplate ? (
            <section className="md:flex justify-center w-full">
              {isLoading ? (
                <p>Loading.....</p>
              ) : (
                <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full overflow-scroll">
                  <EmailEditor
                    ref={emailEditorRef}
                    onReady={onReady}
                    appearance={{
                      theme: "dark",
                      panels: { tools: { dock: "right" } },
                    }}
                  />
                </div>
              )}
            </section>
          ) : templateId?.templateId !== "normal" ? (
            <section className="md:flex justify-center w-full">
              {isLoading ? (
                <p>Loading.....</p>
              ) : (
                <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full overflow-scroll">
                  <EmailEditor
                    ref={emailEditorRef}
                    onReady={onReady}
                    appearance={{
                      theme: "dark",
                      panels: { tools: { dock: "right" } },
                    }}
                  />
                </div>
              )}
            </section>
          ) : (
            <ReactQuill
              placeholder="Message ..."
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
                height: "50vh",
                paddingBottom: "2rem",
              }}
              className=" w-full bg-white rounded-lg"
            />
          )}

          {Boolean(formik?.touched?.message && formik?.errors?.message) && (
            <FormHelperText error={true}>
              {formik?.touched?.message && formik?.errors?.message}
            </FormHelperText>
          )}
        </div>
        {formik?.values?.attachments?.length ? (
          <>
            <h3 className="font-medium tracking-wide md:mt-8 mt-20 px-4">
              Attachments -
            </h3>
            <div className="flex flex-wrap gap-4 px-4 pb-4 ">
              {formik?.values?.attachments
                ?.filter(
                  (item: any) =>
                    typeof item === "string" ||
                    item instanceof Blob ||
                    item instanceof File
                )
                .map((item: any, i) => (
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
                    {typeof item === "string" ||
                    item instanceof Blob ||
                    item instanceof File ? (
                      <a
                        href={
                          typeof item === "string"
                            ? item
                            : URL.createObjectURL(item)
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <InsertDriveFile className="!text-7xl !text-theme" />
                      </a>
                    ) : null}
                    <p className="text-center py-2 text-xs font-medium break-words">
                      {typeof item === "string"
                        ? item.split("/").at(-1) // Extract filename from URL
                        : item instanceof Blob || item instanceof File
                        ? item?.name?.length > 20
                          ? item?.name?.slice(0, 20) + "..."
                          : item?.name
                        : ""}
                    </p>
                  </div>
                ))}
            </div>
          </>
        ) : null}

        <div className="flex items-center gap-4 py-4 w-full justify-between mt-14 flex-wrap">
          <div className="flex gap-4 items-center justify-center md:justify-start w-full flex-wrap">
            <Button
              disabled={isBtnLoading}
              className="flex gap-4 items-center hover:scale-95 transition-all border border-blue-500 ease-in-out duration-300 hover:bg-blue-600 justify-center bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg "
              onClick={() => {
                formik?.setFieldValue("isDraft", false);
                formik?.submitForm();
              }}
            >
              <Send />
              <span className="text-sm hidden md:flex ">Send Email</span>
            </Button>
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
              disabled={isChanging}
            >
              <AttachFile />
              <span className="text-sm hidden md:flex">Attach</span>
            </button>

            <button
              className="flex gap-4 items-center hover:scale-95 transition-all border border-secondary-500 ease-in-out duration-300 hover:bg-secondary-600 justify-center bg-secondary-500 text-white px-4 py-2 rounded-md shadow-lg "
              onClick={async () => {
                formik?.setFieldValue("isDraft", true);
                formik?.submitForm();
              }}
              type="submit"
              disabled={isChanging}
            >
              <Drafts />
              <span className="text-sm hidden md:flex">Save To Draft</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEmail;
