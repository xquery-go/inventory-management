"use client";
import { getAllCategories } from "@/API/category.api";
import { CategoryCard, Pagination, SectionTitle } from "@/components/helpers";
import { CategoryCardSkeleton } from "@/components/skeletons";
import { ICategory } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface SearchParams {
  page: number;
  limit: number;
  filter: string;
  search: string;
}

const CategoryPage = ({ searchParams }: { searchParams: SearchParams }) => {
  const { filter, limit, page, search } = searchParams;

  const { data, isLoading } = useQuery({
    queryKey: ["categories", page, search, filter, limit],
    queryFn: () => getAllCategories({ limit, page, search, filter }),
  });

  return (
    <section className="section container sm:py-24 py-10 min-h-[50vh]">
      <SectionTitle
        title="Category Overview"
        para="Explore the various categories available on our platform."
      />

      <div className="mt-10 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 sm:gap-y-8">
        {isLoading ? (
          <CategoryCardSkeleton />
        ) : data && data.response.data.length > 0 ? (
          data.response.data.map((category: ICategory, index: number) => (
            <CategoryCard
              key={index}
              image={category.imageUrl}
              title={category.name}
              id={category._id}
            />
          ))
        ) : (
          <div className="col-span-5 w-full">
            <p className="sm:text-3xl text-2xl">No Categories Found</p>
          </div>
        )}
      </div>

      {data &&
        data.success &&
        data.response.data.length > 0 &&
        data.response.pagination && (
          <Pagination data={data.response.pagination} />
        )}
    </section>
  );
};

export default CategoryPage;
