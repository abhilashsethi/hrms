import { Add, Delete, Info, InsertDriveFileRounded } from "@mui/icons-material";
import { Button, Container, Drawer, Tooltip } from "@mui/material";
import { DOC, IMG, PDF, XLS } from "assets/home";
import { PhotoViewer } from "components/core";
import { DocPreview } from "components/dialogues";
import moment from "moment";
import { useState } from "react";

type Props = {
  open?: boolean | any;
  onClose: () => void;
};

const LeaveDocuments = ({ open, onClose }: Props) => {
  const [isPreview, setIsPreview] = useState<{
    dialogue?: boolean;
    title?: string;
  }>({
    dialogue: false,
    title: "Preview",
  });
  return (
    <>
      <DocPreview
        open={isPreview?.dialogue}
        handleClose={() => setIsPreview({ dialogue: false })}
        title={isPreview?.title}
      />
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container
          style={{
            width: "30vw",
            marginTop: "3.5vh",
          }}
        >
          <p className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
            <Info />
            Leave Details
          </p>
          <div>
            <h1 className="font-semibold">Team Manager</h1>
            <div className="h-20 w-full mt-2 flex gap-4 items-center">
              <PhotoViewer name="Srinu Reddy" />
              <div>
                <h2 className="font-semibold tracking-wide">Srinu Reddy</h2>
                <h2 className="text-gray-600">Developer</h2>
              </div>
            </div>
            <h1 className="font-semibold mt-4">Leave Type</h1>
            <h2 className="text-gray-600">Sick Leave</h2>
            <h1 className="font-semibold mt-4">Leave On</h1>
            <h2 className="text-gray-600 tracking-wide">
              Second Half - {moment(new Date().toISOString()).format("ll")}
            </h2>
            <h1 className="font-semibold mt-4">Message </h1>
            <p className="tracking-wide">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
              quidem deleniti necessitatibus quas minus ad, architecto nesciunt
              id exercitationem labore!
            </p>
          </div>
          <h1 className="font-semibold my-4">Documents </h1>
          <div className="flex w-full">
            <div className="flex gap-2 flex-wrap">
              {docs?.map((item) => (
                <Tooltip title="Click to preview">
                  <div
                    onClick={() =>
                      setIsPreview({ dialogue: true, title: item?.title })
                    }
                    key={item?.id}
                    className="h-28 w-28 border-2 rounded-md flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-slate-200 transition-all ease-in-out duration-200"
                  >
                    <img className="w-12" src={item?.img} alt="photo" />
                    <p className="text-xs">
                      {item?.title?.slice(0, 9)}
                      {item?.title?.length > 9 ? "..." : null}
                    </p>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default LeaveDocuments;

const docs = [{ id: 1, title: "Doc 53426", img: PDF.src }];