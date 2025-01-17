import { SyntheticEvent, useEffect, useState } from "react";
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
import { Projects } from "types";
import { useAuth } from "hooks";
interface Props {
  projectId?: any;
}
type Orientation = "horizontal" | "vertical"; // Define the custom type
const ProjectTabs = ({ projectId }: Props) => {
  const { user } = useAuth();
  const [value, setValue] = useState(`${user?.isClient ? `2` : `1`}`);
  const [orientation, setOrientation] = useState<Orientation>("horizontal");
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Check screen width and set orientation
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setOrientation("vertical");
      } else {
        setOrientation("horizontal");
      }
    };

    handleResize(); // Set initial orientation
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full border-2 mt-8 rounded-md">
      <div>
        <TabContext value={value}>
          <Box sx={{ borderColor: "divider" }}>
            <TabList
              orientation={orientation}
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              {user?.isClient ? null : (
                <Tab
                  sx={{ width: "30%" }}
                  icon={<AssignmentTurnedIn fontSize="small" />}
                  iconPosition="start"
                  label="TASKS"
                  value="1"
                />
              )}
              {user?.role?.name === "DEVELOPER" ||
              user?.role?.name === "TESTER" ? null : (
                <Tab
                  icon={<SupportAgent fontSize="small" />}
                  iconPosition="start"
                  sx={{ width: "30%" }}
                  label="SUPPORT"
                  value="2"
                />
              )}
              {user?.isClient ? null : (
                <Tab
                  icon={<BugReport fontSize="small" />}
                  iconPosition="start"
                  sx={{ width: "30%" }}
                  label="BUGS"
                  value="3"
                />
              )}
            </TabList>
          </Box>

          <TabPanel value="1">
            <ProjectTasks />
          </TabPanel>
          <TabPanel value="2">
            <ProjectSupport />
          </TabPanel>
          <TabPanel value="3">
            <ProjectBugs projectId={projectId} />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default ProjectTabs;
