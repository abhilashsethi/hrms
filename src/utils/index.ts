import { Options } from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

export const MuiTblOptions = () => {
  const options: Options<any> = {
    headerStyle: {
      whiteSpace: "nowrap",
      backgroundColor: "rgb(162 163 232 / 35%)",
      color: "#000461",
      fontWeight: "bold",
      fontSize: "0.9rem",
      fontFamily: "inherit",
    },
    rowStyle: {
      backgroundColor: "#fff",
      color: "#2e2929",
      fontWeight: "500",
      fontSize: "0.9rem",
    },
    actionsColumnIndex: -1,
    addRowPosition: "first",
    pageSize: 5,
    detailPanelColumnAlignment: "right",
    exportAllData: true,
    headerSelectionProps: { color: "secondary" },
    selectionProps: () => ({
      color: "secondary",
    }),
    exportMenu: [
      {
        label: "Export All Data In CSV",
        exportFunc: (cols: any, data: any) => ExportCsv(cols, data, "AllData"),
      },
      {
        label: "Export All Data In PDF",
        exportFunc: (cols: any, data: any) => ExportPdf(cols, data, "AllData"),
      },
    ],
  };
  return options;
};

export const MuiTblOptionsSecondary = () => {
  const options: Options<any> = {
    headerStyle: {
      whiteSpace: "nowrap",
      backgroundColor: "rgb(202 222 52 / 43%)",
      color: "#DE3451",
      fontWeight: "bold",
      fontSize: "0.9rem",
      fontFamily: "inherit",
    },
    rowStyle: {
      backgroundColor: "#fff",
      color: "#2e2929",
      fontWeight: "500",
      fontSize: "0.9rem",
    },
    actionsColumnIndex: -1,
    addRowPosition: "first",
    pageSize: 5,
    detailPanelColumnAlignment: "right",
    exportAllData: true,
    headerSelectionProps: { color: "secondary" },
    selectionProps: () => ({
      color: "secondary",
    }),
    exportMenu: [
      {
        label: "Export All Data In CSV",
        exportFunc: (cols: any, data: any) => ExportCsv(cols, data, "AllData"),
      },
      {
        label: "Export All Data In PDF",
        exportFunc: (cols: any, data: any) => ExportPdf(cols, data, "AllData"),
      },
    ],
  };
  return options;
};
