import { Box, Typography, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import PersonalInfo from "./PersonalInfo";
import BankInfo from "./BankInfo";
import Education from "./Education";
import AttendanceCard from "./AttendanceCard";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProfileTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className="!bg-white !rounded-md !shadow-md"
        >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Attendance" {...a11yProps(1)} />
          <Tab label="Projects" {...a11yProps(2)} />
          <Tab label="Bank & Statutory" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PersonalInfo />
        <BankInfo />
        <Education />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AttendanceCard />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Two
      </TabPanel>
    </Box>
  );
}
