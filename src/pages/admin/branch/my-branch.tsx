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
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";

const AllBranch = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [userName, setUsername] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [isOrderBy, setIsOrderBy] = useState<string | null>(null);
  const { user } = useAuth();
  const {
    data: branchData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<any[]>(`branches?managerId${user?.id}`);
  console.log(user?.id);
  console.log(branchData);

  return (
    <PanelLayout title="My Branch - Admin Panel">
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
      </section>
    </PanelLayout>
  );
};

export default AllBranch;

const links = [
  {
    id: 2,
    page: "My Branch",
    link: "/admin/branch/my-branch",
  },
];
const short = [
  { id: 1, value: "name:asc", name: "Name Ascending" },
  { id: 2, value: "name:desc", name: "Name Descending" },
  { id: 3, value: "createdAt:asc", name: "CreatedAt Ascending" },
  { id: 4, value: "createdAt:desc", name: "CreatedAt Descending" },
];
