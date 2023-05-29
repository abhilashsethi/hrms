import {
  ArrowBack,
  Block,
  Close,
  Delete,
  KeyboardArrowRight,
  ThumbDown,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Drawer, IconButton, Tab } from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import React, { useState } from "react";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  profileData?: any;
};
const ChatProfileDrawer = ({ open, onClose, profileData }: Props) => {
  const [isMedia, setIsMedia] = useState(false);
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
      <Container
        style={{
          width: "30vw",
        }}
      >
        <section className="relative w-full overflow-hidden">
          <section className="py-4 w-full">
            <div className="flex gap-2 items-center">
              <span className="cursor-pointer" onClick={() => onClose()}>
                <Close fontSize="small" className="!text-red-600" />
              </span>
              <h1>Profile Info</h1>
            </div>
            {/* ------------------Image section----------------- */}
            <div className="flex flex-col items-center gap-3 my-8">
              <div className="h-40 w-40 rounded-full bg-slate-200 overflow-hidden">
                <img
                  className="h-full object-cover w-full"
                  src={profileData?.photo || DEFAULTPROFILE.src}
                  alt="image"
                />
              </div>
              <div className="flex flex-col gap-1 items-center">
                <h1 className="font-semibold">{profileData?.name}</h1>
                <h1 className="">demo@sy.com</h1>
              </div>
            </div>
            {/* ------------------About Section-------------------- */}
            <div>
              <SectionTitle title="Department" />
              <h1 className="px-4 mt-2">Web Development</h1>
            </div>
            <div className="w-full rounded-md bg-slate-100 border-[1px] shadow-md tracking-wide mt-4 flex justify-between items-center px-4 py-2">
              <h1>Media, links and Docs</h1>
              <IconButton
                onClick={() => setIsMedia((prev) => !prev)}
                size="small"
              >
                <KeyboardArrowRight
                  className={`!cursor-pointer !transition-all !ease-in-out !duration-200 }`}
                />
              </IconButton>
            </div>
            <div className="mt-4">
              {configs?.map((item) => (
                <div
                  key={item?.id}
                  className="py-3 px-2 cursor-pointer hover:bg-slate-200"
                >
                  <h1 className="flex gap-4 items-center text-red-600 font-medium">
                    {item?.icon}
                    {item?.title}
                  </h1>
                </div>
              ))}
            </div>
          </section>
          {/* --------------------Media and links section------------------------- */}
          <section
            className={`w-full h-screen absolute bg-white top-0 left-0 transition-all ease-in-out duration-200 ${
              !isMedia ? `translate-x-[100%]` : `translate-x-[0%]`
            }`}
          >
            <div className="flex items-center gap-3 py-3 text-red-600">
              <IconButton
                onClick={() => setIsMedia((prev) => !prev)}
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
                  <TabPanel value="1">No Media Files...</TabPanel>
                  <TabPanel value="2">Docs</TabPanel>
                  <TabPanel value="3">Links</TabPanel>
                </TabContext>
              </Box>
            </div>
          </section>
        </section>
      </Container>
    </Drawer>
  );
};

export default ChatProfileDrawer;

interface TitleProps {
  title?: string;
}

const SectionTitle = ({ title }: TitleProps) => {
  return (
    <h1 className="font-semibold flex items-center gap-2">
      <div className="h-2.5 w-2.5 bg-theme rounded-sm"></div> {title}
    </h1>
  );
};

const aboutDetails = [
  { id: 1, title: "Name", value: "John Doe" },
  { id: 2, title: "Employee Id", value: "SYA0007" },
  { id: 3, title: "Role", value: "Developer" },
  { id: 4, title: "Department", value: "IOT" },
];

const configs = [
  { id: 1, title: "Block John Doe", icon: <Block fontSize="small" /> },
  { id: 2, title: "Report John Doe", icon: <ThumbDown fontSize="small" /> },
  { id: 3, title: "Delete Chat", icon: <Delete fontSize="small" /> },
];
