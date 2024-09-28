import axios from "axios";
import { API_URL } from "../../globalFunctions";

export const getMonths = async () => {
  try {
    const response = await axios.get(`${API_URL}/months`);
    return response.data;
  } catch (error) {
    console.error("Error fetching months:", error);
    throw error;
  }
};

