import { Check, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { Tender } from "types";
import * as Yup from "yup";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: () => void;
  tenderData?: Tender;
}

const UpdateTenderEMDDetails = ({
  open,
  handleClose,
  mutate,
  tenderData,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const [isEmdValue, setIsEmdValue] = useState(tenderData?.isEmdExemption);

  const initialValues = {
    EmdAmount: tenderData?.EmdAmount ? tenderData?.EmdAmount : 0,
    EmdPaymentMode: `${
      tenderData?.EmdPaymentMode ? tenderData?.EmdPaymentMode : ""
    }`,
  };
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEmdValue(event.target.value === "yes");
  };
  const validationSchema = Yup.object().shape({
    EmdAmount: Yup.number().positive("Must be a positive number"),
  });

  const handleSubmit = async (values: Tender) => {
    setLoading(true);
    try {
      let updatedEmdAmount = Number(values?.EmdAmount);
      if (isEmdValue) {
        updatedEmdAmount = 0;
      }
      const res = await change(`tenders/update/${tenderData?.id}`, {
        method: "PATCH",
        body: {
          EmdAmount: updatedEmdAmount,
          EmdPaymentMode: values?.EmdPaymentMode,
          isEmdExemption: isEmdValue,
        },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `EMD Details updated successfully!`, `success`);
      mutate();
      handleClose();
      return;
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
    <>
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
            EMD DETAILS
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
          <div className="md:px-4 px-2 md:w-[25rem] w-full tracking-wide">
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
                  <div className="grid">
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <h1 className="mb-2">EMD Exemption</h1>

                      <RadioGroup
                        defaultValue={tenderData?.isEmdExemption ? "yes" : "no"}
                        row
                        name="isEmdValue"
                        onChange={handleOptionChange}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </div>
                    {!isEmdValue && (
                      <>
                        <div className="md:px-4 px-2 md:py-2 py-1">
                          <div className="py-2">
                            <InputLabel htmlFor="EmdAmount">
                              Tender Fees{" "}
                              <span className="text-red-600">*</span>
                            </InputLabel>
                          </div>
                          <TextField
                            size="small"
                            fullWidth
                            type="number"
                            // placeholder="Email"
                            id="EmdAmount"
                            name="EmdAmount"
                            value={values.EmdAmount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.EmdAmount && !!errors.EmdAmount}
                            helperText={touched.EmdAmount && errors.EmdAmount}
                          />
                        </div>
                        <div className="md:px-4 px-2 md:py-2 py-1">
                          <div className="py-2">
                            <InputLabel htmlFor="portal">
                              Payment Mode{" "}
                              <span className="text-red-600">*</span>
                            </InputLabel>
                          </div>
                          <TextField
                            fullWidth
                            size="small"
                            select
                            name="EmdPaymentMode"
                            label="Select Payment Mode"
                            value={values.EmdPaymentMode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.EmdPaymentMode && !!errors.EmdPaymentMode
                            }
                            helperText={
                              touched.EmdPaymentMode && errors.EmdPaymentMode
                            }
                          >
                            {EmdPaymentMode.map((option) => (
                              <MenuItem key={option.id} value={option.title}>
                                {option.title}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex justify-center md:py-4 py-2">
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      className="!bg-green-500"
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateTenderEMDDetails;
const EmdPaymentMode = [
  { id: 1, title: "Online" },
  { id: 2, title: "Offline" },
];
