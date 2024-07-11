export const fetchFoodTrucks = async () => {
  try {
    const response = await fetch("http://192.168.0.106:3234/foodtrucks"); // Change this to your local IP address
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch food trucks:", error);
    return [];
  }
};
