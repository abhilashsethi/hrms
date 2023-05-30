import MaterialTable from "@material-table/core";
import { PeopleRounded, PersonRounded } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { CopyClipboard, HeadStyle } from "components/core";
import { useChange } from "hooks";
import Link from "next/link";
import Swal from "sweetalert2";
import { MuiTblOptions, clock, getDataWithSL } from "utils";
interface ARRAY {
  id?: string;
}
interface Props {
  data?: ARRAY[];
  mutate?: any;
}
const ClientTableView = ({ data, mutate }: Props) => {
  const { change, isChanging } = useChange();


  return (
    <section className="mt-8">
      <MaterialTable
        title={<HeadStyle name="All Clients" icon={<PeopleRounded />} />}
        isLoading={!data}
        data={data ? getDataWithSL<any>(data) : []}
        options={{ ...MuiTblOptions(), selection: false }}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },
          {
            title: "Name",
            tooltip: "Name",
            field: "name",
            editable: "never",
          },
          {
            title: "Email",
            tooltip: "Email",
            field: "email",
            editable: "never",
            render: ({ email }) => <CopyClipboard value={email} />,
          },

          {
            title: "Total Ticket",
            tooltip: "Total Ticket",
            editable: "never",
            render: (data) => (
              <>
                <p>{data?._count?.tickets}</p>
              </>
            ),
          },
          {
            title: "Total Project",
            tooltip: "Total project",
            editable: "never",
            render: (data) => (
              <>
                <p>{data?._count?.projects}</p>
              </>
            ),
          },
          {
            title: "Details",
            tooltip: "Details",
            render: (item) => {
              return (
                <Link href={`/admin/clients/client-profile?id=${item?.id}`}>
                  <Tooltip title="Details">
                    <div className="text-sm bg-gradient-to-r from-blue-500 to-blue-400 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
                      <PersonRounded className="!text-white" />
                    </div>
                  </Tooltip>
                </Link>
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
            const res = await change(`clients/${oldData.id}`, {
              method: "DELETE",
            });
            if (res?.status !== 200) {
              Swal.fire(`Error`, "Something went wrong!", "error");
              return;
            }
            Swal.fire(`Success`, "Deleted Successfully!", "success");
            mutate();
            return;
          },
        }}
      />
    </section>
  );
};

export default ClientTableView;
