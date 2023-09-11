import { Add, GridViewRounded, TableRowsRounded } from "@mui/icons-material";
import { Button, IconButton, Pagination, Stack } from "@mui/material";
import { MyMeetingColumn, MyMeetingGrid } from "components/admin/meetings";
import {
  AdminBreadcrumbs,
  Loader,
  LoaderAnime,
  SkeletonLoader,
} from "components/core";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { MEETING_DATA } from "types";

const MyMeetings = () => {
  const { user } = useAuth();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isGrid, setIsGrid] = useState(true);
  const {
    data: meetingData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<MEETING_DATA[]>(
    `meetings?userId=${user?.id}&page=${pageNumber}&limit=6&orderBy=createdAt=asc`
  );
  return (
    <>
      <PanelLayout title="Meetings ">
        <section className="md:px-8 px-4">
          <div className="flex justify-between items-center py-4">
            <AdminBreadcrumbs links={links} />

            <div className="flex gap-4 items-center">
              <div className="flex gap-1">
                <IconButton onClick={() => setIsGrid(true)} size="small">
                  <div
                    className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
                      isGrid && `border-2 border-theme`
                    }`}
                  >
                    <GridViewRounded className={`${isGrid && `!text-theme`}`} />
                  </div>
                </IconButton>
                <IconButton onClick={() => setIsGrid(false)} size="small">
                  <div
                    className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
                      !isGrid && `border-2 border-theme`
                    }`}
                  >
                    <TableRowsRounded
                      className={`${!isGrid && `!text-theme`}`}
                    />
                  </div>
                </IconButton>
              </div>
              <Link href={"/admin/meetings/create-meeting"}>
                <Button
                  variant="contained"
                  className="!bg-theme"
                  startIcon={<Add />}
                >
                  CREATE MEETINGS
                </Button>
              </Link>
            </div>
          </div>

          {isGrid ? (
            <>
              {isLoading && <SkeletonLoader />}
              <MyMeetingGrid data={meetingData} mutate={mutate} />
            </>
          ) : (
            <>
              {isLoading && <Loader />}
              <MyMeetingColumn data={meetingData} mutate={mutate} />
            </>
          )}
          {meetingData?.length === 0 ? (
            <LoaderAnime text="No Meetings Available" />
          ) : null}

          <section className="mb-6">
            {Math.ceil(
              Number(pagination?.total || 1) / Number(pagination?.limit || 1)
            ) > 1 ? (
              <div className="flex justify-center md:py-8 py-4">
                <Stack spacing={2}>
                  <Pagination
                    count={Math.ceil(
                      Number(pagination?.total || 1) /
                        Number(pagination?.limit || 1)
                    )}
                    onChange={(e, v: number) => {
                      setPageNumber(v);
                    }}
                    page={pageNumber}
                    variant="outlined"
                  />
                </Stack>
              </div>
            ) : null}
          </section>
        </section>
      </PanelLayout>
    </>
  );
};

export default MyMeetings;

const links = [
  { id: 2, page: "My Meetings", link: "/admin/meetings/my-meetings" },
];
