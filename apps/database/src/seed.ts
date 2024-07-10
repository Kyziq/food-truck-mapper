import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import dotenv from "dotenv";
import { food_trucks, menu_items } from "../src/schema";

dotenv.config();

const client = new Client({
  connectionString: process.env.DB_URL,
});

const db = drizzle(client);

async function seed() {
  await client.connect();

  // https://malaysiafoodtrucks.com.my/
  // Insert data into the food_trucks
  await db.insert(food_trucks).values([
    {
      name: "Coconut Shake Onthego",
      latitude: "6.4402", // make auto detect using geolocation
      longitude: "100.1986", // make auto detect using geolocation
      schedule: "Mon-Fri: 11am-3pm",
      operator_name: "Adib Asyraaf",
    },
  ]);

  // Insert data into the menu_items
  await db.insert(menu_items).values([
    {
      food_truck_id: 1,
      name: "Coconut Shake",
      price: "8.00",
    },
    {
      food_truck_id: 1,
      name: "Coconut Juice",
      price: "8.00",
    },
    {
      food_truck_id: 1,
      name: "Coconut Ice Cream",
      price: "8.00",
    },
    {
      food_truck_id: 1,
      name: "Ice Blended",
      price: "8.00",
    },
  ]);
  await client.end();
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  client.end();
});
