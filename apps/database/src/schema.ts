import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const foodtrucks = pgTable("foodtrucks", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  menu: text("menu").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  schedule: text("schedule").notNull(),
});
