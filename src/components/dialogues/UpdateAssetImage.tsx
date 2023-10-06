import { Check, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useChange, useFetch } from "hooks";
import Swal from "sweetalert2";
import { SingleImageUpdateBranch } from "components/core";
import { deleteFile, uploadFile } from "utils";

interface Props {
  open: any;
  handleClose: any;
  mutate?: any;
  imageData?: any;
  MainMutate?: any;
}

const UpdateAssetImage = ({
  open,
  handleClose,
  mutate,
  MainMutate,
  imageData,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const initialValues = {
    image: `${imageData ? imageData : ""}`,
  };
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const uniId = initialValues?.image?.substring(
      initialValues?.image?.lastIndexOf("/") + 1
    );
    try {
      if (imageData !== values?.image) {
        const url = await uploadFile(values?.image, `${uniId}`);
        setLoading(false);
        mutate();
        MainMutate();
        handleClose();
        Swal.fire(`Success`, `Updated Successfully!`, `success`);
        return;
      }
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
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        id="customized-dialog-title"
        sx={{ p: 2, minWidth: "18rem !important" }}
      >
        <p className="text-center text-xl font-bold text-theme tracking-wide">
          UPDATE IMAGE
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
      <DialogContent className="app-scrollbar" sx={{ p: 2 }}>
        <div className="md:w-[22rem] w-[72vw] md:px-4 px-2 tracking-wide">
          <Formik
            initialValues={initialValues}
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
                <div className="flex flex-col gap-4">
                  <SingleImageUpdateBranch
                    values={values}
                    setImageValue={(event: any) => {
                      setFieldValue("image", event.currentTarget.files[0]);
                    }}
                  >
                    <ErrorMessage name="image" />
                  </SingleImageUpdateBranch>
                  <Button
                    type="submit"
                    fullWidth
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
                    UPDATE
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAssetImage;
