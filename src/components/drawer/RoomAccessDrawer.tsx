import { Done, MeetingRoomRounded } from "@mui/icons-material";
import { Button, CircularProgress, Container, Drawer } from "@mui/material";
import { ReverseIOSSwitch } from "components/core";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useAuth, useChange, useFetch } from "hooks";
import Swal from "sweetalert2";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  cardId?: string | null;
  mutate?: any;
};
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "70%",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "100%",
    },
  },
}));

const rooms = [
  { id: 1, value: "MainDoor" },
  { id: 2, value: "OutdoorMeetingRoom" },
  { id: 3, value: "IndoorMeetingRoom" },
  { id: 4, value: "DirectorChamber" },
  { id: 5, value: "Cafeteria" },
  { id: 6, value: "Playroom" },
];

const RoomAccessDrawer = ({ open, onClose, cardId, mutate }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const { user } = useAuth();
  const { data: accessData, isLoading } = useFetch<any>(`cards/${cardId}`);
  const classes = useStyles();
  const [items, setItems] = useState<any>([]);
  useEffect(() => {
    let reqData: any = rooms?.map((item) => {
      return {
        ...item,
        isAccess: accessData?.accessTo?.includes(item?.value) ? true : false,
      };
    });
    setItems(reqData);
  }, [accessData]);
  const handleChange = (e: any, value: any) => {
    setItems((prev: any[]) => {
      return prev.map((item: any) => {
        if (item?.value === value) {
          return {
            ...item,
            isAccess: e?.target?.checked,
          };
        }
        return item;
      });
    });
  };

  const handleSubmit = async () => {
    let reqData = items?.filter((data: any) => data?.isAccess);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to change room access?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const res = await change(`cards/${cardId}`, {
            method: "PATCH",
            body: { accessTo: reqData?.map((data: any) => data?.value) },
          });
          setLoading(false);
          mutate();
          if (res?.status !== 200) {
            Swal.fire(`Error`, "Something went wrong!", "error");
            return;
          }
          Swal.fire(`Success`, "Room access changed successfully!", "success");
          onClose();
          return;
        }
      });
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
      <Container style={{ marginTop: "1rem" }} className={classes.container}>
        <h1 className="md:text-lg text-sm font-bold text-theme flex gap-3 items-center pb-4">
          <MeetingRoomRounded />
          ROOM ACCESS
        </h1>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="flex flex-col gap-3 mt-4 md:text-base text-sm w-[20rem]">
              {items?.map((item: any) => (
                <div
                  key={item?.id}
                  className="flex justify-between items-center w-4/5"
                >
                  <p className="font-semibold">{item?.value}</p>
                  <ReverseIOSSwitch
                    checked={item?.isAccess}
                    disabled={
                      user?.role?.name == "CEO" ||
                      user?.role?.name == "COO" ||
                      user?.role?.name == "DIRECTOR"
                        ? false
                        : true
                    }
                    onChange={(e) => handleChange(e, item?.value)}
                  />
                </div>
              ))}
            </div>
            {user?.role?.name == "CEO" ||
            user?.role?.name == "COO" ||
            user?.role?.name == "DIRECTOR" ? (
              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => handleSubmit()}
                  disabled={loading}
                  variant="contained"
                  className="!bg-emerald-600"
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <Done />
                  }
                >
                  SAVE CHANGES
                </Button>
              </div>
            ) : null}
          </>
        )}
      </Container>
    </Drawer>
  );
};

export default RoomAccessDrawer;
