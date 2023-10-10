import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Check, Close } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

interface Props {
  open?: any;
  handleClose?: any;
  mutate?: any;
  id?: any;
}
const validationSchema = Yup.object().shape({});

const UpdateBugStatus = ({ open, handleClose, mutate, id }: Props) => {
  const [bugData, setBugData] = useState<any>({});
  const router = useRouter();
  const { data: projectData, mutate: projectDataMutate } = useFetch<any>(
    `projects/${router?.query?.id}`
  );
  useEffect(() => {
    const reqData = projectData?.bugs?.find((item: any) => item?.id === id);
    setBugData(reqData);
  }, [projectData]);

  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const initialValues = {
    status: `${bugData?.status ? bugData?.status : ""}`,
  };
  const handleSubmit = async (values: any) => {
    const dtype = values?.pictures && values?.pictures?.type.split("/")[1];
    setLoading(true);
    try {
      const res = await change(`projects/update-bug/${id}`, {
        method: "PATCH",
        body: {
          status: values?.status,
        },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Update", "error");
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `Updated Successfully`, `success`);
      mutate();
      projectDataMutate();
      setLoading(false);
      handleClose();
      return;
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
    }
  };
  return (
    <>
      <Dialog
        onClose={handleClose}
        maxWidth="lg"
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          sx={{ p: 2, minWidth: "25rem !important" }}
        >
          <p className="text-center text-md font-bold text-theme te tracking-wide">
            UPDATE STATUS
          </p>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              top: 10,
              right: 10,
              position: "absolute",
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Tooltip title="Close">
              <Close />
            </Tooltip>
          </IconButton>
        </DialogTitle>
        <DialogContent className="app-scrollbar" sx={{ p: 3 }}>
          <div className="md:w-[20rem] w-[72vw] md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-4">
            <div className="items-center w-full">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                }) => (
                  <Form>
                    <div className="py-2">
                      <InputLabel htmlFor="name">Status</InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      select
                      label="Status"
                      size="small"
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.status && !!errors.status}
                      helperText={touched.status && errors.status}
                    >
                      {statuses?.map((option: any) => (
                        <MenuItem key={option.id} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                    <div className="flex justify-center py-4">
                      <Button
                        type="submit"
                        variant="contained"
                        className={`${loading ? "!bg-gray-300" : "bg-theme"}`}
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateBugStatus;

const statuses = [
  { id: 1, value: "Open" },
  { id: 2, value: "Pending" },
  { id: 3, value: "Ongoing" },
  { id: 4, value: "Fixed" },
  { id: 4, value: "Reviewed" },
  { id: 5, value: "NotNeeded" },
];
