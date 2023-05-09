import React from "react";
import {
  AssignmentTurnedIn,
  BugReport,
  Edit,
  Favorite,
  SupportAgent,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Chip, Grid, Tab } from "@mui/material";

const ProjectTabs = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="w-full border-2 mt-8 rounded-md">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                sx={{ width: "33%" }}
                icon={<AssignmentTurnedIn fontSize="small" />}
                iconPosition="start"
                label="TASKS"
                value="1"
              />
              <Tab
                icon={<SupportAgent fontSize="small" />}
                iconPosition="start"
                sx={{ width: "33%" }}
                label="SUPPORT"
                value="2"
              />
              <Tab
                icon={<BugReport fontSize="small" />}
                iconPosition="start"
                sx={{ width: "33%" }}
                label="BUGS"
                value="3"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              nulla dolore possimus debitis nihil voluptatibus repudiandae,
              reprehenderit odio alias numquam, eaque veniam beatae? Adipisci
              molestias sed aliquid illo eum molestiae. Ea, voluptate tempore.
              Facere vero quaerat blanditiis, repellat fugit delectus.
            </div>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default ProjectTabs;
