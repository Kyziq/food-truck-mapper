import { useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Check, Edit, Plus, Trash, X } from "lucide-react";
import {
  fetchFoodTrucks,
  createFoodTruck,
  deleteFoodTruck,
  updateFoodTruck,
} from "@/lib/api";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Route = createLazyFileRoute("/foodtrucks")({
  component: FoodTrucks,
});

function FoodTrucks() {
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const initialFoodTruckState = {
    name: "",
    operatorName: "",
    latitude: "",
    longitude: "",
    schedule: "",
  };
  const [newFoodTruck, setNewFoodTruck] = useState(initialFoodTruckState);
  const [editingFoodTruckId, setEditingFoodTruckId] = useState<number | null>(
    null
  );
  const [editFoodTruck, setEditFoodTruck] = useState(initialFoodTruckState);

  const {
    data: foodTrucks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["foodTrucks"],
    queryFn: fetchFoodTrucks,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<typeof initialFoodTruckState>>
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const createMutation = useMutation({
    mutationFn: createFoodTruck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foodTrucks"] });
    },
  });

  const handleCreateFoodTruck = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync(newFoodTruck);
      toast({
        variant: "success",
        title: "Success",
        description: "Food truck created successfully.",
        duration: 3000,
      });
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to create food truck.",
        duration: 3000,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const deleteMutation = useMutation({
    mutationFn: deleteFoodTruck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foodTrucks"] });
    },
  });

  const handleDeleteFoodTruck = async (foodTruckId: number) => {
    try {
      await deleteMutation.mutateAsync(foodTruckId);
      toast({
        variant: "success",
        title: "Success",
        description: "Food truck deleted successfully.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to delete food truck.",
        duration: 3000,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const handleEditFoodTruck = (truck: any) => {
    setEditingFoodTruckId(truck.foodTruckId);
    setEditFoodTruck(truck);
  };

  const handleCancelEdit = () => {
    setEditingFoodTruckId(null);
    setEditFoodTruck(initialFoodTruckState);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync(editFoodTruck);
      toast({
        variant: "success",
        title: "Success",
        description: "Food truck updated successfully.",
        duration: 3000,
      });
      setEditingFoodTruckId(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to update food truck.",
        duration: 3000,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const updateMutation = useMutation({
    mutationFn: updateFoodTruck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foodTrucks"] });
    },
  });

  if (isLoading) return <LoadingSpinner className="spinner-class" size={48} />;
  if (error) return <div>Error loading food trucks</div>;

  return (
    <div>
      <Card className="w-full h-full">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <div>
            <CardTitle>Food Trucks</CardTitle>
            <CardDescription>
              Manage all the food trucks and their details.
            </CardDescription>
          </div>
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (open) {
                setNewFoodTruck(initialFoodTruckState);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button size="sm" className="ml-auto gap-1">
                Create Food Truck
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Food Truck</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateFoodTruck} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newFoodTruck.name}
                    onChange={(e) => handleInputChange(e, setNewFoodTruck)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="operator">Operator Name</Label>
                  <Input
                    id="operatorName"
                    name="operatorName"
                    value={newFoodTruck.operatorName}
                    onChange={(e) => handleInputChange(e, setNewFoodTruck)}
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      name="latitude"
                      type="number"
                      value={newFoodTruck.latitude}
                      onChange={(e) => handleInputChange(e, setNewFoodTruck)}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      name="longitude"
                      type="number"
                      value={newFoodTruck.longitude}
                      onChange={(e) => handleInputChange(e, setNewFoodTruck)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="schedule">Schedule</Label>
                  <Input
                    id="schedule"
                    name="schedule"
                    value={newFoodTruck.schedule}
                    onChange={(e) => handleInputChange(e, setNewFoodTruck)}
                    required
                  />
                </div>
                <Button type="submit">Create Food Truck</Button>
              </form>
            </DialogContent>
          </Dialog>
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
                <TableRow key={truck.foodTruckId}>
                  {editingFoodTruckId === truck.foodTruckId ? (
                    <>
                      <TableCell className="py-4 whitespace-nowrap">
                        <Input
                          id="name"
                          name="name"
                          value={editFoodTruck.name}
                          onChange={(e) =>
                            handleInputChange(e, setEditFoodTruck)
                          }
                          required
                        />
                      </TableCell>
                      <TableCell className="py-4 whitespace-nowrap">
                        <Input
                          id="latitude"
                          name="latitude"
                          type="number"
                          value={editFoodTruck.latitude}
                          onChange={(e) =>
                            handleInputChange(e, setEditFoodTruck)
                          }
                          required
                        />
                      </TableCell>
                      <TableCell className="py-4 whitespace-nowrap">
                        <Input
                          id="longitude"
                          name="longitude"
                          type="number"
                          value={editFoodTruck.longitude}
                          onChange={(e) =>
                            handleInputChange(e, setEditFoodTruck)
                          }
                          required
                        />
                      </TableCell>
                      <TableCell className="py-4 whitespace-nowrap">
                        <Input
                          id="schedule"
                          name="schedule"
                          value={editFoodTruck.schedule}
                          onChange={(e) =>
                            handleInputChange(e, setEditFoodTruck)
                          }
                          required
                        />
                      </TableCell>
                      <TableCell className="py-4 whitespace-nowrap">
                        <Input
                          id="operatorName"
                          name="operatorName"
                          value={editFoodTruck.operatorName}
                          onChange={(e) =>
                            handleInputChange(e, setEditFoodTruck)
                          }
                          required
                        />
                      </TableCell>
                      <TableCell className="py-4 whitespace-nowrap text-right">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                size="sm"
                                variant="outline"
                                className="mr-2"
                                onClick={handleSaveEdit}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Save Data</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600"
                                onClick={handleCancelEdit}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Cancel</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </>
                  ) : (
                    <>
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
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                size="sm"
                                variant="outline"
                                className="mr-2"
                                onClick={() => handleEditFoodTruck(truck)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit Data</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600"
                                onClick={() =>
                                  handleDeleteFoodTruck(truck.foodTruckId)
                                }
                                disabled={deleteMutation.isPending}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete Data</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
