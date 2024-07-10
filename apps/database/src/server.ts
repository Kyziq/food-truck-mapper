import { getFoodTrucks } from "./routes";

const server = Bun.serve({
  port: 0,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/foodtrucks") {
      return getFoodTrucks();
    }
    return new Response("Not Found", { status: 404 });
  },
});

console.log("Server listening on http://localhost:" + server.port);
