import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { createMenuItem, fetchFoodTrucks, fetchMenuItems } from "@/lib/api";
import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Edit, Trash, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

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
  const [newMenuItem, setNewMenuItem] = useState({
    foodTruckId: foodTruck.foodTruckId,
    name: "",
    price: "",
  });

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
      setNewMenuItem({ ...newMenuItem, name: "", price: "" });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  const columns = [
    {
      header: "Food Name",
      accessorKey: "name",
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Operation",
      cell: () => (
        <div className="flex justify-end space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button size="sm" variant="outline">
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
                <Button size="sm" variant="outline" className="text-red-600">
                  <Trash className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: foodTruck.menuItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

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
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price (RM)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={newMenuItem.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <DialogDescription className="text-sm text-gray-500">
                  This item will be added to <strong>{foodTruck.name}'s</strong>{" "}
                  menu.
                </DialogDescription>
                <Button type="submit">Add Item</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="p-4 overflow-x-auto">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.columnDef.header === "Operation"
                        ? "text-right"
                        : ""
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
