"use client";
import { columns } from "./columns";

import React from "react";
import { DataTable } from "./data-table";
import { useAppSelector } from "@/lib/store/hooks";

function Table() {
  const envelopes = useAppSelector((state) => state.envelopes);
  return <DataTable columns={columns} data={envelopes} />;
}

export default Table;
