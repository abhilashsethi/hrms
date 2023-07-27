import { Delete, Visibility } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { EMAILTEMP } from "assets/dashboard_Icons";
import { AdminBreadcrumbs } from "components/core";
import { UseTemplate, ViewEmailTemplate } from "components/dialogues";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { MailTemplate } from "types";

const SavedTemplates = () => {
  const [isView, setIsView] = useState<{
    dialogue?: boolean;
    id?: string | null;
  }>({ dialogue: false, id: null });
  const { change } = useChange();
  const [isUse, setIsUse] = useState(false);
  const router = useRouter();
  const links = [
    { id: 1, page: "Saved Templates", link: "/admin/saved-templates" },
  ];
  const emailEditorRef = useRef<any>(null);
  const onLoad = () => {};
  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };
  const {
    data: template,
    mutate,
    isLoading,
  } = useFetch<MailTemplate[]>(`mail-template`);
  console.log(template);
  const handleDelete = (id?: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire(`Info`, "It will take some time", "info");
          const res = await change(`mail-template/${id}`, {
            method: "DELETE",
          });

          if (res?.status !== 200) {
            Swal.fire(
              "Error",
              res?.results?.msg || "Something went wrong!",
              "error"
            );
            return;
          }
          Swal.fire(`Success`, "Deleted Successfully!", "success");
          mutate();
          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PanelLayout title="Saved Templates - Admin Panel">
      <section className="px-8 py-4">
        <>
          <ViewEmailTemplate
            open={isView?.dialogue}
            handleClose={() => setIsView({ dialogue: false })}
            id={isView?.id}
          />
          <UseTemplate open={isUse} handleClose={() => setIsUse(false)} />
          <div className="md:w-auto w-full">
            <AdminBreadcrumbs links={links} />
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-theme font-semibold mt-4 text-lg">
              Saved Templates
            </h1>
          </div>
          <Grid container spacing={1.5} marginTop={0.5}>
            {template?.map((item) => (
              <Grid key={item?.id} item lg={2.4}>
                <div className="h-52 hover:scale-105 transition-all ease-in-out duration-200 bg-gradient-to-br border-blue-400 from-blue-300 to-blue-100 rounded-md w-full border-[1px] p-4 flex flex-col justify-between items-center">
                  <div className="h-4">
                    <h1 className="text-center font-semibold text-gray-700 text-sm">
                      {item?.title}
                    </h1>
                  </div>
                  <img
                    className="h-16 object-contain"
                    src={EMAILTEMP.src}
                    alt="emailtemp"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<Visibility />}
                      className="!bg-blue-500"
                      onClick={() =>
                        setIsView({ dialogue: true, id: item?.title })
                      }
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<Delete />}
                      className="!bg-red-600"
                      onClick={() => {
                        handleDelete(item?.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </>
      </section>
    </PanelLayout>
  );
};

export default SavedTemplates;

const templates = [
  { id: 1, title: "Salary Credit Template" },
  { id: 2, title: "Event Invitation" },
  { id: 3, title: "Referral Programme" },
  { id: 4, title: "Change Management Communications" },
  { id: 4, title: "Default" },
];
