import {
  Block,
  Close,
  Delete,
  KeyboardArrowRight,
  ThumbDown,
} from "@mui/icons-material";
import { Container, Drawer, IconButton } from "@mui/material";
import { useState } from "react";

type Props = {
  open?: boolean | any;
  onClose: () => void;
};
const ChatProfileDrawer = ({ open, onClose }: Props) => {
  const [isMedia, setIsMedia] = useState(false);
  return (
    <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
      <Container
        style={{
          width: "30vw",
        }}
      >
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
                src="https://media.npr.org/assets/img/2022/11/08/ap22312071681283-0d9c328f69a7c7f15320e8750d6ea447532dff66-s1100-c50.jpg"
                alt="image"
              />
            </div>
            <h1 className="font-semibold">John Doe</h1>
          </div>
          {/* ------------------About Section-------------------- */}
          <div>
            <SectionTitle title="About" />
            <div className="mt-2 flex flex-col gap-2">
              {aboutDetails?.map((item) => (
                <div key={item?.id} className="flex items-start text-sm">
                  <span className="w-1/2 font-medium">{item?.title} : </span>
                  <span>{item?.value} </span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full bg-white shadow-sleek tracking-wide mt-4 flex justify-between items-center px-4 py-2">
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
          {isMedia && (
            <section className="h-40 w-full border-2 mt-4">
              Media Section
            </section>
          )}
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
        <section></section>
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
