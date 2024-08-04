"use client";
import { Search } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import useOutsideClick from "@/hooks/useOutsideClick";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setShowSearch(false);
    setSearch("");
  });

  return (
    <>
      <div className="relative bg-neutral-100 dark:bg-neutral-800 dark:text-darkText text-text px-3 py-2 rounded-md flex items-center gap-x-1 max-sm:hidden">
        <input
          type="text"
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          className="outline-none text-sm bg-transparent"
          placeholder="Search..."
        />
        <button>
          <Search className="size-4" />
        </button>
      </div>

      <div className="sm:hidden relative" ref={ref}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSearch((prev) => !prev)}
        >
          <Search className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        {showSearch && (
          <input
            type="text"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            className="absolute outline-none text-sm bg-neutral-100 dark:bg-neutral-800 dark:text-darkText text-text px-3 py-2 rounded-md top-16 left-0 shadow-md sm:max-w-[400px]"
            placeholder="Search..."
          />
        )}
      </div>
    </>
  );
};
