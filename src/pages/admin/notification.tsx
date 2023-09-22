import { DeleteRounded, InfoRounded } from "@mui/icons-material";
import {
  Button,
  Container,
  IconButton,
  Pagination,
  Stack,
  Tooltip,
} from "@mui/material";
import { Loader, LoaderAnime } from "components/core";
import { NotificationInfo } from "components/dialogues";
import { useAuth, useChange, useFetch, useNotificationData } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import Swal from "sweetalert2";
import { NotificationData } from "types";

const Notification = () => {
  const [notificationMsg, setNotificationMsg] = useState<NotificationData>();
  const [notification, setNotification] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { revalidateNotificationCount } = useNotificationData();
  const { change } = useChange();
  const { user } = useAuth();
  const {
    data: notificationData,
    pagination,
    isLoading,
    mutate,
  } = useFetch<NotificationData[]>(
    `notifications?page=${pageNumber}&limit=10&userId=${user?.id}&orderBy=createdAt:desc`
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
          Swal.fire({
            title: "Info",
            text: "It will take some time",
            icon: "info",
            showConfirmButton: false,
            timer: 1000,
          });
          const res = await change(`notifications/${id}`, {
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
          revalidateNotificationCount();
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
  const handleDeleteAll = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete all!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete all!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Info",
            text: "It will take some time",
            icon: "info",
            showConfirmButton: false,
            timer: 1500,
          });
          const res = await change(`notifications/delete-all`, {
            method: "DELETE",
            body: {
              userId: user?.id,
            },
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
          revalidateNotificationCount();
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
  const handleReadAll = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to read all!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, read all!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Info",
            text: "It will take some time",
            icon: "info",
            showConfirmButton: false,
            timer: 1500,
          });
          const res = await change(`notifications/read/all`, {
            method: "PUT",
            body: {
              userId: user?.id,
            },
          });

          if (res?.status !== 200) {
            Swal.fire(
              "Error",
              res?.results?.msg || "Something went wrong!",
              "error"
            );
            return;
          }
          revalidateNotificationCount();
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
  const handleRead = async (id?: string) => {
    try {
      const res = await change(`notifications/${id}`, {
        method: "PUT",
        body: {
          readStatus: true,
        },
      });
      if (res?.status !== 200) {
        Swal.fire(
          "Error",
          res?.results?.msg || "Something went wrong!",
          "error"
        );
        return;
      }
      revalidateNotificationCount();
      mutate();
      return;
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
      <PanelLayout title="Notification Requests ">
        <NotificationInfo
          open={notification}
          handleClose={() => setNotification(false)}
          notificationMsg={notificationMsg}
        />
        <section className="md:px-8 px-4 md:py-8 py-4">
          <Container>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {notificationData?.length ? (
                  <>
                    <div className="flex py-4 md:justify-end justify-center gap-4">
                      <Button
                        className="!bg-green-600 text-white font-semibold"
                        variant="contained"
                        onClick={() => handleReadAll()}
                      >
                        Read All
                      </Button>
                      <Button
                        className="!bg-red-600 text-white font-semibold"
                        variant="contained"
                        onClick={() => handleDeleteAll()}
                      >
                        Delete All
                      </Button>
                    </div>
                    {notificationData?.map((item, index) => (
                      <>
                        <div
                          key={item?.id}
                          className={`md:flex hover:scale-105 cursor-pointer transition duration-500 ease-in-out my-4 shadow-md gap-6 rounded-lg overflow-hidden ${
                            item?.readStatus ? "bg-white" : "bg-gray-200"
                          } border-l-8 
                      ${borderColors[index % borderColors.length]}`}
                        >
                          <div
                            className={`flex flex-1 flex-col p-4 `}
                            onClick={() => {
                              setNotification(true),
                                setNotificationMsg(item),
                                handleRead(item?.id);
                            }}
                          >
                            <span className="md:text-2xl text-lg">
                              {item?.title}
                            </span>
                            <span className="text-xs md:flex hidden">
                              {item?.description?.length > 150
                                ? item?.description?.slice(0, 150) + "..."
                                : item?.description}
                            </span>
                            <span className="text-xs md:hidden flex">
                              {item?.description?.length > 20
                                ? item?.description?.slice(0, 20) + "..."
                                : item?.description}
                            </span>
                          </div>

                          <div className="grid gap-5 grid-cols-2 px-4 items-center text-xs uppercase tracking-wide font-semibold">
                            <Tooltip title="Details">
                              <IconButton
                                onClick={() => {
                                  setNotification(true),
                                    setNotificationMsg(item),
                                    handleRead(item?.id);
                                }}
                              >
                                <InfoRounded />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                onClick={() => handleDelete(item?.id)}
                              >
                                <DeleteRounded />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  <LoaderAnime text="No notification at this time" />
                )}
              </>
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
          </Container>
        </section>
      </PanelLayout>
    </>
  );
};

export default Notification;
const borderColors = [
  "border-violet-400",
  "border-green-400",
  "border-blue-400",
  "border-yellow-400",
  "border-red-400",
  "border-gray-400",
  "border-pink-400",
  "border-cyan-400",
];
