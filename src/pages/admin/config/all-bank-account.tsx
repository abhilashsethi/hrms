import { BankAccountGrid } from "components/admin/quotation";
import { AdminBreadcrumbs, LoaderAnime, SkeletonLoader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import "react-datepicker/dist/react-datepicker.css";
import { QuotationBank } from "types";

const AllBankAccounts = () => {
  const {
    data: bankData,
    mutate,
    isLoading,
  } = useFetch<QuotationBank[]>(`quotations/get-all/accounts`);
  return (
    <>
      <PanelLayout title="All Bank Account - Admin Panel">
        <section className="md:px-8 px-2 py-4">
          <div className="flex justify-between items-center py-4">
            <AdminBreadcrumbs links={links} />
          </div>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              {bankData?.length ? (
                <BankAccountGrid data={bankData} mutate={mutate} />
              ) : (
                <LoaderAnime text="No data" />
              )}
            </>
          )}
        </section>
      </PanelLayout>
    </>
  );
};

export default AllBankAccounts;

const links = [
  { id: 1, page: "Quotation", link: "/admin/quotation" },
  {
    id: 2,
    page: "All Bank Account",
    link: "/admin/quotation/all-bank-account",
  },
];
