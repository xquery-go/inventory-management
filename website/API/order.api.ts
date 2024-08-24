import { IAddress } from "@/types/types";
import api from "./middleware";

export const addOrder = async ({
  orderItems,
  paymentMethod,
  shippingAddress,
  billingAddress,
  name,
  email,
  phone,
  notes,
}: {
  orderItems: {
    product: string;
    quantity: number;
  }[];
  paymentMethod: string;
  shippingAddress: IAddress;
  billingAddress: IAddress;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}) => {
  try {
    const { data } = await api.post(`/order/add`, {
      orderItems,
      paymentMethod,
      shippingAddress,
      billingAddress,
      name,
      email,
      phone,
      notes,
    });

    return {
      success: data.success,
      response: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};
