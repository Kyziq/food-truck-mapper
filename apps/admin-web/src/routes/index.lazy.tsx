import { createLazyFileRoute } from "@tanstack/react-router";
import { LoadingSpinner } from "@/components/ui/loading"; // Assuming you have a loading spinner component

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-xl font-bold mb-2">Dashboard - Work in Progress!</h3>
      <p className="text-gray-600">
        We are working hard to bring you this feature. Stay tuned!
      </p>
    </div>
  );
}

export default Index;
