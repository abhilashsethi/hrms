import { makeStyles } from "@material-ui/core";
import { Add, Close, Delete } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  Drawer,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Loader, LoaderAnime } from "components/core";
import AddMeetingNotes from "components/dialogues/AddMeetingNotes";
import { useAuth, useChange } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";

type Props = {
  open?: boolean;
  onClose: () => void;
  ticket?: any;
  meetingDetails: any;
  isLoading?: boolean;
  mutate: () => void;
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "50vw",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "80vw",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "30vw",
    },
  },
}));

const ViewNotesDrawer = ({
  open,
  onClose,
  meetingDetails,
  mutate,
  isLoading,
}: Props) => {
  const { user } = useAuth();

  const [editDetails, setEditDetails] = useState<boolean>(false);
  const classes = useStyles();

  return (
    <>
      <AddMeetingNotes
        open={editDetails}
        handleClose={() => setEditDetails(false)}
        details={meetingDetails}
        mutate={mutate}
      />

      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container style={{ marginTop: "1rem" }} className={classes.container}>
          <div className="flex items-center justify-between pb-4">
            <p className="text-lg font-bold text-theme">View All Notes</p>
            {user?.role?.name === "CEO" ||
            user?.role?.name === "PROJECT MANAGER" ? (
              <div className="flex ">
                <Button
                  variant="contained"
                  className="!bg-blue-500 "
                  startIcon={<Add />}
                  size="small"
                  onClick={() => setEditDetails((prev) => !prev)}
                >
                  Add Notes
                </Button>
                <IconButton onClick={() => onClose()}>
                  <Close
                    fontSize="small"
                    className="text-red-500 block md:hidden"
                  />
                </IconButton>
              </div>
            ) : null}
          </div>

          {isLoading && <Loader />}
          <div className="mt-4 flex flex-col gap-4">
            <div className="">
              {meetingDetails?.notes?.length ? (
                meetingDetails?.notes?.map((item: any, i: any) => {
                  console.log(item);
                  return (
                    <div
                      key={i}
                      className="w-full relative rounded-l-xl shadow-xl px-2 py-2 bg-gradient-to-r from-rose-100 to-teal-100 mb-8"
                    >
                      <div className="absolute -top-4"></div>
                      <div className="mt-7">
                        <div className="md:flex w-full grid md:justify-between items-center gap-5">
                          <img
                            className="h-20 w-20 "
                            src={"/writing.png"}
                            alt=""
                          />
                          <div className="">
                            <p className="font-semibold">
                              Notes :{" "}
                              <span className="text-sm text-gray-600">
                                {item?.text}
                              </span>
                              <span className="font-semibold text-sm text-gray-500">
                                {/* {item?.name} */}
                              </span>
                            </p>
                            <p className="font-semibold">
                              Added By :{" "}
                              <span className="font-semibold text-sm text-gray-500">
                                {item?.addedBy?.name}
                              </span>
                            </p>

                            <p className="font-semibold">
                              Note Link :{" "}
                              <a
                                className="text-sm font-medium text-blue-500 underline"
                                href={`${item?.link}`}
                              >
                                Note Link
                              </a>
                            </p>
                          </div>
                          <Tooltip title="Details">
                            <div
                            //   onClick={() =>
                            //     setIsPreview({
                            //       dialogue: true,
                            //       title: "Doc 53426",
                            //     })
                            //   }
                            >
                              <div className="w-24 rounded-full group flex justify-start items-center hover:scale-105 ease-in-out transition-all duration-400 cursor-pointer !text-blue-600 flex-col gap-2">
                                {item?.img}
                              </div>
                            </div>
                          </Tooltip>
                        </div>

                        {user?.role?.name === "CEO" ||
                        user?.role?.name === "PROJECT MANAGER" ? (
                          <div className="flex justify-end">
                            <DeleteButton
                              meetingId={meetingDetails?.id}
                              id={item?.id}
                              mutate={mutate}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })
              ) : (
                <LoaderAnime />
              )}
            </div>
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default ViewNotesDrawer;

interface ButtonProps {
  id?: string | null | undefined;
  mutate?: any;
  meetingId?: any;
}

const DeleteButton = ({ id, mutate, meetingId }: ButtonProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const handleDelete = (meetingId: any, id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      try {
        setLoading(true);
        if (result.isConfirmed) {
          const response = await change(`meetings/remove-notes/${meetingId}`, {
            method: "DELETE",
            body: {
              notes: [`${id}`],
            },
          });
          setLoading(false);
          if (response?.status !== 200) {
            Swal.fire("Error", "Something went wrong!", "error");
          }
          mutate();
          Swal.fire("Success", "Deleted successfully!", "success");
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    });
  };
  return (
    <Button
      onClick={() => {
        // setActiveId(item?.id);
        handleDelete(meetingId, id);
      }}
      disabled={loading}
      variant="contained"
      className="!bg-red-500 text-xs"
      startIcon={loading ? <CircularProgress size={20} /> : <Delete />}
      size="small"
    >
      DELETE
    </Button>
  );
};
