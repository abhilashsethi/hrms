import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const getAccessToken = () => {
  return typeof window !== "undefined"
    ? typeof localStorage.getItem("accessToken") === "string"
      ? JSON.parse(localStorage.getItem("accessToken")!)
      : null
    : null;
};

// export const BASE_URL: "https://hrms.yardiot.com/api/v1" = `https://hrms.yardiot.com/api/v1`;
export const BASE_URL: "http://localhost:8080/api/v1" = `http://localhost:8080/api/v1`;

type useFetchOptions = {
  BASE_URL: typeof BASE_URL | "/api";
};

type MutationOptions = {
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  isFormData?: boolean;
  BASE_URL?: string;
  body?: any;
};

export const useFetch = <T>(path: string, options?: useFetchOptions) => {
  const url = options?.BASE_URL || BASE_URL;
  const token = getAccessToken();
  const data = useSWR<{
    data?: T;
    success: boolean;
    msg: string;
    pagination?: { total: number; page?: string; limit?: string };
  }>(path?.includes("undefined") ? null : `${url}/${path}`, (args: any) => {
    const headers: HeadersInit = {};
    if (token) headers["x-access-token"] = token;
    return fetch(args, { headers }).then((_) => _.json());
  });
  return {
    ...data,
    response: data,
    success: data.data?.success,
    msg: data.data?.msg,
    data: data.data?.data,
    pagination: data?.data?.pagination,
  };
};

export const useMutation = <T>(path: string, options?: MutationOptions) => {
  const method = options?.method || "POST";
  const token = getAccessToken();
  const headers: HeadersInit = options?.isFormData
    ? {}
    : { "Content-Type": "application/json" };

  if (token) headers["x-access-token"] = token;
  return useSWRMutation(
    path?.includes("undefined") ? null : `${BASE_URL}/${path}`,
    async (url: RequestInfo | URL, { arg }: any) => {
      console.log(options);
      return fetch(url, { method, body: JSON.stringify(arg), headers }).then(
        (_) => _.json()
      );
    }
  );
};

export const useChange = () => {
  const [isChanging, setIsChanging] = useState(false);
  const change = async (path: string, options?: MutationOptions) => {
    try {
      const token = getAccessToken();
      const url = options?.BASE_URL || BASE_URL;
      setIsChanging(true);
      const method = options?.method || "POST";
      const body = options?.body
        ? options?.isFormData
          ? options?.body
          : JSON.stringify(options.body)
        : `{}`;
      const headers: HeadersInit = options?.isFormData
        ? {}
        : { "Content-Type": "application/json" };
      if (token) headers["x-access-token"] = token;
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
