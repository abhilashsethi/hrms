import MaterialTable from "@material-table/core";
import { PeopleRounded } from "@mui/icons-material";
import { HeadStyle } from "components/core";
import { useChange } from "hooks";
import Swal from "sweetalert2";
import { MuiTblOptions, clock, getDataWithSL } from "utils";
interface ARRAY {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  visitInfo?: string;
  company?: string;
  designation?: string;
}
interface Props {
  data?: ARRAY[];
  mutate?: any;
}
const GuestColumn = ({ data, mutate }: Props) => {
  const { change, isChanging } = useChange();
  const handleBlock = async (e: any, id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await change(`technologies/${id}`, {
          method: "PATCH",
          body: { isBlocked: !e.target?.checked },
        });
        mutate();
        if (res?.status !== 200) {
          Swal.fire(`Error`, "Something went wrong!", "error");
          return;
        }
        Swal.fire(`Success`, "Status updated successfully!", "success");
        return;
      }
    });
  };
  return (
    <section className="mt-8">
      <MaterialTable
        title={<HeadStyle name="All Technology" icon={<PeopleRounded />} />}
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
            title: "Name",
            tooltip: "Name",
            field: "name",
            editable: "never",
          },
          {
            title: "Total Project",
            tooltip: "Total Project",
            render: (data) => {
              return <p>{data.usedProjectIds.length}</p>;
            },
            editable: "never",
          },
          {
            title: "Updated",
            field: "updatedAt",
            render: (data) => new Date(data.updatedAt).toDateString(),
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
            const res = await change(`technologies/${oldData.id}`, {
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
          // onRowUpdate: async (newData: any) => {
          //   const res = await change(`technologies/${newData?.id}`, {
          //     method: "PATCH",
          //     body: {
          //       isOfficeAccessGranted:
          //         newData?.isOfficeAccessGranted === "true" ? true : false,
          //     },
          //   });
          //   console.log(res);
          //   mutate();
          //   if (res?.status !== 200) {
          //     Swal.fire(`Error`, "Something went wrong!", "error");
          //     return;
          //   }
          //   Swal.fire(`Success`, "Updated Successfully!", "success");
          //   return;
          // },
        }}
      />
    </section>
  );
};

export default GuestColumn;
