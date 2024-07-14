import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import {
  createFoodTruck,
  getFoodTrucks,
  getFoodTruckById,
  updateFoodTruck,
  deleteFoodTruck,
  createMenuItem,
  getAllMenuItems,
  getAllMenuItemsByFoodTruckId,
  updateMenuItem,
  deleteMenuItem,
} from "./routes";
import {
  FoodTruckSchema,
  MenuItemSchema,
  type FoodTruckType,
  type MenuItemType,
} from "./types";

// Base API path
const basePath = "/api";

new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Food Truck Mapper Elysia Documentation",
          version: "1.0.0",
        },
      },
    })
  )
  // GET Routes
  .get(
    `${basePath}/foodtrucks`,
    async () => {
      // Fetch all food trucks
      return await getFoodTrucks();
    },
    {
      detail: {
        description: "Fetch all food trucks",
        tags: ["FoodTrucks"],
      },
    }
  )
  .get(
    `${basePath}/foodtrucks/:id`,
    async ({ params }) => {
      // Fetch a specific food truck by ID
      const foodTruckId = parseInt(params.id, 10);
      if (isNaN(foodTruckId)) {
        return new Response("Invalid ID", { status: 400 });
      }
      return await getFoodTruckById(foodTruckId);
    },
    {
      detail: {
        description: "Fetch a specific food truck by ID",
        tags: ["FoodTrucks"],
      },
    }
  )
  .get(
    `${basePath}/foodtrucks/:id/menuitems`,
    async ({ params }) => {
      // Fetch all menu items for a specific food truck by ID
      const foodTruckId = parseInt(params.id, 10);
      if (isNaN(foodTruckId)) {
        return new Response("Invalid ID", { status: 400 });
      }
      return await getAllMenuItemsByFoodTruckId(foodTruckId);
    },
    {
      detail: {
        description: "Fetch all menu items for a specific food truck by ID",
        tags: ["MenuItems"],
      },
    }
  )
  .get(
    `${basePath}/menuitems`,
    async () => {
      // Fetch all menu items for all food trucks
      return await getAllMenuItems();
    },
    {
      detail: {
        description: "Fetch all menu items for all food trucks",
        tags: ["MenuItems"],
      },
    }
  )

  // POST Routes
  .post(
    `${basePath}/foodtrucks`,
    async ({ body }) => {
      // Create a new food truck
      return await createFoodTruck(body as FoodTruckType);
    },
    {
      body: FoodTruckSchema,
      detail: {
        description: "Create a new food truck",
        tags: ["FoodTrucks"],
      },
    }
  )
  .post(
    `${basePath}/menuitems`,
    async ({ body }) => {
      // Create a new menu item
      return await createMenuItem(body as MenuItemType);
    },
    {
      body: MenuItemSchema,
      detail: {
        description: "Create a new menu item",
        tags: ["MenuItems"],
      },
    }
  )

  // PUT Routes
  .put(
    `${basePath}/foodtrucks/:id`,
    async ({ params, body }) => {
      // Update a specific food truck by ID
      const foodTruckId = parseInt(params.id, 10);
      if (isNaN(foodTruckId)) {
        return new Response("Invalid ID", { status: 400 });
      }
      return await updateFoodTruck(foodTruckId, body as FoodTruckType);
    },
    {
      body: FoodTruckSchema,
      detail: {
        description: "Update a specific food truck by ID",
        tags: ["FoodTrucks"],
      },
    }
  )
  .put(
    `${basePath}/menuitems/:id`,
    async ({ params, body }) => {
      // Update a specific menu item by ID
      const menuItemId = parseInt(params.id, 10);
      if (isNaN(menuItemId)) {
        return new Response("Invalid ID", { status: 400 });
      }
      return await updateMenuItem(menuItemId, body as MenuItemType);
    },
    {
      body: MenuItemSchema,
      detail: {
        description: "Update a specific menu item by ID",
        tags: ["MenuItems"],
      },
    }
  )

  // DELETE Routes
  .delete(
    `${basePath}/foodtrucks/:id`,
    async ({ params }) => {
      // Delete a specific food truck by ID
      const foodTruckId = parseInt(params.id, 10);
      if (isNaN(foodTruckId)) {
        return new Response("Invalid ID", { status: 400 });
      }
      return await deleteFoodTruck(foodTruckId);
    },
    {
      detail: {
        description: "Delete a specific food truck by ID",
        tags: ["FoodTrucks"],
      },
    }
  )
  .delete(
    `${basePath}/menuitems/:id`,
    async ({ params }) => {
      // Delete a specific menu item by ID
      const menuItemId = parseInt(params.id, 10);
      if (isNaN(menuItemId)) {
        return new Response("Invalid ID", { status: 400 });
      }
      return await deleteMenuItem(menuItemId);
    },
    {
      detail: {
        description: "Delete a specific menu item by ID",
        tags: ["MenuItems"],
      },
    }
  )
  // Start the server
  .listen(3234, () => {
    console.log(`Server listening on http://localhost:3234`);
  });
