import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { TechnologyGrid, TechnologyTable } from "components/admin/Technology";
import {
  AdminBreadcrumbs,
  FiltersContainer,
  GridAndList,
  HeadText,
  Loader,
  SkeletonLoader,
} from "components/core";
import { CreateTechnology } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";
import { User } from "types";

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
        <div className="flex justify-between">
          <AdminBreadcrumbs links={links} />
          {/* <HeadText title="ALL TECHNOLOGY" /> */}
          <div className="flex gap-4 items-center">
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
      </section>
    </PanelLayout>
  );
};

export default AllTechnologies;

const links = [
  { id: 1, page: "Technology", link: "/admin/technologies" },
  { id: 2, page: "All Technology", link: "/admin/technology/all-technologies" },
];
