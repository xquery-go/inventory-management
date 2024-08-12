"use client";
import { getCategoryNames } from "@/API/category.api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

export const CategorySelect = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["category-names"],
    queryFn: () => getCategoryNames(),
  });

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent className="max-h-52">
        {isLoading ? (
          <SelectItem value="loading">Loading...</SelectItem>
        ) : (
          data &&
          data.success &&
          data.response.length > 0 &&
          data?.response.map((category: any) => (
            <SelectItem key={category._id} value={category._id}>
              {category.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};
