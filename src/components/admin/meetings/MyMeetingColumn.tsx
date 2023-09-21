import MaterialTable from "@material-table/core";
import {
  BorderColor,
  Delete,
  Info,
  KeyboardArrowDownRounded,
  LocationOn,
  MedicalInformationRounded,
  MeetingRoom,
  RadioButtonChecked,
  Visibility,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { SAMPLEDP } from "assets/home";
import { HeadStyle, LocationLoaderAnime } from "components/core";
import { useFetch } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useState, MouseEvent } from "react";
import { MuiTblOptions } from "utils";
import Swal from "sweetalert2";
import { useChange } from "hooks";
import GoogleMapReact from "google-map-react";
import { Google_Map_Api_Key } from "config/env.config";

interface ARRAY {
  id?: string;
  title?: string;
  address?: string;
  clientEmail?: string;
  clientName?: string;
  clientPhone?: string;
  meetingDate?: string;
  meetingEndTime?: string;
  meetingStartTime?: string;
  meetingPersonName?: string;
  status?: string;
  purpose?: string;
}
interface Props {
  data?: ARRAY[];
  mutate?: any;
}

const MyMeetingColumn = ({ data, mutate }: Props) => {
  const AnyReactComponent = ({ icon }: any) => <div>{icon}</div>;
  const router = useRouter();

  const { change } = useChange();
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          Swal.fire(`Info`, "It will take some time", "info");
          const response = await change(`meetings/${id}`, {
            method: "DELETE",
          });
          if (response?.status !== 200) {
            Swal.fire("Error", "Something went wrong!", "error");
          }
          Swal.fire("Success", "Deleted successfully!", "success");
          mutate();
        }
      } catch (error) {
        if (error instanceof Error) {
          Swal.fire(`Error`, error?.message, `error`);
        } else {
          Swal.fire(`Error`, "Something Went Wrong", `error`);
        }
      }
    });
  };

  return (
    <>
      <div className="mt-6">
        <MaterialTable
          components={{
            Container: (props) => <Paper {...props} elevation={5} />,
          }}
          title={<HeadStyle name="Meetings" icon={<MeetingRoom />} />}
          isLoading={!data}
          data={
            !data?.length
              ? []
              : data?.map((item: any, i: number) => ({
                  ...item,
                  sn: i + 1,
                  meetingDate: new Date(
                    item?.meetingDate
                  )?.toLocaleDateString(),
                  meetingStartTime: new Date(
                    item?.meetingStartTime
                  )?.toLocaleString(),
                  meetingEndTime: new Date(
                    item?.meetingEndTime
                  )?.toLocaleString(),
                  clientEmail: item?.clientEmail ? item.clientEmail : "---",
                  clientName: item?.clientName ? item.clientName : "---",
                  clientPhone: item?.clientPhone ? item.clientPhone : "---",
                  meetingPersonName: item?.meetingPersonName
                    ? item.meetingPersonName
                    : "---",
                  status: item?.status ? item.status : "---",
                  purpose: item?.purpose ? item.purpose : "---",
                }))
          }
          options={{
            ...MuiTblOptions(),
          }}
          columns={[
            {
              title: "#",
              field: "sn",
              editable: "never",
              width: "2%",
            },
            {
              title: "Meeting Title",
              tooltip: "Meeting Title",
              searchable: true,
              field: "title",
            },
            {
              title: "Client Email",
              tooltip: "Client Email",
              searchable: true,
              field: "clientEmail",
            },
            {
              title: "Client Name",
              tooltip: "Client Name",
              searchable: true,
              field: "clientName",
            },
            {
              title: "Client Phone",
              tooltip: "Client Phone",
              searchable: true,
              field: "clientPhone",
            },
            {
              title: "Meeting Date",
              tooltip: "Meeting Date",
              searchable: true,
              field: "meetingDate",
              render: (data) => moment(data?.meetingDate).format("ll"),
            },
            {
              title: "Meeting Start Time",
              tooltip: "Meeting Start Time",
              searchable: true,
              field: "meetingStartTime",
              render: (data) => data?.meetingStartTime,
            },
            {
              title: "Meeting End Time",
              tooltip: "MeetingEnd Time",
              searchable: true,
              field: "meetingEndTime",
              render: (data) => moment(data?.meetingEndTime).format("LT"),
            },
            {
              title: "Status",
              tooltip: "Status",
              field: "status",
              // render: (item) => <MeetingStatus />,
            },
            {
              title: "Created",
              field: "createdAt",
              render: (data) => moment(data?.createdAt).format("ll"),
              editable: "never",
            },
            {
              title: "Actions",
              cellStyle: {
                textAlign: "right",
              },
              export: true,
              // width: "18%",
              // field: "pick",
              render: (row) => (
                <>
                  <div className="flex">
                    <Tooltip title="Edit">
                      <Avatar
                        // onClick={() => setOpenAddCustomerDrawer(row)}
                        onClick={() =>
                          router.push(
                            `/admin/meetings/meeting-details?id=${row?.id}`
                          )
                        }
                        variant="rounded"
                        className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-theme !p-0"
                        sx={{
                          mr: ".1vw",
                          padding: "0px !important",
                          backgroundColor: "Highlight",
                          cursor: "pointer",
                          color: "",
                        }}
                      >
                        <Info sx={{ padding: "0px !important" }} />
                      </Avatar>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <Avatar
                        onClick={() => handleDelete(row?.id)}
                        variant="rounded"
                        className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-700 !p-0"
                        sx={{
                          mr: "0.1vw",
                          padding: "0px !important",
                          backgroundColor: "Highlight",
                          cursor: "pointer",
                          color: "",
                        }}
                      >
                        <Delete sx={{ padding: "0px !important" }} />
                      </Avatar>
                    </Tooltip>
                  </div>
                </>
              ),
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
                        maxWidth: 500,
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
                          Location :
                          <span
                            style={{
                              color: "rgb(30, 136, 229)",
                              fontSize: "15px",
                              wordBreak: "break-word",
                              wordWrap: "break-word",
                            }}
                          >
                            {rowData?.lat && rowData?.lng ? (
                              <div style={{ height: "250px", width: "100%" }}>
                                <GoogleMapReact
                                  bootstrapURLKeys={{
                                    key: Google_Map_Api_Key,
                                  }}
                                  defaultCenter={{
                                    lat: rowData?.lat,
                                    lng: rowData?.lng,
                                  }}
                                  defaultZoom={15}
                                >
                                  <AnyReactComponent
                                    icon={
                                      <LocationOn className="!text-red-600 h-10 w-10" />
                                    }
                                  />
                                </GoogleMapReact>
                              </div>
                            ) : (
                              <LocationLoaderAnime />
                            )}
                          </span>
                        </Typography>
                        <Typography gutterBottom align="left">
                          Purpose :
                          <p
                            style={{
                              color: "rgb(30, 136, 229)",
                              fontSize: "15px",
                              wordBreak: "break-word",
                              wordWrap: "break-word",
                            }}
                          >
                            {rowData?.purpose}
                          </p>
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ),
            },
          ]}
        />
      </div>
    </>
  );
};

export default MyMeetingColumn;

const MeetingStatus = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="flex gap-3 items-center bg-white px-4 py-1.5 rounded-full font-medium shadow-lg"
      >
        <span className="flex gap-2 items-center">
          <RadioButtonChecked fontSize="small" className="!text-blue-500" />
          Completed
        </span>
        <div>
          <KeyboardArrowDownRounded fontSize="small" />
        </div>
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {status?.map((item) => (
          <MenuItem
            key={item?.id}
            className="flex gap-2 items-center"
            onClick={handleClose}
          >
            {item?.icon}
            {item?.value}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

const cards = [
  { id: 1, title: "Today Presents", value: "12/20" },
  { id: 2, title: "Planned Leaves", value: "8" },
  { id: 3, title: "Unplanned Leaves", value: "0" },
  { id: 4, title: "Pending Requests", value: "12" },
];

const data = [
  {
    id: 1,
    meetingTitle: "HRMS Meeting",
    startTime: "10:00 AM",
    endTime: "12:30 PM",
  },
];

const status = [
  {
    id: 1,
    value: "Completed",
    icon: <RadioButtonChecked fontSize="small" className="!text-blue-500" />,
  },
  {
    id: 2,
    value: "On Progress",
    icon: <RadioButtonChecked fontSize="small" className="!text-green-500" />,
  },
  {
    id: 3,
    value: "Cancelled",
    icon: <RadioButtonChecked fontSize="small" className="!text-red-500" />,
  },
];
