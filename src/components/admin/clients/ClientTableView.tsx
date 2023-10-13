import MaterialTable from "@material-table/core";
import { PeopleRounded, PersonRounded } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { CopyClipboard, HeadStyle } from "components/core";
import { useChange } from "hooks";
import moment from "moment";
import Link from "next/link";
import Swal from "sweetalert2";
import { Client } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";
interface ARRAY {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  email?: string;
  _count?: { tickets?: number; projects?: number };
}
interface Props {
  data?: Client[];
  mutate?: any;
}
const ClientTableView = ({ data, mutate }: Props) => {
  const { change, isChanging } = useChange();

  return (
    <section className="lg:px-8 px-2 my-8">
      <MaterialTable
        title={<HeadStyle name="All Clients" icon={<PeopleRounded />} />}
        isLoading={!data}
        data={
          data
            ? data?.map((item, i: number) => ({
                sn: i + 1,
                id: item?.id,
                name: item?.name,
                email: item?.email,
                ticket: item?._count?.tickets,
                project: item?._count?.projects,
                updatedAtData: item?.updatedAt
                  ? clock(item?.updatedAt).fromNow()
                  : "---",
                createdAtData: item?.createdAt
                  ? moment(item?.createdAt).format("ll")
                  : "---",
              }))
            : []
        }
        options={{
          ...MuiTblOptions("All Clients"),
          selection: false,
          paging: false,
        }}
        columns={[
          {
            title: "#",
            field: "sn",
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
          },

          {
            title: "Total Ticket",
            tooltip: "Total Ticket",
            editable: "never",
            field: "ticket",
          },
          {
            title: "Total Project",
            tooltip: "Total project",
            editable: "never",
            field: "project",
          },
          {
            title: "Details",
            tooltip: "Details",
            render: (data) => {
              return (
                <Link href={`/admin/clients/client-profile?id=${data?.id}`}>
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
            field: "updatedAtData",
            editable: "never",
          },

          {
            title: "Created",
            field: "createdAtData",
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
