import { Add, GridViewRounded, TableRowsRounded } from "@mui/icons-material";
import {
  Button,
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import {
  AllDepartmentColumn,
  AllDepartmentGrid,
} from "components/admin/department";
import {
  AdminBreadcrumbs,
  FiltersContainer,
  Loader,
  LoaderAnime,
} from "components/core";
import { CreateDepartment } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import { Role } from "types";

const AllDepartment = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [isCreate, setIsCreate] = useState(false);
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [userName, setUsername] = useState<string | null>(null);
  const [isOrderBy, setIsOrderBy] = useState<string | null>(null);

  const {
    data: departmentData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<Role[]>(
    `departments?page=${pageNumber}&limit=8${
      userName ? `&name=${userName}` : ""
    }${isOrderBy ? `&orderBy=${isOrderBy}` : ""}`
  );

  return (
    <PanelLayout title="All Departments - Admin Panel">
      <section className="px-8 py-4">
        <CreateDepartment
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
              CREATE DEPARTMENT
            </Button>
          </div>
        </div>
        <div>
          <FiltersContainer
            changes={() => {
              setIsOrderBy(null);
              setUsername(null);
            }}
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <TextField
                fullWidth
                size="small"
                id="name"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Client Name"
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
          </FiltersContainer>
        </div>
        {isGrid ? (
          <>
            {isLoading && <Loader />}
            <AllDepartmentGrid data={departmentData} mutate={mutate} />
          </>
        ) : (
          <>
            {isLoading && <Loader />}
            <AllDepartmentColumn data={departmentData} mutate={mutate} />
          </>
        )}
        {!departmentData?.length && <LoaderAnime />}
        {departmentData?.length ? (
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
        ) : (
          ""
        )}
      </section>
    </PanelLayout>
  );
};

export default AllDepartment;

const links = [
  { id: 1, page: "Department", link: "/admin/department" },
  {
    id: 2,
    page: "All Department",
    link: "/admin/department/all-department",
  },
];
const short = [
  { id: 1, value: "name:asc", name: "Name Ascending" },
  { id: 2, value: "name:desc", name: "Name Descending" },
  { id: 3, value: "createdAt:asc", name: "CreatedAt Ascending" },
  { id: 4, value: "createdAt:desc", name: "CreatedAt Descending" },
];
