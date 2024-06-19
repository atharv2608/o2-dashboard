import user from "../../api/User";
import { populateData } from "../../slices/dataSlice";
import {login as authLogin} from "../../slices/authSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
const loginService = async (data, setLoading, setError ,dispatch) => {
    setLoading(true);
    const formData = { phone: data.phone, password: data.password };
    try {
      await user
        .loginUser(formData)
        .then((res) => {
          if (res.data?.statusCode === 200) {
            const userData = res.data.data;
            Cookies.set("accessToken", userData.accessToken, {
              expires: 7, 
              path: '/', 
              secure: true, 
              sameSite: 'strict' 
            })
            const designation = res.data.data.designation;
            if  (userData) {
              dispatch(authLogin(userData, designation));
            } 
          }
          setLoading(false);
        })
        .catch((error) => {
          if (error?.response?.status === 404) {
            setError("phone", { type: "not-found", message: "User null" });
            toast.error("User does not exist"); // Using toast for error message
          } else if (error?.response?.status === 403) {
            toast.error("Volunteer not yet selected");
          } else if (error?.response?.status === 401) {
            toast.error("Invalid Credentials");
          } else if (error?.response?.status === 409) {
            toast.error("Already Logged in");
          } else {
            toast.error("Ran into problem");
            console.error("Error: ", error)
          }
          setLoading(false);
        });
    } catch (error) {
      toast.error("Some error occurred");
      setLoading(false);
    }
  };

  export default loginService