import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/foodtrucks")({
  component: FoodTrucks,
});

function FoodTrucks() {
  return (
    <div className="p-2">
      <h3>Food Trucks!</h3>
    </div>
  );
}
