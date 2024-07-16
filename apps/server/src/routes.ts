import { eq } from "drizzle-orm";
import type { FoodTruck, MenuItem } from "@types";
import { db } from "@database/src/db";
import { foodTrucks, menuItems } from "@database/src/schema";

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
    const foodTrucksData = await db.select().from(foodTrucks).execute();
    console.log(`Successfully fetched ${foodTrucksData.length} food trucks`);
    return jsonResponse(foodTrucksData);
  } catch (error) {
    console.error("Error fetching food trucks:", error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function createFoodTruck(reqBody: FoodTruck) {
  try {
    const newFoodTruck: FoodTruck[] = await db
      .insert(foodTrucks)
      .values(reqBody)
      .returning()
      .execute();
    console.log(
      `Successfully created new food truck with ID: ${newFoodTruck[0].foodTruckId}`
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
      .from(foodTrucks)
      .where(eq(foodTrucks.foodTruckId, id))
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

export async function updateFoodTruck(id: number, reqBody: Partial<FoodTruck>) {
  try {
    const updatedFoodTruck: FoodTruck[] = await db
      .update(foodTrucks)
      .set(reqBody)
      .where(eq(foodTrucks.foodTruckId, id))
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
    await db.delete(menuItems).where(eq(menuItems.foodTruckId, id)).execute();
    // Delete the food truck
    const deletedFoodTruck: FoodTruck[] = await db
      .delete(foodTrucks)
      .where(eq(foodTrucks.foodTruckId, id))
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
    const menuItemsData: MenuItem[] = await db
      .select()
      .from(menuItems)
      .execute();
    console.log(`Successfully fetched ${menuItemsData.length} menu items`);
    return jsonResponse(menuItemsData);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function getAllMenuItemsByFoodTruckId(foodTruckId: number) {
  try {
    const menuItemsData: MenuItem[] = await db
      .select()
      .from(menuItems)
      .where(eq(menuItems.foodTruckId, foodTruckId))
      .execute();
    console.log(
      `Successfully fetched ${menuItemsData.length} menu items for food truck ID: ${foodTruckId}`
    );
    return jsonResponse(menuItemsData);
  } catch (error) {
    console.error(
      `Error fetching menu items for food truck ID ${foodTruckId}:`,
      error
    );
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function createMenuItem(reqBody: MenuItem) {
  try {
    const newMenuItem: MenuItem[] = await db
      .insert(menuItems)
      .values(reqBody)
      .returning()
      .execute();
    console.log(
      `Successfully created new menu item with ID: ${newMenuItem[0].menuItemId}`
    );
    return jsonResponse(newMenuItem[0], 201);
  } catch (error) {
    console.error("Error creating menu item:", error);
    return jsonResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function updateMenuItem(id: number, reqBody: Partial<MenuItem>) {
  try {
    const updatedMenuItem = await db
      .update(menuItems)
      .set(reqBody)
      .where(eq(menuItems.menuItemId, id))
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
      .delete(menuItems)
      .where(eq(menuItems.menuItemId, id))
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
