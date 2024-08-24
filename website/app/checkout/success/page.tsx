import Image from "next/image";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <section className="section container py-24 min-h-[50vh]">
      <div className="flex flex-col items-center">
        <Image
          src="/images/icons/success.png"
          alt="success"
          width={200}
          height={200}
          className="object-cover sm:size-[200px] size-[130px]"
        />
        <h1 className="text-3xl font-bold text-center mt-4">
          Thank you for your order!
        </h1>
        <p className="text-center mt-4">
          We have received your order and will be processing it shortly. <br />{" "}
          Thank you for shopping with us. You will receive an email shortly with
          your order details.
        </p>
        <p className="text-center">
          Your order number is:{" "}
          <span className="font-medium">#TKB-123-456</span>
        </p>
      </div>
      <Link href="/" className="block mx-auto w-fit">
        <button className="mt-5 bg-primaryCol text-white px-8 py-2.5 block mx-auto">
          Continue Shopping
        </button>
      </Link>
    </section>
  );
};

export default SuccessPage;
