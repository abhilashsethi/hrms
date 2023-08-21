import {
  ArrowBack,
  Delete,
  FileDownload,
  LinkOutlined,
  Replay,
  Visibility,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Chip, IconButton, Tab, Tooltip } from "@mui/material";
import { CHATDOC } from "assets/home";
import ICONS from "assets/icons";
import { ChatImagePreview } from "components/dialogues";
import { BASE_URL, useChange, useChatData, useFetch } from "hooks";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { deleteFile, downloadFile } from "utils";

const ChatMedia = ({
  isMedia,
  setIsMedia,
  groupId,
  revalidateCurrentChat,
  onClose,
}: {
  isMedia: boolean;
  revalidateCurrentChat: () => void;
  setIsMedia: (arg: any) => void;
  onClose: () => void;
  groupId?: string;
}) => {
  const [fileData, setFileData] = useState<any[]>([]);

  const [value, setValue] = React.useState("image");
  const [pageNo, setPageNo] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setFileData([]);
    setPageNo(1);
  };

  const { selectedChatId } = useChatData();

  const { data, isValidating, mutate } = useFetch<any>(
    `chat/message-group/${selectedChatId}?category=${value}&limit=20&page=${pageNo}`
  );
  useEffect(() => {
    if (!data?.message?.length) return;
    setFileData((prev) => [...prev, ...data?.message]);
  }, [data?.message]);

  const handleNextFetch = () => {
    setPageNo((prev) => prev + 1);
  };

  return (
    <section
      className={`w-full h-full min-h-screen absolute bg-white top-0 left-0 transition-all ease-in-out duration-200 ${
        !isMedia ? `translate-x-[100%]` : `translate-x-[0%]`
      }`}
    >
      <div className="flex items-center gap-3 py-3 text-red-600">
        <IconButton
          onClick={() => setIsMedia((prev: any) => !prev)}
          size="small"
        >
          <ArrowBack className="!text-red-600" />
        </IconButton>
        <h1>Go Back</h1>
      </div>
      <div className="h-full">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Media" value="image" />
                <Tab label="Docs" value="file" />
                <Tab label="Links" value="link" />
              </TabList>
            </Box>
            <TabPanel value="image">
              <MediaFiles
                chatFile={fileData}
                isLoading={isValidating}
                revalidate={mutate}
                handleNextFetch={handleNextFetch}
                revalidateCurrentChat={revalidateCurrentChat}
                onClose={onClose}
              />
            </TabPanel>
            <TabPanel value="file">
              <DocFiles
                chatFile={fileData}
                isLoading={isValidating}
                revalidate={mutate}
                handleNextFetch={handleNextFetch}
                revalidateCurrentChat={revalidateCurrentChat}
                onClose={onClose}
              />
            </TabPanel>
            <TabPanel value="link">
              <ChatLinks
                chatLinks={fileData}
                isLoading={isValidating}
                revalidate={mutate}
                handleNextFetch={handleNextFetch}
                revalidateCurrentChat={revalidateCurrentChat}
                onClose={onClose}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </section>
  );
};

export default ChatMedia;

const MediaFiles = ({
  chatFile,
  isLoading,
  revalidate,
  handleNextFetch,
  onClose,
  revalidateCurrentChat,
}: {
  chatFile: {
    text: string;
    id: string;
    sender: {
      name: string;
      photo: string;
    };
    updatedAt: string;
    link: string;
  }[];
  isLoading?: boolean;
  revalidate?: () => void;
  revalidateCurrentChat?: () => void;
  handleNextFetch: () => void;
  onClose: () => void;
}) => {
  const [isPreview, setIsPreview] = useState(false);
  const [activePreview, setActivePreview] = useState("");

  const { selectedChatId } = useChatData();
  const { change } = useChange();
  const handleDeleteFile = async (id: string, file: string) => {
    Swal.fire("Info", "Please wait....", "info");
    await deleteFile(file);
    const clearChat = await change(`chat/message-clear/${selectedChatId}`, {
      method: "POST",
      BASE_URL,
      body: {
        messageId: id,
      },
    });

    if (clearChat?.status !== 200) {
      Swal.fire(
        "Error",
        clearChat?.results?.msg || "Something went wrong!",
        "error"
      );
    }
    onClose();
    revalidateCurrentChat;
    revalidate?.();
    Swal.fire("Success", "File deleted successfully", "success");
  };

  return (
    <>
      <ChatImagePreview
        open={isPreview}
        handleClose={() => setIsPreview(false)}
        activePreview={activePreview}
      />
      {data?.length <= 0 ? (
        <h1>No Media files.</h1>
      ) : (
        <section className="flex gap-2 flex-wrap">
          {chatFile?.map((item) => (
            <div
              key={item?.id}
              className="w-full relative bg-white border-[1px] rounded-md shadow-md p-4"
            >
              <div className="flex justify-between items-center">
                <h1 className="tracking-wide text-sm font-semibold">
                  {item?.sender?.name}
                </h1>
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteFile(item?.id, item?.link)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="rounded-md w-full mt-2 flex gap-3 items-center">
                <div className="h-16 w-16 relative group border-2 rounded-md flex justify-center items-center cursor-pointer">
                  <img
                    className="h-12 w-12 object-cover rounded-md"
                    src={item?.link}
                    alt="image"
                  />
                  <div
                    onClick={() => {
                      setIsPreview(true);
                      setActivePreview(item?.link);
                    }}
                    className="h-16 w-16 bg-[#000000a1] rounded-md hidden transition-all ease-in-out duration-300 absolute cursor-pointer group-hover:flex justify-center items-center"
                  >
                    <Visibility className="!text-white" />
                  </div>
                </div>

                <div className="flex justify-between w-3/4 items-center">
                  <h1 className="text-sm">{item?.link?.split("/")?.at(-1)}</h1>
                  <Tooltip title="Download">
                    <IconButton
                      size="small"
                      onClick={() =>
                        downloadFile(
                          item?.link,
                          item?.link?.split("/")?.at(-1) as any
                        )
                      }
                    >
                      <FileDownload />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div>
                <h1 className="text-xs text-end">
                  {moment(item?.updatedAt).format("lll")}
                </h1>
              </div>
            </div>
          ))}
          <div className="w-full flex items-centre pt-2 justify-center">
            <Chip
              avatar={
                isLoading ? (
                  <ICONS.Reload className="animate-spin  " />
                ) : (
                  <Replay />
                )
              }
              label="Load more.."
              variant="outlined"
              className="hover:!cursor-pointer"
              onClick={handleNextFetch}
            />
          </div>
        </section>
      )}
    </>
  );
};

const DocFiles = ({
  chatFile,
  isLoading,
  revalidate,
  handleNextFetch,
  onClose,
  revalidateCurrentChat,
}: {
  chatFile: {
    text: string;
    id: string;
    sender: {
      name: string;
      photo: string;
    };
    updatedAt: string;
    link: string;
  }[];
  isLoading?: boolean;
  revalidate?: () => void;
  revalidateCurrentChat?: () => void;
  handleNextFetch?: () => void;
  onClose: () => void;
}) => {
  const { selectedChatId } = useChatData();
  const { change } = useChange();
  const handleDeleteFile = async (id: string, file: string) => {
    Swal.fire("Info", "Please wait....", "info");
    await deleteFile(file);
    const clearChat = await change(`chat/message-clear/${selectedChatId}`, {
      method: "POST",
      BASE_URL,
      body: {
        messageId: id,
      },
    });

    if (clearChat?.status !== 200) {
      Swal.fire(
        "Error",
        clearChat?.results?.msg || "Something went wrong!",
        "error"
      );
    }
    revalidate?.();
    onClose();
    revalidateCurrentChat;
    Swal.fire("Success", "File deleted successfully", "success");
  };

  return (
    <>
      {data?.length <= 0 ? (
        <h1>No files.</h1>
      ) : (
        <section className="flex flex-col gap-2 pb-12">
          {chatFile?.map((item) => (
            <div
              key={item?.id}
              className="w-full relative bg-white border-[1px] rounded-md shadow-md p-4"
            >
              <div className="flex justify-between items-center">
                <h1 className="tracking-wide text-sm font-semibold">
                  {item?.sender?.name}
                </h1>
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteFile(item?.id, item?.link)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="h-16 rounded-md w-full mt-2 flex gap-3 items-center">
                <img className="h-12 object-contain" src={CHATDOC.src} alt="" />
                <div className="flex justify-between w-3/4 items-center">
                  <h1 className="text-sm">{item?.link?.split("/")?.at(-1)}</h1>
                  <Tooltip title="Download">
                    <IconButton
                      size="small"
                      onClick={() =>
                        downloadFile(
                          item?.link,
                          item?.link?.split("/")?.at(-1) as any
                        )
                      }
                    >
                      <FileDownload />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div>
                <h1 className="text-xs text-end">
                  {moment(item?.updatedAt).format("lll")}
                </h1>
              </div>
            </div>
          ))}
          <div className="w-full flex items-centre pt-2 justify-center">
            <Chip
              avatar={
                isLoading ? (
                  <ICONS.Reload className="animate-spin  " />
                ) : (
                  <Replay />
                )
              }
              label="Load more.."
              variant="outlined"
              className="hover:!cursor-pointer"
              onClick={handleNextFetch}
            />
          </div>
        </section>
      )}
    </>
  );
};

const ChatLinks = ({
  chatLinks,
  isLoading,
  revalidate,
  handleNextFetch,
  onClose,
  revalidateCurrentChat,
}: {
  chatLinks: {
    text: string;
    id: string;
    sender: {
      name: string;
      photo: string;
    };
    updatedAt: string;
  }[];
  isLoading?: boolean;
  revalidate?: () => void;
  revalidateCurrentChat?: () => void;
  handleNextFetch: () => void;
  onClose: () => void;
}) => {
  const { selectedChatId } = useChatData();

  const { change } = useChange();

  const handleLinkDelete = async (id: string) => {
    try {
      Swal.fire("Info", "Please wait....", "info");
      const clearChat = await change(`chat/message-clear/${selectedChatId}`, {
        method: "POST",
        BASE_URL,
        body: {
          messageId: id,
        },
      });

      if (clearChat?.status !== 200) {
        Swal.fire(
          "Error",
          clearChat?.results?.msg || "Something went wrong!",
          "error"
        );
      }
    } catch (error) {
    } finally {
      revalidate?.();
      onClose();
      revalidateCurrentChat;
      Swal.fire("Success", "Link deleted", "success");
    }
  };

  return (
    <>
      {chatLinks?.length <= 0 ? (
        <h1>No Links.</h1>
      ) : (
        <section className="flex flex-col h-full gap-2 pb-12">
          {chatLinks?.map((item) => (
            <div
              key={item?.id}
              className="w-full relative bg-white border-[1px] rounded-md shadow-md p-4"
            >
              <div className="flex justify-between items-center">
                <h1 className="tracking-wide text-sm font-semibold">
                  {item?.sender?.name}
                </h1>
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    onClick={() => handleLinkDelete(item?.id)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="h-16 rounded-md w-full mt-2 flex gap-3 items-center hover:bg-slate-300 transition-all ease-in-out duration-300 cursor-pointer">
                <div className="h-16 w-16 border-2 rounded-md bg-slate-200 flex justify-center items-center">
                  <LinkOutlined />
                </div>
                <div className="flex justify-between w-3/4 items-center overflow-hidden ">
                  <h1 className="text-xs">{item?.text}</h1>
                </div>
              </div>
              <div>
                <h1 className="text-xs text-end">
                  {moment(item?.updatedAt).format("lll")}
                </h1>
              </div>
            </div>
          ))}
          <div className="w-full flex items-centre pt-2 justify-center">
            <Chip
              avatar={
                isLoading ? (
                  <ICONS.Reload className="animate-spin  " />
                ) : (
                  <Replay />
                )
              }
              label="Load more.."
              variant="outlined"
              className="hover:!cursor-pointer"
              onClick={handleNextFetch}
            />
          </div>
        </section>
      )}
    </>
  );
};

const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
