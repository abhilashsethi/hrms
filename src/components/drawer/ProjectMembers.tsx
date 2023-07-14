import {
  Check,
  Close,
  Add,
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
import { useAuth, useChange, useFetch } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Form, Formik } from "formik";
import { Projects, User } from "types";
import { useEffect } from "react";

const initialValues = {
  managerId: "",
};
const members = {
  members: [""],
};
type Props = {
  open?: boolean | any;
  onClose: () => void;
  projectData?: Projects | null;
  mutate?: any;
};

const ProjectMembers = ({ open, onClose, projectData, mutate }: Props) => {
  const { change } = useChange();
  const { user } = useAuth();
  const { data: employeesData } = useFetch<User[]>(`users`);
  const [isManager, setIsManager] = useState(false);
  const [isMembers, setIsMembers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isManagers, setIsManagers] = useState<any>([]);
  console.log(employeesData);

  useEffect(() => {
    const project_manager = employeesData
      ?.filter((item: any) => item?.role?.name === "PROJECT MANAGER")
      ?.map((item: any) => item);
    setIsManagers(project_manager);
  }, [employeesData]);

  const removeManager = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to remove manager!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire(`Info`, "It will take some time", "info");
          try {
            const res = await change(
              `projects/remove-manager/${projectData?.id}`,
              {
                method: "DELETE",
              }
            );
            setLoading(false);
            if (res?.status !== 200) {
              Swal.fire(
                "Error",
                res?.results?.msg || "Unable to Delete",
                "error"
              );
              setLoading(false);
              return;
            }
            mutate();
            Swal.fire("Removed!", "Manager removed successfully!", "success");
            return;
          } catch (error) {
            console.log(error);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateManager = async (values: any) => {
    setLoading(true);
    try {
      const res = await change(`projects/${projectData?.id}`, {
        method: "PATCH",
        body: values,
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Create", "error");
        setLoading(false);
        return;
      }
      mutate();
      Swal.fire(`Success`, `Manager Add Successfully`, `success`);
      setIsManager(false);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const updateMembers = (values: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update members!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const res = await change(
            `projects/update-members/${projectData?.id}`,
            {
              method: "PATCH",
              body: values,
            }
          );
          setLoading(false);
          if (res?.status !== 200) {
            Swal.fire(
              "Error",
              res?.results?.msg || "Unable to Update",
              "error"
            );
            setLoading(false);
            return;
          }
          mutate();
          onClose();
          Swal.fire(`Success`, `Members updated successfully!`, `success`);
          return;
        } catch (error) {
          console.log(error);
          setLoading(false);
        } finally {
          setLoading(false);
        }

        return;
      }
    });
  };
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container className="md:w-[30vw] mt-[3.5vh]">
          <IconButton
            className="flex justify-end w-full"
            onClick={() => onClose()}
          >
            <Close fontSize="small" className="text-red-500 block md:hidden" />
          </IconButton>
          <p className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
            <PeopleRounded />
            Project Members
          </p>

          <div>
            <h4 className="font-semibold">Project Name : </h4>
            <h4 className="text-theme font-semibold tracking-wide">
              {projectData?.name}
            </h4>
            <h4 className="font-semibold mt-4">Team Manager : </h4>
            {isManager && (
              <Formik initialValues={initialValues} onSubmit={updateManager}>
                {({ values, handleBlur, setFieldValue }) => (
                  <Form>
                    <div className="mt-4">
                      <Autocomplete
                        options={isManagers ? (isManagers as any) : []}
                        getOptionLabel={(option: any) => option.name}
                        value={isManagers?.find(
                          (option: any) => option.name === values.managerId
                        )}
                        onChange={(e: any, r: any) => {
                          setFieldValue("managerId", r.id);
                        }}
                        id="managerId"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Select Project Managers"
                            placeholder="Project Managers"
                          />
                        )}
                      />
                      <div className="flex justify-end mt-3">
                        <Button
                          type="submit"
                          size="small"
                          variant="contained"
                          className="!bg-theme"
                          disabled={loading}
                          startIcon={
                            loading ? <CircularProgress size={20} /> : <Check />
                          }
                        >
                          UPDATE
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
            {projectData?.manager ? (
              <div className="h-32 w-32 px-4 relative mt-3 rounded-md flex flex-col gap-2 items-center justify-center shadow-jubilation">
                {user?.role?.name === "CEO" || user?.role?.name === "HR" ? (
                  <div
                    onClick={() => removeManager()}
                    className="absolute right-[5px] top-[4px] cursor-pointer bg-red-500 h-6 w-6 rounded-full flex justify-center items-center"
                  >
                    <Close className="!text-[1rem] !text-white" />
                  </div>
                ) : null}
                <div className="grid px-1 pt-2 gap-2 justify-items-center">
                  <PhotoViewer
                    name={projectData?.manager?.name}
                    photo={projectData?.manager?.photo}
                  />
                  <h3 className="text-sm font-semibold">
                    {projectData?.manager?.name}
                  </h3>
                </div>
              </div>
            ) : (
              <div className="flex gap-4 flex-col px-12 lg:py-4 py-6">
                <h1 className="text-center ">
                  Team manager not mentioned,{" "}
                  {user?.role?.name === "CEO" || user?.role?.name === "HR" ? (
                    <span>click to add</span>
                  ) : null}
                </h1>
                {user?.role?.name === "CEO" || user?.role?.name === "HR" ? (
                  <Button
                    size="small"
                    startIcon={<Add />}
                    onClick={() => setIsManager((prev) => !prev)}
                    variant="contained"
                    className="!bg-theme !hover:bg-theme-600 !text-white !font-semibold tracking-wide px-2"
                  >
                    ADD TEAM MANAGER
                  </Button>
                ) : null}
              </div>
            )}
            <div className="flex justify-between">
              <h4 className="font-semibold mt-4">Team Members : </h4>
              {(projectData?.involvedMembers?.length &&
                user?.role?.name === "CEO") ||
              user?.role?.name === "HR" ||
              user?.role?.name === "PROJECT MANAGER" ? (
                <Tooltip title="Add Members">
                  <IconButton
                    onClick={() => setIsMembers((prev) => !prev)}
                    size="small"
                  >
                    <Add />
                  </IconButton>
                </Tooltip>
              ) : null}
            </div>
            {isMembers && (
              <div className="mt-4">
                <Formik initialValues={members} onSubmit={updateMembers}>
                  {({ values, handleBlur, setFieldValue }) => (
                    <Form>
                      <Autocomplete
                        multiple
                        options={employeesData ? (employeesData as any) : []}
                        getOptionLabel={(option: any) => option.name}
                        value={employeesData?.filter((item: any) =>
                          values?.members?.includes(item?.id)
                        )}
                        onChange={(e: any, r: any) => {
                          setFieldValue(
                            "members",
                            r?.map((data: { id: any }) => data?.id)
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Team Members"
                            placeholder="Select Members"
                          />
                        )}
                      />
                      <div className="flex justify-end mt-3">
                        <Button
                          type="submit"
                          size="small"
                          variant="contained"
                          className="!bg-theme"
                          disabled={loading}
                          startIcon={
                            loading ? <CircularProgress size={20} /> : <Check />
                          }
                        >
                          UPDATE
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
            {projectData?.involvedMembers?.length ? (
              <div className="mt-4 flex flex-col gap-2">
                {projectData?.involvedMembers?.map((item) => (
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
                      <p className="text-sm flex items-center gap-2 mt-1">
                        <EmailRounded fontSize="small" /> {item?.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid justify-items-center lg:py-12 py-6">
                  <Button
                    size="small"
                    startIcon={<Add />}
                    onClick={() => setIsMembers((prev) => !prev)}
                    variant="contained"
                    className="!bg-theme !hover:bg-theme-600 !text-white !font-semibold tracking-wide px-2"
                  >
                    ADD MEMBERS
                  </Button>
                </div>
              </>
            )}
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default ProjectMembers;
