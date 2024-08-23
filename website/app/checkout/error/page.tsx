import Image from "next/image";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <section className="section container py-24 min-h-[50vh]">
      <div className="flex flex-col items-center">
        <Image
          src="/images/icons/error.png"
          alt="success"
          width={200}
          height={200}
          className="object-cover sm:size-[200px] size-[130px]"
        />
        <h1 className="text-3xl font-bold text-center mt-4">
          Transaction Failed!
        </h1>
        <p className="text-center mt-4">
          An unexpected error occurred while processing your payment.
        </p>
        <p className="text-center">
          Please try again or contact support if the issue persists.
        </p>
      </div>
      <Link href="/">
        <button className="mt-5 bg-primaryCol text-white px-8 py-2.5 block mx-auto">
          Continue Shopping
        </button>
      </Link>
    </section>
  );
};

export default ErrorPage;
