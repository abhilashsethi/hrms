import { BillData } from "components/admin/bills";
import { AdminBreadcrumbs } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { Bills } from "types";

const BillDetails = () => {
  const router = useRouter();
  const {
    data: billData,
    mutate,
    isLoading,
  } = useFetch<Bills>(`bills/${router?.query?.id}`);
  return (
    <PanelLayout title="Bill Details">
      <section className="md:px-8 px-4 py-4">
        <div className="pb-4">
          <AdminBreadcrumbs links={links} />
        </div>
        <BillData billData={billData} mutate={mutate} isLoading={isLoading} />
      </section>
    </PanelLayout>
  );
};

export default BillDetails;

const links = [
  { id: 1, page: "Bill", link: "/admin/bills" },
  {
    id: 2,
    page: "All Bills",
    link: "/admin/bills/all-bills",
  },
];
