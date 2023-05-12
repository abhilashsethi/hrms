import { useEffect, useState } from "react";
import { countries } from "schemas/Countries";

interface Props {
  countryName?: string;
}
const CountryNameFlag = ({ countryName = "India" }: Props) => {
  const [reqCode, setReqCode] = useState<any>("IN");
  useEffect(() => {
    const data = countries?.find((item) => item?.label === countryName);
    setReqCode(data?.code);
  }, [countryName]);
  console.log(reqCode);

  return (
    <div className="flex gap-2 items-center">
      <img
        loading="lazy"
        width="20"
        src={`https://flagcdn.com/w20/${String(reqCode).toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/w40/${String(
          reqCode
        ).toLowerCase()}.png 2x`}
        alt=""
      />
      <h1>India</h1>
    </div>
  );
};

export default CountryNameFlag;
