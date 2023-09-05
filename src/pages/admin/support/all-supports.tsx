import { SupportColumn } from "components/admin/support";
import { AdminBreadcrumbs, Loader, LoaderAnime } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import "react-datepicker/dist/react-datepicker.css";
import { Support } from "types";

const AllSupports = () => {
  const {
    data: supportsData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<Support[]>(`supports?orderBy=createdAt:desc`);

  return (
    <>
      <PanelLayout title="All Supports - Admin Panel">
        <section className="md:px-8 px-2 py-4">
          <div className="flex justify-between items-center py-4">
            <AdminBreadcrumbs links={links} />
          </div>
          {isLoading ? <Loader /> : null}
          <>
            {supportsData?.length ? (
              <SupportColumn data={supportsData} mutate={mutate} />
            ) : (
              <LoaderAnime text="No data" />
            )}
          </>
        </section>
      </PanelLayout>
    </>
  );
};

export default AllSupports;

const links = [
  { id: 2, page: "All Support", link: "/admin/support/all-supports" },
];
