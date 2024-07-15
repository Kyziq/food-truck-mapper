import axios from "axios";
import Constants from "expo-constants";
import { FoodTruck, MenuItem } from "@types";

const apiBaseUrl = Constants.expoConfig?.extra?.apiBaseUrl;

// Create an Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: `${apiBaseUrl}/api`,
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // 10 seconds timeout
});

// Fetch a list of food trucks
export const fetchFoodTrucks = async (): Promise<FoodTruck[]> => {
  try {
    const response = await axiosInstance.get("/foodtrucks");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch food trucks:", error);
    return [];
  }
};

// Fetch menu items for a specific food truck by its ID
export const fetchMenuItems = async (
  foodTruckId: number
): Promise<MenuItem[]> => {
  try {
    const response = await axiosInstance.get(
      `/foodtrucks/${foodTruckId}/menuitems`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    return [];
  }
};
