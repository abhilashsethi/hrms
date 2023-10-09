import MaterialTable from "@material-table/core";
import { Info, Leaderboard, Visibility } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";
import { HeadStyle, HeadText, Loader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import React from "react";
import { HOLIDAY, LeadsData } from "types";
import { MuiTblOptions } from "utils";

const Leads = () => {
  const {
    data: leadData,
    mutate,
    pagination,
    isLoading,
  } = useFetch<LeadsData[]>(`leads?orderBy=createdAt:desc`);
  console.log(leadData);
  return (
    <PanelLayout title="Leads">
      <section className="md:px-8 px-2 py-4">
        {isLoading ? (
          <Loader />
        ) : (
          <MaterialTable
            title={<HeadStyle name="All Leads" icon={<Leaderboard />} />}
            isLoading={!leadData}
            data={
              leadData
                ? leadData?.map((_, i: number) => ({
                    ..._,
                    sl: i + 1,
                    name: _?.name,
                    email: _?.email,
                    countryCode: _?.countryCode,
                    phone: _?.phone,
                    subject: _?.subject,
                    message: _?.message,
                    createdAt: _?.createdAt
                      ? moment(_?.createdAt).format("lll")
                      : "---",
                    updatedAt: _?.updatedAt
                      ? moment(_?.updatedAt).format("lll")
                      : "---",
                  }))
                : []
            }
            options={{
              ...MuiTblOptions(),
              selection: false,
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
                title: "Name",
                tooltip: "Name",
                field: "name",
                searchable: true,
              },
              {
                title: "Country Code",
                tooltip: "Country Code",
                field: "countryCode",
                searchable: true,
              },
              {
                title: "Phone",
                tooltip: "Phone",
                field: "phone",
                searchable: true,
              },

              {
                title: "Email",
                tooltip: "Email",
                field: "email",
                editable: "never",
              },
              {
                title: "Subject",
                tooltip: "Subject",
                field: "subject",
                searchable: true,
              },
              {
                title: "Updated At",
                field: "updatedAt",
                editable: "never",
              },
              {
                title: "Created At",
                field: "createdAt",
                editable: "never",
              },
            ]}
            detailPanel={[
              {
                tooltip: "info",
                icon: () => <Info />,
                openIcon: () => <Visibility />,
                render: ({ rowData }) => (
                  <>
                    <div
                      style={{
                        padding: "12px",
                        margin: "auto",
                        backgroundColor: "#eef5f9",
                      }}
                    >
                      <Card
                        sx={{
                          minWidth: 450,
                          // maxWidth: 500,
                          maxWidth: 800,
                          transition: "0.3s",
                          margin: "auto",
                          borderRadius: "10px",
                          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                          "&:hover": {
                            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
                          },
                        }}
                      >
                        <CardContent>
                          <Typography gutterBottom align="left">
                            Message :
                            <div className="flex gap-2">
                              <p className="font-semibold">
                                {rowData?.message
                                  ? rowData?.message
                                  : "No Message"}
                              </p>
                            </div>
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                ),
              },
            ]}
          />
        )}
      </section>
    </PanelLayout>
  );
};

export default Leads;
