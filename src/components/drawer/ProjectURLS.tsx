import { AccountTree, ContentCopy, Visibility } from "@mui/icons-material";
import { Container, Drawer } from "@mui/material";

type Props = {
  open?: boolean | any;
  onClose: () => void;
};

const ProjectURLS = ({ open, onClose }: Props) => {
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container
          style={{
            width: "30vw",
            marginTop: "3.5vh",
          }}
        >
          <p className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
            <AccountTree />
            Project URLs
          </p>
          <div>
            <h4 className="font-semibold">Project Name : </h4>
            <h4 className="text-theme font-semibold tracking-wide">
              HRMS - Searchingyard
            </h4>
            <h4 className="font-semibold mt-4 underline">Project URLs : </h4>
            <div className="mt-4 flex flex-col gap-4">
              {urls?.map((item, i) => (
                <div
                  key={item?.id}
                  className="p-2 rounded-md shadow-jubilation border-b-2 border-theme"
                >
                  <div className="flex items-center gap-2">
                    <span>{Number(i) + 1}.</span>
                    <span className="font-semibold">{item?.title}</span>
                  </div>
                  <div className="flex gap-2 items-center mt-3">
                    <span className="custom-button bg-green-500">
                      <Visibility fontSize="small" /> CLICK TO VIEW
                    </span>
                    <span className="custom-button bg-slate-800">
                      <ContentCopy fontSize="small" /> COPY LINK
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default ProjectURLS;

const urls = [
  { id: 1, title: "Dev Url" },
  { id: 2, title: "Github" },
  { id: 3, title: "API" },
  { id: 4, title: "Github" },
];
