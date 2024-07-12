import Constants from "expo-constants";

const apiBaseUrl = Constants.expoConfig?.extra?.apiBaseUrl;

export const fetchFoodTrucks = async () => {
  try {
    console.log(`Fetching from ${apiBaseUrl}/foodtrucks`); // Add this line
    const response = await fetch(`${apiBaseUrl}/foodtrucks`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch food trucks:", error);
    return [];
  }
};
