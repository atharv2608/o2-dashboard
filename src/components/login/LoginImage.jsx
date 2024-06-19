import React from 'react'
import bg from "../../Images/loginImage.png"
function LoginImage() {
  return (
    <div
        className="hidden lg:block min-h-screen w-1/2 bg-cover bg-center"
        style={{backgroundImage:` url(${bg})`}}
      ></div>
  )
}

export default LoginImage