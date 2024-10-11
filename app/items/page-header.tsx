"use client";
// Next & React Imports
import React, { useState } from "react";

// UI Imports
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Envelope } from "@/lib/types/envelope";
import { addEnvelope } from "@/lib/store/features/envelopes/envelopes";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { EnvelopeShape, EnvelopeType, Sizes } from "@/lib/enums";

function PageHeader() {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [isAbort, setIsAbort] = useState<boolean>(false);
  const [itemCode, setItemCode] = useState<string>("");
  const [parent, setParent] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [pieces, setPieces] = useState<number>(1000);
  const [unitPrice, setUnitPrice] = useState<number>(0.5);
  const [stock, setStock] = useState<number>(0);
  const [reserved, setReserved] = useState<number>(0);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const parents = useAppSelector((state) =>
    state.envelopeCategories.filter((category) => category.instantiable)
  );
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  function resetStates() {
    setIsAbort(false);
    setItemCode("");
    setParent("");
    setSize("");
    setPieces(1000);
    setUnitPrice(0.5);
    setStock(0);
    setReserved(0);
  }
  function fakeDbUpdate(newItem: Envelope) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch(addEnvelope(newItem));
        resolve("OK");
      }, 2000);
    });
  }
  async function handleCreateItem() {
    console.log("creating");
    if (itemCode === "" || parent === "" || size === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "All fields are required",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    const newItem: Envelope = {
      itemCode,
      stock,
      reserved,
      category: parent,
      size: Sizes[size as keyof typeof Sizes],
      shape: EnvelopeShape["American"],
      type: EnvelopeType["White"],
      unitPrice: unitPrice,
      basePieces: pieces,
      price: unitPrice * pieces,
    };
    try {
      setIsCreating(true);
      const result = await fakeDbUpdate(newItem);
      if (result === "OK") {
        console.log("Result: ", result);
        toast({
          title: "Item Created ✅",
          description: `New Item ${itemCode} created successfully.`,
        });
        setIsSheetOpen(false);
        resetStates();
      } else {
        console.log("Result: ", result);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Some error occurred while creating item",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Some error occurred while creating item",
      });
    } finally {
      setIsCreating(false);
    }
  }
  return (
    <div className="flex items-center justify-between">
      <h2 className=" text-3xl font-semibold tracking-tight">Items</h2>
      <Sheet
        open={isSheetOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsAbort(true);
          }
        }}
      >
        <SheetTrigger>
          <Button onClick={() => setIsSheetOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Item
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-scroll ">
          <AbortAlert
            {...{ isAbort, setIsAbort, setIsSheetOpen, resetStates }}
          />
          <SheetHeader>
            <SheetTitle>Create New Item</SheetTitle>
            <SheetDescription>
              Fill in all the required fields in order to create a new item.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-5 space-y-1">
            <Label htmlFor="itemCode" className="text-xs  text-neutral-400">
              Item Code
            </Label>
            <Input
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
              type="number"
              id="itemCode"
              name="itemCode"
              placeholder="123"
            />
          </div>
          <div className="my-3">
            <Label
              htmlFor="parent-category"
              className="text-xs  text-neutral-400"
            >
              Parent Category
            </Label>
            <Select
              value={parent}
              onValueChange={setParent}
              name="parent-category"
            >
              <SelectTrigger>
                <SelectValue placeholder="Parent Category" />
              </SelectTrigger>
              <SelectContent>
                {parents.map((parent) => (
                  <SelectItem key={parent.category} value={parent.category}>
                    {parent.category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="my-3">
            <Label htmlFor="size" className="text-xs  text-neutral-400">
              Size
            </Label>
            <Select value={size} onValueChange={setSize} name="size">
              <SelectTrigger>
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(Sizes).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="my-3">
            <Label htmlFor="shape" className="text-xs  text-neutral-400">
              Shape
            </Label>
            <Select value={"American"} name="shape">
              <SelectTrigger>
                <SelectValue placeholder="Shape" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={"American"} value={"American"}>
                  American
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="my-3">
            <Label htmlFor="type" className="text-xs  text-neutral-400">
              Type
            </Label>
            <Select value={"White"} name="shape">
              <SelectTrigger>
                <SelectValue placeholder="shape" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"White"}>White</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="my-3 space-y-1">
            <Label htmlFor="pieces" className="text-xs  text-neutral-400">
              Pieces
            </Label>
            <Input
              value={pieces}
              onChange={(e) => setPieces(Number.parseFloat(e.target.value))}
              type="number"
              id="pieces"
              name="pieces"
              placeholder="1000"
            />
          </div>
          <div className="my-3 space-y-1">
            <Label htmlFor="unitPrice" className="text-xs  text-neutral-400">
              Unit Price
            </Label>
            <Input
              value={unitPrice}
              onChange={(e) => setUnitPrice(Number.parseFloat(e.target.value))}
              type="number"
              id="unitPrice"
              name="unitPrice"
              placeholder="0.5"
            />
          </div>
          <div className="my-3 space-y-1">
            <Label htmlFor="price" className="text-xs  text-neutral-400">
              Price
            </Label>
            <Input
              value={unitPrice * pieces}
              disabled
              type="number"
              id="price"
              name="price"
              placeholder="0.5"
            />
          </div>
          <div className="my-3 space-y-1">
            <Label htmlFor="stock" className="text-xs  text-neutral-400">
              Stock
            </Label>
            <Input
              value={stock}
              onChange={(e) => setStock(Number.parseFloat(e.target.value))}
              type="number"
              id="stock"
              name="stock"
              placeholder="1000"
            />
          </div>
          <div className="my-3 space-y-1">
            <Label htmlFor="reserved" className="text-xs  text-neutral-400">
              Reserved
            </Label>
            <Input
              value={reserved}
              onChange={(e) => setReserved(Number.parseFloat(e.target.value))}
              type="number"
              id="reserved"
              name="reserved"
              placeholder="1000"
            />
          </div>
          <Button
            disabled={isCreating}
            onClick={handleCreateItem}
            className="mt-5 w-full"
          >
            {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Item
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default PageHeader;

interface AbortAlertProps {
  isAbort: boolean;
  setIsAbort: (value: boolean) => void;
  setIsSheetOpen: (value: boolean) => void;
  resetStates: () => void;
}
function AbortAlert({
  isAbort,
  setIsAbort,
  setIsSheetOpen,
  resetStates,
}: AbortAlertProps) {
  return (
    <AlertDialog open={isAbort}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard Changes?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. If you discard then your current
            entries will be discarded.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsAbort(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setIsSheetOpen(false);
              resetStates();
            }}
            className="bg-red-500 hover:bg-red-600"
          >
            Discard
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
