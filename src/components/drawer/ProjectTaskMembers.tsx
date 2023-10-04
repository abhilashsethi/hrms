import {
  Add,
  Check,
  Close,
  EmailRounded,
  PeopleRounded,
} from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Container,
  Drawer,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { PhotoViewer } from "components/core";
import { Form, Formik } from "formik";
import { useAuth, useChange, useFetch } from "hooks";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Projects, User } from "types";

const initialValues = {
  managerId: "",
  userId: "",
};
const members = {
  members: [""],
  userId: "",
};
type Props = {
  open?: boolean | any;
  onClose: () => void;
  projectData?: any | null;
  mutate?: any;
};

const ProjectTaskMembers = ({ open, onClose, projectData, mutate }: Props) => {
  const { change } = useChange();
  const { user } = useAuth();
  const { data: employeesData } = useFetch<User[]>(`users`);
  const [isManager, setIsManager] = useState(false);
  const [isMembers, setIsMembers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isManagers, setIsManagers] = useState<any>([]);

  useEffect(() => {
    const project_manager = employeesData
      ?.filter((item: any) => item?.role?.name === "PROJECT MANAGER")
      ?.map((item: any) => item);
    setIsManagers(project_manager);
  }, [employeesData]);
  console.log(projectData);
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container className="md:w-[30vw] mt-[3.5vh]">
          <IconButton
            className="flex justify-end w-full md:hidden"
            onClick={() => onClose()}
          >
            <Close fontSize="small" className="text-red-500 block md:hidden" />
          </IconButton>
          <p className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
            <PeopleRounded />
            Task Members
          </p>

          <div className="pb-4">
            <h4 className="font-semibold">Task Name : </h4>
            <h4 className="text-theme font-semibold tracking-wide">
              {projectData?.title}
            </h4>

            {projectData?.assignedUsers?.length ? (
              <div className="mt-4 flex flex-col gap-2">
                {projectData?.assignedUsers?.map((item: any) => (
                  <div
                    key={item?.id}
                    className="h-24 w-full border-[1px] relative rounded-lg flex gap-3 items-center px-4"
                  >
                    <PhotoViewer
                      name={item?.name}
                      photo={item?.photo ? item?.photo : null}
                    />
                    <div>
                      <p className="font-semibold">{item?.name}</p>
                      <p className="text-sm flex items-center gap-2 mt-1 break-all">
                        <EmailRounded fontSize="small" /> {item?.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid justify-items-center w-full lg:py-12 py-6">
                  <p>No Member Available</p>
                </div>
              </>
            )}
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default ProjectTaskMembers;
