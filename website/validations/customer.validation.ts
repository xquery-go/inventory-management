import { z } from "zod";

const customerSchema = z.object({
  name: z
    .string({ message: "Name is required*" })
    .min(1, { message: "Name is required*" })
    .max(255, { message: "Name is too long*" }),
  email: z
    .string({ message: "Email is required*" })
    .email({ message: "Invalid email*" }),
  phone: z
    .string({ message: "Phone is required*" })
    .min(8, { message: "Phone is required*" }),
  paymentMethod: z.string({ message: "Payment method is required*" }),
  shippingAddress: z.object({
    street: z
      .string({ message: "Street is required*" })
      .min(3, { message: "Street is required*" }),
    city: z
      .string({ message: "City is required*" })
      .min(3, { message: "City is required*" }),
    state: z
      .string({ message: "State is required*" })
      .min(3, { message: "State is required*" }),
  }),
  billingAddress: z.object({
    street: z
      .string({ message: "Street is required*" })
      .min(3, { message: "Street is required*" }),
    city: z
      .string({ message: "City is required*" })
      .min(3, { message: "City is required*" }),
    state: z
      .string({ message: "State is required*" })
      .min(3, { message: "State is required*" }),
  }),
  notes: z.string(),
});

export { customerSchema };
