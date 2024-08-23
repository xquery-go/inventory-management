"use client";
import useOutsideClick from "@/hooks/useOutsideClick";
import { Heart, Menu, ShoppingBag, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { Cart } from "./Cart";
import useCartStore from "@/store/cart.store";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useOutsideClick(ref, () => {
    setIsOpen(false);
  });
  const setCartData = useCartStore((state) => state.setValues);
  const cartData = useCartStore((state) => state);
  return (
    <header className="relative bg-supportBg flex items-center py-6 md:px-10 px-4">
      <div className="flex items-center justify-between max-w-7xl w-full mx-auto">
        <Link href="/" className="flex items-center gap-x-2 text-primaryCol">
          <ShoppingCart strokeWidth={2.2} className="size-7" />
          <h1 className="text-2xl font-medium max-md:hidden">Shoppify</h1>
        </Link>

        <nav className="flex items-center gap-x-10 max-md:hidden">
          <Link href="/" className="link">
            Home
          </Link>
          <Link href="/" className="link">
            Categories
          </Link>
          <Link href="/" className="link">
            Featured
          </Link>
          <Link href="/" className="link">
            Contact
          </Link>
        </nav>
        {isOpen && (
          <div
            ref={ref}
            className="z-50 absolute top-full bg-supportBg left-0 right-0 py-10"
          >
            <div className="md:hidden flex flex-col items-start justify-center gap-y-8 px-4">
              <Link
                href="/"
                className="link text-lg"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/"
                className="link text-lg"
                onClick={() => setIsOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/"
                className="link text-lg"
                onClick={() => setIsOpen(false)}
              >
                Featured
              </Link>
              <Link
                href="/"
                className="link text-lg"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}

        <div className="flex items-center gap-x-5">
          <div className="md:hidden">
            {!isOpen ? (
              <Menu
                className="size-7 cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            ) : (
              <X
                className="size-7 cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            )}
          </div>
          <div className="relative hover:text-primaryCol transition-all duration-100 cursor-pointer">
            <ShoppingBag
              className=""
              onClick={() => setCartData({ open: true })}
            />
            <Cart />
            <div className="pointer-events-none select-none">
              <span className="absolute -top-2 -right-2 text-[10px] bg-primaryCol text-white rounded-full size-5 center">
                {cartData.cartItems.length}
              </span>
            </div>
          </div>
          <Heart className="hover:text-primaryCol transition-all duration-100 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};
