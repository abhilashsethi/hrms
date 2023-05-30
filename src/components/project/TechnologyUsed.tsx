import { Check, Close, Add } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { AWS, CSS, JAVASCRIPT, NEXTJS, REACT } from "assets/svgicons";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
interface Props {
  projectData?: any;
  mutate?: any;
}
const initialValues = {
  TechStackIds: "",
};
const TechnologyUsed = ({ projectData, mutate }: Props) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const { data: techData } = useFetch<any>(`technologies`);
  const removeTechnology = (techId: any) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to remove technology!",
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
              `projects/remove-techs/${projectData?.id}`,
              {
                method: "DELETE",
                body: { TechStacksIds: [`${techId}`] },
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
            Swal.fire(`Removed!`, `Technology Deleted Successfully`, `success`);
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
  const handleSubmit = async (values: any) => {
    // console.log(values);
    setLoading(true);
    try {
      const res = await change(`projects/add-techs/${projectData.id}`, {
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
    <section className="w-full rounded-md p-6 mt-4 bg-white shadow-jubilation">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-gray-600 underline">
          Technology Used
        </h1>
        {projectData?.technologies?.length ? (
          <Tooltip title="Add Technology">
            <IconButton
              onClick={() => setIsUpdate((prev) => !prev)}
              size="small"
            >
              <Add />
            </IconButton>
          </Tooltip>
        ) : null}
      </div>
      {isUpdate && (
        <>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleBlur, setFieldValue }) => (
              <Form>
                <div className="pt-4">
                  <Autocomplete
                    multiple
                    options={techData ? (techData as any) : []}
                    value={techData?.filter((item: any) =>
                      values?.TechStackIds?.includes(item?.id)
                    )}
                    id="TechStackIds"
                    onChange={(e: any, r: any) => {
                      setFieldValue(
                        "TechStackIds",
                        r?.map((data: { id: any }) => data?.id)
                      );
                    }}
                    getOptionLabel={(option: any) => option?.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Select Technologies"
                        placeholder="Technologies"
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
      {projectData?.technologies?.length ? (
        <div className="py-4 grid lg:grid-cols-3 gap-3 flex-wrap">
          {projectData?.technologies?.map((item: any) => (
            <div
              key={item?.id}
              className="px-4 py-4 relative mt-3 rounded-md shadow-jubilation"
            >
              <div
                onClick={() => removeTechnology(item?.id)}
                className="absolute right-[5px] top-[4px] cursor-pointer shadow-md bg-red-500 h-6 w-6 rounded-full flex justify-center items-center"
              >
                <Close className="!text-[1rem] !text-white" />
              </div>
              <div className="grid px-1 pt-2 gap-2 justify-items-center">
                <img
                  className="h-7 object-contain"
                  src={item?.logo}
                  alt="photo"
                />
                <h3 className="text-sm font-semibold">{item?.name}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 lg:py-12 py-6">
            <h1 className="text-center">
              Technology details not mentioned, click to add.
            </h1>
            <Button
              size="small"
              fullWidth
              startIcon={<Add />}
              onClick={() => setIsUpdate((prev) => !prev)}
              variant="contained"
              className="!bg-theme !hover:bg-theme-600 !text-white !font-semibold tracking-wide px-2"
            >
              ADD TECHNOLOGY
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default TechnologyUsed;
