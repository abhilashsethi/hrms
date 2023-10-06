import { Add, Check, Delete, Person } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { PhotoViewer } from "components/core";
import { Form, Formik } from "formik";
import { useAuth, useChange, useFetch } from "hooks";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
interface Props {
  projectData?: any;
  mutate?: any;
}
const initialValues = {
  clientId: "",
};
const validationSchema = Yup.object().shape({
  clientId: Yup.string().required("Client is required!"),
});
const ClientDetails = ({ projectData, mutate }: Props) => {
  const { user } = useAuth();
  const [clientId, setClientId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const { data: clientData } = useFetch<any>(`clients`);
  const removeClient = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to remove client!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          try {
            if (result.isConfirmed) {
              const response = await change(
                `projects/remove-client/${projectData.id}`,
                {
                  method: "PATCH",
                }
              );
              setLoading(false);

              if (response?.status !== 200) {
                Swal.fire("Error", "Something went wrong!", "error");
                setLoading(false);
              }
              mutate();
              Swal.fire("Removed!", "Client removed successfully!", "success");
              setLoading(false);
            }
          } catch (error) {
            if (error instanceof Error) {
              Swal.fire(`Error`, error?.message, `error`);
            } else {
              Swal.fire(`Error`, "Something Went Wrong", `error`);
            }
            setLoading(false);
          }
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
      setLoading(false);
    }
  };
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const res = await change(`projects/${projectData.id}`, {
        method: "PATCH",
        body: {
          clientId: clientId,
        },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Create", "error");
        setLoading(false);
        return;
      }
      setClientId("");
      mutate();
      Swal.fire(`Success`, `Created Successfully`, `success`);
      setIsUpdate(false);
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
  return (
    <section className="w-full bg-white shadow-jubilation mt-4 rounded-md p-6">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-gray-600 underline">
          Client Details
        </h1>
      </div>
      {isUpdate && (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleBlur, errors, touched, setFieldValue }) => (
              <Form>
                <div className="pt-4">
                  <Autocomplete
                    options={clientData}
                    getOptionLabel={(option: any) => option.name}
                    isOptionEqualToValue={(option, value) =>
                      option.name === value.clientId
                    }
                    value={clientData?.find(
                      (option: any) => option.name === values.clientId
                    )}
                    onChange={(e: any, r: any) => {
                      setFieldValue("clientId", r.id);
                      setClientId(r.id);
                    }}
                    id="clientId"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Select Client"
                        placeholder="Clients"
                        onBlur={handleBlur}
                        error={touched?.clientId && !!errors?.clientId}
                        helperText={
                          Boolean(touched?.clientId) &&
                          (errors?.clientId as string)
                        }
                      />
                    )}
                  />
                </div>
                <div className="flex justify-end mt-3">
                  <Button
                    type="submit"
                    size="small"
                    variant="contained"
                    className={`${loading ? "!bg-gray-300" : "bg-theme"}`}
                    disabled={loading}
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} color="secondary" />
                      ) : (
                        <Check />
                      )
                    }
                  >
                    SUBMIT
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
      {projectData?.clientId ? (
        <>
          <div className="w-full rounded-md border-2 mt-3 p-4">
            <div className="justify-center items-center justify-items-center grid gap-4">
              <div className=" text-center">
                <PhotoViewer
                  name={projectData?.client?.name}
                  photo={projectData?.client?.photo}
                />
              </div>
              <div className="text-sm px-2 text-center tracking-wide w-full ">
                <p>{projectData?.client?.name}</p>
              </div>
            </div>

            {user?.role?.name === "CEO" ||
            user?.role?.name === "COO" ||
            user?.role?.name === "DIRECTOR" ? (
              <div className="mt-2 md:flex grid justify-center gap-2">
                <Link
                  href={`/admin/clients/client-profile?id=${projectData?.clientId}`}
                >
                  <Button
                    variant="contained"
                    className="!bg-theme"
                    size="small"
                    startIcon={<Person />}
                  >
                    View Details
                  </Button>
                </Link>
                <Button
                  onClick={() => removeClient()}
                  variant="contained"
                  className="!bg-youtube"
                  size="small"
                  startIcon={<Delete />}
                >
                  Remove
                </Button>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2 lg:py-12 py-6">
            <h1 className="text-center">
              Client details not specified.{" "}
              {user?.role?.name === "CEO" ||
              user?.role?.name === "HR" ||
              user?.role?.name === "DIRECTOR" ||
              user?.role?.name === "COO" ||
              user?.role?.name === "PROJECT MANAGER" ? (
                <span> Click here to add clients</span>
              ) : null}
            </h1>
            {user?.role?.name === "CEO" ||
            user?.role?.name === "HR" ||
            user?.role?.name === "COO" ||
            user?.role?.name === "DIRECTOR" ||
            user?.role?.name === "PROJECT MANAGER" ? (
              <Button
                size="small"
                startIcon={<Add />}
                onClick={() => setIsUpdate((prev) => !prev)}
                variant="contained"
                className="!bg-theme !hover:bg-theme-600 !text-white !font-semibold tracking-wide px-2"
              >
                ADD CLIENT
              </Button>
            ) : null}
          </div>
        </>
      )}
    </section>
  );
};

export default ClientDetails;
