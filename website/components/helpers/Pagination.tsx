"use client";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IPagination } from "@/types/types";

export const Pagination = ({ data }: { data: IPagination }) => {
  const { hasNextPage, hasPrevPage, currentPage, totalPages } = data;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = (pageNumber: number) => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set("page", pageNumber.toString());

    const queryString = queryParams.toString();
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  return (
    <div className="mt-5 bg-neutral-100 rounded-lg py-5 sm:px-5 px-2 w-full flex items-center justify-end gap-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrevPage}
      >
        <ChevronLeft className="size-6 text-black " />
      </Button>

      {totalPages <= 3 ? (
        // If there are 3 or fewer pages, show all of them
        Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(page)}
            className={
              currentPage === page
                ? "!bg-primaryCol text-white !hover:bg-primaryCol/90 hover:text-white"
                : ""
            }
          >
            {page}
          </Button>
        ))
      ) : (
        // For more than 3 pages
        <>
          {/* First page */}
          {currentPage > 2 && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(1)}
            >
              1
            </Button>
          )}

          {/* Ellipsis after first page */}
          {currentPage > 3 && (
            <Button variant="outline" size="icon">
              <Ellipsis className="size-6 text-black" />
            </Button>
          )}

          {/* Page before current */}
          {currentPage > 1 && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              {currentPage - 1}
            </Button>
          )}

          {/* Current page */}
          <Button
            variant="outline"
            size="icon"
            className="!bg-primaryCol text-white !hover:bg-primaryCol/90 hover:text-white"
          >
            {currentPage}
          </Button>

          {/* Page after current */}
          {currentPage < totalPages && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              {currentPage + 1}
            </Button>
          )}

          {/* Ellipsis before last page */}
          {currentPage < totalPages - 2 && (
            <Button variant="outline" size="icon">
              <Ellipsis className="size-6 text-black" />
            </Button>
          )}

          {/* Last page */}
          {currentPage < totalPages - 1 && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </Button>
          )}
        </>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
      >
        <ChevronRight className="size-6 text-black " />
      </Button>
    </div>
  );
};
