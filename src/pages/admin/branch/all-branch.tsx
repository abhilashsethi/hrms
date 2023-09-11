import {
  Add,
  Close,
  FilterListRounded,
  GridViewRounded,
  TableRowsRounded,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { AllBranchColumn, AllBranchGrid } from "components/admin/branch";
import {
  AdminBreadcrumbs,
  Loader,
  LoaderAnime,
  SkeletonLoader,
} from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";
import { Branch } from "types";

const AllBranch = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [userName, setUsername] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [isOrderBy, setIsOrderBy] = useState<string | null>(null);

  const {
    data: branchData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<Branch[]>(
    `branches?page=${pageNumber}&limit=8${userName ? `&name=${userName}` : ""}${
      location ? `&location=${location}` : ""
    }${isOrderBy ? `&orderBy=${isOrderBy}` : ""}`
  );

  console.log(branchData);

  return (
    <PanelLayout title="All Branches">
      <section className="lg:px-8 px-2 py-4">
        <div className="lg:flex justify-between items-center py-4">
          <AdminBreadcrumbs links={links} />
          <div className="md:flex gap-4 items-center">
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
                  <TableRowsRounded className={`${!isGrid && `!text-theme`}`} />
                </div>
              </IconButton>
            </div>
            <Link href="/admin/branch/create-branch">
              <Button
                variant="contained"
                className="!bg-theme"
                startIcon={<Add />}
              >
                CREATE BRANCH
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <div className="md:flex gap-4 justify-between w-full py-2">
            <div
              className={`w-10 mb-2 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
            >
              <IconButton
                onClick={() => {
                  setIsOrderBy(null);
                  setUsername(null);
                  setLocation(null);
                }}
              >
                <Tooltip
                  title={
                    isOrderBy != null || userName != null || location != null
                      ? `Remove Filters`
                      : `Filter`
                  }
                >
                  {isOrderBy != null || userName != null || location != null ? (
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
                onChange={(e) => {
                  setPageNumber(1), setUsername(e.target.value);
                }}
                placeholder="Branch Name"
                name="name"
              />
              <TextField
                fullWidth
                size="small"
                id="name"
                value={location ? location : ""}
                onChange={(e) => {
                  setPageNumber(1), setLocation(e.target.value);
                }}
                placeholder="Branch Location"
                name="name"
              />
              <TextField
                fullWidth
                select
                label="Ascending/Descending"
                size="small"
                value={isOrderBy ? isOrderBy : ""}
                onChange={(e) => {
                  setPageNumber(1), setIsOrderBy(e?.target?.value);
                }}
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
            <AllBranchGrid data={branchData} mutate={mutate} />
          </>
        ) : (
          <>
            {isLoading && <Loader />}
            <AllBranchColumn data={branchData} mutate={mutate} />
          </>
        )}
        {branchData?.length === 0 ? <LoaderAnime /> : null}
        {Math.ceil(
          Number(pagination?.total || 1) / Number(pagination?.limit || 1)
        ) > 1 ? (
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
                page={pageNumber}
              />
            </Stack>
          </div>
        ) : (
          ""
        )}
      </section>
    </PanelLayout>
  );
};

export default AllBranch;

const links = [
  { id: 1, page: "Branch", link: "/admin/branch" },
  {
    id: 2,
    page: "All Branch",
    link: "/admin/branch/all-branch",
  },
];
const short = [
  { id: 1, value: "name:asc", name: "Name Ascending" },
  { id: 2, value: "name:desc", name: "Name Descending" },
  { id: 3, value: "createdAt:asc", name: "CreatedAt Ascending" },
  { id: 4, value: "createdAt:desc", name: "CreatedAt Descending" },
];
