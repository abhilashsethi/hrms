import MaterialTable from "@material-table/core";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import React from "react";
import { User } from "types";
import { MuiTblOptions, getDataWithSL } from "utils";

const BankInfo = () => {
  const { data, isLoading, mutate } = useFetch<User[]>(`users`);
  const { change, isChanging } = useChange();
  const { push } = useRouter();
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 py-6">
        <div className="bg-white rounded-md shadow-md px-6 py-4">
          <h1 className="text-xl font-medium py-2">Bank information</h1>
          <div className="grid grid-cols-3 gap-1 py-2 tracking-wide">
            <h5 className="font-medium">Bank name :</h5>
            <span className="col-span-2">ICICI Bank</span>
            <h5 className="font-medium">Bank account No. :</h5>
            <span className="col-span-2 ">159843014641</span>
            <h5 className="font-medium">IFSC Code :</h5>
            <span className="col-span-2 ">ICI24504</span>
            <h5 className="font-medium">PAN No :</h5>
            <span className="col-span-2 ">TC000Y56</span>
          </div>
        </div>
        <div className="rounded-md bg-white shadow-md px-6 py-4">
          <MaterialTable
            title="Family Information"
            isLoading={isLoading || isChanging}
            data={data ? getDataWithSL<User>(data) : []}
            options={{ ...MuiTblOptions(), selection: false }}
            columns={[
              {
                title: "Name",
                tooltip: "Name",
                field: "name",
                emptyValue: "Not Provided",
              },
              {
                title: "Relationship",
                tooltip: "Relationship",
                field: "relationship",
                emptyValue: "Not Provided",
              },
              {
                title: "Date of Birth",
                tooltip: "Date of Birth",
                field: "DateOfBirth",
                emptyValue: "Not Provided",
              },

              {
                title: "Phone",
                field: "phone",
                emptyValue: "Not Provided",
              },
            ]}
            onRowDoubleClick={(e, rowData) =>
              push(`/admin/attendances/user/${rowData?.id}`)
            }
            editable={{
              onRowDelete: async (oldData) => {
                const res = await change(`PATH`, {
                  method: "DELETE",
                });
                console.log(res);
                mutate();
              },
              async onRowAdd(newData) {
                try {
                  const response = await change(`users`, { body: newData });
                  console.log(response);
                  mutate();
                } catch (error) {
                  console.log(error);
                }
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default BankInfo;
