import { foodTrucks, menuItems } from "./schema";
import type { FoodTruck, MenuItem } from "@types";
import { db, pool } from "./db";

// Function to generate random operator name
function generateRandomOperator(): string {
  const operators = [
    "Adib Asyraaf",
    "Khairul Haziq",
    "Adam Abrar",
    "Syed Athif",
    "Muhammad Iqbal",
    "Arif Salehuddin",
    "Alif Hafizi",
  ];

  return operators[Math.floor(Math.random() * operators.length)];
}

async function seed() {
  const client = await pool.connect();
  try {
    // Prepare data for food_trucks insertion
    const foodTrucksData: FoodTruck[] = [
      {
        name: "MK Muhibbien Kitchen Foodtruck",
        latitude: "6.12805409036393",
        longitude: "100.35833604654881",
        schedule: "Sunday - Saturday, 7:30PM - 3.30AM",
        operatorName: "Nurul Aini binti Ramli",
      },
      {
        name: "Raja Gulai Foodtruck",
        latitude: "6.123553141912142",
        longitude: "100.34869288853561",
        schedule: "Sat - Thu, 8.00AM - 1.00PM",
        operatorName: generateRandomOperator(),
      },
      {
        name: "Naz's Chicken",
        latitude: "6.11742422302653",
        longitude: "100.36554664396253",
        schedule: "Sat - Thu, 12.00AM - 7.00PM",
        operatorName: "Naz's Foods Enterprise",
      },
      {
        name: "Food Truck Kacang Rebus dan Buah Berangan",
        latitude: "6.242540992257719",
        longitude: "100.42012386730424",
        schedule: "Sun - Thu, 4.30PM - 10.30PM",
        operatorName: generateRandomOperator(),
      },
      {
        name: "Gombakso 191 Food Truck",
        latitude: "3.2147262000303227",
        longitude: "101.7030315006357",
        schedule: "Wed - Mon, 11.00AM - 7.00PM",
        operatorName: "As Saifi Food Industries",
      },
    ];
    await db.insert(foodTrucks).values(foodTrucksData);

    // Prepare data for menu_items insertion
    const menuItemsData: MenuItem[] = [
      { foodTruckId: 1, name: "Oblong Regular (Ayam)", price: "6.00" },
      { foodTruckId: 1, name: "Oblong Special (Ayam)", price: "7.00" },
      { foodTruckId: 1, name: "Oblong Double (Ayam)", price: "9.00" },
      { foodTruckId: 1, name: "Oblong Double Special (Ayam)", price: "11.00" },
      { foodTruckId: 1, name: "Oblong Regular (Lembu)", price: "8.00" },
      { foodTruckId: 1, name: "Oblong Special (Lembu)", price: "10.00" },
      { foodTruckId: 1, name: "Oblong Double (Lembu)", price: "12.00" },
      { foodTruckId: 1, name: "Oblong Double Special (Lembu)", price: "14.00" },
      { foodTruckId: 1, name: "Burger Regular (Ayam)", price: "4.00" },
      { foodTruckId: 1, name: "Burger Special (Ayam)", price: "5.00" },
      { foodTruckId: 1, name: "Burger Double (Ayam)", price: "6.00" },
      { foodTruckId: 1, name: "Burger Double Special (Ayam)", price: "7.00" },
      { foodTruckId: 1, name: "Burger Regular (Lembu)", price: "4.00" },
      { foodTruckId: 1, name: "Burger Special (Lembu)", price: "5.00" },
      { foodTruckId: 1, name: "Burger Double (Lembu)", price: "6.00" },
      { foodTruckId: 1, name: "Burger Double Special (Lembu)", price: "7.00" },
      {
        foodTruckId: 1,
        name: "Burger Ayam Crispy Grill/Chop Regular",
        price: "6.00",
      },
      {
        foodTruckId: 1,
        name: "Burger Ayam Crispy Grill/Chop Double",
        price: "12.00",
      },
      { foodTruckId: 1, name: "Lamb Grill", price: "22.00" },
      { foodTruckId: 1, name: "Chicken Grill", price: "12.00" },
      { foodTruckId: 1, name: "Chicken Popcorn", price: "5.00" },
      { foodTruckId: 1, name: "Cheezy Fries/Wedges", price: "5.00" },
      { foodTruckId: 1, name: "Beef/Chicken Meatball", price: "6.00" },
      { foodTruckId: 1, name: "Benjo", price: "3.00" },
      { foodTruckId: 1, name: "Sosej Egg Roll", price: "3.00" },
      { foodTruckId: 1, name: "Hotdog Ramly", price: "4.00" },
      { foodTruckId: 1, name: "Nugget Ramly", price: "5.00" },
      { foodTruckId: 1, name: "MK Omelette Special", price: "7.00" },
      { foodTruckId: 2, name: "Gulai Ayam", price: "8.00" },
      { foodTruckId: 2, name: "Gulai Daging", price: "10.00" },
      { foodTruckId: 2, name: "Gulai Ikan", price: "9.00" },
      { foodTruckId: 2, name: "Nasi Putih", price: "2.00" },
      { foodTruckId: 3, name: "Ayam Gunting", price: "10.00" },
      { foodTruckId: 3, name: "Ayam Gunting Cheese Leleh", price: "13.00" },
      { foodTruckId: 3, name: "Ayam Satey", price: "3.00" },
      { foodTruckId: 3, name: "Smoke BBQ Ayam Crispy", price: "9.00" },
      { foodTruckId: 3, name: "Sosej Cheese", price: "6.00" },
      { foodTruckId: 3, name: "Cheezy Wedges", price: "5.00" },
      { foodTruckId: 4, name: "Kacang Rebus", price: "5.00" },
      { foodTruckId: 4, name: "Buah Berangan", price: "8.00" },
      { foodTruckId: 4, name: "Kacang Kuda", price: "5.50" },
      { foodTruckId: 4, name: "Kacang Putih", price: "4.00" },
      { foodTruckId: 4, name: "Kacang Merah", price: "4.50" },
      { foodTruckId: 4, name: "Kuaci", price: "3.50" },
      { foodTruckId: 4, name: "Jagung Rebus", price: "4.00" },
      { foodTruckId: 4, name: "Ubi Rebus", price: "6.00" },
      { foodTruckId: 5, name: "Bakso", price: "8.00" },
      { foodTruckId: 5, name: "Bakso Special", price: "10.00" },
      { foodTruckId: 5, name: "Bakso Beranak", price: "10.00" },
      { foodTruckId: 5, name: "Bakso Mercun", price: "12.00" },
      { foodTruckId: 5, name: "Bakso Tumpang", price: "12.00" },
      { foodTruckId: 5, name: "Bakso Volcano", price: "14.00" },
      { foodTruckId: 5, name: "Set Nasi Ayam Penyet", price: "10.00" },
    ];
    await db.insert(menuItems).values(menuItemsData);

    console.log("Seeding completed successfully");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    // Release the client and end the pool
    client.release();
    await pool.end();
  }
}

seed().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
