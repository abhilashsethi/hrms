import { PageNotFound } from "components/core";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <PageNotFound />
    </div>
  );
};

export default NotFoundPage;
