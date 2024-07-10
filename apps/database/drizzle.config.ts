import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Check if DB_URL is defined
const dbUrl = process.env.DB_URL;
if (!dbUrl) {
  throw new Error("DB_URL is not defined in the environment variables.");
}

export default defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/schema.ts",
  dbCredentials: {
    url: dbUrl,
  },
  verbose: true,
  strict: true,
});
