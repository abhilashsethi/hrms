import { QuotationData } from "components/admin/quotation";
import { AdminBreadcrumbs } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { Quotation } from "types";

const QuotationDetails = () => {
  const router = useRouter();
  const {
    data: quotationData,
    mutate,
    isLoading,
  } = useFetch<Quotation>(`quotations/${router?.query?.id}`);
  return (
    <PanelLayout title="Quotation Details ">
      <section className="md:px-8 px-4 mx-auto">
        <div className="pb-4">
          <AdminBreadcrumbs links={links} />
        </div>
        <QuotationData
          quotationData={quotationData}
          mutate={mutate}
          isLoading={isLoading}
        />
      </section>
    </PanelLayout>
  );
};

export default QuotationDetails;

const links = [
  { id: 1, page: "Quotation", link: "/admin/quotation" },
  {
    id: 2,
    page: "All Quotation",
    link: "/admin/quotation/all-quotation",
  },
];
