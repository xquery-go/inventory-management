import Image from "next/image";
import { useRouter } from "next/navigation";

export const CategoryCard = ({
  title,
  image,
  id,
}: {
  title: string;
  image: string;
  id: string;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/category/${id}`)}
      className="border border-primaryCol bg-supportBg py-5 max-w-[200px] overflow-hidden h-full cursor-pointer"
    >
      <div className="w-full center">
        <Image
          src={image}
          alt=""
          width={70}
          height={70}
          className="object-cover size-[80px]"
        />
      </div>
      <h3 className="text-center font-medium mt-2 select-none">{title}</h3>
    </div>
  );
};
