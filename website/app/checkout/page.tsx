"use client";
import { CustomerDetails } from "@/components/forms";
import { SectionTitle } from "@/components/helpers";
import { OrderDetails } from "@/components/shared";

const CheckoutPage = () => {
  return (
    <section className="section container md:py-24 py-10">
      <SectionTitle
        title="Your Order Details"
        para="Verify your products and order details before proceeding to payment."
      />

      <OrderDetails />
      <CustomerDetails />
    </section>
  );
};

export default CheckoutPage;
