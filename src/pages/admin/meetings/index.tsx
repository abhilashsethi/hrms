import {
  AssignmentTurnedIn,
  ContactPhone,
  PendingActions,
} from "@mui/icons-material";
import {
  MEETINGICON,
  MEETINGICON2,
  MEETINGICON3,
} from "assets/dashboard_Icons";
import { MeetingAnalytics, MeetingDonutChart } from "components/analytics";
import { DashboardCard } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";

const Meetings = () => {
  const { data: meetingData, mutate } = useFetch<any>(
    `meetings/dashboard/details`
  );

  const cards = [
    {
      id: 1,
      icon: <ContactPhone className="text-theme" />,
      count: meetingData?.totalMeetings ? meetingData?.totalMeetings : 0,
      title: "Total Meetings",
      img: MEETINGICON.src,
      bg: "from-blue-500 to-blue-300",
      link: "/admin/meetings/all-meetings",
    },
    {
      id: 2,
      icon: <PendingActions className="text-theme" />,
      count: meetingData?.meetingStatusList.length
        ? meetingData?.meetingStatusList
            ?.filter((item: any) => item?.status === "Ongoing")
            ?.map((item: any) => (item?._count ? item?._count : 0))
        : 0,
      title: "Ongoing Meetings",
      bg: "from-yellow-500 to-yellow-300",
      img: MEETINGICON2.src,
      link: "/admin/meetings/all-meetings",
    },
    {
      id: 3,
      icon: <AssignmentTurnedIn className="text-theme" />,
      count: meetingData?.meetingStatusList.length
        ? meetingData?.meetingStatusList
            ?.filter((item: any) => item?.status === "Closed")
            ?.map((item: any) => (item?._count ? item?._count : 0))
        : 0,
      title: "Closed Meetings",
      bg: "from-emerald-500 to-emerald-300",
      img: MEETINGICON3.src,
      link: "/admin/meetings/all-meetings",
    },
  ];

  return (
    <PanelLayout title="Meetings ">
      <div>
        <div className="flex gap-2 px-2 py-4">
          <DashboardCard data={cards} />
        </div>
        <div className="grid grid-cols-12 content-between gap-6 px-2 !mb-6">
          <div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
            <p className="font-bold text-lg text-center">Meeting Overview</p>
            <MeetingAnalytics
              series={[
                {
                  name: "Total Meetings",
                  type: "column",
                  data: meetingData?.meetingCountsMonthWise
                    ? meetingData?.meetingCountsMonthWise?.map(
                        (item: any) => item?.count
                      )
                    : [],
                },
                {
                  name: "Closed Meetings",
                  type: "area",
                  data: meetingData?.closedMeetingCountsMonthWise
                    ? meetingData?.closedMeetingCountsMonthWise?.map(
                        (item: any) => item?.count
                      )
                    : [],
                },
              ]}
              labels={
                meetingData?.meetingCountsMonthWise
                  ? meetingData?.meetingCountsMonthWise?.map(
                      (item: any) => item?.month
                    )
                  : []
              }
              text=""
              type="line"
            />
          </div>
          <div className="col-span-12 pt-9 py-4 bg-white w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
            <p className="font-bold text-lg text-center">Meeting Details</p>
            <MeetingDonutChart
              text=""
              type="donut"
              labels={
                meetingData?.meetingStatusList?.length
                  ? meetingData?.meetingStatusList?.map(
                      (item: any) => item?.status
                    )
                  : []
              }
              series={
                meetingData?.meetingStatusList?.length
                  ? meetingData?.meetingStatusList?.map(
                      (item: any) => item?._count
                    )
                  : []
              }
            />
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

export default Meetings;
