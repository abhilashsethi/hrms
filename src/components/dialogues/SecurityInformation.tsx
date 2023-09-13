import { Check, Close } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { SHIFT, Security } from "types";
import * as Yup from "yup";

interface Props {
  open: boolean;
  mutate: () => void;
  handleClose: () => void;
  securityData?: Security;
}

const SecurityInformation = ({
  open,
  mutate,
  securityData,
  handleClose,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const { data: securityShift } = useFetch<SHIFT[]>(`security/shift`);

  const initialValues = {
    agencyName: securityData?.agencyName || "",
    agencyAddress: securityData?.agencyAddress || "",
    shiftId: securityData?.shift?._id?.$oid || "",
  };

  const validationSchema = Yup.object().shape({
    agencyName: Yup.string()
      .min(2, "Agency name is too short")
      .max(50, "Agency name is too long"),
  });
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      Swal.fire(`Info`, `Please Wait..., It will take Some Time!`, `info`);
      const resData: any = await change(`security/${securityData?._id?.$oid}`, {
        method: "PATCH",
        body: values,
      });
      setLoading(false);
      if (resData?.status !== 200) {
        Swal.fire(
          "Error",
          resData?.results?.msg || "Unable to Submit",
          "error"
        );
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `You have successfully Submitted!`, `success`);
      handleClose();
      mutate();

      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
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
        <DialogTitle id="customized-dialog-title">
          <p className="text-center text-md font-bold text-theme te tracking-wide">
            Security Information Update
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
          <div className="md:w-[50rem] w-[65vw] md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-4">
            <div className="flex flex-col items-center w-full">
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
                  <Form className="w-full">
                    <div className="grid lg:grid-cols-2 gap-4">
                      {/* name */}
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Agency Name
                        </p>
                        <TextField
                          fullWidth
                          size="small"
                          name="agencyName"
                          placeholder="Enter Agency Name"
                          value={values.agencyName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.agencyName && !!errors.agencyName}
                          helperText={
                            (touched?.agencyName as any) &&
                            (errors?.agencyName as any)
                          }
                        />
                      </div>

                      {/* IFSC Code */}
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">
                          Agency Address
                        </p>
                        <TextField
                          name="agencyAddress"
                          fullWidth
                          size="small"
                          placeholder="Enter Agency Address"
                          value={values.agencyAddress}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.agencyAddress && !!errors.agencyAddress
                          }
                          helperText={
                            (touched.agencyAddress as any) &&
                            (errors.agencyAddress as any)
                          }
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-theme font-semibold my-2">Shift</p>
                        <Autocomplete
                          fullWidth
                          size="small"
                          id="shiftId"
                          options={securityShift || []}
                          onChange={(e: ChangeEvent<{}>, r: SHIFT | null) => {
                            setFieldValue("shiftId", r?._id?.$oid || "");
                          }}
                          getOptionLabel={(option: SHIFT) => option.type || ""}
                          value={
                            values.shiftId
                              ? securityShift?.find(
                                  (option: any) =>
                                    option?._id?.$oid === values.shiftId
                                )
                              : null
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="shift"
                              onBlur={handleBlur}
                              error={touched.shiftId && !!errors.shiftId}
                              helperText={touched.shiftId && errors.shiftId}
                            />
                          )}
                        />
                      </div>
                      {/* accountNo */}
                    </div>
                    <div className="flex gap-3 justify-center mt-4">
                      <Button
                        type="submit"
                        className="!bg-theme"
                        variant="contained"
                        disabled={loading}
                        startIcon={
                          loading ? <CircularProgress size={20} /> : <Check />
                        }
                      >
                        SUBMIT
                      </Button>
                    </div>
                    {/* <button type="submit">Submit</button> */}
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

export default SecurityInformation;
