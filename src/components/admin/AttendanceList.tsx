import MaterialTable from "@material-table/core";
import { useFetch } from "hooks";
import moment from "moment";
import { Attendance } from "types";
import { MuiTblOptions, getDataWithSL } from "utils";

interface Props {
  data: any;
}

const AttendanceList = ({ data }: Props) => {
  // const { data, isLoading } = useFetch<any>(
  //   `attendances/preset_absent/date/${new Date().toISOString().slice(0, 10)}`
  // );
  console.log(data);
  return (
    <div className="mt-4">
      <MaterialTable
        title={"Today Attendance"}
        isLoading={!data}
        data={data ? getDataWithSL<Attendance>(data) : []}
        options={{ ...MuiTblOptions(), selection: true }}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },
          {
            title: "Name",
            field: "name",
          },
          {
            title: "Email",
            field: "email",
          },
          {
            title: "Status",
            field: "isPresent",
            render: (item: any) => {
              return (
                <span
                  className={`px-4 py-1 rounded-lg ${
                    item?.isPresent
                      ? `bg-green-300 border-[1px] text-green-600 border-green-400`
                      : `bg-red-300 border-[1px] border-red-500 text-red-600`
                  }`}
                >
                  {item?.isPresent ? `PRESET` : `ABSENT`}
                </span>
              );
            },
          },
          {
            title: "Date",
            field: "date",
            render: (data) => new Date().toISOString().slice(0, 10),
          },
          {
            title: "In Time",
            field: "createdAt",
            render: (data) => moment(data?.createdAt).format("lll"),
          },
          {
            title: "Out Time",
            field: "updatedAt",
            render: (data) => moment(data?.updatedAt).format("lll"),
          },
        ]}
      />
    </div>
  );
};

export default AttendanceList;
