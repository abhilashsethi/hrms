import { makeStyles } from "@material-ui/core";
import {
  AccountTree,
  Add,
  Check,
  Close,
  ContentCopy,
  Delete,
  Visibility,
} from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Drawer,
  IconButton,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import { useAuth, useChange, useFetch } from "hooks";
import { SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";
import { Projects } from "types";
import * as yup from "yup";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  id?: any;
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "50vw",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "80vw",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "30vw",
    },
  },
}));
const ProjectURLS = ({ open, onClose, id }: Props) => {
  const { user } = useAuth();
  const [isSnackbar, setIsSnackbar] = useState(false);
  const handleClick = () => {
    setIsSnackbar(true);
  };
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbar(false);
  };
  const [loading, setLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const { change } = useChange();
  const {
    data: projectData,
    mutate,
    isLoading,
  } = useFetch<Projects>(`projects/${id}`);
  const removeURL = (urlId: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to remove!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire(`Info`, "It will take some time", "info");
          try {
            const res = await change(`projects/remove-links/${id}`, {
              method: "DELETE",
              body: { linkIds: [`${urlId}`] },
            });
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
            Swal.fire(`Removed!`, `Deleted Successfully`, `success`);
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

  const formik = useFormik({
    initialValues: { title: "", link: "" },
    validationSchema: yup.object({
      title: yup.string().required("Required!"),
      link: yup.string().required("Required!"),
    }),
    onSubmit: async (values) => {
      const reqData = { links: [{ title: values?.title, link: values?.link }] };
      setLoading(true);
      try {
        const res = await change(`projects/add-links/${id}`, {
          body: reqData,
        });
        setLoading(false);
        if (res?.status !== 200) {
          Swal.fire("Error", res?.results?.msg || "Unable to Create", "error");
          setLoading(false);
          return;
        }
        mutate();
        Swal.fire(`Success`, `Created Successfully`, `success`);
        formik.resetForm();
        setIsCreate(false);
        return;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
  });
  const classes = useStyles();
  return (
    <>
      <Snackbar open={isSnackbar} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Link copied to clipboard
        </Alert>
      </Snackbar>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container style={{ marginTop: "1rem" }} className={classes.container}>
          <div className="flex justify-between items-center">
            {" "}
            <p className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
              <AccountTree />
              Project URLs
            </p>
            <IconButton onClick={() => onClose()}>
              <Close
                fontSize="small"
                className="text-red-500 block md:hidden"
              />
            </IconButton>
          </div>
          <div>
            <h4 className="font-semibold">Project Name : </h4>
            {isLoading && <p>Please wait...</p>}
            <h4 className="text-theme font-semibold tracking-wide">
              {projectData?.name}
            </h4>
            <div className="flex justify-between items-center">
              <h4 className="font-semibold mt-4 underline">Project URLs : </h4>
              {user?.role?.name === "CEO" ||
              user?.role?.name === "HR" ||
              user?.role?.name === "COO" ||
              user?.role?.name === "DIRECTOR" ||
              user?.role?.name === "PROJECT MANAGER" ? (
                <span>
                  <Button
                    onClick={() => setIsCreate((prev) => !prev)}
                    variant="contained"
                    className="!bg-theme"
                    size="small"
                    startIcon={<Add />}
                  >
                    CREATE
                  </Button>
                </span>
              ) : null}
            </div>
            {isCreate && (
              <form
                onSubmit={formik.handleSubmit}
                className=" w-full border-2 mt-4 rounded-md p-4 shadow-sleek"
              >
                <h1 className="mb-2 font-semibold">Url Title</h1>
                <TextField
                  placeholder="Url Title"
                  size="small"
                  fullWidth
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && !!formik.errors.title}
                  helperText={formik.touched.title && formik.errors.title}
                />
                <h1 className="mb-2 mt-2 font-semibold">Url</h1>
                <TextField
                  placeholder="Url"
                  size="small"
                  fullWidth
                  name="link"
                  value={formik.values.link}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.link && !!formik.errors.link}
                  helperText={formik.touched.link && formik.errors.link}
                />
                <div className="flex justify-end mt-3">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    className="!bg-emerald-600"
                    size="small"
                    startIcon={
                      loading ? <CircularProgress size={20} /> : <Check />
                    }
                  >
                    SUBMIT
                  </Button>
                </div>
              </form>
            )}
            {isLoading && <p>Please wait...</p>}
            {projectData?.URLs?.length === 0 ? (
              <p className="py-4">No URLs added...</p>
            ) : null}
            <div className="mt-4 flex flex-col gap-4">
              {projectData?.URLs?.map((item: any, i) => (
                <div
                  key={item?.id}
                  className="p-2 rounded-md shadow-jubilation border-b-2 border-theme"
                >
                  <div className="flex justify-between">
                    <h1 className="flex items-center gap-2">
                      <span>{Number(i) + 1}.</span>
                      <span className="font-semibold">{item?.title}</span>
                    </h1>
                    {user?.role?.name === "CEO" ||
                    user?.role?.name === "HR" ||
                    user?.role?.name === "COO" ||
                    user?.role?.name === "DIRECTOR" ||
                    user?.role?.name === "PROJECT MANAGER" ? (
                      <div>
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => removeURL(item?.id)}
                            size="small"
                          >
                            <Delete className="!text-red-500" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex gap-2 items-center mt-3">
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      // prefetch={false}
                      href={item?.link}
                    >
                      <span className="custom-button bg-green-500">
                        <Visibility fontSize="small" /> CLICK TO VIEW
                      </span>
                    </a>
                    <Tooltip title="Copy to clipboard">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(item?.link);
                          handleClick();
                        }}
                        className="custom-button bg-slate-800"
                      >
                        <ContentCopy fontSize="small" /> COPY LINK
                      </span>
                    </Tooltip>
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
