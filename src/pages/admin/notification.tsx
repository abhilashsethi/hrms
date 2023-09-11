import { DeleteRounded, InfoRounded } from "@mui/icons-material";
import { Button, Container, IconButton, Tooltip } from "@mui/material";
import { LoaderAnime } from "components/core";
import { NotificationInfo } from "components/dialogues";
import PanelLayout from "layouts/panel";
import { useState } from "react";

const Notification = () => {
  const [notification, setNotification] = useState<boolean>(false);
  return (
    <>
      <PanelLayout title="Notification Requests ">
        <NotificationInfo
          open={notification}
          handleClose={() => setNotification(false)}
        />
        <section className="md:px-8 px-4 md:py-8 py-4">
          <Container>
            <div className="flex py-4 justify-end gap-4">
              <Button
                className="!bg-green-600 text-white font-semibold"
                variant="contained"
              >
                Read All
              </Button>
              <Button
                className="!bg-red-600 text-white font-semibold"
                variant="contained"
              >
                Delete All
              </Button>
            </div>
            {notice?.length ? (
              notice?.map((item, index) => (
                <div
                  key={item?.id}
                  className="flex hover:scale-105 transition duration-500 ease-in-out my-4 shadow-md gap-6 rounded-lg bg-white overflow-hidden "
                >
                  <div
                    className={`flex flex-1 flex-col p-4 border-l-8 
                      ${borderColors[index % borderColors.length]}`}
                  >
                    <span className="text-2xl">Success</span>
                    <span className="text-xs">{item?.desc}</span>
                  </div>

                  <div className="grid gap-5 grid-cols-2 px-4 items-center text-xs uppercase tracking-wide font-semibold">
                    <Tooltip title="Details">
                      <IconButton onClick={() => setNotification(true)}>
                        <InfoRounded />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                      //   onClick={handleClick}
                      >
                        <DeleteRounded />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              ))
            ) : (
              <LoaderAnime text="No notification at this time" />
            )}
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
  // Add more border color classes as needed
];
const notice = [
  {
    id: "01",
    desc: " Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ....",
  },
  {
    id: "02",
    desc: " Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ....",
  },
  {
    id: "03",
    desc: " Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ....",
  },
  {
    id: "04",
    desc: " Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ....",
  },
  {
    id: "02",
    desc: " Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ....",
  },
  {
    id: "03",
    desc: " Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ....",
  },
  {
    id: "04",
    desc: " Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ....",
  },
];
