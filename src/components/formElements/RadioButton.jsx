import React, { useId } from 'react'
import { Controller } from 'react-hook-form'

function RadioButton({label, name, control, value, rules={}, className, labelClassName="", ...props}) {
  const id = useId()
  return (
    <Controller 
      name={name}
      control={control}
      rules={rules}
      render={({field}) => (
        <>
        
        <input 
          type='radio'
          name={name}
          value={value}
          onChange={(event) => field.onChange(event.target.value)}
          {...props}
          className='mt-2'
        />
        {label && (<label className={labelClassName} htmlFor={id}>{label}</label>)}
        </>
      )}
    />
  )
}

export default RadioButton