import { PageTitle } from "@/components/helpers";
import { DataTable } from "@/components/shared";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProductsPage = () => {
  return (
    <section className="section">
      <div className="flex sm:items-center justify-between max-sm:flex-col w-full gap-x-5 gap-y-2">
        <PageTitle
          title="Products"
          desc="Manage all your products from this page, add new products, update existing products and delete products"
        />
        <Link href="/products/add" aria-label="Add Product">
          <Button
            variant="outline"
            className="bg-primaryCol hover:bg-primaryCol/80 dark:bg-primaryCol dark:hover:bg-primaryCol/80 text-darkText hover:text-darkText"
          >
            Add Product
          </Button>
        </Link>
      </div>
      <DataTable />
    </section>
  );
};

export default ProductsPage;
