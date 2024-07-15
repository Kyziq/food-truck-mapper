import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";

// Define the food_trucks table
export const foodTrucks = pgTable("food_trucks", {
  foodTruckId: serial("food_truck_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  schedule: text("schedule").notNull(),
  operatorName: varchar("operator_name", { length: 255 }).notNull(),
});

// Define the menu_items table
export const menuItems = pgTable("menu_items", {
  menuItemId: serial("menu_item_id").primaryKey(),
  foodTruckId: integer("food_truck_id")
    .references(() => foodTrucks.foodTruckId)
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  price: varchar("price", { length: 50 }).notNull(),
});
