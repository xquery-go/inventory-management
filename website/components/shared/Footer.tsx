import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-supportBg w-full ">
      <div className="container">
        <div className="py-20 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
          <div>
            <div className="text-primaryCol flex items-center gap-x-2">
              <ShoppingCart strokeWidth={2.2} className="size-7" />
              <h3 className="text-2xl font-semibold">Shoppify</h3>
            </div>
            <p className="mt-4 text-sm">
              Shoppify is a platform that allows you to buy and sell products
              online.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primaryCol">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-y-2">
              <li>
                <Link href="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="footer-link">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/featured" className="footer-link">
                  Featured
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primaryCol">
              Categories
            </h3>
            <ul className="mt-4 flex flex-col gap-y-2">
              <li>
                <Link href="/categories/electronics" className="footer-link">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/categories/clothing" className="footer-link">
                  Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/home-and-living"
                  className="footer-link"
                >
                  Home & Living
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories" className="footer-link">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primaryCol">Contact</h3>
            <ul className="mt-4">
              <li>
                <Link href="tel:+911234567890" className="footer-link">
                  +91 1234567890
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-t-primaryCol py-4">
        <div className="container gap-x-4">
          <p className="text-sm max-sm:text-center">&copy; 2024 Shoppify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
