import React from "react";
import Table from "./(items-table)/items-table";
import PageHeader from "./page-header";

function Page() {
  return (
    <div className="px-12 py-12">
      <PageHeader />
      <Table />
    </div>
  );
}

export default Page;
