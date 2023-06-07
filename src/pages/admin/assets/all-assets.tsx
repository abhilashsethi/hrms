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
import { AdminBreadcrumbs, Loader, LoaderAnime } from "components/core";
import ChooseBranch from "components/dialogues/ChooseBranch";
import ChooseBranchToViewAssets from "components/dialogues/ChooseBranchToViewAssets";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useEffect, useState } from "react";

const AllAssets = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [isChoose, setIsChoose] = useState(false);
  const [isView, setIsView] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [userName, setUsername] = useState<string | null>(null);
  const [isOrderBy, setIsOrderBy] = useState<string | null>(null);
  const [isBrand, setIsBrand] = useState<string | null>(null);
  const [isBranch, setIsBranch] = useState<string | null>(null);
  const [isModel, setIsModel] = useState<string | null>(null);
  const [branchId, setBranchId] = useState<string | null>(null);
  console.log(branchId);

  const {
    data: departmentData,
    mutate,
    isLoading,
  } = useFetch<any>(
    `departments?page=${pageNumber}&limit=8${userName ? `&contains=${userName}` : ""
    }${isOrderBy ? `&orderBy=${isOrderBy}` : ""}`
  );

  const {
    data: assetsData,
    mutate: assetMutate,
    pagination,
  } = useFetch<any>(
    `assets?page=${pageNumber}&limit=8${userName ? `&name=${userName}` : ""}${isOrderBy ? `&orderBy=${isOrderBy}` : ""
    }${isBrand ? `&brandName=${isBrand}` : ""}${isBranch ? `&branchName=${isBranch}` : ""
    }${isModel ? `&modelName=${isModel}` : ""}`
  );
  // console.log(assetsData);

  useEffect(() => {
    setTimeout(() => {
      setIsView(true);
    }, 3000);
  }, []);

  return (
    <PanelLayout title="All Assets - Admin Panel">
      <>
        <ChooseBranch
          open={isChoose}
          handleClose={() => setIsChoose(false)}
          mutate={mutate}
        />
        <ChooseBranchToViewAssets
          open={isView}
          handleClose={() => setIsView(false)}
          mutate={mutate}
          setBranchId={setBranchId}
        />
        {branchId ? (
          <>
            <section className=" px-8 py-4">
              <div className="lg:flex justify-between items-center py-4">
                <AdminBreadcrumbs links={links} />
                <div className="md:flex gap-4 items-center">
                  <div className="flex gap-1">
                    <IconButton onClick={() => setIsGrid(true)} size="small">
                      <div
                        className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${isGrid && `border-2 border-theme`
                          }`}
                      >
                        <GridViewRounded
                          className={`${isGrid && `!text-theme`}`}
                        />
                      </div>
                    </IconButton>
                    <IconButton onClick={() => setIsGrid(false)} size="small">
                      <div
                        className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${!isGrid && `border-2 border-theme`
                          }`}
                      >
                        <TableRowsRounded
                          className={`${!isGrid && `!text-theme`}`}
                        />
                      </div>
                    </IconButton>
                  </div>
                  {/* <Link href="/admin/assets/create-assets"> */}
                  <Button
                    onClick={() => setIsChoose(true)}
                    variant="contained"
                    className="!bg-theme"
                    startIcon={<Add />}
                  >
                    CREATE ASSETS
                  </Button>
                  {/* </Link> */}
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
                        setIsOrderBy(null);
                        setUsername(null);
                        setIsBrand(null);
                        setIsBranch(null);
                        setIsModel(null);
                      }}
                    >
                      <Tooltip
                        title={
                          isOrderBy != null ||
                            userName != null ||
                            isBrand != null ||
                            isBranch != null ||
                            isModel != null
                            ? `Remove Filters`
                            : `Filter`
                        }
                      >
                        {isOrderBy != null ||
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
                      placeholder="Model Number"
                      name="modelName"
                    />
                  </div>
                </div>
              </div>
              {isGrid ? (
                <>
                  {isLoading && <Loader />}
                  <AssetsGrid data={assetData} mutate={assetMutate} />
                </>
              ) : (
                <>
                  {isLoading && <Loader />}
                  <AssetsColumn data={assetData} mutate={assetMutate} />
                </>
              )}
              {assetData?.length === 0 ? <LoaderAnime /> : null}
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
    </PanelLayout>
  );
};

export default AllAssets;

const links = [
  // { id: 1, page: "Branch", link: "/admin/branch" },
  {
    id: 2,
    page: "All Assets",
    link: "/admin/assets/all-assets",
  },
];
const short = [
  { id: 1, value: "name:asc", name: "Name Ascending" },
  { id: 2, value: "name:desc", name: "Name Descending" },
  { id: 3, value: "createdAt:asc", name: "CreatedAt Ascending" },
  { id: 4, value: "createdAt:desc", name: "CreatedAt Descending" },
];

const assetData = [
  {
    id: "01",
    name: "Laptop",
    photos: [
      {
        i: 1,
        photo:
          "https://img.freepik.com/free-photo/laptop-with-blank-black-screen-white-table_53876-97915.jpg?w=996&t=st=1685941336~exp=1685941936~hmac=600279e95b0695fc35146572dbae5a835b4b173cda718b594fff338d67c92c1f",
      },
      {
        i: 2,
        photo:
          "https://img.freepik.com/free-photo/work-desk-with-computer-cup-with-pens-pencils-against-white-wall_181624-44978.jpg?w=996&t=st=1685941433~exp=1685942033~hmac=dcd1ecea9d29a5b13041ca4b54294595ad87ef525867f1b8cf5c1d3c3be44f88",
      },
      {
        i: 3,
        photo:
          "https://img.freepik.com/free-photo/empty-meeting-room-with-table-whiteboard_1262-3763.jpg?w=996&t=st=1685941618~exp=1685942218~hmac=9cd100c941a6b9bceb1c82b24a870c0ba7da1bbe0d50a6acd83e162bc284d87c",
      },
      {
        i: 4,
        photo:
          "https://img.freepik.com/free-photo/home-printer-based-toner_23-2149287461.jpg?w=996&t=st=1685943942~exp=1685944542~hmac=ca684816e145f3b09d5192377ff31eb0fed21d348b67d326b8582c36defce9e0",
      },
    ],
    modelName: "82K201Y8IN",
    brandName: "Lenovo",
    dateOfPurchase: "05/06/2023",
    purchasePrice: "50,000",
    marketPrice: "40,000",
    serialNumber: "2131335465",
    docs: "",
    assetOfBranch: {
      name: "Searching Yard",
    },
  },
  {
    id: "02",
    name: "Desktop",
    photos: [
      {
        i: 1,
        photo:
          "https://img.freepik.com/free-photo/laptop-with-blank-black-screen-white-table_53876-97915.jpg?w=996&t=st=1685941336~exp=1685941936~hmac=600279e95b0695fc35146572dbae5a835b4b173cda718b594fff338d67c92c1f",
      },
      {
        i: 2,
        photo:
          "https://img.freepik.com/free-photo/work-desk-with-computer-cup-with-pens-pencils-against-white-wall_181624-44978.jpg?w=996&t=st=1685941433~exp=1685942033~hmac=dcd1ecea9d29a5b13041ca4b54294595ad87ef525867f1b8cf5c1d3c3be44f88",
      },
      {
        i: 3,
        photo:
          "https://img.freepik.com/free-photo/empty-meeting-room-with-table-whiteboard_1262-3763.jpg?w=996&t=st=1685941618~exp=1685942218~hmac=9cd100c941a6b9bceb1c82b24a870c0ba7da1bbe0d50a6acd83e162bc284d87c",
      },
      {
        i: 4,
        photo:
          "https://img.freepik.com/free-photo/home-printer-based-toner_23-2149287461.jpg?w=996&t=st=1685943942~exp=1685944542~hmac=ca684816e145f3b09d5192377ff31eb0fed21d348b67d326b8582c36defce9e0",
      },
    ],
    modelNo: "82K201Y8IN",
    brand: "Lenovo",
    dateOfPurchase: "05/06/2023",
    billAmount: "50,000",
    currentMp: "40,000",
    slNo: "2131335465",
    docs: "",
  },
  {
    id: "03",
    name: "Office Chairs",
    location: "Electronic City, Karnatak,",
    photos: [
      {
        i: 1,
        photo:
          "https://img.freepik.com/free-photo/laptop-with-blank-black-screen-white-table_53876-97915.jpg?w=996&t=st=1685941336~exp=1685941936~hmac=600279e95b0695fc35146572dbae5a835b4b173cda718b594fff338d67c92c1f",
      },
      {
        i: 2,
        photo:
          "https://img.freepik.com/free-photo/work-desk-with-computer-cup-with-pens-pencils-against-white-wall_181624-44978.jpg?w=996&t=st=1685941433~exp=1685942033~hmac=dcd1ecea9d29a5b13041ca4b54294595ad87ef525867f1b8cf5c1d3c3be44f88",
      },
      {
        i: 3,
        photo:
          "https://img.freepik.com/free-photo/empty-meeting-room-with-table-whiteboard_1262-3763.jpg?w=996&t=st=1685941618~exp=1685942218~hmac=9cd100c941a6b9bceb1c82b24a870c0ba7da1bbe0d50a6acd83e162bc284d87c",
      },
      {
        i: 4,
        photo:
          "https://img.freepik.com/free-photo/home-printer-based-toner_23-2149287461.jpg?w=996&t=st=1685943942~exp=1685944542~hmac=ca684816e145f3b09d5192377ff31eb0fed21d348b67d326b8582c36defce9e0",
      },
    ],
    modelNo: "Movable Chair",
    brand: "",
    dateOfPurchase: "05/06/2023",
    billAmount: "50,000",
    currentMp: "40,000",
    slNo: "2131335465",
    docs: "",
  },
  {
    id: "04",
    name: "Printer",
    photos: [
      {
        i: 1,
        photo:
          "https://img.freepik.com/free-photo/laptop-with-blank-black-screen-white-table_53876-97915.jpg?w=996&t=st=1685941336~exp=1685941936~hmac=600279e95b0695fc35146572dbae5a835b4b173cda718b594fff338d67c92c1f",
      },
      {
        i: 2,
        photo:
          "https://img.freepik.com/free-photo/work-desk-with-computer-cup-with-pens-pencils-against-white-wall_181624-44978.jpg?w=996&t=st=1685941433~exp=1685942033~hmac=dcd1ecea9d29a5b13041ca4b54294595ad87ef525867f1b8cf5c1d3c3be44f88",
      },
      {
        i: 3,
        photo:
          "https://img.freepik.com/free-photo/empty-meeting-room-with-table-whiteboard_1262-3763.jpg?w=996&t=st=1685941618~exp=1685942218~hmac=9cd100c941a6b9bceb1c82b24a870c0ba7da1bbe0d50a6acd83e162bc284d87c",
      },
      {
        i: 4,
        photo:
          "https://img.freepik.com/free-photo/home-printer-based-toner_23-2149287461.jpg?w=996&t=st=1685943942~exp=1685944542~hmac=ca684816e145f3b09d5192377ff31eb0fed21d348b67d326b8582c36defce9e0",
      },
    ],
    modelNo: "82K201Y8IN",
    brand: "Lenovo",
    dateOfPurchase: "05/06/2023",
    billAmount: "50,000",
    currentMp: "40,000",
    slNo: "2131335465",
    docs: "",
  },
];
