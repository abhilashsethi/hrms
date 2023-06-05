import MaterialTable from "@material-table/core";
import { Edit, Info, PeopleRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { HeadStyle, ReverseIOSSwitch } from "components/core";
import { UpdateBranch } from "components/dialogues";
import { DepartmentInformation } from "components/drawer";
import { useChange } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Role } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";
interface Props {
  data?: any;
  mutate?: any;
}
const AllBranchColumn = ({ data, mutate }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change, isChanging } = useChange();
  const [isInfo, setIsInfo] = useState<{ dialogue?: boolean; role?: any }>({
    dialogue: false,
    role: null,
  });
  const [isUpdate, setIsUpdate] = useState<{
    dialogue?: boolean;
    branchData?: string | null;
  }>({ dialogue: false, branchData: null });

  return (
    <section className="mt-8">
      <UpdateBranch
        branchData={isUpdate?.branchData}
        open={isUpdate?.dialogue}
        handleClose={() => setIsUpdate({ dialogue: false })}
        mutate={mutate}
      />
      <MaterialTable
        title={<HeadStyle name="All Branch" icon={<PeopleRounded />} />}
        isLoading={!data}
        data={data ? getDataWithSL<any>(data) : []}
        options={{ ...MuiTblOptions(), selection: false, paging: false }}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },
          {
            title: "Branch Name",
            tooltip: "Branch Name",
            field: "name",
          },
          {
            title: "Manager",
            tooltip: "Manager",
            render: (data) => {
              return (
                <span>{data?.manager?.name}</span>
              );
            },
          },
          {
            title: "Email",
            tooltip: "Email",
            field: "email",
          },
          {
            title: "Phone",
            tooltip: "Phone",
            field: "phone",
          },
          {
            title: "Country",
            tooltip: "Country",
            field: "country",
          },
          {
            title: "Location",
            tooltip: "Location",
            field: "location",
          },
          {
            title: "Status",
            tooltip: "Status",
            render: (data) => {
              return (
                <ReverseIOSSwitch size="small"
                  checked={data?.isBlocked}
                // onChange={(e) => handleBlock(e, item?.id)}
                />
              );
            },
            editable: "never",
          },

          {
            title: "Last Updated",
            field: "updatedAt",
            render: (data) => clock(data.updatedAt).fromNow(),
            editable: "never",
          },
          {
            title: "Created",
            field: "createdAt",
            render: (data) => new Date(data.createdAt).toDateString(),
            editable: "never",
          },
          {
            title: "Update",
            tooltip: "update",
            render: (item) => {
              return (
                <span onClick={() => {
                  setIsUpdate({ dialogue: true, branchData: item });
                }} className="group w-full hover:bg-theme text-theme hover:text-white flex border-2 px-2 py-1 items-center justify-center ">
                  <Edit fontSize="small" />
                </span>
              );
            },
            editable: "never",
          },
        ]}
        editable={{
          onRowDelete: async (oldData) => {
            setLoading(true);
            Swal.fire("", "Please Wait...", "info");
            try {
              const res = await change(`branches/${oldData.id}`, {
                method: "DELETE",
              });
              setLoading(false);
              if (res?.status !== 200) {
                Swal.fire(
                  "Error",
                  res?.results?.msg || "Something went wrong!",
                  "error"
                );
                setLoading(false);
                return;
              }
              mutate();
              Swal.fire(`Success`, `Deleted Successfully!`, `success`);
              return;
            } catch (error) {
              console.log(error);
              setLoading(false);
            } finally {
              setLoading(false);
            }
          },
        }}
      />
    </section>
  );
};

export default AllBranchColumn;

