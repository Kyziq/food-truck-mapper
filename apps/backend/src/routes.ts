// routes.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { food_trucks } from "./schema";
import { Client } from "pg";

const dbUrl = process.env.DB_URL;
if (!dbUrl) {
  throw new Error("DB_URL is not defined in the environment variables.");
}

const client = new Client({
  connectionString: dbUrl,
});

client.connect().catch((error) => {
  console.error("Failed to connect to the database:", error);
  process.exit(1); // Exit the process with an error code
});

const db = drizzle(client);

export async function getFoodTrucks() {
  try {
    const foodTrucks = await db.select().from(food_trucks);
    return new Response(JSON.stringify(foodTrucks, null, 2), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching food trucks:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
