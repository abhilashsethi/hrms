import { Add, Search } from "@mui/icons-material";
import { Button, MenuItem, TextField } from "@mui/material";
import { Projects } from "components/Profile";
import { AdminBreadcrumbs } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";

const AllProjects = () => {
  const [value, setValue] = useState("Web Developer");
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <PanelLayout title="All Projects - SY HR MS">
      <section className="px-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <TextField
            fullWidth
            size="small"
            id="projectName"
            placeholder="Project Name"
            name="projectName"
          />
          <TextField
            fullWidth
            size="small"
            id="employeeName"
            placeholder="Employee Name"
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
        <div className="mt-8">
          <Projects />
        </div>
      </section>
    </PanelLayout>
  );
};

export default AllProjects;

const roles = [
  { id: 1, value: "Web Developer" },
  { id: 2, value: "IOS Developer" },
  { id: 3, value: "Android Developer" },
  { id: 4, value: "Team Leader" },
];

const links = [
  { id: 1, page: "Projects", link: "/admin/projects" },
  { id: 2, page: "All projects", link: "/admin/projects/all-projects" },
];
