import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
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
  type FoodTruck,
  type MenuItem,
  FoodTruckSchema,
  MenuItemSchema,
} from "@types";

// Base API path
const basePath = "/api";

new Elysia()
  .use(cors())
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
        tags: ["Food Trucks"],
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
        tags: ["Food Trucks"],
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
        tags: ["Menu Items"],
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
        tags: ["Menu Items"],
      },
    }
  )

  // POST Routes
  .post(
    `${basePath}/foodtrucks`,
    async ({ body }) => {
      // Create a new food truck
      return await createFoodTruck(body as FoodTruck);
    },
    {
      body: FoodTruckSchema,
      detail: {
        description: "Create a new food truck",
        tags: ["Food Trucks"],
      },
    }
  )
  .post(
    `${basePath}/menuitems`,
    async ({ body }) => {
      // Create a new menu item
      return await createMenuItem(body as MenuItem);
    },
    {
      body: MenuItemSchema,
      detail: {
        description: "Create a new menu item",
        tags: ["Menu Items"],
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
      return await updateFoodTruck(foodTruckId, body as FoodTruck);
    },
    {
      body: FoodTruckSchema,
      detail: {
        description: "Update a specific food truck by ID",
        tags: ["Food Trucks"],
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
      return await updateMenuItem(menuItemId, body as MenuItem);
    },
    {
      body: MenuItemSchema,
      detail: {
        description: "Update a specific menu item by ID",
        tags: ["Menu Items"],
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
        tags: ["Food Trucks"],
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
        tags: ["Menu Items"],
      },
    }
  )
  // Start the server
  .listen(3234, () => {
    console.log(`Server listening on http://localhost:3234`);
  });
