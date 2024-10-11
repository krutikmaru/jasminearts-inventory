"use client";
// React & Next Imports
import React, { useState } from "react";

// Third party imports
import { Loader2 } from "lucide-react";

// Internal Imports
import { useAppSelector } from "@/lib/store/hooks";
import { useToast } from "@/components/ui/use-toast";
import SearchBar from "./search-bar";
import Item from "./item";

// Type Imports
import { Envelope } from "@/lib/types/envelope";

function Page() {
  const [itemCode, setItemCode] = useState<string>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [item, setItem] = useState<Envelope>();

  const envelopes = useAppSelector((state) => state.envelopes);
  const { toast } = useToast();

  function fakeDbFetch(itemCode: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = envelopes.find(
          (envelope) => envelope.itemCode === itemCode
        );
        if (!item) {
          resolve({
            status: "error",
            message: `Item with code ${itemCode} Not Found`,
          });
        }
        resolve({ status: "success", data: item });
      }, 2000);
    });
  }
  async function searchItem() {
    if (itemCode === "" || itemCode === undefined) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Item code is not specified",
      });
      return;
    }
    // Avoid unnecessary database request if code hasn't been changed and search is clicked
    if (itemCode === item?.itemCode) {
      return;
    }
    setIsSearching(true);

    const response = (await fakeDbFetch(itemCode)) as {
      status: string;
      data?: Envelope;
      message?: string;
    };
    if (response.status === "error") {
      toast({
        variant: "destructive",
        title: "Warning",
        description: response.message,
      });
    } else {
      setItem(response.data);
    }
    setIsSearching(false);
  }

  return (
    <div className="px-24 py-12">
      <h2 className="text-3xl font-semibold tracking-tight">
        Manage Inventory
      </h2>
      <div>
        <SearchBar {...{ itemCode, setItemCode, handleSearch: searchItem }} />
      </div>
      <div className="mt-5 flex flex-col justify-center items-center">
        {isSearching ? (
          <Loader2 className="h-7 w-7 mt-5 animate-spin" />
        ) : item ? (
          <Item item={item} />
        ) : null}
      </div>
    </div>
  );
}

export default Page;
