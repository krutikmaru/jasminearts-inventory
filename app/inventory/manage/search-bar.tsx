import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import React from "react";

interface SearchBarProps {
  itemCode: string | undefined;
  setItemCode: (itemCode: string) => void;
  handleSearch: () => void;
}
function SearchBar({ itemCode, setItemCode, handleSearch }: SearchBarProps) {
  return (
    <div className="mt-3 space-y-1">
      <Label htmlFor="itemCode" className="text-xs  text-neutral-400">
        Item Code
      </Label>
      <div className="flex items-center space-x-5">
        <Input
          value={itemCode}
          onChange={(e) => setItemCode(e.target.value)}
          id="itemCode"
          placeholder="21"
        />
        <Button onClick={handleSearch} type="submit">
          <Search className="mr-2 w-4 h-4" />
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
