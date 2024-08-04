import { ProductForm } from "@/components/forms";
import { PageTitle } from "@/components/helpers";

const UodateProduct = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  
  return (
    <section className="section">
      <PageTitle title="Update Product" />
      <ProductForm isUpdate />
    </section>
  );
};

export default UodateProduct;
