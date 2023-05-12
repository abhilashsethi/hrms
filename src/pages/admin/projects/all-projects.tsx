import { Add, Construction, MoreHoriz, Search } from "@mui/icons-material";
import { Button, MenuItem, TextField } from "@mui/material";
import { Projects } from "components/Profile";
import {
  AdminBreadcrumbs,
  CountryNameFlag,
  FiltersContainer,
} from "components/core";
import { TechnologiesFilter } from "components/drawer";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";

const AllProjects = () => {
  const [isTech, setIsTech] = useState(false);
  const [status, setStatus] = useState("");
  const [isBug, setIsBug] = useState("");
  const handleChange = (event: any) => {
    setStatus(event.target.value);
  };

  return (
    <PanelLayout title="All Projects - SY HR MS">
      <section className="px-8">
        <TechnologiesFilter open={isTech} onClose={() => setIsTech(false)} />
        <div className="flex justify-between items-center py-4">
          <AdminBreadcrumbs links={links} />
          <div className="flex gap-4 items-center">
            <Link href="/admin/projects/create-projects">
              <Button
                className="!bg-theme"
                variant="contained"
                startIcon={<Add />}
              >
                ADD PROJECTS
              </Button>
            </Link>
          </div>
        </div>
        <FiltersContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TextField fullWidth size="small" placeholder="Project Name" />
            <TextField
              fullWidth
              select
              label="Status"
              size="small"
              value={status}
              onChange={handleChange}
            >
              {roles.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Bugs"
              size="small"
              value={isBug}
              onChange={(e) => setIsBug(e.target?.value)}
            >
              {bugSelects.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <Button
              fullWidth
              onClick={() => setIsTech(true)}
              startIcon={<MoreHoriz />}
              variant="contained"
              className="!bg-theme"
            >
              MORE FILTERS
            </Button>
          </div>
        </FiltersContainer>

        <div className="mt-4">
          <Projects />
          <CountryNameFlag countryName="Iraq" />
        </div>
      </section>
    </PanelLayout>
  );
};

export default AllProjects;

const roles = [
  { id: 1, value: "Completed" },
  { id: 2, value: "Ongoing" },
  { id: 3, value: "Onhold" },
  { id: 4, value: "Pending" },
];
const bugSelects = [
  { id: 1, value: "No Bugs" },
  { id: 2, value: "Bugs" },
];

const links = [
  { id: 1, page: "Projects", link: "/admin/projects" },
  { id: 2, page: "All projects", link: "/admin/projects/all-projects" },
];
