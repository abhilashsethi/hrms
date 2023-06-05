import MaterialTable from "@material-table/core";
import { Info, PeopleRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { HeadStyle, ReverseIOSSwitch } from "components/core";
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

  return (
    <section className="mt-8">
      <DepartmentInformation
        open={isInfo?.dialogue}
        onClose={() => setIsInfo({ dialogue: false })}
        roleId={isInfo?.role?.id}
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
            field: "manager",
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
            render: (item) => {
              return (
                <ReverseIOSSwitch size="small"
                  checked={item?.isBlocked}
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
          onRowUpdate: async (newData) => {
            const res = await change(`branches/${newData?.id}`, {
              method: "PATCH",
              body: { name: newData?.name },
            });
            mutate();
            if (res?.status !== 200) {
              Swal.fire(`Error`, "Something went wrong!", "error");
              return;
            }
            Swal.fire(`Success`, "Updated Successfully!", "success");
            return;
          },
        }}
      />
    </section>
  );
};

export default AllBranchColumn;

