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

// Function to extract the ID from the URL path
function extractId(path: string, basePath: string): number | null {
  const basePathWithSlash = `/${basePath}/`;
  if (path.startsWith(basePathWithSlash)) {
    const idPart = path.slice(basePathWithSlash.length).split("/")[0];
    const id = parseInt(idPart, 10);
    return isNaN(id) ? null : id;
  }
  return null;
}

// Function to handle incoming HTTP requests
async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const { pathname } = url;

  console.log(`Handling request for ${pathname} with method ${req.method}`);

  // Food Truck Routes
  if (req.method === "GET") {
    if (pathname === "/foodtrucks") {
      // Get all food trucks
      return getFoodTrucks();
    }

    const foodTruckId = extractId(pathname, "foodtrucks");
    if (foodTruckId !== null) {
      if (pathname === `/foodtrucks/${foodTruckId}`) {
        // Get a specific food truck by ID
        return getFoodTruckById(foodTruckId);
      } else if (pathname === `/foodtrucks/${foodTruckId}/menuitems`) {
        // Get all menu items for a specific food truck
        return getAllMenuItemsByFoodTruckId(foodTruckId);
      }
    }

    if (pathname === "/menuitems") {
      // Get all menu items for every food truck
      return getAllMenuItems();
    }
  }

  if (req.method === "POST") {
    if (pathname === "/foodtrucks") {
      // Create a new food truck
      const body = await req.json();
      return createFoodTruck(body);
    } else if (pathname === "/menuitems") {
      // Create a new menu item
      const body = await req.json();
      return createMenuItem(body);
    }
  }

  if (req.method === "PUT") {
    const foodTruckId = extractId(pathname, "foodtrucks");
    if (foodTruckId !== null && pathname === `/foodtrucks/${foodTruckId}`) {
      // Update a specific food truck by ID
      const body = await req.json();
      return updateFoodTruck(foodTruckId, body);
    }

    const menuItemId = extractId(pathname, "menuitems");
    if (menuItemId !== null && pathname === `/menuitems/${menuItemId}`) {
      // Update a specific menu item by ID
      const body = await req.json();
      return updateMenuItem(menuItemId, body);
    }
  }

  if (req.method === "DELETE") {
    const foodTruckId = extractId(pathname, "foodtrucks");
    if (foodTruckId !== null && pathname === `/foodtrucks/${foodTruckId}`) {
      // Delete a specific food truck by ID
      return deleteFoodTruck(foodTruckId);
    }

    const menuItemId = extractId(pathname, "menuitems");
    if (menuItemId !== null && pathname === `/menuitems/${menuItemId}`) {
      // Delete a specific menu item by ID
      return deleteMenuItem(menuItemId);
    }
  }

  // If no route matches, return 404 Not Found
  return new Response("Not Found", { status: 404 });
}

// Start the server
const server = Bun.serve({
  port: 3234,
  fetch: handleRequest,
});

console.log("Server listening on http://localhost:" + server.port);
