import { Add, BorderColor, Delete } from '@mui/icons-material'
import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

const DrugInputField = ({
  name,
  onChange,
  onBlur,
  value,
  amount,
  key,
  defaultValue,
  className,
  options,
  error,
  helperText,
  handleClick,
}: any) => {
  // const [inputs, setInputs] = useState([{ value: '', amount: '' }])
  const [isBlur, setIsBlur] = useState(false)
  const [isAmountBlur, setIsAmountBlur] = useState(false)

  // const handleClick = () => {
  // 	setInputs([...inputs, { value: "", amount: "" }]);
  // };

  // const handleClick = () => {
  //   setInputs([...inputs, { value: '', amount: '' }])
  // }

  // const handleNameChange = (index: any, e: any) => {
  //   const values = [...inputs]
  //   values[index].value = e.target.value
  //   setInputs(values)
  // }
  // const handleAmtChange = (index: any, e: any) => {
  //   const values = [...inputs]
  //   values[index].amount = e.target.value
  //   setInputs(values)
  // }

  console.log(isBlur)
  console.log(!value)

  return (
    <FormControl fullWidth>
      <div>
        {/* {inputs.map((input, index) => ( */}
        <div className="grid grid-cols-2 gap-3 py-3">
          <div className="flex flex-col">
            <input
              name={name}
              onChange={(e) => {
                onChange(amount, e?.target?.value)
              }}
              onBlur={() => setIsBlur(true)}
              value={value}
              className="rounded-md border border-black p-1 py-3"
              // value={input.value}
              // onChange={(e) => handleNameChange(index, e)}
              type="text"
              placeholder="Enter Drug Name"
            />
            {!value && isBlur ? (
              <FormHelperText className="!text-red-600">
                {helperText}
              </FormHelperText>
            ) : null}
          </div>
          <div className="flex flex-col">
            <input
              name={name}
              onChange={(e) => {
                onChange(e?.target?.value, value)
              }}
              onBlur={() => setIsAmountBlur(true)}
              value={amount}
              className="rounded-md border border-black p-1 py-3"
              // value={input.amount}
              // onChange={(e) => handleAmtChange(index, e)}
              type="text"
              placeholder="Enter Prescription Note"
            />
            {isAmountBlur && !amount ? (
              <FormHelperText className="!text-red-600">
                {helperText}
              </FormHelperText>
            ) : null}
          </div>
        </div>
        {/* ))} */}
      </div>
    </FormControl>
  )
}

export default DrugInputField
