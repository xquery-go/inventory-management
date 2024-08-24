import React from "react";
import { Skeleton } from "../ui/skeleton";

export const ProductDetailSkeleton = () => {
  return (
    <>
      {/* For Images */}
      <div>
        <Skeleton className="max-w-[500px] w-full sm:h-[450px] h-[350px]" />
        <div className="flex items-center gap-x-4 mt-5">
          <Skeleton className="w-[100px] h-[100px]" />
          <Skeleton className="w-[100px] h-[100px]" />
          <Skeleton className="w-[100px] h-[100px]" />
        </div>
      </div>
      {/* For Content */}
      <div className="flex justify-between flex-col">
        <div>
          <Skeleton className="max-w-[400px] w-full h-6 mt-5" />
          <Skeleton className="max-w-[300px] w-full h-6 mt-2" />

          <Skeleton className="max-w-[500px] w-full h-6 mt-5" />

          <Skeleton className="max-w-[300px] w-full h-8 mt-10" />

          <Skeleton className="max-w-[200px] w-full h-8 mt-10" />

          <Skeleton className="max-w-[350px] w-full h-8 mt-10" />  

          <Skeleton className="w-[200px] h-8 mt-10" />

        </div>
        <div>
          <Skeleton className="w-full sm:h-14 h-10 mb-10 mt-5" />
        </div>
      </div>
    </>
  );
};
