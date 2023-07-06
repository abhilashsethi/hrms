import { BankAccountGrid } from "components/admin/quotation";
import { AdminBreadcrumbs, LoaderAnime } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { QuotationBank } from "types";

const AllQuotation = () => {
  const {
    data: bankData,
    mutate,
    isLoading,
  } = useFetch<QuotationBank[]>(`quotations/get-all/accounts`);
  console.log(bankData);
  return (
    <>
      <PanelLayout title="All Bank Account - Admin Panel">
        <section className="px-8">
          <div className="flex justify-between items-center py-4">
            <AdminBreadcrumbs links={links} />
          </div>

          {bankData?.length ? (
            <BankAccountGrid data={bankData} mutate={mutate} />
          ) : (
            <LoaderAnime text="No data" />
          )}
        </section>
      </PanelLayout>
    </>
  );
};

export default AllQuotation;

const links = [
  { id: 1, page: "Quotation", link: "/admin/quotation" },
  {
    id: 2,
    page: "All Bank Account",
    link: "/admin/quotation/all-bank-account",
  },
];
