import { GridViewRounded, Search, TableRowsRounded } from "@mui/icons-material";
import {
  Button,
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import { AllScannedColumn, AllScannedGrid } from "components/admin";
import {
  AdminBreadcrumbs,
  FiltersContainer,
  Loader,
  LoaderAnime,
  SkeletonLoaderLarge,
} from "components/core";
import { CardAssign } from "components/drawer";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import { Card } from "types";

const Cards = () => {
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [empId, setEmpId] = useState<string | null>(null);
  const [userName, setUsername] = useState<string | null>(null);
  const [cardId, setCardId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [isGrid, setIsGrid] = useState(true);
  const [isAssign, setIsAssign] = useState<{
    drawer?: boolean;
    activeCardId?: string | null;
  }>({
    drawer: false,
    activeCardId: null,
  });
  const {
    data: cardData,
    isLoading,
    mutate,
    pagination,
  } = useFetch<Card[]>(
    `cards?page=${pageNumber}&limit=8${userName ? `&name=${userName}` : ""}${
      empId ? `&employeeID=${empId}` : ""
    }${cardId ? `&cardId=${cardId}` : ""}`
  );
  return (
    <PanelLayout title="Scanned Cards - SY HR MS">
      <section className="md:px-8 px-2 md:py-4 py-2">
        <div className="flex justify-between md:items-center md:flex-row flex-col items-start">
          <AdminBreadcrumbs links={links} />
          <div className="flex gap-1">
            <IconButton onClick={() => setIsGrid(true)} size="small">
              <div
                className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
                  isGrid && `border-2 border-theme`
                }`}
              >
                <GridViewRounded className={`${isGrid && `!text-theme`}`} />
              </div>
            </IconButton>
            <IconButton onClick={() => setIsGrid(false)} size="small">
              <div
                className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
                  !isGrid && `border-2 border-theme`
                }`}
              >
                <TableRowsRounded className={`${!isGrid && `!text-theme`}`} />
              </div>
            </IconButton>
          </div>
        </div>
        <FiltersContainer>
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
                <MenuItem key={option.id} value={option.title}>
                  {option.title}
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
        {!cardData?.length && <LoaderAnime />}
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

        <CardAssign
          cardId={isAssign?.activeCardId}
          open={isAssign?.drawer}
          onClose={() => setIsAssign({ drawer: false })}
          mutate={mutate}
        />
      </section>
    </PanelLayout>
  );
};

export default Cards;
const links = [
  { id: 1, page: "Cards", link: "/admin/cards" },
  { id: 2, page: "Scanned Cards", link: "/admin/cards/scanned" },
];

const usertypes = [
  { id: 1, title: "Employees" },
  { id: 2, title: "Guests" },
];
