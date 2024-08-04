import { PageTitle } from "@/components/helpers";
import { DataTable } from "@/components/shared";

const ProductsPage = () => {
  return (
    <section className="section">
      <div>
        <PageTitle
          title="Products"
          desc="Manage all your products from this page, add new products, update existing products and delete products"
        />
      </div>
      <DataTable />
    </section>
  );
};

export default ProductsPage;
