import { Close, FilterListRounded } from "@mui/icons-material";
import {
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { AllScannedColumn, AllScannedGrid } from "components/admin";
import {
  AdminBreadcrumbs,
  GridAndList,
  Loader,
  LoaderAnime,
  SkeletonLoaderLarge,
} from "components/core";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { useState } from "react";
import { Card } from "types";

const Cards = () => {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [empId, setEmpId] = useState<string | null>(null);
  const [isOrderBy, setIsOrderBy] = useState<string | null>(null);
  const [guestName, setGuestName] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState<string | null>(null);
  const [userName, setUsername] = useState<string | null>(null);
  const [cardId, setCardId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [isGrid, setIsGrid] = useState(true);
  const { user } = useAuth();
  const links =
    user?.role?.name === "CEO" ||
    user?.role?.name === "HR" ||
    user?.role?.name === "DIRECTOR" ||
    user?.role?.name === "COO"
      ? [
          { id: 1, page: "Cards", link: "/admin/cards" },
          { id: 2, page: "Scanned Cards", link: "/admin/cards/scanned" },
        ]
      : [{ id: 1, page: "My Cards", link: "/admin/cards/scanned" }];
  const {
    data: cardData,
    isLoading,
    mutate,
    pagination,
  } = useFetch<Card[]>(
    `cards?page=${pageNumber}&limit=12${userName ? `&name=${userName}` : ""}${
      user?.role?.name === "CEO" ||
      user?.role?.name === "HR" ||
      user?.role?.name === "DIRECTOR" ||
      user?.role?.name === "COO"
        ? ""
        : `&userId=${user?.id}`
    }${empId ? `&employeeID=${empId}` : ""}${
      cardId ? `&cardId=${cardId}` : ""
    }${userType ? `&assignedTo=${userType}` : ""}${
      isOrderBy ? `&orderBy=${isOrderBy}` : ""
    }${guestName ? `&guestName=${guestName}` : ``}${
      router?.query?.isGuest === "true" ? `&assignedTo=Guest` : ``
    }${router?.query?.isEmployee === "true" ? `&assignedTo=Employee` : ``}`
  );
  // console.log(router?.query?.isGuest);
  return (
    <PanelLayout title="Scanned Cards">
      <section className="md:px-8 px-2 md:py-4 py-2">
        <div className="flex justify-between md:items-center md:flex-row flex-col items-start">
          <AdminBreadcrumbs links={links} />
          <div className="flex justify-end w-full md:w-auto">
            <GridAndList isGrid={isGrid} setIsGrid={setIsGrid} />
          </div>
        </div>
        {user?.role?.name === "CEO" ||
        user?.role?.name === "HR" ||
        user?.role?.name === "DIRECTOR" ||
        user?.role?.name === "COO" ? (
          <div className="md:flex grid gap-4 md:justify-between w-full py-2">
            <div
              className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
            >
              <IconButton
                onClick={() => {
                  setEmpId(null);
                  setUsername(null);
                  setCardId(null);
                  setUserType(null);
                  setGuestName(null);
                  setIsOrderBy(null);
                }}
              >
                <Tooltip
                  title={
                    isOrderBy != null ||
                    userType != null ||
                    cardId != null ||
                    empId != null ||
                    guestName != null ||
                    userName != null
                      ? `Remove Filters`
                      : `Filter`
                  }
                >
                  {isOrderBy != null ||
                  userType != null ||
                  cardId != null ||
                  guestName != null ||
                  empId != null ||
                  userName != null ? (
                    <Close className={"!text-white"} />
                  ) : (
                    <FilterListRounded className={"!text-white"} />
                  )}
                </Tooltip>
              </IconButton>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {router?.query?.isGuest ? null : (
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Employee Id"
                  value={empId ? empId : ""}
                  onChange={(e) => {
                    setPageNumber(1), setEmpId(e?.target?.value);
                  }}
                />
              )}
              {router?.query?.isGuest ? null : (
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Employee Name"
                  value={userName ? userName : ""}
                  onChange={(e) => {
                    setPageNumber(1), setUsername(e?.target?.value);
                  }}
                />
              )}
              {router?.query?.isEmployee ? null : (
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Guest Name"
                  value={guestName ? guestName : ""}
                  onChange={(e) => {
                    setPageNumber(1), setGuestName(e?.target?.value);
                  }}
                />
              )}
              <TextField
                fullWidth
                size="small"
                placeholder="Card Id"
                value={cardId ? cardId : ""}
                onChange={(e) => {
                  setPageNumber(1), setCardId(e?.target?.value);
                }}
              />
              <TextField
                fullWidth
                select
                label="Select User Type"
                size="small"
                value={userType ? userType : ""}
                onChange={(e) => {
                  setPageNumber(1), setUserType(e.target.value);
                }}
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
          </div>
        ) : null}
        <div>
          {isGrid ? (
            <>
              {isLoading && <SkeletonLoaderLarge />}
              <AllScannedGrid data={cardData} mutate={mutate} />
            </>
          ) : (
            <>
              {isLoading && <Loader />}
              <AllScannedColumn data={cardData} user={user} mutate={mutate} />
            </>
          )}
        </div>
        {cardData?.length === 0 ? <LoaderAnime /> : null}
        {Math.ceil(
          Number(pagination?.total || 1) / Number(pagination?.limit || 1)
        ) > 1 ? (
          <div className="flex justify-center py-8">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(
                  Number(pagination?.total || 1) /
                    Number(pagination?.limit || 1)
                )}
                onChange={(e, v: number) => {
                  setPageNumber(v);
                }}
                page={pageNumber}
                variant="outlined"
              />
            </Stack>
          </div>
        ) : null}
      </section>
    </PanelLayout>
  );
};

export default Cards;

interface UserTypeItem {
  id?: number;
  value?: string | null;
  label?: string | null;
}

const usertypes: Array<UserTypeItem> = [
  { id: 1, value: "Employee", label: "Employee" },
  { id: 2, value: "Guest", label: "Guest" },
];

const short = [
  { id: 3, value: "createdAt:asc", name: "CARD CREATED ASCENDING" },
  { id: 4, value: "createdAt:desc", name: "CARD CREATED DESCENDING" },
];
