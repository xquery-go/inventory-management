"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useCartStore, { getStateValues } from "@/store/cart.store";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export const Cart = () => {
  const cartData = useCartStore((state) => getStateValues(state));
  const setCartData = useCartStore((state) => state.setValues);

  const calculateSubtotal = () => {
    const subtotal = cartData.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    setCartData({
      subtotal,
    });
  };

  const calculateTotal = () => {
    const total = cartData.subtotal - cartData.discount;
    setCartData({
      total,
    });
  };

  useEffect(() => {
    calculateSubtotal();
  }, [cartData.cartItems]);

  useEffect(() => {
    calculateTotal();
  }, [cartData.subtotal, cartData.discount]);

  const handleOpenChange = (open: boolean) => {
    setCartData({
      open,
    });
  };

  return (
    <Sheet open={cartData.open} onOpenChange={handleOpenChange}>
      <SheetContent className="min-w-[350px]">
        <SheetHeader>
          <SheetTitle className="md:mb-5 flex justify-between">
            Your Bag
            <button
              onClick={() => handleOpenChange(false)}
              className="outline-none"
            >
              <X />
            </button>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col justify-between h-full">
          <div className="mt-5 flex flex-col gap-y-3 pb-4 overflow-y-auto">
            {cartData.cartItems.map((item, idx) => (
              <CartItem key={idx} {...item} />
            ))}
          </div>

          <div className="border-t border-t-black py-5 md:mb-10 mb-5">
            <div className="flex justify-between">
              <p className="text-[16px] text-black">Subtotal</p>
              <p className="text-[16px] text-black">${cartData.subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[16px] text-black">Discount</p>
              <p className="text-[16px] text-black">${cartData.discount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[16px] text-black">Total</p>
              <p className="text-[16px] text-black">${cartData.total}</p>
            </div>

            <Link href="/checkout" onClick={() => handleOpenChange(false)}>
              <button
                disabled={cartData.cartItems.length === 0}
                className="disabled:opacity-80 bg-primaryCol w-full py-3 text-center text-white mt-4 rounded-sm text-[16px]"
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const CartItem = ({
  _id,
  name,
  image,
  price,
  quantity,
}: {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    const currentCartItems = useCartStore.getState().cartItems;
    const updatedCartItems = currentCartItems.map((item) =>
      item._id === _id ? { ...item, quantity: newQuantity } : item
    );

    useCartStore.getState().setValues({
      cartItems: updatedCartItems,
    });
  };

  const removeItemFromCart = () => {
    const currentCartItems = useCartStore.getState().cartItems;
    const updatedCartItems = currentCartItems.filter(
      (item) => item._id !== _id
    );

    useCartStore.getState().setValues({
      cartItems: updatedCartItems,
    });
  };

  return (
    <div className="flex items-start justify-between gap-x-2 h-full">
      <div className="flex items-center gap-x-2">
        <div>
          <Image
            src={image}
            alt={name}
            width={100}
            height={100}
            className="object-cover rounded-md min-w-20 min-h-20 size-20"
          />
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-primaryCol">${quantity * price}</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between h-full">
        <button
          onClick={() => removeItemFromCart()}
          className="center size-6 rounded-full bg-red-500 text-white"
        >
          <X className="size-4" />
        </button>
        <div>
          <input
            type="number"
            min={1}
            max={100}
            value={quantity}
            onChange={handleQuantityChange}
            className="w-20 border border-primaryCol outline-none rounded-md pl-2 py-0.5"
          />
        </div>
      </div>
    </div>
  );
};
