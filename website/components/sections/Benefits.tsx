import Image from "next/image";
import React from "react";

export const Benefits = () => {
  return (
    <section className="section container md:py-24 py-10 bg-white">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 place-content-center items-center place-items-center gap-x-10 gap-y-10">
        <BenefitCard
          icon="/images/icons/fast-delivery.png"
          title="Free and Fast Delivery"
          text="Fast delivery to your doorstep"
        />
        <BenefitCard
          icon="/images/icons/worldwide-delivery.png"
          title="Worldwide Delivery"
          text="Deliver to over 200 countries"
        />
        <BenefitCard
          icon="/images/icons/support.png"
          title="24/7 Customer Support"
          text="Friendly customer support team"
        />
      </div>
    </section>
  );
};

const BenefitCard = ({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) => {
  return (
    <div className="center flex-col">
      <Image
        src={icon}
        alt={title}
        width={100}
        height={100}
        className="object-contain"
      />
      <h4 className="text-xl font-medium">{title}</h4>
      <p className="font-light text-gray-500">{text}</p>
    </div>
  );
};
