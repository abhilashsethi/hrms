import { AccountCircle } from '@mui/icons-material'
import {
  Box,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  SelectChangeEvent,
} from '@mui/material'
import { ChangeEvent, FocusEvent } from 'react'

type Props = {
  type:
  | 'text'
  | 'select'
  | 'date'
  | 'file'
  | 'number'
  | 'email'
  | 'month'
  | 'multi-select'
  value?: any
  onChange?: (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<any>
  ) => void
  onBlur?: (e: FocusEvent<any, Element>) => void
  error?: boolean
  helperText?: string
  fullWidth?: boolean
  placeholder?: string
  name?: string
  options?: any
  title?: string
  id?: string
  image?: string
  variant?: 'filled' | 'outlined' | 'standard'
  InputProps?: any
  // startIcon?: React.ReactElement;
  startIcon?: React.ReactElement
  inputProps?: any
  styleContact?: any
  styleArea?: any
  styleField?: any
  onFileChange?: any
  multiline?: boolean
  rows?: number
  size?: 'small' | 'medium'
  multiple?: boolean
  date?: boolean
  disabled?: boolean
}

const TextInput = ({
  type,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  fullWidth,
  placeholder,
  name,
  disabled = false,
  InputProps,
  title,
  id,
  variant,
  inputProps,
  options,
  styleContact,
  image,
  startIcon,
  styleArea,
  styleField,
  onFileChange,
  rows,
  multiline,
  size,
  multiple = false,
  date = false,
}: Props) => {
  switch (type) {
    case 'text':
      return (
        <div className={styleArea}>
          <p className={`text-wider font-medium text-theme`}>{title}</p>
          <TextField
            disabled={disabled}
            fullWidth={fullWidth}
            placeholder={placeholder}
            name={name}
            id={id}
            variant={variant}
            className={styleContact}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{startIcon}</InputAdornment>
              ),
            }}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            multiline={multiline}
            rows={rows}
            helperText={helperText}
            size={size}
          />
        </div>
      )
    case 'number':
      return (
        <div className={styleArea}>
          <p className={`text-wider font-medium text-theme`}>{title}</p>
          <TextField
            disabled={disabled}
            fullWidth={fullWidth}
            placeholder={placeholder}
            name={name}
            id={id}
            type="number"
            variant={variant}
            className={styleContact}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{startIcon}</InputAdornment>
              ),
            }}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            multiline={multiline}
            rows={rows}
            helperText={helperText}
            size={size}
          />
        </div>
      )
    case 'date':
      return (
        <div className={styleArea}>
          <p className={`text-wider font-medium text-theme`}>{title}</p>
          <TextField
            disabled={disabled}
            fullWidth={fullWidth}
            type="date"
            name={name}
            id={id}
            variant={variant}
            className="rounded-lg"
            inputProps={inputProps}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{startIcon}</InputAdornment>
              ),
            }}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            size={size}
          />
        </div>
      )
    case 'file':
      return (
        <div className={styleField}>
          <p className={`text-wider font-medium text-theme`}>{title}</p>
          <div className={styleField}>
            {/* <PhotoUpload value={image} onChange={onFileChange} /> */}
          </div>
        </div>
      )

    case 'select':
      return (
        <div className={styleArea}>
          <p className="text-wider pb-2 font-medium">{title}</p>

          <TextField
            disabled={disabled}
            fullWidth={fullWidth}
            id={id}
            select={true}
            name={name}
            value={value}
            onChange={onChange}
            className={styleContact}
            InputProps={InputProps}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            size={size}
          >
            {options?.map((option: any) => (
              <MenuItem
                key={option?.value || option?.state}
                value={option?.value || option?.state}
              >
                {option?.label || option?.state}
              </MenuItem>
            ))}
          </TextField>
        </div>
      )
    case 'multi-select':
      return (
        <div className={`${styleArea} mb-1 -ml-2`}>
          <p className="text-wider ml-2 font-medium">{title}</p>

          <FormControl sx={{ m: 1 }} fullWidth>
            <InputLabel id="demo-multiple-chip-label">{`Choose`}</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              name={name}
              value={value || []}
              onChange={onChange}
              className={styleContact}
              onBlur={onBlur}
              error={error}
              // helperText={helperText}
              size={size}
              input={<OutlinedInput id="select-multiple-chip" label="Choose" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected?.map((value: any, label: any) => (
                    <div>
                      {/* {console.log(new Date(value))} */}
                      <Chip
                        key={value}
                        label={
                          date
                            ? new Date(value).toLocaleDateString('en-US', {
                              weekday: 'long',
                            })
                            : value
                        }
                      />
                    </div>
                  ))}
                </Box>
              )}
            >
              {options?.map((option: any) => (
                <MenuItem
                  key={option?.value || option?.state}
                  value={option?.value || option?.state}
                >
                  {option?.label || option?.state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )

    default:
      return (
        <div className={styleArea}>
          <p className="text-wider pb-2 font-medium">{title}</p>
          <TextField
            disabled={disabled}
            fullWidth={fullWidth}
            placeholder={placeholder}
            name={name}
            type={type}
            id={id}
            variant={variant}
            className={styleContact}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{startIcon}</InputAdornment>
              ),
            }}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            size={size}
          />
        </div>
      )
  }
}

export default TextInput
