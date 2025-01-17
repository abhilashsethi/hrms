import {
  Add,
  Close,
  FilterListRounded,
  GridViewRounded,
  TableRowsRounded,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { AssetsColumn, AssetsGrid } from "components/admin/assets";
import {
  AdminBreadcrumbs,
  Loader,
  LoaderAnime,
  SkeletonLoader,
} from "components/core";
import { ChooseBranchToViewAssets } from "components/dialogues";
import ChooseBranch from "components/dialogues/ChooseBranch";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ASSET } from "types";

const AllAssets = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [isChoose, setIsChoose] = useState(false);
  const [isView, setIsView] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [userName, setUsername] = useState<string | null>(null);
  const [isOrderBy, setIsOrderBy] = useState<string>("createdAt:desc");
  const [isBrand, setIsBrand] = useState<string | null>(null);
  const [isBranch, setIsBranch] = useState<string | null>(null);
  const [isModel, setIsModel] = useState<string | null>(null);
  const [branchId, setBranchId] = useState<string | null>(null);
  const { user } = useAuth();
  const links =
    user?.role?.name === "CEO" ||
    user?.role?.name === "HR" ||
    user?.role?.name === "COO"
      ? [
          { id: 1, page: "Assets", link: "/admin/assets" },
          {
            id: 2,
            page: "All Assets",
            link: "/admin/assets/all-assets",
          },
        ]
      : [
          {
            id: 2,
            page: "My Assets",
            link: "/admin/assets/all-assets",
          },
        ];
  const {
    data: assetsData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<ASSET[]>(
    `assets?page=${pageNumber}&limit=6${userName ? `&name=${userName}` : ""}${
      isOrderBy ? `&orderBy=${isOrderBy}` : ""
    }${isBrand ? `&brandName=${isBrand}` : ""}${
      isBranch ? `&branchName=${isBranch}` : ""
    }${isModel ? `&modelName=${isModel}` : ""}${
      branchId ? `&branchId=${branchId}` : ""
    }${
      user?.role?.name === "CEO" ||
      user?.role?.name === "HR" ||
      user?.role?.name === "COO"
        ? ""
        : `&branchId=${user?.employeeOfBranchId}`
    }`
  );
  useEffect(() => {
    setTimeout(() => {
      setIsView(true);
    }, 3000);
  }, []);

  return (
    <PanelLayout title="All Assets">
      <>
        <ChooseBranch
          open={isChoose}
          handleClose={() => setIsChoose(false)}
          mutate={mutate}
        />
        {user?.role?.name === "CEO" ||
        user?.role?.name === "HR" ||
        user?.role?.name === "COO" ? (
          <>
            <ChooseBranchToViewAssets
              open={isView}
              handleClose={() => setIsView(false)}
              setBranchId={setBranchId}
            />
            {branchId ? (
              <>
                <section className=" md:px-8 px-4 py-4">
                  <div className="lg:flex justify-between items-center py-4">
                    <AdminBreadcrumbs links={links} />
                    <div className="md:flex gap-4 items-center">
                      <div className="flex gap-1">
                        <IconButton
                          onClick={() => setIsGrid(true)}
                          size="small"
                        >
                          <div
                            className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
                              isGrid && `border-2 border-theme`
                            }`}
                          >
                            <GridViewRounded
                              className={`${isGrid && `!text-theme`}`}
                            />
                          </div>
                        </IconButton>
                        <IconButton
                          onClick={() => setIsGrid(false)}
                          size="small"
                        >
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
                      {user?.role?.name === "CEO" ||
                      user?.role?.name === "HR" ||
                      user?.role?.name === "COO" ? (
                        <Link href="/admin/assets/create-assets">
                          <Button
                            variant="contained"
                            className="!bg-theme"
                            startIcon={<Add />}
                          >
                            CREATE ASSETS
                          </Button>
                        </Link>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <div className="md:flex grid gap-4 md:justify-between w-full py-2">
                      <div
                        className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
                      >
                        <IconButton
                          onClick={() => {
                            setIsOrderBy("createdAt:desc");
                            setUsername(null);
                            setIsBrand(null);
                            setIsBranch(null);
                            setIsModel(null);
                          }}
                        >
                          <Tooltip
                            title={
                              isOrderBy != "createdAt:desc" ||
                              userName != null ||
                              isBrand != null ||
                              isBranch != null ||
                              isModel != null
                                ? `Remove Filters`
                                : `Filter`
                            }
                          >
                            {isOrderBy != "createdAt:desc" ||
                            userName != null ||
                            isBrand != null ||
                            isBranch != null ||
                            isModel != null ? (
                              <Close className={"!text-white"} />
                            ) : (
                              <FilterListRounded className={"!text-white"} />
                            )}
                          </Tooltip>
                        </IconButton>
                      </div>

                      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <TextField
                          fullWidth
                          size="small"
                          id="assetName"
                          value={userName ? userName : ""}
                          onChange={(e) => {
                            setPageNumber(1), setUsername(e.target.value);
                          }}
                          placeholder="Asset Name"
                          name="assetName"
                        />
                        <TextField
                          fullWidth
                          select
                          label="Ascending/Descending"
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
                        <TextField
                          fullWidth
                          size="small"
                          id="brandName"
                          value={isBrand ? isBrand : ""}
                          onChange={(e) => {
                            setPageNumber(1), setIsBrand(e.target.value);
                          }}
                          placeholder="Brand Name"
                          name="brandName"
                        />
                        <TextField
                          fullWidth
                          size="small"
                          id="branchName"
                          value={isBranch ? isBranch : ""}
                          onChange={(e) => {
                            setPageNumber(1), setIsBranch(e.target.value);
                          }}
                          placeholder="Branch Name"
                          name="branchName"
                        />
                        <TextField
                          fullWidth
                          size="small"
                          id="modelName"
                          value={isModel ? isModel : ""}
                          onChange={(e) => {
                            setPageNumber(1), setIsModel(e.target.value);
                          }}
                          placeholder="Model No."
                          name="modelName"
                        />
                      </div>
                    </div>
                  </div>
                  {isGrid ? (
                    <>
                      {isLoading && <SkeletonLoader />}
                      <AssetsGrid data={assetsData} mutate={mutate} />
                    </>
                  ) : (
                    <>
                      {isLoading && <Loader />}
                      <AssetsColumn data={assetsData} mutate={mutate} />
                    </>
                  )}
                  {assetsData?.length === 0 ? <LoaderAnime /> : null}
                  {Math.ceil(
                    Number(pagination?.total || 1) /
                      Number(pagination?.limit || 1)
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
                          variant="outlined"
                          page={pageNumber}
                        />
                      </Stack>
                    </div>
                  ) : (
                    ""
                  )}
                </section>
              </>
            ) : (
              <>
                <LoaderAnime text="Please Select Branch" />
                <div className="w-full flex justify-center items-center mt-3">
                  <Button
                    variant="contained"
                    className="!bg-theme "
                    onClick={() => setIsView(true)}
                  >
                    Choose Branch
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <section className=" px-8 py-4">
              <div className="lg:flex justify-between items-center py-4">
                <AdminBreadcrumbs links={links} />
                <div className="md:flex gap-4 items-center">
                  <div className="flex gap-1">
                    <IconButton onClick={() => setIsGrid(true)} size="small">
                      <div
                        className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
                          isGrid && `border-2 border-theme`
                        }`}
                      >
                        <GridViewRounded
                          className={`${isGrid && `!text-theme`}`}
                        />
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
                  {user?.role?.name === "CEO" ||
                  user?.role?.name === "HR" ||
                  user?.role?.name === "COO" ? (
                    <Link href="/admin/assets/create-assets">
                      <Button
                        variant="contained"
                        className="!bg-theme"
                        startIcon={<Add />}
                      >
                        CREATE ASSETS
                      </Button>
                    </Link>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="md:flex gap-4 justify-between w-full py-2">
                  <div
                    className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
                  >
                    <IconButton
                      onClick={() => {
                        setIsOrderBy("createdAt:desc");
                        setUsername(null);
                        setIsBrand(null);
                        setIsBranch(null);
                        setIsModel(null);
                      }}
                    >
                      <Tooltip
                        title={
                          isOrderBy != "createdAt:desc" ||
                          userName != null ||
                          isBrand != null ||
                          isBranch != null ||
                          isModel != null
                            ? `Remove Filters`
                            : `Filter`
                        }
                      >
                        {isOrderBy != "createdAt:desc" ||
                        userName != null ||
                        isBrand != null ||
                        isBranch != null ||
                        isModel != null ? (
                          <Close className={"!text-white"} />
                        ) : (
                          <FilterListRounded className={"!text-white"} />
                        )}
                      </Tooltip>
                    </IconButton>
                  </div>

                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <TextField
                      fullWidth
                      size="small"
                      id="assetName"
                      value={userName ? userName : ""}
                      onChange={(e) => {
                        setPageNumber(1), setUsername(e.target.value);
                      }}
                      placeholder="Asset Name"
                      name="assetName"
                    />
                    <TextField
                      fullWidth
                      select
                      label="Ascending/Descending"
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
                    <TextField
                      fullWidth
                      size="small"
                      id="brandName"
                      value={isBrand ? isBrand : ""}
                      onChange={(e) => {
                        setPageNumber(1), setIsBrand(e.target.value);
                      }}
                      placeholder="Brand Name"
                      name="brandName"
                    />
                    <TextField
                      fullWidth
                      size="small"
                      id="branchName"
                      value={isBranch ? isBranch : ""}
                      onChange={(e) => {
                        setPageNumber(1), setIsBranch(e.target.value);
                      }}
                      placeholder="Branch Name"
                      name="branchName"
                    />
                    <TextField
                      fullWidth
                      size="small"
                      id="modelName"
                      value={isModel ? isModel : ""}
                      onChange={(e) => {
                        setPageNumber(1), setIsModel(e.target.value);
                      }}
                      placeholder="Model Name"
                      name="modelName"
                    />
                  </div>
                </div>
              </div>
              {isGrid ? (
                <>
                  {isLoading && <SkeletonLoader />}
                  <AssetsGrid data={assetsData} mutate={mutate} />
                </>
              ) : (
                <>
                  {isLoading && <Loader />}
                  <AssetsColumn data={assetsData} mutate={mutate} />
                </>
              )}
              {assetsData?.length === 0 ? <LoaderAnime /> : null}
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
                      variant="outlined"
                      page={pageNumber}
                    />
                  </Stack>
                </div>
              ) : (
                ""
              )}
            </section>
          </>
        )}
      </>
    </PanelLayout>
  );
};

export default AllAssets;

const short = [
  { id: 1, value: "name:asc", name: "Name Ascending" },
  { id: 2, value: "name:desc", name: "Name Descending" },
  { id: 3, value: "createdAt:desc", name: "CreatedAt Ascending" },
  { id: 4, value: "createdAt:asc", name: "CreatedAt Descending" },
];
