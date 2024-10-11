"use client";
// Next & React Imports
import React, { useState } from "react";
import Image from "next/image";

// UI Imports
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Internal Imports
import { useAppDispatch } from "@/lib/store/hooks";
import { useToast } from "@/components/ui/use-toast";
import { updateEnvelope } from "@/lib/store/features/envelopes/envelopes";

// Type Imports
import { Envelope } from "@/lib/types/envelope";

interface ItemProps {
  item: Envelope;
}

function Item({ item }: ItemProps) {
  return (
    <div className="w-full space-y-10">
      <ItemSummary item={item} />
      <ItemStockUpdate item={item} />
    </div>
  );
}

export default Item;

function ItemSummary({ item }: { item: Envelope }) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-10 ">
        <div className="flex space-x-5 justify-start items-center">
          <div className="rounded-md overflow-hidden w-32 h-32 relative">
            <Image
              src="/product.avif"
              alt="Product Image"
              fill
              className="absolute object-cover"
            />
          </div>
          <div>
            <CardDescription>Item</CardDescription>
            <CardTitle className="text-4xl">Item {item.itemCode}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-5">
        <div className="space-y-1">
          <Label htmlFor="category" className="text-xs  text-neutral-400">
            Category
          </Label>
          <Input value={item.category} type="category" id="category" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="size" className="text-xs  text-neutral-400">
            Size
          </Label>
          <Input value={item.size} type="size" id="size" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="shape" className="text-xs  text-neutral-400">
            Shape
          </Label>
          <Input value={item.shape} type="shape" id="shape" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="type" className="text-xs  text-neutral-400">
            Type
          </Label>
          <Input value={item.type} type="type" id="type" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="price" className="text-xs  text-neutral-400">
            Price
          </Label>
          <Input value={item.price} type="price" id="price" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="stock" className="text-xs  text-neutral-400">
            Stock
          </Label>
          <Input value={item.stock} type="stock" id="stock" />
        </div>
      </CardContent>
    </Card>
  );
}

function ItemStockUpdate({ item }: { item: Envelope }) {
  const [stock, setStock] = useState<number>(0);
  const [stockAlertOpen, setStockAlertOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { toast } = useToast();

  function handleAddStock() {
    if (stock === 0 || stock === undefined) return;
    dispatch(updateEnvelope({ ...item, stock: item?.stock! + stock }));
    toast({
      title: "Stock Updated",
      description: `Stock updated for Item ${item?.itemCode} `,
    });
    setStockAlertOpen(false);
  }
  return (
    <Card className="w-full">
      <CardHeader className="">
        <div className="flex space-x-5 justify-start items-center">
          <div>
            <CardTitle className="text-4xl">Add Stock</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 mb-3">
          <Label htmlFor="stock" className="text-xs  text-neutral-400">
            Stock
          </Label>
          <Input
            value={stock}
            onChange={(e) => setStock(Number.parseInt(e.target.value))}
            type="number"
            placeholder="1000"
            name="stock"
            id="stock"
          />
        </div>
        <Button
          onClick={() => {
            if (stock === 0 || stock === undefined) return;
            setStockAlertOpen(true);
          }}
        >
          Add
        </Button>
        <AlertDialog open={stockAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{`Confirm adding ${stock}?`}</AlertDialogTitle>
              <AlertDialogDescription>
                {`The current stock is ${
                  item.stock
                } and by adding ${stock} it will make the final stock to ${
                  item.stock + stock
                }.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setStockAlertOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleAddStock}>
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
