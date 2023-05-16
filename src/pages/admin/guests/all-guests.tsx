import { Add } from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material";
import { GuestColumn, GuestsGrid } from "components/admin/guest";
import {
  AdminBreadcrumbs,
  FiltersContainer,
  GridAndList,
  HeadText,
  Loader,
  SkeletonLoader,
} from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";
import { User } from "types";

const AllGuests = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const {
    data: guestData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<any[]>(`guests?page=${pageNumber}&limit=8`);
  console.log(guestData);
  const guest = [
    {
      name: "John Doe",
      email: "john@mail.com",
      phone: "9988654325",
      gender: "Male",
      visitInfo: "Meeting",
      company: "SearchingYard",
      designation: "CEO",
      createdAt: new Date().toDateString(),
    },
    {
      name: "Republic Lain",
      email: "john@mail.com",
      phone: "9988654325",
      gender: "Male",
      visitInfo: "Meeting",
      company: "SearchingYard",
      designation: "CEO",
      createdAt: new Date().toDateString(),
    },
    {
      name: "Rebeka Kai",
      email: "john@mail.com",
      phone: "9988654325",
      gender: "Male",
      visitInfo: "Meeting",
      company: "SearchingYard",
      designation: "CEO",
      createdAt: new Date().toDateString(),
    },
    {
      name: "John Snow",
      email: "john@mail.com",
      phone: "9988654325",
      gender: "Male",
      visitInfo: "Meeting",
      company: "SearchingYard",
      designation: "CEO",
      createdAt: new Date().toDateString(),
    },
  ];

  return (
    <PanelLayout title="All Guests - Admin Panel">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <div className="flex justify-between">
          <HeadText title="ALL GUESTS" />
          <div className="flex gap-4 items-center">
            <GridAndList isGrid={isGrid} setIsGrid={setIsGrid} />
            <Link href="/admin/guests/create-guest">
              <Button
                className="!bg-theme"
                variant="contained"
                startIcon={<Add />}
              >
                ADD GUEST
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <FiltersContainer>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <TextField fullWidth size="small" placeholder="Guest Name" />
              <TextField fullWidth size="small" placeholder="Guest ID" />
            </div>
          </FiltersContainer>
        </div>
        {isGrid ? (
          <>
            {isLoading && <SkeletonLoader />}
            <GuestsGrid data={cards} mutate={mutate} />
          </>
        ) : (
          <>
            {isLoading && <Loader />}
            <GuestColumn data={guest} mutate={mutate} />
          </>
        )}
      </section>
    </PanelLayout>
  );
};

export default AllGuests;

const links = [
  { id: 1, page: "Guests", link: "/admin/guests" },
  { id: 2, page: "All Guests", link: "/admin/guests/all-guests" },
];

const cards = [
  { id: 1, name: "John Doe", guestId: "SY1006" },
  { id: 2, name: "Rebeka Snow", guestId: "SY1008" },
  { id: 3, name: "Stuot Little", guestId: "SY1009" },
  { id: 4, name: "Tony Stak", guestId: "SY1012" },
];
