import Cookies from "js-cookie";
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
export const checkAccessToken = () =>{
    const dispatch = useDispatch()
    useEffect(() => {
      const token = Cookies.get("accessToken")
      if(!token) dispatch(logout())
    }, [dispatch])
    
    return null;
}

