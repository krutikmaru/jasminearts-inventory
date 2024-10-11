"use client";

// React & Next Imports
import React from "react";

// Internal Imports
import { useAppSelector } from "@/lib/store/hooks";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import TableFilters from "./table-filters";

function Table() {
  const customers = useAppSelector((state) => state.customers);
  return (
    <DataTable columns={columns} data={customers} Filters={TableFilters} />
  );
}

export default Table;
