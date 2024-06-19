import React from 'react'
import bg from "../../Images/loginImage.png"
function LoginImage() {
    const backgroundImageStyle = {
        backgroundImage: `url(${bg})`,
      };
  return (
    <div
        className="hidden lg:block min-h-screen w-1/2 bg-cover bg-center"
        style={backgroundImageStyle}
      ></div>
  )
}

export default LoginImage