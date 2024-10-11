"use client";

// Third party imports
import { ColumnDef } from "@tanstack/react-table";

import {
  Logs,
  MoreHorizontal,
  Pencil,
  SquareChevronRight,
  Trash2,
} from "lucide-react";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { EnvelopeShape, EnvelopeType, Sizes } from "@/lib/enums";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import categories from "@/lib/store/features/envelope-categories/state";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { EditDialog } from "../(table)/edit-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface Envelope {
  category: string;
  itemCode: string;
  size: Sizes;
  price: number;
  stock: number;
  reserved: number;
}

export const columns: ColumnDef<Envelope>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      // In production we will get this in the object becuase of its relation to categories
      const category = row.getValue("category") as string;
      const categoryFullName = categories.find(
        (c) => c.category === category
      )?.name;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{category}</TooltipTrigger>
            <TooltipContent>
              <p>{categoryFullName}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        // <Badge variant={"secondary"} className="bg-green-200">

        // </Badge>
      );
    },
  },
  {
    accessorKey: "itemCode",

    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Item Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "size",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return (
        <Badge
          variant={"secondary"}
          className="bg-green-200 hover:bg-green-300 dark:bg-green-600 dark:hover:bg-green-700"
        >
          {price}
        </Badge>
      );
    },
  },
  {
    accessorKey: "reserved",
    header: "Reserved",
    cell: ({ row }) => {
      const reserved = parseFloat(row.getValue("reserved"));
      return (
        <Badge
          variant={"secondary"}
          className="bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700"
        >
          {reserved}
        </Badge>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  console.log(row.original);
                  navigator.clipboard.writeText(row.original.itemCode);
                }}
              >
                Copy Item Code
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => console.log(row.original)}>
                <SquareChevronRight className="mr-2 h-4 w-4" />
                <span>Log row</span>
              </DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => console.log(row.original)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
              </DialogTrigger>

              <DropdownMenuItem className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <EditDialog item={row.original} /> */}
        </Dialog>
      );
    },
  },
];
