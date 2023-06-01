import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { Fragment, useState } from 'react'
type Props = {
  onChange?: (event: any, value: any) => void
  value?: any
  noOptionText?: any
  options?: any[]
  loading?: boolean
  label?: string
  labelClass?: string
  isOptionEqualToValue?: (option: any, value: any) => boolean
  error?: boolean
  helperText?: string
  size: 'small' | 'medium'
  className?: string
  textClassName?: string
}
const AdminAutocomplete = ({
  onChange,
  value,
  noOptionText,
  options = [],
  loading,
  labelClass = 'font-medium tracking-wide text-base',
  label,
  isOptionEqualToValue,
  error,
  helperText,
  size,
  className,
  textClassName,
}: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex w-full flex-col gap-2">
      {' '}
      {label && (
        <p className={`text-wider font-medium text-theme ${className}`}>
          {' '}
          {label}{' '}
        </p>
      )}{' '}
      <Autocomplete
        size={size}
        id="asynchronous-autocomplete"
        open={open}
        fullWidth
        // getOptionLabel={(option: any) => option.name}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
        isOptionEqualToValue={isOptionEqualToValue}
        getOptionLabel={(option: any) =>
          `${option.label} ${option?.optionName ? `(${option?.optionName})` : ''
          }`
        }
        onChange={onChange}
        value={value}
        noOptionsText={noOptionText}
        options={options || []}
        loading={loading}
        renderInput={(params) => (
          <>
            {' '}
            <TextField
              className={textClassName}
              error={error}
              helperText={helperText}
              {...params}
              fullWidth
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {' '}
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}{' '}
                    {params.InputProps.endAdornment}{' '}
                  </Fragment>
                ),
              }}
            />{' '}
          </>
        )}
      />{' '}
    </div>
  )
}
export default AdminAutocomplete
