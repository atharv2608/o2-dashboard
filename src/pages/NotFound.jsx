import React from 'react'
import logo from "../Images/o2_logo.png";
function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center ">
        <div className="flex items-center justify-center flex-wrap">
          <div>
            <img src={logo} height={300} width={300} />
          </div>
          <div>
            <h1 className="text-white text-4xl font-bold text-center">
              404 Not Found
            </h1>
            <p className="text-white mt-5 text-[20px] text-center">
              The page you are looking for is not available
            </p>
          </div>
        </div>
      </div>
  )
}

export default NotFound