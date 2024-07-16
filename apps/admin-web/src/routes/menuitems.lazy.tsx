import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/menuitems")({
  component: MenuItems,
});

function MenuItems() {
  <div className="p-2">
    <h3>Menu Items!</h3>
  </div>;
}
