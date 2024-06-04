import React, { useId } from "react";
import { Controller } from "react-hook-form";

const Input = function Input({
  label,
  required = false,
  type = "text",
  className = "",
  control,
  name,
  rules={},
  ...props
}) {
  const id = useId();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field}) => (
        <>
          {label && (
            <label htmlFor={id} className="block">
              {label}
            </label>
          )}
          <div>
            <input
              className={`w-full p-2 rounded-xl  text-black ${className}`}
              type={type}
              {...props}
              id={id}
              onChange={(event)=> field.onChange(event.target.value)}
            />
          </div>
        </>
      )}
    />
  );
};

export default Input;
