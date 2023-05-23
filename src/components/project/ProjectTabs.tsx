import React from "react";
import {
  AssignmentTurnedIn,
  BugReport,
  SupportAgent,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import ProjectTasks from "./ProjectTasks";
import ProjectSupport from "./ProjectSupport";
import ProjectBugs from "./ProjectBugs";

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
            <ProjectTasks />
          </TabPanel>
          <TabPanel value="2">
            <ProjectSupport />
          </TabPanel>
          <TabPanel value="3">
            <ProjectBugs />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default ProjectTabs;
