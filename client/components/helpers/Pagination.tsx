import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { Button } from "../ui/button";

export const Pagination = () => {
  return (
    <div className="mt-5 bg-neutral-100 dark:bg-neutral-900 rounded-lg py-5 px-5 w-full flex items-center justify-end gap-x-2">
      <Button variant="outline" size="icon">
        <ChevronLeft className="size-6 text-text dark:text-darkText" />
      </Button>
      {/* Current Page */}
      <Button
        variant="outline"
        size="icon"
        className="!bg-primaryCol text-darkText !hover:bg-primaryCol/90 hover:text-darkText"
      >
        1
      </Button>

      <Button variant="outline" size="icon">
        2
      </Button>
      <Button variant="outline" size="icon">
        <Ellipsis className="size-6 text-text dark:text-darkText" />
      </Button>
      <Button variant="outline" size="icon">
        10
      </Button>

      <Button variant="outline" size="icon">
        <ChevronRight className="size-6 text-text dark:text-darkText" />
      </Button>
    </div>
  );
};
