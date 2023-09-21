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
            onClose();
            Swal.fire("Removed!", "Manager removed successfully!", "success");
            return;
          } catch (error) {
            if (error instanceof Error) {
              Swal.fire(`Error`, error?.message, `error`);
            } else {
              Swal.fire(`Error`, "Something Went Wrong", `error`);
            }
          }
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
    }
  };
  const removeMember = (item: any) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to remove manager ${item?.name}!`,
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
              `projects/remove-member/${projectData?.id}`,
              {
                method: "PUT",
                body: {
                  userId: item?.id,
                },
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
            Swal.fire("Removed!", "Member removed successfully!", "success");
            mutate();
            onClose();
            return;
          } catch (error) {
            if (error instanceof Error) {
              Swal.fire(`Error`, error?.message, `error`);
            } else {
              Swal.fire(`Error`, "Something Went Wrong", `error`);
            }
          }
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
    }
  };
  const updateManager = async (values: any) => {
    setLoading(true);
    try {
      const res = await change(`projects/${projectData?.id}`, {
        method: "PATCH",
        body: { managerId: values?.managerId },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Create", "error");
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `Manager Add Successfully`, `success`);
      mutate();
      onClose();
      setIsManager(false);
      return;
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const updateMembers = async (values: any) => {
    try {
      setLoading(true);
      const res = await change(`projects/add/member/${projectData?.id}`, {
        method: "PUT",
        body: { userId: values?.userId },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Update", "error");
        setLoading(false);
        return;
      }
      mutate();
      onClose();
      Swal.fire(`Success`, `Members add successfully!`, `success`);
      return;
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }

    return;
  };
  const addMembers = async (values: any) => {
    try {
      setLoading(true);
      const res = await change(`projects/update-members/${projectData?.id}`, {
        method: "PATCH",
        body: values,
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Update", "error");
        setLoading(false);
        return;
      }
      mutate();
      onClose();
      Swal.fire(`Success`, `Members add successfully!`, `success`);
      return;
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }

    return;
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

          <div className="pb-4">
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
                          setFieldValue("managerId", r?.id);
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
                          disabled={loading || !values?.managerId}
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
                {user?.role?.name === "CEO" ||
                user?.role?.name === "HR" ||
                user?.role?.name === "COO" ||
                user?.role?.name === "DIRECTOR" ? (
                  <div
                    onClick={() => removeManager()}
                    className="absolute right-[5px] top-[4px] cursor-pointer bg-red-500 h-6 w-6 rounded-full flex justify-center items-center"
                  >
                    <Tooltip title="Remove Manager">
                      <Close className="!text-[1rem] !text-white" />
                    </Tooltip>
                  </div>
                ) : null}
                <div className="grid px-1 pt-2 gap-2 justify-items-center">
                  <PhotoViewer
                    name={projectData?.manager?.name}
                    photo={projectData?.manager?.photo}
                  />
                  <h3 className="text-sm font-semibold break-all text-center">
                    {projectData?.manager?.name}
                  </h3>
                </div>
              </div>
            ) : (
              <div className="flex gap-4 flex-col px-12 lg:py-4 py-6">
                <h1 className="text-center ">
                  Team manager not mentioned,{" "}
                  {user?.role?.name === "CEO" ||
                  user?.role?.name === "HR" ||
                  user?.role?.name === "COO" ||
                  user?.role?.name === "DIRECTOR" ? (
                    <span>click to add</span>
                  ) : null}
                </h1>
                {user?.role?.name === "CEO" ||
                user?.role?.name === "HR" ||
                user?.role?.name === "COO" ||
                user?.role?.name === "DIRECTOR" ? (
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
              user?.role?.name === "COO" ||
              user?.role?.name === "DIRECTOR" ||
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
                        options={employeesData ? (employeesData as any) : []}
                        getOptionLabel={(option) =>
                          option.name ? option?.name : ""
                        }
                        onChange={(e: any, r: any) => {
                          setFieldValue("userId", r?.id);
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
                          disabled={loading || !values?.userId}
                          startIcon={
                            loading ? (
                              <CircularProgress size={20} color="secondary" />
                            ) : (
                              <Check />
                            )
                          }
                        >
                          ADD
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
                    {user?.role?.name === "CEO" ||
                    user?.role?.name === "HR" ||
                    user?.role?.name === "COO" ||
                    user?.role?.name === "DIRECTOR" ||
                    user?.role?.name === "PROJECT MANAGER" ? (
                      <>
                        <div
                          onClick={() => removeMember(item)}
                          className="absolute right-[5px] top-[4px] cursor-pointer bg-red-500 h-6 w-6 rounded-full flex justify-center items-center"
                        >
                          <Close className="!text-[1rem] !text-white" />
                        </div>
                      </>
                    ) : null}

                    <PhotoViewer
                      name={item?.name}
                      photo={item?.photo ? item?.photo : null}
                    />
                    <div>
                      <p className="font-semibold">{item?.name}</p>
                      <p className="text-sm flex items-center gap-2 mt-1 break-all">
                        <EmailRounded fontSize="small" /> {item?.username}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <Formik initialValues={members} onSubmit={addMembers}>
                  {({ values, handleBlur, setFieldValue }) => (
                    <Form>
                      <Autocomplete
                        multiple
                        fullWidth
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
                          ADD MEMBER
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
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

export default ProjectMembers;
