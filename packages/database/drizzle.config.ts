import { defineConfig } from "drizzle-kit";
import { dbUrl } from "./src/db";

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
