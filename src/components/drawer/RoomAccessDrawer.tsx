import { MeetingRoomRounded } from "@mui/icons-material";
import { Button, Container, Drawer } from "@mui/material";
import { ReverseIOSSwitch } from "components/core";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useFetch } from "hooks";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  cardId?: string | null;
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

const RoomAccessDrawer = ({ open, onClose, cardId }: Props) => {
  const { data: accessData } = useFetch(`cards/${cardId}`);
  console.log(accessData);
  // const [items, setItems] = useState([]);
  // useEffect(() => {
  //   let reqData = rooms?.map(item => ...items, accessData.includes() )
  // }, []);

  const classes = useStyles();
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container style={{ marginTop: "1rem" }} className={classes.container}>
          <h1 className="md:text-lg text-sm font-bold text-theme flex gap-3 items-center pb-4">
            <MeetingRoomRounded />
            ROOM ACCESS
          </h1>
          <div className="flex flex-col gap-3 mt-4 md:text-base text-sm w-[20rem]">
            {rooms?.map((item) => (
              <div
                key={item?.id}
                className="flex justify-between items-center w-4/5"
              >
                <p className="font-semibold">{item?.value}</p>
                <ReverseIOSSwitch />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <Button variant="contained" className="!bg-emerald-600">
              SAVE CHANGES
            </Button>
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default RoomAccessDrawer;
