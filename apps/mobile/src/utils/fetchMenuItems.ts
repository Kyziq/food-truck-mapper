import Constants from "expo-constants";

const apiBaseUrl = Constants.expoConfig?.extra?.apiBaseUrl;

export const fetchMenuItems = async (foodTruckId: number) => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/foodtrucks/${foodTruckId}/menuitems`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    return [];
  }
};
