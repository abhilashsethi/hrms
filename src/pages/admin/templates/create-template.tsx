import { FileCopy, Save, Send } from "@mui/icons-material";
import { Button } from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import EmailEditor from "react-email-editor";
import Swal from "sweetalert2";
import { User } from "types";

const CreateTemplate = () => {
  const router = useRouter();
  const links = [
    {
      id: 1,
      page: "Create Template",
      link: "/admin/templates/create-template",
    },
  ];
  const emailEditorRef = useRef<any>(null);
  const onLoad = () => {};
  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };
  const { change } = useChange();
  const handleTemplateSave = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to save this mail?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, send!",
      }).then((result) => {
        if (result.isConfirmed) {
          emailEditorRef?.current?.editor.exportHtml(
            async ({ html, design }: { html: string; design: any }) => {
              Swal.fire({
                title: "Please add a title for your template",
                input: "text",
                inputAttributes: {
                  autocapitalize: "off",
                },
                showCancelButton: true,
                confirmButtonText: "Submit!",
                showLoaderOnConfirm: true,
                inputValidator: (value) => {
                  if (!value) {
                    return "Title is required!"; // Validation error message
                  }
                  return null; // No validation error
                },
                preConfirm: async (title) => {
                  const res = await change(`mail-template`, {
                    body: {
                      title: title,
                      content: html,
                      json: JSON.stringify(design),
                    },
                  });
                  console.log(res);

                  if (res?.status !== 200) {
                    throw new Error(res?.results?.msg || "Unable to Submit");
                  }
                  return title;
                },
                allowOutsideClick: () => !Swal.isLoading(),
              }).then((result) => {
                if (result.isConfirmed) {
                  router.push(`/admin/templates/saved-templates`);
                  Swal.fire(
                    "Created!",
                    "Successfully created mail template!",
                    "success"
                  );
                }
              });
              return;
            }
          );
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          title: "Error?",
          text: error?.message,
          icon: "error",
        });
        return;
      }
      Swal.fire({
        title: "Error?",
        text: "Oops, Something went wrong!",
        icon: "error",
      });
    }
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
              Create Email Template
            </h1>
          </div>
          <div>
            <div className="flex justify-end font-semibold mb-3 gap-4">
              <Button
                variant="contained"
                startIcon={<Save />}
                className="!bg-blue-500"
                onClick={handleTemplateSave}
              >
                Save Template
              </Button>
              <Link href={`/admin/templates/saved-templates`}>
                <Button
                  variant="contained"
                  startIcon={<FileCopy />}
                  className="!bg-green-500"
                >
                  Saved Templates
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

export default CreateTemplate;
