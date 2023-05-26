import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="text-lg mb-4">
        We couldn't find the page you were looking for.
      </p>
      <Link href="/" className="text-blue-500">
        Go back to the homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
