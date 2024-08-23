import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCartStore from "@/store/cart.store";
import { orderDetailsHeaders } from "@/utils/data";
import Image from "next/image";

export const OrderDetails = () => {
  const cart = useCartStore((state) => state);

  return (
    <div className="rounded-md bg-neutral-100 dark:bg-neutral-800 py-5 px-4 mt-10">
      <h3 className="text-lg font-semibold">Products Details</h3>
      <Table>
        <TableHeader>
          <TableRow className="dark:hover:bg-neutral-900 dark:border-neutral-600">
            {orderDetailsHeaders.map(({ name }, idx) => (
              <TableHead
                key={idx}
                className="min-w-[130px] text-text dark:text-darkText"
              >
                {name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.cartItems.map((item, idx: number) => (
            <TableRow
              className="dark:hover:bg-neutral-900 dark:border-neutral-800 overflow-x-hidden"
              key={idx}
            >
              <TableCell className="min-w-[250px] flex items-start gap-x-2">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="object-cover w-24 rounded-lg h-20"
                />
                <div className="py-2">
                  <p className="mb-1 font-medium text-text dark:text-darkText text-[16px]">
                    {item.name}
                  </p>
                  <p>
                    Color: <span className="font-medium">Blue</span>
                  </p>
                  <p>
                    Size: <span className="font-medium">42</span>
                  </p>
                </div>
              </TableCell>
              <TableCell className="sm:text-lg">${item.price}</TableCell>
              <TableCell className="sm:text-lg">{item.quantity}</TableCell>
              <TableCell className="sm:text-lg">
                ${item.quantity * item.price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-2 pt-5 flex justify-end border-t border-neutral-300 dark:border-neutral-600">
        <div className="lg:w-[20%] w-full">
          <p className="text-sm text-pretty tracking-wide">
            Subtotal: <span className="font-medium">${cart.subtotal}</span>
          </p>
          <p className="text-sm text-pretty tracking-wide">
            Discount: <span className="font-medium">${cart.discount}</span>
          </p>
          <p className="text-sm text-pretty tracking-wide">
            Coupon: <span className="font-medium">{"N/A"}</span>
          </p>

          <p className="mt-2 pt-2 border-t-2 border-neutral-300 dark:border-neutral-600">
            Total Bill: <span className="font-medium">${cart.total}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
