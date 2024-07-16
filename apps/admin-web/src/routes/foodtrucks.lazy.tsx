import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Edit, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchFoodTrucks } from "@/lib/api";

export const Route = createLazyFileRoute("/foodtrucks")({
  component: FoodTrucks,
});

function FoodTrucks() {
  const {
    data: foodTrucks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["foodTrucks"],
    queryFn: fetchFoodTrucks,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading food trucks</div>;

  return (
    <div className="p-4 md:p-8">
      <Card className="w-full h-full">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <div>
            <CardTitle>Food Trucks</CardTitle>
            <CardDescription>
              Manage all the food trucks and their details.
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="#">
              Create Food Truck
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-4 overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Latitude</TableHead>
                <TableHead>Longitude</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Operator Name</TableHead>
                <TableHead className="text-right">Operation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foodTrucks.map((truck) => (
                <TableRow>
                  <TableCell className="py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {truck.name}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap">
                    {truck.latitude}
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap">
                    {truck.longitude}
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap">
                    {truck.schedule}
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap">
                    {truck.operatorName}
                  </TableCell>
                  <TableCell className="py-4 whitespace-nowrap text-right">
                    <Button size="sm" variant="outline" className="mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
