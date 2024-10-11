"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { TableType } from "./data-table";
import { useAppSelector } from "@/lib/store/hooks";

interface FilterTableProps<TData> {
  table: TableType<TData>;
}

function TableFilters<TData>({ table }: FilterTableProps<TData>) {
  const envelopeCategories = useAppSelector(
    (state) => state.envelopeCategories
  );
  return (
    <div className="flex items-center py-4 w-full">
      <div>
        <Label className="text-xs text-neutral-400" htmlFor="itemCode">
          Item Code
        </Label>
        <Input
          placeholder="Item code"
          name="itemCode"
          value={
            (table.getColumn("itemCode")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("itemCode")?.setFilterValue(event.target.value)
          }
          className="w-24"
        />
      </div>
      {table
        .getAllColumns()
        .filter((column) => column.getCanHide())
        .find((column) => column.id === "category")
        ?.getIsVisible() && (
        <div className="ml-2">
          <Label className="text-xs text-neutral-400" htmlFor="category">
            Category
          </Label>
          <Select
            value={
              (table.getColumn("category")?.getFilterValue() as string) ?? ""
            }
            onValueChange={
              (value) =>
                table
                  .getColumn("category")
                  ?.setFilterValue(value === "*" ? "" : value)
              // Condition check because value in SelectItem can't be ""
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                className="placeholder:text-neutral-200"
                placeholder="Select a Category"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="*">All</SelectItem>
                {envelopeCategories.map((envelopeCategory) => (
                  <SelectItem
                    key={envelopeCategory.category}
                    value={envelopeCategory.category}
                  >
                    {envelopeCategory.category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => {
                    column.toggleVisibility(!!value);
                    console.log(column);
                    // If caetgory was selected and then category column was hidden, previous results presist
                    column.setFilterValue("");
                  }}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TableFilters;
