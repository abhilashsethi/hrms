import { FileCopy, Send } from "@mui/icons-material";
import { Button } from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import EmailEditor from "react-email-editor";
import Swal from "sweetalert2";
import { User } from "types";

const SendEmail = () => {
  const router = useRouter();
  const { data: userData } = useFetch<User>(`users/${router?.query?.empId}`);
  const links = [
    { id: 1, page: "All Employees", link: "/admin/all-employees" },
    {
      id: 2,
      page: "Employee Profile",
      link: `/admin/employees/employee-profile?id=${router?.query?.empId}`,
    },
    {
      id: 3,
      page: "Send Email",
      link: `/admin/employees/send-email?empId=${router?.query?.empId}`,
    },
  ];
  const emailEditorRef = useRef<any>(null);
  const onLoad = () => {};
  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };
  return (
    <PanelLayout title="Send Email - Admin Panel">
      <section className="px-8 py-4">
        <>
          <div className="md:w-auto w-full">
            <AdminBreadcrumbs links={links} />
          </div>
          <div className="flex justify-between items-center">
            <h1 className="font-semibold mt-4 text-lg">
              Send Email to
              <span className="text-theme ml-2">{userData?.email}</span>
            </h1>
          </div>
          <div>
            <div className="flex justify-end font-semibold mb-3 gap-4">
              <Button
                variant="contained"
                startIcon={<Send />}
                className="!bg-blue-500"
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You want to send mail?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, send!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire("Sent!", "Mail sent successfully!", "success");
                    }
                  });
                }}
              >
                Send Email
              </Button>
              <Link
                href={`/admin/employees/saved-templates?empId=${router?.query?.empId}`}
              >
                <Button
                  variant="contained"
                  startIcon={<FileCopy />}
                  className="!bg-green-500"
                >
                  Use Templates
                </Button>
              </Link>
            </div>
            <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <EmailEditor
                ref={emailEditorRef}
                onLoad={onLoad}
                onReady={onReady}
                appearance={{
                  theme: "dark",
                  panels: { tools: { dock: "right" } },
                }}
                // initialContent={}
              />
            </div>
          </div>
        </>
      </section>
    </PanelLayout>
  );
};

export default SendEmail;
