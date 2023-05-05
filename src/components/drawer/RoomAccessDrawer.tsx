import { MeetingRoomRounded, PeopleRounded } from "@mui/icons-material";
import { Container, Drawer } from "@mui/material";
import { IOSSwitch } from "components/core";

type Props = {
  open?: boolean | any;
  onClose: () => void;
};

const RoomAccessDrawer = ({ open, onClose }: Props) => {
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container
          style={{
            width: "30vw",
            marginTop: "3.5vh",
          }}
        >
          <p className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
            <MeetingRoomRounded />
            ROOM ACCESS
          </p>
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex justify-between items-center w-4/5">
              <p className="font-semibold">Meeting Room</p>
              <IOSSwitch />
            </div>
            <div className="flex justify-between items-center w-4/5">
              <p className="font-semibold">Outside Meeting Room</p>
              <IOSSwitch />
            </div>
            <div className="flex justify-between items-center w-4/5">
              <p className="font-semibold">Director Room</p>
              <IOSSwitch />
            </div>
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default RoomAccessDrawer;

const cards = [1, 2, 3, 4];
