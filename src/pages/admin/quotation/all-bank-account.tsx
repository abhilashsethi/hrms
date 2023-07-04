import { Add, Close, Delete, FilterListRounded, Info } from "@mui/icons-material";
import { Button, IconButton, MenuItem, Pagination, Stack, TextField, Tooltip } from "@mui/material";
import { TENDERCARD } from "assets/home";
import { AdminBreadcrumbs, LoaderAnime, SkeletonLoader } from "components/core";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { Tender } from "types";
import { deleteFile } from "utils";

const AllBankAccount = () => {
  const [tenderName, setTenderName] = useState<string | null>(null);
  const [isOrderBy, setIsOrderBy] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);


  return (
    <PanelLayout title="All Bank Account - Admin Panel">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <div className="flex justify-end items-center">
          <Link href="/admin/quotation/bank-account-config">
            <Button
              size="small"
              className="!bg-theme"
              variant="contained"
              startIcon={<Add />}
            >
              ADD BANK ACCOUNT CONFIG
            </Button>
          </Link>
        </div>
        <div className="md:flex gap-4 justify-between w-full py-2 mt-2">
          <div
            className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
          >
            <IconButton
              onClick={() => {
                setIsOrderBy(null);
                setTenderName(null);
              }}
            >
              <Tooltip
                title={
                  isOrderBy != null ||
                    tenderName != null
                    ? `Remove Filters`
                    : `Filter`
                }
              >
                {
                  isOrderBy != null ||
                    tenderName != null ? (
                    <Close className={"!text-white"} />
                  ) : (
                    <FilterListRounded className={"!text-white"} />
                  )}
              </Tooltip>
            </IconButton>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TextField
              fullWidth
              size="small"
              id="name"
              value={tenderName ? tenderName : ""}
              onChange={(e) => {
                setPageNumber(1), setTenderName(e.target.value);
              }}
              placeholder="Bank Name"
              name="name"
            />
            <TextField
              fullWidth
              select
              label="Ascending/Descending"
              size="small"
              value={isOrderBy ? isOrderBy : ""}
              onChange={(e) => {
                setPageNumber(1), setIsOrderBy(e?.target?.value);
              }}
            >
              {short.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <section className="mt-4">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
              {tenderData?.map((item) => (
                <div key={item?.id}>
                  <CardContent item={item} />

                </div>
              ))}
            </div>

          </section>
        </div>

      </section>
    </PanelLayout>
  );
};

export default AllBankAccount;
interface Props {
  item?: Tender;
}

const CardContent = (item: any) => {
  const { change } = useChange();
  const handleDelete = (id?: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire(`Info`, "It will take some time", "info");
          // const res = await change(`tenders/${id}`, {
          //      method: "DELETE",
          // });
          // const docPaths = item?.documents;
          // if (docPaths && docPaths.length > 0) {
          //      docPaths.forEach(async (path) => {
          //           await deleteFile(String(path));
          //      });
          // }
          // if (res?.status !== 200) {
          //      Swal.fire(
          //           "Error",
          //           res?.results?.msg || "Something went wrong!",
          //           "error"
          //      );
          //      return;
          // }
          Swal.fire(`Success`, "Deleted Successfully!", "success");
          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full h-full rounded-lg overflow-hidden shadow-sleek">
        <div
          className={`h-28 w-full flex justify-center items-center relative bg-[#76DCC7]`}
        >
          <div
            className={`px-4 py-0.5 rounded-r-full absolute top-[10px] left-0 ${item?.status === "Open"
              ? `bg-yellow-400` :
              item?.status === "Disqualified" ? `bg-red-500` :
                item?.status === "L1" ? `bg-blue-500` :
                  item?.status === "Cancelled" ? `bg-[#f97316]` :
                    item?.status === "FinancialEvaluation" ? `bg-[#8b5cf6]` :
                      item?.status === "TechnicalEvaluation" ? `bg-[#e879f9]` :
                        item?.status === "BidAwarded" ? `bg-[#9333ea]`
                          : `bg-green-500`
              }`}
          >
            <span className="text-xs font-semibold text-white tracking-wide">
              {item?.status}
            </span>
          </div>
          <div className=" px-4 py-1 bg-white absolute right-0 bottom-[-15px] rounded-l-md flex gap-2 items-center">
            <Link href={`/admin/tenders/tender-details?id=${item?.id}`}>
              <Tooltip title="Details">
                <IconButton size="small">
                  <Info />
                </IconButton>
              </Tooltip>
            </Link>
            <Tooltip title="Delete">
              <IconButton size="small" onClick={() => handleDelete(item?.id)}>
                <Delete className="!text-youtube" />
              </IconButton>
            </Tooltip>
          </div>
          <img
            className="h-12 object-contain "
            src={TENDERCARD.src}
            alt="icon"
          />
        </div>
        <div className="bg-white p-4">
          <h1 className="font-semibold text-sm">{item?.name}</h1>
          <h1 className="mt-2 text-sm font-semibold">Account No :</h1>
          <span className="text-sm text-gray-600">{item?.acNo}</span>
          <h1 className="mt-2 text-sm font-semibold">Branch Name :</h1>
          <span className="text-sm text-gray-600">
            {item?.branchName}
          </span>
          <h1 className="mt-2 text-sm font-semibold">IFSC Code :</h1>
          <span className="text-sm text-gray-600">
            {item?.ifsc}
          </span>
          <h1 className="mt-2 text-sm font-semibold">Company Name :</h1>
          <span className="text-sm text-gray-600">
            {item?.companyName}
          </span>
          <h1 className="mt-2 text-sm font-semibold">Swift Code :</h1>
          <span className="text-sm text-gray-600">
            {item?.swiftCode}
          </span>

        </div>
      </div>
    </>
  );
};

const links = [
  { id: 1, page: "Quotation", link: "/admin/quotation" },
  {
    id: 2,
    page: "Account Configure",
    link: "/admin/quotation/bank-account-config",
  },
];
const short = [
  { id: 1, value: "title:asc", name: "Name Ascending" },
  { id: 2, value: "title:desc", name: "Name Descending" },
  { id: 3, value: "createdAt:asc", name: "CreatedAt Ascending" },
  { id: 4, value: "createdAt:desc", name: "CreatedAt Descending" },
];
const tenderData = [
  {
    id: 1,
    branchName: "Cuttack",
    swiftCode: "SWIFT02225",
    ifsc: "SBIN000255",
    status: "Block",
    name: "State Bank of India",
    companyName: "SBI",
  },

]

