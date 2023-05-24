import { MenuItem, Pagination, Stack, TextField } from "@mui/material";
import { AllScannedColumn, AllScannedGrid } from "components/admin";
import {
  AdminBreadcrumbs,
  FiltersContainer,
  GridAndList,
  Loader,
  LoaderAnime,
  SkeletonLoaderLarge,
} from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import { Card } from "types";

const Cards = () => {
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [empId, setEmpId] = useState<string | null>(null);
  const [isOrderBy, setIsOrderBy] = useState<string | null>(null);
  const [userName, setUsername] = useState<string | null>(null);
  const [cardId, setCardId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [isGrid, setIsGrid] = useState(true);
  const {
    data: cardData,
    isLoading,
    mutate,
    pagination,
  } = useFetch<Card[]>(
    `cards?page=${pageNumber}&limit=6${userName ? `&name=${userName}` : ""}${
      empId ? `&employeeID=${empId}` : ""
    }${cardId ? `&cardId=${cardId}` : ""}${
      userType ? `&assignedTo=${userType}` : ""
    }${isOrderBy ? `&orderBy=${isOrderBy}` : ""}`
  );
  return (
    <PanelLayout title="Scanned Cards - SY HR MS">
      <section className="md:px-8 px-2 md:py-4 py-2">
        <div className="flex justify-between md:items-center md:flex-row flex-col items-start">
          <AdminBreadcrumbs links={links} />
          <div className="flex justify-end w-full md:w-auto">
            <GridAndList isGrid={isGrid} setIsGrid={setIsGrid} />
          </div>
        </div>
        <FiltersContainer
          changes={() => {
            setEmpId(null);
            setUsername(null);
            setCardId(null);
            setUserType(null);
            setIsOrderBy(null);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TextField
              fullWidth
              size="small"
              placeholder="Employee Id"
              onChange={(e) => {
                setEmpId(e?.target?.value);
              }}
            />
            <TextField
              fullWidth
              size="small"
              placeholder="Employee Name"
              onChange={(e) => {
                setUsername(e?.target?.value);
              }}
            />
            <TextField
              fullWidth
              size="small"
              placeholder="Card Id"
              onChange={(e) => {
                setCardId(e?.target?.value);
              }}
            />
            <TextField
              fullWidth
              select
              label="Select User Type"
              size="small"
              value={userType ? userType : ""}
              onChange={(e) => setUserType(e.target.value)}
            >
              {usertypes?.map((option: any) => (
                <MenuItem key={option?.id} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Order By"
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
        <div>
          {isGrid ? (
            <>
              {isLoading && <SkeletonLoaderLarge />}
              <AllScannedGrid data={cardData} mutate={mutate} />
            </>
          ) : (
            <>
              {isLoading && <Loader />}
              <AllScannedColumn data={cardData} mutate={mutate} />
            </>
          )}
        </div>
        {cardData?.length === 0 ? <LoaderAnime /> : null}
        <div className="flex justify-center py-8">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(
                Number(pagination?.total || 1) / Number(pagination?.limit || 1)
              )}
              onChange={(e, v: number) => {
                setPageNumber(v);
              }}
              variant="outlined"
            />
          </Stack>
        </div>
      </section>
    </PanelLayout>
  );
};

export default Cards;
const links = [
  { id: 1, page: "Cards", link: "/admin/cards" },
  { id: 2, page: "Scanned Cards", link: "/admin/cards/scanned" },
];

interface UserTypeItem {
  id?: number;
  value?: string | null;
  label?: string | null;
}

const usertypes: Array<UserTypeItem> = [
  { id: 1, value: "Employee", label: "Employee" },
  { id: 2, value: "Guest", label: "Guest" },
  { id: 2, value: null, label: "All" },
];

const short = [
  { id: 1, value: "createdAt:asc", name: "Created Ascending" },
  { id: 2, value: "createdAt:desc", name: "Created Descending" },
];
