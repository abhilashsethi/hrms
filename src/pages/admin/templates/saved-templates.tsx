import { Add, Delete, Visibility } from "@mui/icons-material";
import { Button, Grid, Pagination, Stack } from "@mui/material";
import { EMAILTEMP } from "assets/dashboard_Icons";
import { AdminBreadcrumbs, Loader, LoaderAnime } from "components/core";
import { UseTemplate, ViewEmailTemplate } from "components/dialogues";
import { useAuth, useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { MailTemplate } from "types";

const SavedTemplates = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isView, setIsView] = useState<{
    dialogue?: boolean;
    item?: any;
  }>({ dialogue: false, item: "" });
  const { change } = useChange();
  const { user } = useAuth();
  const [isUse, setIsUse] = useState(false);

  const links = [
    {
      id: 1,
      page: "Saved Templates",
      link: "/admin/templates/saved-templates",
    },
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
    pagination,
  } = useFetch<MailTemplate[]>(
    `mail-template?page=${pageNumber}&limit=10&userId=${user?.id}`
  );
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
          const res = await change(`mail-template?templateId=${id}`, {
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
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
    }
  };

  return (
    <PanelLayout title="Saved Templates ">
      <section className="px-8 py-4">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ViewEmailTemplate
              open={isView?.dialogue}
              handleClose={() => setIsView({ dialogue: false })}
              item={isView?.item}
            />
            <UseTemplate open={isUse} handleClose={() => setIsUse(false)} />
            <div className="md:w-auto w-full">
              <AdminBreadcrumbs links={links} />
            </div>
            <div className="flex justify-between items-center">
              <h1 className="text-theme font-semibold mt-4 text-lg">
                Saved Templates
              </h1>
              <Link href="/admin/templates/create-template">
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  className="!bg-theme"
                >
                  Add Template
                </Button>
              </Link>
            </div>
            {template?.length ? (
              <Grid container spacing={1.5} marginTop={0.5}>
                {template?.map((item) => (
                  <Grid key={item?.id} item lg={2.4}>
                    <div className="relative h-52 hover:scale-105 transition-all ease-in-out duration-200 bg-gradient-to-br border-blue-400 from-blue-300 to-blue-100 rounded-md w-full border-[1px] p-4 flex flex-col justify-between items-center">
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
                            setIsView({ dialogue: true, item: item })
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
            ) : (
              <LoaderAnime text="No Saved Templates" />
            )}
            <section className="mb-6">
              {Math.ceil(
                Number(pagination?.total || 1) / Number(pagination?.limit || 1)
              ) > 1 ? (
                <div className="flex justify-center md:py-8 py-4">
                  <Stack spacing={2}>
                    <Pagination
                      count={Math.ceil(
                        Number(pagination?.total || 1) /
                          Number(pagination?.limit || 1)
                      )}
                      onChange={(e, v: number) => {
                        setPageNumber(v);
                      }}
                      page={pageNumber}
                      variant="outlined"
                    />
                  </Stack>
                </div>
              ) : null}
            </section>
          </>
        )}
      </section>
    </PanelLayout>
  );
};

export default SavedTemplates;
