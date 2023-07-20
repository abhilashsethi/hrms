import { Pagination, Stack } from "@mui/material";
import { MyAssetsGrid } from "components/admin/assets";
import { AdminBreadcrumbs, LoaderAnime, SkeletonLoader } from "components/core";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useEffect, useState } from "react";

const MyAssets = () => {
  const [isView, setIsView] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { user } = useAuth();
  const links = [
    {
      id: 1,
      page: "My Assets",
      link: "/admin/assets/my-assets",
    },
  ];

  const {
    data: assetsData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<any>(
    `assets/assign/user/of/asset?${user?.id ? `userId=${user?.id}` : ""}`
  );

  useEffect(() => {
    setTimeout(() => {
      setIsView(true);
    }, 3000);
  }, []);

  return (
    <PanelLayout title="My Assets - Admin Panel">
      <>
        <section className=" px-8 py-4">
          <div className="lg:flex justify-between items-center py-4">
            <AdminBreadcrumbs links={links} />
          </div>

          <>
            {isLoading && <SkeletonLoader />}
            <MyAssetsGrid data={assetsData} mutate={mutate} />
          </>

          {assetsData?.length === 0 ? <LoaderAnime /> : null}
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
      </>
    </PanelLayout>
  );
};

export default MyAssets;

const short = [
  { id: 1, value: "name:asc", name: "Name Ascending" },
  { id: 2, value: "name:desc", name: "Name Descending" },
  { id: 3, value: "createdAt:asc", name: "CreatedAt Ascending" },
  { id: 4, value: "createdAt:desc", name: "CreatedAt Descending" },
];
