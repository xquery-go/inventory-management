import { Skeleton } from "../ui/skeleton";

export const ProductCartSkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="bg-supportBg h-[200px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="bg-supportBg h-4 w-[250px]" />
            <Skeleton className="bg-supportBg h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </>
  );
};
