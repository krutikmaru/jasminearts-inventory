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
import { Contact, Customer } from "@/lib/types/customers";
import customers from "@/lib/store/features/customers/state";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

// export interface Envelope {
//   category: string;
//   itemCode: string;
//   size: Sizes;
//   price: number;
//   stock: number;
//   reserved: number;
// }

export const columns: ColumnDef<Customer>[] = [
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
    accessorKey: "customer_id",
    header: "Customer",
    cell: ({ row }) => {
      const customer_id = row.getValue("customer_id") as string;
      const customer = customers.find((c) => c.customer_id === customer_id);

      return (
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={customer?.image_url} />
            <AvatarFallback>
              {
                ((customer?.first_name[0].toUpperCase() as string) +
                  customer?.last_name[0].toUpperCase()) as string
              }
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-medium text-nowrap">
              {customer?.first_name + " " + customer?.last_name}
            </h1>
            <span className="text-xs text-neutral-500">
              {customer?.customer_id}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "order_history",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center text-nowrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Orders
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const orderHistory = row.getValue("order_history") as string[];
      return (
        <Badge variant={"secondary"} className="px-4 bg-neutral-300">
          {orderHistory.length}
        </Badge>
      );
    },
  },
  {
    accessorKey: "contact",
    header: "Phone",
    cell: ({ row }) => {
      const contact = row.getValue("contact") as Contact;
      return (
        <div className="flex items-center space-x-2 text-nowrap">
          <Link
            href={`tel:${contact.phone_primary}`}
            className="hover:underline  "
          >
            {contact.phone_primary}
          </Link>

          {contact.phone_secondary && (
            <ContactBadge type="tel" value={contact.phone_secondary} />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const contact = row.getValue("contact") as Contact;
      return (
        <div className="flex items-center space-x-2">
          {contact.email_primary && contact.email_secondary ? (
            <>
              <Link
                href={`tel:${contact.email_primary}`}
                className="hover:underline mb-1"
              >
                {contact.email_primary}
              </Link>
              <ContactBadge type="mailto" value={contact.email_secondary} />
            </>
          ) : contact.email_primary ? (
            <Link
              href={`tel:${contact.email_primary}`}
              className="hover:underline"
            >
              {contact.email_primary}
            </Link>
          ) : (
            <Link
              href={`tel:${contact.email_secondary}`}
              className="hover:underline"
            >
              {contact.email_secondary}
            </Link>
          )}

          {!contact.email_primary && !contact.email_secondary && (
            <span className="text-neutral-400">NA</span>
          )}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
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
                  navigator.clipboard.writeText(row.original.customer_id);
                }}
              >
                Copy customer id
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

function ContactBadge({
  type,
  value,
}: {
  type: "tel" | "mailto";
  value: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant={"secondary"}
            className="bg-blue-500 hover:bg-blue-400 text-white cursor-default font-normal"
          >
            +1
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <Link href={`${type}:${value}`} className="hover:underline ">
            {value}
          </Link>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
