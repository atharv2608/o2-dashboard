import config from "../config/config";
import axios from "axios";
import FormData from "form-data";
export class User {
  async registerVolunteer({
    firstName,
    lastName,
    email,
    phone,
    year,
    course,
    rollNo,
    preference1,
    preference2,
    preference3,
    partOfO2,
    collegeID,
    password,
  }) {
    let data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);
    data.append("phone", phone);
    data.append("year", year);
    data.append("course", course);
    data.append("rollNo", rollNo);
    data.append("preference1", preference1);
    data.append("preference2", preference2);
    data.append("preference3", preference3);
    data.append("partOfO2", partOfO2);
    data.append("password", password);
    data.append("collegeID", collegeID);
    let configuration = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}/register`,
      data: data,
    };
    return axios.request(configuration);
  }

  async loginUser({ phone, password }) {
    let data = new FormData();
    data.append("phone", phone);
    data.append("password", password);
    let configuration = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}/login`,
      data: data,
      withCredentials: true,
    };
    return axios.request(configuration);
  }

  async logoutUser() {
    let configuration = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}/logout`,
      withCredentials: true,
    };
    return axios.request(configuration)
      
  }
}

const user = new User();
export default user;
