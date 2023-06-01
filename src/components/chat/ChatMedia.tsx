import {
  ArrowBack,
  Delete,
  FileDownload,
  Visibility,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, IconButton, Tab, Tooltip } from "@mui/material";
import { CHATDOC, DOC } from "assets/home";
import { ChatImagePreview } from "components/dialogues";
import moment from "moment";
import React, { useState } from "react";

const ChatMedia = ({
  isMedia,
  setIsMedia,
  groupId,
}: {
  isMedia: boolean;
  setIsMedia: (arg: any) => void;
  groupId?: string;
}) => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
      <div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Media" value="1" />
                <Tab label="Docs" value="2" />
                <Tab label="Links" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <MediaFiles />
            </TabPanel>
            <TabPanel value="2">
              <DocFiles />
            </TabPanel>
            <TabPanel value="3">Links</TabPanel>
          </TabContext>
        </Box>
      </div>
    </section>
  );
};

export default ChatMedia;

const MediaFiles = () => {
  const [isPreview, setIsPreview] = useState(false);
  return (
    <>
      <ChatImagePreview
        open={isPreview}
        handleClose={() => setIsPreview(false)}
      />
      {data?.length <= 0 ? (
        <h1>No Media files.</h1>
      ) : (
        <section className="flex gap-2 flex-wrap">
          {data?.map((item) => (
            <div
              key={item?.id}
              className="w-full relative bg-white border-[1px] rounded-md shadow-md p-4"
            >
              <div className="flex justify-between items-center">
                <h1 className="tracking-wide text-sm font-semibold">
                  Srinu Reddy
                </h1>
                <Tooltip title="Delete">
                  <IconButton size="small">
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="rounded-md w-full mt-2 flex gap-3 items-center">
                <div className="h-16 w-16 relative group border-2 rounded-md flex justify-center items-center cursor-pointer">
                  <img
                    className="h-12 w-12 object-cover rounded-md"
                    src="https://w0.peakpx.com/wallpaper/1008/1001/HD-wallpaper-tiger-black-look-thumbnail.jpg"
                    alt="image"
                  />
                  <div
                    onClick={() => setIsPreview(true)}
                    className="h-16 w-16 bg-[#000000a1] rounded-md hidden transition-all ease-in-out duration-300 absolute cursor-pointer group-hover:flex justify-center items-center"
                  >
                    <Visibility className="!text-white" />
                  </div>
                </div>

                <div className="flex justify-between w-3/4 items-center">
                  <h1 className="text-sm">openfiles3422.pdf</h1>
                  <Tooltip title="Download">
                    <IconButton size="small">
                      <FileDownload />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div>
                <h1 className="text-xs text-end">
                  {moment(new Date()).format("lll")}
                </h1>
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

const DocFiles = () => {
  return (
    <>
      {data?.length <= 0 ? (
        <h1>No Media files.</h1>
      ) : (
        <section className="flex flex-col gap-2 pb-12">
          {data?.map((item) => (
            <div
              key={item?.id}
              className="w-full relative bg-white border-[1px] rounded-md shadow-md p-4"
            >
              <div className="flex justify-between items-center">
                <h1 className="tracking-wide text-sm font-semibold">
                  Srinu Reddy
                </h1>
                <Tooltip title="Delete">
                  <IconButton size="small">
                    <Delete />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="h-16 rounded-md w-full mt-2 flex gap-3 items-center">
                <img className="h-12 object-contain" src={CHATDOC.src} alt="" />
                <div className="flex justify-between w-3/4 items-center">
                  <h1 className="text-sm">openfiles3422.pdf</h1>
                  <Tooltip title="Download">
                    <IconButton size="small">
                      <FileDownload />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div>
                <h1 className="text-xs text-end">
                  {moment(new Date()).format("lll")}
                </h1>
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
