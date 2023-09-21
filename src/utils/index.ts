import { Options } from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import moment from "moment";
import fileDownload from "js-file-download";
import {
  Public_AWS_ACCESS_KEY_ID,
  Public_AWS_DISTRIBUTION_ID,
  Public_AWS_REGION,
  Public_AWS_S3_URL,
  Public_AWS_SECRET_ACCESS_KEY,
} from "config/env.config";

const awsCredentials = {
  region: Public_AWS_REGION,
  credentials: {
    accessKeyId: Public_AWS_ACCESS_KEY_ID,
    secretAccessKey: Public_AWS_SECRET_ACCESS_KEY,
  },
};

const s3 = new S3Client(awsCredentials);
const cloudFront = new CloudFrontClient(awsCredentials);

export { default as sample } from "./codeblocks";

export const MuiTblOptions = (downloadTitle?: string) => {
  const options: Options<any> = {
    headerStyle: {
      whiteSpace: "nowrap",
      backgroundColor: "#9AD1F5",
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
    pageSize: 8,
    detailPanelColumnAlignment: "right",
    exportAllData: true,
    headerSelectionProps: { color: "secondary" },
    selectionProps: () => ({
      color: "secondary",
    }),
    exportMenu: [
      {
        label: "Export All Data In CSV",
        exportFunc: (cols: any, data: any) => ExportCsv(cols, data, `${downloadTitle ? downloadTitle : "AllData"}`),
      },
      {
        label: "Export All Data In PDF",
        exportFunc: (cols: any, data: any) => ExportPdf(cols, data, `${downloadTitle ? downloadTitle : "AllData"}`),
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
    pageSize: 8,
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

export const getDataWithSL = <T>(data: T[]) => {
  const dataWithSL = data.map((item, index) => {
    return {
      sl: index + 1,
      ...item,
    };
  });
  return dataWithSL;
};

export const clock = (dateString: string | Date) => {
  const date = new Date(dateString);
  return {
    fromNow: () => {
      const now = new Date();

      const diffInMs = now.getTime() - date.getTime();

      const diffInSeconds = Math.floor(diffInMs / 1000);
      if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
      }

      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
      }

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
      }

      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 30) {
        return `${diffInDays} days ago`;
      }

      const diffInMonths = Math.floor(diffInDays / 30);
      if (diffInMonths < 12) {
        return `${diffInMonths} months ago`;
      }

      const diffInYears = Math.floor(diffInMonths / 12);
      return `${diffInYears} years ago`;
    },
  };
};

export async function uploadFile(file: File, path: string) {
  try {
    const command = new PutObjectCommand({
      Bucket: "sy-hrms",
      Key: path,
      Body: file,
    });
    await s3.send(command);
    await cloudFront.send(
      new CreateInvalidationCommand({
        DistributionId: Public_AWS_DISTRIBUTION_ID,
        InvalidationBatch: {
          CallerReference: `${Date.now()}`,
          Paths: {
            Quantity: 1,
            Items: [`/${path}`],
          },
        },
      })
    );
    return `${Public_AWS_S3_URL}/${path}`;
  } catch (error) {
    throw error
  }
}
export async function deleteFile(path: string) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: "sy-hrms",
      Key: path,
    });
    await s3.send(command);
    await cloudFront.send(
      new CreateInvalidationCommand({
        DistributionId: Public_AWS_DISTRIBUTION_ID,
        InvalidationBatch: {
          CallerReference: `${Date.now()}`,
          Paths: {
            Quantity: 1,
            Items: [`/${path}`],
          },
        },
      })
    );
  } catch (error) {
    throw error
  }
}

export const DocTypeGenerate = (file: any) => {
  const datestring = Date.now();
  return `${datestring}.` + `${file?.split("/")[1]}`;
};

export const formatChatTime = (time?: string) => {
  if (
    new Date().toDateString() === new Date(time || new Date()).toDateString()
  ) {
    return moment(time).fromNow();
  }
  return moment(time).format("ll");
};

export const downloadFile = (url: string, name: string) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      return fileDownload(blob, name);
    })
    .catch(console.error);
};

export const parseTextFromHtml = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(` <div>${html}</div>`, "text/html");
  const textContent = doc?.querySelector("div")?.textContent;
  return textContent;
};

export const NumInWords = (number: number) => {
  const first = [
    "",
    "one ",
    "two ",
    "three ",
    "four ",
    "five ",
    "six ",
    "seven ",
    "eight ",
    "nine ",
    "ten ",
    "eleven ",
    "twelve ",
    "thirteen ",
    "fourteen ",
    "fifteen ",
    "sixteen ",
    "seventeen ",
    "eighteen ",
    "nineteen ",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const mad = ["", "thousand", "million", "billion", "trillion"];
  let word = "";

  for (let i = 0; i < mad.length; i++) {
    let tempNumber = number % (100 * Math.pow(1000, i));
    if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
      if (Math.floor(tempNumber / Math.pow(1000, i)) < 20) {
        word =
          first[Math.floor(tempNumber / Math.pow(1000, i))] +
          mad[i] +
          " " +
          word;
      } else {
        word =
          tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] +
          "-" +
          first[Math.floor(tempNumber / Math.pow(1000, i)) % 10] +
          mad[i] +
          " " +
          word;
      }
    }

    tempNumber = number % Math.pow(1000, i + 1);
    if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0)
      word =
        first[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] +
        "hunderd " +
        word;
  }
  return word;
};
