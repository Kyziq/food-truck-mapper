import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import dotenv from "dotenv";
import { food_trucks, menu_items } from "./schema";

dotenv.config();

const client = new Client({
  connectionString: process.env.DB_URL,
});

const db = drizzle(client);

interface MenuItem {
  name: string;
  price: string;
}

interface FoodTruck {
  id?: number;
  name: string;
  latitude: string;
  longitude: string;
  schedule: string;
  operator_name: string;
  menu_items: MenuItem[];
}

// Function to generate random latitude and longitude near Arau, Perlis, Malaysia
function generateRandomLocation(): { latitude: string; longitude: string } {
  const latOffset = (Math.random() - 0.5) * 0.1;
  const lngOffset = (Math.random() - 0.5) * 0.1;

  const baseLat = 6.4402;
  const baseLng = 100.1986;

  const latitude = (baseLat + latOffset).toString();
  const longitude = (baseLng + lngOffset).toString();

  return { latitude, longitude };
}

// Function to generate random schedule and operator name
function generateRandomScheduleAndOperator(): {
  schedule: string;
  operator_name: string;
} {
  const schedules = [
    "Mon-Fri: 11am-3pm",
    "Mon-Fri: 12pm-4pm",
    "Mon-Fri: 1pm-5pm",
    "Mon-Fri: 2pm-6pm",
  ];

  const operators = [
    "Adib Asyraaf",
    "Khairul Haziq",
    "Adam Abrar",
    "Syed Athif",
    "Iqbal",
    "Arif Salehuddin",
  ];

  const randomSchedule =
    schedules[Math.floor(Math.random() * schedules.length)];
  const randomOperator =
    operators[Math.floor(Math.random() * operators.length)];

  return { schedule: randomSchedule, operator_name: randomOperator };
}

async function seed() {
  await client.connect();

  // Prepare data for food_trucks insertion
  const foodTrucksData: FoodTruck[] = [
    {
      name: "Coconut Shake Onthego",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
      menu_items: [
        { name: "Coconut Shake", price: "9.00" },
        { name: "Coconut Juice", price: "10.00" },
        { name: "Ice Cream", price: "12.00" },
        { name: "Ice Blended", price: "10.00" },
      ],
    },
    {
      name: "Tenom Rangers",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
      menu_items: [
        { name: "Tenom Coffee", price: "5.00" },
        { name: "Tenom Tea", price: "4.00" },
      ],
    },
    {
      name: "Samarqunz FT",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
      menu_items: [{ name: "Nasi Arab Samarkhan", price: "15.00" }],
    },
    {
      name: "Raudhah Fried Chicken",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
      menu_items: [{ name: "Fried Chicken", price: "5.00" }],
    },
    {
      name: "Miecord Foodtruck",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
      menu_items: [
        { name: "Char Kuey Teow", price: "15.00" },
        { name: "Mee Goreng Hitam", price: "13.00" },
        { name: "Kuey Teow Goreng", price: "13.00" },
        { name: "Kuey Teow Kerang", price: "13.00" },
        { name: "Cendol", price: "13.00" },
      ],
    },
    {
      name: "Murtabak Cheese Sijangkang",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
      menu_items: [
        { name: "Murtabak Biasa", price: "6.00" },
        { name: "Murtabak Cheese", price: "7.00" },
      ],
    },
    {
      name: "Koods Pizza",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
      menu_items: [
        { name: "Wagyu Pizza", price: "56.00" },
        { name: "Pepperoni Beef Pizza", price: "15.00" },
      ],
    },
    {
      name: "Kambing Golek Malaysia",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
      menu_items: [{ name: "Kambing", price: "15.00" }],
    },
    {
      name: "Famous Coconut Shake",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
      menu_items: [
        { name: "Coconut Shake", price: "7.00" },
        { name: "Mango Milk Shake", price: "8.00" },
        { name: "Banana Milk Shake", price: "8.00" },
        { name: "Dragon Fruit Milk Shake", price: "8.00" },
      ],
    },
  ];

  // Insert data into the food_trucks table and get the inserted IDs
  const insertedFoodTrucks = await db
    .insert(food_trucks)
    .values(
      foodTrucksData.map((truck) => ({
        name: truck.name,
        latitude: truck.latitude,
        longitude: truck.longitude,
        schedule: truck.schedule,
        operator_name: truck.operator_name,
      }))
    )
    .returning();

  // Insert data into the menu_items table for each food truck using the predefined menu items
  for (let i = 0; i < insertedFoodTrucks.length; i++) {
    const truck = insertedFoodTrucks[i];
    const items = foodTrucksData[i].menu_items;
    if (items) {
      const menuItems = items.map((item) => ({
        food_truck_id: truck.id!,
        name: item.name,
        price: item.price,
      }));
      await db.insert(menu_items).values(menuItems);
    }
  }

  await client.end();
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  client.end();
});
