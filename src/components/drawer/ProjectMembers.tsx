import { PeopleRounded } from "@mui/icons-material";
import { Container, Drawer } from "@mui/material";
import { EmployeesListDrawer, PhotoViewer } from "components/core";

type Props = {
  open?: boolean | any;
  onClose: () => void;
};

const ProjectMembers = ({ open, onClose }: Props) => {
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
            <PeopleRounded />
            Project Members
          </p>
          <div>
            <h4 className="font-semibold">Project Name : </h4>
            <h4 className="text-theme font-semibold tracking-wide">
              Trualty Ventures
            </h4>
            <h4 className="font-semibold mt-4">Team Manager : </h4>
            <div className="h-32 w-32 mt-3 rounded-md flex flex-col gap-2 items-center justify-center shadow-jubilation">
              <PhotoViewer />
              <h3 className="text-sm font-semibold">John Doe</h3>
            </div>
            <h4 className="font-semibold mt-4">Team Members : </h4>
            <EmployeesListDrawer data={reqData} />
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default ProjectMembers;

const reqData = [
  { id: 1, name: "John Doe", email: "john@sy.com" },
  { id: 2, name: "Kiara", email: "kiara@sy.com" },
];
