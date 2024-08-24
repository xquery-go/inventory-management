"use client";
import { productData } from "@/utils/data";
import { SectionTitle, ProductCard } from "../helpers";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/API/product.api";
import { ProductCartSkeleton } from "../skeletons";
import { IProduct } from "@/types/types";
import Link from "next/link";

export const Products = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["landing-products"],
    queryFn: () => getAllProducts({ page: 1, limit: 8 }),
  });

  return (
    <section className="section bg-white container md:py-24 py-10">
      <SectionTitle
        title="Explore Latest Products"
        para="Discover our wide range of products that cater to all your needs."
      />

      <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 sm:gap-y-8">
        {isLoading ? (
          <ProductCartSkeleton />
        ) : data && data.response.data.length > 0 ? (
          data.response.data.map((product: IProduct, index: number) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <div className="col-span-5 w-full">
            <p className="sm:text-3xl text-2xl">No Products Found</p>
          </div>
        )}
      </div>
      <Link href="/products">
        <button className="bg-primaryCol text-white py-2.5 px-8 mt-10 mx-auto block">
          Explore More
        </button>
      </Link>
    </section>
  );
};
