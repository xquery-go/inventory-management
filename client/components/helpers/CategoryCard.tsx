import { ICategory } from "@/types/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";

export const CategoryCard = ({
  name,
  imageUrl,
  description,
  slug,
}: ICategory) => {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 p-2.5 pb-4 rounded-lg relative">
      <div className="flex items-start flex-col gap-x-3">
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={250}
          className="object-cover rounded-lg w-full h-52"
        />
        <div className="pt-2">
          <h3 className="text-lg font-semibold dark:text-neutral-200 text-neutral-800">
            {name}
          </h3>
          <p className="sm:text-sm text-xs dark:text-neutral-300 text-neutral-600">
            {description && description.length > 40
              ? description?.slice(0, 40) + "..."
              : description}
          </p>
        </div>
      </div>

      <button className="absolute -top-2 -right-2 shadow-md bg-green-500 dark:bg-green-700 rounded-lg py-2 px-2 text-darkText active:scale-[1.04]">
        <Pen className="size-5" />
      </button>
    </div>
  );
};
