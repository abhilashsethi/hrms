import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Container, Drawer } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { PhotoViewerSmall } from "components/core";
import moment from "moment";
import * as React from "react";

type Props = {
  open?: boolean | any;
  onClose: () => void;
};

const ChatSeen = ({ open, onClose }: Props) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container className="lg:w-[30vw] w-full mt-[3.5vh]">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Read By" value="1" />
                  <Tab label="Delivered to" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <ReadBy />
              </TabPanel>
              <TabPanel value="2">
                <DeliveredTo />
              </TabPanel>
            </TabContext>
          </Box>
        </Container>
      </Drawer>
    </>
  );
};

export default ChatSeen;

const ReadBy = () => {
  return (
    <div>
      {profiles?.map((item) => (
        <div key={item?.id} className="flex justify-between items-center">
          <div className="w-full hover:bg-slate-100 transition-all ease-in-out duration-200 cursor-pointer flex gap-3 items-center px-2 py-2">
            <PhotoViewerSmall
              name={item?.name}
              photo={item?.photo}
              size="2.9rem"
            />
            <div>
              <h1 className="text-sm font-semibold">{item?.name}</h1>
              <h1 className="text-xs text-gray-500">
                {moment(new Date()).format("lll")}
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const DeliveredTo = () => {
  return (
    <div>
      {profiles?.map((item) => (
        <div key={item?.id} className="flex justify-between items-center">
          <div className="w-full hover:bg-slate-100 transition-all ease-in-out duration-200 cursor-pointer flex gap-3 items-center px-2 py-2">
            <PhotoViewerSmall
              name={item?.name}
              photo={item?.photo}
              size="2.9rem"
            />
            <div>
              <h1 className="text-sm font-semibold">{item?.name}</h1>
              <h1 className="text-xs text-gray-500">
                {moment(new Date()).format("lll")}
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const profiles = [
  {
    id: 1,
    name: "Srinu Reddy",
    photo:
      "https://media.npr.org/assets/img/2022/11/08/ap22312071681283-0d9c328f69a7c7f15320e8750d6ea447532dff66-s1100-c50.jpg",
  },
  {
    id: 2,
    name: "Abhilash Kumar",
  },
  {
    id: 3,
    name: "Loushik Kumar",
    photo:
      "https://www.bollywoodhungama.com/wp-content/uploads/2023/01/Hrithik-Roshan-opens-up-about-620.jpg",
  },
];