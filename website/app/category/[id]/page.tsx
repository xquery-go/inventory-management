"use client";
import { getProductsByCategory } from "@/API/product.api";
import { Pagination, ProductCard, SectionTitle } from "@/components/helpers";
import { ProductCartSkeleton } from "@/components/skeletons";
import { IProduct } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface SearchParams {
  page: number;
  limit: number;
  filter: string;
  search: string;
}

const ProductsByCategoryPage = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: SearchParams;
}) => {
  const { filter, limit, page, search } = searchParams;
  const { id } = params;
  const { data, isLoading } = useQuery({
    queryKey: ["product-by-category", id, page, search, filter, limit],
    queryFn: () =>
      getProductsByCategory({ categoryId: id, limit, page, search, filter }),
  });

  return (
    <section className="section container sm:py-24 py-10 min-h-[50vh]">
      <SectionTitle
        title="Products by Category"
        para="Browse through the products available in this category."
      />

      <div className="mt-10 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 sm:gap-y-8">
        {isLoading ? (
          <ProductCartSkeleton />
        ) : data && data.response.data.length > 0 ? (
          data.response.data.map((product: IProduct, index: number) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <div className="col-span-5 w-full">
            <p className="sm:text-3xl text-2xl">No products found in this category</p>
          </div>
        )}
      </div>

      {data && data.success && data.response.data.length > 0 && data.response.pagination && (
        <Pagination data={data.response.pagination} />
      )}
    </section>
  );
};

export default ProductsByCategoryPage;
