import { Options } from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";

const awsCredentials = {
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAYHHJMEKVAC4IRBN5",
    secretAccessKey: "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",
  },
};

const s3 = new S3Client(awsCredentials);
const cloudFront = new CloudFrontClient(awsCredentials);

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
        DistributionId: "E2XO9B2CZIVKDD",
        InvalidationBatch: {
          CallerReference: `${Date.now()}`,
          Paths: {
            Quantity: 1,
            Items: [`/${path}`],
          },
        },
      })
    );
    return `https://dd8s6d63g76vj.cloudfront.net/${path}`;
  } catch (error) {
    console.log(error);
  }
}
