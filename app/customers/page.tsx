import React from "react";
import Table from "./(customers-table)/items-table";

function Page() {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-12">
      <h2 className="text-3xl font-semibold tracking-tight">Customers</h2>
      <Table />
    </div>
  );
}

export default Page;
