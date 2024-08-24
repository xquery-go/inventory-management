import { Skeleton } from "../ui/skeleton";

export const CategoryCardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton className="bg-supportBg h-[180px] w-[200px] rounded-sm" />
      ))}
    </>
  );
};
