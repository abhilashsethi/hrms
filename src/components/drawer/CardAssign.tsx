import { AddCardRounded, QueryStats } from "@mui/icons-material";
import { Container, Drawer } from "@mui/material";
import { SAMPLEDP } from "assets/home";

type Props = {
  open?: boolean | any;
  onClose: () => void;
};

const CardAssign = ({ open, onClose }: Props) => {
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
            <AddCardRounded />
            Assign User
          </p>
          <span className="text-sm">
            Assign an user from the below list of users
          </span>
          <div className="mt-4 flex flex-col gap-3">
            <div className="w-full h-20 rounded-l-full shadow-md flex">
              <div className="w-1/5">
                <div className="h-20 w-20 border-2 rounded-full overflow-hidden">
                  <img
                    className="h-full object-cover"
                    src={SAMPLEDP.src}
                    alt=""
                  />
                </div>
              </div>
              <div className="w-4/5">
                <p>John Doe</p>
                <p></p>
              </div>
            </div>
            <div className="w-full h-20 rounded-l-full shadow-md">
              <div className="h-20 w-20 border-2 rounded-full overflow-hidden">
                <img
                  className="h-full object-cover"
                  src={SAMPLEDP.src}
                  alt=""
                />
              </div>
            </div>
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default CardAssign;
