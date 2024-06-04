import React, { useId } from "react";
import { Controller } from "react-hook-form";

const Select = function Select({
  name,
  control,
  label,
  options,
  placeholder = "Select",
  rules={},
  ...props
}) {
  const id = useId();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          {label && (
            <label htmlFor={id} className="block">
              {label}
            </label>
          )}
          <div>
            <select
            {...field}
              defaultValue={""}
              id={id}
              className="w-full lg:w-auto p-2 rounded-xl  text-black"
              {...props}
            >
              <option value="" disabled hidden>
                {placeholder}
              </option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    />
  );
};

export default Select;
