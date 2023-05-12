import { Add, Delete, InsertDriveFileRounded } from "@mui/icons-material";
import { Button, Container, Drawer, Tooltip } from "@mui/material";
import { DOC, IMG, PDF, XLS } from "assets/home";
import { DocPreview } from "components/dialogues";
import { useState } from "react";

type Props = {
  open?: boolean | any;
  onClose: () => void;
};

const ProjectDocuments = ({ open, onClose }: Props) => {
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
            Project Documents
          </p>
          <div></div>
          <div className="flex justify-center w-full">
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
          <div className="mt-8 flex gap-2">
            <Tooltip title="Add Document">
              <div className="h-24 w-24 cursor-pointer shadow-md rounded-md bg-slate-300 hover:bg-blue-500 transition-all ease-in-out duration-200 flex flex-col gap-2 items-center justify-center">
                <Add />
              </div>
            </Tooltip>
            <Tooltip title="Delete All">
              <div className="h-24 w-24 cursor-pointer shadow-md rounded-md bg-red-300 hover:bg-blue-500 transition-all ease-in-out duration-200 flex flex-col gap-2 items-center justify-center">
                <Delete />
              </div>
            </Tooltip>
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default ProjectDocuments;

const docs = [
  { id: 1, title: "Doc 53426", img: PDF.src },
  { id: 2, title: "Document432", img: DOC.src },
  { id: 3, title: "CSV4536", img: XLS.src },
  { id: 4, title: "DCIM356.", img: IMG.src },
  { id: 5, title: "traac12", img: DOC.src },
  { id: 6, title: "JPGJHHJ11", img: PDF.src },
  { id: 7, title: "hghgug", img: PDF.src },
];
