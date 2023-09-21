import MaterialTable from "@material-table/core";
import { BorderColor, Delete, HolidayVillage } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { HeadStyle } from "components/core";
import { EditHoliday } from "components/dialogues";
import { useAuth, useChange } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { HOLIDAY } from "types";
import { MuiTblOptions } from "utils";
interface Props {
  data?: HOLIDAY[];
  mutate: () => void;
}
const HolidayColumn = ({ data, mutate }: Props) => {
  const { user } = useAuth();
  const [holidays, setHolidays] = useState<HOLIDAY>();
  const [editDetails, setEditDetails] = useState<boolean>(false);

  const { change, isChanging } = useChange();
  const handleDelete = (id?: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire(`Info`, "It will take some time", "info");
          const res = await change(`holidays/${id}`, {
            method: "DELETE",
          });

          if (res?.status !== 200) {
            Swal.fire(
              "Error",
              res?.results?.msg || "Something went wrong!",
              "error"
            );
            return;
          }
          Swal.fire(`Success`, "Deleted Successfully!", "success");
          mutate();
          return;
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
    }
  };

  return (
    <section className="mt-8">
      <EditHoliday
        open={editDetails}
        handleClose={() => setEditDetails(false)}
        holidayData={holidays}
        mutate={mutate}
      />
      <MaterialTable
        title={<HeadStyle name="All Holidays" icon={<HolidayVillage />} />}
        isLoading={!data}
        data={
          data
            ? data?.map((_: HOLIDAY, i: number) => ({
                ..._,
                sl: i + 1,
                startDate: new Date(_?.startDate).toDateString(),
                endDate: _?.endDate
                  ? new Date(_?.endDate).toDateString()
                  : "---",
              }))
            : []
        }
        options={{
          ...MuiTblOptions(),
          selection: false,
          paging: false,
          search: true,
        }}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            searchable: true,
          },
          {
            title: "Title",
            tooltip: "Title",
            field: "title",
            searchable: true,
          },

          {
            title: "Start Date",
            field: "startDate",
            editable: "never",
          },
          {
            title: "End Date",
            field: "endDate",
            editable: "never",
          },
          user?.role?.name === "CEO"
            ? {
                title: "Actions",
                width: "5%",
                tooltip: "Actions",
                headerStyle: {
                  textAlign: "center",
                },
                cellStyle: {
                  textAlign: "center",
                },
                render: (item) => {
                  return (
                    <div className="flex items-center justify-center gap-1">
                      <Tooltip title="Edit">
                        <Avatar
                          variant="rounded"
                          className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-blue-500 !p-0"
                          sx={{
                            mr: ".1vw",
                            padding: "0px !important",
                            backgroundColor: "Highlight",
                            cursor: "pointer",
                            color: "",
                            width: 30,
                            height: 30,
                          }}
                        >
                          <BorderColor
                            sx={{ padding: "0px !important" }}
                            fontSize="small"
                            onClick={() => {
                              setEditDetails((prev) => !prev),
                                setHolidays(item);
                            }}
                          />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Avatar
                          variant="rounded"
                          className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-500 !p-0"
                          sx={{
                            mr: "0.1vw",
                            padding: "0px !important",
                            backgroundColor: "Highlight",
                            cursor: "pointer",
                            color: "",
                            width: 30,
                            height: 30,
                          }}
                        >
                          <Delete
                            sx={{ padding: "0px !important" }}
                            fontSize="small"
                            onClick={() => handleDelete(item?.id)}
                          />
                        </Avatar>
                      </Tooltip>
                    </div>
                  );
                },
                editable: "never",
              }
            : // If the user is not a CEO, render an empty object for the "Actions" column
              {},
        ]}
      />
    </section>
  );
};

export default HolidayColumn;
