import axios from "axios";

const apiBaseUrl = import.meta.env.API_BASE_URL;
console.log("API base URL:", apiBaseUrl); // Verify this in the browser console

// Create an Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: `${apiBaseUrl}/api`,
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // 10 seconds timeout
});

console.log("API base URL:", apiBaseUrl);
// Fetch the number of food trucks
export const fetchFoodTrucksCount = async (): Promise<number> => {
  try {
    const response = await axiosInstance.get("/foodtrucks");
    console.log("Fetched food trucks:", response.data);
    return response.data.length;
  } catch (error) {
    console.error("Failed to fetch food trucks:", error);
    return 0;
  }
};