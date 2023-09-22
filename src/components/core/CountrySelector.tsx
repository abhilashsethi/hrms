// import { countries } from "configs";

import { FormHelperText, MenuItem, Select, TextField } from "@mui/material";
import { countries } from "schemas/Countries";

const CountrySelector = ({
  name,
  onChange,
  onBlur,
  value,
  defaultValue,
  className,
  error,
  helperText,
}: any) => {
  return (
    <>
      <Select
        defaultValue={defaultValue}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        id=""
        size="small"
      >
        {countries.map((item, index) => (
          <MenuItem key={index} value={item.phone}>
            + {item.phone}
          </MenuItem>
        ))}
      </Select>
      {error ? (
        <FormHelperText error={true}>{helperText}</FormHelperText>
      ) : null}
    </>
  );
};

export default CountrySelector;
