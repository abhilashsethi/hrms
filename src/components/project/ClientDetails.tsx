import { Check, Delete, Person } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import ICONS from "assets/icons";
import { PhotoViewer } from "components/core";
import { useChange, useFetch } from "hooks";
import { useState } from "react";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import Link from "next/link";
interface Props {
  projectData?: any;
  mutate?: any;
}
const initialValues = {
  clientId: "",
};
const ClientDetails = ({ projectData, mutate }: Props) => {
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
        try {
          if (result.isConfirmed) {
            const response = await change(`projects/${projectData.id}`, {
              method: "DELETE",
            });
            if (response?.status !== 200) {
              Swal.fire("Error", "Something went wrong!", "error");
            }
            Swal.fire("Removed!", "Client removed successfully!", "success");
            mutate();
          }
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
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
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="w-full bg-white shadow-jubilation mt-4 rounded-md p-6">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-gray-600">Client Details</h1>
      </div>
      {isUpdate && (
        <>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleBlur, setFieldValue }) => (
              <Form>
                <div>
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
                      />
                    )}
                  />
                </div>
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
            <div className=" flex gap-4">
              <div className="w-1/4">
                <PhotoViewer
                  name={projectData?.client?.name}
                  photo={projectData?.client?.photo}
                />
              </div>
              <div className="text-sm tracking-wide w-3/4">
                <p className="font-semibold">Name : </p>
                <p>{projectData?.client?.name}</p>
                <p className="font-semibold">Email : </p>
                <p>{projectData?.client?.email}</p>
              </div>
            </div>
            <div className="mt-2 flex justify-center gap-2">
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
          </div>
        </>
      ) : (
        <>
          <div className="grid justify-items-center">
            <Button
              startIcon={<ICONS.Add />}
              onClick={() => setIsUpdate((prev) => !prev)}
              variant="contained"
              className="!bg-theme !hover:bg-theme-600 !text-white !text-lg !font-semibold tracking-wide px-2"
            >
              Add Client
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default ClientDetails;

const team = [
  { title: "Srinu Reddy", year: 1994 },
  { title: "Loushik Kumar", year: 1972 },
  { title: "Chinmay", year: 1974 },
  { title: "Abhilash", year: 2008 },
  { title: "Sunil", year: 1957 },
];
