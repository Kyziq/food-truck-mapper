import axios from "axios";

const apiBaseUrl = import.meta.env.API_BASE_URL;

// Create an Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: `${apiBaseUrl}/api`,
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // 10 seconds timeout
});

// Fetch all food trucks
export const fetchFoodTrucks = async (): Promise<any[]> => {
  try {
    const response = await axiosInstance.get("/foodtrucks");
    console.log("Fetched food trucks:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch food trucks:", error);
    return [];
  }
};
