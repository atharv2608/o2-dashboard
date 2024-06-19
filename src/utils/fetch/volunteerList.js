import { populateData } from "../../slices/dataSlice";
import axios from "axios";

const fetchVolunteers = async (dispatch) => {
  try {
    const response = await axios.get("https://o2-api.vercel.app/api/v1/get/volunteers-list");
    const data = response.data.data;
    dispatch(populateData(data));
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export default fetchVolunteers;
