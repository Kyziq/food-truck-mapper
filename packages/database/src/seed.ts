import { food_trucks, menu_items } from "./schema";
import type { FoodTruck } from "@types";
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
  pool.connect();
  try {
    // Prepare data for food_trucks insertion
    const foodTrucksData: Omit<FoodTruck, "id">[] = [
      {
        name: "MK Muhibbien Kitchen Foodtruck",
        latitude: "6.12805409036393",
        longitude: "100.35833604654881",
        schedule: "Sunday - Saturday, 7:30PM - 3.30AM",
        operator_name: "Nurul Aini binti Ramli",
      },
      {
        name: "Raja Gulai Foodtruck",
        latitude: "6.123553141912142",
        longitude: "100.34869288853561",
        schedule: "Sat - Thu, 8.00AM - 1.00PM",
        operator_name: generateRandomOperator(),
      },
      {
        name: "Naz's Chicken",
        latitude: "6.11742422302653",
        longitude: "100.36554664396253",
        schedule: "Sat - Thu, 12.00AM - 7.00PM",
        operator_name: "Naz's Foods Enterprise",
      },
      {
        name: "Food Truck Kacang Rebus dan Buah Berangan",
        latitude: "6.242540992257719",
        longitude: "100.42012386730424",
        schedule: "Sun - Thu, 4.30PM - 10.30PM",
        operator_name: generateRandomOperator(),
      },
      {
        name: "Gombakso 191 Food Truck",
        latitude: "3.2147262000303227",
        longitude: "101.7030315006357",
        schedule: "Wed - Mon, 11.00AM - 7.00PM",
        operator_name: "As Saifi Food Industries",
      },
    ];

    // Prepare data for menu_items insertion
    const menuItemsData = [
      [
        { name: "Oblong Regular (Ayam)", price: "6.00" },
        { name: "Oblong Special (Ayam)", price: "7.00" },
        { name: "Oblong Double (Ayam)", price: "9.00" },
        { name: "Oblong Double Special (Ayam)", price: "11.00" },
        { name: "Oblong Regular (Lembu)", price: "8.00" },
        { name: "Oblong Special (Lembu)", price: "10.00" },
        { name: "Oblong Double (Lembu)", price: "12.00" },
        { name: "Oblong Double Special (Lembu)", price: "14.00" },
        { name: "Burger Tebal Regular (Ayam)", price: "5.00" },
        { name: "Burger Tebal Special (Ayam)", price: "6.00" },
        { name: "Burger Tebal Double (Ayam)", price: "8.00" },
        { name: "Burger Tebal Double Special (Ayam)", price: "9.00" },
        { name: "Burger Tebal Regular (Lembu)", price: "7.00" },
        { name: "Burger Tebal Special (Lembu)", price: "8.00" },
        { name: "Burger Tebal Double (Lembu)", price: "10.00" },
        { name: "Burger Tebal Double Special (Lembu)", price: "11.00" },
        { name: "Burger Tebal Regular (Kambing)", price: "8.00" },
        { name: "Burger Tebal Special (Kambing)", price: "10.00" },
        { name: "Burger Tebal Double (Kambing)", price: "12.00" },
        { name: "Burger Tebal Double Special (Kambing)", price: "13.00" },
        { name: "Burger Nipis Regular (Ayam)", price: "4.00" },
        { name: "Burger Nipis Special (Ayam)", price: "5.00" },
        { name: "Burger Nipis Double (Ayam)", price: "6.00" },
        { name: "Burger Nipis Double Special (Ayam)", price: "7.00" },
        { name: "Burger Nipis Regular (Lembu)", price: "4.00" },
        { name: "Burger Nipis Special (Lembu)", price: "5.00" },
        { name: "Burger Nipis Double (Lembu)", price: "6.00" },
        { name: "Burger Nipis Double Special (Lembu)", price: "7.00" },
        { name: "Burger Ayam Crispy Grill/Chop Regular", price: "6.00" },
        { name: "Burger Ayam Crispy Grill/Chop Double", price: "12.00" },
        { name: "Lamb Grill", price: "22.00" },
        { name: "Chicken Grill", price: "12.00" },
        { name: "Chicken Popcorn", price: "5.00" },
        { name: "Cheezy Fries/Wedges", price: "5.00" },
        { name: "Beef/Chicken Meatball", price: "6.00" },
        { name: "Benjo", price: "3.00" },
        { name: "Sosej Egg Roll", price: "3.00" },
        { name: "Hotdog Ramly", price: "4.00" },
        { name: "Nugget Ramly", price: "5.00" },
        { name: "MK Omelette Special", price: "7.00" },
      ],
      [
        { name: "Gulai Ayam", price: "8.00" },
        { name: "Gulai Daging", price: "10.00" },
        { name: "Gulai Ikan", price: "9.00" },
        { name: "Nasi Putih", price: "2.00" },
      ],
      [
        { name: "Ayam Gunting", price: "10.00" },
        { name: "Ayam Gunting Cheese Leleh", price: "13.00" },
        { name: "Ayam Satey", price: "3.00" },
        { name: "Smoke BBQ Ayam Crispy", price: "9.00" },
        { name: "Sosej Cheese", price: "6.00" },
        { name: "Cheezy Wedges", price: "5.00" },
      ],
      [
        { name: "Kacang Rebus", price: "5.00" },
        { name: "Buah Berangan", price: "8.00" },
        { name: "Kacang Kuda", price: "5.50" },
        { name: "Kacang Putih", price: "4.00" },
        { name: "Kacang Merah", price: "4.50" },
        { name: "Kuaci", price: "3.50" },
        { name: "Jagung Rebus", price: "4.00" },
        { name: "Ubi Rebus", price: "6.00" },
      ],
      [
        { name: "Bakso", price: "8.00" },
        { name: "Bakso Special", price: "10.00" },
        { name: "Bakso Beranak", price: "10.00" },
        { name: "Bakso Mercun", price: "12.00" },
        { name: "Bakso Tumpang", price: "12.00" },
        { name: "Bakso Volcano", price: "14.00" },
        { name: "Set Nasi Ayam Penyet", price: "10.00" },
      ],
    ];

    // Insert data into the food_trucks table
    const insertedFoodTrucks = await db
      .insert(food_trucks)
      .values(foodTrucksData)
      .returning();

    // Insert data into the menu_items table for each food truck using the predefined menu items
    for (let i = 0; i < insertedFoodTrucks.length; i++) {
      const truck = insertedFoodTrucks[i];
      const items = menuItemsData[i];
      if (items) {
        const menuItems = items.map((item) => ({
          food_truck_id: truck.id!,
          name: item.name,
          price: item.price,
        }));
        await db.insert(menu_items).values(menuItems);
      }
    }

    console.log("Seeding completed successfully");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    // Close the pool when done
    pool.end();
  }
}

seed();
