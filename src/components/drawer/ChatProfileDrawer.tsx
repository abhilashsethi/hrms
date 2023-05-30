import {
  ArrowBack,
  Block,
  Close,
  Delete,
  Edit,
  KeyboardArrowRight,
  ThumbDown,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Container,
  Drawer,
  IconButton,
  Tab,
  Tooltip,
} from "@mui/material";
import { DEFAULTPROFILE, GROUP } from "assets/home";
import { PhotoViewerSmall } from "components/core";
import { ChatDescription } from "components/dialogues";
import React, { useState } from "react";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  profileData?: any;
};
const ChatProfileDrawer = ({ open, onClose, profileData }: Props) => {
  const [isDescription, setIsDescription] = useState(false);
  const [isMedia, setIsMedia] = useState(false);
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <ChatDescription
        open={isDescription}
        handleClose={() => setIsDescription(false)}
      />
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
                  {profileData?.type === "group" ? (
                    <img
                      className="h-full object-cover w-full"
                      src={profileData?.photo || GROUP.src}
                      alt="image"
                    />
                  ) : (
                    <img
                      className="h-full object-cover w-full"
                      src={profileData?.photo || DEFAULTPROFILE.src}
                      alt="image"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <h1 className="font-semibold">{profileData?.name}</h1>
                  {profileData?.type === "group" ? (
                    <h1 className="flex">
                      Group <span className="ml-2">4 Participants</span>
                    </h1>
                  ) : (
                    <h1 className="">demo@sy.com</h1>
                  )}
                </div>
              </div>
              {/* ------------------About Section-------------------- */}
              {profileData?.type === "group" && (
                <div className="my-4">
                  <div className="flex justify-between items-center">
                    <SectionTitle title="Group Description" />
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => setIsDescription(true)}
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <p className="mt-2 pl-4 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nobis, dolorum?
                  </p>
                </div>
              )}
              {profileData?.type === "group" ? (
                <div>
                  <SectionTitle title="Participants" />
                  <div className="px-4 py-3 flex flex-col gap-1">
                    {profiles?.map((item) => (
                      <div
                        key={item?.id}
                        className="py-2 w-full rounded-md flex gap-2 items-center px-2 border-2"
                      >
                        <div className="w-1/5">
                          <PhotoViewerSmall
                            size="2.7rem"
                            name={item?.name}
                            photo={item?.photo}
                          />
                        </div>
                        <div className="w-4/5 flex justify-between">
                          <div className="w-3/5">
                            <h1 className="text-sm font-semibold">
                              {item?.name}
                            </h1>
                            <h1 className="text-sm text-gray-600">demo</h1>
                          </div>
                          <div className="w-2/5">
                            <span className="border-2 text-xs">
                              Group Admin
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <SectionTitle title="Department" />
                  <h1 className="px-4 mt-2">Web Development</h1>
                </div>
              )}
              <div
                onClick={() => setIsMedia((prev) => !prev)}
                className="w-full rounded-md cursor-pointer bg-slate-100 border-[1px] shadow-md tracking-wide mt-4 flex justify-between items-center px-4 py-2"
              >
                <h1>Media, links and Docs</h1>
                <IconButton size="small">
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
    </>
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

const profiles: {
  id?: number;
  name?: string;
  message?: string;
  photo?: string;
  type?: string;
}[] = [
  {
    id: 1,
    photo:
      "https://www.bollywoodhungama.com/wp-content/uploads/2023/01/Hrithik-Roshan-opens-up-about-620.jpg",
    name: "Loushik Giri",
    message: "Talk to you...",
    type: "person",
  },
  {
    id: 2,
    name: "Srinu Reddy",
    message: "Okay",
    type: "person",
  },
  {
    id: 3,
    photo:
      "https://media.npr.org/assets/img/2022/11/08/ap22312071681283-0d9c328f69a7c7f15320e8750d6ea447532dff66-s1100-c50.jpg",
    name: "Abhilash",
    message: "Done 👍",
    type: "person",
  },
];

const configs = [
  { id: 1, title: "Block John Doe", icon: <Block fontSize="small" /> },
  { id: 2, title: "Report John Doe", icon: <ThumbDown fontSize="small" /> },
  { id: 3, title: "Delete Chat", icon: <Delete fontSize="small" /> },
];
