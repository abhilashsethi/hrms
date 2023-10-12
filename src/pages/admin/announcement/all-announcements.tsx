import {
  Add,
  Campaign,
  Check,
  DeleteRounded,
  InfoRounded,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  IconButton,
  Pagination,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  AdminBreadcrumbs,
  LoaderAnime,
  SkeletonLoaderAnnouncement,
} from "components/core";
import { NotificationInfo } from "components/dialogues";
import { useAuth, useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { Announcement } from "types";

const AllAnnouncement = () => {
  const [notification, setNotification] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<Announcement>();
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { change } = useChange();
  const { user } = useAuth();
  const router = useRouter();
  const {
    data: announcements,
    mutate,
    isLoading,
    pagination,
  } = useFetch<Announcement[]>(
    `announcement?page=${pageNumber}&limit=10&orderBy=createdAt:desc${
      user?.role?.name === "CEO" ||
      user?.role?.name === "DIRECTOR" ||
      user?.role?.name === "COO"
        ? ``
        : `&branchId=${user?.employeeOfBranchId}`
    }`
  );
  const handleSend = async (item: any) => {
    setLoading(true);
    try {
      const resData = {
        status: "Published",
      };
      const res = await change(`announcement/${item?.id}`, {
        body: resData,
      });

      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      mutate();
      Swal.fire(`Success`, `Sent successfully!`, `success`);
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
          Swal.fire({
            title: "Info",
            text: "It will take some time",
            icon: "info",
            showConfirmButton: false,
            timer: 1000,
          });
          const res = await change(`announcement/${id}`, {
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
    <>
      <PanelLayout title="Announcements">
        <NotificationInfo
          open={notification}
          handleClose={() => setNotification(false)}
          notificationMsg={notificationMsg}
        />
        <section className="md:px-8 px-4 md:py-8 py-4">
          <div className="md:flex justify-between">
            <div className="px-2 md:px-0">
              <AdminBreadcrumbs links={links} />
            </div>
            <Link href="/admin/announcement/create-announcement">
              <Button
                fullWidth
                className="!bg-theme"
                variant="contained"
                startIcon={<Add />}
              >
                ADD ANNOUNCEMENT
              </Button>
            </Link>
          </div>
          {isLoading ? (
            <SkeletonLoaderAnnouncement />
          ) : (
            <>
              <Container>
                {announcements?.length ? (
                  announcements?.map((item, index) => (
                    <div
                      key={item?.id}
                      className="flex transition duration-500 ease-in-out my-4 shadow-md gap-6 rounded-lg bg-gradient-to-r from-rose-100 to-teal-100 overflow-hidden "
                    >
                      <div
                        className={`flex flex-1 flex-col p-4 border-l-8
                       ${borderColors[index % borderColors.length]}
											 `}
                      >
                        <div className="md:flex justify-between items-center">
                          <span className="md:flex grid text-lg">
                            <Campaign className="text-theme mr-2" />
                            {item?.title}
                          </span>
                          <div className="flex gap-4 justify-end">
                            <span className="text-xs text-gray-500">
                              {moment(item?.createdAt).fromNow()}
                            </span>
                            <span className="text-xs text-gray-500">
                              {item?.status === "Published" ? (
                                "Published"
                              ) : (
                                <Button
                                  variant="contained"
                                  className="!bg-theme"
                                  onClick={() => handleSend(item)}
                                  disabled={loading}
                                  startIcon={
                                    loading ? (
                                      <CircularProgress
                                        color="secondary"
                                        size={20}
                                      />
                                    ) : (
                                      <Check />
                                    )
                                  }
                                >
                                  Send
                                </Button>
                              )}
                            </span>
                          </div>
                        </div>
                        {/* <span className="text-xs">{item?.desc}</span> */}
                      </div>

                      <div className="grid gap-5 grid-cols-2 px-4 items-center text-xs uppercase tracking-wide font-semibold">
                        <Tooltip title="Details">
                          <IconButton
                            onClick={() => {
                              setNotification(true), setNotificationMsg(item);
                            }}
                          >
                            <InfoRounded className="text-theme" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDelete(item?.id)}>
                            <DeleteRounded className="text-red-500" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  ))
                ) : (
                  <LoaderAnime text="No announcement at this time" />
                )}
                <section className="mb-6">
                  {Math.ceil(
                    Number(pagination?.total || 1) /
                      Number(pagination?.limit || 1)
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
              </Container>
            </>
          )}
        </section>
      </PanelLayout>
    </>
  );
};

export default AllAnnouncement;
const borderColors = [
  "border-violet-400",
  "border-green-400",
  "border-blue-400",
  "border-yellow-400",
  // Add more border color classes as needed
];
const links = [
  {
    id: 1,
    page: "All Announcement",
    link: "/admin/announcement/all-announcements",
  },
];
