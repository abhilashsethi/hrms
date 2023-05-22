import {
  AccountTree,
  Add,
  Check,
  ContentCopy,
  Delete,
  Edit,
  Visibility,
  YouTube,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  Drawer,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import { useChange, useFetch } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Projects } from "types";
import * as yup from "yup";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  id?: any;
};

const ProjectURLS = ({ open, onClose, id }: Props) => {
  const [loading, setLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const { change } = useChange();
  const { data: projectData, mutate } = useFetch<Projects>(`projects/${id}`);
  const removeURL = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to remove!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Removed!", "URL removed successfully!", "success");
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
          method: "PATCH",
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
        return;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
  });
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
            <AccountTree />
            Project URLs
          </p>
          <div>
            <h4 className="font-semibold">Project Name : </h4>
            <h4 className="text-theme font-semibold tracking-wide">
              {projectData?.name}
            </h4>
            <div className="flex justify-between items-center">
              <h4 className="font-semibold mt-4 underline">Project URLs : </h4>
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
            <div className="mt-4 flex flex-col gap-4">
              {urls?.map((item, i) => (
                <div
                  key={item?.id}
                  className="p-2 rounded-md shadow-jubilation border-b-2 border-theme"
                >
                  <div className="flex justify-between">
                    <h1 className="flex items-center gap-2">
                      <span>{Number(i) + 1}.</span>
                      <span className="font-semibold">{item?.title}</span>
                    </h1>
                    <div>
                      <Tooltip title="Edit">
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => removeURL()} size="small">
                          <Delete className="!text-red-500" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center mt-3">
                    <span className="custom-button bg-green-500">
                      <Visibility fontSize="small" /> CLICK TO VIEW
                    </span>
                    <Tooltip title="Copy to clipboard">
                      <span className="custom-button bg-slate-800">
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
