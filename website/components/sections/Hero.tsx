import Image from "next/image";
import React from "react";

export const Hero = () => {
  return (
    <section className="bg-secondaryCol section">
      <div className="container grid lg:grid-cols-2 grid-cols-1 items-center">
        <div className="max-lg:py-10 max-sm:pt-10 max-sm:pb-0">
          <h2 className="md:text-6xl text-4xl max-sm:text-left font-semibold leading-tight">
            Boost ABC123 <br className="max-md:hidden" /> Headphone Black
          </h2>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            malesuada euismod nisi, et tincidunt nunc posuere sit amet.{" "}
          </p>

          <button className="py-2.5 px-8 bg-primaryCol text-white mt-5 hover:rounded-lg transition-all duration-100 max-sm:w-full">
            Shop Now
          </button>
        </div>
        <div>
          <Image
            src="/images/hero-image.png"
            alt="hero.png"
            width={1000}
            height={1000}
            className="sm:w-full w-[2500px] h-[500px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};
