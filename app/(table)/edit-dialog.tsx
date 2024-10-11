"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Envelope } from "./columns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { updateEnvelope } from "@/lib/store/features/envelopes/envelopes";

export function EditDialog({ item }: { item: Envelope }) {
  const [test, setTest] = useState<string>(item.category);
  const dispatch = useAppDispatch();
  return (
    <DialogContent className="sm:max-w-[90%] sm:h-[80%] flex flex-col">
      <DialogHeader>
        <DialogTitle className="text-2xl">
          Edit Item {item.itemCode}
        </DialogTitle>
        <DialogDescription>
          Make changes to the item here. Click save when you are done.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col space-y-4">
        <div className="space-y-1">
          <Label htmlFor="itemCode" className="text-right">
            Item Code
          </Label>
          <Input disabled id="itemCode" value={item.itemCode} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <Select value={test} onValueChange={setTest}>
            <SelectTrigger className="w-full">
              <SelectValue
                className="placeholder:text-neutral-200"
                placeholder="Select a Category"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="*">All</SelectItem>
                <SelectItem value="WEJB-70">WEJB-70</SelectItem>
                <SelectItem value="WEJB-80">WEJB-80</SelectItem>
                <SelectItem value="CLLE-R">CLLE-R</SelectItem>
                <SelectItem value="CLLE-S">CLLE-S</SelectItem>
                <SelectItem value="CLLE-SF">CLLE-SF</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button
          onClick={() => {
            dispatch(
              updateEnvelope({
                type: "update",
                payload: { ...item, category: test },
              })
            );
            // console.log("Hello");
          }}
        >
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
