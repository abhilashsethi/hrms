import {
  Chat,
  Group,
  KeyboardArrowDown,
  Notifications,
  Search,
  Videocam,
} from "@mui/icons-material";
import { DEFAULTPROFILE } from "assets/home";
import { AdminBreadcrumbs, PhotoViewerSmall } from "components/core";
import PanelLayout from "layouts/panel";
import moment from "moment";
import React from "react";

const ProjectChats = () => {
  return (
    <PanelLayout title="Project Chats - HRMS SY">
      <section className="px-6 py-4">
        <AdminBreadcrumbs links={links} />
        <div className="h-[35rem] w-full rounded-md bg-white mt-4 shadow-md flex">
          <div className="w-[30%] h-full border-r-2 px-4 rounded-md">
            <div className={`h-20 w-full flex justify-between items-center `}>
              {quickLinks?.map((item) => (
                <div
                  key={item?.id}
                  className={`flex flex-col items-center gap-2`}
                >
                  {item?.icon}
                  <span
                    className={`text-xs ${
                      item?.title === "Chats" ? `text-theme font-semibold` : ``
                    }`}
                  >
                    {item?.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-2 flex gap-1 items-center px-2 rounded-md py-1">
              <Search fontSize="small" />
              <input
                className="w-[85%] bg-white px-2 py-1 rounded-md text-sm"
                type="text"
                placeholder="Search chats"
              />
            </div>
            <div className="mt-2">
              <span className="text-sm">
                Recent Chats <KeyboardArrowDown fontSize="small" />
              </span>
            </div>
            <div className="mt-2 flex flex-col gap-1">
              {chats?.map((item) => (
                <div
                  className={`h-16 w-full px-2 flex gap-2 items-center rounded-md ${
                    item?.name === "Srinu Reddy" ? `bg-blue-100` : ``
                  }`}
                >
                  <PhotoViewerSmall
                    name={item?.name}
                    photo={item?.photo}
                    size="3rem"
                  />
                  <div className="w-[80%] flex justify-between ">
                    <div>
                      <h1 className="text-sm font-semibold">{item?.name}</h1>
                      <span className="text-sm font-light">
                        {item?.message}
                      </span>
                    </div>
                    <span className="text-xs">
                      {moment(new Date().toISOString()).format("ll")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[70%] h-full">
            <div className="py-2 px-4 w-full border-b-2">
              <div className="flex gap-3 items-center">
                <PhotoViewerSmall name="Srinu Reddy" size="3.5rem" />
                <div>
                  <h1 className="font-semibold">Srinu Reddy</h1>
                  <h1 className="text-sm font-light">Active Now</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PanelLayout>
  );
};

export default ProjectChats;

const links = [
  { id: 1, page: "All projects", link: "/admin/projects/all-projects" },
  { id: 1, page: "Project Chats", link: "/admin/projects/project-chats" },
];

const quickLinks = [
  {
    id: 1,
    icon: <Chat fontSize="small" className="!text-theme" />,
    title: "Chats",
  },
  { id: 2, icon: <Videocam fontSize="small" className="" />, title: "Video" },
  {
    id: 3,
    icon: <Notifications fontSize="small" className="" />,
    title: "Notifications",
  },
  { id: 4, icon: <Group fontSize="small" className="" />, title: "Groups" },
];

const chats = [
  {
    id: 1,
    photo:
      "https://www.bollywoodhungama.com/wp-content/uploads/2023/01/Hrithik-Roshan-opens-up-about-620.jpg",
    name: "Hirthik Roshan",
    message: "Talk to you...",
  },
  {
    id: 2,
    name: "Srinu Reddy",
    message: "Okay",
  },
  {
    id: 3,
    photo:
      "https://media.npr.org/assets/img/2022/11/08/ap22312071681283-0d9c328f69a7c7f15320e8750d6ea447532dff66-s1100-c50.jpg",
    name: "Abhilash",
    message: "Done 👍",
  },
];
