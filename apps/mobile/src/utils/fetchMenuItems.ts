export const fetchMenuItems = async (foodTruckId: number) => {
  try {
    const response = await fetch(
      `http://192.168.0.137:3234/foodtrucks/${foodTruckId}/menuitems`
    ); // Change this to your local IP address
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    return [];
  }
};
