import { Check, Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useFetch } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Branch } from "types";
import * as Yup from "yup";

interface Props {
  open: boolean;
  handleClose: any;
  mutate?: any;
  setBranchId?: any;
}

const ChooseBranchToViewAssets = ({
  open,
  handleClose,
  mutate,
  setBranchId,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { data: branchData } = useFetch<Branch[]>(`branches`);

  console.log(branchData);

  const validationSchema = Yup.object().shape({
    branchId: Yup.string().required("Branch is required!"),
  });
  const initialValues = {
    branchId: "",
  };

  const handleSubmit = async (values: any) => {
    try {
      setBranchId(values.branchId);
      handleClose();
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
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
          CHOOSE BRANCH
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
                <div className="px-4 py-2">
                  <div className="px-4 py-2">
                    <div className="py-2">
                      <InputLabel htmlFor="name">
                        Choose Branch<span className="text-red-500">*</span>
                      </InputLabel>
                    </div>
                    <Autocomplete
                      fullWidth
                      size="small"
                      id="branchId"
                      options={
                        branchData?.filter((item: any) => !item?.isBlocked) ||
                        []
                      }
                      getOptionLabel={(option: any) =>
                        option.name ? option.name : ""
                      }
                      isOptionEqualToValue={(option: any, value: any) =>
                        option?.id === value?.userId
                      }
                      value={
                        values?.branchId
                          ? branchData?.find(
                              (option: any) => option.id === values.branchId
                            )
                          : {}
                      }
                      onChange={(e: any, r: any) => {
                        setFieldValue("branchId", r?.id);
                      }}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          {option.name}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Branch Name"
                          onBlur={handleBlur}
                          error={touched.branchId && !!errors.branchId}
                          helperText={touched.branchId && errors.branchId}
                        />
                      )}
                    />
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
                    Submit
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

export default ChooseBranchToViewAssets;
