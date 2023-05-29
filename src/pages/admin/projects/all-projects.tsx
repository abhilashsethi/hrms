import { Add, Close, FilterListRounded, MoreHoriz } from "@mui/icons-material";
import { Button, IconButton, MenuItem, Pagination, Stack, TextField, Tooltip } from "@mui/material";
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
  const [clientName, setClientName] = useState<string[]>([]);
  const [projectName, setProjectName] = useState(null);
  const [bugStatus, setBugStatus] = useState(null);
  const [Technologies, setTechnologies] = useState<string[]>([]);
  const [empName, setEmpName] = useState<string[]>([]);
  const [isTech, setIsTech] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [status, setStatus] = useState(null);
  const [isBug, setIsBug] = useState(null);
  const handleChange = (event: any) => {
    setStatus(event.target.value);
  };
  const {
    data: projectData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<any>(
    `projects?page=${pageNumber}&limit=6${projectName ? `&name=${projectName}` : ""
    }${status ? `&projectStatus=${status}` : ""}${bugStatus ? `&bugs=${bugStatus}` : ""
    }` +
    (Technologies?.length
      ? Technologies?.map((item) => `&techName=${item}`)?.join("")
      : "") +
    (empName?.length
      ? empName?.map((item) => `&memberName=${item}`)?.join("")
      : "") +
    (clientName?.length
      ? clientName?.map((item) => `&clientName=${item}`)?.join("")
      : "")
  );

  return (
    <PanelLayout title="All Projects - Admin Panel">
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

        <div className="md:flex gap-4 justify-between w-full py-2">
          <div
            className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
          >
            <IconButton
              onClick={() => {
                setClientName([]);
                setTechnologies([]);
                setEmpName([]);
                setIsBug(null);
              }}
            >
              <Tooltip title={clientName != null || Technologies != null || isBug != null || empName != null ? `Remove Filters` : `Filter`}>
                {clientName != null || Technologies != null || isBug != null || empName != null ? <Close className={'!text-white'} /> : <FilterListRounded className={"!text-white"} />}
              </Tooltip>
            </IconButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TextField
              fullWidth
              size="small"
              placeholder="Project Name"
              onChange={(e: any) => setProjectName(e.target.value)}
            />
            <TextField
              fullWidth
              select
              label="Status"
              size="small"
              value={status ? status : ""}
              onChange={handleChange}
            >
              {statuses?.map((option: any) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Bug status"
              size="small"
              value={bugStatus}
              onChange={(e: any) => setBugStatus(e.target?.value)}
            >
              {bugSelects?.map((option: any) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.label}
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
        </div>
        <div className="mt-4">
          <Projects
            mutate={mutate}
            projectData={projectData}
            isLoading={isLoading}
          />
        </div>
        {projectData?.length === 0 && <LoaderAnime />}
        <section className="mb-6">
          {Math.ceil(
            Number(pagination?.total || 1) /
            Number(pagination?.limit || 1)
          ) > 1 ? (
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
                  page={pageNumber}
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

const statuses = [
  { id: 1, value: "Completed", label: "Completed" },
  { id: 2, value: "Ongoing", label: "Ongoing" },
  { id: 3, value: "Onhold", label: "Onhold" },
  { id: 4, value: "Pending", label: "Pending" },
  { id: 4, value: null, label: "All" },
];
const bugSelects = [
  { id: 1, value: "Open", label: "Open" },
  { id: 2, value: "Pending", label: "Pending" },
  { id: 3, value: "Ongoing", label: "Ongoing" },
  { id: 4, value: "Fixed", label: "Fixed" },
  { id: 5, value: "Reviewed", label: "Reviewed" },
  { id: 6, value: null, label: "All" },
];

const links = [
  { id: 1, page: "Projects", link: "/admin/projects" },
  { id: 2, page: "All projects", link: "/admin/projects/all-projects" },
];
