import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { BankAccountGrid } from "components/admin/quotation";
import { AdminBreadcrumbs, LoaderAnime, SkeletonLoader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import "react-datepicker/dist/react-datepicker.css";
import { QuotationBank } from "types";

const AllQuotation = () => {
	const {
		data: bankData,
		mutate,
		isLoading,
	} = useFetch<QuotationBank[]>(`quotations/get-all/accounts`);
	return (
		<>
			<PanelLayout title="All Bank Account ">
				<section className="md:px-8 px-4">
					<div className="md:flex justify-between items-center py-4">
						<AdminBreadcrumbs links={links} />
						<Link href={"/admin/quotation/bank-account-config"}>
							<Button
								variant="contained"
								className="!bg-theme"
								startIcon={<Add />}
							>
								ADD BANK CONFIG
							</Button>
						</Link>
					</div>
					{isLoading ? (
						<SkeletonLoader />
					) : (
						<>
							{bankData?.length ? (
								<BankAccountGrid data={bankData} mutate={mutate} />
							) : (
								<>
									<LoaderAnime text="No data" />
								</>
							)}
						</>
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
