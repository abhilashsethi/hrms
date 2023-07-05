import { BankAccountGrid } from "components/admin/quotation";
import { AdminBreadcrumbs, LoaderAnime } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Quotation } from "types";



const AllQuotation = () => {
  const {
    data: bankData,
    mutate,
    isLoading,
  } = useFetch<Quotation[]>(
    `get-all-accounts`
  );
  console.log(bankData);
  return (
    <>
      <PanelLayout title="Meetings - Admin Panel">
        <section className="px-8">
          <div className="flex justify-between items-center py-4">
            <AdminBreadcrumbs links={links} />
          </div>

          {bankData?.length ?
            <BankAccountGrid data={bankData} mutate={mutate} />
            : <LoaderAnime text="No data" />}
        </section>
      </PanelLayout>
    </>
  );
};

export default AllQuotation;

const status = [
  { id: 1, value: "Accepted" },
  { id: 2, value: "Rejected" },
  { id: 3, value: "Modified" },
];

const links = [
  { id: 1, page: "Quotation", link: "/admin/quotation" },
  { id: 2, page: "All Quotation", link: "/admin/quotation/all-quotation" },
];
