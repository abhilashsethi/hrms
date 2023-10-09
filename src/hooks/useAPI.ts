import { Public_BASE_URL } from "config/env.config";
import { useState } from "react";
import Swal from "sweetalert2";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const getAccessToken = () => {
	return typeof window !== "undefined"
		? typeof localStorage.getItem("accessToken") === "string"
			? JSON.parse(localStorage.getItem("accessToken")!)
			: null
		: null;
};

// export const BASE_URL: "https://api.yardone.live/api/v1" = `https://api.yardone.live/api/v1`;
export const BASE_URL = Public_BASE_URL;
// export const BASE_URL: "https://surround-festivals-payday-scary.trycloudflare.com/api/v1" = `https://surround-festivals-payday-scary.trycloudflare.com/api/v1`;
// export const BASE_URL: "http://192.168.1.254:8080/api/v1" = `http://192.168.1.254:8080/api/v1`;

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
	}>(
		path?.includes("undefined") ? null : `${url}/${path}`,
		(args: any) => {
			const headers: HeadersInit = {};
			if (token) headers["x-access-token"] = token;
			return fetch(args, { headers }).then((_) => _.json());
		},
		{
			revalidateOnFocus: true,
		}
	);
	return {
		...data,
		response: data,
		success: data.data?.success,
		msg: data.data?.msg,
		data: data.data?.data,
		pagination: data?.data?.pagination,
	};
};

export const useFetch_Fun = <T>(path: string, options?: useFetchOptions) => {
	const url = options?.BASE_URL || BASE_URL;
	const token = getAccessToken();
	const data = useSWR<{
		data?: T;
		success: boolean;
		msg: string;
		pagination?: { total: number; page?: string; limit?: string };
	}>(
		path?.includes("undefined") ? null : `${url}/${path}`,
		(args: any) => {
			const headers: HeadersInit = {};
			if (token) headers["x-access-token"] = token;
			return fetch(args, { headers }).then((_) => _.json());
		},
		{
			revalidateOnFocus: false,
		}
	);
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

export const downloadFile = async ({
	url,
	method = "GET",
	body,
}: // type,
{
	url: string;
	method: "GET" | "POST";
	// body?: BodyInit;
	body?: any;
	// type: "pdf" | "csv" | "excel";
}) => {
	try {
		// let ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
		const token = getAccessToken();

		const response = await fetch(BASE_URL + url, {
			method,
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
			body: body && JSON.stringify(body),
		});

		if (response?.status !== 200) throw new Error("Download failed.");

		//convert to blob
		const blob = await response.blob();

		const fileUrl = window.URL.createObjectURL(blob);
		window.open(fileUrl, "", "height=800");
		window.URL.revokeObjectURL(fileUrl);

		// notify.success("File downloaded successfully.");
		Swal.fire(`Success`, `You have successfully downloaded!`, `success`);
	} catch (error) {
		if (error instanceof Error) {
			// notify.error(error?.message);
			Swal.fire("Error", error?.message || "Unable to Download", "error");
			return;
		}
		// notify.error("Download failed. Try again!");
		Swal.fire("Error", "Download failed. Try again!", "error");
	}
};
