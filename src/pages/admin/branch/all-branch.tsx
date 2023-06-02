import { Add, Close, FilterListRounded, GridViewRounded, TableRowsRounded } from "@mui/icons-material";
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
  AllDepartmentColumn,
  AllDepartmentGrid,
} from "components/admin/department";
import {
  AdminBreadcrumbs,
  Loader,
  LoaderAnime,
} from "components/core";
import { CreateDepartment } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import { Role } from "types";

const AllBranch = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [isCreate, setIsCreate] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [userName, setUsername] = useState<string | null>(null);
  const [isOrderBy, setIsOrderBy] = useState<string | null>(null);

  const {
    data: departmentData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<any>(
    `departments?page=${pageNumber}&limit=8${userName ? `&contains=${userName}` : ""
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
                  className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${isGrid && `border-2 border-theme`
                    }`}
                >
                  <GridViewRounded className={`${isGrid && `!text-theme`}`} />
                </div>
              </IconButton>
              <IconButton onClick={() => setIsGrid(false)} size="small">
                <div
                  className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${!isGrid && `border-2 border-theme`
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
              CREATE BRANCH
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
                <Tooltip title={isOrderBy != null || userName != null ? `Remove Filters` : `Filter`}>
                  {isOrderBy != null || userName != null ? <Close className={'!text-white'} /> : <FilterListRounded className={"!text-white"} />}
                </Tooltip>
              </IconButton>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <TextField
                fullWidth
                size="small"
                id="name"
                value={userName ? userName : ""}
                onChange={(e) => {setPageNumber(1), setUsername(e.target.value)}}
                placeholder="Branch Name"
                name="name"
              />
              <TextField
                fullWidth
                select
                label="Ascending/Descending"
                size="small"
                value={isOrderBy ? isOrderBy : ""}
                onChange={(e) => {setPageNumber(1), setIsOrderBy(e?.target?.value)}}
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
            <AllBranchGrid data={branchData} mutate={mutate} />
          </>
        ) : (
          <>
            {isLoading && <Loader />}
            <AllBranchColumn data={branchData} mutate={mutate} />
          </>
        )}
        {/* {branchData?.length === 0 ? <LoaderAnime /> : null}
        {Math.ceil(
          Number(pagination?.total || 1) /
          Number(pagination?.limit || 1)
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
        )} */}
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

const branchData =[{
  id: "01",
  name: "Searching Yard 1",
  photos: [
    {
      i: 1, 
      photo:"https://images.unsplash.com/photo-1428366890462-dd4baecf492b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
    },
    {
      i: 2, 
      photo:"https://images.unsplash.com/photo-1428366890462-dd4baecf492b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
    },
    {
      i: 3, 
      photo:"https://images.unsplash.com/photo-1428366890462-dd4baecf492b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
    },
  ],
  location: "Cuttack, 754008, Odisha,",
  phone: "2131335465",
  email: "workspace1@yard.com",
  country: "India",
  manager: "Abhilash",
  managerPhoto: "photo",
},
{
  id: "02",
  name: "Searching Yard 2",
  photos: [
    {
      i: 1, 
      photo: "https://images.unsplash.com/photo-1550136513-548af4445338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80",
    },
    {
      i: 2, 
      photo:"https://images.unsplash.com/photo-1428366890462-dd4baecf492b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
    },
    {
      i: 3, 
      photo: "https://images.unsplash.com/photo-1576731753569-3e93a228048c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
  ],
  location: "Bhubaneswar, 751024, Odisha,",
  email: "workspace2@yard.com",
  country: "India",
  phone: "2131335465",
  manager: "Ashutosh",
  managerPhoto: "photo",

},
{
  id: "03",
  name: "Searching Yard 2",
  location: "Electronic City, Bengaluru 1255663, Karnatak,",
  photos: [
    {
      i: 1, 
      photo: "https://images.unsplash.com/photo-1550136513-548af4445338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80",
    },
    {
      i: 2, 
      photo: "https://images.unsplash.com/photo-1576731753569-3e93a228048c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      i: 3, 
      photo: "https://images.unsplash.com/photo-1576731753569-3e93a228048c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
  ],
  email: "workspace3@yard.com",
  phone: "2131335465",
  country: "India",
  manager: "Prasad",
  managerPhoto: "photo",

},
{
  id: "04",
  name: "Searching Yard 2",
  photos: [
    {
      i: 1, 
      photo: "https://images.unsplash.com/photo-1576731753569-3e93a228048c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      i: 2, 
      photo: "https://images.unsplash.com/photo-1576731753569-3e93a228048c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      i: 3, 
      photo: "https://images.unsplash.com/photo-1576731753569-3e93a228048c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
  ],
  location: "BTM Layout, Bengaluru, 1255663, Karnatak,",
  phone: "2131335465",
  email: "workspace3@yard.com",
  country: "India",
  manager: "Srinu",
  managerPhoto: "photo",
},
]