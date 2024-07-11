import {
  createFoodTruck,
  getFoodTrucks,
  getFoodTruckById,
  updateFoodTruck,
  deleteFoodTruck,
} from "./routes";
import {
  createMenuItem,
  getMenuItemsForFoodTruck,
  updateMenuItem,
  deleteMenuItem,
} from "./routes";

const server = Bun.serve({
  port: 0,
  async fetch(req) {
    const url = new URL(req.url);
    const { pathname } = url;

    if (pathname === "/foodtrucks" && req.method === "GET") {
      return getFoodTrucks();
    } else if (pathname.startsWith("/foodtrucks/") && req.method === "GET") {
      const id = parseInt(pathname.substring("/foodtrucks/".length), 10);
      return getFoodTruckById(id);
    } else if (pathname === "/foodtrucks" && req.method === "POST") {
      const body = await req.json();
      return createFoodTruck(body);
    } else if (pathname.startsWith("/foodtrucks/") && req.method === "PUT") {
      const id = parseInt(pathname.substring("/foodtrucks/".length), 10);
      const body = await req.json();
      return updateFoodTruck(id, body);
    } else if (pathname.startsWith("/foodtrucks/") && req.method === "DELETE") {
      const id = parseInt(pathname.substring("/foodtrucks/".length), 10);
      return deleteFoodTruck(id);
    } else if (
      pathname.startsWith("/foodtrucks/") &&
      req.method === "GET" &&
      pathname.endsWith("/menuitems")
    ) {
      const id = parseInt(
        pathname.substring(
          "/foodtrucks/".length,
          pathname.lastIndexOf("/menuitems")
        ),
        10
      );
      return getMenuItemsForFoodTruck(id);
    } else if (pathname === "/menuitems" && req.method === "POST") {
      const body = await req.json();
      return createMenuItem(body);
    } else if (pathname.startsWith("/menuitems/") && req.method === "PUT") {
      const id = parseInt(pathname.substring("/menuitems/".length), 10);
      const body = await req.json();
      return updateMenuItem(id, body);
    } else if (pathname.startsWith("/menuitems/") && req.method === "DELETE") {
      const id = parseInt(pathname.substring("/menuitems/".length), 10);
      return deleteMenuItem(id);
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log("Server listening on http://localhost:" + server.port);
