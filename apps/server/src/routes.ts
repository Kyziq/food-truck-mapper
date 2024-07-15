import { eq } from "drizzle-orm";
import type { FoodTruckType, MenuItemType } from "./types";
import { db } from "../../../packages/database/src/db";
import { food_trucks, menu_items } from "../../../packages/database/src/schema";

// Helper function for consistent response formatting
function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    headers: { "Content-Type": "application/json" },
    status,
  });
}

// Food Truck Handlers
export async function getFoodTrucks() {
  try {
    const foodTrucks = await db.select().from(food_trucks).execute();
    console.log(`Successfully fetched ${foodTrucks.length} food trucks`);
    return jsonResponse(foodTrucks);
  } catch (error) {
    console.error("Error fetching food trucks:", error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function createFoodTruck(reqBody: FoodTruckType) {
  try {
    const newFoodTruck = await db
      .insert(food_trucks)
      .values(reqBody)
      .returning()
      .execute();
    console.log(
      `Successfully created new food truck with ID: ${newFoodTruck[0].id}`
    );
    return jsonResponse(newFoodTruck[0], 201);
  } catch (error) {
    console.error("Error creating food truck:", error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function getFoodTruckById(id: number) {
  try {
    const result = await db
      .select()
      .from(food_trucks)
      .where(eq(food_trucks.id, id))
      .execute();
    if (result.length === 0) {
      console.log(`Food truck with ID ${id} not found`);
      return jsonResponse({ error: "Food truck not found" }, 404);
    }
    console.log(`Successfully fetched food truck with ID: ${id}`);
    return jsonResponse(result[0]);
  } catch (error) {
    console.error(`Error fetching food truck with ID ${id}:`, error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function updateFoodTruck(
  id: number,
  reqBody: Partial<FoodTruckType>
) {
  try {
    const updatedFoodTruck = await db
      .update(food_trucks)
      .set(reqBody)
      .where(eq(food_trucks.id, id))
      .returning()
      .execute();
    if (updatedFoodTruck.length === 0) {
      console.log(`Food truck with ID ${id} not found for update`);
      return jsonResponse({ error: "Food truck not found" }, 404);
    }
    console.log(`Successfully updated food truck with ID: ${id}`);
    return jsonResponse(updatedFoodTruck[0]);
  } catch (error) {
    console.error(`Error updating food truck with ID ${id}:`, error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function deleteFoodTruck(id: number) {
  try {
    // Delete all menu items related to the food truck
    await db
      .delete(menu_items)
      .where(eq(menu_items.food_truck_id, id))
      .execute();
    // Delete the food truck
    const deletedFoodTruck = await db
      .delete(food_trucks)
      .where(eq(food_trucks.id, id))
      .returning()
      .execute();
    if (deletedFoodTruck.length === 0) {
      console.log(`Food truck with ID ${id} not found for deletion`);
      return jsonResponse({ error: "Food truck not found" }, 404);
    }
    console.log(`Successfully deleted food truck with ID: ${id}`);
    return jsonResponse({ message: "Food truck deleted successfully" });
  } catch (error) {
    console.error(`Error deleting food truck with ID ${id}:`, error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
}

// Menu Item Handlers
export async function getAllMenuItems() {
  try {
    const menuItems = await db.select().from(menu_items).execute();
    console.log(`Successfully fetched ${menuItems.length} menu items`);
    return jsonResponse(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function getAllMenuItemsByFoodTruckId(foodTruckId: number) {
  try {
    const menuItems = await db
      .select()
      .from(menu_items)
      .where(eq(menu_items.food_truck_id, foodTruckId))
      .execute();
    console.log(
      `Successfully fetched ${menuItems.length} menu items for food truck ID: ${foodTruckId}`
    );
    return jsonResponse(menuItems);
  } catch (error) {
    console.error(
      `Error fetching menu items for food truck ID ${foodTruckId}:`,
      error
    );
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function createMenuItem(reqBody: MenuItemType) {
  try {
    const newMenuItem = await db
      .insert(menu_items)
      .values(reqBody)
      .returning()
      .execute();
    console.log(
      `Successfully created new menu item with ID: ${newMenuItem[0].id}`
    );
    return jsonResponse(newMenuItem[0], 201);
  } catch (error) {
    console.error("Error creating menu item:", error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function updateMenuItem(
  id: number,
  reqBody: Partial<MenuItemType>
) {
  try {
    const updatedMenuItem = await db
      .update(menu_items)
      .set(reqBody)
      .where(eq(menu_items.id, id))
      .returning()
      .execute();
    if (updatedMenuItem.length === 0) {
      console.log(`Menu item with ID ${id} not found for update`);
      return jsonResponse({ error: "Menu item not found" }, 404);
    }
    console.log(`Successfully updated menu item with ID: ${id}`);
    return jsonResponse(updatedMenuItem[0]);
  } catch (error) {
    console.error(`Error updating menu item with ID ${id}:`, error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function deleteMenuItem(id: number) {
  try {
    const deletedMenuItem = await db
      .delete(menu_items)
      .where(eq(menu_items.id, id))
      .returning()
      .execute();
    if (deletedMenuItem.length === 0) {
      console.log(`Menu item with ID ${id} not found for deletion`);
      return jsonResponse({ error: "Menu item not found" }, 404);
    }
    console.log(`Successfully deleted menu item with ID: ${id}`);
    return jsonResponse({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error(`Error deleting menu item with ID ${id}:`, error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
}
