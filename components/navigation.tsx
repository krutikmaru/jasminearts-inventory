"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { CircleAlert, Loader2, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { toast, useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Category } from "@/lib/store/features/envelope-categories/state";
import { addCategory } from "@/lib/store/features/envelope-categories/envelopeCategoriesSlice";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "./theme-switcher";

function Navigation() {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [isAbort, setIsAbort] = useState<boolean>(false);

  function resetStates() {
    setIsAbort(false);
    setIsSheetOpen(false);
  }

  return (
    <div className="w-full py-4 px-12 border-b-2 border-neutral-100 dark:border-neutral-900 flex items-center justify-between">
      <Link href="/">
        <Image alt="Ziverium" src="/ziverium.png" height={20} width={20} />
      </Link>

      <div>
        <Link href="/items">Items</Link>
      </div>

      <div className="space-x-2 flex items-center">
        <Sheet
          open={isSheetOpen}
          onOpenChange={(open) => {
            if (!open) {
              setIsAbort(true);
            }
          }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="p-2 rounded-md bg-neutral-100 dark:bg-neutral-800">
                <Plus className="w-4 h-4" color="#000" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Add</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsSheetOpen(true)}>
                Category
              </DropdownMenuItem>
              <DropdownMenuItem>Order</DropdownMenuItem>
              <DropdownMenuItem>Inventory</DropdownMenuItem>
              <DropdownMenuItem>Reserve</DropdownMenuItem>
              <DropdownMenuItem>
                <ThemeSwitcher className="w-full" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CategorySheet {...{ isAbort, setIsAbort, setIsSheetOpen }} />
        </Sheet>
        <Avatar>
          <AvatarImage src="/meera.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Navigation;

interface CategorySheetProps {
  isAbort: boolean;
  setIsAbort: (value: boolean) => void;
  setIsSheetOpen: (value: boolean) => void;
}
function CategorySheet({
  isAbort,
  setIsAbort,
  setIsSheetOpen,
}: CategorySheetProps) {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryFullName, setCategoryFullName] = useState<string>("");
  const [instantiable, setInstantiable] = useState<boolean>(false);
  const [parent, setParent] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const parents = useAppSelector((state) =>
    state.envelopeCategories.filter((category) => !category.instantiable)
  );

  const dispatch = useAppDispatch();

  const { toast } = useToast();

  function resetCategoryStates() {
    setCategoryName("");
    setCategoryFullName("");
    setInstantiable(false);
    setIsAbort(false);
  }
  function fakeDbUpdate(newCategory: Category) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch(addCategory(newCategory));
        resolve("OK");
      }, 2000);
    });
  }
  async function handleCreateCategory() {
    if (categoryName === "" || categoryFullName === "" || parent === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "All fields are required",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    const newCategory: Category = {
      id: "C9",
      category: categoryName,
      name: categoryFullName,
      instantiable: instantiable,
      parent: parent === "NULL" ? null : parent,
      description: description === "" ? undefined : description,
    };
    try {
      setIsCreating(true);
      const result = await fakeDbUpdate(newCategory);
      if (result === "OK") {
        console.log("Result: ", result);
        toast({
          title: "Category Created ✅",
          description: `New category ${categoryName} created successfully.`,
        });
        setIsSheetOpen(false);
        resetCategoryStates();
      } else {
        console.log("Result: ", result);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Some error occurred while creating category",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Some error occurred while creating category",
      });
    } finally {
      setIsCreating(false);
    }
  }
  return (
    <SheetContent className="overflow-y-scroll ">
      <SheetHeader>
        <SheetTitle>Create Category</SheetTitle>
        <SheetDescription>
          If products directly fall under this category then set select
          instantiable else deselect it in case it is a category referring to
          another category.
        </SheetDescription>
      </SheetHeader>
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
                resetCategoryStates();
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="mt-5 space-y-1">
        <Label htmlFor="category" className="text-xs  text-neutral-400">
          Category Name
        </Label>
        <Input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value.toUpperCase())}
          type="category"
          id="category"
          placeholder="WEJB"
        />
      </div>
      <div className="mt-3 space-y-1">
        <Label htmlFor="category" className="text-xs  text-neutral-400">
          Category Full Name
        </Label>
        <Input
          value={categoryFullName}
          onChange={(e) => setCategoryFullName(e.target.value)}
          type="category"
          id="category"
          placeholder="White Envelope Jet Bond"
        />
      </div>
      <div className="mt-3 space-y-1">
        <Label htmlFor="category" className="text-xs  text-neutral-400">
          Category Full Name
        </Label>
        <Input
          value={categoryFullName}
          onChange={(e) => setCategoryFullName(e.target.value)}
          type="category"
          id="category"
          placeholder="White Envelope Jet Bond"
        />
      </div>
      <Alert className="my-3 bg-yellow-100 border-2 border-yellow-300">
        <CircleAlert className="h-4 w-4 " />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription className="text-xs">
          <b>Disabling</b> instantiable will not allow you to create product for
          this <b>specific</b> category.
        </AlertDescription>
      </Alert>
      <div className="my-3 flex items-center space-x-2">
        <Switch
          checked={instantiable}
          onCheckedChange={setInstantiable}
          id="instantiable"
        />
        <Label htmlFor="instantiable">Instantiable</Label>
      </div>
      <div>
        <Label htmlFor="parent-category" className="text-xs  text-neutral-400">
          Parent Category
        </Label>
        <Select value={parent} onValueChange={setParent} name="parent-category">
          <SelectTrigger>
            <SelectValue placeholder="Parent Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="None">None</SelectItem>
            {parents.map((parent) => (
              <SelectItem key={parent.category} value={parent.category}>
                {parent.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="my-3">
        <Label htmlFor="description" className="text-xs  text-neutral-400">
          Description (optional)
        </Label>
        <Textarea name="description" />
      </div>

      <Button
        disabled={isCreating}
        onClick={handleCreateCategory}
        className="mt-5 w-full"
      >
        {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Category
      </Button>
    </SheetContent>
  );
}
