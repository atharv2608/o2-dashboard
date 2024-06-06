import React from "react";
import { ClipLoader } from "react-spinners";
function Button({ label, className = " ", loading=false, ...props }) {
  return (
    <button type="submit" className={`${className} flex items-center justify-center min-w-[100px] px-4 py-2`} {...props}>
         {loading ? (<ClipLoader color='#000' className='item'  size={24}/>) : label}
      </button>
  );
}

export default Button;
