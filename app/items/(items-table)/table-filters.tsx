"use client";
// Next & React Imports
import React from "react";

// UI Imports
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Internal Imports
import { useAppSelector } from "@/lib/store/hooks";

// Type Imports
import { TableFilterProps } from "@/components/ui/data-table";

function TableFilters<TData>({ table }: TableFilterProps<TData>) {
  const envelopeCategories = useAppSelector(
    (state) => state.envelopeCategories
  );
  return (
    <div className="flex items-end space-x-2 py-4 w-full">
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
        <div>
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
          <Button variant="outline">Columns</Button>
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
