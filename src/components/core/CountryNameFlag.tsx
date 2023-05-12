import { useEffect, useState } from "react";
import { countries } from "schemas/Countries";

interface Props {
  countryName?: string;
}
const CountryNameFlag = ({ countryName = "India" }: Props) => {
  const [reqCode, setReqCode] = useState<any>({
    code: "IN",
    label: "India",
    phone: "91",
  });
  useEffect(() => {
    const data = countries?.find((item) => item?.label === countryName);
    setReqCode(data);
  }, [countryName]);
  // console.log(reqCode);

  return (
    <div className="flex gap-2 items-center">
      <img
        loading="lazy"
        width="20"
        src={`https://flagcdn.com/w20/${String(
          reqCode?.code
        ).toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/w40/${String(
          reqCode?.code
        ).toLowerCase()}.png 2x`}
        alt=""
      />
      <h1>{reqCode?.label}</h1>
    </div>
  );
};

export default CountryNameFlag;
