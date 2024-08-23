import { productData } from "@/utils/data";
import { SectionTitle, ProductCard } from "../helpers";

export const Products = () => {
  return (
    <section className="section bg-white container md:py-24 py-10">
      <SectionTitle
        title="Explore Latest Products"
        para="Discover our wide range of products that cater to all your needs. From the latest gadgets to everyday essentials, we have everything you need to make your life easier and more enjoyable."
      />

      <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 sm:gap-y-8">
        {productData.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>

      <button className="bg-primaryCol text-white py-2.5 px-8 mt-10 mx-auto block">
        Explore More
      </button>
    </section>
  );
};
