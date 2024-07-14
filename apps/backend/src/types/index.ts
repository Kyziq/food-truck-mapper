import { t } from "elysia";

// ElysiaJS type definitions
export const FoodTruckSchema = t.Object({
  id: t.Number(),
  name: t.String(),
  latitude: t.String(),
  longitude: t.String(),
  schedule: t.String(),
  operator_name: t.String(),
});

export const MenuItemSchema = t.Object({
  id: t.Number(),
  food_truck_id: t.Number(),
  name: t.String(),
  price: t.String(),
});

// TypeScript type definitions
export type FoodTruckType = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  schedule: string;
  operator_name: string;
};

export type MenuItemType = {
  id: number;
  food_truck_id: number;
  name: string;
  price: string;
};
