import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { LoadingSpinner } from "@/components/ui/loading";
import {
  createMenuItem,
  deleteMenuItem,
  fetchFoodTrucks,
  fetchMenuItems,
  updateMenuItem,
} from "@/lib/api";
import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Plus, X, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { MenuItem } from "@types";

export const Route = createLazyFileRoute("/menuitems")({
  component: MenuItems,
});

function MenuItems() {
  const queryClient = useQueryClient();

  const {
    data: foodTrucks = [],
    isLoading: isLoadingFoodTrucks,
    error: errorFoodTrucks,
  } = useQuery({
    queryKey: ["foodTrucks"],
    queryFn: fetchFoodTrucks,
  });

  const {
    data: menuItems = [],
    isLoading: isLoadingMenuItems,
    error: errorMenuItems,
  } = useQuery({
    queryKey: ["menuItems"],
    queryFn: fetchMenuItems,
  });

  if (isLoadingFoodTrucks || isLoadingMenuItems)
    return <LoadingSpinner className="spinner-class" size={48} />;
  if (errorFoodTrucks || errorMenuItems) return <div>Error loading data</div>;

  const foodTruckMap = foodTrucks.reduce(
    (acc: Record<number, any>, foodTruck: any) => {
      acc[foodTruck.foodTruckId] = { ...foodTruck, menuItems: [] };
      return acc;
    },
    {}
  );

  menuItems.forEach((menuItem: any) => {
    if (foodTruckMap[menuItem.foodTruckId]) {
      foodTruckMap[menuItem.foodTruckId].menuItems.push(menuItem);
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.values(foodTruckMap).map((foodTruck: any) => (
        <FoodTruckCard
          key={foodTruck.foodTruckId}
          foodTruck={foodTruck}
          queryClient={queryClient}
        />
      ))}
    </div>
  );
}

function FoodTruckCard({
  foodTruck,
  queryClient,
}: {
  foodTruck: any;
  queryClient: any;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const initialMenuItemState = {
    foodTruckId: foodTruck.foodTruckId,
    name: "",
    price: "",
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<typeof initialMenuItemState>>
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  // Create
  const [newMenuItem, setNewMenuItem] = useState(initialMenuItemState);

  const createMutation = useMutation({
    mutationFn: createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
    },
  });

  const handleCreateMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync(newMenuItem);
      toast({
        variant: "success",
        title: "Success",
        description: "Menu item created successfully.",
        duration: 3000,
      });
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to create menu item.",
        duration: 3000,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  // Delete
  const deleteMutation = useMutation({
    mutationFn: deleteMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
    },
  });

  const handleDeleteMenuItem = async (menuItemId: number) => {
    try {
      await deleteMutation.mutateAsync(menuItemId);
      toast({
        variant: "success",
        title: "Success",
        description: "Menu item deleted successfully.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to delete menu item.",
        duration: 3000,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  // Update
  const [editingMenuItemId, setEditingMenuItemId] = useState<number | null>(
    null
  );
  const [editMenuItem, setEditMenuItem] = useState(initialMenuItemState);

  const updateMutation = useMutation({
    mutationFn: updateMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
    },
  });

  const handleEditMenuItem = useCallback((menuItem: MenuItem) => {
    setEditingMenuItemId(menuItem.menuItemId!);
    setEditMenuItem({ ...menuItem });
  }, []);

  const handleCancelEdit = () => {
    setEditingMenuItemId(null);
    setEditMenuItem(initialMenuItemState);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync(editMenuItem);
      toast({
        variant: "success",
        title: "Success",
        description: "Menu item updated successfully.",
        duration: 3000,
      });
      setEditingMenuItemId(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to update menu item.",
        duration: 3000,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
        <div>
          <CardTitle>{foodTruck.name}</CardTitle>
          <CardDescription>Operator: {foodTruck.operatorName}</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="ml-auto gap-1">
              Add Menu Item
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateMenuItem} className="space-y-4">
              <div>
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newMenuItem.name}
                  onChange={(e) => handleInputChange(e, setNewMenuItem)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price (RM)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={newMenuItem.price}
                  onChange={(e) => handleInputChange(e, setNewMenuItem)}
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <Button type="submit">Add Item</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="p-4 overflow-x-auto">
        {foodTruck.menuItems.length > 0 ? (
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader>
              <TableRow>
                <TableHead>Food Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Operation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foodTruck.menuItems.map((menuItem: any) => (
                <TableRow key={menuItem.menuItemId}>
                  <TableCell>
                    {editingMenuItemId === menuItem.menuItemId ? (
                      <Input
                        id="name"
                        name="name"
                        value={editMenuItem.name}
                        onChange={(e) => handleInputChange(e, setEditMenuItem)}
                        required
                      />
                    ) : (
                      menuItem.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingMenuItemId === menuItem.menuItemId ? (
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={editMenuItem.price}
                        onChange={(e) => handleInputChange(e, setEditMenuItem)}
                        required
                      />
                    ) : (
                      menuItem.price
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingMenuItemId === menuItem.menuItemId ? (
                      <div className="flex justify-end space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleSaveEdit}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Save Data</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
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
                      </div>
                    ) : (
                      <div className="flex justify-end space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditMenuItem(menuItem)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit Data</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600"
                                onClick={() =>
                                  handleDeleteMenuItem(menuItem.menuItemId!)
                                }
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete Data</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>No menu items available.</div>
        )}
      </CardContent>
    </Card>
  );
}

export default MenuItems;
