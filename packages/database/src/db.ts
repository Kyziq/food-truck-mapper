import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const dotenv = require("dotenv");

dotenv.config({ path: "../../.env" });

if (!process.env["DB_URL"]) {
  throw new Error("DB_URL is not defined in the environment variables.");
}

export const dbUrl = process.env["DB_URL"];

export const pool = new Pool({
  connectionString: process.env["DB_URL"],
});

export const db = drizzle(pool);

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});
