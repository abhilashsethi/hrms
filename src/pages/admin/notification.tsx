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
import { useAuth, useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import Swal from "sweetalert2";
import { NotificationData } from "types";

const Notification = () => {
  const [notification, setNotification] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<NotificationData>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { user } = useAuth();
  const { change } = useChange();
  const {
    data: notificationData,
    pagination,
    isLoading,
    mutate,
  } = useFetch<NotificationData[]>(
    `notifications?page=${pageNumber}&limit=10&userId=${user?.id}`
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
          mutate();
          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteAll = (id?: string) => {
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
          Swal.fire(`Info`, "It will take some time", "info");
          const res = await change(`notifications//delete-all`, {
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
          mutate();
          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleReadAll = (id?: string) => {
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
          Swal.fire(`Info`, "It will take some time", "info");
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
          mutate();
          return;
        }
      });
    } catch (error) {
      console.log(error);
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
      mutate();
      return;
    } catch (error) {
      console.log(error);
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
                <div className="flex py-4 justify-end gap-4">
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
                {notificationData?.length ? (
                  notificationData?.map((item, index) => (
                    <>
                      <div
                        key={item?.id}
                        className={`flex hover:scale-105 cursor-pointer transition duration-500 ease-in-out my-4 shadow-md gap-6 rounded-lg overflow-hidden ${
                          item?.readStatus ? "bg-white" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className={`flex flex-1 flex-col p-4 border-l-8 
                      ${borderColors[index % borderColors.length]}`}
                          onClick={() => {
                            setNotification(true),
                              setNotificationMsg(item),
                              handleRead(item?.id);
                          }}
                        >
                          <span className="text-2xl">{item?.title}</span>
                          <span className="text-xs">
                            {item?.description?.length > 150
                              ? item?.description?.slice(0, 150) + "..."
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
                            <IconButton onClick={() => handleDelete(item?.id)}>
                              <DeleteRounded />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    </>
                  ))
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
  // Add more border color classes as needed
];
