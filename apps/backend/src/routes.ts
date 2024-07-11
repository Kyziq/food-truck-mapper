import { drizzle } from "drizzle-orm/node-postgres";
import { food_trucks, menu_items } from "./schema";
import { Client } from "pg";
import { eq } from "drizzle-orm";

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

interface FoodTruck {
  id?: number;
  name: string;
  latitude: string;
  longitude: string;
  schedule: string;
  operator_name: string;
}

interface MenuItem {
  id?: number;
  food_truck_id: number;
  name: string;
  price: string;
}

// Fetch all food trucks
export async function getFoodTrucks() {
  try {
    const foodTrucks = await db.select().from(food_trucks).execute();
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

// Create a new food truck
export async function createFoodTruck(reqBody: FoodTruck) {
  try {
    const newFoodTruck = await db.insert(food_trucks).values(reqBody).execute();
    return new Response(JSON.stringify(newFoodTruck, null, 2), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating food truck:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Create a new menu item
export async function createMenuItem(reqBody: MenuItem) {
  try {
    const newMenuItem = await db.insert(menu_items).values(reqBody).execute();
    return new Response(JSON.stringify(newMenuItem, null, 2), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating menu item:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Get a specific food truck by ID
export async function getFoodTruckById(id: number) {
  try {
    const result = await db
      .select()
      .from(food_trucks)
      .where(eq(food_trucks.id, id))
      .execute();
    if (result.length === 0) {
      return new Response("Food truck not found", { status: 404 });
    }
    return new Response(JSON.stringify(result[0], null, 2), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching food truck:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Get all menu items for a specific food truck
export async function getMenuItemById(id: number) {
  try {
    const result = await db
      .select()
      .from(menu_items)
      .where(eq(menu_items.id, id))
      .execute();
    if (result.length === 0) {
      return new Response("Menu item not found", { status: 404 });
    }
    return new Response(JSON.stringify(result[0], null, 2), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching menu item:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Update a food truck by ID
export async function updateFoodTruck(id: number, reqBody: Partial<FoodTruck>) {
  try {
    const updatedFoodTruck = await db
      .update(food_trucks)
      .set(reqBody)
      .where(eq(food_trucks.id, id))
      .execute();
    return new Response(JSON.stringify(updatedFoodTruck, null, 2), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating food truck:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Update a menu item by ID
export async function updateMenuItem(id: number, reqBody: Partial<MenuItem>) {
  try {
    const updatedMenuItem = await db
      .update(menu_items)
      .set(reqBody)
      .where(eq(menu_items.id, id))
      .execute();
    return new Response(JSON.stringify(updatedMenuItem, null, 2), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating menu item:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Delete a food truck by ID
export async function deleteFoodTruck(id: number) {
  try {
    await db.delete(food_trucks).where(eq(food_trucks.id, id)).execute();
    return new Response("Food truck deleted successfully", {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error deleting food truck:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Delete a menu item by ID
export async function deleteMenuItem(id: number) {
  try {
    await db.delete(menu_items).where(eq(menu_items.id, id)).execute();
    return new Response("Menu item deleted successfully", {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
