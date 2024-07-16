import axios from "axios";

const apiBaseUrl = import.meta.env.API_BASE_URL;

// Create an Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: `${apiBaseUrl}/api`,
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // 10 seconds timeout
});

// Utility function to introduce a delay
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch all food trucks
export const fetchFoodTrucks = async (): Promise<any[]> => {
  try {
    const response = await axiosInstance.get("/foodtrucks");
    console.log("Fetched food trucks:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch food trucks:", error);
    throw error;
  }
};

// Create a new food truck
export const createFoodTruck = async (foodTruck: any): Promise<void> => {
  try {
    const response = await axiosInstance.post("/foodtrucks", foodTruck);
    console.log("Created food truck:", response.data);
  } catch (error) {
    console.error("Failed to create food truck:", error);
    throw error;
  }
};

// Delete a food truck
export const deleteFoodTruck = async (foodTruckId: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/foodtrucks/${foodTruckId}`);
    console.log("Deleted food truck:", response.data);
  } catch (error) {
    console.error("Failed to delete food truck:", error);
    throw error;
  }
};

// Update a food truck
export const updateFoodTruck = async (foodTruck: any): Promise<void> => {
  try {
    const response = await axiosInstance.put(
      `/foodtrucks/${foodTruck.foodTruckId}`,
      foodTruck
    );
    console.log("Updated food truck:", response.data);
  } catch (error) {
    console.error("Failed to update food truck:", error);
    throw error;
  }
};
