import { Add, Settings } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { AdminBreadcrumbs, FileUpload } from "components/core";
import { AddSignatureConfig } from "components/dialogues";
import { ErrorMessage, Form, Formik } from "formik";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import { QuotationBank } from "types";
import * as Yup from "yup";
const initialValues = {
  // gst: "",
  // cgst: "",
  // sgst: "",
};

const validationSchema = Yup.object().shape({
  // gst: Yup.number().required("% For GST is required !"),
  // cgst: Yup.number().required("% For CGST is required !"),
  // sgst: Yup.number().required("% For SGST is required !"),
});

const SignatureConfig = () => {
  const [isSignature, setIsSignature] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const {
    data: bankData,
    mutate,
    isLoading,
  } = useFetch<QuotationBank[]>(`bills/get-all`);
  console.log(bankData);
  const handleSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <PanelLayout title="GST configure - Admin Panel">
      <AddSignatureConfig
        open={isSignature}
        handleClose={() => setIsSignature(false)}
        mutate={mutate}
      />
      <section className="lg:px-8 px-2 lg:py-4 py-2">
        <div className="flex justify-between items-center py-4">
          <AdminBreadcrumbs links={links} />
          <Button
            size="small"
            className="!bg-theme"
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setIsSignature(true);
            }}
          >
            ADD SIGNATURE
          </Button>
        </div>
        <section className="w-full px-0 lg:py-4 py-2 flex justify-center items-center"></section>
      </section>
    </PanelLayout>
  );
};

export default SignatureConfig;

const links = [
  // { id: 1, page: "Payroll", link: "/admin/payroll" },
  { id: 2, page: "Gst Configure", link: "/admin/quotation/gst-config" },
];
