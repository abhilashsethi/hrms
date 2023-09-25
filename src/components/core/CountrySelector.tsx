import { Autocomplete, Box, FormHelperText, TextField } from "@mui/material";
import { countries } from "schemas/Countries";

const CountrySelector = ({
  onChange,
  value,
  error,
  helperText,
  onBlur,
}: any) => {
  return (
    <>
      <Autocomplete
        options={countries}
        size="small"
        autoHighlight
        getOptionLabel={(option) => `${"+" + option.phone}`}
        onChange={onChange}
        value={
          value ? countries.find((option) => option.phone === value) : null
        }
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            ({option.code}) +{option.phone}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Country Code"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
            onBlur={onBlur}
            error={error && !!error}
            helperText={helperText && helperText}
          />
        )}
      />
      {/* {error ? (
        <FormHelperText error={true}>{helperText}</FormHelperText>
      ) : null} */}
      {/* <Select
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
      ) : null} */}
    </>
  );
};

export default CountrySelector;
