import { NOLOCATION } from "assets/animations";
import Lottie from "react-lottie";
interface Props {
  image?: any;
  animeHight?: number;
  animeWidth?: number;
  text?: string;
}
const LoaderAnimeLarge = ({ image, animeHight, animeWidth, text }: Props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: image ? image : NOLOCATION,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className=" w-full flex flex-col justify-center items-center">
      <div className="">
        <Lottie
          speed={1}
          isPaused={false}
          isClickToPauseDisabled={true}
          options={defaultOptions}
          height={animeHight ? animeHight : 200}
          width={animeWidth ? animeWidth : 200}
        />
      </div>
      <span className="text-xl capitalize py-4 tracking-wide">
        {text ? text : "No Location Added"}
      </span>
    </div>
  );
};

export default LoaderAnimeLarge;
