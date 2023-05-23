import { Add, Construction, MoreHoriz, Search } from "@mui/icons-material";
import { Button, MenuItem, Pagination, Stack, TextField } from "@mui/material";
import { Projects } from "components/Profile";
import {
  AdminBreadcrumbs,
  FiltersContainer,
  LoaderAnime,
} from "components/core";
import { TechnologiesFilter } from "components/drawer";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";

const AllProjects = () => {
  const [clientName, setClientName] = useState("");
  const [Technologies, setTechnologies] = useState("");
  const [empName, setEmpName] = useState("");
  const [isTech, setIsTech] = useState(false);
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [status, setStatus] = useState("");
  const [isBug, setIsBug] = useState("");
  const handleChange = (event: any) => {
    setStatus(event.target.value);
  };
  console.log("Technologies", Technologies);
  console.log("empName", empName);
  console.log("clientName", clientName);
  const {
    data: projectData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<any[]>(`projects?page=${pageNumber}&limit=6`);
  return (
    <PanelLayout title="All Projects - SY HR MS">
      <section className="md:px-8 px-3">
        <TechnologiesFilter
          open={isTech}
          onClose={() => setIsTech(false)}
          setEmpName={setEmpName}
          setTechnologies={setTechnologies}
          setClientName={setClientName}
        />
        <div className="flex md:justify-between justify-start md:items-center items-start py-4 md:flex-row flex-col">
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
        <FiltersContainer
          changes={() => {
            setClientName(""),
              setTechnologies(""),
              setEmpName(""),
              setIsBug("");
          }}
        >
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
          <Projects
            mutate={mutate}
            projectData={projectData}
            isLoading={isLoading}
          />
        </div>
        {projectData?.length === 0 && <LoaderAnime />}
        <section className="mb-6">
          {projectData?.length ? (
            <div className="flex justify-center md:py-8 py-4">
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
