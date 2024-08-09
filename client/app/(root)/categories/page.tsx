"use client";
import { getAllCategories } from "@/API/category.api";
import { CategoryForm } from "@/components/forms";
import { Filter, Loader, PageTitle } from "@/components/helpers";
import { CategoryCard } from "@/components/helpers/CategoryCard";
import { ICategory } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

interface SearchParams {
  search: string;
  filter: string;
  limit: number;
  page: number;
}

const CategoriesPage = ({ searchParams }: { searchParams: SearchParams }) => {
  const { filter, limit, page, search } = searchParams;
  const { data, isLoading } = useQuery({
    queryKey: ["categories", page, search, filter, limit],
    queryFn: () =>
      getAllCategories({
        limit: 10,
        page: 1,
        search: "",
        filter: "",
      }),
  });

  return (
    <section className="section">
      <div className="flex sm:items-center justify-between max-sm:flex-col w-full gap-x-5 gap-y-2">
        <PageTitle
          title="Categories"
          desc="Manage all your categories here, you can add, edit and categories."
        />
      </div>
      <div className="mt-8">
        <div className="mb-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg py-3 px-5 w-full flex items-center justify-end gap-x-2">
          <CategoryForm />

          <Filter />
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader />
        </div>
      ) : (
        <div className="my-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
          {data && data.success && data.response.length > 0 ? (
            data.response.map((category: ICategory) => (
              <CategoryCard key={category._id} {...category} />
            ))
          ) : (
            <p className="dark:text-neutral-400 text-neutral-800 text-lg w-full">
              No categories found
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default CategoriesPage;