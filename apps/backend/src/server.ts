import {
  createFoodTruck,
  getFoodTrucks,
  getFoodTruckById,
  updateFoodTruck,
  deleteFoodTruck,
  createMenuItem,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} from "./routes";

// Define constants for path segments
const FOODTRUCKS_PATH = "/foodtrucks";
const MENUITEMS_PATH = "/menuitems";

// Function to handle incoming HTTP requests
async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const { pathname } = url;

  // Food Truck Routes
  if (pathname === FOODTRUCKS_PATH && req.method === "GET") {
    // Get all food trucks
    return getFoodTrucks();
  }

  if (pathname.startsWith(`${FOODTRUCKS_PATH}/`) && req.method === "GET") {
    // Get a specific food truck by ID
    const id = parseInt(pathname.substring(FOODTRUCKS_PATH.length + 1), 10);
    return getFoodTruckById(id);
  }

  if (pathname === FOODTRUCKS_PATH && req.method === "POST") {
    // Create a new food truck
    const body = await req.json();
    return createFoodTruck(body);
  }

  if (pathname.startsWith(`${FOODTRUCKS_PATH}/`) && req.method === "PUT") {
    // Update a specific food truck by ID
    const id = parseInt(pathname.substring(FOODTRUCKS_PATH.length + 1), 10);
    const body = await req.json();
    return updateFoodTruck(id, body);
  }

  if (pathname.startsWith(`${FOODTRUCKS_PATH}/`) && req.method === "DELETE") {
    // Delete a specific food truck by ID
    const id = parseInt(pathname.substring(FOODTRUCKS_PATH.length + 1), 10);
    return deleteFoodTruck(id);
  }

  // Menu Items Routes
  if (pathname.startsWith(`${MENUITEMS_PATH}/`) && req.method === "GET") {
    // Get a specific menu item by ID
    const id = parseInt(pathname.substring(MENUITEMS_PATH.length + 1), 10);
    return getMenuItemById(id);
  }

  if (pathname === MENUITEMS_PATH && req.method === "POST") {
    // Create a new menu item
    const body = await req.json();
    return createMenuItem(body);
  }

  if (pathname.startsWith(`${MENUITEMS_PATH}/`) && req.method === "PUT") {
    // Update a specific menu item by ID
    const id = parseInt(pathname.substring(MENUITEMS_PATH.length + 1), 10);
    const body = await req.json();
    return updateMenuItem(id, body);
  }

  if (pathname.startsWith(`${MENUITEMS_PATH}/`) && req.method === "DELETE") {
    // Delete a specific menu item by ID
    const id = parseInt(pathname.substring(MENUITEMS_PATH.length + 1), 10);
    return deleteMenuItem(id);
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
