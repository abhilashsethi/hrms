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
import { AllRollColumn, AllRollGrid } from "components/admin/roles";
import { AdminBreadcrumbs, Loader, LoaderAnime } from "components/core";
import { CreateRole } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import { Role } from "types";
const AllRoles = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isGrid, setIsGrid] = useState(true);
  const [userName, setUsername] = useState<string | null>(null);
  const [isOrderBy, setIsOrderBy] = useState<string | null>(null);
  const [isCreate, setIsCreate] = useState(false);
  const {
    data: roleData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<Role[]>(
    `roles?page=${pageNumber}&limit=8${
      userName ? `&contains=${userName}` : ""
    }${isOrderBy ? `&orderBy=${isOrderBy}` : ""}`
  );
  return (
    <PanelLayout title="All Roles ">
      <section className="md:px-8 px-4 py-4">
        <CreateRole
          open={isCreate}
          handleClose={() => setIsCreate(false)}
          mutate={mutate}
        />

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
            <Button
              onClick={() => setIsCreate(true)}
              variant="contained"
              className="!bg-theme"
              startIcon={<Add />}
            >
              CREATE ROLE
            </Button>
          </div>
        </div>
        <div>
          <div className="md:flex grid gap-4 md:justify-between w-full py-2">
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
                onChange={(e) => {
                  setPageNumber(1), setUsername(e.target.value);
                }}
                placeholder="Role Name"
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
            {isLoading && <Loader />}
            <AllRollGrid data={roleData} mutate={mutate} />
          </>
        ) : (
          <>
            {isLoading && <Loader />}
            <AllRollColumn data={roleData} mutate={mutate} />
          </>
        )}
        {roleData?.length === 0 ? <LoaderAnime /> : null}
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

export default AllRoles;

const links = [
  { id: 1, page: "Roles", link: "/admin/roles" },
  {
    id: 2,
    page: "All Roles",
    link: "/admin/roles/all-roles",
  },
];
const short = [
  { id: 1, value: "name:asc", name: "Name Ascending" },
  { id: 2, value: "name:desc", name: "Name Descending" },
  { id: 3, value: "createdAt:desc", name: "CreatedAt Ascending" },
  { id: 4, value: "createdAt:asc", name: "CreatedAt Descending" },
];
