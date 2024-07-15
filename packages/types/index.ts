import { t } from "elysia";

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
  operatorName: string;
};

export type MenuItem = {
  id?: number;
  foodTruckId: number;
  name: string;
  price: string;
};

// ElysiaJS type definitions for server
export const FoodTruckSchema = t.Object({
  id: t.Optional(t.Number()),
  name: t.String(),
  latitude: t.String(),
  longitude: t.String(),
  schedule: t.String(),
  operatorName: t.String(),
});

export const MenuItemSchema = t.Object({
  id: t.Optional(t.Number()),
  foodTruckId: t.Number(),
  name: t.String(),
  price: t.String(),
});
