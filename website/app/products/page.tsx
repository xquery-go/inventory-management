"use client";

import { getAllProducts } from "@/API/product.api";
import { Pagination, ProductCard, SectionTitle } from "@/components/helpers";
import { ProductCartSkeleton } from "@/components/skeletons";
import { IProduct } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

interface SearchParams {
  page: number;
  limit: number;
  filter: string;
  search: string;
}

const ProductsPage = ({ searchParams }: { searchParams: SearchParams }) => {
  const { filter, limit, page, search } = searchParams;
  const { data, isLoading } = useQuery({
    queryKey: ["products", page, search, filter, limit],
    queryFn: () => getAllProducts({ limit, page, search, filter }),
  });

  return (
    <section className="section container sm:py-24 py-10 min-h-[50vh]">
      <SectionTitle
        title="Explore Our Collection"
        para="Discover a wide variety of products tailored to your needs."
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
            <p className="sm:text-3xl text-2xl">
              No products found in this category
            </p>
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

export default ProductsPage;
