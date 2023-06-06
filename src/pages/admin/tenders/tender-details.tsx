import {
  Article,
  FileCopy,
  FindInPage,
  Print,
  Task,
  Timeline,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Tab } from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import {
  TenderDetail,
  TenderDocumentation,
  TenderLayout,
} from "components/tender";
import PanelLayout from "layouts/panel";
import moment from "moment";
import React from "react";

const TenderDetails = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const tenderSections = [
    {
      id: "1",
      title: "Details",
      icon: <Article />,
      component: <TenderDetail />,
    },
    {
      id: "2",
      title: "Documentation",
      icon: <FileCopy />,
      component: <TenderDocumentation />,
    },
    {
      id: "3",
      title: "Review",
      icon: <FindInPage />,
      component: <TenderDetail />,
    },
    {
      id: "4",
      title: "Submission",
      icon: <Task />,
      component: <TenderDetail />,
    },
    {
      id: "5",
      title: "Track",
      icon: <Timeline />,
      component: <TenderDetail />,
    },
  ];
  return (
    <PanelLayout title="Tender Details - Admin Panel">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <section className="mt-4">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  variant="fullWidth"
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  {tenderSections?.map((item) => (
                    <Tab
                      key={item?.id}
                      icon={item?.icon}
                      iconPosition="start"
                      label={item?.title}
                      value={item?.id}
                    />
                  ))}
                </TabList>
              </Box>
              {tenderSections?.map((item) => (
                <TabPanel value={item?.id}>{item?.component}</TabPanel>
              ))}
            </TabContext>
          </Box>
        </section>
      </section>
    </PanelLayout>
  );
};

export default TenderDetails;

const links = [
  { id: 1, page: "Tenders", link: "/admin/tenders/all-tenders" },
  {
    id: 2,
    page: "All Tenders",
    link: "/admin/tenders/all-tenders",
  },
];
