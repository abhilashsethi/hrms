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
import { useState } from "react";
import { uploadFile } from "utils";

interface Props {
  open?: any;
  handleClose?: any;
  mutate?: any;
  id?: any;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  detectedBy: Yup.string().required("Required!"),
  pictures: Yup.mixed()
    .test(
      "fileSize",
      "File size is too large",
      (value: any) => !value || (value && value.size <= 5000000)
    )
    .test(
      "fileType",
      "Only image files are allowed",
      (value: any) => !value || (value && value.type.startsWith("image/"))
    )
    .required("Required!"),
});

const ProjectCreateBug = ({ open, handleClose, mutate, id }: Props) => {
  const { data: employeesData, isLoading } = useFetch<any>(`users`);
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const initialValues = {
    title: "",
    description: "",
    status: "",
    assignedUserIds: [],
    detectedBy: "",
    pictures: null,
  };
  const handleSubmit = async (values: any) => {
    const dtype = values?.pictures && values?.pictures?.type.split("/")[1];
    setLoading(true);
    try {
      const url =
        values?.pictures &&
        (await uploadFile(values?.pictures, `${Date.now()}.${dtype}`));
      const res = await change(`projects/add-bugs/${id}`, {
        method: "PATCH",
        body: {
          bugs: [
            {
              title: values?.title,
              description: values?.description,
              pictures: [`${url}`],
              status: values?.status,
              detectedById: values?.detectedBy,
              projectId: id,
            },
          ],
        },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Create", "error");
        setLoading(false);
        return;
      }
      mutate();
      Swal.fire(`Success`, `Created Successfully`, `success`);
      setLoading(false);
      handleClose();
      return;
    } catch (error) {
      console.log(error);
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
          sx={{ p: 2, minWidth: "40rem !important" }}
        >
          <p className="text-center text-md font-bold text-theme te tracking-wide">
            CREATE BUG
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
          <div className="md:w-[50rem] w-[72vw] md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-4">
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
                    <div className="grid grid-cols-2 w-full">
                      <div className="px-4 py-2">
                        <div className="py-2">
                          <InputLabel htmlFor="name">Title</InputLabel>
                        </div>
                        <TextField
                          fullWidth
                          size="small"
                          id="title"
                          placeholder="Title"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.title && !!errors.title}
                          helperText={touched.title && errors.title}
                        />
                      </div>
                      <div className="px-4 py-2">
                        <div className="py-2">
                          <InputLabel htmlFor="name">Description</InputLabel>
                        </div>
                        <TextField
                          fullWidth
                          size="small"
                          id="title"
                          placeholder="Description"
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.description && !!errors.description}
                          helperText={touched.description && errors.description}
                        />
                      </div>
                      <div className="px-4 py-2">
                        <div className="py-2">
                          <InputLabel htmlFor="name">Detected By</InputLabel>
                        </div>
                        <div>
                          <Autocomplete
                            options={
                              employeesData ? (employeesData as any) : []
                            }
                            size="small"
                            getOptionLabel={(option: any) => option.name}
                            onChange={(e, r) =>
                              setFieldValue("detectedBy", r?.id)
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Members"
                                name="detectedBy"
                                value={values.detectedBy}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                  touched.detectedBy && !!errors.detectedBy
                                }
                                helperText={
                                  touched.detectedBy && errors.detectedBy
                                }
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="px-4 py-2">
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
                      </div>
                      <div className="px-4">
                        <h1 className="my-2 font-semibold">
                          Upload Screenshot
                        </h1>
                        <input
                          type="file"
                          name="link"
                          placeholder="Choose Image"
                          onChange={(e: any) =>
                            setFieldValue("pictures", e?.target?.files[0])
                          }
                        />
                        <span className="text-red-500">
                          <ErrorMessage
                            name="pictures"
                            component="div"
                            className="error"
                          />
                        </span>
                        {values.pictures && (
                          <img
                            className="w-24 object-contain mt-4"
                            src={URL.createObjectURL(values.pictures)}
                            alt="Preview"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center py-4">
                      <Button
                        type="submit"
                        variant="contained"
                        className="!bg-theme"
                        disabled={loading}
                        startIcon={
                          loading ? <CircularProgress size={20} /> : <Check />
                        }
                      >
                        CREATE
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

export default ProjectCreateBug;

const statuses = [
  { id: 1, value: "Open" },
  { id: 2, value: "Pending" },
  { id: 3, value: "Ongoing" },
  { id: 4, value: "Fixed" },
  { id: 4, value: "Reviewed" },
];
