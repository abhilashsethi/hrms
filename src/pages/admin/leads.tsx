import PanelLayout from "layouts/panel";
import MaterialTable from "@material-table/core";
import { PeopleRounded, PersonRounded } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { CopyClipboard, HeadStyle } from "components/core";
import { useChange } from "hooks";
import Link from "next/link";
import Swal from "sweetalert2";
import { MuiTblOptions, clock, getDataWithSL } from "utils";


const Leads = () => {
  const { change, isChanging } = useChange();
  return (
    <PanelLayout title="Leads - Admin Panel">
      <section className="mt-8">
        <MaterialTable
          title={<HeadStyle name="All Clients" icon={<PeopleRounded />} />}
          isLoading={!leadData}
          data={leadData ? getDataWithSL<any>(leadData) : []}
          options={{ ...MuiTblOptions(), selection: false, paging: false }}
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
              title: "Phone",
              tooltip: "Phone",
              field: "phone",
              editable: "never",
              render: ({ phone }) => <CopyClipboard value={phone} />,
            },
            {
              title: "Description",
              tooltip: "Description",
              field: "description",
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
              return;
            },
          }}
        />
      </section>
    </PanelLayout>
  );
};

export default Leads;
const leadData = [
  {
    id: "1",
    name: "John Doe",
    email: "jihn@gmail.com",
    phone: "20222155",
    description: "lorem is spon isnsjsjv",
  },
  {
    id: "2",
    name: "Kaily Tailor",
    email: "kaily@gmail.com",
    phone: "545649489",
    description: "i wanat this product, can you help me out",
  },
  {
    id: "3",
    name: "John Doe",
    email: "jihn@gmail.com",
    phone: "20222155",
    description: "lorem is spon isnsjsjv",
  },
  {
    id: "4",
    name: "Kaily Tailor",
    email: "kaily@gmail.com",
    phone: "545649489",
    description: "i wanat this product, can you help me out",
  },
]