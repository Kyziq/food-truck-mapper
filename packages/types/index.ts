export type LocationCoords = {
  latitude: number;
  longitude: number;
};

export type FoodTruck = {
  id?: number;
  name: string;
  latitude: string;
  longitude: string;
  schedule: string;
  operator_name: string;
};

export type MenuItem = {
  id?: number;
  food_truck_id: number;
  name: string;
  price: string;
};

// ElysiaJS type definitions for server
import { t } from "elysia";

export const FoodTruckSchema = t.Object({
  id: t.Optional(t.Number()),
  name: t.String(),
  latitude: t.String(),
  longitude: t.String(),
  schedule: t.String(),
  operator_name: t.String(),
});

export const MenuItemSchema = t.Object({
  id: t.Optional(t.Number()),
  food_truck_id: t.Optional(t.Number()),
  name: t.String(),
  price: t.String(),
});
