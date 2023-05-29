import { Add, Close, FilterListRounded } from "@mui/icons-material";
import {
  Button,
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
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
  const [userName, setUsername] = useState<string | null>(null);
  const [isOrderBy, setIsOrderBy] = useState<string | null>(null);
  const [isGrid, setIsGrid] = useState(true);
  const [isCreate, setIsCreate] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const {
    data: tech,
    mutate,
    isLoading,
    pagination,
  } = useFetch<any[]>(
    `technologies?page=${pageNumber}&limit=8${
      userName ? `&name=${userName}` : ""
    }${isOrderBy ? `&orderBy=${isOrderBy}` : ""}`
  );
  return (
    <PanelLayout title="All Technologies - Admin Panel">
      <CreateTechnology
        open={isCreate}
        handleClose={() => setIsCreate(false)}
        mutate={mutate}
      />
      <section className="px-8 py-4">
        <div className="lg:flex justify-between">
          <AdminBreadcrumbs links={links} />
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
        <div>
          <div className="md:flex gap-4 justify-between w-full py-2">
            <div
              className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
            >
              <IconButton
                onClick={() => {
                  setIsOrderBy(null);
                  setUsername(null);
                }}
              >
                <Tooltip
                  title={
                    isOrderBy != null || userName != null
                      ? `Remove Filters`
                      : `Filter`
                  }
                >
                  {isOrderBy != null || userName != null ? (
                    <Close className={"!text-white"} />
                  ) : (
                    <FilterListRounded className={"!text-white"} />
                  )}
                </Tooltip>
              </IconButton>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <TextField
                fullWidth
                size="small"
                id="name"
                value={userName ? userName : ""}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Technology Name"
                name="name"
              />
              <TextField
                fullWidth
                select
                label="Ascending/Descending"
                size="small"
                value={isOrderBy ? isOrderBy : ""}
                onChange={(e) => setIsOrderBy(e?.target?.value)}
              >
                {short.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
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
        {tech?.length === 0 ? <LoaderAnime /> : null}
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
                page={pageNumber}
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
const short = [
  { id: 1, value: "name:asc", name: "Name Ascending" },
  { id: 2, value: "name:desc", name: "Name Descending" },
  { id: 3, value: "createdAt:asc", name: "CreatedAt Ascending" },
  { id: 4, value: "createdAt:desc", name: "CreatedAt Descending" },
];
