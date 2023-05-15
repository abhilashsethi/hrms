import { Add, Delete, InsertDriveFileRounded } from "@mui/icons-material";
import { Button, Container, Drawer, Tooltip } from "@mui/material";
import { DOC, IMG, PDF, XLS } from "assets/home";
import { DocPreview } from "components/dialogues";
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
            <InsertDriveFileRounded />
            Documents Added
          </p>
          <div></div>
          <div className="flex w-full">
            <div className="flex gap-2 flex-wrap">
              {docs?.map((item) => (
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
