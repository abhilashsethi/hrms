import { LOADING, LOADING2 } from "assets/animations";
import React from "react";
import Lottie from "react-lottie";

const LoaderAnimeLarge = ({ image }: { image?: any }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: image ? image : LOADING,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="h-[70vh] w-full flex justify-center items-center">
      <div>
        <Lottie options={defaultOptions} height={150} width={150} />
      </div>
    </div>
  );
};

export default LoaderAnimeLarge;
