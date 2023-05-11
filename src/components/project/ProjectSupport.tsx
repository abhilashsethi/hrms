import { Avatar, AvatarGroup } from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import moment from "moment";
import React from "react";

const ProjectSupport = () => {
  return (
    <section className="">
      <div className="w-full rounded-md p-6 shadow-jubilation">
        <div className="flex justify-end">
          <span className="text-xs mb-1">
            {moment(new Date().toISOString()).format("ll")}
          </span>
        </div>
        <h1 className="font-semibold text-slate-700 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </h1>
        <p className="mt-2 text-sm tracking-wide text-slate-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
          maiores fuga quidem saepe iste doloremque at cum fugit debitis,
          nesciunt recusandae. Cumque doloremque officia nobis!
        </p>
        <h1 className="text-sm font-semibold text-theme mt-2">Assigned to :</h1>
        <div className="flex justify-start mt-2">
          <AvatarGroup className="!cursor-pointer" max={3}>
            <Avatar alt="Srinu" src={" "} />
            <Avatar alt="David" src={" "} />
            <Avatar alt="Micky" src={DEFAULTPROFILE.src || " "} />
          </AvatarGroup>
        </div>
      </div>
    </section>
  );
};

export default ProjectSupport;
