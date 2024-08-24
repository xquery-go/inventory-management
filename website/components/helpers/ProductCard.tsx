"use client";
import useCartStore, { getStateValues } from "@/store/cart.store";
import { IProduct } from "@/types/types";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const ProductCard = ({ product }: { product: IProduct }) => {
  const router = useRouter();
  const { name, imageUrls, _id, category, price } = product;
  const setCartData = useCartStore((state) => state.setValues);

  const addProductToCart = () => {
    const currentCartItems = useCartStore.getState().cartItems;
    const existingProductIndex = currentCartItems.findIndex(
      (item) => item._id === _id
    );

    if (existingProductIndex !== -1) {
      // Product already exists in the cart, increment the quantity
      const updatedCartItems = currentCartItems.map((item, index) =>
        index === existingProductIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartData({ cartItems: updatedCartItems, open: true });
    } else {
      setCartData({
        open: true,
        cartItems: [
          ...currentCartItems,
          {
            _id,
            name,
            image: imageUrls[0],
            price: Number(price),
            quantity: 1,
          },
        ],
      });
    }
  };

  return (
    <div className="max-w-[250px] w-full group">
      <div className="relative">
        <Image
          src={imageUrls[0]}
          alt={name}
          width={500}
          height={500}
          className="object-cover w-full sm:h-[250px] h-[200px]"
        />
        <button
          onClick={() => addProductToCart()}
          className="absolute bg-black text-white text-center sm:text-lg py-3 w-full bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Add To Cart
        </button>
        <button className="center bg-white size-6 rounded-full absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Heart className="text-primaryCol size-4" />
        </button>
      </div>
      <div>
        <h4 onClick={() => router.push(`/products/${_id}`)} className="sm:text-lg font-semibold mt-5 cursor-pointer">{name}</h4>
        <div className="mt-2 flex max-sm:flex-col sm:items-center sm:justify-between gap-x-2">
          <p className="sm:text-lg text-primaryCol font-semibold">${price}</p>
          <div className="flex items-center gap-x-1">
            <Star className="size-4" fill="#ffb703" />
            <Star className="size-4" fill="#ffb703" />
            <Star className="size-4" fill="#ffb703" />
            <Star className="size-4" fill="#ffb703" />
            <Star className="size-4" fill="#ffb703" />
            <p className="sm:text-sm text-xs text-gray-500 select-none">(35)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
