import {
  Add,
  GridViewRounded,
  Search,
  TableRowsRounded,
  Upload,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import { ClientTableView, ClientsGrid } from "components/admin/clients";
import {
  AdminBreadcrumbs,
  FiltersContainer,
  LoaderAnime,
} from "components/core";
import { UploadEmployData } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";
import { Client } from "types";

const AllClients = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [userName, setUsername] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [isUpload, setIsUpload] = useState(false);
  const [value, setValue] = useState("Web Developer");
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  const {
    data: clients,
    mutate,
    pagination,
  } = useFetch<any>(
    `clients?page=${pageNumber}&limit=8${userName ? `&name=${userName}` : ""}`
  );
  console.log(clients);
  return (
    <>
      <PanelLayout title="All Clients - SY HR MS">
        <section className="px-8">
          <UploadEmployData
            open={isUpload}
            handleClose={() => setIsUpload(false)}
          />
          <div className="flex justify-between items-center py-4">
            <AdminBreadcrumbs links={links} />
            <div className="flex gap-4 items-center">
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
                    <TableRowsRounded
                      className={`${!isGrid && `!text-theme`}`}
                    />
                  </div>
                </IconButton>
              </div>
              <Link href="/admin/clients/add-clients">
                <Button
                  className="!bg-theme"
                  variant="contained"
                  startIcon={<Add />}
                >
                  ADD CLIENTS
                </Button>
              </Link>
              <Button
                onClick={() => setIsUpload(true)}
                className="!bg-slate-600"
                variant="contained"
                startIcon={<Upload />}
              >
                UPLOAD CLIENTS DATA
              </Button>
            </div>
          </div>
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
            </div>
          </FiltersContainer>
          {isGrid ? (
            <ClientsGrid data={clients} mutate={mutate} />
          ) : (
            <ClientTableView data={clients} mutate={mutate} />
          )}
          {!clients?.length && <LoaderAnime />}
          {clients?.length ? (
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
                  variant="outlined"
                />
              </Stack>
            </div>
          ) : null}
        </section>
      </PanelLayout>
    </>
  );
};

export default AllClients;

const roles = [
  { id: 1, value: "CEO" },
  { id: 2, value: "Manager" },
  { id: 3, value: "Director" },
  { id: 4, value: "Founder" },
];

const links = [
  { id: 1, page: "Clients", link: "/admin/clients" },
  { id: 2, page: "All Clients", link: "/admin/clients/all-clients" },
];
