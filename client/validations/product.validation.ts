import { z } from "zod";

const productSchema = z.object({
  title: z
    .string({ message: "Product Title is required*" })
    .min(1, { message: "Product Title required*" }),
  description: z
    .string({ message: "Product Descripiton required" })
    .min(1, { message: "Product Descripiton required*" }),
  price: z
    .string({ message: "Price is required" })
    .min(1, { message: "Price is required*" }),
  quantity: z
    .string({ message: "Quantity is required" })
    .min(1, { message: "Quantity is required*" }),
});

export { productSchema };
