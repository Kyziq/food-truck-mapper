import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import dotenv from "dotenv";
import { food_trucks, menu_items } from "./schema";

dotenv.config();

const client = new Client({
  connectionString: process.env.DB_URL,
});

const db = drizzle(client);

interface FoodTruck {
  id?: number;
  name: string;
  latitude: string;
  longitude: string;
  schedule: string;
  operator_name: string;
}

interface MenuItem {
  food_truck_id: number;
  name: string;
  price: string;
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
    "Ahmad Ibe",
    "Ibe Lorenzo",
    "Ahmad Kiziq",
  ];

  const randomSchedule =
    schedules[Math.floor(Math.random() * schedules.length)];
  const randomOperator =
    operators[Math.floor(Math.random() * operators.length)];

  return { schedule: randomSchedule, operator_name: randomOperator };
}

// Function to generate random menu items for a food truck
function generateRandomMenuItems(foodTruckId: number): MenuItem[] {
  const foodNames = [
    "Nasi Lemak",
    "Roti Canai",
    "Char Kway Teow",
    "Satay",
    "Laksa",
    "Hainanese Chicken Rice",
    "Mee Goreng",
    "Rendang",
    "Nasi Ayam (Chicken Rice)",
    "Murtabak",
    "Teh Tarik",
    "Rojak",
    "Curry Mee",
    "Bak Kut Teh",
    "Cendol",
    "Chicken Satay",
    "Mee Rebus",
    "Asam Laksa",
    "Nasi Kerabu",
    "Mee Siam",
  ];

  const menuItemsData: MenuItem[] = [];

  foodNames.forEach((foodName) => {
    const price = (Math.random() * (15 - 5) + 5).toFixed(2);

    menuItemsData.push({
      food_truck_id: foodTruckId,
      name: foodName,
      price: price.toString(),
    });
  });

  return menuItemsData;
}

async function seed() {
  await client.connect();

  // Prepare data for food_trucks insertion
  const foodTrucksData: FoodTruck[] = [
    {
      name: "Coconut Shake Onthego",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
    },
    {
      name: "Tenom Rangers",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
    },
    {
      name: "Samarqunz FT",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
    },
    {
      name: "Raudhah Fried Chicken",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
    },
    {
      name: "Miecord Foodtruck",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
    },
    {
      name: "Gyukushi King",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
    },
    {
      name: "Dr Fried Chicken",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
    },
    {
      name: "Anie Noor Dklate",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
    },
    {
      name: "Paparizzo",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
    },
    {
      name: "Cendol Langat Solar Cafe",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
    },
    {
      name: "Sup Kedah Paksu Naim",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
    },
    {
      name: "Shahna Concept",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
    },
    {
      name: "Murtabak Cheese Sijangkang",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
    },
    {
      name: "Dr Fried Chicken",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
    },
    {
      name: "Familia Kitchen",
      ...generateRandomLocation(),
      ...generateRandomScheduleAndOperator(),
    },
    // Add more entries as needed
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

  // Insert data into the menu_items table for each food truck using the returned IDs
  for (const truck of insertedFoodTrucks) {
    const menuItemsData = generateRandomMenuItems(truck.id);
    await db.insert(menu_items).values(menuItemsData);
  }

  await client.end();
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  client.end();
});
