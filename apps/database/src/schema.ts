import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";

// Define the food_trucks table
export const food_trucks = pgTable("food_trucks", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  schedule: text("schedule").notNull(),
  operator_name: varchar("operator_name", { length: 255 }).notNull(),
});

// Define the menu_items table
export const menu_items = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  food_truck_id: integer("food_truck_id")
    .references(() => food_trucks.id)
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  //   description: text("description").notNull(),
  price: varchar("price", { length: 50 }).notNull(),
});
