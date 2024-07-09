import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  throw new Error("DB_URL environment variable is not defined");
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
