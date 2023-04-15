import { Options } from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

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

export const fetcher = (args: any) => {
  const token = JSON.parse(localStorage.getItem("user") || `{}`)?.token;
  return fetch(args, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((_) => _.json());
};

export const BASE_URL: "http://192.168.29.243:2023/api/v1" = `http://192.168.29.243:2023/api/v1`;

type useFetchOptions = {
  BASE_URL: typeof BASE_URL | "/api";
};

export const useFetch = <T>(path: string, options?: useFetchOptions) => {
  const url = options?.BASE_URL || BASE_URL;
  return useSWR<{
    success: { data: T; haveNextPage?: boolean };
    message: string;
  }>(`${url}/${path}`, fetcher);
};

export const useMutation = <T>(
  path: string,
  options?: { method: "POST" | "PUT" | "PATCH" | "DELETE" }
) => {
  const method = options?.method || "POST";
  return useSWRMutation(
    `${BASE_URL}/${path}`,
    async (url: RequestInfo | URL, { arg }: any) =>
      fetch(url, {
        method,
        body: JSON.stringify(arg),
        headers: { "Content-Type": "application/json" },
      }).then((_) => _.json())
  );
};

export const useChange = () => {
  const [isChanging, setIsChanging] = useState(false);
  const change = async (
    path: string,
    options?: {
      method?: "POST" | "PUT" | "DELETE";
      body?: any;
      BASE_URL?: string;
      isFormData?: boolean;
    }
  ) => {
    try {
      const url = options?.BASE_URL || BASE_URL;
      setIsChanging(true);
      const method = options?.method || "POST";
      const body = options?.body
        ? options?.isFormData
          ? options?.body
          : JSON.stringify(options.body)
        : `{}`;
      const token = JSON.parse(localStorage.getItem("user") || `{}`)?.token;
      const headers: HeadersInit = options?.isFormData
        ? {}
        : { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;
      const response = await fetch(`${url}/${path}`, {
        method,
        headers,
        body,
      });
      const status = response.status;
      const results = await response.json();
      setIsChanging(false);
      return { results, status };
    } catch (error) {
      setIsChanging(false);
      throw new Error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };
  return { change, isChanging };
};
