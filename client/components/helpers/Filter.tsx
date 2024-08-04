import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { FilterIcon } from "lucide-react";

export const Filter = ({ isOrders }: { isOrders?: boolean }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-x-1">
          <FilterIcon className="size-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isOrders ? (
          <>
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Pending</DropdownMenuItem>
            <DropdownMenuItem>Completed</DropdownMenuItem>
            <DropdownMenuItem>Cancelled</DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel>Price</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Low To High</DropdownMenuItem>
            <DropdownMenuItem>High To Low</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Rating</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Low To High</DropdownMenuItem>
            <DropdownMenuItem>High To Low</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
