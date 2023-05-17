import { MeetingRoomRounded } from "@mui/icons-material";
import { Button, Container, Drawer } from "@mui/material";
import { ReverseIOSSwitch } from "components/core";
import { makeStyles } from "@material-ui/core";

type Props = {
  open?: boolean | any;
  onClose: () => void;
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

const RoomAccessDrawer = ({ open, onClose }: Props) => {
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
            <div className="flex justify-between items-center w-4/5">
              <p className="font-semibold">Meeting Room</p>
              <ReverseIOSSwitch />
            </div>
            <div className="flex justify-between items-center w-4/5">
              <p className="font-semibold">Outside Meeting Room</p>
              <ReverseIOSSwitch />
            </div>
            <div className="flex justify-between items-center w-4/5">
              <p className="font-semibold">Director Room</p>
              <ReverseIOSSwitch />
            </div>
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

const cards = [1, 2, 3, 4];
