import {
  Add,
  GridViewRounded,
  Search,
  TableRowsRounded,
  Upload,
} from "@mui/icons-material";
import { Button, IconButton, MenuItem, TextField } from "@mui/material";
import { ClientTableView, ClientsGrid } from "components/admin/clients";
import { AdminBreadcrumbs } from "components/core";
import { UploadEmployData } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";
import { Client } from "types";

const AllClients = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [isUpload, setIsUpload] = useState(false);
  const [value, setValue] = useState("Web Developer");
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  const { data: clients, mutate } = useFetch<any>(`clients`);
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TextField
              fullWidth
              size="small"
              id="employeeId"
              placeholder="Client Id"
              name="employeeId"
            />
            <TextField
              fullWidth
              size="small"
              id="employeeName"
              placeholder="Client Name"
              name="employeeName"
            />
            <TextField
              fullWidth
              select
              label="Select Role"
              size="small"
              value={value}
              onChange={handleChange}
            >
              {roles.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <Button
              fullWidth
              startIcon={<Search />}
              variant="contained"
              className="!bg-theme"
            >
              Search
            </Button>
          </div>
          {isGrid ? (
            <ClientsGrid data={clients} mutate={mutate} />
          ) : (
            <ClientTableView data={clients} mutate={mutate} />
          )}
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
