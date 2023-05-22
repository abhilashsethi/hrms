import { Add } from "@mui/icons-material";
import { Button, Pagination, Stack } from "@mui/material";
import { TechnologyGrid, TechnologyTable } from "components/admin/Technology";
import {
  AdminBreadcrumbs,
  GridAndList,
  Loader,
  LoaderAnime,
  SkeletonLoader,
} from "components/core";
import { CreateTechnology } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";

const AllTechnologies = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [isCreate, setIsCreate] = useState(false);
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const {
    data: tech,
    mutate,
    isLoading,
    pagination,
  } = useFetch<any[]>(`technologies?page=${pageNumber}&limit=8`);
  return (
    <PanelLayout title="All Technologies - HRMS Searchingyard">
      <CreateTechnology
        open={isCreate}
        handleClose={() => setIsCreate(false)}
        mutate={mutate}
      />
      <section className="px-8 py-4">
        <div className="lg:flex justify-between">
          <AdminBreadcrumbs links={links} />
          {/* <HeadText title="ALL TECHNOLOGY" /> */}
          <div className="md:flex gap-4 items-center">
            <GridAndList isGrid={isGrid} setIsGrid={setIsGrid} />
            <Button
              onClick={() => setIsCreate(true)}
              className="!bg-theme"
              variant="contained"
              startIcon={<Add />}
            >
              ADD TECHNOLOGY
            </Button>
          </div>
        </div>

        {isGrid ? (
          <>
            {isLoading && <SkeletonLoader />}
            <TechnologyGrid data={tech} mutate={mutate} />
          </>
        ) : (
          <>
            {isLoading && <Loader />}
            <TechnologyTable data={tech} mutate={mutate} />
          </>
        )}
        {!tech?.length && <LoaderAnime />}
        {tech?.length ? (
          <div className="flex justify-center py-8">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(
                  Number(pagination?.total || 1) /
                    Number(pagination?.limit || 1)
                )}
                onChange={(e, v: number) => {
                  setPageNumber(v);
                }}
                variant="outlined"
              />
            </Stack>
          </div>
        ) : null}
      </section>
    </PanelLayout>
  );
};

export default AllTechnologies;

const links = [
  { id: 1, page: "Technology", link: "/admin/technologies" },
  {
    id: 2,
    page: "All Technology",
    link: "/admin/technologies/all-technologies",
  },
];
