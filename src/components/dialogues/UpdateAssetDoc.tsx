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
import { SingleDocUpdate, SingleImageUpdateBranch } from "components/core";
import { deleteFile, uploadFile } from "utils";

interface Props {
  open: any;
  handleCloseUpdateDoc: any;
  mutate?: any;
  docData?: any;
  MainMutate?: any;
}

const UpdateAssetDoc = ({
  open,
  handleCloseUpdateDoc,
  mutate,
  docData,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const initialValues = {
    docs: `${docData ? docData : ""}`,
  };
  const handleSubmit = async (values: any) => {
    console.log(values);
    setLoading(true);
    const uniId = initialValues?.docs?.substring(
      initialValues?.docs?.lastIndexOf("/") + 1
    );
    try {
      if (docData !== values?.docs) {
        const url = await uploadFile(values?.docs, `${uniId}`);
        setLoading(false);
        mutate();
        handleCloseUpdateDoc();
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
      onClose={handleCloseUpdateDoc}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        id="customized-dialog-title"
        sx={{ p: 2, minWidth: "18rem !important" }}
      >
        <p className="text-center text-xl font-bold text-theme tracking-wide">
          UPDATE DOCUMENT
        </p>
        <IconButton
          aria-label="close"
          onClick={handleCloseUpdateDoc}
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
                  <SingleDocUpdate
                    values={values}
                    setImageValue={(event: any) => {
                      setFieldValue("docs", event.currentTarget.files[0]);
                    }}
                  >
                    <ErrorMessage name="docs" />
                  </SingleDocUpdate>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className="!bg-emerald-500"
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
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAssetDoc;
