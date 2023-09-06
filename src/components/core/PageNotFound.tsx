import { ERROR404 } from "assets/animations";
import Link from "next/link";
import Lottie from "react-lottie";
interface Props {
  image?: any;
  animeHight?: number;
  animeWidth?: number;
}
const PageNotFound = ({ image, animeHight = 450, animeWidth = 400 }: Props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: image ? image : ERROR404,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="h-[85vh] w-full flex flex-col justify-center items-center">
      <Lottie
        options={defaultOptions}
        isPaused={false}
        isClickToPauseDisabled={true}
        height={animeHight}
        width={animeWidth}
      />
      <p className="text-lg mb-4">
        We couldn't find the page you were looking for.
      </p>
      <Link
        href="/"
        className="bg-blue-500 text-white font-semibold px-3 py-1 rounded-lg "
      >
        Go back to the homepage
      </Link>
    </div>
  );
};

export default PageNotFound;
