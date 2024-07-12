export type LocationCoords = {
  latitude: number;
  longitude: number;
};

export type FoodTruck = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  schedule: string;
  operator_name: string;
};

export type MenuItem = {
  name: string;
  price: string;
};
