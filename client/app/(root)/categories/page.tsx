import { CategoryForm } from "@/components/forms";
import { Filter, PageTitle } from "@/components/helpers";

const CategoriesPage = () => {
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
    </section>
  );
};

export default CategoriesPage;
