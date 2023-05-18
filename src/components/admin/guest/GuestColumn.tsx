import MaterialTable from "@material-table/core";
import { PeopleRounded, PersonRounded } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { CopyClipboard, HeadStyle, IOSSwitch } from "components/core";
import { useChange } from "hooks";
import moment from "moment";
import Link from "next/link";
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
  const handleBlock = async (e: any, userId: string) => {
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
        const res = await change(`users/${userId}`, {
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
        title={<HeadStyle name="All Guests" icon={<PeopleRounded />} />}
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
            title: "Designation",
            field: "designation",
            // render: (data) => clock(data.updatedAt).fromNow(),
            editable: "never",
          },
          {
            title: "Valid From",
            field: "valid",
            render: (data) => {return(
              <div>
              {data?.card.length
                ? moment(data?.card[0]?.validFrom).format("lll")
                : "---"}
                </div>
            )},
            editable: "never",
          },
          {
            title: "Valid Till",
            field: "valid",
            render: (data) => {return(
              <div>
              {data?.card.length
                ? moment(data?.card[0]?.validTill).format("lll")
                : "---"}
                </div>
            )},
            editable: "never",
          },

          {
            title: "Created",
            field: "createdAt",
            render: (data) => new Date(data.createdAt).toDateString(),
            editable: "never",
          },
          {
            title: "Updated",
            field: "updatedAt",
            render: (data) => new Date(data.updatedAt).toDateString(),
            editable: "never",
          },
          {
            title: "Details",
            tooltip: "Details",
            render: (item) => {
              return (
                <Link href={`/admin/guests/guest-profile?id=${item?.id}`}>
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
        ]}
        editable={{
          onRowDelete: async (oldData) => {
            const res = await change(`guests/${oldData.id}`, {
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
          //   const res = await change(`users/${newData?.id}`, {
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
