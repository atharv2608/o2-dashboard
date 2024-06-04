import React from "react";

function Button({ label, className = " ", ...props }) {
  return (
    <button type="submit" className={`${className}`} {...props}>
      {label}
    </button>
  );
}

export default Button;
