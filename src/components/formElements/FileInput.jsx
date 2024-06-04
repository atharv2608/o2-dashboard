import React from "react";
import { Controller } from "react-hook-form";

function FileInput({
  label,
  control,
  name,
  className = "",
  rules = {},
  ...props
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          {label && (
            <label htmlFor={name} className="block">
              {label}
            </label>
          )}
          <input
            type="file"
            name={name}
            id={name}
            className={`${className}`}
            onChange={(e) => field.onChange(e.target.files[0])}
            {...props}
          />
        </>
      )}
    />
  );
}

export default FileInput;
