import { Delete, Visibility } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { EMAILTEMP } from "assets/dashboard_Icons";
import { AdminBreadcrumbs } from "components/core";
import { UseTemplate, ViewEmailTemplate } from "components/dialogues";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const SavedTemplates = () => {
  const [isView, setIsView] = useState<{
    dialogue?: boolean;
    id?: string | null;
  }>({ dialogue: false, id: null });
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
            {templates?.map((item) => (
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
