"use client";
import { useEffect, useState } from "react";
import { categoriesData } from "@/utils/data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { CategoryCard, SectionTitle } from "../helpers";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/API/category.api";
import { ICategory } from "@/types/types";
import { Skeleton } from "../ui/skeleton";

export const BrowseCategories = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories({ page: 1, limit: 10 }),
  });

  return (
    <section className="section bg-white container pt-24 md:pb-10">
      {/* Header Content */}
      <div className="flex max-md:flex-col md:items-end md:justify-between gap-x-3">
        <SectionTitle
          title="Browse By Categories"
          para="Explore products related to your favourite categoy"
        />

        <div className="max-md:mt-5 flex items-center max-sm:justify-between gap-x-3">
          <button
            onClick={() => api?.scrollTo(current - 2)}
            disabled={current === 1}
            className="disabled:opacity-80 max-sm:w-full center bg-primaryCol text-white py-2 px-4 hover:rounded-sm transition-all duration-100 active:scale-95"
          >
            <ArrowLeft className="max-sm:size-5" />
          </button>
          <button
            onClick={() => api?.scrollTo(current)}
            disabled={current === count}
            className="disabled:opacity-80 max-sm:w-full center bg-primaryCol text-white py-2 px-4 hover:rounded-sm transition-all duration-100 active:scale-95"
          >
            <ArrowRight className="max-sm:size-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-10">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {isLoading ? (
              <>
                {Array.from({ length: 10 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                  >
                    <Skeleton className="bg-supportBg h-[160px] w-full mx-2" />
                  </CarouselItem>
                ))}
              </>
            ) : data && data.response.data.length > 0 ? (
              data.response.data.map((category: ICategory, index: number) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <CategoryCard
                    image={category.imageUrl}
                    title={category.name}
                    id={category._id}
                  />
                </CarouselItem>
              ))
            ) : (
              <p className="text-2xl text-center">No Categories Found</p>
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
