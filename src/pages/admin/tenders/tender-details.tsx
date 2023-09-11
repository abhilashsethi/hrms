import {
  Article,
  FileCopy,
  FindInPage,
  Task,
  Timeline,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { AdminBreadcrumbs, Loader } from "components/core";
import {
  TenderDetail,
  TenderDocumentation,
  TenderReview,
  TenderSubmission,
  TenderTrack,
} from "components/tender";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import { Tender } from "types";

const TenderDetails = () => {
  const [value, setValue] = useState("1");
  const { user } = useAuth();
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const router = useRouter();
  const {
    data: tenderData,
    mutate,
    isLoading,
  } = useFetch<Tender>(`tenders/${router?.query?.id}`);
  const tenderSections = [
    {
      id: "1",
      title: "Details",
      icon: <Article />,
      component: (
        <TenderDetail
          mutate={mutate}
          isLoading={isLoading}
          tenderData={tenderData}
        />
      ),
    },
    {
      id: "2",
      title: "Documentation",
      icon: <FileCopy />,
      component: (
        <TenderDocumentation
          mutate={mutate}
          isLoading={isLoading}
          tenderData={tenderData}
        />
      ),
    },
    {
      id: "3",
      title: "Review",
      icon: <FindInPage />,
      component: (
        <TenderReview
          mutate={mutate}
          isLoading={isLoading}
          tenderData={tenderData}
        />
      ),
    },
    {
      id: "4",
      title: "Submission",
      icon: <Task />,
      component: (
        <TenderSubmission
          mutate={mutate}
          isLoading={isLoading}
          tenderData={tenderData}
        />
      ),
    },
    {
      id: "5",
      title: "Track",
      icon: <Timeline />,
      component: (
        <TenderTrack
          mutate={mutate}
          isLoading={isLoading}
          tenderData={tenderData}
        />
      ),
    },
  ];
  const links = [
    user?.role?.name === "CEO" ||
    user?.role?.name === "BID MANAGER" ||
    user?.role?.name === "DIRECTOR" ||
    user?.role?.name === "COO"
      ? { id: 2, page: "All Tenders", link: "/admin/tenders/all-tenders" }
      : {
          id: 2,
          page: "My Tenders",
          link: "/admin/tenders/my-tenders",
        },
  ];
  return (
    <PanelLayout title="Tender Details ">
      <section className="md:px-8 px-4 py-4">
        <AdminBreadcrumbs links={links} />
        <section className="mt-4">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  variant={"scrollable"}
                  scrollButtons={true}
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
              {tenderSections?.map((item, i) => (
                <TabPanel key={i} value={item?.id}>
                  {item?.component}
                </TabPanel>
              ))}
            </TabContext>
          </Box>
        </section>
      </section>
    </PanelLayout>
  );
};

export default TenderDetails;
