import { Add } from "@mui/icons-material";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
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
  const [userName, setUsername] = useState<string | null>(null);
  const [isOrderBy, setIsOrderBy] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const {
    data: guestData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<any[]>(`guests?page=${pageNumber}&limit=8`);
  console.log("guestData", guestData);

  return (
    <PanelLayout title="All Guests - Admin Panel">
      <section className="px-8 py-4">
        <div className="flex justify-between">
          <AdminBreadcrumbs links={links} />
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
              <TextField
                fullWidth
                size="small"
                id="name"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Client Name"
                name="name"
              />
              <TextField
                fullWidth
                select
                label="Ascending/Descending"
                size="small"
                value={isOrderBy ? isOrderBy : ""}
                onChange={(e) => setIsOrderBy(e?.target?.value)}
              >
                {short.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </FiltersContainer>
        </div>
        {isGrid ? (
          <>
            {isLoading && <SkeletonLoader />}
            <GuestsGrid data={guestData} mutate={mutate} />
          </>
        ) : (
          <>
            {isLoading && <Loader />}
            <GuestColumn data={guestData} mutate={mutate} />
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
const short = [
  { id: 1, value: "name:asc", name: "Name Ascending" },
  { id: 2, value: "name:desc", name: "Name Descending" },
  { id: 3, value: "createdAt:asc", name: "CreatedAt Ascending" },
  { id: 4, value: "createdAt:desc", name: "CreatedAt Descending" },
];
